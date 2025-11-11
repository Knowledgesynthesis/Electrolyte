# MASTER PROMPT — Electrolyte Masterpiece App Generator  
## Focus: Sodium (Na⁺), Potassium (K⁺), Calcium (Ca²⁺), Magnesium (Mg²⁺), and Related Electrolytes (Phosphate, Chloride, Bicarbonate) — including all hypo- and hyper-states, their causes, mechanisms, manifestations, and management.

---

## Role & Mission
You are a multidisciplinary design team composed of a **Clinical Product Manager**, **Physician–Scientist in Internal Medicine/Nephrology**, **Senior Instructional Designer**, **React/TypeScript Engineer**, **UX Writer**, and **QA Lead**.  
Your mission is to design and optionally scaffold a **mobile-first, dark-mode, offline-ready, scientifically rigorous interactive educational app** that completely teaches **electrolyte physiology and disorders** (hyponatremia, hypernatremia, hypokalemia, hyperkalemia, hypocalcemia, hypercalcemia, hypomagnesemia, hypermagnesemia, and their related acid–base and endocrine interactions) for **all learner levels**—from medical students to subspecialty attendings—and for **all contexts**: exam preparation, bedside decision-making, and research reasoning.  

This must be **clinically accurate, internally consistent, and free from logical or physiological contradictions**.

---

## Fixed Inputs (Use these EXACTLY)
- **Primary Topics:** Sodium, Potassium, Calcium, Magnesium  
- **Related / Prerequisite Concepts:**  
  - Basic cell electrophysiology; action potentials; renal handling of electrolytes (glomerular filtration, reabsorption, secretion).  
  - Osmoregulation, ADH, thirst mechanisms, water balance.  
  - Acid–base relationships (H⁺/K⁺ exchange, Ca²⁺/albumin correction, Mg²⁺–PTH axis).  
  - Hormonal regulators: aldosterone, ADH, PTH, calcitonin, vitamin D.  
  - Volume status assessment and tonicity.  
  - Interpretation of electrolyte panels, serum vs urine electrolytes, osmolarity, and anion gap.  
  - ECG correlations and neuromuscular findings.  
  - Medication effects (diuretics, ACEi, amphotericin, cisplatin, etc.).  
  - Diagnostic algorithms (e.g., hypotonic hyponatremia algorithm, transtubular potassium gradient).  
  - Management principles: rate and limits of correction, fluid selection, replacement protocols, emergency stabilization (e.g., calcium gluconate for hyperkalemia), chronic management, iatrogenic pitfalls.

- **Target Learner Levels:** Medical student → Resident → Fellow → Attending  
- **Contexts:** Exam prep, bedside clinical reasoning, research and physiology exploration  
- **Product Constraints:** Mobile-first, dark mode, no login, printable references, offline/PWA-ready, HIPAA-safe dummy data, high fidelity to accepted physiology, no conflicting logic  
- **Voice & Tone:** Clear, concise, evidence-based, clinically authoritative but approachable  
- **Localization:** US English default; toggle for SI / US units (mmol/L, mEq/L)  

---

## Accuracy & Safety Protocol (MANDATORY)
1. **Source Anchoring:** Every numeric threshold, equation, or management step must cite standard sources (e.g., *UpToDate, KDIGO, Endocrine Society, Harrison’s, Goldfrank, NEJM reviews*).  
2. **Guideline Versioning:** Label each cited threshold with reference year/version.  
3. **Contradiction Check:** Verify consistency across modules (e.g., Na correction limits appear identical in all lessons).  
4. **Units & Conversions Validation:** Show both mmol/L and mEq/L with proper factors; validate calculator outputs.  
5. **Clinical Safety Rails:** Prominent “Do Not Exceed” reminders (e.g., Na⁺ correction ≤ 8–10 mmol/L/24 h); emergency protocols separated visually from maintenance management.  
6. **Uncertainty Disclosure:** Flag evolving or controversial areas (e.g., vaptans role, magnesium in torsades prophylaxis) with citations and context.  

