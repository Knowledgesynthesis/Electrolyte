import type { Lesson } from '../types'

export const foundationsLessons: Lesson[] = [
  {
    id: 'fluid-compartments',
    module: 'foundations',
    title: 'Water, compartments & tonicity',
    summary: 'Where body water lives, why sodium sets its distribution, and the difference between osmolality and tonicity.',
    minutes: 12,
    objectives: [
      'Estimate total body water and its compartments for a given patient',
      'Distinguish effective from ineffective osmoles',
      'Predict where 1 L of any IV fluid distributes',
      'Convert between mmol/L, mEq/L and mg/dL without error',
    ],
    sections: [
      {
        id: 'compartments',
        title: 'The two-thirds / one-third rule',
        blocks: [
          {
            kind: 'p',
            text: 'Total body water (TBW) is ~60% of weight in young adult men and ~50% in women, falling ~10 percentage points in older adults and in obesity (fat holds little water). **Two-thirds is intracellular (ICF), one-third extracellular (ECF)**; of the ECF, ~¾ is interstitial and ~¼ plasma.',
            refs: ['adrogue2000hypo'],
          },
          {
            kind: 'table',
            caption: 'A 70 kg man (TBW 42 L)',
            head: ['Compartment', 'Volume', 'Main cation', 'Main anions'],
            rows: [
              ['Intracellular', '28 L', 'K⁺ ~140 mmol/L', 'Phosphates, proteins'],
              ['Interstitial', '10.5 L', 'Na⁺ ~140 mmol/L', 'Cl⁻, HCO₃⁻'],
              ['Plasma', '3.5 L', 'Na⁺ ~140 mmol/L', 'Cl⁻, HCO₃⁻, albumin'],
            ],
          },
          { kind: 'figure', figureId: 'fluid-distribution', caption: 'Choose a fluid and watch where 1 L ends up.' },
          {
            kind: 'callout',
            tone: 'key',
            title: 'Why this matters',
            text: 'Water crosses cell membranes freely; Na⁺ largely does not (the Na⁺/K⁺-ATPase pumps it out). So **ECF Na⁺ concentration sets cell volume everywhere — including in the brain.** Every sodium disorder is ultimately a disorder of cell size.',
          },
        ],
      },
      {
        id: 'osm-vs-tonicity',
        title: 'Osmolality vs tonicity',
        blocks: [
          {
            kind: 'p',
            text: '**Osmolality** counts all solute particles per kg water. **Tonicity** (effective osmolality) counts only solutes that cannot cross cell membranes and therefore move water. Urea and ethanol raise osmolality but not tonicity; Na⁺, glucose (without insulin) and mannitol raise both.',
          },
          {
            kind: 'formula',
            name: 'Calculated serum osmolality',
            expr: 'Posm = 2 × Na + glucose/18 + BUN/2.8   (mg/dL)\nPosm = 2 × Na + glucose + urea          (mmol/L)',
            vars: [
              ['2 × Na', 'Na⁺ plus its accompanying anions'],
              ['glucose/18', 'converts mg/dL to mmol/L'],
              ['BUN/2.8', 'converts urea nitrogen mg/dL to mmol/L'],
            ],
            example: 'Na 140, glucose 90 mg/dL, BUN 14 mg/dL → 280 + 5 + 5 = 290 mOsm/kg',
            note: 'Measured minus calculated = osmolal gap; >10 mOsm/kg suggests unmeasured osmoles (toxic alcohols, mannitol, ethanol).',
          },
          {
            kind: 'formula',
            name: 'Edelman equation — what serum Na actually measures',
            expr: 'Serum Na ≈ (exchangeable Na + exchangeable K) / TBW',
            note: 'Serum Na is a ratio. It rises with loss of water or gain of Na or K, and falls with water gain or loss of Na or K. This is why giving K raises Na, and why urine output changes Na.',
            refs: ['edelman1958'],
          },
          { kind: 'tool', toolId: 'osm', caption: 'Try it: osmolality, osmolal gap and glucose-corrected sodium.' },
          { kind: 'check', questionId: 'fnd-q1' },
        ],
      },
      {
        id: 'volume-vs-concentration',
        title: 'Volume is about sodium content; concentration is about water',
        blocks: [
          {
            kind: 'list',
            items: [
              '**ECF volume** is set by total body Na content — regulated by RAAS, natriuretic peptides and sympathetic tone.',
              '**Serum Na concentration** is set by water balance — regulated by vasopressin (ADH) and thirst.',
              'A patient can be Na-overloaded (edema) and hyponatremic (heart failure), or Na-depleted and hypernatremic (osmotic diuresis). Always assess the two separately.',
            ],
          },
          {
            kind: 'callout',
            tone: 'pitfall',
            title: 'Physical exam is unreliable for volume',
            text: 'Bedside estimates of volume status are often wrong in hyponatremia. Combine exam with urine Na, BUN/creatinine, uric acid and response to therapy rather than trusting skin turgor or mucous membranes.',
            refs: ['spasovski2014'],
          },
        ],
      },
      {
        id: 'units',
        title: 'Units without tears',
        blocks: [
          {
            kind: 'table',
            head: ['Analyte', 'Conventional → SI', 'Example'],
            rows: [
              ['Na, K, Cl, HCO₃', 'mEq/L = mmol/L (monovalent)', '140 mEq/L = 140 mmol/L'],
              ['Calcium', 'mg/dL × 0.25 = mmol/L', '10 mg/dL = 2.5 mmol/L'],
              ['Magnesium', 'mg/dL × 0.41 = mmol/L; mmol/L × 2 = mEq/L', '2.4 mg/dL = 1.0 mmol/L = 2.0 mEq/L'],
              ['Phosphate', 'mg/dL × 0.32 = mmol/L', '3.1 mg/dL = 1.0 mmol/L'],
              ['Glucose', 'mg/dL ÷ 18 = mmol/L', '180 mg/dL = 10 mmol/L'],
              ['BUN → urea', 'mg/dL × 0.357 = mmol/L', '28 mg/dL = 10 mmol/L'],
              ['Creatinine', 'mg/dL × 88.4 = µmol/L', '1.0 mg/dL = 88 µmol/L'],
            ],
          },
          {
            kind: 'callout',
            tone: 'danger',
            title: 'Divalent ions double',
            text: 'For Ca²⁺ and Mg²⁺, 1 mmol = 2 mEq. A Mg order written in mEq and dispensed in mmol is a two-fold error.',
          },
          { kind: 'tool', toolId: 'units' },
        ],
      },
    ],
    bottomLine: [
      'TBW ≈ 0.6 × weight (men), 0.5 (women); subtract ~0.1 for age ≥65.',
      'Na concentration reflects water balance; Na content reflects volume.',
      'Serum Na ≈ (Na + K exchangeable)/TBW — giving K raises Na; dilute urine raises Na.',
      'Only effective osmoles move water: urea does not.',
    ],
    refs: ['adrogue2000hypo', 'edelman1958', 'spasovski2014'],
  },
  {
    id: 'nephron',
    module: 'foundations',
    title: 'The nephron, segment by segment',
    summary: 'Where Na, K, Ca, Mg and water are handled — and where each diuretic acts. The map that explains half of all electrolyte disorders.',
    minutes: 14,
    objectives: [
      'Locate the transporter and percentage of filtered Na handled in each segment',
      'Explain why loops waste Ca and Mg but thiazides retain Ca',
      'Predict the electrolyte pattern of each diuretic and its genetic mimic',
    ],
    sections: [
      {
        id: 'map',
        title: 'Interactive map',
        blocks: [
          { kind: 'figure', figureId: 'nephron', caption: 'Tap a segment to see its transporters, what it handles, the drug that targets it and the disease that mimics that drug.' },
          {
            kind: 'p',
            text: 'Roughly 25,000 mmol of Na is filtered daily (180 L × 140 mmol/L) and >99% is reabsorbed. Small percentage changes in distal segments therefore produce large absolute effects.',
          },
        ],
      },
      {
        id: 'segments',
        title: 'What each segment does',
        blocks: [
          {
            kind: 'table',
            head: ['Segment', '% filtered Na', 'Key transporter', 'Also handles', 'Drug / genetic mimic'],
            rows: [
              ['Proximal tubule', '~65%', 'NHE3, SGLT2, NaPi-IIa', '~65% Ca, 10–25% Mg, ~80% PO₄, ~90% HCO₃, glucose, urate', 'SGLT2i, acetazolamide / Fanconi'],
              ['Thick ascending limb', '~25%', 'NKCC2 + ROMK', '~25% Ca and ~60% Mg (paracellular, lumen-positive voltage; claudin-16/19)', 'Loop diuretics / Bartter'],
              ['Distal convoluted tubule', '~5–8%', 'NCC; TRPM6 (Mg); TRPV5 (Ca, PTH-regulated)', 'Active Ca and Mg fine-tuning', 'Thiazides / Gitelman'],
              ['Collecting duct — principal cell', '~2–3%', 'ENaC; ROMK/BK; AQP2 (ADH)', 'K secretion; water reabsorption', 'Amiloride, MRAs / Liddle (gain), PHA-1 (loss)'],
              ['Collecting duct — intercalated cells', '—', 'H⁺-ATPase, pendrin', 'Acid secretion, HCO₃ secretion', '— / distal RTA'],
            ],
          },
          {
            kind: 'callout',
            tone: 'key',
            title: 'Why loops lose Ca and Mg while thiazides keep Ca',
            text: 'Divalent cations in the TAL move paracellularly, driven by the lumen-positive voltage that NKCC2 + ROMK generate. Block NKCC2 and the voltage collapses → calciuria and magnesiuria. Thiazides block NCC in the DCT; the cell hyperpolarizes and proximal reabsorption rises with mild volume contraction → **less urinary Ca** (used for hypercalciuric stones) but Mg is still lost (TRPM6 downregulation).',
            refs: ['debaaij2015'],
          },
        ],
      },
      {
        id: 'distal-k',
        title: 'Distal K secretion: the two-signal rule',
        blocks: [
          {
            kind: 'p',
            text: 'Principal cells secrete K when they have **both** aldosterone (more ENaC and Na⁺/K⁺-ATPase) **and** distal Na delivery with flow. Either alone is not enough — which is why hypovolemia (high aldosterone, low flow) does not cause big K losses, but a diuretic (flow) plus secondary hyperaldosteronism does.',
            refs: ['palmer2016'],
          },
          {
            kind: 'list',
            items: [
              'Non-reabsorbable anions in the lumen (HCO₃⁻ after vomiting, ketoanions, penicillins) increase lumen negativity → more K secretion.',
              'Low intracellular Mg²⁺ releases the Mg block on ROMK → K wasting.',
              'Trimethoprim and pentamidine block ENaC like amiloride → hyperkalemia.',
              'Calcineurin inhibitors activate NCC (via WNK/SPAK) → hyperkalemic hypertension, a drug-induced Gordon syndrome.',
            ],
            refs: ['huang2007', 'palmer2016'],
          },
          { kind: 'check', questionId: 'fnd-q2' },
        ],
      },
      {
        id: 'water',
        title: 'Water: the countercurrent and ADH',
        blocks: [
          {
            kind: 'p',
            text: 'The TAL is water-impermeable and makes tubular fluid dilute (~100 mOsm/kg) while building a hypertonic medulla. Without ADH the collecting duct stays impermeable and urine can fall to ~50 mOsm/kg; with ADH (V2 receptor → AQP2 insertion) it can reach ~1,200 mOsm/kg.',
          },
          {
            kind: 'callout',
            tone: 'pearl',
            title: 'Urine osmolality is a direct ADH readout',
            text: 'Uosm <100 mOsm/kg in a hyponatremic patient means ADH is suppressed (polydipsia, low solute). Uosm >100 means ADH is acting. In hypernatremia, Uosm <300 with polyuria means ADH is absent or ineffective.',
          },
          {
            kind: 'formula',
            name: 'Solute limits water excretion',
            expr: 'Max urine volume ≈ daily solute excreted (mOsm) ÷ minimum Uosm',
            example: 'A beer-only diet provides ~250 mOsm/day; at a minimum Uosm of 50 the patient can excrete only ~5 L — drinking 6 L causes hyponatremia even with ADH fully suppressed.',
          },
        ],
      },
    ],
    bottomLine: [
      'Loop = Bartter: hypokalemia, alkalosis, hypercalciuria, Mg loss.',
      'Thiazide = Gitelman: hypokalemia, alkalosis, hypocalciuria, hypomagnesemia — and hyponatremia.',
      'K secretion needs aldosterone and distal Na/flow together.',
      'Urine osmolality tells you what ADH is doing.',
    ],
    refs: ['palmer2016', 'debaaij2015', 'huang2007', 'blanchard2017'],
  },
  {
    id: 'iv-fluids',
    module: 'foundations',
    title: 'IV fluids: composition and choice',
    summary: 'What is in each bag, where it goes, and what the trials show about saline versus balanced crystalloids.',
    minutes: 9,
    objectives: ['Recall the Na, K, Cl and tonicity of common fluids', 'Explain the hyperchloremic acidosis of large-volume saline', 'Choose maintenance fluids that do not cause hyponatremia'],
    sections: [
      {
        id: 'composition',
        title: 'Composition',
        blocks: [
          {
            kind: 'table',
            head: ['Fluid', 'Na', 'K', 'Cl', 'Buffer', 'Free water', 'Tonicity'],
            rows: [
              ['0.9% NaCl', '154', '0', '154', '—', '0%', 'Isotonic'],
              ["Lactated Ringer's", '130', '4', '109', 'Lactate 28', '~13%', 'Slightly hypotonic'],
              ['Plasma-Lyte 148', '140', '5', '98', 'Acetate 27, gluconate 23', '~6%', 'Isotonic'],
              ['0.45% NaCl', '77', '0', '77', '—', '50%', 'Hypotonic'],
              ['D5W', '0', '0', '0', '—', '100% (after glucose is metabolized)', 'Hypotonic in vivo'],
              ['3% NaCl', '513', '0', '513', '—', '—', 'Hypertonic'],
            ],
            caption: 'Concentrations in mmol/L',
          },
          {
            kind: 'callout',
            tone: 'key',
            text: 'D5W is isosmotic in the bag but behaves as pure water once the glucose is taken up: two-thirds of it enters cells. It is a free-water fluid, never a resuscitation fluid.',
          },
        ],
      },
      {
        id: 'evidence',
        title: 'Saline vs balanced crystalloids',
        blocks: [
          {
            kind: 'p',
            text: 'Large volumes of 0.9% saline cause hyperchloremic metabolic acidosis. In SMART (15,802 ICU adults) balanced crystalloids reduced a composite of death, new dialysis or persistent kidney dysfunction (14.3% vs 15.4%). The larger BaSICS and PLUS trials found no significant mortality difference.',
            refs: ['semler2018', 'zampieri2021', 'finfer2022'],
          },
          {
            kind: 'callout',
            tone: 'evidence',
            title: 'Practical reading of the evidence',
            items: [
              'Balanced crystalloid is a reasonable default for resuscitation; the benefit, if any, is small.',
              'Saline remains preferred in hypochloremic alkalosis and traumatic brain injury (LR is mildly hypotonic).',
              "LR's 4 mmol/L K is not a reason to avoid it in hyperkalemia: saline's acid load shifts more K out of cells.",
            ],
          },
          {
            kind: 'callout',
            tone: 'danger',
            title: 'Hypotonic maintenance fluids cause hospital hyponatremia',
            text: 'Post-operative and acutely ill patients have non-osmotic ADH release (pain, nausea, opioids). The AAP 2018 guideline recommends isotonic maintenance fluid with appropriate K and dextrose for most hospitalized children; the same physiology applies to adults.',
            refs: ['feld2018'],
          },
        ],
      },
    ],
    bottomLine: [
      'Know the Na of each fluid: 154, 130, 140, 77, 0, 513.',
      'Only fluids with Na+K above the serum Na will raise it (Adrogué–Madias).',
      'Isotonic maintenance fluid prevents iatrogenic hyponatremia.',
    ],
    refs: ['semler2018', 'zampieri2021', 'finfer2022', 'feld2018'],
  },
]
