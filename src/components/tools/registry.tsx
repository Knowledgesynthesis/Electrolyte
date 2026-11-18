import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const MAP: Record<string, LazyExoticComponent<ComponentType>> = {
  'na-planner': lazy(() => import('./NaPlanner')),
  'na-workup': lazy(() => import('./NaWorkup')),
  'hyperna-planner': lazy(() => import('./HyperNaPlanner')),
  osm: lazy(() => import('./OsmTool')),
  'k-ecg': lazy(() => import('./KEcg')),
  hyperk: lazy(() => import('./HyperKTool')),
  hypok: lazy(() => import('./HypoKTool')),
  'ca-adjust': lazy(() => import('./CaAdjust')),
  'ca-iv': lazy(() => import('./CaIv')),
  'mg-planner': lazy(() => import('./MgPlanner')),
  'acid-base': lazy(() => import('./AcidBaseTool')),
  urine: lazy(() => import('./UrineTool')),
  units: lazy(() => import('./UnitsTool')),
}

export function ToolRenderer({ id }: { id: string; embedded?: boolean }) {
  const C = MAP[id]
  return C ? <C /> : <p className="text-sm text-muted-foreground">Unknown tool.</p>
}

