import { describe, expect, it } from 'vitest'
import {
  albuminAdjustedCalcium,
  albuminCorrectedAg,
  analyzeAcidBase,
  anionGap,
  calculatedOsmolality,
  classifyTotalCalcium,
  deltaRatio,
  ecgParams,
  ecgTrace,
  electrolyteFreeWaterClearance,
  elementalCalcium,
  estimateKDeficit,
  feNa,
  fractionalExcretionMg,
  freeWaterDeficit,
  furstRatio,
  glucoseCorrectedNa,
  hyponatremiaWorkup,
  metAlkExpectedPco2,
  naChangePerLiter,
  phFromValues,
  planHyperkalemia,
  planHypernatremia,
  planHypokalemia,
  planHypomagnesemia,
  planHyponatremia,
  potassiumSeverity,
  respExpectedHco3,
  simulateSodium,
  tbwFraction,
  toConventional,
  toSI,
  totalBodyWater,
  urineAnionGap,
  urineKCreatinineRatio,
  urineOsmolalGap,
  wintersExpectedPco2,
  NA_HYPO,
  mgToxicity,
} from './index'

const close = (a: number, b: number, tol = 0.05) => expect(Math.abs(a - b)).toBeLessThanOrEqual(tol)

describe('units', () => {
  it('converts calcium, magnesium, phosphate, glucose both ways', () => {
    close(toSI('calcium', 10), 2.495, 0.001)
    close(toSI('magnesium', 2.43), 1.0, 0.01)
    close(toSI('phosphate', 3.1), 1.0, 0.01)
    close(toSI('glucose', 180), 10, 0.05)
    for (const a of ['calcium', 'magnesium', 'phosphate', 'glucose', 'bun', 'creatinine', 'albumin'] as const) {
      close(toConventional(a, toSI(a, 7.3)), 7.3, 1e-9)
    }
  })
})

