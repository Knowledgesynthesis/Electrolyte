import { useMemo, useState } from 'react'
import { hyponatremiaWorkup } from '@/lib/clinical/sodium'
import { toConventional } from '@/lib/clinical/units'
import { useSettings } from '@/stores/settings'
import { num } from '@/lib/utils'
import { NumberField, Segmented, Toggle } from '../ui'
import { Finding, Grid, Panel } from './common'

type Preset = { na: string; osm: string; glu: string; uosm: string; una: string; vol: 'hypo' | 'eu' | 'hyper'; diur: boolean }

const PRESETS: Record<'siadh' | 'polydipsia' | 'hypovolemic' | 'hf' | 'glucose' | 'thiazide', Preset> = {
  siadh: { na: '122', osm: '255', glu: '95', uosm: '480', una: '62', vol: 'eu', diur: false },
  polydipsia: { na: '124', osm: '258', glu: '90', uosm: '70', una: '15', vol: 'eu', diur: false },
  hypovolemic: { na: '128', osm: '268', glu: '100', uosm: '520', una: '12', vol: 'hypo', diur: false },
  hf: { na: '127', osm: '265', glu: '110', uosm: '450', una: '10', vol: 'hyper', diur: false },
  glucose: { na: '126', osm: '310', glu: '850', uosm: '', una: '', vol: 'hypo', diur: false },
  thiazide: { na: '119', osm: '248', glu: '100', uosm: '390', una: '55', vol: 'eu', diur: true },
}

export default function NaWorkup() {
  const units = useSettings((s) => s.units)
  const [s, setS] = useState<Preset>(PRESETS.siadh)
  const set = (k: keyof typeof s) => (v: string) => setS({ ...s, [k]: v })

  const result = useMemo(() => {
    const na = num(s.na)
    if (na === undefined) return null
    const glu = num(s.glu)
    return hyponatremiaWorkup({
      na,
      measuredOsm: num(s.osm),
      glucoseMgDl: glu === undefined ? undefined : units === 'SI' ? toConventional('glucose', glu) : glu,
      urineOsm: num(s.uosm),
      urineNa: num(s.una),
      volume: s.vol,
      onDiuretic: s.diur,
    })
  }, [s, units])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <span className="self-center text-xs font-medium text-muted-foreground">Load example:</span>
        {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((k) => (
          <button key={k} type="button" onClick={() => setS(PRESETS[k])} className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted">
            {{ siadh: 'SIADH', polydipsia: 'Polydipsia', hypovolemic: 'Vomiting', hf: 'Heart failure', glucose: 'Hyperglycemia', thiazide: 'Thiazide' }[k]}
          </button>
        ))}
      </div>
      <Grid cols={3}>
        <NumberField label="Serum Na" value={s.na} onChange={set('na')} unit="mmol/L" min={95} max={145} />
        <NumberField label="Measured serum osmolality" value={s.osm} onChange={set('osm')} unit="mOsm/kg" min={200} max={400} />
        <NumberField label="Glucose" value={s.glu} onChange={set('glu')} unit={units === 'SI' ? 'mmol/L' : 'mg/dL'} min={0} max={units === 'SI' ? 120 : 2000} />
        <NumberField label="Urine osmolality" value={s.uosm} onChange={set('uosm')} unit="mOsm/kg" min={30} max={1400} />
        <NumberField label="Urine Na" value={s.una} onChange={set('una')} unit="mmol/L" min={0} max={300} />
      </Grid>
      <div className="flex flex-wrap items-end gap-4">
        <Segmented label="Clinical volume status" value={s.vol} onChange={(v) => setS({ ...s, vol: v })} options={[{ value: 'hypo', label: 'Hypovolemic' }, { value: 'eu', label: 'Euvolemic' }, { value: 'hyper', label: 'Edematous' }]} />
        <Toggle checked={s.diur} onChange={(v) => setS({ ...s, diur: v })} label="Taking a diuretic" />
      </div>
      {result && (
        <Panel title="Reasoning">
          <ol className="space-y-2">
            {result.steps.map((st, i) => (
              <li key={i}>
                <Finding tone={st.tone} title={`${i + 1}. ${st.label}`}>
                  {st.finding}
                </Finding>
              </li>
            ))}
          </ol>
          {result.conclusion && (
            <div className="rounded-xl border-2 border-primary/40 p-4">
              <div className="text-sm font-semibold text-primary">Conclusion</div>
              <p className="mt-1 text-sm">{result.conclusion}</p>
              {result.differentials.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {result.differentials.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </Panel>
      )}
    </div>
  )
}
