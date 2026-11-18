import { CA, REF } from './constants'

/**
 * Albumin-adjusted ("corrected") calcium — Payne 1973.
 * Conventional: Ca(mg/dL) + 0.8 × (4.0 − albumin g/dL)
 * SI:           Ca(mmol/L) + 0.02 × (40 − albumin g/L)
 * Agreement with ionized calcium is poor (≈55–65% concordance in large studies),
 * especially in CKD, critical illness and extremes of albumin. Measure ionized Ca when it matters.
 */
export function albuminAdjustedCalcium(ca: number, albumin: number, system: 'SI' | 'conventional'): number {
  if (system === 'SI') return ca + 0.02 * (40 - albumin)
  return ca + 0.8 * (4.0 - albumin)
}

export type CaBand = 'severe-low' | 'low' | 'normal' | 'mild-high' | 'moderate-high' | 'severe-high'

/** Classify a total (albumin-adjusted) calcium in mg/dL */
export function classifyTotalCalcium(caMgDl: number): { band: CaBand; label: string } {
  const ivThresholdMgDl = CA.ivThresholdMmol / 0.2495 // ≈7.6 mg/dL
  if (caMgDl < ivThresholdMgDl) return { band: 'severe-low', label: `Severe hypocalcemia (< ${ivThresholdMgDl.toFixed(1)} mg/dL / ${CA.ivThresholdMmol} mmol/L): IV calcium` }
  if (caMgDl < REF.caMgDl.low) return { band: 'low', label: 'Hypocalcemia — IV if symptomatic or QT prolonged, otherwise oral' }
  if (caMgDl <= REF.caMgDl.high) return { band: 'normal', label: 'Within reference range' }
  if (caMgDl < CA.hyperModerateMgDl) return { band: 'mild-high', label: 'Mild hypercalcemia (<12 mg/dL)' }
  if (caMgDl <= CA.hyperSevereMgDl) return { band: 'moderate-high', label: 'Moderate hypercalcemia (12–14 mg/dL)' }
  return { band: 'severe-high', label: 'Severe hypercalcemia (>14 mg/dL)' }
}

export function classifyIonizedCalcium(iCaMmol: number): string {
  if (iCaMmol < 0.8) return 'Severely low ionized Ca (<0.8 mmol/L): high risk of tetany, seizures, arrhythmia, hypotension'
  if (iCaMmol < REF.iCaMmol.low) return 'Low ionized Ca'
  if (iCaMmol <= REF.iCaMmol.high) return 'Normal ionized Ca'
  return 'High ionized Ca'
}

export type CalciumSalt = 'gluconate10' | 'chloride10'

/** Elemental calcium delivered by a volume of 10% solution */
export function elementalCalcium(salt: CalciumSalt, mL: number): { mg: number; mmol: number } {
  const per10 = salt === 'gluconate10' ? CA.gluconate10ml : CA.chloride10ml
  return { mg: (per10.mg * mL) / 10, mmol: (per10.mmol * mL) / 10 }
}

/**
 * Continuous infusion for persistent hypocalcemia: 0.5–1.5 mg/kg/h elemental Ca.
 * Standard bag (Society for Endocrinology): 100 mL 10% gluconate (930 mg) in 1 L → 0.93 mg/mL.
 */
export function calciumInfusionRate(weightKg: number, mgPerKgPerHour: number) {
  const mgPerHour = weightKg * mgPerKgPerHour
  const bagMgPerMl = (CA.gluconate10ml.mg * 10) / 1100
  return { mgPerHour, mlPerHourOfStandardBag: mgPerHour / bagMgPerMl }
}

/** Calcium–creatinine clearance ratio; <0.01 suggests FHH, >0.02 favors PHPT */
export function calciumCreatinineClearanceRatio(uCa: number, sCa: number, uCr: number, sCr: number) {
  const ratio = (uCa * sCr) / (sCa * uCr)
  return {
    ratio,
    interpretation:
      ratio < 0.01
        ? 'Low (<0.01): consistent with familial hypocalciuric hypercalcemia — consider CASR testing; avoid parathyroidectomy.'
        : ratio > 0.02
          ? 'High (>0.02): consistent with primary hyperparathyroidism.'
          : 'Indeterminate (0.01–0.02): overlap zone — genetic testing if family history or young age.',
  }
}

export const ORAL_CALCIUM = [
  { salt: 'Calcium carbonate', elementalPct: 40, note: 'Needs gastric acid — take with meals; constipating' },
  { salt: 'Calcium citrate', elementalPct: 21, note: 'Absorbed without acid — PPI, achlorhydria, bariatric surgery' },
]