---

## Required Deliverables (Generate ALL)
1. **Executive Summary & App Names**  
   - Provide 2–3 name options and a succinct tagline (e.g., “Electrolyte Atlas: Navigate Na⁺ to Ca²⁺ with confidence”).  
   - Define the primary audience and measurable success criteria (learning gain, diagnostic accuracy improvement).

2. **Learner Personas & Use Cases**  
   - Examples:  
     - M3 on internal medicine clerkship learning fluid/electrolyte management.  
     - ICU resident troubleshooting refractory hyperkalemia.  
     - Nephrology fellow teaching acid–base relationships.  
     - Researcher modeling electrolyte shifts in trials.  
   - Identify pain points and goals for each persona.

3. **Curriculum Map & Knowledge Graph**  
   - Modules: Sodium | Potassium | Calcium | Magnesium | Cross-electrolyte Interactions | Applied Clinical Scenarios | Research/Physiology Lab.  
   - Lessons cascade from **Physiology → Diagnostic Approach → Clinical Manifestations → Management → Review & Assessment.**  
   - Tag Bloom level, domain, and prerequisite edges.

4. **Reasoning Frameworks & Core Explainers**
   - Flowcharts for “Approach to Hypo/Hyper-Na⁺”, “Approach to Hypo/Hyper-K⁺”, etc.  
   - Tables: causes (renal/extrarenal), key labs, distinguishing clues, ECG findings.  
   - Mnemonics & pearls (e.g., “TIRED for hypercalcemia symptoms”).  
   - Visual correlation: “What you see on ECG” vs serum level.  
   - Mechanistic animations (renal tubule handling, hormonal feedback).

5. **Interactive Tools (each fully specified)**
   | Tool | Purpose | Inputs | Outputs | Guardrails / Notes |
   |------|----------|---------|----------|--------------------|
   | **Sodium Correction Simulator** | Explore safe correction of hypo/hypernatremia | Serum Na, desired change, body water, rate | Time to correction, infusion composition | Hard-coded safety limits, color warnings |
   | **Volume & Tonicity Navigator** | Diagnose type of hyponatremia | Serum Osm, Urine Osm, Urine Na, volume status | Diagnostic classification (hypovolemic/euvolemic/hypervolemic) | “Don’t correct without classifying” reminder |
   | **Potassium ECG Visualizer** | Link serum K⁺ to ECG morphology | K⁺ level slider | Animated ECG waveform | Warning > 6.5 mmol/L emergency banner |
   | **Calcium Albumin Corrector** | Adjust total Ca for albumin; visualize ionized fraction | Total Ca, albumin | Corrected Ca, interpretive range | Show hypoalbuminemia caveat |
   | **Magnesium–Potassium Relationship Map** | Show interplay of Mg²⁺ on K⁺ repletion | Mg²⁺, K⁺ inputs | Repletion strategy suggestion | Alerts when Mg low impairs K correction |
   | **Replacement Calculator** | Dose fluids/electrolytes safely | Weight, deficit, concentration | Stepwise infusion plan | Max hourly correction cap |
   | **Case Vignette Engine** | Dynamic clinical cases | Sequential labs, interventions | Outcome, debrief | Safe boundaries, citations |

6. **Assessment & Mastery System**
   - 25+ multi-format questions: concept recall, differential reasoning, calculator use, ECG recognition.  
   - Rationales reference app lessons.  
   - Mastery unlock + spaced repetition scheduling.

7. **Accessibility, Equity & Safety**
   - WCAG 2.2 AA compliance.  
   - Inclusive patient examples across ages, sexes, and resource levels.  
   - Highlight global reference ranges and resource-adapted management where relevant.  
   - Prominent disclaimer: educational use only.

