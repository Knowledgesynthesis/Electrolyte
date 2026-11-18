import { ExternalLink } from 'lucide-react'
import { REFERENCES } from '@/content/references'
import { Badge } from './ui'

const TYPE_LABEL: Record<string, string> = {
  guideline: 'Guideline',
  trial: 'RCT',
  meta: 'Meta-analysis',
  cohort: 'Cohort',
  review: 'Review',
  consensus: 'Consensus',
  regulatory: 'Regulatory',
  physiology: 'Physiology',
}

export function RefItem({ id, index }: { id: string; index?: number }) {
  const r = REFERENCES[id]
  if (!r) return null
  return (
    <li id={`ref-${id}`} className="flex gap-3 text-sm leading-relaxed">
      {index !== undefined && <span className="tabular w-6 shrink-0 text-right text-muted-foreground">{index}.</span>}
      <div className="min-w-0">
        <span>{r.cite}</span>{' '}
        <Badge className="ml-1 align-middle">{TYPE_LABEL[r.type]}</Badge>
        {r.url && (
          <a href={r.url} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline">
            Source <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {r.note && <div className="mt-0.5 text-xs text-muted-foreground">{r.note}</div>}
      </div>
    </li>
  )
}

export function RefList({ ids, numbered = true }: { ids: string[]; numbered?: boolean }) {
  const unique = [...new Set(ids)].filter((id) => REFERENCES[id])
  return (
    <ol className="space-y-2">
      {unique.map((id, i) => (
        <RefItem key={id} id={id} index={numbered ? i + 1 : undefined} />
      ))}
    </ol>
  )
}

/** Superscript citation markers that jump to the lesson reference list */
export function Cite({ ids, order }: { ids?: string[]; order: string[] }) {
  if (!ids?.length) return null
  return (
    <sup className="ml-0.5 whitespace-nowrap">
      {ids.map((id, i) => {
        const n = order.indexOf(id) + 1
        if (n <= 0) return null
        return (
          <a key={id} href={`#ref-${id}`} className="text-[0.7rem] font-semibold text-primary hover:underline" title={REFERENCES[id]?.cite}>
            {i > 0 ? ',' : ''}
            {n}
          </a>
        )
      })}
    </sup>
  )
}
