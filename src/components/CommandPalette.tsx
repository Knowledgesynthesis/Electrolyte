import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, CornerDownLeft } from 'lucide-react'
import { search } from '@/lib/search'
import { cn } from '@/lib/utils'
import { Badge } from './ui'

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const results = useMemo(() => search(q), [q])

  useEffect(() => {
    if (open) {
      setQ('')
      setIdx(0)
      setTimeout(() => input.current?.focus(), 10)
    }
  }, [open])

  if (!open) return null

  const go = (to: string) => {
    onClose()
    navigate(to)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-[10vh] backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setIdx(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setIdx((i) => Math.min(i + 1, results.length - 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setIdx((i) => Math.max(i - 1, 0))
              }
              if (e.key === 'Enter' && results[idx]) go(results[idx].to)
            }}
            placeholder="Search lessons, tools, algorithms, terms… (e.g. “SIADH”, “calcium gluconate”)"
            className="h-14 w-full bg-transparent text-base outline-none"
            aria-label="Search query"
          />
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2" role="listbox">
          {q && results.length === 0 && <li className="p-4 text-sm text-muted-foreground">No matches.</li>}
          {!q && <li className="p-4 text-sm text-muted-foreground">Try: hyperkalemia, Winters, tolvaptan, FEMg, refeeding, copeptin…</li>}
          {results.map((r, i) => (
            <li key={r.to + r.title} role="option" aria-selected={i === idx}>
              <button type="button" onMouseEnter={() => setIdx(i)} onClick={() => go(r.to)} className={cn('flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left', i === idx ? 'bg-muted' : '')}>
                <Badge className="mt-0.5 w-20 shrink-0 justify-center">{r.kind}</Badge>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{r.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{r.subtitle}</span>
                </span>
                {i === idx && <CornerDownLeft className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
