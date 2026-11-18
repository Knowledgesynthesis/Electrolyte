import { NA_HYPER, NA_HYPO, OSM } from './constants'

export type Sex = 'male' | 'female'

/**
 * Fraction of body weight that is water (Watson-style clinical approximations used
 * by Adrogué & Madias, NEJM 2000). Children 0.6; adults <65: men 0.6, women 0.5;
 * ≥65: men 0.5, women 0.45. Obesity lowers the true fraction — use with judgment.
 */
export function tbwFraction(sex: Sex, age: number): number {
  if (age < 18) return 0.6
  if (age >= 65) return sex === 'male' ? 0.5 : 0.45
  return sex === 'male' ? 0.6 : 0.5
}

export function totalBodyWater(weightKg: number, sex: Sex, age: number): number {
  return weightKg * tbwFraction(sex, age)
}

/**
 * Calculated serum osmolality.
 * Conventional: 2·Na + glucose(mg/dL)/18 + BUN(mg/dL)/2.8
 * SI:           2·Na + glucose(mmol/L) + urea(mmol/L)
 */
export function calculatedOsmolality(
  na: number,
  glucose: number,
  bunOrUrea: number,
  system: 'SI' | 'conventional' = 'conventional',
): number {
  if (system === 'SI') return 2 * na + glucose + bunOrUrea
  return 2 * na + glucose / 18 + bunOrUrea / 2.8
}

/** Effective (tonic) osmolality excludes urea, which crosses cell membranes freely */
export function effectiveOsmolality(na: number, glucose: number, system: 'SI' | 'conventional' = 'conventional'): number {
  return system === 'SI' ? 2 * na + glucose : 2 * na + glucose / 18
}

export function osmolalGap(measured: number, calculated: number): number {
  return measured - calculated
}

/**
 * Glucose-corrected sodium. Hillier (Am J Med 1999): +2.4 mmol/L per 100 mg/dL above 100;
 * Katz (NEJM 1973): +1.6. Hillier fits better, especially when glucose > 400 mg/dL.
 */
export function glucoseCorrectedNa(na: number, glucoseMgDl: number, factor: number = OSM.hillier): number {
  return na + (factor * Math.max(0, glucoseMgDl - 100)) / 100
}

export interface Infusate {
  id: string
  name: string
  /** Na + K concentration, mmol/L */
  naK: number
  note: string
}

export const INFUSATES: Infusate[] = [
  { id: 'nacl3', name: '3% NaCl', naK: 513, note: 'Hypertonic; for severe/moderate symptoms or controlled correction' },
  { id: 'nacl09', name: '0.9% NaCl', naK: 154, note: 'Isotonic; hypovolemia. Can lower Na in SIADH if urine Na+K > 154' },
  { id: 'plasmalyte', name: 'Plasma-Lyte 148', naK: 145, note: 'Balanced crystalloid (Na 140, K 5)' },
  { id: 'lr', name: "Lactated Ringer's", naK: 134, note: 'Balanced crystalloid (Na 130, K 4); mildly hypotonic' },
  { id: 'nacl045', name: '0.45% NaCl', naK: 77, note: 'Hypotonic: 50% free water' },
  { id: 'nacl02', name: '0.2% NaCl', naK: 34, note: 'Hypotonic: ~78% free water' },
  { id: 'd5w', name: 'D5W / enteral water', naK: 0, note: 'Electrolyte-free water' },
]

export function infusate(id: string): Infusate {
  const f = INFUSATES.find((i) => i.id === id)
  if (!f) throw new Error(`Unknown infusate ${id}`)
  return f
}

/**
 * Adrogué–Madias: predicted change in serum Na after 1 L of infusate.
 * ΔNa = (infusate[Na+K] − serum Na) / (TBW + 1).
 * Ignores urine and insensible losses — observed changes often exceed the prediction,
 * especially when the ADH stimulus resolves and a water diuresis begins.
 */
export function naChangePerLiter(serumNa: number, infusateNaK: number, tbw: number): number {
  return (infusateNaK - serumNa) / (tbw + 1)
}

/** Free water deficit (L) = TBW × (Na/target − 1) */
export function freeWaterDeficit(na: number, tbw: number, target = 140): number {
  return Math.max(0, tbw * (na / target - 1))
}

/**
 * Electrolyte-free water clearance (L): water the kidney is excreting free of Na+K.
 * Positive → urine is raising serum Na; negative → urine is lowering it.
 */
