import type { ReactNode } from 'react'
import { Printer } from 'lucide-react'
import { CA, HYPERK, K_IV, MG, NA_HYPER, NA_HYPO, REF } from '@/lib/clinical/constants'
import { Button, Card, PageHeader } from '@/components/ui'

function RefCard({ title, accent, children }: { title: string; accent: string; children: ReactNode }) {
  return (
    <Card className="print-card overflow-hidden">
      <div className={`px-4 py-2 text-sm font-bold text-white ${accent}`}>{title}</div>
      <div className="space-y-2 p-4 text-sm leading-relaxed">{children}</div>
    </Card>
  )
}

const T = ({ rows }: { rows: [string, string][] }) => (
  <table className="w-full text-sm">
    <tbody>
      {rows.map(([a, b]) => (
        <tr key={a} className="border-b border-border last:border-0">
          <td className="py-1 pr-3 font-medium">{a}</td>
          <td className="tabular py-1 text-right">{b}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default function Reference() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader
        eyebrow="Quick reference"
        title="Pocket cards"
        actions={
          <Button variant="outline" onClick={() => window.print()} className="no-print">
            <Printer className="h-4 w-4" /> Print
          </Button>
        }
      >
        Every number here comes from the same source as the lessons and tools. Reference intervals vary by laboratory.
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RefCard title="Reference intervals (adult)" accent="bg-slate-600">
          <T
            rows={[
              ['Na', `${REF.na.low}–${REF.na.high} mmol/L`],
              ['K', `${REF.k.low}–${REF.k.high} mmol/L`],
              ['Cl', `${REF.cl.low}–${REF.cl.high} mmol/L`],
              ['HCO₃', `${REF.hco3.low}–${REF.hco3.high} mmol/L`],
              ['Ca (total)', `${REF.caMgDl.low}–${REF.caMgDl.high} mg/dL · ${REF.caMmol.low}–${REF.caMmol.high} mmol/L`],
              ['Ca (ionized)', `${REF.iCaMmol.low}–${REF.iCaMmol.high} mmol/L`],
              ['Mg', `${REF.mgMgDl.low}–${REF.mgMgDl.high} mg/dL · ${REF.mgMmol.low}–${REF.mgMmol.high} mmol/L`],
              ['PO₄', `${REF.po4MgDl.low}–${REF.po4MgDl.high} mg/dL · ${REF.po4Mmol.low}–${REF.po4Mmol.high} mmol/L`],
              ['Osmolality', `${REF.posm.low}–${REF.posm.high} mOsm/kg`],
              ['Anion gap', `≈${REF.anionGap} ± 2 (lab-specific)`],
            ]}
          />
        </RefCard>

        <RefCard title="Hyponatremia" accent="bg-sky-600">
          <p>
            <strong>Severe symptoms:</strong> 3% NaCl {NA_HYPO.bolusMl} mL over {NA_HYPO.bolusMinutes} min, repeat ×{NA_HYPO.bolusMaxDoses}; target +{NA_HYPO.severeSymptomTarget}.
          </p>
          <p>
            <strong>Limits:</strong> ≤{NA_HYPO.limit24h}/24 h (≤{NA_HYPO.limitHighRisk24h} high risk), ≤{NA_HYPO.limit48h}/48 h. Goal {NA_HYPO.goalMin24h}–{NA_HYPO.goalMax24h}.
          </p>
          <p>
            <strong>High ODS risk:</strong> Na ≤{NA_HYPO.highRiskNa}, ↓K, alcohol, malnutrition, liver disease.
          </p>
          <p>
            <strong>Rescue:</strong> stop Na; D5W 10 mL/kg/1 h; desmopressin 2 µg IV ≤q8h.
          </p>
          <p>
            <strong>SIADH:</strong> Uosm &gt;100, UNa &gt;30, euvolemic, normal TSH/cortisol, no diuretics. Furst &gt;1 → restriction fails.
          </p>
        </RefCard>

        <RefCard title="Hypernatremia" accent="bg-sky-700">
          <p>
            <strong>Deficit</strong> = TBW × (Na/140 − 1) + ongoing losses (insensible ≈1 L/day).
          </p>
          <p>
            <strong>Rate:</strong> chronic ≈{NA_HYPER.chronicTarget24h} mmol/L/24 h; acute ≈{NA_HYPER.acuteMaxRatePerHour} mmol/L/h.
          </p>
          <p>
            <strong>Uosm &lt;300 + polyuria:</strong> AVP-D (desmopressin response) vs AVP-R. Copeptin tests outperform water deprivation.
          </p>
          <p>
            <strong>Shock first:</strong> isotonic fluid, then free water.
          </p>
        </RefCard>

        <RefCard title="Hyperkalemia" accent="bg-violet-600">
          <p>
            <strong>ECG change:</strong> 10% Ca gluconate 30 mL over 10 min (or 10% CaCl₂ 10 mL central); repeat if no improvement.
          </p>
          <p>
            <strong>Shift:</strong> insulin {HYPERK.insulinUnits} U + dextrose {HYPERK.dextroseGrams} g (skip dextrose if glucose ≥{HYPERK.skipDextroseGlucoseMgDl} mg/dL); salbutamol {HYPERK.salbutamolMg} mg neb.
          </p>
          <p>
            <strong>Glucose</strong> checks for 6 h; if baseline &lt;{HYPERK.extraGlucoseBelowMgDl} mg/dL add 10% dextrose 50 mL/h × 5 h.
          </p>
          <p>
            <strong>Remove:</strong> SZC {HYPERK.szcAcute}; loop diuretic; dialysis.
          </p>
          <p>
            <strong>Recheck K</strong> 1, 2, 4, 6, 24 h. No routine bicarbonate.
          </p>
        </RefCard>

        <RefCard title="Hypokalemia" accent="bg-violet-700">
          <p>
            <strong>IV KCl:</strong> ≤{K_IV.peripheralMaxPerHour} mmol/h peripheral (≤{K_IV.peripheralMaxConcPer100ml} mmol/100 mL), ≤{K_IV.centralMaxPerHour} central; ≤{K_IV.centralEmergencyMaxPerHour} only life-threatening + ECG. In saline, not dextrose.
          </p>
          <p>
            <strong>Scale:</strong> 10 mmol ≈ +{K_IV.risePer10mmol} mmol/L.
          </p>
          <p>
            <strong>Urine K/Cr</strong> ≥1.5 mmol/mmol (13 mEq/g) → renal loss.
          </p>
          <p>
            <strong>Always</strong> check Mg. <strong>DKA:</strong> hold insulin if K &lt;3.5; replace once &lt;5.0.
          </p>
        </RefCard>

        <RefCard title="Calcium" accent="bg-emerald-600">
          <p>
            <strong>IV Ca if</strong> symptoms/long QT or adjusted Ca &lt;{CA.ivThresholdMmol} mmol/L: gluconate 10–20 mL over 10 min, then infusion {CA.infusionMgPerKgPerHour.low}–{CA.infusionMgPerKgPerHour.high} mg/kg/h.
          </p>
          <p>
            <strong>10 mL 10%:</strong> gluconate {CA.gluconate10ml.mg} mg ({CA.gluconate10ml.mmol} mmol) · chloride {CA.chloride10ml.mg} mg ({CA.chloride10ml.mmol} mmol).
          </p>
          <p>
            <strong>Severe ↑Ca:</strong> saline, calcitonin 4 IU/kg q12h, denosumab 120 mg SC or zoledronate 4 mg; steroids if calcitriol-mediated. No routine furosemide.
          </p>
          <p>
            <strong>FHH:</strong> Ca/Cr clearance ratio &lt;0.01.
          </p>
        </RefCard>

        <RefCard title="Magnesium & phosphate" accent="bg-amber-600">
          <p>
            <strong>1 g MgSO₄</strong> = {MG.perGram.mmol} mmol = {MG.perGram.meq} mEq.
          </p>
          <p>
            <strong>Torsades:</strong> 2 g IV. <strong>Severe:</strong> 1–2 g over 15 min then 4–8 g/24 h. Non-urgent ≤{MG.nonUrgentMaxGPerHour} g/h. Halve if eGFR &lt;{MG.renalReduceBelowEgfr}.
          </p>
          <p>
            <strong>FEMg</strong> &gt;{MG.feMgRenalWasting}% = renal wasting.
          </p>
          <p>
            <strong>Mg toxicity:</strong> reflexes lost at 2–3 mmol/L → calcium gluconate; dialysis.
          </p>
          <p>
            <strong>PO₄ &lt;1 mg/dL:</strong> IV 0.32–0.64 mmol/kg over 6–12 h. Refeeding: K/PO₄/Mg q12h × 3 days.
          </p>
        </RefCard>

        <RefCard title="Acid–base formulas" accent="bg-teal-600">
          <T
            rows={[
              ['Winters (met. acidosis)', 'pCO₂ = 1.5·HCO₃ + 8 ± 2'],
              ['Met. alkalosis', 'pCO₂ = 0.7·HCO₃ + 21 ± 2'],
              ['Resp. acidosis', '↑HCO₃ 1 (acute) / 3.5 (chronic) per 10'],
              ['Resp. alkalosis', '↓HCO₃ 2 (acute) / 4 (chronic) per 10'],
              ['Anion gap', 'Na − (Cl + HCO₃)'],
              ['Albumin correction', '+2.5 per g/dL below 4'],
              ['Δ/Δ', '(AG − 10)/(24 − HCO₃)'],
              ['Osmolal gap', 'Measured − calculated (>10)'],
              ['Urine AG', 'UNa + UK − UCl'],
            ]}
          />
        </RefCard>

        <RefCard title="Sodium formulas" accent="bg-sky-800">
          <T
            rows={[
              ['Posm', '2·Na + Glu/18 + BUN/2.8'],
              ['Corrected Na (glucose)', '+2.4 per 100 mg/dL > 100'],
              ['TBW', '0.6 / 0.5 (♂/♀); 0.5 / 0.45 if ≥65'],
              ['Adrogué–Madias', '(inf Na+K − Na)/(TBW + 1)'],
              ['Free water deficit', 'TBW × (Na/140 − 1)'],
              ['EFWC', 'V × (1 − (UNa+UK)/PNa)'],
              ['Furst', '(UNa + UK)/PNa'],
            ]}
          />
        </RefCard>
      </div>
    </div>
  )
}
