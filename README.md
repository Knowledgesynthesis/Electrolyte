# Electrolyte Atlas

Interactive, evidence-based mastery of sodium/water, potassium, calcium, magnesium, phosphate and acid–base disorders — from physiology to bedside decisions.

**22 lessons · 13 interactive tools · 8 decision-tree algorithms · 8 branching cases · 60 explained questions · 57 flashcards with spaced repetition · 81 verified references** (evidence reviewed November 2026).

## How it teaches

| Step | Where | What happens |
| --- | --- | --- |
| Learn | `/learn` | Short lessons: physiology → diagnosis → treatment. Every threshold carries a citation; "Updated practice", "Debated" and "Pitfall" callouts flag what has changed and where evidence is uncertain. |
| Apply | inside lessons, `/tools` | Live models (fluid distribution, nephron map, brain-cell adaptation, ECG vs K⁺) and calculators that show their working. |
| Decide | `/algorithms`, `/cases` | Click-through work-ups and branching cases graded best / acceptable / harmful. |
| Retain | `/practice`, `/review` | Vignette questions with an explanation for every option; SM-2 spaced repetition of missed questions and flashcards; per-module mastery in `/progress`. |

Everything runs offline once loaded (PWA). Progress stays in the browser and can be exported/imported in Settings.

## Evidence policy

- **Single source of truth.** Every clinical number (correction limits, doses, cut-offs) lives in [`src/lib/clinical/constants.ts`](src/lib/clinical/constants.ts) and is interpolated into lessons, tools, algorithms, flashcards and reference cards.
- **Automated contradiction check.** [`src/content/content.test.ts`](src/content/content.test.ts) fails the build if any sodium ceiling quoted anywhere differs from the constants, if a known-outdated claim reappears (SIADH urine Na > 20, TTKG, Ca×P product targets, SGLT2i causing hypomagnesemia, a non-existent KDIGO hyponatremia guideline), or if any citation, embedded question, tool, case path or algorithm branch is broken.
- **Current guidance included**, e.g. UKKA hyperkalaemia guideline (2023, updated 2026), ERC 2025 and AHA 2025 resuscitation guidance, 2024 ADA/EASD hyperglycemic-crises consensus, Endocrine Society hypercalcemia-of-malignancy (2023) and primary aldosteronism (2025) guidelines, Fifth International Workshop on PHPT (2022), AVP-deficiency/resistance nomenclature (2022), copeptin testing, FDA denosumab boxed warning (2024), palopegteriparatide (2024), and the 2023–2025 observational data on correction speed (labelled as debated, guideline limits retained).

### Corrections made to the previous version

| Previous claim | Now |
| --- | --- |
| SIADH requires urine Na > 20; "KDIGO 2021" cited for Na limits | Urine Na > 30 (European 2014); KDIGO has no hyponatremia guideline — citation removed |
| Hyponatremia "4–6 mmol/L/24 h is safer" | Goal 4–8 (4–6 if high risk); limit ≤ 10 (≤ 8 high risk) per US 2013/EU 2014; 2025 meta-analysis shown as debated |
| Sodium calculator: 3% saline suggested for any Na < 135; default target tripped its own limit | Symptom-driven bolus logic, ODS-risk limits, Adrogué–Madias + mass-balance simulation of aquaresis |
| TTKG for hypokalemia | Retired by its originators → urine K/creatinine ratio |
| "0.6 mmol/L K per 0.1 pH" (and 0.4 elsewhere — internally inconsistent) | Effect variable and mainly in mineral acidosis; no fixed correction |
| Calcium "stone heart" with digoxin | Not supported by modern data; calcium is probably safe |
| Hyperkalemia: routine bicarbonate; Kayexalate as an option | Not routine (ERC 2025); SZC preferred; resins have no acute role |
| Furosemide in hypercalcemia; denosumab "weekly × 4" | No routine loop diuretic; denosumab suggested over bisphosphonate (2023) |
| Ca × PO₄ > 55 target | KDIGO 2017 no longer uses the product |
| SGLT2 inhibitors cause Mg wasting | They slightly raise serum Mg |
| Mg 1.5–2.5 mg/dL "= 0.7–1.1 mmol/L" (conversion error) | 1.7–2.4 mg/dL = 0.70–1.0 mmol/L |
| Mg for refractory VF | Not recommended routinely (AHA 2025); torsades only |
| Central/nephrogenic DI, water deprivation test | AVP-D / AVP-R; copeptin-based tests |
| Several fabricated or mis-cited references | Every reference re-verified; DOI or PubMed link provided |

Functional bugs also fixed: Tailwind v4 theme tokens generated no CSS (cards/borders unstyled), PWA icons were missing, mastery and assessment scores were never saved, the unit toggle had no effect.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit, stress, content-integrity and contradiction tests (Vitest)
npm run lint
npm run build      # type-check + production build (PWA)
node scripts/smoke.mjs http://localhost:4173   # Playwright smoke test of every route at desktop and phone width (after `npx vite preview --port 4173`)
npm run icons      # regenerate PWA icons from public/favicon.svg
```

## Architecture

```
src/
  lib/clinical/      Pure, tested clinical math (sodium, potassium, calcium, magnesium, acid–base, urine, ECG synthesis, units)
  content/           Typed lesson blocks, questions, cases, algorithms, flashcards, glossary, evidence updates, references
  components/        Block renderer, tools/, figures/, question card, charts, app shell, command palette (⌘K)
  pages/             Route-level views (lazy-loaded)
  stores/            Zustand: settings (theme, units) and progress (lessons, attempts, SRS, cases)
```

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Zustand · React Router 7 · vite-plugin-pwa · Vitest.

## Deployment

Pushed to `main` → Vercel builds with `npm run build` and serves `dist/` with SPA rewrites (`vercel.json`).

---

Made by **Bashar Hasan MD**. Scope: adult medicine unless stated; doses reflect the cited sources as of November 2026 — local protocols and product labels take precedence.
