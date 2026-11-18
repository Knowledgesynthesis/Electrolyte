import { Link } from 'react-router-dom'
import { GitBranch } from 'lucide-react'
import { ALGORITHMS } from '@/content/algorithms'
import { MODULE_BY_ID } from '@/content/modules'
import { MODULE_STYLE } from '@/lib/moduleColors'
import { cn } from '@/lib/utils'
import { Card, PageHeader } from '@/components/ui'

export default function AlgorithmsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader eyebrow="Decide" title="Diagnostic algorithms">
        Click through one question at a time, the way you would reason at the bedside. Each endpoint gives the next actions and links to the tool or lesson you need.
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2">
        {ALGORITHMS.map((a) => (
          <Link key={a.id} to={`/algorithms/${a.id}`} className="group">
            <Card className="h-full p-5 transition group-hover:border-primary group-hover:shadow-md">
              <div className={cn('mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide', MODULE_STYLE[a.module].text)}>
                <GitBranch className="h-3.5 w-3.5" /> {MODULE_BY_ID[a.module].title}
              </div>
              <h2 className="text-lg font-semibold">{a.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{a.summary}</p>
              <p className="mt-3 text-xs text-muted-foreground">{a.nodes.filter((n) => n.type === 'result').length} endpoints</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
