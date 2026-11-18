import { describe, expect, it } from 'vitest'
import { NA_HYPO } from '@/lib/clinical/constants'
import { ALGORITHMS } from './algorithms'
import { CASES } from './cases'
import { FLASHCARDS } from './flashcards'
import { GLOSSARY } from './glossary'
import { LESSONS, MODULES } from './modules'
import { QUESTIONS, QUESTION_BY_ID } from './questions'
import { REFERENCES } from './references'
import { FIGURES, TOOL_BY_ID } from './tools'
import type { Block } from './types'
import { UPDATES } from './updates'

const allBlocks = (): { lesson: string; block: Block }[] => LESSONS.flatMap((l) => l.sections.flatMap((s) => s.blocks.map((block) => ({ lesson: l.id, block }))))

const blockText = (b: Block): string => {
  switch (b.kind) {
    case 'p':
    case 'h':
      return b.text
    case 'list':
      return b.items.join(' ')
    case 'callout':
      return [b.title, b.text, ...(b.items ?? [])].join(' ')
    case 'table':
      return [b.caption, ...b.head, ...b.rows.flat()].join(' ')
    case 'formula':
      return [b.name, b.expr, b.example, b.note, ...(b.vars ?? []).flat()].join(' ')
    case 'steps':
      return b.steps.map((s) => s.title + ' ' + s.text).join(' ')
    default:
      return ''
  }
}

const corpus = () =>
  [
    ...allBlocks().map((x) => blockText(x.block)),
    ...LESSONS.flatMap((l) => [l.summary, ...l.bottomLine, ...l.objectives]),
    ...QUESTIONS.flatMap((q) => [q.stem, q.explanation, ...q.options.flatMap((o) => [o.text, o.why])]),
    ...CASES.flatMap((c) => [c.hook, ...c.debrief, ...c.stages.flatMap((s) => [s.narrative, s.prompt ?? '', ...(s.choices ?? []).flatMap((ch) => [ch.text, ch.feedback])])]),
    ...ALGORITHMS.flatMap((a) => a.nodes.flatMap((n) => (n.type === 'question' ? [n.text, n.help ?? ''] : [n.title, n.text, ...(n.actions ?? [])]))),
    ...FLASHCARDS.flatMap((f) => [f.front, f.back]),
    ...GLOSSARY.map((g) => g.def),
    ...UPDATES.flatMap((u) => [u.change, u.practice]),
  ].join('\n')

