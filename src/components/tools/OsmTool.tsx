import { useState } from 'react'
import { calculatedOsmolality, effectiveOsmolality, glucoseCorrectedNa } from '@/lib/clinical/sodium'
import { OSM } from '@/lib/clinical/constants'
import { toConventional } from '@/lib/clinical/units'
import { useSettings } from '@/stores/settings'
import { fmt, num } from '@/lib/utils'
import { NumberField, Stat } from '../ui'
import { Finding, Grid } from './common'

export default function OsmTool() {
  const units = useSettings((s) => s.units)
  const si = units === 'SI'
  const [na, setNa] = useState('132')
  const [glu, setGlu] = useState(si ? '5.5' : '100')
  const [bun, setBun] = useState(si ? '5' : '14')
  const [meas, setMeas] = useState('')

  const n = num(na)
  const g = num(glu)
  const b = num(bun)
  const m = num(meas)
  const calc = n !== undefined && g !== undefined && b !== undefined ? calculatedOsmolality(n, g, b, si ? 'SI' : 'conventional') : undefined
  const eff = n !== undefined && g !== undefined ? effectiveOsmolality(n, g, si ? 'SI' : 'conventional') : undefined
  const gluMg = g === undefined ? undefined : si ? toConventional('glucose', g) : g
  const corrH = n !== undefined && gluMg !== undefined ? glucoseCorrectedNa(n, gluMg, OSM.hillier) : undefined
  const corrK = n !== undefined && gluMg !== undefined ? glucoseCorrectedNa(n, gluMg, OSM.katz) : undefined
  const gap = m !== undefined && calc !== undefined ? m - calc : undefined

  return (
    <div className="space-y-5">
      <Grid cols={4}>
        <NumberField label="Na" value={na} onChange={setNa} unit="mmol/L" min={90} max={200} />
        <NumberField label="Glucose" value={glu} onChange={setGlu} unit={si ? 'mmol/L' : 'mg/dL'} min={0} max={si ? 120 : 2000} />
        <NumberField label={si ? 'Urea' : 'BUN'} value={bun} onChange={setBun} unit={si ? 'mmol/L' : 'mg/dL'} min={0} max={si ? 100 : 300} />
        <NumberField label="Measured osmolality (optional)" value={meas} onChange={setMeas} unit="mOsm/kg" min={200} max={450} />
      </Grid>
      <Grid cols={4}>
        <Stat label="Calculated osmolality" value={fmt(calc, 0)} unit="mOsm/kg" />
        <Stat label="Effective (tonicity)" value={fmt(eff, 0)} unit="mOsm/kg" sub="Excludes urea" />
        <Stat label="Osmolal gap" value={gap === undefined ? '—' : fmt(gap, 0)} unit="mOsm/kg" tone={gap !== undefined && gap > OSM.gapUpper ? 'danger' : undefined} />
        <Stat label="Glucose-corrected Na" value={fmt(corrH, 0)} unit="mmol/L" sub={`Hillier 2.4 (Katz 1.6: ${fmt(corrK, 0)})`} />
      </Grid>
      {gap !== undefined && gap > OSM.gapUpper && <Finding tone="danger">Osmolal gap &gt;{OSM.gapUpper}: consider methanol, ethylene glycol, propylene glycol, ethanol, mannitol, glycine. A normal gap does not exclude late toxic-alcohol poisoning.</Finding>}
      {eff !== undefined && eff < 275 && <Finding tone="info">Effective osmolality &lt;275: hypotonic — water will move into cells.</Finding>}
    </div>
  )
}
