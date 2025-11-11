/**
 * Core type definitions for Electrolyte Atlas
 */

export type UnitSystem = 'SI' | 'US'
export type Unit = 'mmol/L' | 'mEq/L' | 'mg/dL'

export interface ElectrolyteRange {
  min: number
  max: number
  unit: Unit
  source: string
  year: number
}

export type Electrolyte = 'sodium' | 'potassium' | 'calcium' | 'magnesium' | 'chloride' | 'bicarbonate' | 'phosphate'

export interface ElectrolyteValue {
  electrolyte: Electrolyte
  value: number
  unit: Unit
  severity: 'normal' | 'mild' | 'moderate' | 'severe'
  timestamp?: Date
}

export interface PatientData {
  id: string
  age?: number
  weight?: number // kg
  sex?: 'male' | 'female' | 'other'
  electrolytes: ElectrolyteValue[]
  creatinine?: number
  albumin?: number
  bun?: number
}

export type BloomLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
export type Domain = 'physiology' | 'pathophysiology' | 'diagnosis' | 'management' | 'pharmacology'
export type LearnerLevel = 'student' | 'resident' | 'fellow' | 'attending'

export interface Lesson {
  id: string
  electrolyte: Electrolyte
  title: string
  description: string
  bloomLevel: BloomLevel
  domain: Domain
  targetLevel: LearnerLevel[]
  prerequisites: string[] // lesson IDs
  content: LessonContent
  estimatedMinutes: number
  version: string
  lastUpdated: Date
}

export interface LessonContent {
  sections: LessonSection[]
  references: Reference[]
  glossary: GlossaryTerm[]
}

export interface LessonSection {
  id: string
  title: string
  type: 'text' | 'diagram' | 'table' | 'equation' | 'interactive' | 'case'
  content: string | DiagramData | TableData | EquationData | InteractiveData
  notes?: string
}

export interface DiagramData {
  type: 'flowchart' | 'mechanism' | 'anatomy'
  imageUrl?: string
  svgData?: string
  description: string
  altText: string
}

export interface TableData {
  headers: string[]
  rows: string[][]
  caption?: string
}

export interface EquationData {
  latex: string
  description: string
  variables: { symbol: string; description: string; unit?: string }[]
}

export interface InteractiveData {
  type: 'calculator' | 'quiz' | 'simulation'
  componentId: string
  props: Record<string, any>
}

export interface Reference {
  id: string
  title: string
  authors?: string[]
  journal?: string
  year: number
  doi?: string
  url?: string
  guideline?: boolean
  guidelineVersion?: string
}

export interface GlossaryTerm {
  term: string
  definition: string
  formalDefinition?: string
  relatedTerms?: string[]
}

export interface Calculator {
  id: string
  name: string
  description: string
  electrolytes: Electrolyte[]
  inputs: CalculatorInput[]
  safetyLimits: SafetyLimit[]
  references: Reference[]
}

export interface CalculatorInput {
  id: string
  label: string
  type: 'number' | 'select' | 'radio'
  unit?: Unit
  min?: number
  max?: number
  step?: number
  defaultValue?: number | string
  options?: { value: string; label: string }[]
  validation?: (value: any) => string | null
  helpText?: string
}

export interface SafetyLimit {
  parameter: string
  operator: '<' | '>' | '<=' | '>=' | '==' | '!='
  value: number
  severity: 'warning' | 'danger'
  message: string
  reference?: string
}

export interface CalculatorResult {
  values: { label: string; value: number; unit?: string }[]
  interpretation: string
  recommendations: string[]
  warnings: string[]
  safetyAlerts: string[]
}

export interface Assessment {
  id: string
  electrolyte: Electrolyte
  type: 'mcq' | 'calculation' | 'ecg' | 'case'
  difficulty: 'easy' | 'medium' | 'hard'
  bloomLevel: BloomLevel
  question: string
  options?: AssessmentOption[]
  correctAnswer: string | number
  explanation: string
  references: string[] // lesson IDs or reference IDs
  tags: string[]
}

export interface AssessmentOption {
  id: string
  text: string
  feedback?: string
}

export interface UserProgress {
  lessonsCompleted: string[]
  assessmentScores: { [assessmentId: string]: number }
  masteryLevel: { [electrolyte: string]: number } // 0-100
  lastActive: Date
}

export interface CaseVignette {
  id: string
  title: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  electrolytes: Electrolyte[]
  presentation: string
  initialLabs: PatientData
  stages: CaseStage[]
  learningObjectives: string[]
  references: Reference[]
}

export interface CaseStage {
  id: string
  description: string
  question?: string
  options?: { id: string; text: string; isCorrect: boolean }[]
  feedback: string
  nextLabs?: Partial<PatientData>
  clinicalPearl?: string
}

export interface AppSettings {
  unitSystem: UnitSystem
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large'
  accessibilityMode: boolean
  offlineMode: boolean
  lastSync?: Date
}