describe('sodium', () => {
  it('estimates TBW fractions', () => {
    expect(tbwFraction('male', 40)).toBe(0.6)
    expect(tbwFraction('female', 40)).toBe(0.5)
    expect(tbwFraction('male', 70)).toBe(0.5)
    expect(tbwFraction('female', 70)).toBe(0.45)
    expect(tbwFraction('female', 10)).toBe(0.6)
    expect(totalBodyWater(70, 'male', 40)).toBe(42)
  })

  it('calculates osmolality in both systems consistently', () => {
    const conv = calculatedOsmolality(140, 90, 14, 'conventional')
    close(conv, 280 + 5 + 5, 0.01)
    const si = calculatedOsmolality(140, toSI('glucose', 90), toSI('bun', 14), 'SI')
    close(si, conv, 0.3)
  })

  it('applies Hillier and Katz glucose correction', () => {
    expect(glucoseCorrectedNa(130, 600)).toBe(142)
    close(glucoseCorrectedNa(130, 600, 1.6), 138)
    expect(glucoseCorrectedNa(130, 80)).toBe(130)
  })

  it('Adrogué–Madias: worked NEJM-style example', () => {
    // 70 kg man, TBW 42 L, Na 110, 1 L of 3% saline → (513−110)/43 ≈ 9.4
    close(naChangePerLiter(110, 513, 42), 9.37, 0.01)
    // D5W in hypernatremia Na 160, TBW 42 → −3.7 per L
    close(naChangePerLiter(160, 0, 42), -3.72, 0.01)
  })

  it('free water deficit', () => {
    close(freeWaterDeficit(160, 42), 6.0, 0.01)
    expect(freeWaterDeficit(135, 42)).toBe(0)
  })

  it('EFWC sign follows physiology', () => {
    expect(electrolyteFreeWaterClearance(2, 30, 20, 120)).toBeGreaterThan(0)
    expect(electrolyteFreeWaterClearance(1, 150, 60, 120)).toBeLessThan(0)
  })

  it('Furst ratio tiers', () => {
    expect(furstRatio(150, 60, 125).restrictionMl).toBeNull()
    expect(furstRatio(60, 20, 125).restrictionMl).toBe(500)
    expect(furstRatio(30, 20, 125).restrictionMl).toBe(1000)
  })

  it('mass-balance simulation reproduces Adrogué–Madias without outputs', () => {
    const tbw = 42
    const series = simulateSodium({ na0: 110, tbw, hours: 10, inputs: [{ startH: 0, endH: 10, mlPerH: 100, naK: 513 }] })
    close(series[10] - 110, naChangePerLiter(110, 513, tbw), 0.3)
  })

  it('aquaresis raises Na even without saline (overcorrection mechanism)', () => {
    const series = simulateSodium({ na0: 118, tbw: 30, hours: 6, outputs: [{ startH: 0, endH: 6, mlPerH: 500, naK: 20 }] })
    expect(series[6]).toBeGreaterThan(125)
  })

  it('hyponatremia plan: high-risk patient gets the stricter limit and goal', () => {
    const plan = planHyponatremia({
      na: 104,
      weightKg: 60,
      sex: 'female',
      age: 50,
      acuity: 'chronic',
      symptoms: 'severe',
      risk: { alcohol: true, malnutrition: false, liverDisease: false, hypokalemia: true },
      infusateId: 'nacl3',
    })
    expect(plan.highRisk).toBe(true)
    expect(plan.limit24h).toBe(NA_HYPO.limitHighRisk24h)
    expect(plan.aim24h).toBeLessThanOrEqual(plan.limit24h)
    expect(plan.bolus?.doses).toBe(3)
    expect(plan.riskReasons).toContain('Hypokalemia')
  })

  it('hyponatremia plan: warns that hypotonic fluid lowers Na', () => {
    const plan = planHyponatremia({
      na: 125,
      weightKg: 70,
      sex: 'male',
      age: 40,
      acuity: 'chronic',
      symptoms: 'none',
      risk: { alcohol: false, malnutrition: false, liverDisease: false, hypokalemia: false },
      infusateId: 'nacl045',
    })
    expect(plan.bolus).toBeNull()
    expect(plan.litersToAim).toBeNull()
    expect(plan.warnings.join(' ')).toMatch(/lower Na further/)
  })

  it('hypernatremia plan: chronic target ≈10 mmol/L with ongoing losses added', () => {
    const plan = planHypernatremia({ na: 160, weightKg: 70, sex: 'male', age: 40, acuity: 'chronic', infusateId: 'd5w', ongoingLossesL: 1 })
    expect(plan.targetDrop24h).toBe(10)
    close(plan.litersForDrop!, 10 / 3.72, 0.02)
    close(plan.mlPerHour!, ((10 / 3.72 + 1) * 1000) / 24, 1)
  })

  it('hypernatremia plan: fluid at or above serum Na cannot lower it', () => {
    const plan = planHypernatremia({ na: 150, weightKg: 70, sex: 'male', age: 40, acuity: 'chronic', infusateId: 'nacl09', ongoingLossesL: 1 })
    expect(plan.mlPerHour).toBeNull()
  })

  it('workup: SIADH pattern', () => {
    const r = hyponatremiaWorkup({ na: 122, measuredOsm: 255, urineOsm: 450, urineNa: 60, volume: 'eu' })
    expect(r.conclusion).toMatch(/SIADH/)
  })
  it('workup: primary polydipsia / low solute', () => {
    const r = hyponatremiaWorkup({ na: 124, measuredOsm: 258, urineOsm: 70 })
    expect(r.differentials.join(' ')).toMatch(/polydipsia/)
  })
  it('workup: pseudohyponatremia when osmolality normal', () => {
    const r = hyponatremiaWorkup({ na: 128, measuredOsm: 288 })
    expect(r.conclusion).toMatch(/pseudohyponatremia/i)
  })
  it('workup: hyperglycemia corrected', () => {
    const r = hyponatremiaWorkup({ na: 126, glucoseMgDl: 800 })
    expect(r.conclusion).toMatch(/hyperglycemia/i)
  })
  it('workup: diuretic makes urine Na uninterpretable', () => {
    const r = hyponatremiaWorkup({ na: 120, measuredOsm: 250, urineOsm: 400, urineNa: 50, volume: 'eu', onDiuretic: true })
    expect(r.conclusion).toMatch(/Thiazide/)
  })
})

