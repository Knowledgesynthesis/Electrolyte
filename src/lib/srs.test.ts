import { describe, expect, it } from 'vitest'
import { DAY, isDue, newSrs, review } from './srs'

describe('SM-2 scheduler', () => {
  const t0 = 1_700_000_000_000
  it('grows intervals on success and resets on lapse', () => {
    let s = review(undefined, 4, t0)
    expect(s.interval).toBe(1)
    s = review(s, 4, t0)
    expect(s.interval).toBe(6)
    s = review(s, 4, t0)
    expect(s.interval).toBe(15)
    const lapsed = review(s, 1, t0)
    expect(lapsed.reps).toBe(0)
    expect(lapsed.lapses).toBe(1)
    expect(lapsed.due - t0).toBe(10 * 60_000)
  })
  it('never drops ease below 1.3', () => {
    let s = newSrs(t0)
    for (let i = 0; i < 20; i++) s = review(s, 1, t0)
    expect(s.ease).toBeGreaterThanOrEqual(1.3)
  })
  it('due detection', () => {
    const s = review(undefined, 4, t0)
    expect(isDue(s, t0)).toBe(false)
    expect(isDue(s, t0 + DAY)).toBe(true)
  })
})
