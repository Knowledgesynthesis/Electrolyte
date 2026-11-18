import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { TOOL_BY_ID } from '@/content/tools'
import { LESSONS, MODULE_BY_ID } from '@/content/modules'
import { ToolRenderer } from '@/components/tools/registry'
import { Card } from '@/components/ui'
import { useSettings } from '@/stores/settings'
import NotFound from './NotFound'

const UNIT_TOOLS = new Set(['na-workup', 'osm', 'hyperk', 'ca-adjust', 'mg-planner', 'acid-base', 'units'])

export default function ToolPage() {
  const { toolId = '' } = useParams()
  const tool = TOOL_BY_ID[toolId]
  const units = useSettings((s) => s.units)
  if (!tool) return <NotFound />
  const lessons = LESSONS.filter((l) => l.sections.some((s) => s.blocks.some((b) => b.kind === 'tool' && b.toolId === tool.id)))
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/tools" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        <ArrowLeft className="h-4 w-4" /> All tools
      </Link>
      <div className="mb-6">
        <div className="text-sm font-medium text-muted-foreground">{MODULE_BY_ID[tool.module].title}</div>
        <h1 className="text-3xl font-bold tracking-tight">{tool.title}</h1>
        <p className="mt-2 text-muted-foreground">{tool.summary}</p>
        {UNIT_TOOLS.has(tool.id) && <p className="mt-1 text-xs text-muted-foreground">
          Units: {units === 'SI' ? 'SI (mmol/L)' : 'conventional (mg/dL)'} —{' '}
          <Link to="/settings" className="text-primary hover:underline">
            change
          </Link>
        </p>}
      </div>
      <Card className="p-4 sm:p-6">
        <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-muted" />}>
          <ToolRenderer key={units} id={tool.id} />
        </Suspense>
      </Card>
      {lessons.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <BookOpen className="h-4 w-4 text-muted-foreground" /> Learn the reasoning:
          {lessons.map((l) => (
            <Link key={l.id} to={`/learn/${l.id}`} className="rounded-full bg-muted px-3 py-1 font-medium hover:bg-elevated">
              {l.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
