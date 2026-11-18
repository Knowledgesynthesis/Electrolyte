import { AB, OSM, REF } from './constants'

export interface AcidBaseInput {
  ph: number
  pco2: number
  hco3: number
  na?: number
  cl?: number
  albumin?: number
  /** Respiratory chronicity, if known (>3–5 days of compensation = chronic) */
  respiratoryChronicity?: 'acute' | 'chronic' | 'unknown'
  measuredOsm?: number
  glucoseMgDl?: number
  bunMgDl?: number
  /** Lab's normal anion gap (default from REF) */
  normalAg?: number
}

export type Primary =
  | 'metabolic acidosis'
  | 'metabolic alkalosis'
  | 'respiratory acidosis'
  | 'respiratory alkalosis'
  | 'mixed metabolic and respiratory acidosis'
  | 'mixed metabolic and respiratory alkalosis'
  | 'normal'
  | 'mixed (normal pH)'

export interface AbFinding {
  step: string
  text: string
  tone: 'info' | 'ok' | 'warn' | 'danger'
}

export interface AcidBaseResult {
  primary: Primary
  findings: AbFinding[]
  disorders: string[]
  ag?: number
  correctedAg?: number
  deltaRatio?: number
  expectedPco2?: [number, number]
  expectedHco3?: [number, number]
  osmolalGap?: number
  consistent: boolean
  differentials: string[]
}

/** Henderson equation: [H⁺] nmol/L = 24 × pCO₂ / HCO₃ */
export function hFromValues(pco2: number, hco3: number): number {
  return (24 * pco2) / hco3
}

export function phFromValues(pco2: number, hco3: number): number {
  return 6.1 + Math.log10(hco3 / (0.0307 * pco2))
}

export function anionGap(na: number, cl: number, hco3: number): number {
  return na - (cl + hco3)
}

/** Figge: add 2.5 mmol/L for each 1 g/dL that albumin is below 4.0 */
export function albuminCorrectedAg(ag: number, albuminGdl: number): number {
  return ag + AB.agAlbuminFactor * (REF.albuminGdl - albuminGdl)
}

/** Δ/Δ = (AG − normal AG) / (24 − HCO₃) */
export function deltaRatio(ag: number, hco3: number, normalAg: number = REF.anionGap): number {
  const dHco3 = AB.normalHco3 - hco3
  if (dHco3 <= 0) return Number.POSITIVE_INFINITY
  return (ag - normalAg) / dHco3
}

export function interpretDeltaRatio(r: number): string {
  if (!Number.isFinite(r)) return 'HCO₃ is not reduced despite a high AG: concurrent metabolic alkalosis.'
  if (r < 0.4) return 'Δ/Δ <0.4: hyperchloremic (normal-AG) acidosis predominates.'
  if (r < 0.8) return 'Δ/Δ 0.4–0.8: combined high-AG and normal-AG acidosis (common in kidney failure, DKA during treatment).'
  if (r <= 2) return 'Δ/Δ 0.8–2.0: uncomplicated high-AG acidosis (lactic acidosis typically ~1.6; DKA ~1.0 because ketoanions are lost in urine).'
  return 'Δ/Δ >2: HCO₃ is higher than expected — concurrent metabolic alkalosis (vomiting, diuretics) or pre-existing compensated respiratory acidosis.'
}

export function wintersExpectedPco2(hco3: number): [number, number] {
  const mid = AB.winters.slope * hco3 + AB.winters.intercept
  return [mid - AB.winters.range, mid + AB.winters.range]
}

export function metAlkExpectedPco2(hco3: number): [number, number] {
  const mid = AB.metAlk.slope * hco3 + AB.metAlk.intercept
  return [mid - AB.metAlk.range, mid + AB.metAlk.range]
}

/** Expected HCO₃ for a primary respiratory disorder */
export function respExpectedHco3(pco2: number, kind: 'acidosis' | 'alkalosis', chronicity: 'acute' | 'chronic'): number {
  const d = pco2 - AB.normalPco2
  const k =
    kind === 'acidosis'
      ? chronicity === 'acute'
        ? AB.respAcidAcute
        : AB.respAcidChronic
      : chronicity === 'acute'
        ? AB.respAlkAcute
        : AB.respAlkChronic
  return AB.normalHco3 + k * d
}

