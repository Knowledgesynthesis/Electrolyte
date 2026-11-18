import type { ModuleId } from './types'

export interface ToolMeta {
  id: string
  title: string
  module: ModuleId
  summary: string
  keywords: string
}

export const TOOLS: ToolMeta[] = [
  { id: 'na-planner', title: 'Hyponatremia correction planner', module: 'sodium', summary: 'Boluses, infusion rate, ODS-risk limits and a simulated 24 h course with aquaresis.', keywords: 'sodium correction hypertonic 3% saline adrogue madias overcorrection ods desmopressin' },
  { id: 'na-workup', title: 'Hyponatremia navigator', module: 'sodium', summary: 'Tonicity → urine osmolality → urine Na → volume, with differential.', keywords: 'siadh urine sodium osmolality tonicity diagnosis' },
  { id: 'hyperna-planner', title: 'Free-water planner', module: 'sodium', summary: 'Deficit, ongoing losses, fluid choice and hourly rate for hypernatremia.', keywords: 'hypernatremia free water deficit d5w avp' },
  { id: 'osm', title: 'Osmolality & corrected sodium', module: 'foundations', summary: 'Calculated and effective osmolality, osmolal gap, glucose-corrected Na.', keywords: 'osmolal gap toxic alcohol hyperglycemia hillier katz' },
  { id: 'k-ecg', title: 'Potassium ECG simulator', module: 'potassium', summary: 'Schematic ECG from K 1.5–9.5 mmol/L with expected findings.', keywords: 'ecg peaked t wave u wave sine wave hyperkalemia hypokalemia' },
  { id: 'hyperk', title: 'Hyperkalemia protocol builder', module: 'potassium', summary: 'Patient-specific protect → shift → remove → monitor plan.', keywords: 'hyperkalemia calcium insulin glucose salbutamol szc dialysis hypoglycemia' },
  { id: 'hypok', title: 'Potassium repletion planner', module: 'potassium', summary: 'Route, rate, dose and deficit estimate for hypokalemia.', keywords: 'hypokalemia kcl iv oral rate magnesium' },
  { id: 'ca-adjust', title: 'Calcium interpreter', module: 'calcium', summary: 'Albumin-adjusted calcium (with its limits) and ionized calcium interpretation.', keywords: 'corrected calcium albumin ionized payne' },
  { id: 'ca-iv', title: 'IV calcium calculator', module: 'calcium', summary: 'Gluconate vs chloride elemental content; infusion rate.', keywords: 'calcium gluconate chloride elemental infusion hypocalcemia' },
  { id: 'mg-planner', title: 'Magnesium planner', module: 'magnesium', summary: 'Severity-based MgSO₄ plan, renal adjustment, FEMg.', keywords: 'magnesium sulfate femg torsades hypomagnesemia' },
  { id: 'acid-base', title: 'Acid–base analyzer', module: 'acidbase', summary: 'Six-step interpretation with compensation, anion gap, Δ/Δ and osmolal gap.', keywords: 'abg vbg winters anion gap delta ratio compensation' },
  { id: 'urine', title: 'Urine indices', module: 'acidbase', summary: 'FENa, FEurea, urine anion and osmolal gaps, urine K/Cr, EFWC, Furst ratio.', keywords: 'fena feurea urine anion gap rta efwc furst' },
  { id: 'units', title: 'Unit converter', module: 'foundations', summary: 'Ca, Mg, phosphate, glucose, BUN/urea, creatinine, albumin; mmol ↔ mEq.', keywords: 'convert mg/dl mmol meq si conventional' },
]

export const TOOL_BY_ID: Record<string, ToolMeta> = Object.fromEntries(TOOLS.map((t) => [t.id, t]))

export const FIGURES = ['fluid-distribution', 'nephron', 'brain-adaptation'] as const
