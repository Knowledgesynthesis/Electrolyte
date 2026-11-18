/**
 * Schematic ECG synthesis as a function of serum potassium.
 * Waves are Gaussians; morphology follows the classic (but insensitive) sequence:
 * hypoK → T flattening, ST depression, prominent U; hyperK → peaked T, PR prolongation,
 * P flattening/loss, QRS widening, sine wave. For teaching only — real ECGs correlate poorly with K.
 */
export interface EcgParams {
  pAmp: number
  pr: number
  qrsWidth: number
  rAmp: number
  sAmp: number
  stShift: number
  tAmp: number
  tWidth: number
  tOffset: number
  uAmp: number
  rr: number
  sine: number
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t))

export function ecgParams(k: number): EcgParams {
  const p: EcgParams = {
    pAmp: 0.15,
    pr: 0.16,
    qrsWidth: 0.09,
    rAmp: 1.1,
    sAmp: 0.25,
    stShift: 0,
    tAmp: 0.3,
    tWidth: 0.07,
    tOffset: 0.3,
    uAmp: 0.02,
    rr: 0.86,
    sine: 0,
  }
  if (k < 3.5) {
    const t = (3.5 - k) / 1.7 // 0 at 3.5 → 1 at 1.8
    p.tAmp = lerp(0.3, 0.04, t)
    p.stShift = lerp(0, -0.08, t)
    p.uAmp = lerp(0.04, 0.24, t)
    p.pAmp = lerp(0.15, 0.22, t)
    p.tOffset = lerp(0.3, 0.33, t)
  } else if (k > 5.0) {
    const tPeak = (k - 5.0) / 1.5 // 5.0 → 6.5
    p.tAmp = lerp(0.3, 0.85, tPeak)
    p.tWidth = lerp(0.07, 0.045, tPeak)
    p.uAmp = 0
    if (k > 6.0) {
      const t = (k - 6.0) / 2.0 // 6.0 → 8.0
      p.pr = lerp(0.16, 0.26, t)
      p.pAmp = lerp(0.15, 0.0, (k - 6.5) / 1.5)
      p.qrsWidth = lerp(0.09, 0.2, t)
      p.rAmp = lerp(1.1, 0.7, t)
      p.sAmp = lerp(0.25, 0.55, t)
      p.tOffset = lerp(0.3, 0.36, t)
      p.rr = lerp(0.86, 1.05, t)
    }
    if (k > 8.0) {
      p.sine = lerp(0, 1, (k - 8.0) / 1.0)
      p.qrsWidth = lerp(0.2, 0.3, (k - 8.0) / 1.0)
    }
  }
  return p
}

const g = (x: number, mu: number, sigma: number) => Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma))

/** Voltage (mV) at time t (s) within one beat */
export function beatVoltage(t: number, p: EcgParams): number {
  const pWave = p.pAmp * g(t, 0.08, 0.025)
  const qrsStart = 0.08 + p.pr - 0.04
  const qrsMid = qrsStart + p.qrsWidth / 2
  const q = -0.08 * g(t, qrsStart + p.qrsWidth * 0.15, p.qrsWidth * 0.1)
  const r = p.rAmp * g(t, qrsMid, p.qrsWidth * 0.17)
  const s = -p.sAmp * g(t, qrsStart + p.qrsWidth * 0.85, p.qrsWidth * 0.14)
  const tCenter = qrsStart + p.qrsWidth + p.tOffset - 0.09
  const st = t > qrsStart + p.qrsWidth && t < tCenter ? p.stShift * g(t, (qrsStart + p.qrsWidth + tCenter) / 2, 0.06) : 0
  const tWave = p.tAmp * g(t, tCenter, p.tWidth)
  const uWave = p.uAmp * g(t, tCenter + 0.16, 0.045)
  const normal = pWave + q + r + s + st + tWave + uWave
  if (p.sine <= 0) return normal
  const sineWave = 0.75 * Math.sin((2 * Math.PI * (t - qrsStart)) / p.rr)
  return (1 - p.sine) * normal + p.sine * sineWave
}

/** Polyline points for n beats, sampled every dt seconds */
export function ecgTrace(k: number, beats = 3, dt = 0.004): { t: number; v: number }[] {
  const p = ecgParams(k)
  const pts: { t: number; v: number }[] = []
  for (let b = 0; b < beats; b++) {
    for (let t = 0; t < p.rr; t += dt) {
      pts.push({ t: b * p.rr + t, v: beatVoltage(t, p) })
    }
  }
  return pts
}

export function ecgDescription(k: number): string[] {
  if (k < 2.5) return ['Marked ST depression and flat/inverted T', 'Prominent U waves (may exceed T)', 'Apparent QT(U) prolongation', 'Risk: ventricular ectopy, VT/VF, torsades (worse with digoxin, low Mg)']
  if (k < 3.0) return ['T-wave flattening', 'ST depression', 'U waves becoming prominent']
  if (k < 3.5) return ['Often normal', 'Subtle T flattening / small U waves']
  if (k <= 5.0) return ['Normal morphology']
  if (k < 6.0) return ['Often normal', 'Possibly tall, narrow-based ("tented") T waves']
  if (k < 6.5) return ['Peaked T waves', 'Early PR prolongation']
  if (k < 8.0) return ['Peaked T, PR prolongation', 'P-wave flattening → loss', 'QRS widening', 'Bradyarrhythmias, junctional/escape rhythms']
  return ['Absent P waves', 'Very wide QRS merging with T — sine wave', 'Imminent VF, asystole or PEA']
}
