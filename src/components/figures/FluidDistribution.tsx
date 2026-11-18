import { useMemo, useState } from 'react'
import { Segmented } from '../ui'
import { fmt } from '@/lib/utils'

/**
 * Osmotic-equilibrium model for a 70 kg man (TBW 42 L, ICF 28, ISF 10.5, plasma 3.5, 290 mOsm/kg).
 * Crystalloid adds water V and effective osmoles O to the ECF; cells keep their osmoles.
 */
const FLUIDS = {
  ns: { label: '0.9% NaCl', osm: 308 },
  lr: { label: "Lactated Ringer's", osm: 273 },
  d5w: { label: 'D5W', osm: 0 },
  half: { label: '0.45% NaCl', osm: 154 },
  hts: { label: '3% NaCl', osm: 1026 },
  alb: { label: '5% albumin', osm: -1 },
} as const
type FluidKey = keyof typeof FLUIDS

function distribute(key: FluidKey, liters = 1) {
  const tbw = 42
  const posm = 290
  const icfOsm = 28 * posm
  if (key === 'alb') return { icf: 0, isf: 0.25 * liters, plasma: 0.75 * liters, osm: posm }
  const O = FLUIDS[key].osm * liters
  const newTbw = tbw + liters
  const newOsm = (tbw * posm + O) / newTbw
  const icf = icfOsm / newOsm
  const ecf = newTbw - icf
  return { icf: icf - 28, isf: (ecf * 3) / 4 - 10.5, plasma: ecf / 4 - 3.5, osm: newOsm }
}

export default function FluidDistribution() {
  const [fluid, setFluid] = useState<FluidKey>('ns')
  const d = useMemo(() => distribute(fluid), [fluid])
  const rows = [
    { name: 'Intracellular', base: 28, delta: d.icf, color: 'bg-violet-500' },
    { name: 'Interstitial', base: 10.5, delta: d.isf, color: 'bg-sky-500' },
    { name: 'Plasma', base: 3.5, delta: d.plasma, color: 'bg-rose-500' },
  ]
  const max = 1.6
  return (
    <div className="space-y-4">
      <Segmented value={fluid} onChange={setFluid} size="sm" options={(Object.keys(FLUIDS) as FluidKey[]).map((k) => ({ value: k, label: FLUIDS[k].label }))} />
      <div className="space-y-3">
        {rows.map((r) => {
          const ml = r.delta * 1000
          const pct = Math.min(100, (Math.abs(r.delta) / max) * 50)
          return (
            <div key={r.name} className="grid grid-cols-[7rem_1fr_5.5rem] items-center gap-3 text-sm">
              <span className="font-medium">{r.name}</span>
              <div className="relative h-6 rounded-md bg-muted">
                <div className="absolute inset-y-0 left-1/2 w-px bg-border" />
                <div className={`absolute inset-y-1 rounded ${r.color} transition-all duration-500`} style={r.delta >= 0 ? { left: '50%', width: `${pct}%` } : { right: '50%', width: `${pct}%` }} />
              </div>
              <span className={`tabular text-right font-semibold ${ml < -5 ? 'text-danger' : ''}`}>
                {ml >= 0 ? '+' : ''}
                {fmt(ml, 0)} mL
              </span>
            </div>
          )
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        After 1 L of {FLUIDS[fluid].label}: plasma osmolality ≈ <strong className="text-foreground">{fmt(d.osm, 0)}</strong> mOsm/kg.{' '}
        {fluid === 'd5w' && 'Only ~1/12 stays in plasma — free water is not a resuscitation fluid.'}
        {fluid === 'ns' && 'Isotonic fluid stays extracellular; ~¼ remains intravascular after equilibration.'}
        {fluid === 'hts' && 'Hypertonic saline pulls water out of cells — the effect that shrinks a swollen brain.'}
        {fluid === 'half' && 'Half isotonic, half free water.'}
        {fluid === 'lr' && 'Slightly hypotonic: a little water enters cells (relevant in brain injury).'}
        {fluid === 'alb' && 'Colloid stays largely intravascular initially; less with capillary leak (sepsis).'}
      </p>
    </div>
  )
}
