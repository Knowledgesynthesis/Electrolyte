import { CA } from '@/lib/clinical/constants'
import type { Lesson } from '../types'

export const calciumLessons: Lesson[] = [
  {
    id: 'calcium-physiology',
    module: 'calcium',
    title: 'Calcium: PTH, vitamin D, FGF23',
    summary: 'Ionized calcium is the regulated variable. PTH defends it within minutes, calcitriol over days; albumin and pH change only what you measure.',
    minutes: 12,
    objectives: [
      'Describe the actions of PTH, calcitriol and FGF23 on Ca and PO₄',
      'Explain why albumin-adjusted calcium is unreliable',
      'Predict ionized Ca changes with pH and citrate',
    ],
    sections: [
      {
        id: 'fractions',
        title: 'What you measure',
        blocks: [
          {
            kind: 'p',
            text: '99% of body Ca is in bone. Plasma total Ca (8.5–10.5 mg/dL; 2.12–2.62 mmol/L) is ~45–50% ionized (the active form, 1.12–1.32 mmol/L), ~40–45% albumin-bound and ~10% complexed (citrate, phosphate, bicarbonate).',
          },
          {
            kind: 'list',
            items: [
              '**Albumin** changes total, not ionized, Ca.',
              '**Alkalosis** increases albumin binding → ionized Ca falls (hyperventilation tetany). Acidosis does the opposite.',
              '**Citrate** (massive transfusion, citrate CRRT, plasmapheresis) chelates ionized Ca without changing total Ca.',
            ],
          },
          {
            kind: 'formula',
            name: 'Albumin-adjusted ("corrected") calcium — Payne',
            expr: 'Ca_adj (mg/dL) = Ca + 0.8 × (4.0 − albumin g/dL)\nCa_adj (mmol/L) = Ca + 0.02 × (40 − albumin g/L)',
            note: 'Agreement with ionized Ca is poor (≈55–65% concordance), worst in CKD, critical illness and low albumin. Unadjusted total Ca often classifies better. When the decision matters — ICU, CKD, borderline values, transfusion — measure ionized Ca.',
            refs: ['payne1973', 'kenny2021'],
          },
          { kind: 'tool', toolId: 'ca-adjust' },
        ],
      },
      {
        id: 'hormones',
        title: 'The three hormones',
        blocks: [
          {
            kind: 'table',
            head: ['', 'PTH', 'Calcitriol (1,25-(OH)₂D)', 'FGF23'],
            rows: [
              ['Stimulus', '↓ ionized Ca (CaSR), ↑ PO₄', 'PTH, ↓ PO₄', '↑ PO₄, ↑ calcitriol'],
              ['Bone', '↑ resorption (via RANKL)', '↑ resorption; enables mineralization', '—'],
              ['Kidney', '↑ Ca reabsorption (DCT), ↓ PO₄ reabsorption, ↑ 1α-hydroxylase', '↑ Ca and PO₄ reabsorption', '↓ PO₄ reabsorption, ↓ 1α-hydroxylase'],
              ['Gut', 'Indirect via calcitriol', '↑ Ca and PO₄ absorption', 'Indirect (↓ calcitriol)'],
              ['Net', '↑ Ca, ↓ PO₄', '↑ Ca, ↑ PO₄', '↓ PO₄'],
            ],
          },
          {
            kind: 'list',
            items: [
              '**Magnesium** is required for PTH secretion and action: severe hypomagnesemia (<0.5 mmol/L) causes functional hypoparathyroidism; mild hypermagnesemia can also suppress PTH.',
              '**CaSR** in the parathyroid sets PTH; in the TAL it reduces Ca and Mg reabsorption when Ca is high — the reason hypercalcemia causes polyuria and Mg wasting.',
              '**Calcitonin** has little physiologic role in adults; it is a tumor marker (medullary thyroid cancer) and a short-lived drug.',
              '**25-OH vitamin D** reflects stores; **1,25-(OH)₂D** reflects activity (high in granulomatous disease and some lymphomas).',
            ],
          },
          { kind: 'check', questionId: 'ca-q1' },
        ],
      },
    ],
    bottomLine: [
      'Ionized Ca is what matters; measure it when it matters.',
      'PTH: ↑Ca ↓PO₄. Calcitriol: ↑Ca ↑PO₄. FGF23: ↓PO₄.',
      'No PTH without Mg.',
    ],
    refs: ['payne1973', 'kenny2021'],
  },
  {
    id: 'hypocalcemia',
    module: 'calcium',
    title: 'Hypocalcemia',
    summary: 'Confirm with ionized Ca, check Mg, then let PTH split the differential. Treat symptoms with IV calcium — and know that gluconate and chloride are not interchangeable by volume.',
    minutes: 15,
    objectives: [
      'Separate low-PTH from high-PTH hypocalcemia',
      'Dose IV calcium gluconate and chloride correctly',
      'Manage post-surgical hypoparathyroidism and hungry bone syndrome',
      'Recognize denosumab-associated hypocalcemia in CKD',
    ],
    sections: [
      {
        id: 'features',
        title: 'Features',
        blocks: [
          {
            kind: 'list',
            items: [
              'Perioral and acral paresthesia, cramps, carpopedal spasm, laryngospasm, bronchospasm, seizures.',
              'Trousseau sign (cuff above systolic for 3 min) is more specific than Chvostek (positive in a minority of healthy people).',
              'QT prolongation (long ST segment), heart failure, hypotension refractory to pressors.',
              'Chronic: basal ganglia calcification, cataracts, dental and skin changes.',
            ],
          },
        ],
      },
      {
        id: 'ddx',
        title: 'PTH-guided differential',
        blocks: [
          {
            kind: 'table',
            head: ['PTH', 'Causes', 'Phosphate'],
            rows: [
              ['Low / inappropriately normal', 'Post-surgical hypoparathyroidism (most common; thyroidectomy/parathyroidectomy), autoimmune (APS-1), genetic (22q11, activating CASR — ADH1), infiltrative, radiation, **severe hypomagnesemia**', 'High'],
              ['High', 'Vitamin D deficiency or resistance, CKD, PTH resistance (pseudohypoparathyroidism), hungry bone syndrome', 'Low (vit D), high (CKD, PHP)'],
              ['Variable', 'Pancreatitis (saponification), sepsis/critical illness, rhabdomyolysis, tumor lysis, massive transfusion (citrate), foscarnet, bisphosphonates, denosumab, cinacalcet, phosphate enemas', '—'],
            ],
            refs: ['shoback2008'],
          },
          {
            kind: 'callout',
            tone: 'danger',
            title: 'Denosumab in advanced CKD',
            text: 'In January 2024 the FDA added a boxed warning: severe, sometimes fatal hypocalcemia in patients with advanced CKD/dialysis, most often 2–10 weeks after injection. Assess CKD-MBD, correct Ca and vitamin D first, and monitor Ca closely after each dose.',
            refs: ['fda2024dmab'],
          },
          { kind: 'check', questionId: 'ca-q2' },
        ],
      },
      {
        id: 'acute',
        title: 'Acute treatment',
        blocks: [
          {
            kind: 'callout',
            tone: 'danger',
            title: 'Indications for IV calcium',
            text: `Symptoms (tetany, seizures, laryngospasm, arrhythmia, QT prolongation) or adjusted Ca <${CA.ivThresholdMmol} mmol/L (≈7.6 mg/dL) / ionized Ca <0.8–0.9 mmol/L even if asymptomatic.`,
            refs: ['turner2016'],
          },
          {
            kind: 'steps',
            steps: [
              { title: 'Bolus', text: '10% calcium gluconate 10–20 mL in 50–100 mL D5W or saline over 10 min with ECG monitoring; repeat until asymptomatic.' },
              { title: 'Infusion', text: `100 mL 10% calcium gluconate (930 mg elemental) in 1 L saline or D5W at 50–100 mL/h ≈ ${CA.infusionMgPerKgPerHour.low}–${CA.infusionMgPerKgPerHour.high} mg/kg/h elemental; titrate to ionized Ca every 4–6 h.` },
              { title: 'Magnesium', text: 'If Mg is low, give MgSO₄ — the Ca will not hold otherwise.' },
              { title: 'Transition', text: 'Oral Ca (1–3 g elemental/day) + calcitriol (0.25–1 µg/day) when the cause is hypoparathyroidism; vitamin D repletion when deficient.' },
            ],
            refs: ['turner2016'],
          },
          {
            kind: 'table',
            caption: 'Elemental calcium per 10 mL of 10% solution',
            head: ['Product', 'Elemental Ca', 'Notes'],
            rows: [
              ['Calcium gluconate 10%', `${CA.gluconate10ml.mg} mg (${CA.gluconate10ml.mmol} mmol)`, 'Peripheral IV acceptable'],
              ['Calcium chloride 10%', `${CA.chloride10ml.mg} mg (${CA.chloride10ml.mmol} mmol)`, '≈3× gluconate; vesicant — central or large vein; cardiac arrest'],
            ],
          },
          { kind: 'tool', toolId: 'ca-iv' },
          {
            kind: 'callout',
            tone: 'pitfall',
            items: [
              'Do not infuse calcium with bicarbonate or phosphate in the same line (precipitates).',
              'Calcium chloride 10 mL ≠ calcium gluconate 10 mL: ordering by volume interchangeably is a three-fold dosing error.',
              'In hyperphosphatemia (tumor lysis), treat only symptomatic hypocalcemia — Ca–phosphate precipitation worsens AKI.',
            ],
          },
        ],
      },
      {
        id: 'chronic',
        title: 'Hypoparathyroidism & special situations',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Goals (2022 international guidelines):** serum Ca in the low-normal range or slightly below, free of symptoms, avoiding hypercalciuria, normal phosphate and Mg.',
              '**Conventional therapy:** oral Ca + active vitamin D (calcitriol or alfacalcidol); a thiazide reduces hypercalciuria.',
              '**PTH replacement:** palopegteriparatide (FDA-approved 2024) for patients not controlled on conventional therapy; recombinant PTH(1–84) is no longer manufactured.',
              '**Post-thyroidectomy:** PTH measured on the morning after surgery predicts hypocalcemia; give oral Ca ± calcitriol early if PTH is low.',
              '**Hungry bone syndrome** after parathyroidectomy for severe disease: profound, prolonged hypocalcemia with low PO₄ and Mg; may need grams of elemental Ca daily plus calcitriol.',
              '**Vitamin D deficiency:** replete (e.g., cholecalciferol 50,000 IU weekly × 8 weeks or 2,000–6,000 IU daily). The 2024 Endocrine Society guideline does not endorse routine screening or a target level for the general population — this does not apply to patients with hypocalcemia or bone disease.',
            ],
            refs: ['khan2022', 'fda2024palopeg', 'demay2024', 'shoback2008'],
          },
          { kind: 'check', questionId: 'ca-q3' },
        ],
      },
    ],
    bottomLine: [
      'Confirm with ionized Ca; check Mg and PTH.',
      'Symptoms or adjusted Ca <1.9 mmol/L → IV calcium gluconate, then infusion.',
      'Gluconate 10 mL ≈ 2.3 mmol; chloride 10 mL ≈ 6.8 mmol.',
      'Denosumab + advanced CKD = boxed warning for severe hypocalcemia.',
    ],
    refs: ['turner2016', 'khan2022', 'shoback2008', 'fda2024dmab', 'fda2024palopeg'],
  },
  {
    id: 'hypercalcemia',
    module: 'calcium',
    title: 'Hypercalcemia',
    summary: 'PTH separates the two big causes — primary hyperparathyroidism and malignancy. Treat severe cases with fluids plus an antiresorptive, not furosemide.',
    minutes: 16,
    objectives: [
      'Classify hypercalcemia as PTH-dependent or independent and work up each',
      'Distinguish PHPT from FHH',
      'Treat severe hypercalcemia according to the 2023 Endocrine Society guideline',
      'Apply 2022 surgical criteria for primary hyperparathyroidism',
    ],
    sections: [
      {
        id: 'features',
        title: 'Features',
        blocks: [
          {
            kind: 'list',
            items: [
              '"Stones, bones, groans, thrones and psychiatric overtones": nephrolithiasis, bone pain/fractures, constipation, nausea, polyuria (AVP resistance), fatigue, confusion, depression.',
              'Volume depletion is almost universal in severe hypercalcemia: polyuria + vomiting → lower GFR → less Ca excretion (a vicious cycle).',
              'ECG: short QT; bradyarrhythmias at very high levels.',
              'Severity: mild <12 mg/dL (<3.0 mmol/L), moderate 12–14 (3.0–3.5), severe >14 (>3.5). The rate of rise matters as much as the level.',
            ],
            refs: ['minisola2015'],
          },
        ],
      },
      {
        id: 'ddx',
        title: 'Differential',
        blocks: [
          {
            kind: 'table',
            head: ['PTH', 'Next test', 'Diagnosis'],
            rows: [
              ['High or inappropriately normal', 'Urine Ca/Cr clearance ratio', '>0.02: primary hyperparathyroidism (≈90% of outpatients); <0.01: FHH (CASR variants — do not operate); lithium; tertiary HPT in CKD'],
              ['Suppressed', 'PTHrP', 'Humoral hypercalcemia of malignancy (squamous, renal, bladder, breast, ovarian, HTLV-1 lymphoma)'],
              ['Suppressed', '1,25-(OH)₂D', 'Granulomatous disease (sarcoid, TB, fungal), lymphoma; CYP24A1 loss'],
              ['Suppressed', '25-OH D', 'Vitamin D intoxication (usually >150 ng/mL)'],
              ['Suppressed', 'SPEP/free light chains, imaging', 'Myeloma, osteolytic metastases (breast, lung)'],
              ['Suppressed', 'History', 'Milk-alkali (Ca carbonate + alkalosis + AKI), thiazides (unmask PHPT), vitamin A, immobilization, thyrotoxicosis, adrenal insufficiency, theophylline'],
            ],
            refs: ['minisola2015', 'bilezikian2022'],
          },
          { kind: 'check', questionId: 'ca-q4' },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment of severe or symptomatic hypercalcemia',
        blocks: [
          {
            kind: 'steps',
            steps: [
              { title: 'Volume', text: 'Isotonic saline (e.g., 200–300 mL/h initially) titrated to urine output ~100–150 mL/h; caution in heart failure and CKD. Stop thiazides, lithium, Ca/vitamin D supplements, sedatives.' },
              { title: 'Calcitonin (bridge)', text: '4 IU/kg SC/IM every 12 h (max 8 IU/kg every 6 h): acts in hours, lowers Ca ~1–2 mg/dL, tachyphylaxis within 48 h.' },
              { title: 'Antiresorptive', text: 'Denosumab 120 mg SC (suggested over bisphosphonate; usable in kidney failure but causes more hypocalcemia) or zoledronic acid 4 mg IV over ≥15 min (adjust/avoid in severe CKD). Effect in 2–4 days.' },
              { title: 'Glucocorticoids', text: 'Prednisone 40–60 mg/day for calcitriol-mediated disease (granulomatous, lymphoma) — first-line there.' },
              { title: 'Dialysis', text: 'Low-Ca dialysate for severe hypercalcemia with kidney failure or when saline cannot be given.' },
            ],
            refs: ['elhajj2023'],
          },
          {
            kind: 'callout',
            tone: 'evidence',
            title: 'Endocrine Society 2023 (hypercalcemia of malignancy)',
            items: [
              'Denosumab or IV bisphosphonate for all adults with HCM (strong); denosumab suggested over bisphosphonate (low certainty).',
              'Severe HCM (Ca >14 mg/dL): add calcitonin to the antiresorptive initially.',
              'Refractory/recurrent despite bisphosphonate: add or switch to denosumab.',
              'Calcitriol-producing tumors: glucocorticoids first. Parathyroid carcinoma: calcimimetic or antiresorptive.',
            ],
            refs: ['elhajj2023'],
          },
          {
            kind: 'callout',
            tone: 'update',
            title: 'Furosemide is not a standard treatment',
            text: 'Loop diuretics were routine because they increase calciuria, but the supporting data used massive doses with intensive fluid replacement; in practice they worsen volume depletion. Use only to treat volume overload after rehydration.',
            refs: ['legrand2008'],
          },
          { kind: 'check', questionId: 'ca-q5' },
        ],
      },
      {
        id: 'phpt',
        title: 'Primary hyperparathyroidism',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Surgery is indicated** if symptomatic, or if asymptomatic with any of: Ca >1 mg/dL (0.25 mmol/L) above the upper limit; T-score ≤−2.5 or vertebral fracture; eGFR <60; nephrolithiasis/nephrocalcinosis; 24 h urine Ca >250 mg (women) or >300 mg (men); age <50.',
              'Surgery is also reasonable for anyone without contraindications — it is the only cure.',
              'Non-surgical: cinacalcet lowers Ca (not bone loss); bisphosphonates or denosumab protect bone.',
              'Normocalcemic PHPT is diagnosed only after excluding secondary causes (vitamin D deficiency, CKD, thiazides, lithium, hypercalciuria).',
            ],
            refs: ['bilezikian2022'],
          },
        ],
      },
    ],
    bottomLine: [
      'High/normal PTH = PHPT (check urine Ca to exclude FHH). Low PTH = malignancy until proved otherwise.',
      'Severe: saline + calcitonin + denosumab or zoledronate. Steroids for calcitriol-mediated disease.',
      'No routine furosemide.',
    ],
    refs: ['elhajj2023', 'bilezikian2022', 'minisola2015', 'legrand2008'],
  },
]
