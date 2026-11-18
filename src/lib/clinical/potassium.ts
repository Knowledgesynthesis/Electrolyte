import { HYPERK, K_BANDS, K_IV } from './constants'

export type KSeverity = 'severe-low' | 'moderate-low' | 'mild-low' | 'normal' | 'mild-high' | 'moderate-high' | 'severe-high'

export function potassiumSeverity(k: number): KSeverity {
  if (k < K_BANDS.hypo.moderate) return 'severe-low'
  if (k < K_BANDS.hypo.mild) return 'moderate-low'
  if (k < 3.5) return 'mild-low'
  if (k <= 5.0) return 'normal'
  if (k < K_BANDS.hyper.moderate) return 'mild-high'
  if (k < K_BANDS.hyper.severe) return 'moderate-high'
  return 'severe-high'
}

export const SEVERITY_LABEL: Record<KSeverity, string> = {
  'severe-low': 'Severe hypokalemia (<2.5)',
  'moderate-low': 'Moderate hypokalemia (2.5–2.9)',
  'mild-low': 'Mild hypokalemia (3.0–3.4)',
  normal: 'Within reference (3.5–5.0)',
  'mild-high': 'Mild hyperkalemia (5.1–5.9)',
  'moderate-high': 'Moderate hyperkalemia (6.0–6.4)',
  'severe-high': 'Severe hyperkalemia (≥6.5)',
}

/**
 * Spot urine K/creatinine ratio (replaces the TTKG, which its originators abandoned).
 * In hypokalemia: <1.5 mmol/mmol (≈13 mEq/g) → extrarenal loss or shift; higher → renal wasting.
 * uCr may be given in mmol/L (SI) or mg/dL (conventional).
 */
export function urineKCreatinineRatio(uK: number, uCr: number, crUnit: 'mmol/L' | 'mg/dL') {
  const crMmol = crUnit === 'mmol/L' ? uCr : (uCr * 88.42) / 1000
  const ratio = uK / crMmol
  return {
    ratio,
    interpretation:
      ratio < 1.5
        ? 'Appropriate renal K conservation → extrarenal loss (GI), poor intake, or transcellular shift.'
        : 'Inappropriate renal K loss → diuretics, mineralocorticoid excess, tubulopathy, Mg deficiency, non-reabsorbable anions (vomiting/bicarbonaturia).',
  }
}

export interface HypoKInput {
  k: number
  weightKg: number
  ecgChangesOrSymptoms: boolean
  canTakeOral: boolean
  centralLine: boolean
  lowMg: boolean
  reducedEgfr: boolean
  periodicParalysis: boolean
}

export interface HypoKPlan {
  severity: KSeverity
  estimatedDeficit: [number, number]
  route: 'oral' | 'iv' | 'iv+oral'
  orders: string[]
  cautions: string[]
  recheck: string
}

/**
 * Deficit heuristic (Sterns 1981, scaled to weight): fall from 4 → 3 mmol/L ≈ 200–400 mmol in 70 kg;
 * each further 1 mmol/L below 3 ≈ another 200–400 mmol. Useful for scale, not for dosing to zero.
 */
export function estimateKDeficit(k: number, weightKg: number): [number, number] {
  const scale = weightKg / 70
  const drop = Math.max(0, 4 - k)
  return [Math.round(drop * 200 * scale), Math.round(drop * 400 * scale)]
}

