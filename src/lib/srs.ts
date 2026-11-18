/**
 * SM-2 spaced repetition (Wozniak 1990), simplified.
 * Quality: 1 = again, 3 = hard, 4 = good, 5 = easy.
 */
export interface SrsState {
  ease: number
  interval: number
  reps: number
  due: number
  lapses: number
}

export const DAY = 86_400_000

export function newSrs(now = Date.now()): SrsState {
  return { ease: 2.5, interval: 0, reps: 0, due: now, lapses: 0 }
}

export function review(state: SrsState | undefined, quality: 1 | 3 | 4 | 5, now = Date.now()): SrsState {
  const s = state ?? newSrs(now)
  if (quality < 3) {
    return { ease: Math.max(1.3, s.ease - 0.2), interval: 0, reps: 0, due: now + 10 * 60_000, lapses: s.lapses + 1 }
  }
  const reps = s.reps + 1
  let interval: number
  if (reps === 1) interval = quality === 5 ? 3 : 1
  else if (reps === 2) interval = quality === 3 ? 3 : 6
  else interval = Math.round(s.interval * s.ease * (quality === 3 ? 0.8 : quality === 5 ? 1.3 : 1))
  const ease = Math.max(1.3, s.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
  return { ease, interval, reps, due: now + interval * DAY, lapses: s.lapses }
}

export function isDue(s: SrsState | undefined, now = Date.now()): boolean {
  return !!s && s.due <= now
}

export function formatInterval(days: number): string {
  if (days <= 0) return '10 min'
  if (days === 1) return '1 day'
  if (days < 30) return `${days} days`
  const m = Math.round(days / 30)
  return m === 1 ? '1 month' : `${m} months`
}
