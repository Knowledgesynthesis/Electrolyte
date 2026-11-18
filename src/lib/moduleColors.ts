import type { ModuleId } from '@/content/types'

/** Static class strings so Tailwind can see them */
export const MODULE_STYLE: Record<ModuleId, { text: string; bg: string; ring: string; dot: string; grad: string }> = {
  foundations: { text: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-500/10', ring: 'ring-slate-500/30', dot: 'bg-slate-500', grad: 'from-slate-500/20' },
  sodium: { text: 'text-sky-600 dark:text-sky-300', bg: 'bg-sky-500/10', ring: 'ring-sky-500/30', dot: 'bg-sky-500', grad: 'from-sky-500/20' },
  potassium: { text: 'text-violet-600 dark:text-violet-300', bg: 'bg-violet-500/10', ring: 'ring-violet-500/30', dot: 'bg-violet-500', grad: 'from-violet-500/20' },
  calcium: { text: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/30', dot: 'bg-emerald-500', grad: 'from-emerald-500/20' },
  magnesium: { text: 'text-amber-600 dark:text-amber-300', bg: 'bg-amber-500/10', ring: 'ring-amber-500/30', dot: 'bg-amber-500', grad: 'from-amber-500/20' },
  phosphate: { text: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-500/10', ring: 'ring-rose-500/30', dot: 'bg-rose-500', grad: 'from-rose-500/20' },
  acidbase: { text: 'text-teal-600 dark:text-teal-300', bg: 'bg-teal-500/10', ring: 'ring-teal-500/30', dot: 'bg-teal-500', grad: 'from-teal-500/20' },
  integration: { text: 'text-indigo-600 dark:text-indigo-300', bg: 'bg-indigo-500/10', ring: 'ring-indigo-500/30', dot: 'bg-indigo-500', grad: 'from-indigo-500/20' },
}
