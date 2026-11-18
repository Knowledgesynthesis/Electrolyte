/**
 * Single source of truth for every clinical threshold used in the app.
 * Lessons, tools, algorithms and questions import from here so that a limit
 * stated in one place can never contradict another (enforced by content tests).
 */

/** Hyponatremia correction (US expert panel 2013; European guideline 2014). mmol/L */
export const NA_HYPO = {
  /** Minimum rise that is clinically worthwhile in the first 24 h */
  goalMin24h: 4,
  /** Usual goal ceiling for chronic hyponatremia */
  goalMax24h: 8,
  /** Do-not-exceed: standard ODS risk, any 24 h period */
  limit24h: 10,
  /** Do-not-exceed: high ODS risk (Na ≤105, hypoK, alcohol use disorder, malnutrition, advanced liver disease) */
  limitHighRisk24h: 8,
  /** Do-not-exceed over 48 h (standard risk) */
  limit48h: 18,
  /** Rise that usually reverses severe symptoms */
  severeSymptomTarget: 5,
  /** 3% NaCl bolus volume, US panel (mL) — EU guideline uses 150 mL over 20 min */
  bolusMl: 100,
  bolusMinutes: 10,
  bolusMaxDoses: 3,
  /** Na at or below which ODS risk is high regardless of other factors */
  highRiskNa: 105,
} as const

/** Hypernatremia correction. mmol/L */
export const NA_HYPER = {
  /** Chronic (>48 h or unknown): customary target, ≈0.5 mmol/L/h */
  chronicTarget24h: 10,
  chronicMaxRatePerHour: 0.5,
  /** Acute (<48 h, documented): may lower ≈1 mmol/L/h toward normal */
  acuteMaxRatePerHour: 1,
  /** Default insensible water losses for adults (L/day), more with fever/ventilation */
  insensibleLossesLPerDay: 1.0,
} as const

/** Reference intervals (adult). Labs vary; these are typical values. */
export const REF = {
  na: { low: 135, high: 145, unit: 'mmol/L' },
  k: { low: 3.5, high: 5.0, unit: 'mmol/L' },
  cl: { low: 98, high: 107, unit: 'mmol/L' },
  hco3: { low: 22, high: 29, unit: 'mmol/L' },
  /** Total calcium */
  caMgDl: { low: 8.5, high: 10.5 },
  caMmol: { low: 2.12, high: 2.62 },
  /** Ionized calcium */
  iCaMmol: { low: 1.12, high: 1.32 },
  iCaMgDl: { low: 4.5, high: 5.3 },
  /** Magnesium: conventional 95% interval ~0.70–1.0 mmol/L; some experts propose ≥0.85 as optimal */
  mgMmol: { low: 0.7, high: 1.0 },
  mgMgDl: { low: 1.7, high: 2.4 },
  /** Phosphate (adult) */
  po4MgDl: { low: 2.5, high: 4.5 },
  po4Mmol: { low: 0.81, high: 1.45 },
  posm: { low: 275, high: 295, unit: 'mOsm/kg' },
  albuminGdl: 4.0,
  /** Normal anion gap with modern ion-selective electrodes; use your lab's mean */
  anionGap: 10,
  anionGapUpper: 12,
} as const

/** Potassium severity bands (ERC 2021/2025, UK Kidney Association) */
export const K_BANDS = {
  hypo: { mild: 3.0, moderate: 2.5 }, // mild 3.0–3.4, moderate 2.5–2.9, severe <2.5
  hyper: { moderate: 6.0, severe: 6.5 }, // mild 5.5–5.9, moderate 6.0–6.4, severe ≥6.5
} as const

/** IV potassium administration limits (typical institutional maxima) */
export const K_IV = {
  peripheralMaxPerHour: 10,
  centralMaxPerHour: 20,
  /** Only with continuous ECG monitoring in life-threatening hypokalemia */
  centralEmergencyMaxPerHour: 40,
  peripheralMaxConcPer100ml: 10,
  /** Rough rule: 10 mmol raises serum K ≈0.1 mmol/L when there is no shift or ongoing loss */
  risePer10mmol: 0.1,
} as const

/** Hyperkalemia treatment parameters */
export const HYPERK = {
  insulinUnits: 10,
  dextroseGrams: 25,
  /** Omit dextrose if glucose at or above this (mg/dL) */
  skipDextroseGlucoseMgDl: 250,
  /** Add 10% glucose 50 mL/h × 5 h after insulin if pre-treatment glucose below this (UKKA) */
  extraGlucoseBelowMgDl: 126,
  salbutamolMg: '10–20',
  szcAcute: '10 g three times daily (up to 72 h), then 5–10 g daily',
} as const

/** Calcium */
export const CA = {
  /** Severe hypercalcemia (total, albumin-adjusted, mg/dL) */
  hyperModerateMgDl: 12,
  hyperSevereMgDl: 14,
  /** IV calcium is indicated for symptoms or adjusted Ca below this (mmol/L) — Society for Endocrinology 2016 */
  ivThresholdMmol: 1.9,
  /** Elemental calcium per 10 mL of 10% solution */
  gluconate10ml: { mg: 93, mmol: 2.3 },
  chloride10ml: { mg: 273, mmol: 6.8 },
  infusionMgPerKgPerHour: { low: 0.5, high: 1.5 },
} as const

/** Magnesium sulfate */
export const MG = {
  /** 1 g MgSO4·7H2O */
  perGram: { mgElemental: 98.6, mmol: 4.06, meq: 8.1 },
  severeMmol: 0.5,
  /** Non-urgent infusion rate ceiling, g/h (slower infusion improves retention) */
  nonUrgentMaxGPerHour: 1,
  /** Reduce IV dose ~50% when eGFR below this */
  renalReduceBelowEgfr: 30,
  /** FEMg above this during hypomagnesemia = renal wasting (%) */
  feMgRenalWasting: 2,
} as const

/** Acid–base compensation (Winters; Narins & Emmett; Berend NEJM 2014) */
export const AB = {
  normalPco2: 40,
  normalHco3: 24,
  winters: { slope: 1.5, intercept: 8, range: 2 },
  metAlk: { slope: 0.7, intercept: 21, range: 2 },
  respAcidAcute: 0.1,
  respAcidChronic: 0.35,
  respAlkAcute: 0.2,
  respAlkChronic: 0.4,
  /** Albumin correction of the anion gap per g/dL (Figge 1998) */
  agAlbuminFactor: 2.5,
} as const

/** Osmolality */
export const OSM = {
  /** Osmolal gap above this suggests unmeasured osmoles (toxic alcohols, mannitol, etc.) */
  gapUpper: 10,
  /** Glucose correction of Na per 100 mg/dL above 100: Hillier 2.4 (better at high glucose), Katz 1.6 */
  hillier: 2.4,
  katz: 1.6,
} as const
