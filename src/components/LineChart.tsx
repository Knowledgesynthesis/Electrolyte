import { useId } from 'react'

export interface Series {
  name: string
  values: number[]
  color: string
  dashed?: boolean
}

export interface HLine {
  y: number
  label: string
  color: string
}

/**
 * Dependency-free responsive SVG line chart (x = hours).
 */
export function LineChart({
  series,
  hlines = [],
  band,
  yLabel,
  xLabel = 'Hours',
  height = 240,
}: {
  series: Series[]
  hlines?: HLine[]
  band?: { from: number; to: number; label: string }
  yLabel: string
  xLabel?: string
  height?: number
}) {
  const id = useId()
  const W = 640
  const H = height
  const pad = { l: 44, r: 16, t: 14, b: 34 }
  const all = [...series.flatMap((s) => s.values), ...hlines.map((h) => h.y), ...(band ? [band.from, band.to] : [])].filter(Number.isFinite)
  let lo = Math.floor(Math.min(...all) - 1)
  let hi = Math.ceil(Math.max(...all) + 1)
  if (hi - lo < 6) {
    hi += 3
    lo -= 3
  }
  const n = Math.max(...series.map((s) => s.values.length)) - 1
  const x = (i: number) => pad.l + (i / Math.max(n, 1)) * (W - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b)
  const yTicks = ticks(lo, hi, 5)
  const xTicks = Array.from({ length: Math.floor(n / 6) + 1 }, (_, i) => i * 6).filter((t) => t <= n)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>{`${yLabel} over time: ${series.map((s) => `${s.name} ends at ${s.values[s.values.length - 1]?.toFixed(1)}`).join('; ')}`}</title>
      {band && (
        <g>
          <rect x={pad.l} width={W - pad.l - pad.r} y={y(band.to)} height={Math.max(0, y(band.from) - y(band.to))} fill="var(--ok)" opacity={0.12} />
          <text x={W - pad.r - 4} y={y(band.to) + 12} textAnchor="end" fontSize="11" fill="var(--ok)">
            {band.label}
          </text>
        </g>
      )}
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeWidth={1} />
          <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" fontSize="11" fill="var(--muted-fg)">
            {t}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={H - pad.b + 16} textAnchor="middle" fontSize="11" fill="var(--muted-fg)">
          {t}
        </text>
      ))}
      <text x={(W + pad.l) / 2} y={H - 4} textAnchor="middle" fontSize="11" fill="var(--muted-fg)">
        {xLabel}
      </text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="11" fill="var(--muted-fg)" transform={`rotate(-90 12 ${H / 2})`}>
        {yLabel}
      </text>
      {hlines.map((h) => (
        <g key={h.label}>
          <line x1={pad.l} x2={W - pad.r} y1={y(h.y)} y2={y(h.y)} stroke={h.color} strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={pad.l + 4} y={y(h.y) - 5} fontSize="11" fill={h.color} fontWeight={600}>
            {h.label}
          </text>
        </g>
      ))}
      {series.map((s) => (
        <polyline
          key={s.name}
          fill="none"
          stroke={s.color}
          strokeWidth={2.5}
          strokeDasharray={s.dashed ? '5 4' : undefined}
          strokeLinejoin="round"
          points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
        />
      ))}
    </svg>
  )
}

function ticks(lo: number, hi: number, count: number): number[] {
  const step = Math.max(1, Math.round((hi - lo) / count))
  const out: number[] = []
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) out.push(v)
  return out
}