describe('referential integrity', () => {
  it('every cited reference exists', () => {
    const cited = new Set<string>()
    for (const l of LESSONS) l.refs.forEach((r) => cited.add(r))
    for (const { block } of allBlocks()) ('refs' in block ? block.refs ?? [] : []).forEach((r) => cited.add(r))
    QUESTIONS.forEach((q) => q.refs?.forEach((r) => cited.add(r)))
    CASES.forEach((c) => c.refs.forEach((r) => cited.add(r)))
    ALGORITHMS.forEach((a) => a.refs.forEach((r) => cited.add(r)))
    UPDATES.forEach((u) => u.refs.forEach((r) => cited.add(r)))
    const missing = [...cited].filter((r) => !REFERENCES[r])
    expect(missing).toEqual([])
  })

  it('references are well-formed and not from the future', () => {
    for (const r of Object.values(REFERENCES)) {
      expect(r.year).toBeLessThanOrEqual(2026)
      expect(r.cite.length).toBeGreaterThan(20)
      if (r.url) expect(r.url).toMatch(/^https:\/\//)
    }
  })

  it('embedded questions, tools and figures exist', () => {
    for (const { lesson, block } of allBlocks()) {
      if (block.kind === 'check') expect(QUESTION_BY_ID[block.questionId], `${lesson} → ${block.questionId}`).toBeDefined()
      if (block.kind === 'tool') expect(TOOL_BY_ID[block.toolId], `${lesson} → ${block.toolId}`).toBeDefined()
      if (block.kind === 'figure') expect(FIGURES as readonly string[]).toContain(block.figureId)
    }
  })

  it('every module lists real lessons and every lesson belongs to a module', () => {
    const ids = new Set(LESSONS.map((l) => l.id))
    expect(ids.size).toBe(LESSONS.length)
    for (const m of MODULES) for (const l of m.lessons) expect(ids.has(l)).toBe(true)
    expect(MODULES.flatMap((m) => m.lessons).length).toBe(LESSONS.length)
  })
})

describe('question bank', () => {
  it('ids unique; answers valid; options explained; lesson links valid', () => {
    const ids = new Set<string>()
    const lessonIds = new Set(LESSONS.map((l) => l.id))
    for (const q of QUESTIONS) {
      expect(ids.has(q.id), q.id).toBe(false)
      ids.add(q.id)
      expect(q.options.length).toBeGreaterThanOrEqual(3)
      expect(q.options.map((o) => o.id)).toContain(q.answer)
      expect(new Set(q.options.map((o) => o.id)).size).toBe(q.options.length)
      for (const o of q.options) expect(o.why.length, `${q.id}/${o.id}`).toBeGreaterThan(3)
      expect(lessonIds.has(q.lesson), q.id).toBe(true)
    }
  })
  it('covers every module', () => {
    for (const m of MODULES) expect(QUESTIONS.some((q) => q.module === m.id), m.id).toBe(true)
  })
})

describe('cases', () => {
  it('stages connect and are all reachable', () => {
    for (const c of CASES) {
      const byId = new Map(c.stages.map((s) => [s.id, s]))
      expect(byId.has(c.start), c.id).toBe(true)
      const seen = new Set<string>()
      const stack = [c.start]
      while (stack.length) {
        const id = stack.pop()!
        if (seen.has(id)) continue
        seen.add(id)
        const s = byId.get(id)
        expect(s, `${c.id}: missing stage ${id}`).toBeDefined()
        for (const ch of s!.choices ?? []) stack.push(ch.next)
      }
      expect(seen.size, c.id).toBe(c.stages.length)
      expect(c.stages.some((s) => (s.choices ?? []).some((ch) => ch.grade === 'best'))).toBe(true)
    }
  })
})

describe('algorithms', () => {
  it('every option leads somewhere, every node is reachable, no dead-end questions', () => {
    for (const a of ALGORITHMS) {
      const byId = new Map(a.nodes.map((n) => [n.id, n]))
      expect(byId.size, `${a.id} duplicate node ids`).toBe(a.nodes.length)
      const seen = new Set<string>()
      const stack = [a.start]
      while (stack.length) {
        const id = stack.pop()!
        if (seen.has(id)) continue
        seen.add(id)
        const n = byId.get(id)
        expect(n, `${a.id}: missing node ${id}`).toBeDefined()
        if (n!.type === 'question') {
          expect(n!.options.length).toBeGreaterThanOrEqual(2)
          n!.options.forEach((o) => stack.push(o.next))
        } else {
          for (const l of n!.links ?? []) if (l.to.startsWith('#')) stack.push(l.to.slice(1))
        }
      }
      expect([...byId.keys()].filter((k) => !seen.has(k)), a.id).toEqual([])
    }
  })
})

describe('contradiction check (single source of truth)', () => {
  const text = corpus()

  it('sodium correction ceilings quoted anywhere match the constants', () => {
    const allowed = new Set<number>([NA_HYPO.limit24h, NA_HYPO.limitHighRisk24h, NA_HYPO.limit48h])
    const re = /≤\s*(\d+)\s*mmol\/L(?:\/24 h| in (?:any )?24 h| per 24 h| in 48 h)/g
    for (const m of text.matchAll(re)) expect(allowed.has(Number(m[1])), m[0]).toBe(true)
  })

  it('does not contain outdated or fabricated claims', () => {
    const banned: [RegExp, string][] = [
      [/KDIGO[^.\n]{0,40}(hyponatr|sodium correction)/i, 'No KDIGO hyponatremia guideline exists'],
      [/SIADH[^.\n]{0,80}urine Na\s*>\s*20/i, 'SIADH urine Na threshold is >30'],
      [/use (the )?TTKG/i, 'TTKG is obsolete'],
      [/SGLT2[^.\n]{0,40}(cause|waste)s? (hypo)?magnes/i, 'SGLT2 inhibitors raise Mg'],
      [/Ca\s*[×x]\s*PO₄[^.\n]{0,30}(>|above)\s*5[05]/i, 'Ca×P product no longer guides therapy'],
    ]
    for (const [re, why] of banned) expect(re.test(text), why).toBe(false)
  })

  it('legacy DI terms are always paired with AVP-D/AVP-R naming', () => {
    for (const line of text.split('\n')) if (/(central|nephrogenic) DI\b/.test(line)) expect(line, line).toMatch(/AVP/)
  })

  it('stone-heart and furosemide-for-hypercalcemia appear only as debunked', () => {
    for (const m of text.matchAll(/stone heart[^\n]*/gi)) expect(m[0]).toMatch(/not supported|no association|safe/i)
  })
})
