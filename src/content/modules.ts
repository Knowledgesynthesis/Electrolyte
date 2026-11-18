import type { Lesson, Module, ModuleId } from './types'
import { foundationsLessons } from './lessons/foundations'
import { sodiumLessons } from './lessons/sodium'
import { potassiumLessons } from './lessons/potassium'
import { calciumLessons } from './lessons/calcium'
import { magnesiumLessons } from './lessons/magnesium'
import { phosphateLessons } from './lessons/phosphate'
import { acidBaseLessons } from './lessons/acidbase'
import { integrationLessons } from './lessons/integration'

export const LESSONS: Lesson[] = [
  ...foundationsLessons,
  ...sodiumLessons,
  ...potassiumLessons,
  ...calciumLessons,
  ...magnesiumLessons,
  ...phosphateLessons,
  ...acidBaseLessons,
  ...integrationLessons,
]

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]))

const byModule = (m: ModuleId) => LESSONS.filter((l) => l.module === m).map((l) => l.id)

export const MODULES: Module[] = [
  { id: 'foundations', title: 'Foundations', symbol: 'H₂O', tagline: 'Compartments, tonicity, the nephron, IV fluids', color: 'slate', lessons: byModule('foundations') },
  { id: 'sodium', title: 'Sodium & Water', symbol: 'Na⁺', tagline: 'ADH, hypo- and hypernatremia, safe correction', color: 'sky', lessons: byModule('sodium') },
  { id: 'potassium', title: 'Potassium', symbol: 'K⁺', tagline: 'Shifts, renal handling, ECG, emergencies', color: 'violet', lessons: byModule('potassium') },
  { id: 'calcium', title: 'Calcium', symbol: 'Ca²⁺', tagline: 'PTH, vitamin D, hypo- and hypercalcemia', color: 'emerald', lessons: byModule('calcium') },
  { id: 'magnesium', title: 'Magnesium', symbol: 'Mg²⁺', tagline: 'The cation that unlocks K and Ca', color: 'amber', lessons: byModule('magnesium') },
  { id: 'phosphate', title: 'Phosphate', symbol: 'PO₄³⁻', tagline: 'Refeeding, IV iron, CKD, tumor lysis', color: 'rose', lessons: byModule('phosphate') },
  { id: 'acidbase', title: 'Acid–Base', symbol: 'H⁺', tagline: 'Six steps, gaps, compensation, mixed disorders', color: 'teal', lessons: byModule('acidbase') },
  { id: 'integration', title: 'Integration', symbol: '⇄', tagline: 'Interactions, special populations, drugs', color: 'indigo', lessons: byModule('integration') },
]

export const MODULE_BY_ID: Record<ModuleId, Module> = Object.fromEntries(MODULES.map((m) => [m.id, m])) as Record<ModuleId, Module>

/** Linear learning path */
export const PATH: string[] = MODULES.flatMap((m) => m.lessons)

export function neighbors(lessonId: string): { prev?: Lesson; next?: Lesson } {
  const i = PATH.indexOf(lessonId)
  return { prev: i > 0 ? LESSON_BY_ID[PATH[i - 1]] : undefined, next: i >= 0 && i < PATH.length - 1 ? LESSON_BY_ID[PATH[i + 1]] : undefined }
}
