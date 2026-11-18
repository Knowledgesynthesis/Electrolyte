import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Brain, Play, RotateCcw, Trophy } from 'lucide-react'
import { MODULES, LESSON_BY_ID } from '@/content/modules'
import { QUESTIONS } from '@/content/questions'
import type { ModuleId, Question } from '@/content/types'
import { useProgress } from '@/stores/progress'
import { MODULE_STYLE } from '@/lib/moduleColors'
import { cn } from '@/lib/utils'
import { QuestionCard } from '@/components/QuestionCard'
import { Badge, Button, Card, PageHeader, Progress, Segmented } from '@/components/ui'

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

export default function Practice() {
  const [params] = useSearchParams()
  const lessonFilter = params.get('lesson')
  const attempts = useProgress((s) => s.attempts)
  const [mods, setMods] = useState<ModuleId[]>(() => (lessonFilter && LESSON_BY_ID[lessonFilter] ? [LESSON_BY_ID[lessonFilter].module] : []))
  const [which, setWhich] = useState<'all' | 'new' | 'wrong'>('all')
  const [count, setCount] = useState<'5' | '10' | '20' | 'all'>('10')
  const [session, setSession] = useState<Question[] | null>(null)
  const [i, setI] = useState(0)
  const [results, setResults] = useState<boolean[]>([])

  const pool = useMemo(
    () =>
      QUESTIONS.filter((q) => (lessonFilter ? q.lesson === lessonFilter : true))
        .filter((q) => (mods.length ? mods.includes(q.module) : true))
        .filter((q) => (which === 'new' ? !attempts[q.id] : which === 'wrong' ? attempts[q.id] && !attempts[q.id].correct : true)),
    [lessonFilter, mods, which, attempts],
  )

  const start = () => {
    const qs = shuffle(pool)
    setSession(count === 'all' ? qs : qs.slice(0, Number(count)))
    setI(0)
    setResults([])
  }

  if (session) {
    const done = i >= session.length
    const correct = results.filter(Boolean).length
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Badge tone="primary">
            {Math.min(i + 1, session.length)} / {session.length}
          </Badge>
          <Progress value={(100 * results.length) / session.length} className="max-w-xs" />
          <Button size="sm" variant="ghost" onClick={() => setSession(null)}>
            End
          </Button>
        </div>
        {!done ? (
          <>
            <QuestionCard key={session[i].id} question={session[i]} label={MODULES.find((m) => m.id === session[i].module)?.title} onAnswered={(ok) => setResults((r) => (r.length > i ? r : [...r, ok]))} />
            {results.length > i && (
              <div className="mt-4 text-right">
                <Button onClick={() => setI(i + 1)}>{i + 1 < session.length ? 'Next question →' : 'See results'}</Button>
              </div>
            )}
          </>
        ) : (
          <Card className="p-8 text-center">
            <Trophy className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-3 text-2xl font-semibold">
              {correct}/{session.length} correct
            </h2>
            <p className="mt-1 text-muted-foreground">Missed questions return in your review queue in 10 minutes; correct ones come back at growing intervals.</p>
            <div className="mt-6 flex justify-center gap-2">
              <Button onClick={start}>
                <RotateCcw className="h-4 w-4" /> New set
              </Button>
              <Button variant="outline" onClick={() => setSession(null)}>
                Change filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageHeader eyebrow="Test" title="Practice questions">
        Clinical vignettes with an explanation for every option — right and wrong. Answers feed your mastery score and the spaced-repetition queue.
      </PageHeader>
      {lessonFilter && LESSON_BY_ID[lessonFilter] && (
        <p className="mb-4 text-sm">
          Filtered to lesson: <strong>{LESSON_BY_ID[lessonFilter].title}</strong>
        </p>
      )}
      <Card className="space-y-6 p-6">
        <div>
          <div className="mb-2 text-sm font-medium">Modules {mods.length === 0 && <span className="text-muted-foreground">(all)</span>}</div>
          <div className="flex flex-wrap gap-2">
            {MODULES.map((m) => {
              const on = mods.includes(m.id)
              const n = QUESTIONS.filter((q) => q.module === m.id).length
              return (
                <button key={m.id} type="button" onClick={() => setMods(on ? mods.filter((x) => x !== m.id) : [...mods, m.id])} aria-pressed={on} className={cn('rounded-full border px-3 py-1.5 text-sm font-medium transition', on ? cn('border-transparent ring-2', MODULE_STYLE[m.id].bg, MODULE_STYLE[m.id].ring, MODULE_STYLE[m.id].text) : 'border-border hover:bg-muted')}>
                  {m.symbol} {m.title} <span className="text-xs opacity-70">({n})</span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <Segmented label="Questions" value={which} onChange={setWhich} options={[{ value: 'all', label: 'All' }, { value: 'new', label: 'Unseen' }, { value: 'wrong', label: 'Previously missed' }]} />
          <Segmented label="Set size" value={count} onChange={setCount} options={[{ value: '5', label: '5' }, { value: '10', label: '10' }, { value: '20', label: '20' }, { value: 'all', label: 'All' }]} />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <span className="text-sm text-muted-foreground">{pool.length} questions match</span>
          <Button size="lg" onClick={start} disabled={pool.length === 0}>
            <Play className="h-4 w-4" /> Start
          </Button>
        </div>
      </Card>
      <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Brain className="h-4 w-4" /> Tip: retrieval beats rereading. Answer before you feel ready, then read every explanation.
      </p>
    </div>
  )
}