describe('potassium', () => {
  it('severity bands', () => {
    expect(potassiumSeverity(2.4)).toBe('severe-low')
    expect(potassiumSeverity(2.5)).toBe('moderate-low')
    expect(potassiumSeverity(3.0)).toBe('mild-low')
    expect(potassiumSeverity(4.2)).toBe('normal')
    expect(potassiumSeverity(5.5)).toBe('mild-high')
    expect(potassiumSeverity(6.0)).toBe('moderate-high')
    expect(potassiumSeverity(6.5)).toBe('severe-high')
  })

  it('urine K/Cr ratio handles both creatinine units identically', () => {
    const a = urineKCreatinineRatio(20, 10, 'mmol/L')
    const b = urineKCreatinineRatio(20, 113.1, 'mg/dL')
    close(a.ratio, b.ratio, 0.01)
    expect(urineKCreatinineRatio(10, 10, 'mmol/L').interpretation).toMatch(/extrarenal/)
  })

  it('deficit heuristic scales with weight', () => {
    expect(estimateKDeficit(3, 70)).toEqual([200, 400])
    expect(estimateKDeficit(3, 35)).toEqual([100, 200])
    expect(estimateKDeficit(4.2, 70)).toEqual([0, 0])
  })

  it('hypokalemia plan prioritizes Mg and respects IV limits', () => {
    const p = planHypokalemia({ k: 2.3, weightKg: 70, ecgChangesOrSymptoms: true, canTakeOral: true, centralLine: false, lowMg: true, reducedEgfr: false, periodicParalysis: false })
    expect(p.orders[0]).toMatch(/magnesium/i)
    expect(p.orders.join(' ')).toMatch(/10 mmol\/h/)
    expect(p.route).toBe('iv+oral')
  })

  it('periodic paralysis uses small doses', () => {
    const p = planHypokalemia({ k: 1.9, weightKg: 70, ecgChangesOrSymptoms: true, canTakeOral: true, centralLine: false, lowMg: false, reducedEgfr: false, periodicParalysis: true })
    expect(p.orders.join(' ')).toMatch(/propranolol/)
  })

  it('hyperkalemia: calcium only with ECG changes; dextrose skipped when glucose high', () => {
    const base = { k: 6.8, glucoseMgDl: 300, hasDiabetes: true, weightKg: 80, eskdOrOliguricAki: false, volumeOverloaded: false, severeAcidosis: false, ongoingRelease: false, onDigoxin: false }
    const noEcg = planHyperkalemia({ ...base, ecgChanges: false })
    expect(noEcg.steps.some((s) => s.phase === 'protect')).toBe(false)
    expect(noEcg.emergency).toBe(true)
    const ecg = planHyperkalemia({ ...base, ecgChanges: true })
    expect(ecg.steps.some((s) => s.phase === 'protect')).toBe(true)
    expect(ecg.steps.find((s) => s.title === 'Insulin–glucose')!.detail).toMatch(/dextrose not needed/)
  })

  it('hyperkalemia: low glucose triggers follow-on dextrose; bicarbonate only for acidosis', () => {
    const p = planHyperkalemia({ k: 6.2, ecgChanges: false, glucoseMgDl: 95, hasDiabetes: false, weightKg: 55, eskdOrOliguricAki: true, volumeOverloaded: false, severeAcidosis: false, ongoingRelease: false, onDigoxin: false })
    expect(p.steps.find((s) => s.title === 'Insulin–glucose')!.detail).toMatch(/50 mL\/h for 5 h/)
    expect(p.steps.some((s) => s.title.startsWith('Sodium bicarbonate'))).toBe(false)
    expect(p.steps.some((s) => s.title === 'Dialysis' && s.priority === 'now')).toBe(true)
  })

  it('mild hyperkalemia does not trigger shift therapy', () => {
    const p = planHyperkalemia({ k: 5.6, ecgChanges: false, glucoseMgDl: 100, hasDiabetes: false, weightKg: 70, eskdOrOliguricAki: false, volumeOverloaded: false, severeAcidosis: false, ongoingRelease: false, onDigoxin: false })
    expect(p.emergency).toBe(false)
    expect(p.steps.some((s) => s.phase === 'shift')).toBe(false)
  })
})

