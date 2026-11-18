import { MODULES, PATH } from '@/content/modules'
import { QUESTIONS } from '@/content/questions'
import type { ModuleId } from '@/content/types'
import type { Attempt } from '@/stores/progress'
import type { SrsState } from './srs'

export interface ModuleMastery {
  id: ModuleId
  lessonsDone: number
  lessonsTotal: number
  questionsCorrect: number
  questionsMastered: number
  questionsTotal: number
  /** 0–100: 40% lessons, 60% questions (latest attempt correct; mastered counts fully) */
  score: number
}

export function moduleMastery(lessons: Record<string, number>, attempts: Record<string, Attempt>, srs: Record<string, SrsState>): ModuleMastery[] {
  return MODULES.map((m) => {
    const qs = QUESTIONS.filter((q) => q.module === m.id)
    const lessonsDone = m.lessons.filter((l) => lessons[l]).length
    const questionsCorrect = qs.filter((q) => attempts[q.id]?.correct).length
    const questionsMastered = qs.filter((q) => attempts[q.id]?.correct && (srs[q.id]?.reps ?? 0) >= 2).length
    const lessonPart = m.lessons.length ? lessonsDone / m.lessons.length : 0
    const qPart = qs.length ? (questionsCorrect * 0.6 + questionsMastered * 0.4) / qs.length : 0
    return {
      id: m.id,
      lessonsDone,
      lessonsTotal: m.lessons.length,
      questionsCorrect,
      questionsMastered,
      questionsTotal: qs.length,
      score: Math.round(100 * (0.4 * lessonPart + 0.6 * qPart)),
    }
  })
}

export function nextLesson(lessons: Record<string, number>): string | undefined {
  return PATH.find((id) => !lessons[id])
}

export function masteryLabel(score: number): string {
  if (score >= 85) return 'Mastered'
  if (score >= 60) return 'Proficient'
  if (score >= 30) return 'Developing'
  if (score > 0) return 'Started'
  return 'Not started'
}
