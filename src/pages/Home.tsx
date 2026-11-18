import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Calculator, GitBranch, HeartPulse, Repeat, Sparkles, Stethoscope, Zap } from 'lucide-react'
import { LESSON_BY_ID, LESSONS, MODULES } from '@/content/modules'
import { QUESTIONS } from '@/content/questions'
import { CASES } from '@/content/cases'
import { TOOLS } from '@/content/tools'
import { UPDATES } from '@/content/updates'
import { useProgress, streak } from '@/stores/progress'
import { isDue } from '@/lib/srs'
import { moduleMastery, nextLesson } from '@/lib/mastery'
import { MODULE_STYLE } from '@/lib/moduleColors'
import { cn } from '@/lib/utils'
import { Card, LinkButton, Progress } from '@/components/ui'

export default function Home() {
  const { lessons, attempts, srs, activeDays } = useProgress()
  const mastery = moduleMastery(lessons, attempts, srs)
  const next = nextLesson(lessons)
  const nextL = next ? LESSON_BY_ID[next] : undefined
  const due = Object.values(srs).filter((s) => isDue(s)).length
  const started = Object.keys(lessons).length + Object.keys(attempts).length > 0
  const overall = Math.round(mastery.reduce((a, m) => a + m.score, 0) / mastery.length)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sky-500/10 via-violet-500/10 to-emerald-500/10 p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Evidence reviewed November 2026 · {LESSONS.length} lessons · {TOOLS.length} tools · {QUESTIONS.length} questions
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Master electrolytes and acid–base — from physiology to the bedside.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Short, cited lessons with interactive models, decision trees you can click through, branching cases, calculators that show their working, and spaced repetition that keeps it in your head.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {nextL ? (
              <LinkButton to={`/learn/${nextL.id}`} size="lg">
                {started ? 'Continue' : 'Start'}: {nextL.title} <ArrowRight className="h-4 w-4" />
              </LinkButton>
            ) : (
              <LinkButton to="/practice" size="lg">
                All lessons done — test yourself <ArrowRight className="h-4 w-4" />
              </LinkButton>
            )}
            <LinkButton to="/tools" variant="outline" size="lg">
              <Calculator className="h-4 w-4" /> Bedside tools
            </LinkButton>
          </div>
        </div>
      </section>

      {started && (
        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Overall mastery</div>
            <div className="tabular mt-1 text-2xl font-semibold">{overall}%</div>
            <Progress value={overall} className="mt-2" />
          </Card>
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Lessons</div>
            <div className="tabular mt-1 text-2xl font-semibold">
              {Object.keys(lessons).filter((l) => LESSON_BY_ID[l]).length}/{LESSONS.length}
            </div>
          </Card>
          <Link to="/review">
            <Card className="h-full p-4 transition hover:border-primary">
              <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
                <Repeat className="h-3.5 w-3.5" /> Due for review
              </div>
              <div className={cn('tabular mt-1 text-2xl font-semibold', due > 0 && 'text-primary')}>{due}</div>
            </Card>
          </Link>
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Day streak</div>
            <div className="tabular mt-1 text-2xl font-semibold">{streak(activeDays)}</div>
          </Card>
        </section>
      )}

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">The curriculum</h2>
          <Link to="/learn" className="text-sm font-medium text-primary hover:underline">
            See all lessons →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => {
            const st = MODULE_STYLE[m.id]
            const ms = mastery.find((x) => x.id === m.id)!
            return (
              <Link key={m.id} to={`/learn#${m.id}`} className="group">
                <Card className={cn('h-full bg-gradient-to-br to-transparent p-5 transition group-hover:-translate-y-0.5 group-hover:shadow-md', st.grad)}>
                  <div className={cn('mb-3 inline-flex h-11 min-w-11 items-center justify-center rounded-xl px-2 text-lg font-bold', st.bg, st.text)}>{m.symbol}</div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Progress value={ms.score} className="h-1.5" />
                    <span className="tabular w-9 text-right">{ms.score}%</span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
            <Zap className="h-5 w-5 text-danger" /> At the bedside right now
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">Calculators that show their reasoning and flag the traps.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { to: '/tools/hyperk', icon: HeartPulse, title: 'Hyperkalemia protocol', sub: 'Calcium, insulin–glucose, binders, dialysis' },
              { to: '/tools/na-planner', icon: Calculator, title: 'Hyponatremia correction', sub: 'Boluses, limits, aquaresis simulation' },
              { to: '/tools/acid-base', icon: Brain, title: 'Acid–base analyzer', sub: 'Compensation, gaps, Δ/Δ' },
              { to: '/algorithms/hyponatremia', icon: GitBranch, title: 'Hyponatremia algorithm', sub: 'Click through the work-up' },
            ].map((t) => (
              <Link key={t.to} to={t.to} className="flex items-start gap-3 rounded-xl border border-border p-3 transition hover:border-primary hover:bg-muted/50">
                <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <span className="block font-medium">{t.title}</span>
                  <span className="block text-xs text-muted-foreground">{t.sub}</span>
                </span>
              </Link>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-5 w-5 text-primary" /> What changed recently
          </h2>
          <ul className="space-y-3">
            {UPDATES.slice(0, 4).map((u) => (
              <li key={u.title} className="text-sm">
                <span className="tabular mr-2 text-xs font-semibold text-primary">{u.year}</span>
                <span className="font-medium">{u.title}</span>
                <div className="text-xs text-muted-foreground">{u.practice}</div>
              </li>
            ))}
          </ul>
          <Link to="/evidence" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            All {UPDATES.length} updates →
          </Link>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">How to master it</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { n: 1, title: 'Learn', text: 'Physiology first, then diagnosis and treatment. Every threshold is cited.', to: '/learn' },
            { n: 2, title: 'Apply', text: 'Run the models and calculators inside each lesson.', to: '/tools' },
            { n: 3, title: 'Decide', text: `Work ${CASES.length} branching cases where choices have consequences.`, to: '/cases' },
            { n: 4, title: 'Retain', text: 'Spaced repetition brings back exactly what you are about to forget.', to: '/review' },
          ].map((s) => (
            <Link key={s.n} to={s.to}>
              <Card className="h-full p-5 transition hover:border-primary">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{s.n}</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <Stethoscope className="h-6 w-6 text-primary" />
          <div>
            <div className="font-semibold">New here? Start with the case.</div>
            <div className="text-sm text-muted-foreground">“The seizure, the thiazide and the 3 a.m. sodium” — 5 minutes.</div>
          </div>
        </div>
        <LinkButton to="/cases/thiazide-seizure" variant="outline">
          Open case <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </section>
    </div>
  )
}
