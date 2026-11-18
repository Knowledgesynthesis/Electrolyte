import { useMemo, useState } from 'react'
import { fractionalExcretionMg, interpretFeMg, mgToxicity, planHypomagnesemia } from '@/lib/clinical/magnesium'
import { toSI } from '@/lib/clinical/units'
import { useSettings } from '@/stores/settings'
import { fmt, num } from '@/lib/utils'
import { Badge, NumberField, Toggle } from '../ui'
import { Finding, Grid, Panel } from './common'

export default function MgPlanner() {
  const units = useSettings((s) => s.units)
  const si = units === 'SI'
  const [mg, setMg] = useState(si ? '0.45' : '1.1')
  const [egfr, setEgfr] = useState('75')
  const [f, setF] = useState({ torsadesOrArrest: false, symptomatic: false, canTakeOral: true })
  const [fe, setFe] = useState({ uMg: '', pCr: '', uCr: '' })

  const m = num(mg)
  const mMmol = m === undefined ? undefined : si ? m : toSI('magnesium', m)
  const e = num(egfr) ?? 90
  const plan = useMemo(() => (mMmol !== undefined ? planHypomagnesemia({ mgMmol: mMmol, egfr: e, ...f }) : null), [mMmol, e, f])
  const feVal = (() => {
    const u = num(fe.uMg)
    const pc = num(fe.pCr)
    const uc = num(fe.uCr)
    if (u === undefined || pc === undefined || uc === undefined || mMmol === undefined || uc === 0) return undefined
    // urine Mg entered in same unit system as serum
    const uMmol = si ? u : toSI('magnesium', u)
    return fractionalExcretionMg(uMmol, mMmol, uc, pc)
  })()

  return (
    <div className="space-y-5">
      <Grid cols={2}>
        <NumberField label="Serum Mg" value={mg} onChange={setMg} unit={si ? 'mmol/L' : 'mg/dL'} min={si ? 0.1 : 0.2} max={si ? 5 : 12} hint={si ? '1 mmol/L = 2.43 mg/dL = 2 mEq/L' : '1 mg/dL = 0.41 mmol/L'} />
        <NumberField label="eGFR" value={egfr} onChange={setEgfr} unit="mL/min/1.73m²" min={0} max={150} />
      </Grid>
      <div className="grid gap-1 sm:grid-cols-3">
        <Toggle checked={f.torsadesOrArrest} onChange={(v) => setF({ ...f, torsadesOrArrest: v })} label="Torsades de pointes" />
        <Toggle checked={f.symptomatic} onChange={(v) => setF({ ...f, symptomatic: v })} label="Seizure, tetany, arrhythmia" />
        <Toggle checked={f.canTakeOral} onChange={(v) => setF({ ...f, canTakeOral: v })} label="Can take oral" />
      </div>
      {plan && mMmol !== undefined && (
        <>
          <div className="flex flex-wrap gap-2">
            <Badge tone={plan.severity === 'severe' ? 'danger' : plan.severity === 'normal' ? 'ok' : 'warn'}>
              {mMmol > 1.0 ? 'Elevated' : plan.severity === 'normal' ? 'Within reference' : `${plan.severity[0].toUpperCase()}${plan.severity.slice(1)} hypomagnesemia`} ({fmt(mMmol, 2)} mmol/L)
            </Badge>
          </div>
          {mMmol > 1.0 ? (
            <Finding tone={mMmol >= 2 ? 'danger' : 'warn'} title="Hypermagnesemia">
              {mgToxicity(mMmol)}. Stop Mg sources; calcium gluconate for toxicity; saline + loop if kidneys work; dialysis if severe with kidney failure.
            </Finding>
          ) : (
            <>
              <Panel title="Plan">
                {plan.orders.map((o) => (
                  <Finding key={o} tone={o.startsWith('Torsades') || o.startsWith('Symptomatic') ? 'danger' : 'info'}>
                    {o}
                  </Finding>
                ))}
              </Panel>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {plan.cautions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
      <Panel title="Where is it going? FEMg (before replacing)">
        <Grid cols={3}>
          <NumberField label="Urine Mg" value={fe.uMg} onChange={(v) => setFe({ ...fe, uMg: v })} unit={si ? 'mmol/L' : 'mg/dL'} min={0} max={50} />
          <NumberField label="Plasma creatinine" value={fe.pCr} onChange={(v) => setFe({ ...fe, pCr: v })} unit="any unit*" min={0} />
          <NumberField label="Urine creatinine" value={fe.uCr} onChange={(v) => setFe({ ...fe, uCr: v })} unit="same unit*" min={0} />
        </Grid>
        <p className="text-xs text-muted-foreground">*Use the same creatinine unit for plasma and urine.</p>
        {feVal !== undefined && <Finding tone={feVal > 2 ? 'warn' : 'ok'}>{interpretFeMg(feVal)}</Finding>}
      </Panel>
    </div>
  )
}
