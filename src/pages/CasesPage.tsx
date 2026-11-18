import { Link } from 'react-router-dom'
import { CheckCircle2, Stethoscope } from 'lucide-react'
import { CASES } from '@/content/cases'
import { MODULE_BY_ID } from '@/content/modules'
import { useProgress } from '@/stores/progress'
import { Badge, Card, PageHeader } from '@/components/ui'

const DIFF = { 1: 'Foundation', 2: 'Intermediate', 3: 'Advanced' } as const

export default function CasesPage() {
  const results = useProgress((s) => s.cases)
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader eyebrow="Apply" title="Clinical cases">
        Labs evolve, choices have consequences, and each decision is graded best / acceptable / harmful with the reasoning. Your best score is saved.
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2">
        {CASES.map((c) => {
          const r = results[c.id]
          return (
            <Link key={c.id} to={`/cases/${c.id}`} className="group">
              <Card className="h-full p-5 transition group-hover:border-primary group-hover:shadow-md">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  <Badge>{DIFF[c.difficulty]}</Badge>
                  {c.modules.map((m) => (
                    <Badge key={m} tone="info">
                      {MODULE_BY_ID[m].symbol}
                    </Badge>
                  ))}
                  {r && (
                    <Badge tone="ok" className="ml-auto">
                      <CheckCircle2 className="h-3 w-3" /> {Math.round((100 * r.score) / r.max)}%
                    </Badge>
                  )}
                </div>
                <h2 className="text-lg font-semibold">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.hook}</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
