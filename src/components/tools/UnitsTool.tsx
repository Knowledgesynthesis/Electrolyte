import { useState } from 'react'
import { toConventional, toSI, UNITS, type Analyte } from '@/lib/clinical/units'
import { fmt, num } from '@/lib/utils'
import { NumberField, Segmented, SelectField } from '../ui'
import { Grid } from './common'

const ANALYTES: { value: Analyte; label: string }[] = [
  { value: 'calcium', label: 'Calcium' },
  { value: 'magnesium', label: 'Magnesium' },
  { value: 'phosphate', label: 'Phosphate' },
  { value: 'glucose', label: 'Glucose' },
  { value: 'bun', label: 'BUN ↔ urea' },
  { value: 'creatinine', label: 'Creatinine' },
  { value: 'albumin', label: 'Albumin' },
]

export default function UnitsTool() {
  const [analyte, setAnalyte] = useState<Analyte>('calcium')
  const [dir, setDir] = useState<'toSI' | 'toConv'>('toSI')
  const [val, setVal] = useState('10')
  const n = num(val)
  const out = n === undefined ? undefined : dir === 'toSI' ? toSI(analyte, n) : toConventional(analyte, n)
  const u = UNITS[analyte]
  const divalent = analyte === 'calcium' || analyte === 'magnesium'
  const mmol = n === undefined ? undefined : dir === 'toSI' ? out : n
  return (
    <div className="space-y-4">
      <Grid cols={3}>
        <SelectField label="Analyte" value={analyte} onChange={setAnalyte} options={ANALYTES} />
        <NumberField label="Value" value={val} onChange={setVal} unit={dir === 'toSI' ? u.conventional : u.si} />
        <div className="pt-6">
          <Segmented size="sm" value={dir} onChange={setDir} options={[{ value: 'toSI', label: `→ ${u.si}` }, { value: 'toConv', label: `→ ${u.conventional}` }]} />
        </div>
      </Grid>
      <div className="rounded-xl bg-muted/60 p-4">
        <div className="tabular text-2xl font-semibold">
          {fmt(out, analyte === 'creatinine' && dir === 'toSI' ? 0 : 2)} <span className="text-base font-normal text-muted-foreground">{dir === 'toSI' ? u.si : u.conventional}</span>
        </div>
        {divalent && mmol !== undefined && <div className="mt-1 text-sm text-muted-foreground">= {fmt(mmol * 2, 2)} mEq/L (divalent: mEq = 2 × mmol)</div>}
      </div>
    </div>
  )
}
