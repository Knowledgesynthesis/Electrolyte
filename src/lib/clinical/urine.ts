/** Urine indices. Concentrations in matching units (mmol/L, or mg/dL for creatinine/urea). */

/** FENa (%) = (UNa × PCr) / (PNa × UCr) × 100 */
export function feNa(uNa: number, pNa: number, uCr: number, pCr: number): number {
  return ((uNa * pCr) / (pNa * uCr)) * 100
}

export function interpretFeNa(fe: number, onDiuretic: boolean): string {
  if (onDiuretic) return 'On diuretics FENa is unreliable — use FEurea (<35% suggests prerenal).'
  if (fe < 1) return 'FENa <1%: avid Na retention (prerenal physiology; also contrast, rhabdomyolysis, early obstruction, glomerulonephritis).'
  if (fe > 2) return 'FENa >2%: tubular Na loss (ATN, diuretics, CKD, salt wasting).'
  return 'FENa 1–2%: indeterminate.'
}

/** FEurea (%) = (Uurea × PCr) / (Purea × UCr) × 100 */
export function feUrea(uUrea: number, pUrea: number, uCr: number, pCr: number): number {
  return ((uUrea * pCr) / (pUrea * uCr)) * 100
}

/** Urine anion gap = UNa + UK − UCl (a surrogate for NH₄⁺ excretion) */
export function urineAnionGap(uNa: number, uK: number, uCl: number) {
  const gap = uNa + uK - uCl
  return {
    gap,
    interpretation:
      gap < 0
        ? 'Negative: NH₄⁺ excretion is high → kidneys are responding (GI HCO₃ loss, proximal RTA after reaching new steady state).'
        : 'Positive: low NH₄⁺ excretion → distal RTA (type 1 or 4). Unreliable with ketonuria/other unmeasured anions or urine Na <20.',
  }
}

/**
 * Urine osmolal gap = measured Uosm − [2(UNa+UK) + Uurea + Uglucose] (SI) → NH₄⁺ ≈ gap/2.
 * Conventional: urea N mg/dL ÷ 2.8, glucose mg/dL ÷ 18.
 */
export function urineOsmolalGap(
  uOsm: number,
  uNa: number,
  uK: number,
  uUrea: number,
  uGlucose: number,
  system: 'SI' | 'conventional',
) {
  const calc = system === 'SI' ? 2 * (uNa + uK) + uUrea + uGlucose : 2 * (uNa + uK) + uUrea / 2.8 + uGlucose / 18
  const gap = uOsm - calc
  const nh4 = gap / 2
  return {
    gap,
    nh4,
    interpretation:
      gap < 100
        ? 'Low (<100 mOsm/kg, NH₄⁺ <50 mmol/L): impaired NH₄⁺ excretion → RTA.'
        : gap > 150
          ? 'High (>150 mOsm/kg): appropriate NH₄⁺ excretion → extrarenal cause (diarrhea).'
          : 'Intermediate — interpret with clinical context.',
  }
}
