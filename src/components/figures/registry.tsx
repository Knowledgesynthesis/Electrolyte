import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const MAP: Record<string, LazyExoticComponent<ComponentType>> = {
  'fluid-distribution': lazy(() => import('./FluidDistribution')),
  nephron: lazy(() => import('./NephronMap')),
  'brain-adaptation': lazy(() => import('./BrainAdaptation')),
}

export function FigureRenderer({ id }: { id: string }) {
  const C = MAP[id]
  return C ? <C /> : null
}
