import { forwardRef, useId, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'icon'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm',
  secondary: 'bg-muted text-foreground hover:bg-elevated',
  ghost: 'hover:bg-muted text-foreground',
  outline: 'border border-border bg-card hover:bg-muted text-foreground',
  danger: 'bg-danger text-white hover:opacity-90',
}
const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
  icon: 'h-10 w-10',
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn('inline-flex items-center justify-center rounded-lg font-medium transition disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className)}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

export function LinkButton({ to, variant = 'primary', size = 'md', className, children }: { to: string; variant?: Variant; size?: Size; className?: string; children: ReactNode }) {
  return (
    <Link to={to} className={cn('inline-flex items-center justify-center rounded-lg font-medium transition', variants[variant], sizes[size], className)}>
      {children}
    </Link>
  )
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-border bg-card shadow-sm', className)} {...props} />
}

export function Badge({ className, tone = 'neutral', ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'danger' | 'warn' | 'ok' | 'info' | 'primary' }) {
  const tones = {
    neutral: 'bg-muted text-muted-foreground',
    danger: 'bg-danger-bg text-danger',
    warn: 'bg-warn-bg text-warn',
    ok: 'bg-ok-bg text-ok',
    info: 'bg-info-bg text-info',
    primary: 'bg-primary/15 text-primary',
  }
  return <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', tones[tone], className)} {...props} />
}

export function Progress({ value, className, barClass }: { value: number; className?: string; barClass?: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)} role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn('h-full rounded-full bg-primary transition-all', barClass)} style={{ width: `${v}%` }} />
    </div>
  )
}

export function NumberField({
  label,
  value,
  onChange,
  unit,
  step = 'any',
  min,
  max,
  hint,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  unit?: ReactNode
  step?: number | 'any'
  min?: number
  max?: number
  hint?: string
  placeholder?: string
}) {
  const id = useId()
  const n = value === '' ? undefined : Number(value)
  const out = n !== undefined && ((min !== undefined && n < min) || (max !== undefined && n > max))
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <div className={cn('flex items-center rounded-lg border bg-background focus-within:ring-2 focus-within:ring-ring', out ? 'border-warn' : 'border-border')}>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          step={step}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="tabular h-10 w-full min-w-0 bg-transparent px-3 text-sm outline-none"
        />
        {unit && <span className="shrink-0 pr-3 text-xs text-muted-foreground">{unit}</span>}
      </div>
      {out ? <p className="mt-1 text-xs text-warn">Outside plausible range ({min}–{max})</p> : hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function Segmented<T extends string>({ value, onChange, options, label, size = 'md' }: { value: T; onChange: (v: T) => void; options: { value: T; label: ReactNode }[]; label?: string; size?: 'sm' | 'md' }) {
  return (
    <div>
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}
      <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-lg bg-muted p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn('rounded-md font-medium transition', size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm', value === o.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  const id = useId()
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-lg p-1.5 hover:bg-muted">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]" />
      <span className="text-sm">
        <span className="font-medium">{label}</span>
        {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      </span>
    </label>
  )
}

export function SelectField<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function Stat({ label, value, unit, tone, sub }: { label: string; value: ReactNode; unit?: string; tone?: 'danger' | 'warn' | 'ok' | 'info'; sub?: ReactNode }) {
  const t = tone ? { danger: 'text-danger', warn: 'text-warn', ok: 'text-ok', info: 'text-info' }[tone] : ''
  return (
    <div className="rounded-xl bg-muted/60 p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={cn('tabular mt-0.5 text-2xl font-semibold', t)}>
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>}
      </div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  )
}

export function PageHeader({ eyebrow, title, children, actions }: { eyebrow?: ReactNode; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <div className="mb-2 text-sm font-medium text-primary">{eyebrow}</div>}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {children && <div className="mt-3 text-base text-muted-foreground sm:text-lg">{children}</div>}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </div>
  )
}
