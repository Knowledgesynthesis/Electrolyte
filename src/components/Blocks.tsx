import { Suspense } from 'react'
import { AlertOctagon, BookMarked, FlaskConical, Lightbulb, Scale, Sparkles, TriangleAlert, KeyRound, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Block, CalloutTone } from '@/content/types'
import { QUESTION_BY_ID } from '@/content/questions'
import { TOOL_BY_ID } from '@/content/tools'
import { cn } from '@/lib/utils'
import { Rich, Lines } from './Rich'
import { Cite } from './RefList'
import { QuestionCard } from './QuestionCard'
import { ToolRenderer } from './tools/registry'
import { FigureRenderer } from './figures/registry'
import { useSettings } from '@/stores/settings'

const CALLOUT: Record<CalloutTone, { label: string; icon: typeof Lightbulb; cls: string; iconCls: string }> = {
  key: { label: 'Key concept', icon: KeyRound, cls: 'bg-info-bg border-info/30', iconCls: 'text-info' },
  pearl: { label: 'Pearl', icon: Lightbulb, cls: 'bg-pearl-bg border-pearl/30', iconCls: 'text-pearl' },
  pitfall: { label: 'Pitfall', icon: TriangleAlert, cls: 'bg-warn-bg border-warn/40', iconCls: 'text-warn' },
  danger: { label: 'Safety', icon: AlertOctagon, cls: 'bg-danger-bg border-danger/40', iconCls: 'text-danger' },
  evidence: { label: 'Evidence', icon: FlaskConical, cls: 'bg-ok-bg border-ok/30', iconCls: 'text-ok' },
  controversy: { label: 'Uncertain / debated', icon: Scale, cls: 'bg-muted border-border', iconCls: 'text-muted-foreground' },
  update: { label: 'Updated practice', icon: Sparkles, cls: 'bg-primary/10 border-primary/30', iconCls: 'text-primary' },
}

export function BlockView({ block, order }: { block: Block; order: string[] }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="leading-relaxed">
          <Rich text={block.text} />
          <Cite ids={block.refs} order={order} />
        </p>
      )
    case 'h':
      return <h3 className="pt-2 text-lg font-semibold">{block.text}</h3>
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <div>
          <Tag className={cn('space-y-2 pl-5 leading-relaxed', block.ordered ? 'list-decimal' : 'list-disc marker:text-muted-foreground')}>
            {block.items.map((it, i) => (
              <li key={i}>
                <Rich text={it} />
              </li>
            ))}
          </Tag>
          {block.refs && (
            <div className="mt-1 text-right">
              <Cite ids={block.refs} order={order} />
            </div>
          )}
        </div>
      )
    }
    case 'callout': {
      const c = CALLOUT[block.tone]
      const Icon = c.icon
      return (
        <aside className={cn('rounded-xl border p-4', c.cls)}>
          <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-semibold">
            <Icon className={cn('h-4 w-4 shrink-0', c.iconCls)} />
            <span className={c.iconCls}>{c.label}</span>
            {block.title && <span className="text-foreground">· {block.title}</span>}
            <Cite ids={block.refs} order={order} />
          </div>
          {block.text && (
            <p className="text-sm leading-relaxed">
              <Rich text={block.text} />
            </p>
          )}
          {block.items && (
            <ul className="mt-1 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              {block.items.map((it, i) => (
                <li key={i}>
                  <Rich text={it} />
                </li>
              ))}
            </ul>
          )}
        </aside>
      )
    }
    case 'table':
      return (
        <figure>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[32rem] border-collapse text-sm">
              <thead className="bg-muted/70">
                <tr>
                  {block.head.map((h, i) => (
                    <th key={i} scope="col" className="px-3 py-2 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i} className="border-t border-border align-top">
                    {r.map((c, j) => (
                      <td key={j} className={cn('px-3 py-2 leading-relaxed', j === 0 && 'font-medium')}>
                        <Rich text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(block.caption || block.refs) && (
            <figcaption className="mt-1.5 text-xs text-muted-foreground">
              {block.caption}
              <Cite ids={block.refs} order={order} />
            </figcaption>
          )}
        </figure>
      )
    case 'formula':
      return (
        <div className="rounded-xl border border-border bg-elevated p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <BookMarked className="h-4 w-4 text-primary" /> {block.name}
            <Cite ids={block.refs} order={order} />
          </div>
          <div className="overflow-x-auto rounded-lg bg-card px-3 py-2 font-mono text-sm leading-relaxed">
            <Lines text={block.expr} />
          </div>
          {block.vars && (
            <dl className="mt-3 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
              {block.vars.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-mono text-xs font-semibold text-muted-foreground sm:pt-0.5">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {block.example && (
            <p className="mt-3 text-sm">
              <span className="font-semibold">Worked example: </span>
              <Rich text={block.example} />
            </p>
          )}
          {block.note && (
            <p className="mt-2 text-sm text-muted-foreground">
              <Rich text={block.note} />
            </p>
          )}
        </div>
      )
    case 'steps':
      return (
        <div>
          {block.title && <div className="mb-2 text-sm font-semibold">{block.title}</div>}
          <ol className="relative space-y-3 border-l-2 border-primary/30 pl-5">
            {block.steps.map((s, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[1.95rem] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  <Rich text={s.text} />
                </div>
              </li>
            ))}
          </ol>
          {block.refs && (
            <div className="mt-1 text-right">
              <Cite ids={block.refs} order={order} />
            </div>
          )}
        </div>
      )
    case 'tool': {
      const meta = TOOL_BY_ID[block.toolId]
      return (
        <section className="rounded-2xl border-2 border-primary/25 bg-card p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Wrench className="h-4 w-4 text-primary" /> Interactive: {meta?.title}
            </div>
            <Link to={`/tools/${block.toolId}`} className="text-xs font-medium text-primary hover:underline">
              Open full screen →
            </Link>
          </div>
          {block.caption && <p className="mb-3 text-sm text-muted-foreground">{block.caption}</p>}
          <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-muted" />}>
            <ToolWithUnits id={block.toolId} />
          </Suspense>
        </section>
      )
    }
    case 'figure':
      return (
        <figure className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-muted" />}>
            <FigureRenderer id={block.figureId} />
          </Suspense>
          {block.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{block.caption}</figcaption>}
        </figure>
      )
    case 'check': {
      const q = QUESTION_BY_ID[block.questionId]
      return q ? <QuestionCard question={q} showLessonLink={false} /> : null
    }
  }
}

function ToolWithUnits({ id }: { id: string }) {
  const units = useSettings((s) => s.units)
  return <ToolRenderer key={units} id={id} embedded />
}
