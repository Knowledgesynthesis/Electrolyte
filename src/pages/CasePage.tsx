import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Award, RotateCcw, TriangleAlert, XCircle } from 'lucide-react'
import { CASE_BY_ID } from '@/content/cases'
import type { CaseChoice, Lab } from '@/content/types'
import { useProgress } from '@/stores/progress'
import { cn } from '@/lib/utils'
import { RefList } from '@/components/RefList'
import { Badge, Button, Card } from '@/components/ui'
import NotFound from './NotFound'

const GRADE = {
  best: { label: 'Best choice', icon: CheckCircle2, cls: 'border-ok bg-ok-bg', text: 'text-ok', points: 2 },
  acceptable: { label: 'Acceptable', icon: TriangleAlert, cls: 'border-warn bg-warn-bg', text: 'text-warn', points: 1 },
  harmful: { label: 'Harmful', icon: XCircle, cls: 'border-danger bg-danger-bg', text: 'text-danger', points: 0 },
}

function LabTable({ labs }: { labs: Lab[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {labs.map((l) => (
        <div key={l.name} className="rounded-lg bg-muted/70 px-3 py-2">
          <div className="text-xs text-muted-foreground">{l.name}</div>
          <div className={cn('tabular font-semibold', l.flag === 'C' ? 'text-danger' : l.flag ? 'text-warn' : '')}>
            {l.value} <span className="text-xs font-normal text-muted-foreground">{l.unit}</span>
            {l.flag && <span className="ml-1 text-xs">{l.flag === 'C' ? '‼' : l.flag === 'H' ? '↑' : '↓'}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CasePage() {
  const { caseId = '' } = useParams()
  return <CaseView key={caseId} caseId={caseId} />
}

function CaseView({ caseId }: { caseId: string }) {
  const c = CASE_BY_ID[caseId]
  const recordCase = useProgress((s) => s.recordCase)
  const [history, setHistory] = useState<{ stage: string; choice?: CaseChoice }[]>(() => [{ stage: c?.start ?? '' }])
  const [saved, setSaved] = useState(false)
  if (!c) return <NotFound />
  const byId = new Map(c.stages.map((s) => [s.id, s]))
  const current = history[history.length - 1]
  const stage = byId.get(current.stage)!
  const finished = !stage.choices?.length
  const decisions = history.filter((h) => h.choice)
  const score = decisions.reduce((a, h) => a + GRADE[h.choice!.grade].points, 0)
  const max = decisions.length * 2

  const choose = (ch: CaseChoice) => setHistory((h) => [...h.slice(0, -1), { ...h[h.length - 1], choice: ch }])
  const advance = () => {
    const next = current.choice?.next
    if (!next) return
    const nextStage = byId.get(next)!
    setHistory((h) => [...h, { stage: next }])
    if (!nextStage.choices?.length && !saved) {
      recordCase(c.id, score, max)
      setSaved(true)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/cases" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        <ArrowLeft className="h-4 w-4" /> All cases
      </Link>
      <h1 className="text-3xl font-bold tracking-tight">{c.title}</h1>
      <p className="mt-2 text-muted-foreground">{c.hook}</p>
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-medium text-primary">Learning objectives</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
          {c.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </details>

      <div className="mt-6 space-y-6">
        {history.map((h, i) => {
          const s = byId.get(h.stage)!
          const isCurrent = i === history.length - 1
          return (
            <Card key={i} className={cn('p-5', !isCurrent && 'opacity-80')}>
              <div className="mb-2 flex items-center gap-2">
                <Badge tone="primary">Stage {i + 1}</Badge>
                <h2 className="font-semibold">{s.title}</h2>
              </div>
              <p className="whitespace-pre-line leading-relaxed">{s.narrative}</p>
              {s.labs && (
                <div className="mt-4">
                  <LabTable labs={s.labs} />
                </div>
              )}
              {s.prompt && <p className="mt-4 font-semibold">{s.prompt}</p>}
              {s.choices && (
                <div className="mt-3 space-y-2">
                  {s.choices.map((ch) => {
                    const chosen = h.choice?.id === ch.id
                    const g = GRADE[ch.grade]
                    const reveal = !!h.choice
                    return (
                      <div key={ch.id}>
                        <button
                          type="button"
                          disabled={reveal}
                          onClick={() => choose(ch)}
                          className={cn(
                            'w-full rounded-xl border px-4 py-3 text-left text-sm transition',
                            !reveal && 'border-border hover:border-primary hover:bg-primary/5',
                            reveal && chosen && g.cls,
                            reveal && !chosen && ch.grade === 'best' && 'border-ok/60',
                            reveal && !chosen && ch.grade !== 'best' && 'border-border opacity-60',
                          )}
                        >
                          <span className="font-medium">{ch.text}</span>
                          {reveal && (chosen || ch.grade === 'best') && (
                            <span className="mt-1.5 block">
                              <span className={cn('inline-flex items-center gap-1 text-xs font-semibold', g.text)}>
                                <g.icon className="h-3.5 w-3.5" /> {g.label}
                              </span>
                              <span className="mt-0.5 block text-muted-foreground">{ch.feedback}</span>
                            </span>
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
              {isCurrent && h.choice && (
                <div className="mt-4 text-right">
                  <Button onClick={advance}>Continue →</Button>
                </div>
              )}
            </Card>
          )
        })}

        {finished && (
          <Card className="border-primary/40 bg-primary/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">
                Debrief · {score}/{max} points
              </h2>
            </div>
            <ul className="space-y-2">
              {c.debrief.map((d) => (
                <li key={d} className="flex gap-2 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {d}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setHistory([{ stage: c.start }])
                  setSaved(false)
                }}
              >
                <RotateCcw className="h-4 w-4" /> Replay
              </Button>
              <Link to="/cases" className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-primary hover:bg-muted">
                Next case →
              </Link>
            </div>
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold">Evidence</h3>
              <RefList ids={c.refs} />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
