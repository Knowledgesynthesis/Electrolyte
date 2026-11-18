import { useState } from 'react'
import { calciumInfusionRate, elementalCalcium, type CalciumSalt } from '@/lib/clinical/calcium'
import { CA } from '@/lib/clinical/constants'
import { fmt, num } from '@/lib/utils'
import { NumberField, Segmented, Stat } from '../ui'
import { Finding, Fineprint, Grid, Panel } from './common'

export default function CaIv() {
  const [salt, setSalt] = useState<CalciumSalt>('gluconate10')
  const [ml, setMl] = useState('20')
  const [weight, setWeight] = useState('70')
  const [rate, setRate] = useState('1.0')

  const v = num(ml)
  const w = num(weight)
  const r = num(rate)
  const e = v !== undefined ? elementalCalcium(salt, v) : null
  const other = salt === 'gluconate10' ? 'chloride10' : 'gluconate10'
  const equivMl = e ? (e.mmol / (other === 'chloride10' ? CA.chloride10ml.mmol : CA.gluconate10ml.mmol)) * 10 : undefined
  const inf = w !== undefined && r !== undefined ? calciumInfusionRate(w, r) : null

  return (
    <div className="space-y-6">
      <Panel title="Bolus content">
        <div className="flex flex-wrap items-end gap-4">
          <Segmented
            label="Product"
            value={salt}
            onChange={setSalt}
            options={[
              { value: 'gluconate10', label: '10% Ca gluconate' },
              { value: 'chloride10', label: '10% Ca chloride' },
            ]}
          />
          <div className="w-40">
            <NumberField label="Volume" value={ml} onChange={setMl} unit="mL" min={1} max={100} />
          </div>
        </div>
        <Grid cols={3}>
          <Stat label="Elemental Ca" value={fmt(e?.mg, 0)} unit="mg" />
          <Stat label="" value={fmt(e?.mmol, 1)} unit="mmol" />
          <Stat label={`Same dose as ${other === 'chloride10' ? 'chloride' : 'gluconate'}`} value={fmt(equivMl, 1)} unit="mL" tone="warn" />
        </Grid>
        {salt === 'chloride10' && <Finding tone="danger">Calcium chloride is a vesicant: central line or large vein, slow push except in cardiac arrest.</Finding>}
      </Panel>
      <Panel title="Continuous infusion">
        <Grid cols={2}>
          <NumberField label="Weight" value={weight} onChange={setWeight} unit="kg" min={2} max={250} />
          <NumberField label="Dose" value={rate} onChange={setRate} unit="mg/kg/h elemental" min={CA.infusionMgPerKgPerHour.low} max={CA.infusionMgPerKgPerHour.high} hint={`Usual ${CA.infusionMgPerKgPerHour.low}–${CA.infusionMgPerKgPerHour.high} mg/kg/h`} />
        </Grid>
        {inf && (
          <Grid cols={2}>
            <Stat label="Elemental Ca" value={fmt(inf.mgPerHour, 0)} unit="mg/h" />
            <Stat label="Standard bag rate" value={fmt(inf.mlPerHourOfStandardBag, 0)} unit="mL/h" sub="100 mL 10% gluconate in 1 L (≈0.85 mg/mL)" />
          </Grid>
        )}
      </Panel>
      <Fineprint>Society for Endocrinology emergency guidance 2016 (with 2019 addendum on chloride equivalence). Titrate to ionized Ca every 4–6 h. Do not co-infuse with bicarbonate or phosphate. Avoid large-volume infusions in ESKD.</Fineprint>
    </div>
  )
}
