import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, RotateCcw, Undo2 } from 'lucide-react'
import { ALGORITHM_BY_ID } from '@/content/algorithms'
import type { AlgoNode, Algorithm } from '@/content/types'
import { cn } from '@/lib/utils'
import { RefList } from '@/components/RefList'
import { Button, Card, Segmented } from '@/components/ui'
import NotFound from './NotFound'

const TONE = { danger: 'border-danger bg-danger-bg', warn: 'border-warn bg-warn-bg', ok: 'border-ok bg-ok-bg', info: 'border-info bg-info-bg' }

export default function AlgorithmPage() {
  const { algoId = '' } = useParams()
  return <AlgorithmView key={algoId} algoId={algoId} />
}

function AlgorithmView({ algoId }: { algoId: string }) {
  const algo = ALGORITHM_BY_ID[algoId]
  const [path, setPath] = useState<{ node: string; answer?: string }[]>(() => [{ node: algo?.start ?? '' }])
  const [view, setView] = useState<'walk' | 'map'>('walk')
  const navigate = useNavigate()
  if (!algo) return <NotFound />
  const byId = new Map(algo.nodes.map((n) => [n.id, n]))
  const current = byId.get(path[path.length - 1].node)!

  const choose = (label: string, next: string) => setPath((p) => [...p.slice(0, -1), { ...p[p.length - 1], answer: label }, { node: next }])
  const back = () => setPath((p) => (p.length > 1 ? [...p.slice(0, -2), { node: p[p.length - 2].node }] : p))
  const link = (to: string) => {
    if (to.startsWith('#')) choose('Continue', to.slice(1))
    else navigate(to)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/algorithms" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        <ArrowLeft className="h-4 w-4" /> All algorithms
      </Link>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{algo.title}</h1>
          <p className="mt-1 text-muted-foreground">{algo.summary}</p>
        </div>
        <Segmented size="sm" value={view} onChange={setView} options={[{ value: 'walk', label: 'Step through' }, { value: 'map', label: 'Full map' }]} />
      </div>

      {view === 'walk' ? (
        <>
          {path.length > 1 && (
            <ol className="mb-4 space-y-1 text-sm">
              {path.slice(0, -1).map((p, i) => {
                const n = byId.get(p.node)!
                return (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {n.type === 'question' ? n.text : n.title} → <strong className="text-foreground">{p.answer}</strong>
                    </span>
                  </li>
                )
              })}
            </ol>
          )}
          <NodeCard node={current} onChoose={choose} onLink={link} />
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" onClick={back} disabled={path.length === 1}>
              <Undo2 className="h-4 w-4" /> Back
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setPath([{ node: algo.start }])}>
              <RotateCcw className="h-4 w-4" /> Restart
            </Button>
          </div>
        </>
      ) : (
        <Card className="p-5">
          <MapTree algo={algo} id={algo.start} seen={new Set()} />
        </Card>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Based on</h2>
        <RefList ids={algo.refs} />
      </section>
    </div>
  )
}

function NodeCard({ node, onChoose, onLink }: { node: AlgoNode; onChoose: (label: string, next: string) => void; onLink: (to: string) => void }) {
  if (node.type === 'question') {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold leading-snug">{node.text}</h2>
        {node.help && <p className="mt-2 text-sm text-muted-foreground">{node.help}</p>}
        <div className="mt-5 grid gap-2">
          {node.options.map((o) => (
            <button key={o.label} type="button" onClick={() => onChoose(o.label, o.next)} className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-left font-medium transition hover:border-primary hover:bg-primary/5">
              {o.label} <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </Card>
    )
  }
  return (
    <div className={cn('rounded-2xl border-2 p-6', TONE[node.tone ?? 'info'])}>
      <h2 className="text-xl font-semibold">{node.title}</h2>
      <p className="mt-2 leading-relaxed">{node.text}</p>
      {node.actions && node.actions.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {node.actions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )}
      {node.links && node.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {node.links.map((l) => (
            <Button key={l.to} size="sm" variant={l.to.startsWith('#') ? 'primary' : 'outline'} onClick={() => onLink(l.to)}>
              {l.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

function MapTree({ algo, id, seen, depth = 0 }: { algo: Algorithm; id: string; seen: Set<string>; depth?: number }) {
  const n = algo.nodes.find((x) => x.id === id)
  if (!n || depth > 12) return null
  if (seen.has(id)) return <div className="text-xs text-muted-foreground">↺ see above</div>
  const s = new Set(seen).add(id)
  if (n.type === 'result') {
    const cont = n.links?.find((l) => l.to.startsWith('#'))
    return (
      <div>
        <div className={cn('rounded-lg border px-3 py-2 text-sm', TONE[n.tone ?? 'info'])}>
          <span className="font-semibold">{n.title}</span> — <span className="text-muted-foreground">{n.text}</span>
        </div>
        {cont && (
          <div className="ml-4 mt-2 border-l border-border pl-4">
            <MapTree algo={algo} id={cont.to.slice(1)} seen={s} depth={depth + 1} />
          </div>
        )}
      </div>
    )
  }
  return (
    <div>
      <div className="text-sm font-semibold">{n.text}</div>
      <ul className="mt-2 space-y-2 border-l border-border pl-4">
        {n.options.map((o) => (
          <li key={o.label}>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{o.label}</div>
            <MapTree algo={algo} id={o.next} seen={s} depth={depth + 1} />
          </li>
        ))}
      </ul>
    </div>
  )
}
