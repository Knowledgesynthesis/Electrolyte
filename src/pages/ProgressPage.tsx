import { Link } from 'react-router-dom'
import { Award, CalendarDays, CheckCircle2, Target } from 'lucide-react'
import { CASES } from '@/content/cases'
import { MODULE_BY_ID } from '@/content/modules'
import { QUESTION_BY_ID } from '@/content/questions'
import { useProgress, streak } from '@/stores/progress'
import { moduleMastery, masteryLabel } from '@/lib/mastery'
import { MODULE_STYLE } from '@/lib/moduleColors'
import { cn } from '@/lib/utils'
import { Card, LinkButton, PageHeader, Progress, Stat } from '@/components/ui'

export default function ProgressPage() {
  const { lessons, attempts, srs, cases, activeDays } = useProgress()
  const mastery = moduleMastery(lessons, attempts, srs)
  const overall = Math.round(mastery.reduce((a, m) => a + m.score, 0) / mastery.length)
  const missed = Object.entries(attempts)
    .filter(([id, a]) => !a.correct && QUESTION_BY_ID[id])
    .sort((a, b) => b[1].at - a[1].at)
  const answered = Object.keys(attempts).length
  const accuracy = answered ? Math.round((100 * Object.values(attempts).filter((a) => a.correct).length) / answered) : 0

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader eyebrow="You" title="Progress">
        Mastery = 40% lessons completed + 60% questions (correct on the latest attempt, with extra weight once recalled correctly at spaced intervals). Stored only in this browser.
      </PageHeader>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Overall mastery" value={`${overall}%`} tone="info" />
        <Stat label="Questions answered" value={answered} sub={`${accuracy}% correct on latest attempt`} />
        <Stat label="Cases completed" value={`${Object.keys(cases).length}/${CASES.length}`} />
        <Stat label="Day streak" value={streak(activeDays)} sub={`${activeDays.length} active days`} />
      </div>

      <h2 className="mb-3 mt-10 flex items-center gap-2 text-xl font-semibold">
        <Target className="h-5 w-5 text-primary" /> By module
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {mastery.map((m) => {
          const mod = MODULE_BY_ID[m.id]
          return (
            <Card key={m.id} className="p-4">
              <div className="flex items-center justify-between">
                <Link to={`/learn#${m.id}`} className={cn('font-semibold hover:underline', MODULE_STYLE[m.id].text)}>
                  {mod.symbol} {mod.title}
                </Link>
                <span className="text-sm text-muted-foreground">{masteryLabel(m.score)}</span>
              </div>
              <Progress value={m.score} className="mt-2" barClass={MODULE_STYLE[m.id].dot} />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>
                  Lessons {m.lessonsDone}/{m.lessonsTotal}
                </span>
                <span>
                  Correct {m.questionsCorrect}/{m.questionsTotal} · Mastered {m.questionsMastered}
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold">
            <CheckCircle2 className="h-5 w-5 text-danger" /> To revisit ({missed.length})
          </h2>
          {missed.length === 0 ? (
            <p className="text-sm text-muted-foreground">No missed questions on their latest attempt.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {missed.slice(0, 8).map(([id]) => {
                const q = QUESTION_BY_ID[id]
                return (
                  <li key={id}>
                    <Link to={`/learn/${q.lesson}`} className="hover:underline">
                      {q.stem.slice(0, 110)}
                      {q.stem.length > 110 ? '…' : ''}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          {missed.length > 0 && (
            <LinkButton to="/practice" variant="outline" size="sm" className="mt-4">
              Practice missed questions
            </LinkButton>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold">
            <Award className="h-5 w-5 text-primary" /> Cases
          </h2>
          <ul className="space-y-2 text-sm">
            {CASES.map((c) => {
              const r = cases[c.id]
              return (
                <li key={c.id} className="flex items-center justify-between gap-3">
                  <Link to={`/cases/${c.id}`} className="truncate hover:underline">
                    {c.title}
                  </Link>
                  <span className="tabular shrink-0 text-muted-foreground">{r ? `${Math.round((100 * r.score) / r.max)}%` : '—'}</span>
                </li>
              )
            })}
          </ul>
        </Card>
      </div>
      <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarDays className="h-4 w-4" /> Export or reset your data in <Link to="/settings" className="text-primary hover:underline">Settings</Link>.
      </p>
    </div>
  )
}