export function planHypokalemia(i: HypoKInput): HypoKPlan {
  const severity = potassiumSeverity(i.k)
  const estimatedDeficit = estimateKDeficit(i.k, i.weightKg)
  const orders: string[] = []
  const cautions: string[] = []
  const urgent = i.ecgChangesOrSymptoms || i.k < K_BANDS.hypo.moderate
  let route: HypoKPlan['route']

  if (i.periodicParalysis) {
    route = i.canTakeOral ? 'oral' : 'iv'
    orders.push('Transcellular shift (e.g., thyrotoxic periodic paralysis): total body K is normal — give small doses only (e.g., KCl 10 mmol/h IV or 30–60 mmol PO total) and stop once strength returns.')
    orders.push('Thyrotoxic periodic paralysis: nonselective β-blocker (propranolol 1–3 mg/kg PO or 1 mg IV q10 min, max 3 doses) treats the cause of the shift.')
    cautions.push('Rebound hyperkalemia is common when the shift reverses — recheck K every 1–2 h.')
  } else if (urgent || !i.canTakeOral) {
    const max = i.centralLine ? K_IV.centralMaxPerHour : K_IV.peripheralMaxPerHour
    route = i.canTakeOral ? 'iv+oral' : 'iv'
    orders.push(
      `IV KCl ${max} mmol/h via ${i.centralLine ? 'central' : 'peripheral'} line${i.centralLine ? '' : ` (≤${K_IV.peripheralMaxConcPer100ml} mmol per 100 mL)`}; dilute in 0.9% NaCl, not dextrose (dextrose → insulin → shifts K into cells).`,
    )
    if (urgent) {
      orders.push(`Life-threatening (arrhythmia, paralysis, K <2.5 with ECG changes): up to ${K_IV.centralEmergencyMaxPerHour} mmol/h centrally with continuous ECG monitoring.`)
      orders.push('Continuous cardiac monitoring.')
    }
    if (i.canTakeOral) orders.push('Add oral KCl 20–40 mmol two to three times daily — the oral route is safer and does most of the work.')
  } else {
    route = 'oral'
    const perDay = i.k < K_BANDS.hypo.mild ? '60–100' : '40–60'
    orders.push(`Oral KCl ${perDay} mmol/day in 2–4 divided doses (≤20–40 mmol per dose to limit GI irritation).`)
    orders.push('KCl is preferred: most hypokalemia is accompanied by Cl depletion/metabolic alkalosis. Use K citrate/bicarbonate for RTA or diarrhea with acidosis; K phosphate if also hypophosphatemic.')
  }

  if (i.lowMg) {
    orders.unshift('Replete magnesium first or simultaneously — Mg deficiency drives renal K wasting (ROMK disinhibition) and makes hypokalemia refractory.')
  } else {
    cautions.push('Check serum Mg; replete if low.')
  }
  if (i.reducedEgfr) {
    cautions.push('Reduced eGFR: halve the dose and recheck sooner — rebound hyperkalemia risk.')
  }
  cautions.push(`Rule of thumb: 10 mmol KCl raises serum K ≈${K_IV.risePer10mmol} mmol/L when there is no shift and no ongoing loss.`)
  cautions.push('Concurrent insulin, β-agonists or bicarbonate shift K into cells and blunt the rise.')

  return {
    severity,
    estimatedDeficit,
    route,
    orders,
    cautions,
    recheck: route === 'oral' ? 'Recheck K in 24–72 h (sooner if K <3.0 or on digoxin)' : 'Recheck K 1–2 h after every 20–40 mmol IV, and before the next bag',
  }
}

export interface HyperKInput {
  k: number
  ecgChanges: boolean
  glucoseMgDl: number
  hasDiabetes: boolean
  weightKg: number
  eskdOrOliguricAki: boolean
  volumeOverloaded: boolean
  severeAcidosis: boolean
  ongoingRelease: boolean
  onDigoxin: boolean
}

export interface ActionStep {
  phase: 'protect' | 'shift' | 'remove' | 'monitor' | 'prevent'
  title: string
  detail: string
  priority: 'now' | 'soon' | 'consider'
}

/**
 * Hyperkalemia management builder aligned with UK Kidney Association (2023, updated 2026)
 * and ERC 2025: protect the heart → shift → remove → monitor → prevent recurrence.
 */
