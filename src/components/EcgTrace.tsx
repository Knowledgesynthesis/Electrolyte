import { useMemo } from 'react'
import { ecgTrace } from '@/lib/clinical/ecg'

/** ECG paper: 25 mm/s, 10 mm/mV. 1 small box = 0.04 s, 0.1 mV. */
export function EcgTrace({ k, beats = 3, height = 180 }: { k: number; beats?: number; height?: number }) {
  const pts = useMemo(() => ecgTrace(k, beats), [k, beats])
  const duration = pts[pts.length - 1]?.t ?? 2.5
  const pxPerSec = 250
  const pxPerMv = 50
  const W = Math.ceil(duration * pxPerSec)
  const H = height
  const base = H * 0.62
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${(p.t * pxPerSec).toFixed(1)},${(base - p.v * pxPerMv).toFixed(1)}`).join(' ')
  const small = pxPerSec * 0.04
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full rounded-lg bg-[#fff6f6] dark:bg-[#2a1d22]" role="img" aria-label={`Schematic ECG at potassium ${k.toFixed(1)} mmol/L`}>
      <defs>
        <pattern id="ecg-small" width={small} height={small} patternUnits="userSpaceOnUse">
          <path d={`M ${small} 0 L 0 0 0 ${small}`} fill="none" stroke="#f3b4b4" strokeOpacity={0.45} strokeWidth={0.6} />
        </pattern>
        <pattern id="ecg-big" width={small * 5} height={small * 5} patternUnits="userSpaceOnUse">
          <rect width={small * 5} height={small * 5} fill="url(#ecg-small)" />
          <path d={`M ${small * 5} 0 L 0 0 0 ${small * 5}`} fill="none" stroke="#e98a8a" strokeOpacity={0.6} strokeWidth={1.1} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#ecg-big)" />
      <path d={d} fill="none" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth={2} strokeLinejoin="round" />
    </svg>
  )
}
