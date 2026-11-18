import { useState } from 'react'
import { albuminAdjustedCalcium, classifyIonizedCalcium, classifyTotalCalcium } from '@/lib/clinical/calcium'
import { toConventional, toSI } from '@/lib/clinical/units'
import { useSettings } from '@/stores/settings'
import { fmt, num } from '@/lib/utils'
import { NumberField, Stat } from '../ui'
import { Finding, Grid } from './common'

export default function CaAdjust() {
  const units = useSettings((s) => s.units)
  const si = units === 'SI'
  const [ca, setCa] = useState(si ? '1.85' : '7.4')
  const [alb, setAlb] = useState(si ? '22' : '2.2')
  const [ica, setIca] = useState('')

  const c = num(ca)
  const a = num(alb)
  const i = num(ica)
  const adj = c !== undefined && a !== undefined ? albuminAdjustedCalcium(c, a, si ? 'SI' : 'conventional') : undefined
  const adjMg = adj === undefined ? undefined : si ? toConventional('calcium', adj) : adj
  const cls = adjMg !== undefined ? classifyTotalCalcium(adjMg) : null
  const albG = a === undefined ? undefined : si ? a / 10 : a

  return (
    <div className="space-y-5">
      <Grid cols={3}>
        <NumberField label="Total calcium" value={ca} onChange={setCa} unit={si ? 'mmol/L' : 'mg/dL'} min={si ? 0.8 : 3} max={si ? 5 : 20} />
        <NumberField label="Albumin" value={alb} onChange={setAlb} unit={si ? 'g/L' : 'g/dL'} min={si ? 5 : 0.5} max={si ? 60 : 6} />
        <NumberField label="Ionized Ca (if measured)" value={ica} onChange={setIca} unit="mmol/L" min={0.3} max={3} />
      </Grid>
      <Grid cols={3}>
        <Stat label="Albumin-adjusted Ca" value={fmt(adj, si ? 2 : 1)} unit={si ? 'mmol/L' : 'mg/dL'} sub={adj !== undefined ? (si ? `${fmt(toConventional('calcium', adj), 1)} mg/dL` : `${fmt(toSI('calcium', adj), 2)} mmol/L`) : undefined} />
        <Stat label="Interpretation" value={<span className="text-base">{cls?.label ?? '—'}</span>} />
        <Stat label="Ionized Ca" value={i !== undefined ? fmt(i, 2) : '—'} unit="mmol/L" sub={i !== undefined ? classifyIonizedCalcium(i) : 'Reference 1.12–1.32'} />
      </Grid>
      <Finding tone="warn" title="Adjusted calcium is a rough estimate">
        It matches ionized Ca in only ~55–65% of samples and is least reliable with albumin {'<'}3 g/dL{albG !== undefined && albG < 3 ? ' (as here)' : ''}, CKD, critical illness, paraproteins and acid–base disturbance. Use ionized Ca for treatment decisions when available; when both are measured, ionized wins.
      </Finding>
    </div>
  )
}
