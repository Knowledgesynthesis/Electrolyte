import { useState } from 'react'
import { feNa, feUrea, interpretFeNa, urineAnionGap, urineOsmolalGap } from '@/lib/clinical/urine'
import { electrolyteFreeWaterClearance, furstRatio } from '@/lib/clinical/sodium'
import { fmt, num } from '@/lib/utils'
import { NumberField, Stat, Toggle } from '../ui'
import { Finding, Grid, Panel } from './common'

export default function UrineTool() {
  const [v, setV] = useState({ pNa: '128', pCr: '1.4', pUrea: '40', uNa: '25', uK: '40', uCl: '55', uCr: '90', uUrea: '450', uOsm: '520', uGlu: '0', vol: '1.5' })
  const [diuretic, setDiuretic] = useState(false)
  const set = (k: keyof typeof v) => (x: string) => setV({ ...v, [k]: x })
  const n = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, num(x)])) as Record<keyof typeof v, number | undefined>

  const fena = n.uNa !== undefined && n.pNa && n.uCr && n.pCr !== undefined ? feNa(n.uNa, n.pNa, n.uCr, n.pCr) : undefined
  const feu = n.uUrea !== undefined && n.pUrea && n.uCr && n.pCr !== undefined ? feUrea(n.uUrea, n.pUrea, n.uCr, n.pCr) : undefined
  const uag = n.uNa !== undefined && n.uK !== undefined && n.uCl !== undefined ? urineAnionGap(n.uNa, n.uK, n.uCl) : undefined
  const uog = n.uOsm !== undefined && n.uNa !== undefined && n.uK !== undefined && n.uUrea !== undefined ? urineOsmolalGap(n.uOsm, n.uNa, n.uK, n.uUrea, n.uGlu ?? 0, 'conventional') : undefined
  const efwc = n.vol !== undefined && n.uNa !== undefined && n.uK !== undefined && n.pNa ? electrolyteFreeWaterClearance(n.vol, n.uNa, n.uK, n.pNa) : undefined
  const furst = n.uNa !== undefined && n.uK !== undefined && n.pNa ? furstRatio(n.uNa, n.uK, n.pNa) : undefined

  return (
    <div className="space-y-5">
      <Panel title="Plasma">
        <Grid cols={3}>
          <NumberField label="Na" value={v.pNa} onChange={set('pNa')} unit="mmol/L" />
          <NumberField label="Creatinine" value={v.pCr} onChange={set('pCr')} unit="mg/dL" />
          <NumberField label="BUN" value={v.pUrea} onChange={set('pUrea')} unit="mg/dL" />
        </Grid>
      </Panel>
      <Panel title="Spot urine">
        <Grid cols={4}>
          <NumberField label="Na" value={v.uNa} onChange={set('uNa')} unit="mmol/L" />
          <NumberField label="K" value={v.uK} onChange={set('uK')} unit="mmol/L" />
          <NumberField label="Cl" value={v.uCl} onChange={set('uCl')} unit="mmol/L" />
          <NumberField label="Creatinine" value={v.uCr} onChange={set('uCr')} unit="mg/dL" />
          <NumberField label="Urea nitrogen" value={v.uUrea} onChange={set('uUrea')} unit="mg/dL" />
          <NumberField label="Osmolality" value={v.uOsm} onChange={set('uOsm')} unit="mOsm/kg" />
          <NumberField label="Glucose" value={v.uGlu} onChange={set('uGlu')} unit="mg/dL" />
          <NumberField label="Urine volume" value={v.vol} onChange={set('vol')} unit="L/day" />
        </Grid>
        <Toggle checked={diuretic} onChange={setDiuretic} label="Recent diuretic" />
      </Panel>
      <Grid cols={3}>
        <Stat label="FENa" value={fmt(fena, 2)} unit="%" />
        <Stat label="FEurea" value={fmt(feu, 0)} unit="%" sub="<35% prerenal; >50% intrinsic" />
        <Stat label="Urine anion gap" value={fmt(uag?.gap, 0)} unit="mmol/L" />
        <Stat label="Urine osmolal gap" value={fmt(uog?.gap, 0)} unit="mOsm/kg" sub={uog ? `NH₄⁺ ≈ ${fmt(uog.nh4, 0)} mmol/L` : undefined} />
        <Stat label="EFWC" value={fmt(efwc, 2)} unit="L/day" sub={efwc !== undefined ? (efwc > 0 ? 'Urine is raising Na' : 'Urine is lowering Na') : undefined} />
        <Stat label="Furst ratio" value={fmt(furst?.ratio, 2)} sub={furst?.restrictionMl ? `Restrict ≤${furst.restrictionMl} mL/day` : furst ? 'Restriction will fail' : undefined} />
      </Grid>
      <div className="space-y-2">
        {fena !== undefined && <Finding tone="info" title="FENa">{interpretFeNa(fena, diuretic)}</Finding>}
        {uag && <Finding tone="info" title="Urine anion gap">{uag.interpretation}</Finding>}
        {uog && <Finding tone="info" title="Urine osmolal gap">{uog.interpretation}</Finding>}
        {furst && <Finding tone={furst.restrictionMl ? 'ok' : 'warn'} title="SIADH: will fluid restriction work?">{furst.advice}</Finding>}
      </div>
    </div>
  )
}