export function planHyperkalemia(i: HyperKInput): { severity: KSeverity; emergency: boolean; steps: ActionStep[] } {
  const severity = potassiumSeverity(i.k)
  const emergency = i.ecgChanges || i.k >= K_BANDS.hyper.severe
  const steps: ActionStep[] = []

  steps.push({
    phase: 'monitor',
    title: 'Confirm and monitor',
    detail:
      '12-lead ECG now; continuous monitoring if K ≥6.0 or any ECG change. Exclude pseudohyperkalemia (hemolysis, fist clenching, delayed processing, platelets >500 or WBC >100 ×10⁹/L) — but do not delay treatment to repeat the sample when K ≥6.5 or the ECG is abnormal.',
    priority: 'now',
  })

  if (i.ecgChanges) {
    steps.push({
      phase: 'protect',
      title: 'IV calcium (membrane stabilization)',
      detail:
        '10% calcium gluconate 30 mL (6.8 mmol) IV over 10 min, or 10% calcium chloride 10 mL (6.8 mmol) via a large/central vein. US practice often gives 10 mL gluconate at a time — repeat every 5–10 min until the ECG improves. Acts in minutes, lasts 30–60 min, does not lower K.',
      priority: 'now',
    })
    if (i.onDigoxin) {
      steps.push({
        phase: 'protect',
        title: 'Digoxin on board',
        detail:
          'The "stone heart" fear is not supported by modern data — calcium is probably safe. If digoxin toxicity is the cause of the hyperkalemia, give digoxin-specific antibody fragments.',
        priority: 'now',
      })
    }
  }

  if (i.k >= K_BANDS.hyper.moderate || i.ecgChanges) {
    const skipDextrose = i.glucoseMgDl >= HYPERK.skipDextroseGlucoseMgDl
    const highHypoRisk = i.glucoseMgDl < HYPERK.extraGlucoseBelowMgDl || !i.hasDiabetes || i.weightKg < 60 || i.eskdOrOliguricAki
    steps.push({
      phase: 'shift',
      title: 'Insulin–glucose',
      detail: `${HYPERK.insulinUnits} units regular insulin IV${skipDextrose ? ' (glucose ≥250 mg/dL: dextrose not needed initially)' : ` + ${HYPERK.dextroseGrams} g dextrose (50 mL D50 or 250 mL D10)`}. Onset 15 min, peak 30–60 min, lowers K ≈0.6–1.0 mmol/L for 4–6 h.${
        i.glucoseMgDl < HYPERK.extraGlucoseBelowMgDl
          ? ' Pre-treatment glucose <126 mg/dL (7 mmol/L): follow with 10% dextrose 50 mL/h for 5 h.'
          : ''
      }`,
      priority: 'now',
    })
    steps.push({
      phase: 'monitor',
      title: 'Glucose checks',
      detail: `Glucose at 0, 15, 30, 60, 90, 120 min then hourly to 6 h. Hypoglycemia occurs in roughly 1 in 5 treated patients${
        highHypoRisk ? ' — this patient is higher risk (no diabetes, low baseline glucose, low weight or kidney failure); some centers use 5 units or 0.1 U/kg' : ''
      }.`,
      priority: 'now',
    })
    steps.push({
      phase: 'shift',
      title: 'Nebulized salbutamol (albuterol)',
      detail: `${HYPERK.salbutamolMg} mg nebulized as an adjunct to insulin (additive ≈0.5–1 mmol/L). Not as monotherapy — ~1 in 3 patients do not respond. Use 10 mg or avoid if tachyarrhythmia or ischemic heart disease.`,
      priority: emergency ? 'now' : 'soon',
    })
  }

  if (i.severeAcidosis) {
    steps.push({
      phase: 'shift',
      title: 'Sodium bicarbonate — only for severe metabolic acidosis',
      detail:
        'Not recommended routinely (ERC 2025, ILCOR): weak, slow K-lowering effect. Consider (e.g., 8.4% 50–100 mL) when pH ≤7.20 with metabolic acidosis and no volume overload, ideally while arranging dialysis.',
      priority: 'consider',
    })
  }

  steps.push({
    phase: 'remove',
    title: 'Potassium binder',
    detail: `Sodium zirconium cyclosilicate ${HYPERK.szcAcute} — onset ≈1 h (preferred in UK guidance for acute use). Patiromer 8.4 g daily acts over ~7 h (subacute/chronic). Sodium polystyrene sulfonate is slow, unreliable and linked to colonic necrosis — avoid acutely.`,
    priority: i.k >= K_BANDS.hyper.moderate ? 'now' : 'soon',
  })

  if (!i.eskdOrOliguricAki) {
    steps.push({
      phase: 'remove',
      title: 'Kaliuresis',
      detail: i.volumeOverloaded
        ? 'Loop diuretic (e.g., furosemide 40–80 mg IV) — useful because volume overloaded.'
        : 'If urine output is preserved: correct hypovolemia with isotonic (balanced) crystalloid; add a loop diuretic once euvolemic.',
      priority: 'soon',
    })
  }

  if (i.eskdOrOliguricAki || i.ongoingRelease || i.k >= K_BANDS.hyper.severe) {
    steps.push({
      phase: 'remove',
      title: 'Dialysis',
      detail:
        'Call nephrology now if ESKD, oligo-anuric AKI, ongoing K release (rhabdomyolysis, tumor lysis), or K ≥6.5 that does not respond. Hemodialysis removes ~25–50 mmol/h; expect rebound 1–2 h after.',
      priority: i.eskdOrOliguricAki ? 'now' : 'soon',
    })
  }

  steps.push({
    phase: 'monitor',
    title: 'Repeat potassium',
    detail: 'Recheck K at 1, 2, 4, 6 and 24 h. Shift therapies wear off at 4–6 h — the K comes back unless it has been removed.',
    priority: 'now',
  })
  steps.push({
    phase: 'prevent',
    title: 'Find and fix the cause',
    detail:
      'Stop K supplements, salt substitutes, NSAIDs, trimethoprim, K-sparing diuretics; review RAAS inhibitors (in chronic hyperkalemia prefer a binder to stopping a guideline-indicated RAASi/MRA). Treat hypovolemia, obstruction, adrenal insufficiency.',
    priority: 'soon',
  })

  return { severity, emergency, steps }
}