export function electrolyteFreeWaterClearance(urineVolumeL: number, uNa: number, uK: number, pNa: number): number {
  return urineVolumeL * (1 - (uNa + uK) / pNa)
}

/**
 * Furst ratio (Am J Med Sci 2000): (urine Na + K) / serum Na.
 * >1 → fluid restriction will not work; 0.5–1 → ≤500 mL/day; <0.5 → ≤1 L/day.
 */
export function furstRatio(uNa: number, uK: number, pNa: number) {
  const ratio = (uNa + uK) / pNa
  let advice: string
  let restrictionMl: number | null
  if (ratio > 1) {
    advice = 'Fluid restriction alone will fail — add solute (urea, or loop diuretic + salt) or a vaptan.'
    restrictionMl = null
  } else if (ratio >= 0.5) {
    advice = 'Restrict to ≤500 mL/day; adherence is hard — plan an adjunct early.'
    restrictionMl = 500
  } else {
    advice = 'Restrict to ≤1 L/day; this is likely to work.'
    restrictionMl = 1000
  }
  return { ratio, advice, restrictionMl }
}

export interface FlowSegment {
  startH: number
  endH: number
  mlPerH: number
  /** Na + K of the fluid, mmol/L */
  naK: number
}

/**
 * Edelman mass-balance simulation: serum Na ≈ (exchangeable Na + K) / TBW.
 * Each hour adds infusions and subtracts outputs (urine) — more faithful than
 * Adrogué–Madias when urine output is large. Returns hourly values, hour 0..hours.
 */
export function simulateSodium(opts: {
  na0: number
  tbw: number
  hours: number
  inputs?: FlowSegment[]
  outputs?: FlowSegment[]
}): number[] {
  const { na0, hours } = opts
  let water = opts.tbw
  let solute = na0 * water
  const series = [na0]
  for (let h = 0; h < hours; h++) {
    for (const s of opts.inputs ?? []) {
      const v = overlapHours(s, h) * s.mlPerH / 1000
      water += v
      solute += v * s.naK
    }
    for (const s of opts.outputs ?? []) {
      const v = overlapHours(s, h) * s.mlPerH / 1000
      water -= v
      solute -= v * s.naK
    }
    series.push(solute / Math.max(water, 1))
  }
  return series
}

function overlapHours(s: FlowSegment, h: number): number {
  const lo = Math.max(s.startH, h)
  const hi = Math.min(s.endH, h + 1)
  return Math.max(0, hi - lo)
}

export type Acuity = 'acute' | 'chronic'
export type SymptomGrade = 'severe' | 'moderate' | 'none'

export interface HypoNaInput {
  na: number
  weightKg: number
  sex: Sex
  age: number
  acuity: Acuity
  symptoms: SymptomGrade
  risk: {
    alcohol: boolean
    malnutrition: boolean
    liverDisease: boolean
    hypokalemia: boolean
  }
  infusateId: string
}

export interface HypoNaPlan {
  tbw: number
  highRisk: boolean
  riskReasons: string[]
  limit24h: number
  aim24h: number
  goalRange: [number, number]
  bolus: null | {
    doses: number
    mlEach: number
    minutes: number
    predictedRiseEach: number
    rationale: string
  }
  perLiter: number
  /** Volume (L) of the chosen infusate to reach the 24 h aim, from the formula */
  litersToAim: number | null
  mlPerHourOver24h: number | null
  warnings: string[]
  monitoring: string[]
}

export function odsRiskReasons(na: number, risk: HypoNaInput['risk']): string[] {
  const reasons: string[] = []
  if (na <= NA_HYPO.highRiskNa) reasons.push(`Na ≤ ${NA_HYPO.highRiskNa} mmol/L`)
  if (risk.hypokalemia) reasons.push('Hypokalemia')
  if (risk.alcohol) reasons.push('Alcohol use disorder')
  if (risk.malnutrition) reasons.push('Malnutrition')
  if (risk.liverDisease) reasons.push('Advanced liver disease')
  return reasons
}

