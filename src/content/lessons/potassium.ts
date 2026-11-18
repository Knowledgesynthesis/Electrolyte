import { HYPERK, K_IV } from '@/lib/clinical/constants'
import type { Lesson } from '../types'

export const potassiumLessons: Lesson[] = [
  {
    id: 'potassium-physiology',
    module: 'potassium',
    title: 'Potassium balance & membrane potential',
    summary: '98% of K is inside cells. Internal balance (shifts) handles minutes; the kidney handles days. ECG changes follow membrane physics.',
    minutes: 11,
    objectives: [
      'Name the hormones and conditions that shift K into and out of cells',
      'Explain why acid–base effects on K are smaller and more variable than taught',
      'Link resting membrane potential to the ECG and to weakness',
    ],
    sections: [
      {
        id: 'distribution',
        title: 'Distribution',
        blocks: [
          {
            kind: 'p',
            text: 'Total body K is ~50 mmol/kg (~3,500 mmol in 70 kg): ~140 mmol/L inside cells, ~4 mmol/L outside. Only ~2% is extracellular, so a meal containing 50 mmol of K would raise plasma K dangerously if it stayed in the ECF — insulin and catecholamines move it into cells within minutes while the kidney excretes it over hours.',
            refs: ['palmer2016'],
          },
          {
            kind: 'formula',
            name: 'Nernst potential for K',
            expr: 'E_K = −61 × log₁₀([K]in / [K]out) mV',
            example: '[K]in 140, [K]out 4 → E_K ≈ −94 mV. Raise [K]out to 7 → ≈ −79 mV (depolarized).',
            note: 'Resting membrane potential tracks E_K. Hyperkalemia depolarizes (inactivates Na channels → slowed conduction, wide QRS); hypokalemia hyperpolarizes and delays repolarization (U waves, ectopy).',
          },
        ],
      },
      {
        id: 'shifts',
        title: 'Shifts (internal balance)',
        blocks: [
          {
            kind: 'table',
            head: ['Into cells (↓ plasma K)', 'Out of cells (↑ plasma K)'],
            rows: [
              ['Insulin (Na⁺/K⁺-ATPase)', 'Insulin deficiency (DKA, HHS)'],
              ['β₂-agonists, catecholamines, stress', 'β-blockers (modest), exercise'],
              ['Metabolic alkalosis (small effect)', 'Mineral (non-AG) acidosis'],
              ['Refeeding, B12/folate therapy (new cells), G-CSF', 'Cell lysis: rhabdomyolysis, tumor lysis, hemolysis, GI bleed'],
              ['Hypothermia; theophylline, caffeine', 'Hyperosmolality (glucose, mannitol) — solvent drag'],
              ['Thyrotoxic / familial periodic paralysis', 'Succinylcholine (esp. burns, denervation), digoxin toxicity'],
            ],
            refs: ['sterns1981', 'palmer2016'],
          },
          {
            kind: 'callout',
            tone: 'pitfall',
            title: 'The "0.6 mmol/L per 0.1 pH" rule is unreliable',
            text: 'The original data showed a wide range (≈0.2–1.7 mmol/L per 0.1 pH) and the effect applies mainly to mineral acidosis. Organic acidoses (lactic, keto) cause little shift — the hyperkalemia of DKA comes from insulin deficiency and hyperosmolality. Respiratory changes have minimal effect. Do not "correct" a K value for pH.',
            refs: ['adrogue1981'],
          },
        ],
      },
      {
        id: 'renal',
        title: 'Renal excretion (external balance)',
        blocks: [
          {
            kind: 'p',
            text: 'Filtered K is mostly reabsorbed proximally and in the TAL; urinary K is determined by **secretion in the connecting tubule and collecting duct** through ROMK and BK channels, driven by ENaC-mediated Na reabsorption.',
          },
          {
            kind: 'list',
            items: [
              '**Aldosterone** — stimulated by angiotensin II and directly by hyperkalemia.',
              '**Distal Na delivery and flow** — diuretics, osmotic diuresis.',
              '**Lumen negativity** — non-reabsorbable anions (HCO₃⁻ after vomiting, ketoanions).',
              '**Intracellular Mg** — low Mg removes the block on ROMK.',
              '**The aldosterone paradox:** in hypovolemia aldosterone retains Na without wasting K (low flow); with high K intake it excretes K without retaining Na. The WNK kinases switch the DCT to make this possible.',
            ],
            refs: ['palmer2016', 'huang2007'],
          },
          {
            kind: 'callout',
            tone: 'update',
            title: 'Retire the TTKG',
            text: 'The transtubular K gradient assumed no solute reabsorption beyond the cortical collecting duct; its originators showed that urea recycling invalidates this and stopped using it. Use a **spot urine K/creatinine ratio**: in hypokalemia <1.5 mmol/mmol (≈13 mEq/g) indicates appropriate renal conservation; higher values indicate renal loss.',
            refs: ['kamel2011'],
          },
          { kind: 'check', questionId: 'k-q1' },
        ],
      },
    ],
    bottomLine: [
      'Shifts act in minutes (insulin, β₂, alkalosis); the kidney acts over hours.',
      'K secretion = aldosterone × distal flow × lumen negativity, unlocked by Mg.',
      'Use urine K/Cr, not TTKG. Do not "pH-correct" a potassium.',
    ],
    refs: ['palmer2016', 'sterns1981', 'adrogue1981', 'kamel2011'],
  },
  {
    id: 'hypokalemia',
    module: 'potassium',
    title: 'Hypokalemia',
    summary: 'Exclude shift, measure urine K, then let blood pressure and acid–base steer the differential. Replete safely — and always fix the magnesium.',
    minutes: 15,
    objectives: [
      'Build a differential using urine K/Cr, blood pressure and HCO₃',
      'Prescribe oral and IV potassium within safe limits',
      'Recognize periodic paralysis and the DKA insulin–K rule',
    ],
    sections: [
      {
        id: 'clinical',
        title: 'Clinical features',
        blocks: [
          {
            kind: 'list',
            items: [
              'Weakness (legs first), cramps, ileus, constipation; at <2.5 mmol/L paralysis, respiratory failure, rhabdomyolysis.',
              'ECG: T flattening, ST depression, U waves, apparent QT(U) prolongation; arrhythmias — especially with digoxin, ischemia, low Mg, QT-prolonging drugs.',
              'Chronic: polyuria (AVP resistance), glucose intolerance, hypokalemic nephropathy, increased ammoniagenesis (precipitates hepatic encephalopathy in cirrhosis).',
            ],
            refs: ['kardalas2018'],
          },
          { kind: 'tool', toolId: 'k-ecg', caption: 'Slide K down and watch T flatten and U emerge (schematic).' },
        ],
      },
      {
        id: 'approach',
        title: 'Diagnostic approach',
        blocks: [
          {
            kind: 'steps',
            steps: [
              { title: 'Shift?', text: 'Insulin, β₂-agonists, refeeding, alkalosis, periodic paralysis (thyrotoxic: Asian or Latino men, after carbohydrate load or rest after exercise; check TSH/free T4). Pseudohypokalemia: very high WBC with delayed processing.' },
              { title: 'Urine K/Cr', text: '<1.5 mmol/mmol (13 mEq/g) → GI loss (diarrhea, laxatives), poor intake, remote diuretics. ≥1.5 → renal loss.' },
              { title: 'Renal loss + hypertension', text: 'Measure renin and aldosterone: high aldo/low renin → primary aldosteronism; high both → renovascular, renin tumor, malignant HTN; low both → Liddle, apparent mineralocorticoid excess (licorice), Cushing, CAH.' },
              { title: 'Renal loss + normal BP', text: 'Metabolic alkalosis: vomiting (urine Cl <25), diuretics, Gitelman (hypocalciuria, low Mg), Bartter (hypercalciuria). Metabolic acidosis: distal/proximal RTA, DKA, amphotericin, toluene. Variable: low Mg, aminoglycosides, cisplatin.' },
            ],
            refs: ['kardalas2018', 'kamel2011', 'blanchard2017'],
          },
          {
            kind: 'callout',
            tone: 'update',
            title: 'Screen widely for primary aldosteronism',
            text: 'The 2025 Endocrine Society guideline suggests screening everyone with hypertension (aldosterone and renin) — it is far commoner than once thought, and hypokalemia is present in only a minority. Cardiology guidelines (AHA/ACC 2025, ESC 2024) still advise targeted screening; unprovoked or diuretic-induced hypokalemia with hypertension is an indication under every guideline.',
            refs: ['endo2025pa'],
          },
          { kind: 'check', questionId: 'k-q2' },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment',
        blocks: [
          {
            kind: 'table',
            head: ['Situation', 'Approach'],
            rows: [
              ['K 3.0–3.4, asymptomatic', 'Oral KCl 40–60 mmol/day divided; treat cause'],
              ['K 2.5–2.9 or symptoms', 'Oral KCl 60–100 mmol/day ± IV; monitor ECG if cardiac disease/digoxin'],
              ['K <2.5, ECG changes, paralysis, arrhythmia', `IV KCl ${K_IV.peripheralMaxPerHour} mmol/h peripheral; up to ${K_IV.centralMaxPerHour} mmol/h central (≤${K_IV.centralEmergencyMaxPerHour} mmol/h only for life-threatening cases with continuous ECG)`],
              ['Hypokalemia + metabolic acidosis (RTA, diarrhea)', 'K citrate or bicarbonate — correct K before alkali (alkali shifts K into cells)'],
              ['Hypokalemia + hypophosphatemia (DKA, refeeding)', 'Part of K as K phosphate'],
              ['Ongoing renal loss', 'Add amiloride or an MRA; treat aldosteronism'],
            ],
            refs: ['kardalas2018'],
          },
          {
            kind: 'list',
            items: [
              `**Scale:** 10 mmol raises K by ≈${K_IV.risePer10mmol} mmol/L if there is no shift or ongoing loss. A fall from 4 to 3 mmol/L implies a deficit of roughly 200–400 mmol.`,
              '**Dilute IV K in saline, not dextrose** — dextrose stimulates insulin and can lower K further.',
              `**Peripheral concentration** ≤${K_IV.peripheralMaxConcPer100ml} mmol per 100 mL; never as a push.`,
              '**Shift-related** hypokalemia (periodic paralysis): small doses only; rebound hyperkalemia is common. Propranolol treats thyrotoxic periodic paralysis.',
            ],
            refs: ['sterns1981', 'lin2005'],
          },
          {
            kind: 'callout',
            tone: 'danger',
            title: 'DKA: insulin can kill a hypokalemic patient',
            text: 'If K <3.5 mmol/L at presentation, give K (≈10–20 mmol/h) and **delay insulin** until K >3.5. Start K replacement once K falls below 5.0, aiming for 4–5 mmol/L (2024 ADA/EASD/JBDS consensus).',
            refs: ['umpierrez2024'],
          },
          {
            kind: 'callout',
            tone: 'key',
            text: 'Check and replete Mg in every refractory hypokalemia: Mg deficiency drives renal K wasting and the K will not stay up until Mg is corrected.',
            refs: ['huang2007'],
          },
          { kind: 'tool', toolId: 'hypok' },
          { kind: 'check', questionId: 'k-q3' },
        ],
      },
    ],
    bottomLine: [
      'Shift → urine K/Cr → BP & HCO₃ → renin/aldosterone.',
      `IV KCl ≤${K_IV.peripheralMaxPerHour} mmol/h peripherally, in saline; oral whenever possible.`,
      'Fix Mg. In DKA hold insulin until K ≥3.5.',
    ],
    refs: ['kardalas2018', 'kamel2011', 'umpierrez2024', 'endo2025pa', 'lin2005'],
  },
  {
    id: 'hyperkalemia',
    module: 'potassium',
    title: 'Hyperkalemia',
    summary: 'Confirm, protect the heart, shift, remove, monitor, prevent — and know that the ECG can be normal right up to the arrest.',
    minutes: 17,
    objectives: [
      'Exclude pseudohyperkalemia without delaying treatment',
      'Dose calcium, insulin–glucose and salbutamol correctly',
      'Choose a K-removal strategy and prevent rebound and hypoglycemia',
      'Manage chronic hyperkalemia without abandoning RAAS inhibitors',
    ],
    sections: [
      {
        id: 'causes',
        title: 'Causes',
        blocks: [
          {
            kind: 'table',
            head: ['Category', 'Examples'],
            rows: [
              ['Pseudohyperkalemia', 'Hemolysis, fist clenching/tight tourniquet, delayed processing or refrigeration, thrombocytosis, extreme leukocytosis (reverse pseudohyperkalemia with heparinized samples in CLL)'],
              ['Reduced excretion', 'AKI, CKD (usually eGFR <20–30 unless another hit), hypoaldosteronism (diabetic hyporeninemic — type 4 RTA; adrenal insufficiency; heparin)'],
              ['Drugs', 'ACEi/ARB/ARNI, MRAs, amiloride/triamterene, trimethoprim, pentamidine, NSAIDs, calcineurin inhibitors, heparin, β-blockers, digoxin toxicity, succinylcholine'],
              ['Shift / release', 'Insulin deficiency, hyperosmolality, mineral acidosis, rhabdomyolysis, tumor lysis, hemolysis, massive transfusion'],
              ['Intake', 'Salt substitutes (KCl), supplements — significant only with impaired excretion'],
            ],
            refs: ['clase2020', 'palmer2016'],
          },
        ],
      },
      {
        id: 'ecg',
        title: 'The ECG: useful when abnormal, falsely reassuring when normal',
        blocks: [
          {
            kind: 'p',
            text: 'Classic sequence: peaked narrow-based T → PR prolongation → P flattening/loss → QRS widening → sine wave → VF/asystole. Bradyarrhythmias, blocks and pseudo-STEMI also occur. But ECG changes are insensitive and correlate poorly with the K level; chronic CKD patients may show nothing at 7.5 while an acute rise to 6.5 causes arrest.',
            refs: ['montague2008'],
          },
          { kind: 'tool', toolId: 'k-ecg' },
          {
            kind: 'callout',
            tone: 'danger',
            text: 'Treat K ≥6.5 mmol/L as an emergency even with a normal ECG. Any hyperkalemic ECG change at any level needs IV calcium.',
            refs: ['ukka2023'],
          },
        ],
      },
      {
        id: 'emergency',
        title: 'Emergency treatment',
        blocks: [
          {
            kind: 'steps',
            steps: [
              { title: 'Protect (ECG changes)', text: '10% calcium gluconate 30 mL (6.8 mmol) over 10 min, or 10% calcium chloride 10 mL (6.8 mmol) into a large vein. Repeat if the ECG does not improve. Onset 1–3 min, lasts 30–60 min. Does not lower K.' },
              { title: 'Shift', text: `Regular insulin ${HYPERK.insulinUnits} units IV + ${HYPERK.dextroseGrams} g dextrose (omit dextrose if glucose ≥${HYPERK.skipDextroseGlucoseMgDl} mg/dL). Add nebulized salbutamol ${HYPERK.salbutamolMg} mg. Together they lower K ≈1–1.5 mmol/L within an hour.` },
              { title: 'Remove', text: 'Sodium zirconium cyclosilicate 10 g TID (onset ~1 h); loop diuretic if euvolemic/overloaded with urine output; dialysis for ESKD, oligo-anuria, ongoing release, or refractory K.' },
              { title: 'Monitor', text: 'K at 1, 2, 4, 6 and 24 h; glucose hourly for ≥6 h. The effect of insulin and salbutamol wanes at 4–6 h — rebound is the rule unless K has been removed.' },
            ],
            refs: ['ukka2023', 'erc2025'],
          },
          {
            kind: 'callout',
            tone: 'danger',
            title: 'Insulin-induced hypoglycemia',
            text: 'Occurs in roughly 1 in 5 patients, usually at 1–3 h, more with low baseline glucose (<126 mg/dL / 7 mmol/L), no diabetes, low weight and kidney failure. UKKA advises a follow-on infusion of 10% glucose 50 mL/h for 5 h when pre-treatment glucose is <7 mmol/L. Some centers use 5 units (or 0.1 U/kg); systematic review data suggest similar K-lowering with less hypoglycemia, but evidence is low-certainty.',
            refs: ['ukka2023', 'harel2016'],
          },
          {
            kind: 'callout',
            tone: 'update',
            title: 'What has been dropped',
            items: [
              '**Sodium bicarbonate** is not recommended routinely (ERC 2025, ILCOR): little K-lowering effect; reserve for severe metabolic acidosis.',
              '**Sodium polystyrene sulfonate / calcium resonium**: onset hours to days, unreliable, linked to colonic necrosis — no role acutely (UKKA).',
              '**"Stone heart" with digoxin**: not supported by modern data; calcium appears safe. Use digoxin-specific Fab for digoxin-induced hyperkalemia.',
              '**Routine calcium, bicarbonate or magnesium in cardiac arrest** — no benefit (AHA 2025). In suspected hyperkalemic arrest, ERC still advises IV calcium and insulin–glucose as targeted therapy, although human outcome evidence is limited.',
            ],
            refs: ['erc2025', 'ukka2023', 'levine2011', 'aha2025', 'sterns2010'],
          },
          { kind: 'tool', toolId: 'hyperk', caption: 'Build a protocol for your patient.' },
          { kind: 'check', questionId: 'k-q4' },
        ],
      },
      {
        id: 'chronic',
        title: 'Chronic hyperkalemia',
        blocks: [
          {
            kind: 'list',
            items: [
              'Hyperkalemia is the commonest reason RAAS inhibitors and MRAs are stopped in CKD and heart failure — and stopping them costs outcomes.',
              'Newer binders (patiromer, SZC) reliably lower K over days–weeks and enable RAASi continuation; outcome trials have not shown hard-endpoint benefit.',
              'Other levers: loop or thiazide diuretics, correct metabolic acidosis (oral bicarbonate in CKD), stop NSAIDs/trimethoprim, SGLT2 inhibitors (reduce hyperkalemia risk), targeted dietary advice rather than blanket fruit/vegetable restriction.',
            ],
            refs: ['clase2020', 'weir2015', 'packham2015'],
          },
          { kind: 'check', questionId: 'k-q5' },
        ],
      },
    ],
    bottomLine: [
      'ECG change at any K → calcium. K ≥6.5 → emergency even if the ECG is normal.',
      `Insulin ${HYPERK.insulinUnits} U + ${HYPERK.dextroseGrams} g glucose + salbutamol; check glucose hourly for 6 h.`,
      'Shift is temporary: remove K (SZC, diuretic, dialysis) and recheck at 1, 2, 4, 6, 24 h.',
      'No routine bicarbonate, no SPS acutely, calcium is fine with digoxin.',
    ],
    refs: ['ukka2023', 'erc2025', 'aha2025', 'montague2008', 'clase2020', 'harel2016', 'levine2011'],
  },
]
