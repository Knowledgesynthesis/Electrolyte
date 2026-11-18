import { useMemo, useState } from 'react'
import { planHyperkalemia, SEVERITY_LABEL, type ActionStep } from '@/lib/clinical/potassium'
import { toConventional } from '@/lib/clinical/units'
import { useSettings } from '@/stores/settings'
import { cn, num } from '@/lib/utils'
import { Badge, NumberField, Toggle } from '../ui'
import { Finding, Fineprint, Grid } from './common'

const PHASE: Record<ActionStep['phase'], { label: string; cls: string }> = {
  protect: { label: 'Protect', cls: 'bg-danger text-white' },
  shift: { label: 'Shift', cls: 'bg-warn text-black' },
  remove: { label: 'Remove', cls: 'bg-primary text-primary-foreground' },
  monitor: { label: 'Monitor', cls: 'bg-info text-black' },
  prevent: { label: 'Prevent', cls: 'bg-ok text-black' },
}

export default function HyperKTool() {
  const units = useSettings((s) => s.units)
  const si = units === 'SI'
  const [k, setK] = useState('6.8')
  const [glu, setGlu] = useState(si ? '5.0' : '90')
  const [weight, setWeight] = useState('70')
  const [f, setF] = useState({ ecgChanges: true, hasDiabetes: false, eskdOrOliguricAki: false, volumeOverloaded: false, severeAcidosis: false, ongoingRelease: false, onDigoxin: false })
  const tog = (key: keyof typeof f) => (v: boolean) => setF({ ...f, [key]: v })

  const kv = num(k)
  const g = num(glu)
  const w = num(weight)
  const plan = useMemo(() => {
    if (kv === undefined || g === undefined || w === undefined || kv < 5.1 || kv > 12) return null
    return planHyperkalemia({ k: kv, glucoseMgDl: si ? toConventional('glucose', g) : g, weightKg: w, ...f })
  }, [kv, g, w, f, si])

  return (
    <div className="space-y-5">
      <Grid cols={3}>
        <NumberField label="Serum K" value={k} onChange={setK} unit="mmol/L" min={5.1} max={12} />
        <NumberField label="Blood glucose" value={glu} onChange={setGlu} unit={si ? 'mmol/L' : 'mg/dL'} min={1} max={si ? 60 : 1000} />
        <NumberField label="Weight" value={weight} onChange={setWeight} unit="kg" min={20} max={250} />
      </Grid>
      <div className="grid gap-1 sm:grid-cols-2">
        <Toggle checked={f.ecgChanges} onChange={tog('ecgChanges')} label="Hyperkalemic ECG changes" hint="Peaked T, PR/QRS prolongation, loss of P, bradyarrhythmia, sine wave" />
        <Toggle checked={f.hasDiabetes} onChange={tog('hasDiabetes')} label="Known diabetes" />
        <Toggle checked={f.eskdOrOliguricAki} onChange={tog('eskdOrOliguricAki')} label="ESKD or oligo-anuric AKI" />
        <Toggle checked={f.ongoingRelease} onChange={tog('ongoingRelease')} label="Ongoing release (rhabdomyolysis, tumor lysis)" />
        <Toggle checked={f.volumeOverloaded} onChange={tog('volumeOverloaded')} label="Volume overloaded" />
        <Toggle checked={f.severeAcidosis} onChange={tog('severeAcidosis')} label="Severe metabolic acidosis (pH ≤7.2)" />
        <Toggle checked={f.onDigoxin} onChange={tog('onDigoxin')} label="Taking digoxin" />
      </div>
      {!plan && <Finding tone="warn">Enter K between 5.1 and 12 mmol/L.</Finding>}
      {plan && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={plan.emergency ? 'danger' : 'warn'}>{SEVERITY_LABEL[plan.severity]}</Badge>
            {plan.emergency && <Badge tone="danger">Emergency pathway</Badge>}
          </div>
          <ol className="space-y-3">
            {plan.steps.map((s, i) => (
              <li key={i} className={cn('rounded-xl border p-3', s.priority === 'now' ? 'border-border bg-card' : 'border-dashed border-border bg-muted/40')}>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className={cn('rounded-md px-2 py-0.5 text-xs font-bold uppercase', PHASE[s.phase].cls)}>{PHASE[s.phase].label}</span>
                  <span className="font-semibold">{s.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{s.priority === 'now' ? 'Now' : s.priority === 'soon' ? 'Within the hour' : 'Consider'}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ol>
          <Fineprint>Aligned with UK Kidney Association guidance (2023, updated 2026) and ERC 2025. Doses are adult. Check against your local protocol.</Fineprint>
        </>
      )}
    </div>
  )
}
