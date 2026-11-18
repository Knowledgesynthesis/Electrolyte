import { useMemo, useState } from 'react'
import { planHypokalemia, SEVERITY_LABEL, urineKCreatinineRatio } from '@/lib/clinical/potassium'
import { fmt, num } from '@/lib/utils'
import { Badge, NumberField, Segmented, Stat, Toggle } from '../ui'
import { Finding, Grid, Panel } from './common'

export default function HypoKTool() {
  const [k, setK] = useState('2.7')
  const [weight, setWeight] = useState('70')
  const [f, setF] = useState({ ecgChangesOrSymptoms: false, canTakeOral: true, centralLine: false, lowMg: false, reducedEgfr: false, periodicParalysis: false })
  const tog = (key: keyof typeof f) => (v: boolean) => setF({ ...f, [key]: v })
  const [uk, setUk] = useState('')
  const [ucr, setUcr] = useState('')
  const [crUnit, setCrUnit] = useState<'mmol/L' | 'mg/dL'>('mg/dL')

  const kv = num(k)
  const w = num(weight)
  const plan = useMemo(() => (kv !== undefined && w !== undefined && kv > 0.8 && kv < 3.5 && w > 1 ? planHypokalemia({ k: kv, weightKg: w, ...f }) : null), [kv, w, f])
  const ukv = num(uk)
  const ucv = num(ucr)
  const ratio = ukv !== undefined && ucv !== undefined && ucv > 0 ? urineKCreatinineRatio(ukv, ucv, crUnit) : null

  return (
    <div className="space-y-5">
      <Grid cols={2}>
        <NumberField label="Serum K" value={k} onChange={setK} unit="mmol/L" min={1} max={3.4} />
        <NumberField label="Weight" value={weight} onChange={setWeight} unit="kg" min={2} max={250} />
      </Grid>
      <div className="grid gap-1 sm:grid-cols-2">
        <Toggle checked={f.ecgChangesOrSymptoms} onChange={tog('ecgChangesOrSymptoms')} label="Arrhythmia, ECG changes, weakness/paralysis" />
        <Toggle checked={f.canTakeOral} onChange={tog('canTakeOral')} label="Can take oral potassium" />
        <Toggle checked={f.centralLine} onChange={tog('centralLine')} label="Central venous access" />
        <Toggle checked={f.lowMg} onChange={tog('lowMg')} label="Magnesium low" />
        <Toggle checked={f.reducedEgfr} onChange={tog('reducedEgfr')} label="eGFR <30 or oliguria" />
        <Toggle checked={f.periodicParalysis} onChange={tog('periodicParalysis')} label="Shift (e.g., periodic paralysis)" />
      </div>
      {!plan && <Finding tone="warn">Enter K below 3.5 mmol/L.</Finding>}
      {plan && (
        <>
          <div className="flex flex-wrap gap-2">
            <Badge tone={plan.severity === 'severe-low' ? 'danger' : 'warn'}>{SEVERITY_LABEL[plan.severity]}</Badge>
            <Badge tone="info">Route: {plan.route === 'iv+oral' ? 'IV + oral' : plan.route.toUpperCase()}</Badge>
          </div>
          <Grid cols={2}>
            <Stat label="Estimated deficit" value={`${plan.estimatedDeficit[0]}–${plan.estimatedDeficit[1]}`} unit="mmol" sub="Order of magnitude only; ongoing losses add to it" />
            <Stat label="Recheck" value={plan.route === 'oral' ? '24–72 h' : '1–2 h'} sub={plan.recheck} />
          </Grid>
          <Panel title="Orders">
            {plan.orders.map((o) => (
              <Finding key={o} tone={o.toLowerCase().includes('life-threatening') || o.toLowerCase().includes('magnesium first') ? 'danger' : 'info'}>
                {o}
              </Finding>
            ))}
          </Panel>
          <Panel title="Cautions">
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {plan.cautions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Panel>
        </>
      )}
      <Panel title="Renal or extrarenal? (spot urine K/Cr)">
        <Grid cols={3}>
          <NumberField label="Urine K" value={uk} onChange={setUk} unit="mmol/L" min={0} max={300} />
          <NumberField label="Urine creatinine" value={ucr} onChange={setUcr} unit={crUnit} min={0} max={crUnit === 'mg/dL' ? 500 : 45} />
          <div className="pt-6">
            <Segmented size="sm" value={crUnit} onChange={setCrUnit} options={[{ value: 'mg/dL', label: 'mg/dL' }, { value: 'mmol/L', label: 'mmol/L' }]} />
          </div>
        </Grid>
        {ratio && (
          <Finding tone={ratio.ratio < 1.5 ? 'ok' : 'warn'} title={`K/Cr = ${fmt(ratio.ratio, 2)} mmol/mmol (${fmt(ratio.ratio * 8.84, 0)} mEq/g)`}>
            {ratio.interpretation}
          </Finding>
        )}
      </Panel>
    </div>
  )
}