describe('calcium', () => {
  it('albumin adjustment in both unit systems agrees', () => {
    close(albuminAdjustedCalcium(7.6, 2.0, 'conventional'), 9.2, 1e-9)
    const si = albuminAdjustedCalcium(toSI('calcium', 7.6), 20, 'SI')
    close(si, toSI('calcium', 9.2), 0.01)
  })

  it('classifies totals', () => {
    expect(classifyTotalCalcium(7.0).band).toBe('severe-low')
    expect(classifyTotalCalcium(8.0).band).toBe('low')
    expect(classifyTotalCalcium(9.5).band).toBe('normal')
    expect(classifyTotalCalcium(11).band).toBe('mild-high')
    expect(classifyTotalCalcium(13).band).toBe('moderate-high')
    expect(classifyTotalCalcium(15).band).toBe('severe-high')
  })

  it('gluconate vs chloride elemental content (~3×)', () => {
    const g = elementalCalcium('gluconate10', 30)
    const c = elementalCalcium('chloride10', 10)
    close(g.mmol, c.mmol, 0.2)
    expect(c.mg / elementalCalcium('gluconate10', 10).mg).toBeGreaterThan(2.8)
  })
})

describe('magnesium', () => {
  it('FEMg formula', () => {
    // UMg 2, PMg 0.5, UCr 8, PCr 0.08 (mmol/L) → (2×0.08)/(0.7×0.5×8)×100 = 5.7%
    close(fractionalExcretionMg(2, 0.5, 8, 0.08), 5.71, 0.01)
  })
  it('repletion plan flags torsades and renal dosing', () => {
    const p = planHypomagnesemia({ mgMmol: 0.4, torsadesOrArrest: true, symptomatic: true, egfr: 20, canTakeOral: false })
    expect(p.severity).toBe('severe')
    expect(p.orders[0]).toMatch(/Torsades/)
    expect(p.cautions.join(' ')).toMatch(/reduce dose/)
  })
  it('toxicity bands', () => {
    expect(mgToxicity(2.5)).toMatch(/reflexes/)
    expect(mgToxicity(6)).toMatch(/paralysis/)
  })
})

describe('acid–base', () => {
  it('Henderson–Hasselbalch consistency', () => {
    close(phFromValues(40, 24), 7.4, 0.01)
  })

  it('Winters formula', () => {
    expect(wintersExpectedPco2(12)).toEqual([24, 28])
  })

  it('DKA example: HAGMA with appropriate compensation, Δ/Δ ≈1', () => {
    const r = analyzeAcidBase({ ph: 7.2, pco2: 23, hco3: 9, na: 135, cl: 98, albumin: 4 })
    expect(r.primary).toBe('metabolic acidosis')
    expect(r.ag).toBe(28)
    close(r.deltaRatio!, (28 - 10) / 15, 0.01)
    expect(r.disorders.join(' ')).not.toMatch(/respiratory/)
  })

  it('detects concurrent respiratory acidosis', () => {
    const r = analyzeAcidBase({ ph: 7.05, pco2: 40, hco3: 11, na: 140, cl: 100, albumin: 4 })
    expect(r.disorders).toContain('concurrent respiratory acidosis')
  })

  it('hidden metabolic alkalosis via Δ/Δ > 2', () => {
    const r = analyzeAcidBase({ ph: 7.4, pco2: 40, hco3: 24, na: 145, cl: 95, albumin: 4 })
    expect(r.primary).toBe('normal')
    expect(r.correctedAg).toBe(26)
    expect(r.disorders).toContain('concurrent metabolic alkalosis')
  })

  it('albumin unmasking of the gap', () => {
    const ag = anionGap(138, 110, 18) // 10
    close(albuminCorrectedAg(ag, 2.0), 15, 1e-9)
    const r = analyzeAcidBase({ ph: 7.3, pco2: 36, hco3: 18, na: 138, cl: 110, albumin: 2.0 })
    expect(r.disorders.join(' ')).toMatch(/high anion gap/)
  })

  it('normal-AG acidosis routes to NAGMA differentials', () => {
    const r = analyzeAcidBase({ ph: 7.3, pco2: 33, hco3: 16, na: 140, cl: 115, albumin: 4 })
    expect(r.differentials.join(' ')).toMatch(/diarrhea/i)
  })

  it('chronic respiratory acidosis compensation', () => {
    close(respExpectedHco3(60, 'acidosis', 'chronic'), 31, 1e-9)
    close(respExpectedHco3(60, 'acidosis', 'acute'), 26, 1e-9)
    const r = analyzeAcidBase({ ph: 7.36, pco2: 60, hco3: 32, respiratoryChronicity: 'chronic' })
    expect(r.primary).toBe('respiratory acidosis')
    expect(r.disorders).toEqual(['respiratory acidosis'])
  })

  it('metabolic alkalosis expected pCO2', () => {
    expect(metAlkExpectedPco2(34)).toEqual([0.7 * 34 + 19, 0.7 * 34 + 23])
  })

  it('osmolal gap flags toxic alcohol', () => {
    const r = analyzeAcidBase({ ph: 7.15, pco2: 20, hco3: 7, na: 140, cl: 100, albumin: 4, measuredOsm: 330, glucoseMgDl: 90, bunMgDl: 14 })
    expect(r.osmolalGap!).toBeGreaterThan(30)
  })

  it('delta ratio is infinite if HCO3 not reduced', () => {
    expect(deltaRatio(20, 26)).toBe(Number.POSITIVE_INFINITY)
  })
})

