/**
 * Unit conversions. Factors derive from molar masses:
 * Ca 40.08, Mg 24.305, P 30.97, glucose 180.16, urea-N 28.0 (BUN), creatinine 113.12 g/mol.
 */

export type Analyte =
  | 'calcium'
  | 'magnesium'
  | 'phosphate'
  | 'glucose'
  | 'bun'
  | 'creatinine'
  | 'albumin'

/** Multiply a conventional (US) value by this to get SI */
export const TO_SI: Record<Analyte, number> = {
  calcium: 0.2495, // mg/dL → mmol/L
  magnesium: 0.4114, // mg/dL → mmol/L
  phosphate: 0.3229, // mg/dL (as P) → mmol/L
  glucose: 0.0555, // mg/dL → mmol/L
  bun: 0.357, // BUN mg/dL → urea mmol/L
  creatinine: 88.42, // mg/dL → µmol/L
  albumin: 10, // g/dL → g/L
}

export const UNITS: Record<Analyte, { conventional: string; si: string }> = {
  calcium: { conventional: 'mg/dL', si: 'mmol/L' },
  magnesium: { conventional: 'mg/dL', si: 'mmol/L' },
  phosphate: { conventional: 'mg/dL', si: 'mmol/L' },
  glucose: { conventional: 'mg/dL', si: 'mmol/L' },
  bun: { conventional: 'mg/dL (BUN)', si: 'mmol/L (urea)' },
  creatinine: { conventional: 'mg/dL', si: 'µmol/L' },
  albumin: { conventional: 'g/dL', si: 'g/L' },
}

export function toSI(analyte: Analyte, conventional: number): number {
  return conventional * TO_SI[analyte]
}

export function toConventional(analyte: Analyte, si: number): number {
  return si / TO_SI[analyte]
}

/** Convert a value expressed in either system to conventional units */
export function asConventional(analyte: Analyte, value: number, system: UnitSystem): number {
  return system === 'conventional' ? value : toConventional(analyte, value)
}

export function asSI(analyte: Analyte, value: number, system: UnitSystem): number {
  return system === 'SI' ? value : toSI(analyte, value)
}

export type UnitSystem = 'SI' | 'conventional'

/** mmol/L → mEq/L requires the ion's valence (Ca²⁺, Mg²⁺ = 2) */
export function mmolToMeq(mmol: number, valence: number): number {
  return mmol * Math.abs(valence)
}

export function meqToMmol(meq: number, valence: number): number {
  return meq / Math.abs(valence)
}

/** Round to a sensible number of decimals for display */
export function round(value: number, decimals = 1): number {
  const f = 10 ** decimals
  return Math.round(value * f) / f
}

/** Decimals to show for an analyte in a given system */
export function displayDecimals(analyte: Analyte, system: UnitSystem): number {
  if (system === 'conventional') {
    return analyte === 'glucose' || analyte === 'bun' ? 0 : analyte === 'creatinine' ? 2 : 1
  }
  if (analyte === 'creatinine') return 0
  if (analyte === 'albumin') return 0
  return 2
}
