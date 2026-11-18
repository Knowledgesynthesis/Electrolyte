import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UnitSystem } from '@/lib/clinical/units'

export type Theme = 'light' | 'dark' | 'system'

interface SettingsState {
  theme: Theme
  units: UnitSystem
  setTheme: (t: Theme) => void
  setUnits: (u: UnitSystem) => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      units: 'conventional',
      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
      },
      setUnits: (units) => set({ units }),
    }),
    {
      name: 'ea-settings',
      version: 2,
      migrate: (state) => {
        const s = (state ?? {}) as Partial<SettingsState> & { unitSystem?: string }
        return { theme: s.theme ?? 'dark', units: s.units ?? 'conventional' } as SettingsState
      },
      onRehydrateStorage: () => (state) => applyTheme(state?.theme ?? 'dark'),
    },
  ),
)

export function resolvedTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const t = resolvedTheme(theme)
  root.classList.toggle('dark', t === 'dark')
  root.style.colorScheme = t
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#14161f' : '#f8f9fb')
}

if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (useSettings.getState().theme === 'system') applyTheme('system')
  })
}
