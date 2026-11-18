import { NA_HYPER, NA_HYPO } from '@/lib/clinical/constants'
import type { Lesson } from '../types'

const L = NA_HYPO

export const sodiumLessons: Lesson[] = [
  {
    id: 'water-balance',
    module: 'sodium',
    title: 'Water balance, ADH and the brain',
    summary: 'How vasopressin and thirst defend tonicity, and how brain cells adapt — the physiology behind every correction limit.',
    minutes: 11,
    objectives: [
      'Describe osmotic and non-osmotic triggers of ADH',
      'Explain brain volume adaptation over 48 h',
      'Explain why chronic hyponatremia is dangerous to correct quickly',
    ],
    sections: [
      {
        id: 'adh',
        title: 'Vasopressin (ADH) and thirst',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Osmotic trigger:** hypothalamic osmoreceptors release ADH above ~280–285 mOsm/kg; a 1–2% rise in osmolality is enough. Thirst switches on a few mOsm/kg higher.',
              '**Non-osmotic triggers** override tonicity: low effective arterial volume (heart failure, cirrhosis, hypovolemia), nausea, pain, stress, hypoglycemia, hypoxia, and drugs (SSRIs, carbamazepine/oxcarbazepine, cyclophosphamide, vincristine, opioids, MDMA).',
              '**Action:** V2 receptors on collecting-duct principal cells → AQP2 channels inserted → water reabsorbed → concentrated urine.',
              '**Copeptin** is co-secreted with ADH and is stable in vitro — it is now the practical way to measure ADH activity.',
            ],
            refs: ['christcrain2019', 'fenske2018'],
          },
          {
            kind: 'callout',
            tone: 'key',
            text: 'Thirst is the main defense against hypernatremia; ADH suppression plus solute excretion is the main defense against hyponatremia. Hypernatremia therefore almost always means **no access to water or no thirst** (infants, intubated, frail, impaired consciousness).',
          },
        ],
      },
      {
        id: 'brain',
        title: 'Brain adaptation: why time matters',
        blocks: [
          {
            kind: 'p',
            text: 'When ECF becomes hypotonic, water enters brain cells. Within hours they export Na⁺, K⁺ and Cl⁻; over ~48 h they shed organic osmolytes (myo-inositol, glutamine, taurine) and cell volume returns toward normal. Reaccumulating osmolytes takes days. If serum Na is then raised quickly, the adapted cells shrink below normal — the substrate for **osmotic demyelination syndrome (ODS)**, typically 2–6 days after the rise (dysarthria, dysphagia, quadriparesis, "locked-in").',
            refs: ['sterns2015'],
          },
          { kind: 'figure', figureId: 'brain-adaptation', caption: 'Drop the sodium, let time pass, then correct — fast or slow — and watch brain cell volume.' },
          {
            kind: 'callout',
            tone: 'key',
            title: 'Two opposite dangers',
            items: [
              '**Acute (<48 h) hyponatremia**: brain has not adapted → cerebral edema, herniation. Treat aggressively.',
              '**Chronic (≥48 h or unknown)**: brain has adapted → symptoms milder for the level, but overly rapid correction risks ODS.',
              'If duration is unknown, treat as chronic — unless symptoms are severe, in which case treat the symptoms first.',
            ],
          },
          { kind: 'check', questionId: 'na-q1' },
        ],
      },
    ],
    bottomLine: [
      'ADH responds to tonicity and, more powerfully, to non-osmotic stimuli.',
      'Brain cells adapt over ~48 h; they cannot re-adapt as fast as you can correct.',
      'Unknown duration = chronic for the purpose of limits.',
    ],
    refs: ['sterns2015', 'christcrain2019'],
  },
  {
    id: 'hyponatremia-diagnosis',
    module: 'sodium',
    title: 'Hyponatremia: diagnosis',
    summary: 'A four-question approach — tonicity, symptoms/acuity, urine osmolality, urine sodium — that sorts almost every case.',
    minutes: 16,
    objectives: [
      'Exclude pseudo- and hypertonic hyponatremia',
      'Use urine osmolality and urine Na to classify hypotonic hyponatremia',
      'Apply current SIADH criteria and recognize its mimics',
      'Identify thiazide, low-solute and exercise-associated hyponatremia',
    ],
    sections: [
      {
        id: 'step1',
        title: '1 · Is it truly hypotonic?',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Hypertonic (Posm >295):** hyperglycemia, mannitol. Correct Na for glucose: add **2.4 mmol/L per 100 mg/dL** above 100 (Hillier; the classic 1.6 underestimates at high glucose).',
              '**Isotonic (pseudohyponatremia):** severe hypertriglyceridemia or paraproteinemia measured by indirect ISE (main lab analyzers dilute the sample). A blood-gas analyzer (direct ISE) gives the true value.',
              '**Hypotonic (Posm <275):** true water excess — the rest of this lesson.',
            ],
            refs: ['hillier1999', 'spasovski2014'],
          },
          {
            kind: 'callout',
            tone: 'pitfall',
            text: 'Uremia raises measured osmolality but urea is ineffective: a dialysis patient with Na 125 and Posm 290 is still functionally hypotonic.',
          },
        ],
      },
      {
        id: 'step2',
        title: '2 · How sick, and how fast?',
        blocks: [
          {
            kind: 'table',
            head: ['Symptom severity', 'Features'],
            rows: [
              ['Severe', 'Vomiting, seizures, obtundation (GCS ≤8), cardiorespiratory distress, coma'],
              ['Moderately severe', 'Nausea without vomiting, confusion, headache'],
              ['Mild / none', 'Inattention, gait instability, falls — not truly "asymptomatic": chronic mild hyponatremia increases falls and fractures'],
            ],
            refs: ['spasovski2014'],
          },
          {
            kind: 'callout',
            tone: 'pearl',
            text: 'Severity is graded by symptoms, not by the number. A Na of 124 that fell over 12 h after a marathon can kill; a Na of 118 that drifted down over months may cause only unsteadiness.',
          },
        ],
      },
      {
        id: 'step3',
        title: '3 · Urine osmolality: is ADH acting?',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Uosm <100 mOsm/kg** → ADH suppressed: primary polydipsia, low solute intake ("beer potomania", "tea and toast").',
              '**Uosm ≥100 mOsm/kg** → ADH is acting: go to urine Na.',
            ],
          },
        ],
      },
      {
        id: 'step4',
        title: '4 · Urine sodium: what does the kidney think of the circulation?',
        blocks: [
          {
            kind: 'table',
            head: ['Urine Na', 'Volume', 'Think'],
            rows: [
              ['≤30 mmol/L', 'Low ECF', 'Vomiting/diarrhea, third spacing, remote diuretics'],
              ['≤30 mmol/L', 'High ECF (edema)', 'Heart failure, cirrhosis, nephrotic syndrome'],
              ['>30 mmol/L', 'Low ECF', 'Diuretics, primary adrenal insufficiency, salt-wasting nephropathy, cerebral salt wasting (rare)'],
              ['>30 mmol/L', 'Normal ECF', 'SIADH, secondary adrenal insufficiency, severe hypothyroidism'],
            ],
            caption: 'European guideline threshold of 30 mmol/L (older texts use 20)',
            refs: ['spasovski2014', 'verbalis2013'],
          },
          { kind: 'tool', toolId: 'na-workup', caption: 'Work a case through the four steps.' },
        ],
      },
      {
        id: 'siadh',
        title: 'SIADH (SIAD): criteria and mimics',
        blocks: [
          {
            kind: 'steps',
            title: 'Essential criteria',
            steps: [
              { title: 'Hypotonic', text: 'Effective Posm <275 mOsm/kg' },
              { title: 'Concentrated urine', text: 'Uosm >100 mOsm/kg' },
              { title: 'Euvolemic', text: 'No clinical hypo- or hypervolemia' },
              { title: 'Urine Na >30 mmol/L', text: 'On normal salt and water intake' },
              { title: 'Exclusions', text: 'No recent diuretics; normal thyroid and adrenal (cortisol) function; no advanced CKD' },
            ],
            refs: ['spasovski2014'],
          },
          {
            kind: 'list',
            items: [
              '**Supportive:** serum urate <4 mg/dL (240 µmol/L), FEurate >12%, BUN <10 mg/dL, failure to correct with 0.9% saline. FEurate stays informative in patients taking diuretics.',
              '**Causes:** drugs (SSRIs, SNRIs, carbamazepine, oxcarbazepine, cyclophosphamide, vincristine, platinum, MDMA, desmopressin), CNS (meningitis, SAH, stroke, trauma), pulmonary (pneumonia, TB, ventilation), malignancy (small-cell lung cancer, head and neck), post-operative pain and nausea, HIV.',
            ],
            refs: ['fenske2008', 'verbalis2013'],
          },
          {
            kind: 'callout',
            tone: 'danger',
            title: 'Never label SIADH before checking cortisol',
            text: 'Secondary (pituitary) adrenal insufficiency looks exactly like SIADH — euvolemic, concentrated urine, high urine Na, normal K. It is fatal if missed and corrects (sometimes too fast) with hydrocortisone.',
          },
          {
            kind: 'callout',
            tone: 'pitfall',
            title: 'Cerebral salt wasting is a diagnosis of exclusion',
            text: 'After SAH, most hyponatremia is SIADH. True CSW requires documented volume depletion with renal Na loss. Fluid-restricting a patient with SAH risks vasospasm — when in doubt in neurosurgical patients, give isotonic or hypertonic saline rather than restricting.',
          },
          { kind: 'check', questionId: 'na-q2' },
        ],
      },
      {
        id: 'special',
        title: 'Patterns worth recognizing',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Thiazide-associated:** often days to weeks after starting, older women, low body mass, high water intake. Can recur on rechallenge — avoid thiazides thereafter. Loop diuretics rarely cause hyponatremia because they impair medullary concentration.',
              '**Low solute intake:** beer potomania, tea-and-toast. Uosm <100. Extremely high ODS risk because the stimulus (water excretion with solute) resolves abruptly once fed.',
              '**Exercise-associated:** overdrinking during endurance events + non-osmotic ADH. Severe symptoms → 100 mL 3% saline boluses on site; do not give hypotonic or isotonic fluid.',
              '**Primary polydipsia:** psychiatric illness, antipsychotic dry mouth. Uosm <100; corrects rapidly once intake stops — overcorrection risk.',
              '**Reset osmostat:** stable mild hyponatremia (125–130) with intact dilution after water load; pregnancy lowers the set-point by ~4–5 mmol/L physiologically.',
            ],
            refs: ['hewbutler2015', 'sterns2015'],
          },
          { kind: 'check', questionId: 'na-q3' },
        ],
      },
    ],
    bottomLine: [
      'Four questions: tonicity → symptoms/acuity → Uosm → urine Na.',
      'SIADH requires urine Na >30, Uosm >100, euvolemia, normal thyroid and cortisol, no diuretics.',
      'Always check cortisol. Suspect thiazides. Respect low-solute and polydipsia patients: they overcorrect.',
    ],
    refs: ['spasovski2014', 'verbalis2013', 'hoorn2017', 'fenske2008', 'hillier1999'],
  },
  {
    id: 'hyponatremia-treatment',
    module: 'sodium',
    title: 'Hyponatremia: treatment & safe correction',
    summary: 'Treat symptoms fast, respect the limits, anticipate the water diuresis that causes most overcorrection, and know the rescue.',
    minutes: 18,
    objectives: [
      `State the 24 h correction goals and limits (${L.goalMin24h}–${L.goalMax24h} goal; ≤${L.limit24h}, or ≤${L.limitHighRisk24h} if high risk)`,
      'Deliver bolus hypertonic saline for severe symptoms',
      'Predict and prevent overcorrection; re-lower if it happens',
      'Choose chronic therapy for SIADH, heart failure and cirrhosis',
    ],
    sections: [
      {
        id: 'limits',
        title: 'Goals and limits',
        blocks: [
          {
            kind: 'callout',
            tone: 'danger',
            title: 'Do-not-exceed limits (chronic hyponatremia)',
            items: [
              `Standard risk: **≤${L.limit24h} mmol/L in any 24 h** and ≤${L.limit48h} mmol/L in 48 h.`,
              `High ODS risk — Na ≤${L.highRiskNa}, hypokalemia, alcohol use disorder, malnutrition, advanced liver disease: **≤${L.limitHighRisk24h} mmol/L in any 24 h**.`,
              `Goal: a rise of ${L.goalMin24h}–${L.goalMax24h} mmol/L/24 h (${L.goalMin24h}–6 if high risk). A rise of ~${L.severeSymptomTarget} mmol/L usually reverses severe symptoms.`,
            ],
            refs: ['verbalis2013', 'spasovski2014'],
          },
          {
            kind: 'callout',
            tone: 'controversy',
            title: 'The evidence is shifting — the limits have not (yet)',
            text: 'A 2025 meta-analysis of 16 cohorts (11,811 patients) associated faster correction (≥8–10 mmol/L/24 h) with lower in-hospital mortality and shorter stays, without a significant increase in ODS. In 22,858 Toronto admissions, ODS occurred in 0.05% — and in 7 of 12 cases without rapid correction. These data are observational and confounded (sicker patients correct more slowly). No guideline has changed its limits; use them, but do not withhold effective treatment from symptomatic patients for fear of ODS.',
            refs: ['ayus2025', 'macmillan2023'],
          },
        ],
      },
      {
        id: 'severe',
        title: 'Severe or moderately severe symptoms',
        blocks: [
          {
            kind: 'steps',
            steps: [
              { title: 'Bolus', text: `3% NaCl ${L.bolusMl} mL IV over ${L.bolusMinutes} min (US panel) or 150 mL over 20 min (European). Peripheral line is acceptable.` },
              { title: 'Repeat', text: `Recheck Na ~20 min after each bolus; repeat up to ${L.bolusMaxDoses} doses until symptoms improve or Na has risen ~${L.severeSymptomTarget} mmol/L.` },
              { title: 'Stop', text: 'Once symptoms resolve, stop hypertonic saline and switch to cause-specific therapy. The remaining daily budget is small.' },
              { title: 'Moderate symptoms', text: 'A single bolus, then reassess; target a 24 h rise of ~5 mmol/L.' },
            ],
            refs: ['verbalis2013', 'spasovski2014'],
          },
          {
            kind: 'callout',
            tone: 'evidence',
            title: 'Bolus vs continuous infusion (SALSA, 2021)',
            text: 'In 178 symptomatic patients, rapid intermittent boluses reached target faster and needed less re-lowering therapy than slow continuous infusion, with no significant difference in overcorrection (17% vs 24%). Boluses are the preferred approach.',
            refs: ['baek2021'],
          },
          { kind: 'tool', toolId: 'na-planner', caption: 'Plan a correction: boluses, infusion rate, limits and a simulated 24 h course — including what a water diuresis does.' },
        ],
      },
      {
        id: 'overcorrection',
        title: 'Overcorrection: predict, prevent, rescue',
        blocks: [
          {
            kind: 'p',
            text: 'Most overcorrection is not caused by the saline: it is caused by a **water diuresis** once the ADH stimulus disappears — volume repleted in hypovolemia, thiazide stopped, cortisol given, nausea or pain controlled, desmopressin withdrawn, or a low-solute/polydipsic patient starts eating or stops drinking. Dilute urine at 300–500 mL/h can raise Na by 1–2 mmol/L per hour.',
            refs: ['sterns2015'],
          },
          {
            kind: 'formula',
            name: 'Adrogué–Madias — expected change per liter of infusate',
            expr: 'ΔNa = (infusate [Na + K] − serum Na) / (TBW + 1)',
            vars: [
              ['TBW', '0.6 × kg (men), 0.5 (women); 0.5 / 0.45 if ≥65'],
              ['infusate Na + K', '3% = 513; 0.9% = 154; LR = 134; 0.45% = 77; D5W = 0'],
            ],
            example: '70 kg man, Na 110, 1 L 3% NaCl: (513 − 110)/(42 + 1) = +9.4 mmol/L',
            note: 'The formula ignores urine output. It routinely underestimates the rise once aquaresis begins — trust the measured sodium over the formula.',
            refs: ['adrogue2000hypo'],
          },
          {
            kind: 'callout',
            tone: 'danger',
            title: 'If the limit is reached or exceeded',
            items: [
              'Stop all sodium-containing fluids and any K supplementation that is not essential.',
              'Give electrolyte-free water: D5W 10 mL/kg over 1 h (European), repeated as needed, with Na measured hourly.',
              'Give desmopressin 2 µg IV (repeat no more often than every 8 h) to stop the water diuresis.',
              'Aim to bring Na back below the limit. Re-lowering after early overcorrection is supported by animal data and case series.',
            ],
            refs: ['spasovski2014', 'sood2013'],
          },
          {
            kind: 'callout',
            tone: 'controversy',
            title: 'Proactive desmopressin "clamp"',
            text: 'For very high-risk patients some experts give desmopressin up front (1–2 µg every 6–8 h) to block any aquaresis and raise Na with controlled 3% saline. Observational results are mixed (favorable in Sood 2013; no reduction in overcorrection in MacMillan 2018). It requires strict fluid restriction and Na checks every 2–4 h.',
            refs: ['sood2013', 'macmillan2018'],
          },
          { kind: 'check', questionId: 'na-q4' },
        ],
      },
      {
        id: 'chronic',
        title: 'Chronic therapy by cause',
        blocks: [
          {
            kind: 'table',
            head: ['Cause', 'Therapy', 'Notes'],
            rows: [
              ['Hypovolemic', 'Isotonic crystalloid', 'Expect aquaresis once volume is restored — monitor urine output'],
              ['SIADH', 'Fluid restriction (use the Furst ratio), treat cause, stop drugs', '(UNa + UK)/PNa >1 → restriction alone will fail'],
              ['SIADH, restriction failing', 'Oral urea 15–60 g/day, or loop diuretic + NaCl tablets', 'Urea: recommended by the European guideline; unpalatable but effective'],
              ['SIADH, selected', 'Tolvaptan 7.5–15 mg daily (start in hospital)', 'Overcorrection risk (do not fluid-restrict in the first 24 h); avoid in liver disease; FDA limits use to ≤30 days for hyponatremia'],
              ['SIADH, emerging', 'SGLT2 inhibitor (empagliflozin 25 mg)', 'SAND RCT: added to restriction, raised Na more than restriction alone; off-label'],
              ['Heart failure', 'Loop diuretic, GDMT, fluid restriction', 'Hyponatremia marks severe disease; tolvaptan raises Na without proven outcome benefit'],
              ['Cirrhosis', 'Stop diuretics if Na <125, fluid restriction 1–1.5 L/day; albumin may help', 'Very high ODS risk — limit ≤8 mmol/L/24 h; avoid tolvaptan (hepatotoxicity)'],
              ['Adrenal insufficiency', 'Hydrocortisone', 'Rapid aquaresis follows — monitor closely'],
              ['Hypothyroidism', 'Levothyroxine', 'Causes hyponatremia only when severe (myxedema)'],
            ],
            refs: ['verbalis2013', 'spasovski2014', 'furst2000', 'refardt2020', 'biggins2021'],
          },
          {
            kind: 'callout',
            tone: 'pitfall',
            title: 'Normal saline in SIADH',
            text: 'If urine osmolality exceeds ~2× the infusate osmolality (e.g., Uosm 600 vs 0.9% NaCl at 308), the kidney excretes the Na in less water than was given — the remainder is retained and Na falls. Isotonic saline is a diagnostic test in hypovolemia, a mistake in SIADH.',
          },
          { kind: 'check', questionId: 'na-q5' },
        ],
      },
    ],
    bottomLine: [
      `Severe symptoms: ${L.bolusMl} mL 3% NaCl, repeat ×${L.bolusMaxDoses}, aim +${L.severeSymptomTarget}, then stop.`,
      `Limits: ≤${L.limit24h}/24 h (≤${L.limitHighRisk24h} if high risk); goal ${L.goalMin24h}–${L.goalMax24h}.`,
      'Overcorrection = aquaresis. Watch urine output; rescue with D5W + desmopressin.',
      'SIADH: restriction → urea or loop + salt → (tolvaptan, SGLT2i).',
    ],
    refs: ['verbalis2013', 'spasovski2014', 'baek2021', 'ayus2025', 'macmillan2023', 'sood2013', 'furst2000', 'refardt2020'],
  },
  {
    id: 'hypernatremia',
    module: 'sodium',
    title: 'Hypernatremia & AVP disorders',
    summary: 'A free-water problem: find why the patient could not drink or why the kidney is losing water, then replace the deficit plus ongoing losses.',
    minutes: 14,
    objectives: [
      'Classify hypernatremia by urine osmolality and volume',
      'Use current AVP deficiency / resistance nomenclature and copeptin tests',
      'Calculate and deliver a free-water plan with ongoing losses',
      'Interpret the evidence on correction speed',
    ],
    sections: [
      {
        id: 'causes',
        title: 'Causes',
        blocks: [
          {
            kind: 'table',
            head: ['Mechanism', 'Urine', 'Examples'],
            rows: [
              ['Inadequate intake (thirst/access)', 'Uosm >600–800, low volume', 'Frail elderly, infants, intubated, impaired consciousness'],
              ['Extrarenal water loss', 'Uosm high', 'Fever, burns, ventilation, osmotic diarrhea (lactulose), vomiting'],
              ['Renal: osmotic diuresis', 'Uosm ~300–600, high volume, high solute output (>1000 mOsm/day)', 'Hyperglycemia, urea (high-protein feeds, recovering AKI), mannitol'],
              ['Renal: AVP deficiency (central DI)', 'Uosm <300, polyuria; rises >50% with desmopressin', 'Pituitary surgery, trauma, tumors (craniopharyngioma), infiltrative, idiopathic'],
              ['Renal: AVP resistance (nephrogenic DI)', 'Uosm <300; little response to desmopressin', 'Lithium, hypercalcemia, hypokalemia, obstruction relief, genetic (AVPR2, AQP2)'],
              ['Sodium gain (rare)', 'Uosm high, urine Na high', '3% saline, 8.4% bicarbonate, salt ingestion, hyperaldosteronism (mild)'],
            ],
            refs: ['adrogue2000hyper', 'christcrain2019'],
          },
          {
            kind: 'callout',
            tone: 'update',
            title: 'New names (2022)',
            text: '"Diabetes insipidus" is being replaced by **arginine vasopressin deficiency (AVP-D)** and **AVP resistance (AVP-R)** to avoid dangerous confusion with diabetes mellitus. Primary polydipsia remains the third differential.',
            refs: ['arima2022'],
          },
          {
            kind: 'callout',
            tone: 'evidence',
            title: 'Copeptin beats the water deprivation test',
            text: 'Hypertonic saline-stimulated copeptin >4.9 pmol/L (at Na ≥150) distinguished primary polydipsia from AVP-D with 97% accuracy vs 77% for indirect water deprivation. Arginine-stimulated copeptin (cut-off 3.8 pmol/L at 60 min) is simpler and nearly as accurate. Baseline copeptin >21.4 pmol/L without prior thirsting indicates AVP-R.',
            refs: ['fenske2018', 'winzeler2019', 'christcrain2019'],
          },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment',
        blocks: [
          {
            kind: 'formula',
            name: 'Free water deficit',
            expr: 'Deficit (L) = TBW × (Na / 140 − 1)',
            example: '70 kg man, Na 160: 42 × (160/140 − 1) = 6.0 L',
            note: 'The deficit describes the hole; the plan must also replace ongoing losses (insensible ~1 L/day, more with fever, plus electrolyte-free water in urine or stool).',
            refs: ['adrogue2000hyper'],
          },
          {
            kind: 'steps',
            steps: [
              { title: 'Circulation first', text: 'Shock or marked hypovolemia: isotonic crystalloid until perfused, then free water.' },
              { title: 'Route', text: 'Enteral water (oral/NG) is ideal; IV D5W, 0.2% or 0.45% NaCl otherwise. Fluids with Na+K ≥ serum Na cannot lower it.' },
              { title: 'Rate', text: `Chronic or unknown duration: ≈${NA_HYPER.chronicTarget24h} mmol/L per 24 h (≈${NA_HYPER.chronicMaxRatePerHour} mmol/L/h). Documented acute (<48 h): ≈${NA_HYPER.acuteMaxRatePerHour} mmol/L/h toward 145.` },
              { title: 'Monitor', text: 'Na every 4–6 h (1–2 h if acute or polyuric); glucose if using D5W; urine volume and osmolality.' },
              { title: 'Fix the cause', text: 'AVP-D: desmopressin (0.1–0.2 mg PO or 1–2 µg IV/SC; titrate). AVP-R: remove the cause (lithium → amiloride; correct Ca/K), low-solute diet, thiazide. Osmotic diuresis: control glucose, reduce urea load.' },
            ],
          },
          { kind: 'tool', toolId: 'hyperna-planner' },
          {
            kind: 'callout',
            tone: 'controversy',
            title: 'Is slow correction necessary in adults?',
            text: 'The 0.5 mmol/L/h ceiling comes from pediatric reports of cerebral edema. In adults, observational data (4,265 patients with severe hypernatremia; ICU cohorts) associate faster correction with lower mortality and no detectable neurologic harm. Slow correction itself is not protective — under-treatment is the commoner error. Children and documented chronic cases still warrant care.',
            refs: ['feigin2023', 'chauhan2019'],
          },
          {
            kind: 'callout',
            tone: 'pearl',
            title: 'After pituitary surgery',
            text: 'Watch for the triphasic response: AVP-D (days 1–5) → SIADH from release of stored ADH (days 6–11) → permanent AVP-D. Fixed desmopressin dosing during phase 2 causes severe hyponatremia.',
          },
          { kind: 'check', questionId: 'na-q6' },
        ],
      },
    ],
    bottomLine: [
      'Hypernatremia = no water access/thirst or renal water loss.',
      'Uosm <300 with polyuria → AVP-D or AVP-R; desmopressin response separates them; copeptin tests outperform water deprivation.',
      `Replace deficit + ongoing losses; ≈${NA_HYPER.chronicTarget24h} mmol/L/24 h if chronic, faster if acute.`,
    ],
    refs: ['adrogue2000hyper', 'christcrain2019', 'arima2022', 'fenske2018', 'winzeler2019', 'feigin2023', 'chauhan2019'],
  },
]
