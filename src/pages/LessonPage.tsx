import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Target, Brain, ListChecks } from 'lucide-react'
import { LESSON_BY_ID, MODULE_BY_ID, neighbors } from '@/content/modules'
import { QUESTIONS } from '@/content/questions'
import { useProgress } from '@/stores/progress'
import { MODULE_STYLE } from '@/lib/moduleColors'
import { cn } from '@/lib/utils'
import { BlockView } from '@/components/Blocks'
import { RefList } from '@/components/RefList'
import { Rich } from '@/components/Rich'
import { Badge, Button, Card, LinkButton } from '@/components/ui'
import NotFound from './NotFound'
import type { Lesson } from '@/content/types'

function citationOrder(l: Lesson): string[] {
  const order: string[] = []
  const add = (ids?: string[]) => ids?.forEach((id) => !order.includes(id) && order.push(id))
  for (const s of l.sections) for (const b of s.blocks) if ('refs' in b) add(b.refs)
  add(l.refs)
  return order
}

export default function LessonPage() {
  const { lessonId = '' } = useParams()
  const lesson = LESSON_BY_ID[lessonId]
  const { lessons, completeLesson, uncompleteLesson } = useProgress()
  if (!lesson) return <NotFound />
  const mod = MODULE_BY_ID[lesson.module]
  const st = MODULE_STYLE[lesson.module]
  const { prev, next } = neighbors(lesson.id)
  const done = !!lessons[lesson.id]
  const order = citationOrder(lesson)
  const qCount = QUESTIONS.filter((q) => q.lesson === lesson.id).length

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-10">
        <article className="mx-auto w-full max-w-3xl">
          <Link to={`/learn#${mod.id}`} className={cn('mb-4 inline-flex items-center gap-1 text-sm font-medium', st.text)}>
            <ArrowLeft className="h-4 w-4" /> {mod.title}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{lesson.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{lesson.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>
              <Clock className="h-3 w-3" /> {lesson.minutes} min
            </Badge>
            {qCount > 0 && <Badge tone="primary">{qCount} practice question{qCount === 1 ? '' : 's'}</Badge>}
            {done && (
              <Badge tone="ok">
                <CheckCircle2 className="h-3 w-3" /> Completed
              </Badge>
            )}
          </div>

          <Card className="mt-6 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Target className="h-4 w-4 text-primary" /> After this lesson you can
            </div>
            <ul className="space-y-1.5 text-sm">
              {lesson.objectives.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="prose-lesson mt-8 space-y-12">
            {lesson.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 space-y-5">
                <h2 className="text-2xl font-semibold tracking-tight">{s.title}</h2>
                {s.blocks.map((b, i) => (
                  <BlockView key={i} block={b} order={order} />
                ))}
              </section>
            ))}
          </div>

          <Card className="mt-12 border-primary/40 bg-primary/5 p-5">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <ListChecks className="h-5 w-5 text-primary" /> Bottom line
            </div>
            <ul className="space-y-1.5">
              {lesson.bottomLine.map((b) => (
                <li key={b} className="flex gap-2 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <Rich text={b} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {done ? (
              <Button variant="outline" onClick={() => uncompleteLesson(lesson.id)}>
                <CheckCircle2 className="h-4 w-4 text-ok" /> Completed — undo
              </Button>
            ) : (
              <Button onClick={() => completeLesson(lesson.id)}>
                <CheckCircle2 className="h-4 w-4" /> Mark lesson complete
              </Button>
            )}
            {qCount > 0 && (
              <LinkButton to={`/practice?lesson=${lesson.id}`} variant="outline">
                <Brain className="h-4 w-4" /> Practice this lesson
              </LinkButton>
            )}
          </div>

          <section className="mt-12" aria-labelledby="refs">
            <h2 id="refs" className="mb-3 text-lg font-semibold">
              References
            </h2>
            <RefList ids={order} />
          </section>

          <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Lesson navigation">
            {prev ? (
              <Link to={`/learn/${prev.id}`} className="rounded-xl border border-border p-4 transition hover:border-primary">
                <div className="text-xs text-muted-foreground">← Previous</div>
                <div className="font-medium">{prev.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/learn/${next.id}`} onClick={() => !done && completeLesson(lesson.id)} className="rounded-xl border border-border p-4 text-right transition hover:border-primary">
                <div className="text-xs text-muted-foreground">Next →</div>
                <div className="inline-flex items-center gap-1 font-medium">
                  {next.title} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )}
          </nav>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-1 text-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</div>
            {lesson.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                {s.title}
              </a>
            ))}
            <a href="#refs" className="block rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground">
              References
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