export function planHyponatremia(input: HypoNaInput): HypoNaPlan {
  const tbw = totalBodyWater(input.weightKg, input.sex, input.age)
  const riskReasons = odsRiskReasons(input.na, input.risk)
  const highRisk = riskReasons.length > 0
  const limit24h = highRisk ? NA_HYPO.limitHighRisk24h : NA_HYPO.limit24h
  const goalRange: [number, number] = highRisk ? [NA_HYPO.goalMin24h, 6] : [NA_HYPO.goalMin24h, NA_HYPO.goalMax24h]
  const aim24h = goalRange[1]
  const warnings: string[] = []
  const monitoring: string[] = []

  const hypertonicPerLiter = naChangePerLiter(input.na, 513, tbw)
  let bolus: HypoNaPlan['bolus'] = null
  if (input.symptoms === 'severe') {
    bolus = {
      doses: NA_HYPO.bolusMaxDoses,
      mlEach: NA_HYPO.bolusMl,
      minutes: NA_HYPO.bolusMinutes,
      predictedRiseEach: hypertonicPerLiter * (NA_HYPO.bolusMl / 1000),
      rationale: `Severe symptoms: give 3% NaCl ${NA_HYPO.bolusMl} mL over ${NA_HYPO.bolusMinutes} min; repeat up to ${NA_HYPO.bolusMaxDoses} doses total until symptoms improve or Na has risen ~${NA_HYPO.severeSymptomTarget} mmol/L. Then stop hypertonic saline.`,
    }
  } else if (input.symptoms === 'moderate') {
    bolus = {
      doses: 1,
      mlEach: NA_HYPO.bolusMl,
      minutes: NA_HYPO.bolusMinutes,
      predictedRiseEach: hypertonicPerLiter * (NA_HYPO.bolusMl / 1000),
      rationale: `Moderate symptoms: a single 3% NaCl ${NA_HYPO.bolusMl} mL bolus, then reassess; target a rise of ~${NA_HYPO.goalMin24h}–6 mmol/L in 24 h.`,
    }
  }

  const f = infusate(input.infusateId)
  const perLiter = naChangePerLiter(input.na, f.naK, tbw)
  let litersToAim: number | null = null
  let mlPerHourOver24h: number | null = null
  if (perLiter > 0) {
    litersToAim = aim24h / perLiter
    mlPerHourOver24h = (litersToAim * 1000) / 24
  } else {
    warnings.push(`${f.name} (Na+K ${f.naK}) is hypotonic to this patient's serum — it will lower Na further.`)
  }

  if (input.acuity === 'acute' && input.symptoms !== 'none') {
    warnings.push('Acute (<48 h) symptomatic hyponatremia: cerebral edema risk outweighs ODS risk — treat promptly; the limits matter less.')
  }
  if (input.infusateId === 'nacl09') {
    warnings.push('In SIADH, isotonic saline can worsen hyponatremia: the Na is excreted in concentrated urine and the water is retained.')
  }
  if (highRisk) {
    warnings.push(`High ODS risk (${riskReasons.join(', ')}): do not exceed ${NA_HYPO.limitHighRisk24h} mmol/L in any 24 h.`)
  }
  if (input.risk.hypokalemia) {
    warnings.push('Giving K raises Na too (K enters cells, Na leaves): count K in the infusate and expect a faster rise.')
  }
  warnings.push(
    'Formula predictions are often exceeded once the ADH stimulus resolves (volume repleted, thiazide stopped, cortisol replaced, nausea/pain treated) — watch urine output.',
  )

  monitoring.push(bolus ? 'Serum Na after each bolus (≈20 min), then every 2 h until symptoms resolve' : 'Serum Na every 4–6 h for the first 24 h')
  monitoring.push('Urine output hourly: >100 mL/h of dilute urine signals impending overcorrection')
  monitoring.push(`If the rise approaches ${limit24h} mmol/L: stop sodium-containing fluid, give 10 mL/kg D5W over 1 h and consider desmopressin 2 µg IV (≤ every 8 h)`)

  return {
    tbw,
    highRisk,
    riskReasons,
    limit24h,
    aim24h,
    goalRange,
    bolus,
    perLiter,
    litersToAim,
    mlPerHourOver24h,
    warnings,
    monitoring,
  }
}

export interface HyperNaInput {
  na: number
  weightKg: number
  sex: Sex
  age: number
  acuity: Acuity
  infusateId: string
  /** Ongoing free-water losses (L/day): insensible + electrolyte-free urine/GI */
  ongoingLossesL: number
}

export interface HyperNaPlan {
  tbw: number
  deficitL: number
  targetDrop24h: number
  perLiter: number
  litersForDrop: number | null
  totalLiters24h: number | null
  mlPerHour: number | null
  warnings: string[]
  monitoring: string[]
}