const HAGMA_DDX = [
  'Lactic acidosis (L-lactate: shock, sepsis, metformin, seizures; D-lactate: short bowel)',
  'Ketoacidosis (diabetic — including euglycemic on SGLT2 inhibitors; alcoholic; starvation)',
  'Kidney failure (advanced)',
  'Toxic alcohols (methanol, ethylene glycol, diethylene glycol) — check osmolal gap',
  'Salicylates (often with respiratory alkalosis)',
  '5-oxoproline (chronic acetaminophen, malnutrition, female sex, CKD)',
  'Propylene glycol (IV lorazepam/phenobarbital infusions)',
]

const NAGMA_DDX = [
  'GI HCO₃ loss: diarrhea, ileostomy, pancreatic/biliary drains, ureteral diversion',
  'Renal tubular acidosis (distal/type 1 or proximal/type 2: low K; type 4: high K)',
  'Large-volume 0.9% saline (dilutional/hyperchloremic)',
  'Carbonic anhydrase inhibitors (acetazolamide, topiramate)',
  'Early CKD; recovery phase of DKA (ketoanions lost in urine)',
]

export function analyzeAcidBase(input: AcidBaseInput): AcidBaseResult {
  const { ph, pco2, hco3 } = input
  const chron = input.respiratoryChronicity ?? 'unknown'
  const normalAg = input.normalAg ?? REF.anionGap
  const findings: AbFinding[] = []
  const disorders: string[] = []
  let differentials: string[] = []
  let expectedPco2: [number, number] | undefined
  let expectedHco3: [number, number] | undefined

  // Step 0: internal consistency
  const phCalc = phFromValues(pco2, hco3)
  const consistent = Math.abs(phCalc - ph) <= 0.05
  findings.push({
    step: 'Consistency',
    text: consistent
      ? `Henderson–Hasselbalch check passes (calculated pH ${phCalc.toFixed(2)}).`
      : `Calculated pH ${phCalc.toFixed(2)} differs from measured ${ph.toFixed(2)} — values may not be simultaneous or there is an entry/lab error. Interpret with caution.`,
    tone: consistent ? 'ok' : 'warn',
  })

  // Step 1: primary disorder
  let primary: Primary
  const lowHco3 = hco3 < REF.hco3.low
  const highHco3 = hco3 > 26
  const highPco2 = pco2 > 45
  const lowPco2 = pco2 < 35
  if (ph < 7.35) {
    if (lowHco3 && highPco2) primary = 'mixed metabolic and respiratory acidosis'
    else if (lowHco3) primary = 'metabolic acidosis'
    else if (highPco2) primary = 'respiratory acidosis'
    else primary = 'metabolic acidosis'
  } else if (ph > 7.45) {
    if (highHco3 && lowPco2) primary = 'mixed metabolic and respiratory alkalosis'
    else if (highHco3) primary = 'metabolic alkalosis'
    else if (lowPco2) primary = 'respiratory alkalosis'
    else primary = 'metabolic alkalosis'
  } else if (!(lowHco3 || highHco3 || highPco2 || lowPco2)) {
    primary = 'normal'
  } else {
    // Normal pH: a chronic respiratory disorder (or metabolic acidosis) can compensate almost fully.
    // Accept a single primary only if the values fit that disorder's expected band; otherwise mixed.
    primary = 'mixed (normal pH)'
    const acidSide = ph < 7.4
    if (highPco2 && highHco3) {
      if (acidSide) {
        const exp = respExpectedHco3(pco2, 'acidosis', 'chronic')
        if (Math.abs(hco3 - exp) <= 2) primary = 'respiratory acidosis'
      } else {
        const [lo, hi] = metAlkExpectedPco2(hco3)
        if (pco2 >= lo && pco2 <= hi) primary = 'metabolic alkalosis'
      }
    } else if (lowPco2 && lowHco3) {
      if (acidSide) {
        const [lo, hi] = wintersExpectedPco2(hco3)
        if (pco2 >= lo && pco2 <= hi) primary = 'metabolic acidosis'
      } else {
        const exp = respExpectedHco3(pco2, 'alkalosis', 'chronic')
        if (Math.abs(hco3 - exp) <= 2) primary = 'respiratory alkalosis'
      }
    }
  }
  findings.push({
    step: 'Primary disorder',
    text:
      primary === 'normal'
        ? 'pH, pCO₂ and HCO₃ all normal — still check the anion gap: a hidden mixed disorder is possible.'
        : primary === 'mixed (normal pH)'
          ? 'Normal pH with abnormal pCO₂/HCO₃: compensation never fully normalizes pH, so this is a mixed disorder.'
          : ph >= 7.35 && ph <= 7.45
            ? `pH ${ph.toFixed(2)} is in range but pCO₂/HCO₃ are not; the pattern fits a well-compensated ${primary} (pH on the ${ph < 7.4 ? 'acid' : 'alkaline'} side of 7.40).`
            : `pH ${ph.toFixed(2)} → ${ph < 7.35 ? 'acidemia' : 'alkalemia'}; primary process: ${primary}.`,
    tone: primary === 'normal' ? 'ok' : 'info',
  })
  if (primary !== 'normal' && primary !== 'mixed (normal pH)') disorders.push(primary)

  // Step 2: compensation
  if (primary === 'metabolic acidosis' || (primary === 'mixed (normal pH)' && lowHco3)) {
    expectedPco2 = wintersExpectedPco2(hco3)
    const [lo, hi] = expectedPco2
    let text = `Winters: expected pCO₂ = 1.5 × ${hco3} + 8 ± 2 = ${lo.toFixed(0)}–${hi.toFixed(0)} mmHg. `
    if (pco2 > hi) {
      text += `Measured ${pco2} is higher → concurrent respiratory acidosis (inadequate ventilation — impending fatigue?).`
      disorders.push('concurrent respiratory acidosis')
    } else if (pco2 < lo) {
      text += `Measured ${pco2} is lower → concurrent respiratory alkalosis (sepsis, salicylates, liver disease, pregnancy).`
      disorders.push('concurrent respiratory alkalosis')
    } else text += 'Appropriate respiratory compensation.'
    findings.push({ step: 'Compensation', text, tone: pco2 > hi ? 'danger' : pco2 < lo ? 'warn' : 'ok' })
  } else if (primary === 'metabolic alkalosis' || (primary === 'mixed (normal pH)' && highHco3 && !highPco2)) {
    expectedPco2 = metAlkExpectedPco2(hco3)
    const [lo, hi] = expectedPco2
    let text = `Expected pCO₂ = 0.7 × ${hco3} + 21 ± 2 = ${lo.toFixed(0)}–${hi.toFixed(0)} mmHg (rarely >55). `
    if (pco2 > hi) {
      text += 'Higher → concurrent respiratory acidosis.'
      disorders.push('concurrent respiratory acidosis')
    } else if (pco2 < lo) {
      text += 'Lower → concurrent respiratory alkalosis.'
      disorders.push('concurrent respiratory alkalosis')
    } else text += 'Appropriate compensation.'
    findings.push({ step: 'Compensation', text, tone: pco2 > hi || pco2 < lo ? 'warn' : 'ok' })
    differentials = [
      'Chloride-responsive (urine Cl <25): vomiting/NG suction, prior diuretics, post-hypercapnia, villous adenoma, chloride-losing diarrhea',
      'Chloride-resistant with hypertension: primary aldosteronism, Cushing, Liddle, licorice/apparent mineralocorticoid excess, renovascular disease',
      'Chloride-resistant without hypertension: current diuretics, Bartter, Gitelman, severe hypokalemia or hypomagnesemia',
      'Alkali load (milk-alkali, citrate in massive transfusion) when GFR is reduced',
    ]
  } else if (primary === 'respiratory acidosis' || primary === 'respiratory alkalosis') {
    const kind = primary === 'respiratory acidosis' ? 'acidosis' : 'alkalosis'
    const acute = respExpectedHco3(pco2, kind, 'acute')
    const chronic = respExpectedHco3(pco2, kind, 'chronic')
    expectedHco3 = [Math.min(acute, chronic) - 2, Math.max(acute, chronic) + 2]
    let text = `Expected HCO₃: acute ≈ ${acute.toFixed(1)}, chronic ≈ ${chronic.toFixed(1)} mmol/L. `
    const [lo, hi] = expectedHco3
    if (hco3 > hi) {
      text += 'Measured HCO₃ is higher than even chronic compensation → concurrent metabolic alkalosis.'
      disorders.push('concurrent metabolic alkalosis')
    } else if (hco3 < lo) {
      text += 'Measured HCO₃ is lower than expected → concurrent metabolic acidosis.'
      disorders.push('concurrent metabolic acidosis')
    } else {
      const nearAcute = Math.abs(hco3 - acute) < Math.abs(hco3 - chronic)
      const call = chron !== 'unknown' ? chron : nearAcute ? 'acute' : 'chronic'
      text += `Fits ${call} ${primary}${chron === 'unknown' ? ' (inferred from HCO₃)' : ''}.`
    }
    findings.push({ step: 'Compensation', text, tone: hco3 > hi || hco3 < lo ? 'warn' : 'ok' })
    differentials =
      kind === 'acidosis'
        ? ['Hypoventilation: CNS depression (opioids, sedatives), neuromuscular weakness, chest wall disease, obesity hypoventilation', 'Airway/lung disease: COPD, severe asthma, pulmonary edema']
        : ['Hyperventilation: anxiety/pain, hypoxemia, pulmonary embolism, sepsis, salicylates, liver failure, pregnancy, CNS disease, mechanical overventilation']
  }

  // Step 3: anion gap
  let ag: number | undefined
  let correctedAg: number | undefined
  let dr: number | undefined
  if (input.na !== undefined && input.cl !== undefined) {
    ag = anionGap(input.na, input.cl, hco3)
    correctedAg = input.albumin !== undefined ? albuminCorrectedAg(ag, input.albumin) : ag
    const high = correctedAg > normalAg + 2
    findings.push({
      step: 'Anion gap',
      text: `AG = ${input.na} − (${input.cl} + ${hco3}) = ${ag.toFixed(0)}${
        input.albumin !== undefined ? `; albumin-corrected = ${correctedAg.toFixed(1)}` : ' (enter albumin: each 1 g/dL drop hides ~2.5 mmol/L of gap)'
      }. ${high ? 'Elevated → high-AG metabolic acidosis present.' : 'Not elevated.'}`,
      tone: high ? 'danger' : 'ok',
    })
    if (high) {
      if (!disorders.some((d) => d.includes('metabolic acidosis'))) disorders.push('high anion gap metabolic acidosis')
      else disorders.push('(high anion gap type)')
      dr = deltaRatio(correctedAg, hco3, normalAg)
      findings.push({ step: 'Delta ratio', text: `${Number.isFinite(dr) ? `Δ/Δ = ${dr.toFixed(2)}. ` : ''}${interpretDeltaRatio(dr)}`, tone: 'info' })
      if (!Number.isFinite(dr) || dr > 2) disorders.push('concurrent metabolic alkalosis')
      else if (dr < 0.4) disorders.push('concurrent normal-AG acidosis')
      differentials = HAGMA_DDX
    } else if (lowHco3 && (primary === 'metabolic acidosis' || primary === 'mixed (normal pH)' || primary.startsWith('mixed metabolic'))) {
      disorders.push('(normal anion gap type)')
      differentials = NAGMA_DDX
      findings.push({
        step: 'Normal-AG acidosis',
        text: 'Next: urine anion gap (UNa + UK − UCl) or urine osmolal gap to estimate NH₄⁺ excretion — low NH₄⁺ points to RTA, high NH₄⁺ to GI loss.',
        tone: 'info',
      })
    }
  }

  // Step 4: osmolal gap
  let osmolalGap: number | undefined
  if (input.measuredOsm !== undefined && input.na !== undefined && input.glucoseMgDl !== undefined && input.bunMgDl !== undefined) {
    const calc = 2 * input.na + input.glucoseMgDl / 18 + input.bunMgDl / 2.8
    osmolalGap = input.measuredOsm - calc
    const high = osmolalGap > OSM.gapUpper
    findings.push({
      step: 'Osmolal gap',
      text: `Measured ${input.measuredOsm} − calculated ${calc.toFixed(0)} = ${osmolalGap.toFixed(0)} mOsm/kg. ${
        high ? 'Elevated: consider methanol, ethylene glycol, propylene glycol, ethanol, mannitol — a normal gap does not exclude late toxic alcohol poisoning.' : 'Not elevated.'
      }`,
      tone: high ? 'danger' : 'ok',
    })
  }

  return { primary, findings, disorders, ag, correctedAg, deltaRatio: dr, expectedPco2, expectedHco3, osmolalGap, consistent, differentials }
}