describe('urine indices', () => {
  it('FENa', () => {
    close(feNa(10, 140, 100, 1), 0.071, 0.001)
  })
  it('urine anion gap and osmolal gap', () => {
    expect(urineAnionGap(40, 30, 100).gap).toBe(-30)
    const uog = urineOsmolalGap(500, 40, 30, 200, 0, 'SI')
    expect(uog.gap).toBe(160)
    expect(uog.nh4).toBe(80)
  })
})

describe('ECG synthesis', () => {
  it('peaks T and widens QRS with rising K; adds U waves when low', () => {
    expect(ecgParams(6.5).tAmp).toBeGreaterThan(ecgParams(4).tAmp)
    expect(ecgParams(7.5).qrsWidth).toBeGreaterThan(ecgParams(4).qrsWidth)
    expect(ecgParams(8.0).pAmp).toBeLessThan(0.02)
    expect(ecgParams(2.0).uAmp).toBeGreaterThan(ecgParams(2.0).tAmp)
    expect(ecgParams(9).sine).toBe(1)
  })
})

describe('stress: no NaN/Infinity across physiologic input space', () => {
  it('sodium planners stay finite and within limits', () => {
    for (let na = 100; na <= 134; na += 1) {
      for (const w of [3, 40, 70, 150]) {
        for (const age of [5, 30, 80]) {
          const p = planHyponatremia({
            na,
            weightKg: w,
            sex: 'female',
            age,
            acuity: 'chronic',
            symptoms: 'severe',
            risk: { alcohol: false, malnutrition: false, liverDisease: false, hypokalemia: false },
            infusateId: 'nacl3',
          })
          expect(Number.isFinite(p.perLiter)).toBe(true)
          expect(Number.isFinite(p.mlPerHourOver24h!)).toBe(true)
          expect(p.aim24h).toBeLessThanOrEqual(p.limit24h)
          expect(p.bolus!.predictedRiseEach).toBeGreaterThan(0)
        }
      }
    }
    for (let na = 146; na <= 190; na += 2) {
      for (const f of ['d5w', 'nacl045', 'nacl02']) {
        const p = planHypernatremia({ na, weightKg: 70, sex: 'male', age: 50, acuity: 'chronic', infusateId: f, ongoingLossesL: 1 })
        if (p.mlPerHour !== null) {
          expect(Number.isFinite(p.mlPerHour)).toBe(true)
          expect(p.mlPerHour).toBeGreaterThan(0)
        }
        expect(p.targetDrop24h).toBeLessThanOrEqual(10)
      }
    }
  })

  it('acid–base analyzer handles extremes', () => {
    for (const ph of [6.8, 7.0, 7.2, 7.4, 7.6, 7.8]) {
      for (const pco2 of [10, 25, 40, 60, 100]) {
        for (const hco3 of [3, 10, 24, 35, 50]) {
          const r = analyzeAcidBase({ ph, pco2, hco3, na: 140, cl: 100, albumin: 3 })
          expect(r.findings.length).toBeGreaterThan(2)
          expect(r.primary).toBeTypeOf('string')
          for (const f of r.findings) expect(f.text).not.toMatch(/NaN|undefined/)
        }
      }
    }
  })

  it('ECG trace is finite for K 1.5–10', () => {
    for (let k = 1.5; k <= 10; k += 0.25) {
      const pts = ecgTrace(k, 2)
      expect(pts.length).toBeGreaterThan(100)
      for (const p of pts) expect(Number.isFinite(p.v)).toBe(true)
    }
  })
})
