import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, XCircle, BookOpen, RotateCcw } from 'lucide-react'
import type { Question } from '@/content/types'
import { LESSON_BY_ID } from '@/content/modules'
import { REFERENCES } from '@/content/references'
import { useProgress } from '@/stores/progress'
import { cn } from '@/lib/utils'
import { Rich } from './Rich'
import { Badge, Button } from './ui'

const DIFF = { 1: 'Core', 2: 'Applied', 3: 'Advanced' } as const

export function QuestionCard({
  question,
  onAnswered,
  showLessonLink = true,
  label,
}: {
  question: Question
  onAnswered?: (correct: boolean) => void
  showLessonLink?: boolean
  label?: string
}) {
  const [choice, setChoice] = useState<string | null>(null)
  const recordAnswer = useProgress((s) => s.recordAnswer)
  const answered = choice !== null
  const correct = choice === question.answer

  function pick(id: string) {
    if (answered) return
    setChoice(id)
    const ok = id === question.answer
    recordAnswer(question.id, id, ok)
    onAnswered?.(ok)
  }

  const lesson = LESSON_BY_ID[question.lesson]

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone="primary">{label ?? 'Check yourself'}</Badge>
        <Badge>{DIFF[question.difficulty]}</Badge>
      </div>
      <p className="mb-4 font-medium leading-relaxed">
        <Rich text={question.stem} />
      </p>
      <div className="space-y-2" role="group" aria-label="Answer options">
        {question.options.map((o) => {
          const isAnswer = o.id === question.answer
          const isChosen = o.id === choice
          return (
            <div key={o.id}>
              <button
                type="button"
                onClick={() => pick(o.id)}
                disabled={answered}
                aria-pressed={isChosen}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition',
                  !answered && 'border-border hover:border-primary hover:bg-primary/5',
                  answered && isAnswer && 'border-ok bg-ok-bg',
                  answered && isChosen && !isAnswer && 'border-danger bg-danger-bg',
                  answered && !isChosen && !isAnswer && 'border-border opacity-70',
                )}
              >
                <span className="mt-0.5 shrink-0">
                  {answered && isAnswer ? <CheckCircle2 className="h-4 w-4 text-ok" /> : answered && isChosen ? <XCircle className="h-4 w-4 text-danger" /> : <span className="inline-block h-4 w-4 rounded-full border border-muted-foreground/50" />}
                </span>
                <span>
                  <Rich text={o.text} />
                  {answered && (isChosen || isAnswer) && <span className="mt-1 block text-xs text-muted-foreground"><Rich text={o.why} /></span>}
                </span>
              </button>
            </div>
          )
        })}
      </div>
      {answered && (
        <div className={cn('mt-4 rounded-xl p-4 text-sm leading-relaxed', correct ? 'bg-ok-bg' : 'bg-muted')} aria-live="polite">
          <div className={cn('mb-1 font-semibold', correct ? 'text-ok' : 'text-danger')}>{correct ? 'Correct' : 'Not quite'}</div>
          <Rich text={question.explanation} />
          {question.refs?.length ? (
            <div className="mt-2 text-xs text-muted-foreground">
              Evidence: {question.refs.map((r) => REFERENCES[r]?.cite.split('.')[0] + (REFERENCES[r] ? ` (${REFERENCES[r].year})` : '')).join('; ')}
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {showLessonLink && lesson && (
              <Link to={`/learn/${lesson.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                <BookOpen className="h-3.5 w-3.5" /> Review: {lesson.title}
              </Link>
            )}
            <Button size="sm" variant="ghost" onClick={() => setChoice(null)} className="ml-auto h-7 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Try again
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
