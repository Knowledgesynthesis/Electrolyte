import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProgress, Electrolyte } from '@/types'

interface ProgressState extends UserProgress {
  completeLesson: (lessonId: string) => void
  recordAssessmentScore: (assessmentId: string, score: number) => void
  updateMasteryLevel: (electrolyte: Electrolyte, level: number) => void
  resetProgress: () => void
  getElectrolyteMastery: (electrolyte: Electrolyte) => number
  isLessonCompleted: (lessonId: string) => boolean
}

const defaultProgress: UserProgress = {
  lessonsCompleted: [],
  assessmentScores: {},
  masteryLevel: {},
  lastActive: new Date(),
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...defaultProgress,

      completeLesson: (lessonId: string) => {
        set((state) => {
          if (!state.lessonsCompleted.includes(lessonId)) {
            return {
              lessonsCompleted: [...state.lessonsCompleted, lessonId],
              lastActive: new Date(),
            }
          }
          return { lastActive: new Date() }
        })
      },

      recordAssessmentScore: (assessmentId: string, score: number) => {
        set((state) => ({
          assessmentScores: {
            ...state.assessmentScores,
            [assessmentId]: score,
          },
          lastActive: new Date(),
        }))
      },

      updateMasteryLevel: (electrolyte: Electrolyte, level: number) => {
        set((state) => ({
          masteryLevel: {
            ...state.masteryLevel,
            [electrolyte]: Math.max(0, Math.min(100, level)),
          },
          lastActive: new Date(),
        }))
      },

      resetProgress: () => {
        set(defaultProgress)
      },

      getElectrolyteMastery: (electrolyte: Electrolyte) => {
        return get().masteryLevel[electrolyte] || 0
      },

      isLessonCompleted: (lessonId: string) => {
        return get().lessonsCompleted.includes(lessonId)
      },
    }),
    {
      name: 'electrolyte-progress',
    }
  )
)
