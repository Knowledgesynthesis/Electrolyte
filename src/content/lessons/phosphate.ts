import type { Lesson } from '../types'

export const phosphateLessons: Lesson[] = [
  {
    id: 'phosphate',
    module: 'phosphate',
    title: 'Phosphate: refeeding, IV iron, CKD',
    summary: 'Hypophosphatemia hides in refeeding, DKA, alcohol and IV iron; hyperphosphatemia drives CKD bone disease and tumor-lysis kidney injury.',
    minutes: 12,
    objectives: [
      'List the mechanisms and modern causes of hypophosphatemia',
      'Recognize and prevent refeeding syndrome',
      'Dose oral and IV phosphate by severity',
      'Manage acute and chronic hyperphosphatemia',
    ],
    sections: [
      {
        id: 'physiology',
        title: 'Physiology in brief',
        blocks: [
          {
            kind: 'list',
            items: [
              'Adult reference ≈2.5–4.5 mg/dL (0.81–1.45 mmol/L); higher in children. ~85% in bone, ~14% intracellular (ATP, 2,3-DPG), ~1% extracellular.',
              '~80% of filtered phosphate is reabsorbed in the proximal tubule by NaPi-IIa/IIc; **PTH and FGF23 both reduce it** (phosphaturia). Calcitriol increases gut absorption.',
              'Phosphate is needed for ATP and 2,3-DPG — severe deficiency causes weakness, respiratory failure, failure to wean, rhabdomyolysis, hemolysis, impaired O₂ delivery and cardiac dysfunction.',
            ],
          },
        ],
      },
      {
        id: 'hypo',
        title: 'Hypophosphatemia',
        blocks: [
          {
            kind: 'table',
            head: ['Mechanism', 'Causes'],
            rows: [
              ['Shift into cells', 'Refeeding (insulin), DKA treatment, respiratory alkalosis (sepsis, alcohol withdrawal, salicylates), hungry bone syndrome'],
              ['Renal loss', 'Hyperparathyroidism, FGF23 excess (IV ferric carboxymaltose, tumor-induced osteomalacia, X-linked hypophosphatemia), Fanconi syndrome (tenofovir, ifosfamide, myeloma), osmotic diuresis'],
              ['Poor intake / GI loss', 'Alcohol, malnutrition, phosphate binders, chronic diarrhea'],
              ['Extracorporeal', 'Continuous kidney replacement therapy'],
            ],
            refs: ['felsenfeld2012'],
          },
          {
            kind: 'callout',
            tone: 'update',
            title: 'IV iron can cause severe, prolonged hypophosphatemia',
            text: 'Ferric carboxymaltose raises intact FGF23 → renal phosphate wasting and low calcitriol. In the PHOSPHARE RCTs, incident hypophosphatemia occurred in ~74% with ferric carboxymaltose vs ~8% with iron isomaltoside (ferric derisomaltose). Repeated dosing can cause osteomalacia and fractures.',
            refs: ['wolf2020'],
          },
          {
            kind: 'callout',
            tone: 'danger',
            title: 'Refeeding syndrome (ASPEN 2020)',
            items: [
              'At risk: BMI <16–18.5, little intake for >5–10 days, weight loss >10–15% in 3–6 months, low baseline K/PO₄/Mg, alcohol use disorder, anorexia nervosa, prolonged fasting.',
              'Start nutrition at 10–20 kcal/kg/day (100–150 g dextrose) and advance over 3–7 days; give thiamine 100 mg before feeding and daily for 5–7 days.',
              'Check K, PO₄ and Mg at baseline and every 12 h for 3 days in high-risk patients; replete before and during feeding.',
              'If PO₄, K or Mg falls sharply, slow or hold calories (e.g., halve) and replete.',
            ],
            refs: ['dasilva2020'],
          },
          {
            kind: 'table',
            caption: 'Repletion (adjust for kidney function; avoid IV phosphate when Ca is high)',
            head: ['Severity', 'Regimen'],
            rows: [
              ['Mild (2.0–2.5 mg/dL; 0.65–0.80 mmol/L)', 'Oral 1–2 g elemental phosphorus/day divided (≈30–60 mmol); diarrhea limits dose'],
              ['Moderate (1.0–1.9 mg/dL; 0.32–0.64 mmol/L)', 'Oral, or IV 0.16–0.32 mmol/kg over 4–6 h if unable to take orally'],
              ['Severe (<1.0 mg/dL; <0.32 mmol/L) or symptomatic', 'IV 0.32–0.64 mmol/kg over 6–12 h (max ~30–45 mmol per dose in practice); recheck 2–6 h after'],
            ],
            refs: ['felsenfeld2012'],
          },
          {
            kind: 'callout',
            tone: 'pitfall',
            text: 'IV potassium phosphate delivers ~4.4 mmol K per 3 mmol phosphate — count it, especially in kidney impairment. Use sodium phosphate when K is high.',
          },
          { kind: 'check', questionId: 'po4-q1' },
        ],
      },
      {
        id: 'hyper',
        title: 'Hyperphosphatemia',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Causes:** reduced GFR (most common), cell lysis (tumor lysis, rhabdomyolysis, hemolysis), phosphate loads (sodium phosphate enemas/bowel preps — acute phosphate nephropathy), hypoparathyroidism, vitamin D toxicity, bisphosphonates; pseudohyperphosphatemia with paraproteins, hyperlipidemia, hemolysis or liposomal amphotericin.',
              '**Acute danger** is secondary hypocalcemia (Ca–phosphate precipitation) and AKI. In tumor lysis: hydration, rasburicase for urate, avoid giving calcium unless symptomatic, early dialysis for severe/rising phosphate.',
              '**Chronic (CKD-MBD):** KDIGO 2017 advises lowering elevated phosphate toward normal with diet, binders (limit Ca-based binders), and dialysis; the Ca × PO₄ product is no longer used to guide therapy.',
            ],
            refs: ['cairo2004', 'kdigo2017'],
          },
        ],
      },
    ],
    bottomLine: [
      'Think phosphate in refeeding, DKA recovery, alcohol, ventilator weaning and after IV ferric carboxymaltose.',
      'Refeeding: start low, give thiamine, monitor K/PO₄/Mg every 12 h for 3 days.',
      'Hyperphosphatemia: kidney function, cell lysis, phosphate preps. Treat the cause; dialysis if severe.',
    ],
    refs: ['felsenfeld2012', 'dasilva2020', 'wolf2020', 'cairo2004', 'kdigo2017'],
  },
]
