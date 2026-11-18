import { AB, REF } from '@/lib/clinical/constants'
import type { Lesson } from '../types'

export const acidBaseLessons: Lesson[] = [
  {
    id: 'acid-base-approach',
    module: 'acidbase',
    title: 'A six-step approach to any blood gas',
    summary: 'pH → primary process → compensation → anion gap (albumin-corrected) → delta ratio → osmolal gap. Do it the same way every time.',
    minutes: 15,
    objectives: [
      'Identify the primary disorder and test whether compensation is appropriate',
      'Calculate and albumin-correct the anion gap',
      'Use the delta ratio to unmask hidden disorders',
    ],
    sections: [
      {
        id: 'steps',
        title: 'The steps',
        blocks: [
          {
            kind: 'steps',
            steps: [
              { title: '1 · Check consistency', text: '[H⁺] (nmol/L) = 24 × pCO₂ / HCO₃. At pH 7.40 [H⁺] = 40; each 0.1 pH change ≈ ×1.25. A mismatch means the values were not simultaneous or there is an error.' },
              { title: '2 · Acidemia or alkalemia?', text: 'pH <7.35 or >7.45. A normal pH with abnormal pCO₂ and HCO₃ means a mixed disorder — compensation never fully normalizes pH (chronic respiratory disorders can come close).' },
              { title: '3 · Primary process', text: 'Which change explains the pH: HCO₃ (metabolic) or pCO₂ (respiratory)?' },
              { title: '4 · Compensation', text: 'Use the rules below. Outside the expected range = a second primary disorder.' },
              { title: '5 · Anion gap', text: `AG = Na − (Cl + HCO₃). Normal ≈${REF.anionGap} ± 2 with modern analyzers (use your lab's). Add ${AB.agAlbuminFactor} for each 1 g/dL albumin below 4.` },
              { title: '6 · If AG high: Δ/Δ and osmolal gap', text: 'Δ/Δ = (AG − 10)/(24 − HCO₃). Osmolal gap >10 → toxic alcohols.' },
            ],
            refs: ['berend2014', 'kraut2007', 'figge1998'],
          },
        ],
      },
      {
        id: 'compensation',
        title: 'Compensation rules',
        blocks: [
          {
            kind: 'table',
            head: ['Primary disorder', 'Expected compensation'],
            rows: [
              ['Metabolic acidosis', `pCO₂ = ${AB.winters.slope} × HCO₃ + ${AB.winters.intercept} ± ${AB.winters.range} (Winters)`],
              ['Metabolic alkalosis', `pCO₂ = ${AB.metAlk.slope} × HCO₃ + ${AB.metAlk.intercept} ± ${AB.metAlk.range} (rarely >55)`],
              ['Respiratory acidosis — acute', `HCO₃ ↑ ${AB.respAcidAcute * 10} per 10 mmHg pCO₂ above 40`],
              ['Respiratory acidosis — chronic', `HCO₃ ↑ ${AB.respAcidChronic * 10} per 10 mmHg`],
              ['Respiratory alkalosis — acute', `HCO₃ ↓ ${AB.respAlkAcute * 10} per 10 mmHg below 40`],
              ['Respiratory alkalosis — chronic', `HCO₃ ↓ ${AB.respAlkChronic * 10} per 10 mmHg`],
            ],
            refs: ['albert1967', 'berend2014'],
          },
          {
            kind: 'callout',
            tone: 'pearl',
            text: 'Quick check for metabolic acidosis: expected pCO₂ ≈ the last two digits of the pH (pH 7.25 → pCO₂ ~25). A "normal" pCO₂ of 40 in severe metabolic acidosis is respiratory failure.',
          },
          { kind: 'tool', toolId: 'acid-base', caption: 'Paste any gas — the analyzer shows each step.' },
          { kind: 'check', questionId: 'ab-q1' },
        ],
      },
      {
        id: 'gaps',
        title: 'Anion gap and delta ratio',
        blocks: [
          {
            kind: 'list',
            items: [
              'Albumin is the main unmeasured anion: hypoalbuminemia hides a high-AG acidosis.',
              'Low AG: hypoalbuminemia, paraproteins (IgG myeloma), lithium, bromide/iodide (spuriously high Cl).',
              'Δ/Δ <0.4 — hyperchloremic (normal-AG) acidosis; 0.4–0.8 — mixed high- and normal-AG; 0.8–2 — pure high-AG (lactate ~1.6, DKA ~1); >2 — concurrent metabolic alkalosis or prior chronic respiratory acidosis.',
            ],
            refs: ['kraut2007', 'rastegar2007'],
          },
          { kind: 'check', questionId: 'ab-q2' },
        ],
      },
    ],
    bottomLine: [
      'Same six steps, every gas.',
      'Winters: pCO₂ = 1.5 × HCO₃ + 8 ± 2.',
      'Always albumin-correct the AG; always calculate Δ/Δ when it is high.',
    ],
    refs: ['berend2014', 'kraut2007', 'figge1998', 'albert1967', 'rastegar2007'],
  },
  {
    id: 'metabolic-acidosis',
    module: 'acidbase',
    title: 'Metabolic acidosis',
    summary: 'High gap: something was added. Normal gap: bicarbonate was lost or the kidney cannot excrete acid. Bicarbonate therapy has narrow indications.',
    minutes: 15,
    objectives: [
      'Differentiate the high-AG acidoses and recognize euglycemic DKA',
      'Use the urine anion and osmolal gaps to classify normal-AG acidosis and RTA',
      'Apply evidence on bicarbonate therapy',
    ],
    sections: [
      {
        id: 'hagma',
        title: 'High anion gap (GOLDMARK)',
        blocks: [
          {
            kind: 'table',
            head: ['Cause', 'Clues'],
            rows: [
              ['Glycols (ethylene, propylene, diethylene)', 'Osmolal gap early, AG later; oxalate crystals, AKI (ethylene glycol); IV lorazepam/phenobarbital infusions (propylene)'],
              ['5-Oxoproline', 'Chronic acetaminophen with malnutrition, female sex, sepsis, CKD'],
              ['L-lactate', 'Shock, sepsis, seizures, metformin with AKI, β-agonists, linezolid, thiamine deficiency'],
              ['D-lactate', 'Short bowel / bariatric bypass after carbohydrate load; confusion; standard lactate normal'],
              ['Methanol', 'Visual symptoms, osmolal gap'],
              ['Aspirin (salicylates)', 'Respiratory alkalosis + HAGMA, tinnitus'],
              ['Renal failure', 'Usually eGFR <15–20 before the AG rises much'],
              ['Ketoacidosis', 'Diabetic (including euglycemic with SGLT2 inhibitors), alcoholic, starvation; measure β-hydroxybutyrate'],
            ],
            refs: ['kraut2007', 'berend2014'],
          },
          {
            kind: 'callout',
            tone: 'update',
            title: 'DKA definitions (2024 consensus)',
            text: 'DKA = glucose ≥200 mg/dL (11.1 mmol/L) **or** known diabetes, β-hydroxybutyrate ≥3.0 mmol/L, and pH <7.3 or HCO₃ <18. The glucose threshold fell from 250 so that euglycemic DKA (SGLT2 inhibitors, pregnancy, low intake) is not missed. Bicarbonate is not routinely recommended.',
            refs: ['umpierrez2024'],
          },
          { kind: 'check', questionId: 'ab-q3' },
        ],
      },
      {
        id: 'nagma',
        title: 'Normal anion gap',
        blocks: [
          {
            kind: 'p',
            text: 'Ask whether the kidney is excreting acid (as NH₄⁺) appropriately. Urine NH₄⁺ is rarely measured directly, so estimate it.',
          },
          {
            kind: 'formula',
            name: 'Urine anion gap and urine osmolal gap',
            expr: 'UAG = UNa + UK − UCl\nUOG = Uosm − [2(UNa + UK) + Uurea + Uglucose]   (mmol/L)',
            note: 'Negative UAG / UOG >150 → NH₄⁺ excretion is high → GI loss. Positive UAG / UOG <100 → low NH₄⁺ → distal RTA. UAG fails with ketonuria, other unmeasured anions (hippurate in toluene) or urine Na <20; the UOG remains valid.',
            refs: ['batlle1988', 'kraut2007'],
          },
          {
            kind: 'table',
            head: ['', 'Distal (type 1)', 'Proximal (type 2)', 'Type 4 (hypoaldosteronism)'],
            rows: [
              ['Defect', 'H⁺ secretion', 'HCO₃ reabsorption', 'Aldosterone deficiency/resistance → low NH₄⁺'],
              ['Serum K', 'Low', 'Low', 'High'],
              ['Urine pH', '>5.5', '<5.5 once HCO₃ falls; >5.5 with alkali', '<5.5'],
              ['Associations', 'Sjögren, lupus, amphotericin, lithium, stones/nephrocalcinosis', 'Fanconi (tenofovir, ifosfamide, myeloma), acetazolamide/topiramate', 'Diabetic nephropathy, NSAIDs, ACEi/ARB, trimethoprim, heparin, CNIs'],
            ],
          },
          { kind: 'tool', toolId: 'urine' },
        ],
      },
      {
        id: 'bicarb',
        title: 'Should I give bicarbonate?',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Normal-AG acidosis** (bicarbonate was lost): yes — replace it (oral in RTA/CKD; IV if severe).',
              '**Lactic acidosis/DKA**: not routinely. In BICAR-ICU (pH ≤7.20), bicarbonate did not improve the overall primary outcome but reduced mortality and dialysis in patients with moderate–severe AKI.',
              '**Hyperkalemia**: not routinely (ERC 2025).',
              '**Toxic exposures**: salicylates (urinary alkalinization) and sodium-channel blockers (TCA) are classic indications.',
              'Risks: hypernatremia, volume overload, ionized hypocalcemia, increased CO₂ needing ventilation.',
            ],
            refs: ['jaber2018', 'umpierrez2024', 'erc2025'],
          },
          { kind: 'check', questionId: 'ab-q4' },
        ],
      },
    ],
    bottomLine: [
      'High AG: GOLDMARK; check β-hydroxybutyrate, lactate, osmolal gap.',
      'Euglycemic DKA is DKA — the 2024 definition no longer needs high glucose if diabetes is known.',
      'Normal AG: UAG/UOG separates GI loss from RTA; K separates RTA types.',
    ],
    refs: ['kraut2007', 'berend2014', 'umpierrez2024', 'batlle1988', 'jaber2018'],
  },
  {
    id: 'alkalosis-respiratory',
    module: 'acidbase',
    title: 'Metabolic alkalosis & respiratory disorders',
    summary: 'Metabolic alkalosis needs a generator and a maintenance factor; urine chloride tells you which. Respiratory disorders follow ventilation.',
    minutes: 11,
    objectives: [
      'Classify metabolic alkalosis with urine chloride and blood pressure',
      'Explain why chloride, volume and K are needed to correct it',
      'Recognize mixed respiratory–metabolic disorders',
    ],
    sections: [
      {
        id: 'metalk',
        title: 'Metabolic alkalosis',
        blocks: [
          {
            kind: 'p',
            text: 'Generation (H⁺ loss from stomach or kidney, alkali gain, contraction) is not enough: healthy kidneys excrete excess HCO₃ rapidly. Alkalosis persists when **Cl depletion, volume depletion, hypokalemia or mineralocorticoid excess** keep the kidney reabsorbing HCO₃.',
            refs: ['seifter2014'],
          },
          {
            kind: 'table',
            head: ['Urine Cl', 'BP', 'Causes', 'Treatment'],
            rows: [
              ['<25 mmol/L', 'Normal/low', 'Vomiting, NG suction, remote diuretics, post-hypercapnia, chloride-losing diarrhea, cystic fibrosis', 'NaCl (and KCl) — "saline-responsive"'],
              ['>40 mmol/L', 'High', 'Primary aldosteronism, Cushing, Liddle, licorice/AME, renovascular', 'Treat the cause; MRA or amiloride'],
              ['>40 mmol/L', 'Normal/low', 'Current diuretics, Bartter, Gitelman, severe hypokalemia or hypomagnesemia', 'KCl, Mg; stop diuretic; acetazolamide if overloaded'],
            ],
            refs: ['seifter2014', 'blanchard2017'],
          },
          {
            kind: 'callout',
            tone: 'pitfall',
            text: 'Urine Na is misleading in vomiting: bicarbonaturia drags Na into the urine despite volume depletion. Urine Cl stays low — use it.',
          },
          { kind: 'check', questionId: 'ab-q5' },
        ],
      },
      {
        id: 'resp',
        title: 'Respiratory disorders',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Respiratory acidosis:** CNS depression (opioids, sedatives), neuromuscular weakness, chest wall disease, obesity hypoventilation, COPD/asthma. Chronic compensation takes 3–5 days.',
              '**Post-hypercapnic alkalosis:** rapid lowering of chronic pCO₂ on the ventilator leaves the elevated HCO₃ unopposed — ventilate toward the patient\'s baseline pCO₂.',
              '**Respiratory alkalosis:** hypoxemia, PE, sepsis, liver failure, salicylates, pain/anxiety, pregnancy (pCO₂ ~30 is normal in pregnancy), overventilation. Acute alkalosis lowers ionized Ca and shifts K and phosphate into cells.',
            ],
            refs: ['berend2014'],
          },
        ],
      },
    ],
    bottomLine: [
      'Metabolic alkalosis persists because of Cl, volume, K or mineralocorticoid — fix those.',
      'Urine Cl <25 = saline-responsive.',
      'In pregnancy, pCO₂ ~30 with HCO₃ ~20 is normal.',
    ],
    refs: ['seifter2014', 'berend2014', 'blanchard2017'],
  },
]