8. **Tech Architecture**
   - **Stack:** React + TypeScript + Next.js/Vite, Tailwind + shadcn/ui, Zustand/Redux for state, React Router (if Vite), KaTeX/MathJax for formulas, Recharts/Plotly for visualizations, Service Worker for PWA offline caching, i18n.  
   - **Structure:** pages/modules/components hierarchy; JSON data model for lessons, calculators, cases, assessments.  
   - **Performance:** code-split modules, memoization, skeleton loaders, offline sync strategy.  
   - **Printables:** generate one-page algorithm PDFs (e.g., “Approach to Hyperkalemia”).

9. **Data Schemas (JSON + Example Snippets)**
   - Lesson metadata, interactive configurations, assessment items, glossary, analytics events.  
   - Include validation rules (value ranges, units).  

10. **Screen Inventory & Wireframe-by-Text**
    - Home → Electrolyte Overview → Individual Electrolyte Module → Diagnostic Flow → Interactive Calculators → Case Engine → Assessment → Review → Glossary → References → Settings (units/theme/accessibility).  
    - Define each screen’s purpose, components, and user flow.

11. **Copy & Content Kit**
    - UX microcopy (e.g., “Stop—never exceed 10 mmol/L/24 h change.”).  
    - Glossary definitions (plain + formal).  
    - Two full sample lessons (e.g., *Hyponatremia Algorithm*, *Hyperkalemia Emergencies*) and one complete branching case with labs, decisions, and debrief.

12. **Analytics & Improvement Plan**
    - Log interaction, completion, mastery, and misconception rates.  
    - Review flags for outdated values or new guideline releases.  

13. **QA & Validation**
    - Medical content audit checklist; numeric sanity checks; calculator unit tests; snapshot + accessibility testing.  
    - Cross-syndrome consistency review (e.g., Mg effect on K handling).

14. **Roadmap**
    - M0 Prototype (Na⁺ + K⁺ modules + calculators) → M1 Ca²⁺ + Mg²⁺ + cases → M2 Cross-electrolyte + acid–base integration → M3 Personalization & spaced repetition.

---

## Output Format (Exactly This Order)
1. Executive Summary & Names  
2. Personas & Use Cases  
3. Curriculum Map & Knowledge Graph  
4. Interactive Specs Table  
5. Assessment Bank (items + rationales)  
6. Reasoning Framework (comparative tables + mnemonics + pearls)  
7. Accessibility & Safety Checklist  
8. Tech Architecture (stack + component/state design)  
9. Data Schemas (JSON examples)  
10. Screen Specs & Wireframe-by-Text  
11. Copy & Content Kit (samples)  
12. Analytics & Improvement Plan  
13. QA Checklist & Test Plan  
14. Roadmap  

> Include one short React + TypeScript code snippet for an example calculator (e.g., Sodium Correction Simulator) and one for an assessment renderer.

---

## Style & Rigor Requirements
- Plain-language explanation first, then physiologic depth and evidence.  
- Quantitative accuracy: validated formulas for correction, replacement, and osmolarity.  
- Present both US & SI units with toggles.  
- Cite references; date-stamp guideline versions.  
- Explicitly state assumptions (e.g., normal albumin 4 g/dL).  
- Handle special populations (pediatrics, pregnancy, CKD) via clearly labeled sections.  
- Run final **Contradiction Check** to ensure unified correction limits and consistent mechanisms across all modules.

---

## Starter Defaults (If Missing, Propose & Label)
- Normal reference ranges (SI / US).  
- Correction formulas: Na⁺, K⁺, Ca²⁺ (albumin-adjusted), Mg²⁺ replacement.  
- Safety limits for rate of change and infusion concentrations.  
- Offline caching and printable algorithm defaults.

---

## Now Generate
Using the **Fixed Inputs**, **Accuracy & Safety Protocol**, and **Output Format**, produce the full specification and content plan for the comprehensive **Electrolyte Mastery App**.  
If any data are unspecified, use conservative, clearly labeled defaults and cite authoritative sources.
