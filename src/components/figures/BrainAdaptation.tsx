import { useMemo, useState } from 'react'
import { LineChart } from '../LineChart'
import { fmt } from '@/lib/utils'

/**
 * Conceptual model (not quantitative physiology): brain-cell volume = solute content / (serum Na/140).
 * After a fall in Na, cells shed solute toward the new tonicity (τ ≈ 16 h; ~95% by 48 h).
 * During correction, solute is regained slowly (τ ≈ 60 h) — so a fast rise shrinks adapted cells.
 */
function simulate(nadir: number, dropHours: number, waitHours: number, ratePerDay: number) {
  const total = dropHours + waitHours + 72
  const na: number[] = []
  const vol: number[] = []
  let solute = 1
  for (let h = 0; h <= total; h++) {
    let s: number
    if (h <= dropHours) s = 140 - ((140 - nadir) * h) / Math.max(dropHours, 1)
    else if (h <= dropHours + waitHours) s = nadir
    else s = Math.min(140, nadir + (ratePerDay / 24) * (h - dropHours - waitHours))
    const target = s / 140
    const tau = target < solute ? 16 : 60
    solute += (target - solute) / tau
    na.push(s)
    vol.push(100 * (solute / target))
  }
  return { na, vol, total }
}

export default function BrainAdaptation() {
  const [nadir, setNadir] = useState(115)
  const [wait, setWait] = useState(48)
  const [rate, setRate] = useState(20)
  const sim = useMemo(() => simulate(nadir, 12, wait, rate), [nadir, wait, rate])
  const minVol = Math.min(...sim.vol.slice(12 + wait))
  const maxVol = Math.max(...sim.vol)
  const danger = minVol < 92

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          <span className="font-medium">Na nadir: {nadir}</span>
          <input type="range" min={105} max={130} value={nadir} onChange={(e) => setNadir(+e.target.value)} className="w-full" />
        </label>
        <label className="text-sm">
          <span className="font-medium">Time at nadir before correction: {wait} h</span>
          <input type="range" min={0} max={96} step={6} value={wait} onChange={(e) => setWait(+e.target.value)} className="w-full" />
        </label>
        <label className="text-sm">
          <span className="font-medium">Correction rate: {rate} mmol/L/24 h</span>
          <input type="range" min={4} max={30} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full" />
        </label>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-border p-2">
          <LineChart yLabel="Serum Na" series={[{ name: 'Na', values: sim.na, color: 'var(--primary)' }]} height={200} />
        </div>
        <div className="rounded-xl border border-border p-2">
          <LineChart
            yLabel="Brain cell volume (%)"
            series={[{ name: 'Volume', values: sim.vol, color: danger ? 'var(--danger)' : 'var(--ok)' }]}
            hlines={[
              { y: 100, label: 'Normal', color: 'var(--muted-fg)' },
              { y: 92, label: 'Shrinkage → ODS risk', color: 'var(--danger)' },
            ]}
            height={200}
          />
        </div>
      </div>
      <p className="text-sm">
        Peak swelling <strong className="tabular">{fmt(maxVol - 100, 0)}%</strong>; lowest volume during correction <strong className={`tabular ${danger ? 'text-danger' : 'text-ok'}`}>{fmt(minVol, 0)}%</strong>.{' '}
        {wait < 24
          ? 'Little adaptation yet — the danger is swelling (acute hyponatremia). Correcting quickly is safe and necessary.'
          : danger
            ? 'Adapted cells cannot regain solute fast enough: correction shrinks them below normal — the substrate for ODS.'
            : 'Slow enough for adapted cells to keep pace.'}
      </p>
      <p className="text-xs text-muted-foreground">Teaching model with illustrative time constants, not patient-level prediction.</p>
    </div>
  )
}
