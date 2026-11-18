import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { GLOSSARY } from '@/content/glossary'
import { MODULE_BY_ID } from '@/content/modules'
import { Badge, Card, PageHeader } from '@/components/ui'

export default function Glossary() {
  const [q, setQ] = useState('')
  const terms = useMemo(() => {
    const s = q.trim().toLowerCase()
    return [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term)).filter((g) => !s || `${g.term} ${g.def}`.toLowerCase().includes(s))
  }, [q])
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageHeader eyebrow="Terms" title="Glossary" />
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-card px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter terms…" className="h-11 w-full bg-transparent outline-none" aria-label="Filter glossary" />
      </div>
      <Card className="divide-y divide-border">
        {terms.map((g) => (
          <div key={g.term} id={encodeURIComponent(g.term)} className="scroll-mt-24 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold">{g.term}</h2>
              {g.module && <Badge>{MODULE_BY_ID[g.module].title}</Badge>}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{g.def}</p>
          </div>
        ))}
        {terms.length === 0 && <p className="p-4 text-sm text-muted-foreground">No terms match.</p>}
      </Card>
    </div>
  )
}
