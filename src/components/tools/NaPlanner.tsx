import { useMemo, useState } from 'react'
import { INFUSATES, planHyponatremia, simulateSodium, type Acuity, type Sex, type SymptomGrade } from '@/lib/clinical/sodium'
import { NA_HYPO } from '@/lib/clinical/constants'
import { fmt, num } from '@/lib/utils'
import { LineChart } from '../LineChart'
import { NumberField, Segmented, SelectField, Stat, Toggle } from '../ui'
import { Finding, Fineprint, Grid, Panel, RichFinding } from './common'

export default function NaPlanner() {
  const [na, setNa] = useState('112')
  const [weight, setWeight] = useState('60')
  const [age, setAge] = useState('70')
  const [sex, setSex] = useState<Sex>('female')
  const [acuity, setAcuity] = useState<Acuity>('chronic')
  const [symptoms, setSymptoms] = useState<SymptomGrade>('severe')
  const [risk, setRisk] = useState({ alcohol: false, malnutrition: false, liverDisease: false, hypokalemia: true })
  const [infusateId, setInfusateId] = useState('nacl3')
  const [infuse, setInfuse] = useState(false)
  const [aqua, setAqua] = useState(true)
  const [aquaRate, setAquaRate] = useState('300')
  const [aquaStart, setAquaStart] = useState('6')

  const n = num(na)
  const w = num(weight)
  const a = num(age)
  const valid = n !== undefined && w !== undefined && a !== undefined && n >= 95 && n < 135 && w >= 2 && w <= 300 && a >= 0 && a <= 110

  const plan = useMemo(() => (valid ? planHyponatremia({ na: n!, weightKg: w!, sex, age: a!, acuity, symptoms, risk, infusateId }) : null), [valid, n, w, a, sex, acuity, symptoms, risk, infusateId])

  const sim = useMemo(() => {
    if (!plan || !valid) return null
    const inputs = []
    let bolusRise = 0
    if (plan.bolus) {
      inputs.push({ startH: 0, endH: 0.5, mlPerH: (plan.bolus.doses * plan.bolus.mlEach) / 0.5, naK: 513 })
      bolusRise = plan.bolus.doses * plan.bolus.predictedRiseEach
    }
    const f = INFUSATES.find((x) => x.id === infusateId)!
    let rate = 0
    if (infuse && plan.perLiter > 0) {
      const remaining = Math.max(0, plan.aim24h - bolusRise)
      rate = ((remaining / plan.perLiter) * 1000) / 23
      inputs.push({ startH: 1, endH: 24, mlPerH: rate, naK: f.naK })
    }
    const base = simulateSodium({ na0: n!, tbw: plan.tbw, hours: 24, inputs })
    const ar = num(aquaRate) ?? 0
    const as = Math.min(23, Math.max(0, num(aquaStart) ?? 6))
    const withAqua = aqua && ar > 0 ? simulateSodium({ na0: n!, tbw: plan.tbw, hours: 24, inputs, outputs: [{ startH: as, endH: 24, mlPerH: ar, naK: 30 }] }) : null
    return { base, withAqua, rate, bolusRise }
  }, [plan, valid, n, infuse, infusateId, aqua, aquaRate, aquaStart])

  const exceeded = sim?.withAqua ? sim.withAqua.findIndex((v) => v - n! > plan!.limit24h) : -1

  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <NumberField label="Serum Na" value={na} onChange={setNa} unit="mmol/L" min={95} max={134} />
        <NumberField label="Weight" value={weight} onChange={setWeight} unit="kg" min={2} max={300} />
        <NumberField label="Age" value={age} onChange={setAge} unit="years" min={0} max={110} />
      </Grid>
      <div className="flex flex-wrap gap-4">
        <Segmented label="Sex" value={sex} onChange={setSex} options={[{ value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }]} />
        <Segmented label="Duration" value={acuity} onChange={setAcuity} options={[{ value: 'chronic', label: '≥48 h / unknown' }, { value: 'acute', label: '<48 h (documented)' }]} />
        <Segmented
          label="Symptoms"
          value={symptoms}
          onChange={(v) => {
            setSymptoms(v)
            setInfuse(v === 'none')
          }}
          options={[
            { value: 'severe', label: 'Severe' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'none', label: 'Mild / none' },
          ]}
        />
      </div>
      <div>
        <div className="mb-1 text-sm font-medium">ODS risk factors</div>
        <div className="grid gap-1 sm:grid-cols-2">
          <Toggle checked={risk.hypokalemia} onChange={(v) => setRisk({ ...risk, hypokalemia: v })} label="Hypokalemia" />
          <Toggle checked={risk.alcohol} onChange={(v) => setRisk({ ...risk, alcohol: v })} label="Alcohol use disorder" />
          <Toggle checked={risk.malnutrition} onChange={(v) => setRisk({ ...risk, malnutrition: v })} label="Malnutrition" />
          <Toggle checked={risk.liverDisease} onChange={(v) => setRisk({ ...risk, liverDisease: v })} label="Advanced liver disease" />
        </div>
      </div>

      {!plan && <Finding tone="warn">Enter Na 95–134 mmol/L, weight and age to build a plan.</Finding>}

      {plan && sim && (
        <>
          <Grid cols={4}>
            <Stat label="Total body water" value={fmt(plan.tbw, 1)} unit="L" />
            <Stat label="24 h limit" value={`+${plan.limit24h}`} unit="mmol/L" tone="danger" sub={plan.highRisk ? 'High ODS risk' : 'Standard risk'} />
            <Stat label="24 h goal" value={`+${plan.goalRange[0]}–${plan.goalRange[1]}`} unit="mmol/L" tone="ok" />
            <Stat label="Δ per L of fluid" value={fmt(plan.perLiter, 1)} unit="mmol/L" sub={INFUSATES.find((i) => i.id === infusateId)?.name} />
          </Grid>

          {plan.bolus && (
            <Finding tone="danger" title={`Step 1 — ${plan.bolus.doses > 1 ? 'Bolus therapy' : 'Single bolus'}`}>
              {plan.bolus.rationale} Predicted rise per {plan.bolus.mlEach} mL ≈ <strong>{fmt(plan.bolus.predictedRiseEach, 1)} mmol/L</strong> by formula — the measured rise is often larger.
            </Finding>
          )}

          <Panel title="Infusion">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Fluid" value={infusateId} onChange={setInfusateId} options={INFUSATES.map((i) => ({ value: i.id, label: `${i.name} (Na+K ${i.naK})` }))} />
              <div className="pt-6">
                <Toggle checked={infuse} onChange={setInfuse} label="Add a continuous infusion to reach the 24 h aim" hint={plan.bolus ? 'Usually not needed after boluses — cause-specific therapy follows.' : undefined} />
              </div>
            </div>
            {infuse && plan.perLiter > 0 && (
              <Finding tone="info" title="Infusion rate">
                ≈ <strong className="tabular">{fmt(sim.rate, 0)} mL/h</strong> for 23 h to reach +{plan.aim24h} mmol/L (after the bolus contribution of {fmt(sim.bolusRise, 1)}).
              </Finding>
            )}
          </Panel>

          <Panel title="Simulated 24 h course">
            <div className="flex flex-wrap items-end gap-4">
              <Toggle checked={aqua} onChange={setAqua} label="Simulate a water diuresis" hint="What happens when the ADH stimulus resolves" />
              {aqua && (
                <>
                  <div className="w-36">
                    <NumberField label="Dilute urine" value={aquaRate} onChange={setAquaRate} unit="mL/h" min={0} max={1500} />
                  </div>
                  <div className="w-36">
                    <NumberField label="Starting at hour" value={aquaStart} onChange={setAquaStart} unit="h" min={0} max={23} />
                  </div>
                </>
              )}
            </div>
            <div className="rounded-xl border border-border bg-background p-2">
              <LineChart
                yLabel="Serum Na (mmol/L)"
                series={[
                  { name: 'Plan (no urine output)', values: sim.base, color: 'var(--primary)' },
                  ...(sim.withAqua ? [{ name: 'Plan + aquaresis', values: sim.withAqua, color: 'var(--danger)', dashed: true }] : []),
                ]}
                band={{ from: n! + plan.goalRange[0], to: n! + plan.goalRange[1], label: 'Goal' }}
                hlines={[{ y: n! + plan.limit24h, label: `Limit +${plan.limit24h}`, color: 'var(--danger)' }]}
              />
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-5 bg-primary" /> Plan, formula only (24 h: {fmt(sim.base[24], 1)})
              </span>
              {sim.withAqua && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-0.5 w-5 border-t-2 border-dashed border-danger" /> With aquaresis (24 h: {fmt(sim.withAqua[24], 1)})
                </span>
              )}
            </div>
            {exceeded > 0 && (
              <Finding tone="danger" title={`Limit crossed at hour ${exceeded}`}>
                A water diuresis of {aquaRate} mL/h overshoots the {plan.limit24h} mmol/L limit. Prevent it: desmopressin 2 µg IV, replace urine with D5W, check Na every 1–2 h.
              </Finding>
            )}
          </Panel>

          <Panel title="Warnings">
            {plan.warnings.map((w) => (
              <RichFinding key={w} tone={w.startsWith('High ODS') ? 'danger' : 'warn'} text={w} />
            ))}
          </Panel>
          <Panel title="Monitoring & rescue">
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              {plan.monitoring.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Panel>
          <Fineprint>
            Model: Adrogué–Madias for single-fluid predictions; Edelman mass balance for the simulation (urine Na+K assumed 30 mmol/L). Limits: US expert panel 2013, European guideline 2014 (≤{NA_HYPO.limit24h}/24 h; ≤{NA_HYPO.limitHighRisk24h} if high risk). Trust measured sodium over any formula.
          </Fineprint>
        </>
      )}
    </div>
  )
}