export function planHypernatremia(input: HyperNaInput): HyperNaPlan {
  const tbw = totalBodyWater(input.weightKg, input.sex, input.age)
  const deficitL = freeWaterDeficit(input.na, tbw)
  const room = Math.max(0, input.na - 140)
  const targetDrop24h =
    input.acuity === 'acute'
      ? Math.min(room, NA_HYPER.acuteMaxRatePerHour * 24, Math.max(0, input.na - 145))
      : Math.min(room, NA_HYPER.chronicTarget24h)
  const f = infusate(input.infusateId)
  const perLiter = naChangePerLiter(input.na, f.naK, tbw)
  const warnings: string[] = []
  let litersForDrop: number | null = null
  let totalLiters24h: number | null = null
  let mlPerHour: number | null = null
  if (perLiter < 0) {
    litersForDrop = targetDrop24h / -perLiter
    totalLiters24h = litersForDrop + input.ongoingLossesL
    mlPerHour = (totalLiters24h * 1000) / 24
  } else {
    warnings.push(`${f.name} cannot lower this Na — choose a fluid with Na+K below ${Math.round(input.na)} mmol/L.`)
  }
  if (input.infusateId === 'd5w' && mlPerHour && mlPerHour > 300) {
    warnings.push('D5W above ~300 mL/h delivers >15 g glucose/h: risk of hyperglycemia and osmotic diuresis — check glucose, consider enteral water or 0.2% NaCl.')
  }
  if (input.acuity === 'chronic') {
    warnings.push(`Chronic or unknown duration: customary target ≈${NA_HYPER.chronicTarget24h} mmol/L per 24 h. Adult observational data have not shown harm from faster correction — the limit is precautionary.`)
  } else {
    warnings.push(`Documented acute hypernatremia (<48 h, e.g., salt load, post-op AVP deficiency): can lower ≈${NA_HYPER.acuteMaxRatePerHour} mmol/L/h toward 145.`)
  }
  warnings.push('If hypovolemic or in shock, restore circulation with isotonic crystalloid first, then give free water.')
  return {
    tbw,
    deficitL,
    targetDrop24h,
    perLiter,
    litersForDrop,
    totalLiters24h,
    mlPerHour,
    warnings,
    monitoring: [
      input.acuity === 'acute' ? 'Serum Na every 1–2 h' : 'Serum Na every 4–6 h; adjust rate to the measured slope',
      'Urine volume and osmolality: polyuria with Uosm <300 points to AVP deficiency/resistance',
      'Glucose if using D5W',
    ],
  }
}

/**
 * Hyponatremia diagnostic navigator (tonicity → urine osm → urine Na → volume).
 * Returns ordered findings; used by the interactive tool and tested directly.
 */
export interface HypoNaWorkupInput {
  na: number
  measuredOsm?: number
  glucoseMgDl?: number
  urineOsm?: number
  urineNa?: number
  volume?: 'hypo' | 'eu' | 'hyper'
  onDiuretic?: boolean
}

export interface WorkupStep {
  label: string
  finding: string
  tone: 'info' | 'warn' | 'danger' | 'ok'
}

