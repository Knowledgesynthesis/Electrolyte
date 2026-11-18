import { MG } from '@/lib/clinical/constants'
import type { Lesson } from '../types'

export const magnesiumLessons: Lesson[] = [
  {
    id: 'hypomagnesemia',
    module: 'magnesium',
    title: 'Magnesium & hypomagnesemia',
    summary: 'The forgotten cation: mostly intracellular, regulated in the TAL and DCT, and the hidden reason many K and Ca problems refuse to correct.',
    minutes: 14,
    objectives: [
      'Explain why serum Mg underestimates depletion',
      'Separate renal from GI losses with FEMg',
      'Name the drugs that waste Mg — including modern ones',
      'Prescribe IV and oral Mg safely',
    ],
    sections: [
      {
        id: 'physiology',
        title: 'Physiology',
        blocks: [
          {
            kind: 'list',
            items: [
              'Total body Mg ≈ 24 g (~1,000 mmol): ~60% bone, ~39% intracellular, ~1% extracellular. Serum Mg can stay normal while stores are depleted.',
              'Reference interval ≈0.70–1.0 mmol/L (1.7–2.4 mg/dL; 1.4–2.0 mEq/L). Some experts argue 0.85 mmol/L should be the lower limit; this is contested.',
              'Kidney: ~10–25% reabsorbed proximally, ~60% in the TAL (paracellular, claudin-16/19, voltage-driven), ~5–10% in the DCT (TRPM6 — the fine-tuning step regulated by EGF).',
              'Gut: TRPM6/7 in the distal small bowel and colon; PPIs impair this active pathway.',
              'Mg is a cofactor for every ATP-dependent reaction and stabilizes membranes — it blocks ROMK from the inside and modulates Ca channels.',
            ],
            refs: ['debaaij2015', 'micke2021'],
          },
        ],
      },
      {
        id: 'causes',
        title: 'Causes',
        blocks: [
          {
            kind: 'table',
            head: ['Route', 'Causes'],
            rows: [
              ['GI', 'Chronic diarrhea, malabsorption, short bowel, laxatives, PPIs (usually >1 year; the FDA warned in 2011), acute pancreatitis, poor intake/alcohol'],
              ['Renal — drugs', 'Loop and thiazide diuretics, calcineurin inhibitors, cisplatin, aminoglycosides, amphotericin B, foscarnet, pentamidine, EGFR-blocking antibodies (cetuximab, panitumumab)'],
              ['Renal — other', 'Alcohol, hypercalcemia (CaSR), osmotic diuresis (DKA), post-obstructive/ATN recovery, Gitelman syndrome, familial hypomagnesemia (claudin-16/19, TRPM6)'],
              ['Redistribution', 'Refeeding, hungry bone syndrome, insulin therapy, catecholamine excess, pancreatitis'],
            ],
            refs: ['agus1999', 'debaaij2015', 'fda2011ppi', 'tejpar2007'],
          },
          {
            kind: 'callout',
            tone: 'pitfall',
            text: 'SGLT2 inhibitors do **not** waste Mg — they modestly raise serum Mg (meta-analysis of RCTs). They have been used to treat refractory hypomagnesemia in small series.',
            refs: ['tang2016'],
          },
          {
            kind: 'formula',
            name: 'Fractional excretion of Mg',
            expr: 'FEMg (%) = (UMg × PCr) / (0.7 × PMg × UCr) × 100',
            vars: [['0.7', 'fraction of plasma Mg that is filterable (not protein-bound)']],
            note: `During hypomagnesemia, FEMg >${MG.feMgRenalWasting}% = renal wasting; <${MG.feMgRenalWasting}% = GI loss or poor intake. Measure before replacing.`,
            refs: ['agus1999'],
          },
          { kind: 'check', questionId: 'mg-q1' },
        ],
      },
      {
        id: 'consequences',
        title: 'Consequences',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Hypokalemia** — Mg-free ROMK leaks K into the urine; refractory until Mg is replaced.',
              '**Hypocalcemia** — impaired PTH release and end-organ PTH resistance when Mg <0.5 mmol/L.',
              '**Arrhythmia** — QT prolongation, torsades de pointes, atrial fibrillation; digoxin toxicity is potentiated.',
              '**Neuromuscular** — tremor, tetany, Chvostek/Trousseau, seizures, vertical nystagmus.',
            ],
            refs: ['huang2007', 'agus1999'],
          },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment',
        blocks: [
          {
            kind: 'table',
            head: ['Situation', 'Regimen'],
            rows: [
              ['Torsades de pointes', 'MgSO₄ 2 g IV over 1–2 min (pulseless) or 5–15 min (with pulse), regardless of serum Mg'],
              ['Severe (<0.5 mmol/L) or symptomatic', 'MgSO₄ 1–2 g IV over 15 min, then 4–8 g over 12–24 h; continue for 3–5 days'],
              ['Moderate, asymptomatic', `MgSO₄ 2–4 g IV at ≤${MG.nonUrgentMaxGPerHour} g/h, or oral`],
              ['Mild / chronic', 'Oral 240–1,000 mg elemental Mg/day divided (chloride, lactate, glycinate better absorbed than oxide); amiloride reduces renal loss'],
            ],
            refs: ['agus1999'],
          },
          {
            kind: 'list',
            items: [
              `**Conversions:** 1 g MgSO₄·7H₂O = ${MG.perGram.mmol} mmol = ${MG.perGram.meq} mEq = ${MG.perGram.mgElemental} mg elemental Mg.`,
              '**Slow is better:** a rapid rise in serum Mg activates the TAL CaSR and up to half of a bolus is lost in urine.',
              `**Kidney failure:** reduce dose ~50% when eGFR <${MG.renalReduceBelowEgfr}; monitor Mg, reflexes and respiration.`,
              '**Recheck** ≥6–12 h after an infusion; an immediate post-infusion level overestimates repletion.',
            ],
          },
          {
            kind: 'callout',
            tone: 'update',
            title: 'Magnesium in cardiac arrest',
            text: 'Routine magnesium in cardiac arrest does not improve outcomes and is not recommended (AHA 2025). Give it for torsades or known hypomagnesemia.',
            refs: ['aha2025'],
          },
          { kind: 'tool', toolId: 'mg-planner' },
          { kind: 'check', questionId: 'mg-q2' },
        ],
      },
    ],
    bottomLine: [
      'Normal serum Mg does not exclude depletion.',
      'FEMg >2% while hypomagnesemic = renal wasting.',
      'Replete Mg first in refractory hypokalemia and hypocalcemia.',
      'Torsades: 2 g IV. Otherwise infuse slowly; halve in severe CKD.',
    ],
    refs: ['agus1999', 'debaaij2015', 'huang2007', 'tang2016', 'aha2025'],
  },
  {
    id: 'hypermagnesemia',
    module: 'magnesium',
    title: 'Hypermagnesemia',
    summary: 'Almost always kidney impairment plus a Mg load. Reflexes disappear before breathing does — which makes them the bedside monitor.',
    minutes: 8,
    objectives: ['Relate Mg levels to clinical toxicity', 'Treat with calcium, saline/loop, or dialysis', 'Monitor obstetric MgSO₄ safely'],
    sections: [
      {
        id: 'causes',
        title: 'Causes',
        blocks: [
          {
            kind: 'list',
            items: [
              'Mg-containing laxatives, antacids and enemas (Epsom salts, Mg citrate bowel prep) in older adults or CKD; absorption increases with bowel inflammation, ileus or perforation.',
              'IV MgSO₄ — pre-eclampsia/eclampsia (therapeutic target 4.8–8.4 mg/dL, 2–3.5 mmol/L), asthma, over-repletion with reduced eGFR.',
              'Tumor lysis, rhabdomyolysis; mild elevations in FHH, lithium, adrenal insufficiency, hypothyroidism.',
            ],
            refs: ['acog2020'],
          },
        ],
      },
      {
        id: 'toxicity',
        title: 'Toxicity by level',
        blocks: [
          {
            kind: 'table',
            head: ['Mg (mmol/L)', 'mg/dL', 'Findings'],
            rows: [
              ['2–3', '4.8–7.2', 'Nausea, flushing, headache, lethargy, diminished reflexes'],
              ['3–5', '7.2–12', 'Somnolence, absent reflexes, hypotension, bradycardia, hypocalcemia, PR/QRS prolongation'],
              ['>5', '>12', 'Flaccid paralysis, respiratory arrest, complete heart block, cardiac arrest'],
            ],
            refs: ['acog2020'],
          },
          {
            kind: 'callout',
            tone: 'key',
            text: 'On obstetric MgSO₄, check patellar reflexes, respiratory rate (>12/min) and urine output (>30 mL/h) hourly; stop the infusion if reflexes vanish. Keep 10% calcium gluconate at the bedside.',
            refs: ['acog2020'],
          },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment',
        blocks: [
          {
            kind: 'steps',
            steps: [
              { title: 'Stop the source', text: 'All Mg-containing drugs, laxatives, enemas and infusions.' },
              { title: 'Antagonize', text: '10% calcium gluconate 10–20 mL IV over 5–10 min for bradycardia, hypotension, respiratory depression or areflexia — temporary.' },
              { title: 'Excrete', text: 'With preserved kidney function: isotonic saline + loop diuretic.' },
              { title: 'Dialysis', text: 'Severe toxicity with kidney failure, or no response. Ventilate and pace as needed while arranging it.' },
            ],
          },
          { kind: 'check', questionId: 'mg-q3' },
        ],
      },
    ],
    bottomLine: [
      'Hypermagnesemia = Mg load + reduced eGFR.',
      'Lost reflexes come before respiratory arrest — check them.',
      'Calcium antagonizes; dialysis removes.',
    ],
    refs: ['acog2020'],
  },
]
