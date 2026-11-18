import { useMemo, useState } from 'react'
import { analyzeAcidBase } from '@/lib/clinical/acidbase'
import { toConventional } from '@/lib/clinical/units'
import { useSettings } from '@/stores/settings'
import { fmt, num } from '@/lib/utils'
import { Badge, NumberField, Segmented } from '../ui'
import { Finding, Grid, Panel } from './common'

const EXAMPLES = {
  dka: { ph: '7.20', pco2: '23', hco3: '9', na: '135', cl: '98', alb: '4.0', osm: '', glu: '', bun: '' },
  triple: { ph: '7.40', pco2: '30', hco3: '18', na: '140', cl: '96', alb: '2.0', osm: '', glu: '', bun: '' },
  copd: { ph: '7.35', pco2: '62', hco3: '33', na: '140', cl: '95', alb: '4.0', osm: '', glu: '', bun: '' },
  vomit: { ph: '7.52', pco2: '47', hco3: '38', na: '136', cl: '86', alb: '4.2', osm: '', glu: '', bun: '' },
  toxic: { ph: '7.12', pco2: '18', hco3: '6', na: '140', cl: '102', alb: '4.0', osm: '338', glu: '95', bun: '14' },
  diarrhea: { ph: '7.29', pco2: '31', hco3: '15', na: '138', cl: '114', alb: '4.0', osm: '', glu: '', bun: '' },
}

const LABEL: Record<keyof typeof EXAMPLES, string> = { dka: 'DKA', triple: 'Triple disorder', copd: 'Chronic CO₂ retainer', vomit: 'Vomiting', toxic: 'Toxic alcohol', diarrhea: 'Diarrhea' }

export default function AcidBaseTool() {
  const units = useSettings((s) => s.units)
  const si = units === 'SI'
  const [v, setV] = useState(EXAMPLES.dka)
  const [chron, setChron] = useState<'unknown' | 'acute' | 'chronic'>('unknown')
  const set = (k: keyof typeof v) => (x: string) => setV({ ...v, [k]: x })

  const r = useMemo(() => {
    const ph = num(v.ph)
    const pco2 = num(v.pco2)
    const hco3 = num(v.hco3)
    if (ph === undefined || pco2 === undefined || hco3 === undefined || ph < 6.5 || ph > 8 || pco2 <= 0 || hco3 <= 0) return null
    const alb = num(v.alb)
    const glu = num(v.glu)
    const bun = num(v.bun)
    return analyzeAcidBase({
      ph,
      pco2,
      hco3,
      na: num(v.na),
      cl: num(v.cl),
      albumin: alb === undefined ? undefined : si ? alb / 10 : alb,
      measuredOsm: num(v.osm),
      glucoseMgDl: glu === undefined ? undefined : si ? toConventional('glucose', glu) : glu,
      bunMgDl: bun === undefined ? undefined : si ? toConventional('bun', bun) : bun,
      respiratoryChronicity: chron,
    })
  }, [v, chron, si])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <span className="self-center text-xs font-medium text-muted-foreground">Examples:</span>
        {(Object.keys(EXAMPLES) as (keyof typeof EXAMPLES)[]).map((k) => (
          <button key={k} type="button" onClick={() => setV(EXAMPLES[k])} className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-muted">
            {LABEL[k]}
          </button>
        ))}
      </div>
      <Grid cols={3}>
        <NumberField label="pH" value={v.ph} onChange={set('ph')} min={6.5} max={8} step={0.01} />
        <NumberField label="pCO₂" value={v.pco2} onChange={set('pco2')} unit="mmHg" min={5} max={150} />
        <NumberField label="HCO₃" value={v.hco3} onChange={set('hco3')} unit="mmol/L" min={1} max={60} />
        <NumberField label="Na" value={v.na} onChange={set('na')} unit="mmol/L" min={100} max={190} />
        <NumberField label="Cl" value={v.cl} onChange={set('cl')} unit="mmol/L" min={60} max={150} />
        <NumberField label="Albumin" value={v.alb} onChange={set('alb')} unit={si ? 'g/L' : 'g/dL'} min={si ? 5 : 0.5} max={si ? 60 : 6} />
      </Grid>
      <details className="rounded-xl border border-border p-3">
        <summary className="cursor-pointer text-sm font-medium">Osmolal gap (optional)</summary>
        <div className="mt-3">
          <Grid cols={3}>
            <NumberField label="Measured osmolality" value={v.osm} onChange={set('osm')} unit="mOsm/kg" min={200} max={450} />
            <NumberField label="Glucose" value={v.glu} onChange={set('glu')} unit={si ? 'mmol/L' : 'mg/dL'} />
            <NumberField label={si ? 'Urea' : 'BUN'} value={v.bun} onChange={set('bun')} unit={si ? 'mmol/L' : 'mg/dL'} />
          </Grid>
        </div>
      </details>
      <Segmented label="Respiratory chronicity (if known)" value={chron} onChange={setChron} size="sm" options={[{ value: 'unknown', label: 'Unknown' }, { value: 'acute', label: 'Acute' }, { value: 'chronic', label: 'Chronic (>3–5 d)' }]} />
      {!r && <Finding tone="warn">Enter pH, pCO₂ and HCO₃.</Finding>}
      {r && (
        <>
          <div className="rounded-xl border-2 border-primary/40 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">Summary</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {(r.disorders.length ? r.disorders : [r.primary === 'normal' ? 'No acid–base disorder detected' : r.primary]).map((d) => (
                <Badge key={d} tone={d.includes('acidosis') ? 'danger' : d.includes('alkalosis') ? 'info' : 'ok'}>
                  {d}
                </Badge>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              <div>
                AG: <strong className="tabular">{fmt(r.ag, 0)}</strong>
              </div>
              <div>
                AG (alb-corr.): <strong className="tabular">{fmt(r.correctedAg, 1)}</strong>
              </div>
              <div>
                Δ/Δ: <strong className="tabular">{r.deltaRatio === undefined ? '—' : Number.isFinite(r.deltaRatio) ? fmt(r.deltaRatio, 2) : '∞'}</strong>
              </div>
              <div>
                Exp. pCO₂: <strong className="tabular">{r.expectedPco2 ? `${fmt(r.expectedPco2[0], 0)}–${fmt(r.expectedPco2[1], 0)}` : '—'}</strong>
              </div>
            </div>
          </div>
          <Panel title="Step by step">
            <ol className="space-y-2">
              {r.findings.map((f, i) => (
                <li key={i}>
                  <Finding tone={f.tone} title={`${i + 1}. ${f.step}`}>
                    {f.text}
                  </Finding>
                </li>
              ))}
            </ol>
          </Panel>
          {r.differentials.length > 0 && (
            <Panel title="Differential">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {r.differentials.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Panel>
          )}
        </>
      )}
    </div>
  )
}