export function hyponatremiaWorkup(i: HypoNaWorkupInput): { steps: WorkupStep[]; conclusion: string; differentials: string[] } {
  const steps: WorkupStep[] = []
  let conclusion = ''
  let differentials: string[] = []

  if (i.glucoseMgDl !== undefined && i.glucoseMgDl > 200) {
    const corr = glucoseCorrectedNa(i.na, i.glucoseMgDl)
    steps.push({
      label: 'Glucose',
      finding: `Glucose ${i.glucoseMgDl} mg/dL → glucose-corrected Na ≈ ${corr.toFixed(0)} mmol/L (Hillier).`,
      tone: corr >= 135 ? 'ok' : 'info',
    })
    if (corr >= 135) {
      return {
        steps,
        conclusion: 'Translocational (hypertonic) hyponatremia from hyperglycemia — treat the glucose, not the sodium.',
        differentials: ['Hyperglycemia (DKA/HHS)'],
      }
    }
  }

  if (i.measuredOsm !== undefined) {
    if (i.measuredOsm >= 295) {
      steps.push({ label: 'Serum osmolality', finding: `${i.measuredOsm} mOsm/kg — hypertonic.`, tone: 'info' })
      return {
        steps,
        conclusion: 'Hypertonic hyponatremia: an effective osmole is pulling water out of cells.',
        differentials: ['Hyperglycemia', 'Mannitol', 'Hypertonic contrast', 'IVIG maltose/sucrose (some products)'],
      }
    }
    if (i.measuredOsm >= 275) {
      steps.push({ label: 'Serum osmolality', finding: `${i.measuredOsm} mOsm/kg — not hypotonic.`, tone: 'warn' })
      return {
        steps,
        conclusion:
          'Isotonic hyponatremia: suspect pseudohyponatremia (lipids/paraproteins with indirect ISE) or isotonic irrigants. Confirm with a direct-ISE (blood gas) sodium. Note: urea raises measured osmolality without causing tonicity — high BUN can mask true hypotonic hyponatremia.',
        differentials: ['Severe hypertriglyceridemia', 'Paraproteinemia (myeloma)', 'Glycine/sorbitol irrigation (TURP, hysteroscopy)', 'Uremia masking hypotonicity'],
      }
    }
    steps.push({ label: 'Serum osmolality', finding: `${i.measuredOsm} mOsm/kg — hypotonic: true water excess.`, tone: 'ok' })
  } else {
    steps.push({ label: 'Serum osmolality', finding: 'Not entered — assuming hypotonic. Measure it: it excludes pseudo- and hypertonic hyponatremia.', tone: 'warn' })
  }

  if (i.urineOsm !== undefined) {
    if (i.urineOsm < 100) {
      steps.push({ label: 'Urine osmolality', finding: `${i.urineOsm} mOsm/kg (<100): ADH is appropriately suppressed.`, tone: 'ok' })
      return {
        steps,
        conclusion: 'Water intake exceeds excretory capacity with maximally dilute urine.',
        differentials: ['Primary polydipsia', 'Low solute intake ("beer potomania", "tea and toast")', 'Reset osmostat (Uosm adapts to Na)'],
      }
    }
    steps.push({ label: 'Urine osmolality', finding: `${i.urineOsm} mOsm/kg (≥100): ADH is acting.`, tone: 'info' })
  } else {
    steps.push({ label: 'Urine osmolality', finding: 'Not entered — needed to separate ADH-dependent from ADH-independent causes.', tone: 'warn' })
  }

  if (i.urineNa !== undefined) {
    if (i.urineNa <= 30) {
      steps.push({ label: 'Urine sodium', finding: `${i.urineNa} mmol/L (≤30): kidneys are avidly retaining Na → low effective arterial volume.`, tone: 'info' })
      if (i.volume === 'hyper') {
        conclusion = 'Hypervolemic hyponatremia with low effective arterial blood volume.'
        differentials = ['Heart failure', 'Cirrhosis', 'Nephrotic syndrome']
      } else {
        conclusion = 'Hypovolemic hyponatremia from extrarenal losses (or remote diuretic use).'
        differentials = ['Vomiting/diarrhea', 'Third spacing (pancreatitis, burns)', 'Remote diuretic use', 'Low effective volume states if edema present']
      }
    } else {
      steps.push({ label: 'Urine sodium', finding: `${i.urineNa} mmol/L (>30): Na is reaching the urine.`, tone: 'info' })
      if (i.onDiuretic) {
        conclusion = 'On a diuretic: urine Na is uninterpretable. Thiazides are a leading cause — stop and reassess (FEurate/FEurea help).'
        differentials = ['Thiazide-associated hyponatremia', 'SIADH (underlying)', 'Renal salt wasting']
      } else if (i.volume === 'hypo') {
        conclusion = 'Hypovolemic hyponatremia with renal Na loss.'
        differentials = ['Mineralocorticoid deficiency (primary adrenal insufficiency)', 'Salt-wasting nephropathy', 'Cerebral/renal salt wasting (rare; diagnosis of exclusion)', 'Osmotic diuresis']
      } else if (i.volume === 'hyper') {
        conclusion = 'Edematous patient with high urine Na — consider diuretics or kidney disease.'
        differentials = ['Diuretic effect', 'Advanced CKD / AKI', 'Nephrotic syndrome with diuretic']
      } else {
        conclusion = 'Euvolemic hyponatremia with concentrated urine and urine Na >30: SIADH pattern — confirm by excluding hypothyroidism and glucocorticoid deficiency.'
        differentials = [
          'SIADH: drugs (SSRIs, carbamazepine/oxcarbazepine, cyclophosphamide, vincristine, MDMA, desmopressin), CNS, pulmonary, SCLC, pain/nausea/post-op',
          'Secondary adrenal insufficiency (cortisol deficiency)',
          'Severe hypothyroidism (myxedema)',
          'Exercise-associated hyponatremia',
        ]
      }
    }
  } else {
    steps.push({ label: 'Urine sodium', finding: 'Not entered — needed to judge effective arterial volume (exam alone is unreliable).', tone: 'warn' })
    conclusion = 'Enter urine Na to continue.'
  }

  return { steps, conclusion, differentials }
}
