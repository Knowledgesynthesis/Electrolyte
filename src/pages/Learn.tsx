import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { LESSON_BY_ID, MODULES } from '@/content/modules'
import { useProgress } from '@/stores/progress'
import { moduleMastery, masteryLabel } from '@/lib/mastery'
import { MODULE_STYLE } from '@/lib/moduleColors'
import { cn } from '@/lib/utils'
import { Badge, Card, PageHeader, Progress } from '@/components/ui'

export default function Learn() {
  const { lessons, attempts, srs } = useProgress()
  const mastery = moduleMastery(lessons, attempts, srs)
  const totalMin = MODULES.flatMap((m) => m.lessons).reduce((a, id) => a + LESSON_BY_ID[id].minutes, 0)
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader eyebrow="Curriculum" title="Learn">
        Eight modules in a deliberate order: foundations → each electrolyte → acid–base → integration. About {Math.round(totalMin / 60)} hours end to end; every lesson stands alone.
      </PageHeader>
      <div className="space-y-6">
        {MODULES.map((m, mi) => {
          const st = MODULE_STYLE[m.id]
          const ms = mastery.find((x) => x.id === m.id)!
          return (
            <Card key={m.id} id={m.id} className="scroll-mt-24 overflow-hidden">
              <div className={cn('flex flex-wrap items-center gap-4 bg-gradient-to-r to-transparent p-5', st.grad)}>
                <div className={cn('flex h-12 min-w-12 items-center justify-center rounded-xl px-2 text-lg font-bold', st.bg, st.text)}>{m.symbol}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-muted-foreground">Module {mi + 1}</div>
                  <h2 className="text-xl font-semibold">{m.title}</h2>
                  <p className="text-sm text-muted-foreground">{m.tagline}</p>
                </div>
                <div className="w-40">
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>{masteryLabel(ms.score)}</span>
                    <span className="tabular">{ms.score}%</span>
                  </div>
                  <Progress value={ms.score} />
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    {ms.lessonsDone}/{ms.lessonsTotal} lessons · {ms.questionsCorrect}/{ms.questionsTotal} questions
                  </div>
                </div>
              </div>
              <ol className="divide-y divide-border">
                {m.lessons.map((id, i) => {
                  const l = LESSON_BY_ID[id]
                  const done = !!lessons[id]
                  return (
                    <li key={id}>
                      <Link to={`/learn/${id}`} className="flex items-start gap-4 px-5 py-4 transition hover:bg-muted/50">
                        {done ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ok" /> : <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />}
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">
                            {mi + 1}.{i + 1} {l.title}
                          </div>
                          <div className="text-sm text-muted-foreground">{l.summary}</div>
                        </div>
                        <Badge className="shrink-0">
                          <Clock className="h-3 w-3" /> {l.minutes} min
                        </Badge>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
