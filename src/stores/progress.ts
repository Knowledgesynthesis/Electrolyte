import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { review, type SrsState } from '@/lib/srs'

export interface Attempt {
  correct: boolean
  choice: string
  at: number
  count: number
  correctCount: number
}

interface ProgressData {
  lessons: Record<string, number>
  attempts: Record<string, Attempt>
  srs: Record<string, SrsState>
  cases: Record<string, { score: number; max: number; at: number }>
  activeDays: string[]
}

interface ProgressState extends ProgressData {
  completeLesson: (id: string) => void
  uncompleteLesson: (id: string) => void
  recordAnswer: (questionId: string, choice: string, correct: boolean) => void
  rateCard: (cardId: string, quality: 1 | 3 | 4 | 5) => void
  recordCase: (caseId: string, score: number, max: number) => void
  reset: () => void
  importData: (data: unknown) => boolean
}

const empty: ProgressData = { lessons: {}, attempts: {}, srs: {}, cases: {}, activeDays: [] }

const today = () => new Date().toISOString().slice(0, 10)
const touch = (days: string[]) => (days.includes(today()) ? days : [...days, today()].slice(-400))

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...empty,
      completeLesson: (id) => set((s) => ({ lessons: { ...s.lessons, [id]: Date.now() }, activeDays: touch(s.activeDays) })),
      uncompleteLesson: (id) =>
        set((s) => {
          const lessons = { ...s.lessons }
          delete lessons[id]
          return { lessons }
        }),
      recordAnswer: (questionId, choice, correct) =>
        set((s) => {
          const prev = s.attempts[questionId]
          return {
            attempts: {
              ...s.attempts,
              [questionId]: { correct, choice, at: Date.now(), count: (prev?.count ?? 0) + 1, correctCount: (prev?.correctCount ?? 0) + (correct ? 1 : 0) },
            },
            srs: { ...s.srs, [questionId]: review(s.srs[questionId], correct ? 4 : 1) },
            activeDays: touch(s.activeDays),
          }
        }),
      rateCard: (cardId, quality) => set((s) => ({ srs: { ...s.srs, [cardId]: review(s.srs[cardId], quality) }, activeDays: touch(s.activeDays) })),
      recordCase: (caseId, score, max) =>
        set((s) => {
          const prev = s.cases[caseId]
          const best = !prev || score / max >= prev.score / prev.max ? { score, max, at: Date.now() } : prev
          return { cases: { ...s.cases, [caseId]: best }, activeDays: touch(s.activeDays) }
        }),
      reset: () => set({ ...empty }),
      importData: (data) => {
        if (!data || typeof data !== 'object') return false
        const d = data as Partial<ProgressData>
        if (typeof d.lessons !== 'object' || typeof d.attempts !== 'object') return false
        set({ lessons: d.lessons ?? {}, attempts: d.attempts ?? {}, srs: d.srs ?? {}, cases: d.cases ?? {}, activeDays: Array.isArray(d.activeDays) ? d.activeDays : [] })
        return true
      },
    }),
    {
      name: 'ea-progress',
      version: 2,
      migrate: () => ({ ...empty }) as ProgressState,
    },
  ),
)

export function streak(days: string[]): number {
  const set = new Set(days)
  let n = 0
  const d = new Date()
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1)
  while (set.has(d.toISOString().slice(0, 10))) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}
