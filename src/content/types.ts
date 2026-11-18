/**
 * Content model. Text fields support a small inline syntax:
 *   **bold**  *italic*  `code`  [label](/internal/path)
 */

export type ModuleId = 'foundations' | 'sodium' | 'potassium' | 'calcium' | 'magnesium' | 'phosphate' | 'acidbase' | 'integration'

export type CalloutTone = 'key' | 'pearl' | 'pitfall' | 'danger' | 'evidence' | 'controversy' | 'update'

export type Block =
  | { kind: 'p'; text: string; refs?: string[] }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean; refs?: string[] }
  | { kind: 'callout'; tone: CalloutTone; title?: string; text?: string; items?: string[]; refs?: string[] }
  | { kind: 'table'; caption?: string; head: string[]; rows: string[][]; refs?: string[] }
  | {
      kind: 'formula'
      name: string
      expr: string
      vars?: [string, string][]
      example?: string
      note?: string
      refs?: string[]
    }
  | { kind: 'steps'; title?: string; steps: { title: string; text: string }[]; refs?: string[] }
  | { kind: 'tool'; toolId: string; caption?: string }
  | { kind: 'figure'; figureId: string; caption?: string }
  | { kind: 'check'; questionId: string }

export interface Section {
  id: string
  title: string
  blocks: Block[]
}

export interface Lesson {
  id: string
  module: ModuleId
  title: string
  summary: string
  minutes: number
  objectives: string[]
  sections: Section[]
  bottomLine: string[]
  refs: string[]
}

export interface Module {
  id: ModuleId
  title: string
  symbol: string
  tagline: string
  color: string
  lessons: string[]
}

export interface QuestionOption {
  id: string
  text: string
  why: string
}

export interface Question {
  id: string
  module: ModuleId
  lesson: string
  difficulty: 1 | 2 | 3
  stem: string
  options: QuestionOption[]
  answer: string
  explanation: string
  refs?: string[]
}

export interface Flashcard {
  id: string
  module: ModuleId
  front: string
  back: string
}

export interface Lab {
  name: string
  value: string
  unit?: string
  flag?: 'H' | 'L' | 'C'
}

export interface CaseChoice {
  id: string
  text: string
  grade: 'best' | 'acceptable' | 'harmful'
  feedback: string
  next: string
}

export interface CaseStage {
  id: string
  title: string
  narrative: string
  labs?: Lab[]
  prompt?: string
  choices?: CaseChoice[]
}

export interface ClinicalCase {
  id: string
  title: string
  modules: ModuleId[]
  difficulty: 1 | 2 | 3
  hook: string
  objectives: string[]
  start: string
  stages: CaseStage[]
  debrief: string[]
  refs: string[]
}

export type AlgoNode =
  | { id: string; type: 'question'; text: string; help?: string; options: { label: string; next: string }[] }
  | { id: string; type: 'result'; title: string; text: string; actions?: string[]; links?: { label: string; to: string }[]; tone?: 'danger' | 'warn' | 'ok' | 'info' }

export interface Algorithm {
  id: string
  title: string
  module: ModuleId
  summary: string
  start: string
  nodes: AlgoNode[]
  refs: string[]
}

export interface Reference {
  id: string
  cite: string
  year: number
  /** guideline | trial | meta | cohort | review | consensus | regulatory | textbook */
  type: 'guideline' | 'trial' | 'meta' | 'cohort' | 'review' | 'consensus' | 'regulatory' | 'physiology'
  url?: string
  note?: string
}

export interface GlossaryTerm {
  term: string
  def: string
  module?: ModuleId
}

export interface EvidenceUpdate {
  year: number
  title: string
  change: string
  practice: string
  refs: string[]
  module: ModuleId
  status: 'practice-changing' | 'emerging' | 'debated' | 'retired'
}
