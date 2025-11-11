import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge class names with Tailwind CSS conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number to a specified number of decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals)
}

/**
 * Convert between mEq/L and mmol/L (1:1 for monovalent ions)
 */
export function convertUnits(
  value: number,
  fromUnit: 'mEq/L' | 'mmol/L',
  toUnit: 'mEq/L' | 'mmol/L',
  valence: number = 1
): number {
  if (fromUnit === toUnit) return value
  // For monovalent ions (Na⁺, K⁺), mEq/L = mmol/L
  // For divalent ions (Ca²⁺, Mg²⁺), 1 mmol/L = 2 mEq/L
  if (fromUnit === 'mmol/L' && toUnit === 'mEq/L') {
    return value * valence
  }
  return value / valence
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Check if a value is within a normal range
 */
export function isInRange(
  value: number,
  min: number,
  max: number
): boolean {
  return value >= min && value <= max
}

/**
 * Calculate the severity level based on deviation from normal range
 */
export function getSeverity(
  value: number,
  normalMin: number,
  normalMax: number
): 'normal' | 'mild' | 'moderate' | 'severe' {
  if (isInRange(value, normalMin, normalMax)) return 'normal'

  const deviation = Math.abs(
    value < normalMin
      ? (normalMin - value) / normalMin
      : (value - normalMax) / normalMax
  )

  if (deviation < 0.15) return 'mild'
  if (deviation < 0.3) return 'moderate'
  return 'severe'
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
