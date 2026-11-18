import { useMemo, useState } from 'react'
import { INFUSATES, planHypernatremia, simulateSodium, type Acuity, type Sex } from '@/lib/clinical/sodium'
import { fmt, num } from '@/lib/utils'
import { LineChart } from '../LineChart'
import { NumberField, Segmented, SelectField, Stat } from '../ui'
import { Finding, Fineprint, Grid, Panel } from './common'

const FREE_WATER = INFUSATES.filter((i) => ['d5w', 'nacl02', 'nacl045'].includes(i.id))

export default function HyperNaPlanner() {
  const [na, setNa] = useState('160')
  const [weight, setWeight] = useState('70')
  const [age, setAge] = useState('80')
  const [sex, setSex] = useState<Sex>('male')
  const [acuity, setAcuity] = useState<Acuity>('chronic')
  const [fluid, setFluid] = useState('d5w')
  const [losses, setLosses] = useState('1.2')

  const n = num(na)
  const w = num(weight)
  const a = num(age)
  const l = num(losses) ?? 0
  const valid = n !== undefined && w !== undefined && a !== undefined && n > 145 && n <= 200 && w >= 2 && w <= 300

  const plan = useMemo(() => (valid ? planHypernatremia({ na: n!, weightKg: w!, sex, age: a!, acuity, infusateId: fluid, ongoingLossesL: l }) : null), [valid, n, w, a, sex, acuity, fluid, l])

  const series = useMemo(() => {
    if (!plan?.mlPerHour) return null
    const f = INFUSATES.find((x) => x.id === fluid)!
    return simulateSodium({
      na0: n!,
      tbw: plan.tbw,
      hours: 24,
      inputs: [{ startH: 0, endH: 24, mlPerH: plan.mlPerHour, naK: f.naK }],
      outputs: [{ startH: 0, endH: 24, mlPerH: (l * 1000) / 24, naK: 0 }],
    })
  }, [plan, fluid, n, l])

  return (
    <div className="space-y-5">
      <Grid cols={3}>
        <NumberField label="Serum Na" value={na} onChange={setNa} unit="mmol/L" min={146} max={200} />
        <NumberField label="Weight" value={weight} onChange={setWeight} unit="kg" min={2} max={300} />
        <NumberField label="Age" value={age} onChange={setAge} unit="years" min={0} max={110} />
      </Grid>
      <div className="flex flex-wrap gap-4">
        <Segmented label="Sex" value={sex} onChange={setSex} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
        <Segmented label="Duration" value={acuity} onChange={setAcuity} options={[{ value: 'chronic', label: '≥48 h / unknown' }, { value: 'acute', label: '<48 h (documented)' }]} />
      </div>
      <Grid cols={2}>
        <SelectField label="Free-water fluid" value={fluid} onChange={setFluid} options={FREE_WATER.map((i) => ({ value: i.id, label: `${i.name} (Na+K ${i.naK})` }))} />
        <NumberField label="Ongoing free-water losses" value={losses} onChange={setLosses} unit="L/day" min={0} max={10} hint="Insensible ≈1 L/day (+10–15% per °C fever) + electrolyte-free urine/stool" />
      </Grid>
      {!plan && <Finding tone="warn">Enter Na above 145 mmol/L.</Finding>}
      {plan && (
        <>
          <Grid cols={4}>
            <Stat label="TBW" value={fmt(plan.tbw, 1)} unit="L" />
            <Stat label="Free-water deficit" value={fmt(plan.deficitL, 1)} unit="L" />
            <Stat label="Target fall (24 h)" value={`−${fmt(plan.targetDrop24h, 0)}`} unit="mmol/L" tone="ok" />
            <Stat label="Rate" value={plan.mlPerHour ? fmt(plan.mlPerHour, 0) : '—'} unit="mL/h" tone="info" sub={plan.totalLiters24h ? `${fmt(plan.totalLiters24h, 1)} L / 24 h` : undefined} />
          </Grid>
          {series && (
            <div className="rounded-xl border border-border bg-background p-2">
              <LineChart yLabel="Serum Na (mmol/L)" series={[{ name: 'Projected', values: series, color: 'var(--primary)' }]} hlines={[{ y: 145, label: 'Upper reference 145', color: 'var(--ok)' }]} />
            </div>
          )}
          <Panel title="Notes">
            {plan.warnings.map((w) => (
              <Finding key={w} tone={w.includes('cannot') || w.includes('shock') ? 'warn' : 'info'}>
                {w}
              </Finding>
            ))}
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {plan.monitoring.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Panel>
          <Fineprint>Deficit = TBW × (Na/140 − 1). Rate from Adrogué–Madias for the target fall plus ongoing losses; re-measure and adjust — formulas are starting points.</Fineprint>
        </>
      )}
    </div>
  )
}
