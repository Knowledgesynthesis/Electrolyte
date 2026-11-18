import { useState } from 'react'
import { ecgDescription } from '@/lib/clinical/ecg'
import { potassiumSeverity, SEVERITY_LABEL } from '@/lib/clinical/potassium'
import { cn } from '@/lib/utils'
import { EcgTrace } from '../EcgTrace'
import { Badge } from '../ui'
import { Finding, Fineprint } from './common'

const MARKS = [2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0]

export default function KEcg() {
  const [k, setK] = useState(4.0)
  const sev = potassiumSeverity(k)
  const tone = sev === 'normal' ? 'ok' : sev.startsWith('severe') ? 'danger' : sev.startsWith('moderate') ? 'warn' : 'info'
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <label htmlFor="k-slider" className="text-sm font-medium">
            Serum K⁺
          </label>
          <span className={cn('tabular text-3xl font-bold', tone === 'danger' ? 'text-danger' : tone === 'warn' ? 'text-warn' : tone === 'ok' ? 'text-ok' : 'text-info')}>
            {k.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">mmol/L</span>
          </span>
        </div>
        <input id="k-slider" type="range" min={1.5} max={9.5} step={0.1} value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full" aria-valuetext={`${k.toFixed(1)} mmol/L`} />
        <div className="mt-2 flex flex-wrap gap-1">
          {MARKS.map((m) => (
            <button key={m} type="button" onClick={() => setK(m)} className={cn('rounded-md px-2 py-0.5 text-xs tabular', Math.abs(k - m) < 0.05 ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-elevated')}>
              {m.toFixed(1)}
            </button>
          ))}
        </div>
      </div>
      <EcgTrace k={k} />
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={tone === 'danger' ? 'danger' : tone === 'warn' ? 'warn' : tone === 'ok' ? 'ok' : 'info'}>{SEVERITY_LABEL[sev]}</Badge>
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {ecgDescription(k).map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      {k >= 6.5 && <Finding tone="danger">Emergency at K ≥6.5 even with a normal ECG. Any hyperkalemic ECG change → IV calcium now.</Finding>}
      {k < 2.5 && <Finding tone="danger">Severe hypokalemia: continuous monitoring, IV KCl, replete Mg; beware digoxin and QT-prolonging drugs.</Finding>}
      <Fineprint>Schematic lead-II-style trace (25 mm/s, 10 mm/mV). Real ECGs are insensitive to K and vary between patients — a normal ECG never excludes dangerous hyperkalemia (Montague 2008).</Fineprint>
    </div>
  )
}
