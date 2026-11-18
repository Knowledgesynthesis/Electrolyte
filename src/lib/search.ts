import { ALGORITHMS } from '@/content/algorithms'
import { CASES } from '@/content/cases'
import { GLOSSARY } from '@/content/glossary'
import { LESSONS, MODULE_BY_ID } from '@/content/modules'
import { TOOLS } from '@/content/tools'

export interface SearchItem {
  kind: 'Lesson' | 'Section' | 'Tool' | 'Algorithm' | 'Case' | 'Glossary'
  title: string
  subtitle: string
  to: string
  hay: string
}

let INDEX: SearchItem[] | null = null

export function searchIndex(): SearchItem[] {
  if (INDEX) return INDEX
  const items: SearchItem[] = []
  for (const l of LESSONS) {
    items.push({ kind: 'Lesson', title: l.title, subtitle: MODULE_BY_ID[l.module].title, to: `/learn/${l.id}`, hay: `${l.title} ${l.summary} ${l.objectives.join(' ')}`.toLowerCase() })
    for (const s of l.sections) {
      const text = s.blocks.map((b) => ('text' in b && typeof b.text === 'string' ? b.text : '') + ('items' in b && Array.isArray(b.items) ? b.items.join(' ') : '') + (b.kind === 'table' ? b.rows.flat().join(' ') : '')).join(' ')
      items.push({ kind: 'Section', title: s.title, subtitle: l.title, to: `/learn/${l.id}#${s.id}`, hay: `${s.title} ${text}`.toLowerCase() })
    }
  }
  for (const t of TOOLS) items.push({ kind: 'Tool', title: t.title, subtitle: t.summary, to: `/tools/${t.id}`, hay: `${t.title} ${t.summary} ${t.keywords}`.toLowerCase() })
  for (const a of ALGORITHMS) items.push({ kind: 'Algorithm', title: a.title, subtitle: a.summary, to: `/algorithms/${a.id}`, hay: `${a.title} ${a.summary} algorithm approach`.toLowerCase() })
  for (const c of CASES) items.push({ kind: 'Case', title: c.title, subtitle: c.hook, to: `/cases/${c.id}`, hay: `${c.title} ${c.hook} ${c.objectives.join(' ')}`.toLowerCase() })
  for (const g of GLOSSARY) items.push({ kind: 'Glossary', title: g.term, subtitle: g.def, to: `/glossary#${encodeURIComponent(g.term)}`, hay: `${g.term} ${g.def}`.toLowerCase() })
  INDEX = items
  return items
}

const WEIGHT: Record<SearchItem['kind'], number> = { Tool: 6, Lesson: 5, Algorithm: 5, Case: 3, Glossary: 3, Section: 1 }

export function search(query: string, limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const tokens = q.split(/\s+/)
  return searchIndex()
    .map((it) => {
      if (!tokens.every((t) => it.hay.includes(t))) return null
      const title = it.title.toLowerCase()
      const score = WEIGHT[it.kind] + (title.includes(q) ? 10 : 0) + (title.startsWith(tokens[0]) ? 4 : 0)
      return { it, score }
    })
    .filter((x): x is { it: SearchItem; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.it)
}
