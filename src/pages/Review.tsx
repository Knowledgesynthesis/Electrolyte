import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Layers, Repeat } from 'lucide-react'
import { FLASHCARDS } from '@/content/flashcards'
import { QUESTION_BY_ID } from '@/content/questions'
import { MODULE_BY_ID } from '@/content/modules'
import { useProgress } from '@/stores/progress'
import { formatInterval, isDue, review as schedule } from '@/lib/srs'
import { QuestionCard } from '@/components/QuestionCard'
import { Badge, Button, Card, PageHeader } from '@/components/ui'

type Item = { kind: 'q'; id: string } | { kind: 'card'; id: string }

const RATINGS: { q: 1 | 3 | 4 | 5; label: string; cls: string }[] = [
  { q: 1, label: 'Again', cls: 'bg-danger text-white' },
  { q: 3, label: 'Hard', cls: 'bg-warn text-black' },
  { q: 4, label: 'Good', cls: 'bg-ok text-black' },
  { q: 5, label: 'Easy', cls: 'bg-info text-black' },
]

export default function Review() {
  const { srs, rateCard } = useProgress()
  const [queue, setQueue] = useState<Item[] | null>(null)
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(false)

  const dueQ = useMemo(() => Object.keys(srs).filter((id) => QUESTION_BY_ID[id] && isDue(srs[id])), [srs])
  const dueC = useMemo(() => FLASHCARDS.filter((c) => isDue(srs[c.id])).map((c) => c.id), [srs])
  const unseen = useMemo(() => FLASHCARDS.filter((c) => !srs[c.id]).map((c) => c.id), [srs])

  const begin = (items: Item[]) => {
    setQueue(items)
    setPos(0)
    setFlipped(false)
    setAnswered(false)
  }
  const next = () => {
    setPos((p) => p + 1)
    setFlipped(false)
    setAnswered(false)
  }

  if (queue) {
    const item = queue[pos]
    if (!item) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-ok" />
          <h1 className="mt-4 text-2xl font-semibold">Session complete</h1>
          <p className="mt-2 text-muted-foreground">{queue.length} items reviewed. Come back tomorrow — spacing is what makes it stick.</p>
          <Button className="mt-6" variant="outline" onClick={() => setQueue(null)}>
            Back to review
          </Button>
        </div>
      )
    }
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <Badge tone="primary">
            {pos + 1} / {queue.length}
          </Badge>
          <Button size="sm" variant="ghost" onClick={() => setQueue(null)}>
            End
          </Button>
        </div>
        {item.kind === 'q' ? (
          <>
            <QuestionCard key={item.id} question={QUESTION_BY_ID[item.id]} label="Review" onAnswered={() => setAnswered(true)} />
            {answered && (
              <div className="mt-4 text-right">
                <Button onClick={next}>Next →</Button>
              </div>
            )}
          </>
        ) : (
          <FlashcardView
            key={item.id}
            id={item.id}
            flipped={flipped}
            onFlip={() => setFlipped(true)}
            onRate={(q) => {
              rateCard(item.id, q)
              if (q === 1) setQueue((qq) => (qq ? [...qq, item] : qq))
              next()
            }}
            preview={(q) => formatInterval(schedule(srs[item.id], q).interval)}
          />
        )}
      </div>
    )
  }

  const totalDue = dueQ.length + dueC.length
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader eyebrow="Retain" title="Review queue">
        Spaced repetition (SM-2): items you get right come back at growing intervals; items you miss return within minutes.
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <Repeat className="h-6 w-6 text-primary" />
          <h2 className="mt-2 text-lg font-semibold">Due now</h2>
          <p className="text-sm text-muted-foreground">
            {dueQ.length} questions · {dueC.length} flashcards
          </p>
          <Button className="mt-4" disabled={totalDue === 0} onClick={() => begin([...dueQ.map((id) => ({ kind: 'q' as const, id })), ...dueC.map((id) => ({ kind: 'card' as const, id }))])}>
            Review {totalDue} item{totalDue === 1 ? '' : 's'}
          </Button>
          {totalDue === 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Nothing due. Answer questions in <Link to="/practice" className="text-primary hover:underline">Practice</Link> or learn new cards.
            </p>
          )}
        </Card>
        <Card className="p-6">
          <Layers className="h-6 w-6 text-primary" />
          <h2 className="mt-2 text-lg font-semibold">Learn new flashcards</h2>
          <p className="text-sm text-muted-foreground">
            {unseen.length} of {FLASHCARDS.length} not yet seen — formulas, thresholds and doses.
          </p>
          <Button className="mt-4" variant="outline" disabled={unseen.length === 0} onClick={() => begin(unseen.slice(0, 10).map((id) => ({ kind: 'card' as const, id })))}>
            Learn {Math.min(10, unseen.length)} new
          </Button>
        </Card>
      </div>
    </div>
  )
}

function FlashcardView({ id, flipped, onFlip, onRate, preview }: { id: string; flipped: boolean; onFlip: () => void; onRate: (q: 1 | 3 | 4 | 5) => void; preview: (q: 1 | 3 | 4 | 5) => string }) {
  const c = FLASHCARDS.find((x) => x.id === id)!
  return (
    <Card className="p-8">
      <Badge>{MODULE_BY_ID[c.module].title}</Badge>
      <p className="mt-4 text-xl font-semibold leading-snug">{c.front}</p>
      {flipped ? (
        <>
          <div className="mt-6 rounded-xl bg-muted p-4 text-lg">{c.back}</div>
          <div className="mt-6 grid grid-cols-4 gap-2">
            {RATINGS.map((r) => (
              <button key={r.q} type="button" onClick={() => onRate(r.q)} className={`rounded-lg px-2 py-2 text-sm font-semibold ${r.cls}`}>
                {r.label}
                <span className="block text-[11px] font-normal opacity-80">{preview(r.q)}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <Button className="mt-8 w-full" size="lg" onClick={onFlip}>
          Show answer
        </Button>
      )}
    </Card>
  )
}
