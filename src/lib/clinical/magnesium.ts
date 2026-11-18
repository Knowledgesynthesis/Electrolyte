import { MG, REF } from './constants'

/** FEMg = (UMg × PCr) / (0.7 × PMg × UCr) × 100 — 0.7 = filterable fraction of plasma Mg */
export function fractionalExcretionMg(uMg: number, pMg: number, uCr: number, pCr: number): number {
  return ((uMg * pCr) / (0.7 * pMg * uCr)) * 100
}

export function interpretFeMg(fe: number): string {
  return fe > MG.feMgRenalWasting
    ? `FEMg ${fe.toFixed(1)}% (>${MG.feMgRenalWasting}%) during hypomagnesemia → renal wasting (loop/thiazide diuretics, CNIs, cisplatin, aminoglycosides, amphotericin, EGFR antibodies, alcohol, Gitelman).`
    : `FEMg ${fe.toFixed(1)}% (≤${MG.feMgRenalWasting}%) → appropriate renal conservation: GI loss (diarrhea, PPI), poor intake or redistribution.`
}

export interface HypoMgInput {
  mgMmol: number
  torsadesOrArrest: boolean
  symptomatic: boolean
  egfr: number
  canTakeOral: boolean
}

export interface HypoMgPlan {
  severity: 'severe' | 'moderate' | 'mild' | 'normal'
  orders: string[]
  cautions: string[]
}

export function planHypomagnesemia(i: HypoMgInput): HypoMgPlan {
  const severity: HypoMgPlan['severity'] =
    i.mgMmol < MG.severeMmol ? 'severe' : i.mgMmol < 0.6 ? 'moderate' : i.mgMmol < REF.mgMmol.low ? 'mild' : 'normal'
  const renal = i.egfr < MG.renalReduceBelowEgfr
  const orders: string[] = []
  const cautions: string[] = []

  if (i.torsadesOrArrest) {
    orders.push('Torsades de pointes: MgSO₄ 2 g IV over 1–2 min if pulseless; over 5–15 min with a pulse. May repeat once. Give regardless of the serum level.')
  }
  if (severity === 'severe' || i.symptomatic) {
    orders.push('Symptomatic or Mg <0.5 mmol/L (1.2 mg/dL): MgSO₄ 1–2 g IV over 15 min, then 4–8 g IV over 12–24 h.')
    orders.push('Total body deficit can be 1–2 mmol/kg and ~50% of IV Mg is excreted — continue repletion for 3–5 days (IV then oral).')
  } else if (severity === 'moderate' || (severity === 'mild' && !i.canTakeOral)) {
    orders.push(`MgSO₄ 2–4 g IV at ≤${MG.nonUrgentMaxGPerHour} g/h (slow infusion improves retention — a fast rise suppresses TAL reabsorption via the CaSR).`)
  } else if (severity === 'mild') {
    orders.push('Oral: 240–1000 mg elemental Mg/day in divided doses (e.g., Mg chloride or lactate are better absorbed than oxide). Diarrhea limits the dose.')
  } else {
    orders.push('Serum Mg is within range. Low-normal values do not exclude depletion — treat empirically if refractory hypokalemia/hypocalcemia or arrhythmia.')
  }
  if (renal) {
    cautions.push(`eGFR <${MG.renalReduceBelowEgfr}: reduce dose ≈50%, check Mg every 6–12 h, and monitor reflexes and respiratory rate.`)
  }
  cautions.push(`1 g MgSO₄·7H₂O = ${MG.perGram.mmol} mmol = ${MG.perGram.meq} mEq = ${MG.perGram.mgElemental} mg elemental Mg.`)
  cautions.push('Check and replete K and Ca at the same time; they will not normalize while Mg is low.')
  cautions.push('Serum Mg drawn soon after an infusion overestimates repletion — recheck ≥6–12 h later.')
  return { severity, orders, cautions }
}

/**
 * Hypermagnesemia toxicity bands (mmol/L). 1 mmol/L = 2.43 mg/dL = 2 mEq/L.
 */
export const MG_TOXICITY = [
  { from: 2.0, to: 3.0, findings: 'Nausea, flushing, headache, lethargy, diminished deep tendon reflexes' },
  { from: 3.0, to: 5.0, findings: 'Somnolence, absent reflexes, hypotension, bradycardia, hypocalcemia, PR/QRS prolongation' },
  { from: 5.0, to: 99, findings: 'Flaccid paralysis, respiratory failure, complete heart block, cardiac arrest' },
]

export function mgToxicity(mgMmol: number): string {
  const band = MG_TOXICITY.find((b) => mgMmol >= b.from && mgMmol < b.to)
  return band ? band.findings : mgMmol > REF.mgMmol.high ? 'Mild elevation: usually asymptomatic' : 'Not elevated'
}
