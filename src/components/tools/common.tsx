import type { ReactNode } from 'react'
import { AlertOctagon, CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Rich } from '../Rich'

export type Tone = 'info' | 'ok' | 'warn' | 'danger'

const ICON = { info: Info, ok: CheckCircle2, warn: TriangleAlert, danger: AlertOctagon }
const CLS = { info: 'bg-info-bg text-info', ok: 'bg-ok-bg text-ok', warn: 'bg-warn-bg text-warn', danger: 'bg-danger-bg text-danger' }

export function Finding({ tone = 'info', title, children }: { tone?: Tone; title?: ReactNode; children: ReactNode }) {
  const Icon = ICON[tone]
  return (
    <div className={cn('flex gap-3 rounded-xl p-3 text-sm', CLS[tone])}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 text-foreground">
        {title && <div className="font-semibold">{title}</div>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export function RichFinding({ tone, text, title }: { tone?: Tone; text: string; title?: string }) {
  return (
    <Finding tone={tone} title={title}>
      <Rich text={text} />
    </Finding>
  )
}

export function Grid({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const c = { 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-2 sm:grid-cols-3', 4: 'grid-cols-2 lg:grid-cols-4' }[cols]
  return <div className={cn('grid gap-3 sm:gap-4', c)}>{children}</div>
}

export function Panel({ title, children, className }: { title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      {title && <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>}
      {children}
    </div>
  )
}

export function Fineprint({ children }: { children: ReactNode }) {
  return <p className="text-xs leading-relaxed text-muted-foreground">{children}</p>
}
