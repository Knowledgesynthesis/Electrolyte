import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { UPDATES } from '@/content/updates'
import { REFERENCE_LIST } from '@/content/references'
import { MODULE_BY_ID } from '@/content/modules'
import type { EvidenceUpdate, Reference } from '@/content/types'
import { RefItem } from '@/components/RefList'
import { Badge, Card, PageHeader, Segmented } from '@/components/ui'

const STATUS: Record<EvidenceUpdate['status'], { label: string; tone: 'ok' | 'info' | 'warn' | 'danger' }> = {
  'practice-changing': { label: 'Practice-changing', tone: 'ok' },
  emerging: { label: 'Emerging', tone: 'info' },
  debated: { label: 'Debated', tone: 'warn' },
  retired: { label: 'Retired practice', tone: 'danger' },
}

export default function Evidence() {
  const [tab, setTab] = useState<'updates' | 'library'>('updates')
  const [status, setStatus] = useState<'all' | EvidenceUpdate['status']>('all')
  const [type, setType] = useState<'all' | Reference['type']>('all')
  const [q, setQ] = useState('')
  const refs = useMemo(() => REFERENCE_LIST.filter((r) => (type === 'all' || r.type === type) && (!q || r.cite.toLowerCase().includes(q.toLowerCase()))), [type, q])

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader eyebrow="Evidence" title="What's new & the reference library">
        Practice has moved in the last few years. These are the changes older teaching — and the previous version of this app — got wrong or did not yet include.
      </PageHeader>
      <Segmented value={tab} onChange={setTab} options={[{ value: 'updates', label: `Updates (${UPDATES.length})` }, { value: 'library', label: `References (${REFERENCE_LIST.length})` }]} />

      {tab === 'updates' ? (
        <div className="mt-6">
          <Segmented size="sm" value={status} onChange={setStatus} options={[{ value: 'all', label: 'All' }, ...Object.entries(STATUS).map(([k, v]) => ({ value: k as EvidenceUpdate['status'], label: v.label }))]} />
          <ol className="relative mt-6 space-y-4 border-l-2 border-border pl-6">
            {UPDATES.filter((u) => status === 'all' || u.status === status).map((u) => (
              <li key={u.title} className="relative">
                <span className="absolute -left-[1.95rem] top-5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                <Card className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="tabular text-sm font-bold text-primary">{u.year}</span>
                    <Badge tone={STATUS[u.status].tone}>{STATUS[u.status].label}</Badge>
                    <Badge>{MODULE_BY_ID[u.module].title}</Badge>
                  </div>
                  <h2 className="font-semibold">{u.title}</h2>
                  <p className="mt-1 text-sm">{u.change}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">In practice: </span>
                    {u.practice}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {u.refs.map((r) => (
                      <RefItem key={r} id={r} />
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search author, title, journal…" className="h-10 w-full bg-transparent text-sm outline-none" aria-label="Search references" />
            </div>
            <Segmented
              size="sm"
              value={type}
              onChange={setType}
              options={[
                { value: 'all', label: 'All' },
                { value: 'guideline', label: 'Guidelines' },
                { value: 'trial', label: 'RCTs' },
                { value: 'meta', label: 'Meta' },
                { value: 'cohort', label: 'Cohorts' },
                { value: 'consensus', label: 'Consensus' },
                { value: 'review', label: 'Reviews' },
                { value: 'regulatory', label: 'Regulatory' },
                { value: 'physiology', label: 'Physiology' },
              ]}
            />
          </div>
          <Card className="p-5">
            <ol className="space-y-3">
              {refs.map((r, i) => (
                <RefItem key={r.id} id={r.id} index={i + 1} />
              ))}
            </ol>
          </Card>
        </div>
      )}
    </div>
  )
}
