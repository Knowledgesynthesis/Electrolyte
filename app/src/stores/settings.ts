import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UnitSystem, AppSettings } from '@/types'

interface SettingsState extends AppSettings {
  setUnitSystem: (system: UnitSystem) => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  toggleAccessibilityMode: () => void
  setOfflineMode: (enabled: boolean) => void
  updateLastSync: () => void
  resetSettings: () => void
}

const defaultSettings: AppSettings = {
  unitSystem: 'SI', // Default to SI units (mmol/L)
  theme: 'dark',
  fontSize: 'medium',
  accessibilityMode: false,
  offlineMode: true,
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setUnitSystem: (system: UnitSystem) => {
        set({ unitSystem: system })
      },

      setFontSize: (size: 'small' | 'medium' | 'large') => {
        set({ fontSize: size })
        applyFontSize(size)
      },

      toggleAccessibilityMode: () => {
        set((state) => ({ accessibilityMode: !state.accessibilityMode }))
      },

      setOfflineMode: (enabled: boolean) => {
        set({ offlineMode: enabled })
      },

      updateLastSync: () => {
        set({ lastSync: new Date() })
      },

      resetSettings: () => {
        set(defaultSettings)
        applyFontSize('medium')
      },
    }),
    {
      name: 'electrolyte-settings',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyFontSize(state.fontSize)
        }
      },
    }
  )
)

function applyFontSize(size: 'small' | 'medium' | 'large') {
  const root = window.document.documentElement

  // Remove existing font size classes
  root.classList.remove('text-sm', 'text-base', 'text-lg')

  // Apply new font size
  switch (size) {
    case 'small':
      root.style.fontSize = '14px'
      break
    case 'medium':
      root.style.fontSize = '16px'
      break
    case 'large':
      root.style.fontSize = '18px'
      break
  }
}
