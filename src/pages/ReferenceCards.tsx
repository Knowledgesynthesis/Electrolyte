import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Printer } from 'lucide-react'
import './ReferenceCards.css'

export default function ReferenceCards() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="no-print container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Printable Reference Cards</h1>
            <p className="text-xl text-muted-foreground">
              Quick reference guides for clinical practice
            </p>
          </div>
          <Button onClick={handlePrint} size="lg">
            <Printer className="w-5 h-5 mr-2" />
            Print Cards
          </Button>
        </div>

        <div className="safety-warning mb-8">
          <p className="font-semibold mb-2">How to Print</p>
          <ul className="text-sm space-y-1">
            <li>• Click "Print Cards" or use Ctrl+P (Cmd+P on Mac)</li>
            <li>• Set layout to Portrait or Landscape based on preference</li>
            <li>• Recommended: Print on cardstock and laminate for durability</li>
            <li>• Each card is designed to fit on one page</li>
          </ul>
        </div>
      </div>

      {/* Reference Cards - Styled for Print */}
      <div className="reference-cards-container">
        {/* Sodium Card */}
        <Card className="reference-card">
          <CardHeader className="bg-blue-100 dark:bg-blue-950">
            <CardTitle className="text-center text-2xl">
              Sodium (Na⁺) Quick Reference
            </CardTitle>
            <p className="text-center text-sm">Normal: 135-145 mmol/L</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg mb-2 border-b">HYPONATREMIA ({"<"}135)</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-semibold">Hypovolemic:</p>
                    <p>• Vomiting, diarrhea</p>
                    <p>• Diuretics</p>
                    <p>• Salt wasting</p>
                  </div>
                  <div>
                    <p className="font-semibold">Euvolemic:</p>
                    <p>• SIADH (most common)</p>
                    <p>• Hypothyroid</p>
                    <p>• Adrenal insufficiency</p>
                  </div>
                  <div>
                    <p className="font-semibold">Hypervolemic:</p>
                    <p>• Heart failure</p>
                    <p>• Cirrhosis</p>
                    <p>• Nephrotic syndrome</p>
                  </div>
                  <div className="bg-red-100 dark:bg-red-950 p-2 rounded">
                    <p className="font-bold">⚠️ SAFETY LIMIT:</p>
                    <p>Correct ≤8-10 mmol/L per 24h</p>
                    <p className="text-xs">Risk: Osmotic demyelination</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-lg mb-2 border-b">HYPERNATREMIA ({">"}145)</p>
                <div className="text-sm space-y-1">
                  <p>• <strong>Water deficit:</strong> Dehydration, diabetes insipidus</p>
                  <p>• <strong>Sodium excess:</strong> Hypertonic saline, primary hyperaldosteronism</p>
                  <p>• <strong>Treatment:</strong> Free water replacement (D5W or oral)</p>
                  <p className="bg-amber-100 dark:bg-amber-950 p-2 rounded mt-2">
                    <strong>Correction rate:</strong> ≤10 mmol/L per 24h to avoid cerebral edema
                  </p>
                </div>
              </div>

              <div className="text-xs border-t pt-2">
                <p className="font-semibold">Key Formula:</p>
                <code className="bg-muted p-1 rounded">Water deficit = TBW × [(Na⁺/140) - 1]</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Potassium Card */}
        <Card className="reference-card">
          <CardHeader className="bg-purple-100 dark:bg-purple-950">
            <CardTitle className="text-center text-2xl">
              Potassium (K⁺) Quick Reference
            </CardTitle>
            <p className="text-center text-sm">Normal: 3.5-5.0 mmol/L</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg mb-2 border-b text-red-600">HYPERKALEMIA ({">"}5.0) - EMERGENCY</p>
                <div className="text-sm space-y-2">
                  <div className="bg-red-100 dark:bg-red-950 p-3 rounded">
                    <p className="font-bold mb-1">Emergency Treatment (K⁺ {">"}6.5 or ECG changes):</p>
                    <p><strong>1. Calcium gluconate</strong> 1g IV over 2-3 min (cardiac protection)</p>
                    <p><strong>2. Insulin</strong> 10 units + D50 50mL IV (shift K⁺ into cells)</p>
                    <p><strong>3. Albuterol</strong> 10-20mg nebulized</p>
                    <p><strong>4. Dialysis</strong> if renal failure</p>
                  </div>
                  <p className="font-semibold">ECG Changes:</p>
                  <p>• Peaked T waves → Widened QRS → Sine wave → Asystole</p>
                  <p className="font-semibold mt-2">Common Causes:</p>
                  <p>• AKI/CKD, K⁺-sparing diuretics + ACEi/ARB, acidosis, rhabdomyolysis</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-lg mb-2 border-b">HYPOKALEMIA ({"<"}3.5)</p>
                <div className="text-sm space-y-2">
                  <p className="font-semibold">ECG: U waves, T flattening, ST depression</p>
                  <p className="font-semibold">Causes:</p>
                  <p>• GI losses (diarrhea, vomiting)</p>
                  <p>• Renal losses (diuretics, hyperaldosteronism)</p>
                  <p>• Transcellular shift (insulin, β-agonists, alkalosis)</p>
                  <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded">
                    <p className="font-bold">⚠️ ALWAYS check Magnesium!</p>
                    <p className="text-xs">Hypokalemia won't correct until Mg²⁺ is repleted</p>
                  </div>
                </div>
              </div>

              <div className="text-xs border-t pt-2">
                <p><strong>K⁺ ↔ pH:</strong> For every 0.1 pH drop, K⁺ rises ~0.6 mmol/L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calcium Card */}
        <Card className="reference-card">
          <CardHeader className="bg-green-100 dark:bg-green-950">
            <CardTitle className="text-center text-2xl">
              Calcium (Ca²⁺) Quick Reference
            </CardTitle>
            <p className="text-center text-sm">Normal: 8.5-10.5 mg/dL (2.1-2.6 mmol/L)</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded">
                <p className="font-bold mb-1">Albumin Correction Formula:</p>
                <code className="text-sm">Corrected Ca = Total Ca + 0.8 × (4.0 - Albumin)</code>
                <p className="text-xs mt-1">Gold standard: Direct ionized Ca²⁺ (1.1-1.3 mmol/L)</p>
              </div>

              <div>
                <p className="font-bold text-lg mb-2 border-b">HYPOCALCEMIA ({"<"}8.5 mg/dL)</p>
                <div className="text-sm space-y-1">
                  <p className="font-semibold">Symptoms (Severe {"<"}7.0):</p>
                  <p>• Chvostek sign (facial twitch), Trousseau sign (carpopedal spasm)</p>
                  <p>• Tetany, seizures, laryngospasm, prolonged QT</p>
                  <p className="font-semibold mt-2">Causes:</p>
                  <p>• Vitamin D deficiency, CKD, hypoparathyroidism, hypomagnesemia</p>
                  <p className="font-semibold mt-2">Treatment:</p>
                  <p>• Mild: Oral calcium carbonate 1-2g TID + vitamin D</p>
                  <p>• Severe: Calcium gluconate 1-2g IV over 10 min, then infusion</p>
                  <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded mt-2">
                    <p className="font-bold">⚠️ Check Mg²⁺!</p>
                    <p className="text-xs">Hypocalcemia won't correct if Mg²⁺ is low</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-lg mb-2 border-b">HYPERCALCEMIA ({">"}10.5 mg/dL)</p>
                <div className="text-sm space-y-1">
                  <p className="font-semibold">Mnemonic: "Stones, Bones, Groans, Moans"</p>
                  <p>• Kidney stones, bone pain, abdominal pain, psychiatric symptoms</p>
                  <p className="font-semibold mt-2">Causes: Primary hyperparathyroidism, malignancy</p>
                  <p className="font-semibold mt-2">Treatment (Severe {">"}12):</p>
                  <p>• IV normal saline 200-300 mL/hr</p>
                  <p>• Calcitonin 4 units/kg SC/IM q12h (rapid onset)</p>
                  <p>• Bisphosphonates (zoledronic acid) - delayed but sustained effect</p>
                </div>
              </div>

              <div className="text-xs border-t pt-2">
                <p><strong>Ca²⁺ ↔ pH:</strong> Alkalosis ↓ ionized Ca²⁺ (more albumin binding)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Magnesium Card */}
        <Card className="reference-card">
          <CardHeader className="bg-orange-100 dark:bg-orange-950">
            <CardTitle className="text-center text-2xl">
              Magnesium (Mg²⁺) Quick Reference
            </CardTitle>
            <p className="text-center text-sm">Normal: 1.5-2.5 mg/dL (0.7-1.1 mmol/L)</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-red-100 dark:bg-red-950 p-3 rounded">
                <p className="font-bold text-lg mb-2">🔗 CRITICAL INTERACTIONS</p>
                <p className="text-sm"><strong>Mg²⁺ → K⁺:</strong> Hypomagnesemia causes refractory hypokalemia</p>
                <p className="text-sm"><strong>Mg²⁺ → Ca²⁺:</strong> Severe hypomagnesemia impairs PTH secretion</p>
                <p className="text-xs mt-2 font-bold">Always check Mg²⁺ when treating hypokalemia or hypocalcemia!</p>
              </div>

              <div>
                <p className="font-bold text-lg mb-2 border-b">HYPOMAGNESEMIA ({"<"}1.5 mg/dL)</p>
                <div className="text-sm space-y-1">
                  <p className="font-semibold">Symptoms (similar to hypocalcemia):</p>
                  <p>• Tetany, tremor, seizures, arrhythmias</p>
                  <p className="font-semibold mt-2">Causes:</p>
                  <p>• GI losses (diarrhea, malabsorption), alcohol use disorder</p>
                  <p>• Renal losses (diuretics, aminoglycosides, PPIs chronic use)</p>
                  <p className="font-semibold mt-2">Treatment:</p>
                  <p>• Mild: Magnesium oxide 400-800mg PO (causes diarrhea)</p>
                  <p>• Severe/symptomatic: MgSO₄ 2-4g IV over 15-60 min</p>
                  <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded mt-2">
                    <p className="font-bold">Torsades de Pointes:</p>
                    <p className="text-xs">MgSO₄ 2g IV over 1-2 min (first-line treatment)</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-lg mb-2 border-b">HYPERMAGNESEMIA ({">"}2.5 mg/dL)</p>
                <div className="text-sm space-y-1">
                  <p className="font-semibold">Rare - usually iatrogenic or renal failure</p>
                  <p>• Symptoms: Hyporeflexia, weakness, bradycardia, hypotension</p>
                  <p>• {">"}12 mg/dL: Respiratory depression, cardiac arrest</p>
                  <p className="font-semibold mt-2">Treatment:</p>
                  <p>• Stop Mg²⁺ sources, IV calcium gluconate (antagonist)</p>
                  <p>• Dialysis if severe and renal failure</p>
                </div>
              </div>

              <div className="text-xs border-t pt-2">
                <p><strong>Key fact:</strong> Mg²⁺ is cofactor for 300+ enzymes, essential for ATP function</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acid-Base Integration Card */}
        <Card className="reference-card">
          <CardHeader className="bg-indigo-100 dark:bg-indigo-950">
            <CardTitle className="text-center text-2xl">
              Acid-Base & Electrolyte Integration
            </CardTitle>
            <p className="text-center text-sm">pH ↔ Electrolytes</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg mb-2 border-b text-red-600">K⁺ ↔ pH (Critical!)</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-100 dark:bg-red-950 p-2 rounded">
                    <p className="font-bold">Acidosis → Hyperkalemia</p>
                    <p className="text-xs">H⁺ in, K⁺ out of cells</p>
                    <p className="text-xs mt-1">For every 0.1 pH ↓, K⁺ ↑ 0.6 mmol/L</p>
                    <p className="text-xs font-bold mt-2">⚠️ K⁺ drops as acidosis corrects!</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded">
                    <p className="font-bold">Alkalosis → Hypokalemia</p>
                    <p className="text-xs">K⁺ into cells, H⁺ out</p>
                    <p className="text-xs mt-1">For every 0.1 pH ↑, K⁺ ↓ 0.4 mmol/L</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-lg mb-2 border-b">Ca²⁺ ↔ pH</p>
                <div className="text-sm space-y-2">
                  <p><strong>Alkalosis → ↓ Ionized Ca²⁺</strong></p>
                  <p className="text-xs">More Ca²⁺ binds to albumin. Can cause symptomatic hypocalcemia
                    (tetany) with acute hyperventilation even if total Ca²⁺ normal.</p>
                  <p><strong>Acidosis → ↑ Ionized Ca²⁺</strong></p>
                  <p className="text-xs">Less Ca²⁺ binds to albumin. May not show hypocalcemia symptoms
                    despite low total Ca²⁺.</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-lg mb-2 border-b">High-Yield Scenarios</p>
                <div className="text-xs space-y-2">
                  <div className="border-l-4 border-red-500 pl-2">
                    <p className="font-bold">DKA:</p>
                    <p>pH 7.1, K⁺ 5.2 → Total body K⁺ DEPLETED despite "normal" K⁺. Start K⁺ repletion early.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-2">
                    <p className="font-bold">Contraction Alkalosis:</p>
                    <p>pH 7.52, K⁺ 2.8, Cl⁻ 88 → Treat with normal saline + KCl</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-2">
                    <p className="font-bold">Type 4 RTA:</p>
                    <p>Hyperkalemia → Impaired NH₃ production → Metabolic acidosis</p>
                  </div>
                </div>
              </div>

              <div className="text-xs border-t pt-2">
                <p className="font-bold">Clinical Approach:</p>
                <p>1. Check pH, pCO₂, HCO₃⁻ 2. Get complete electrolyte panel 3. Predict shifts
                4. Treat underlying cause 5. Recheck frequently</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Protocols Card */}
        <Card className="reference-card">
          <CardHeader className="bg-red-100 dark:bg-red-950">
            <CardTitle className="text-center text-2xl">
              Emergency Protocols
            </CardTitle>
            <p className="text-center text-sm">Life-threatening electrolyte disorders</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-2 border-red-600 p-3 rounded">
                <p className="font-bold text-lg mb-2 text-red-600">Severe Hyperkalemia (K⁺ {">"}6.5 or ECG changes)</p>
                <div className="text-sm space-y-1">
                  <p className="font-bold">Immediate (within minutes):</p>
                  <p>1. <strong>Calcium gluconate 1g IV</strong> over 2-3 min (cardiac membrane stabilization)</p>
                  <p className="text-xs ml-4">→ Repeat if ECG changes persist after 5 min</p>
                  <p>2. <strong>Insulin 10 units + D50 50mL IV</strong> (shift K⁺ into cells, onset 15-30 min)</p>
                  <p className="text-xs ml-4">→ Check glucose q1h × 4-6h (risk of hypoglycemia)</p>
                  <p>3. <strong>Albuterol 10-20mg nebulized</strong> (additional shift into cells)</p>
                  <p className="font-bold mt-2">Next (remove K⁺):</p>
                  <p>4. <strong>Furosemide 40-80mg IV</strong> (if renal function adequate)</p>
                  <p>5. <strong>Dialysis</strong> (if oliguric AKI/ESRD or refractory)</p>
                  <p>6. <strong>K⁺ binders:</strong> Patiromer or sodium zirconium cyclosilicate (delayed effect)</p>
                </div>
              </div>

              <div className="border-2 border-orange-600 p-3 rounded">
                <p className="font-bold text-lg mb-2 text-orange-600">Severe Hypocalcemia (Ca²⁺ {"<"}7.0 or symptomatic)</p>
                <div className="text-sm space-y-1">
                  <p className="font-bold">Signs: Tetany, seizures, laryngospasm, prolonged QT</p>
                  <p>1. <strong>Calcium gluconate 1-2g IV</strong> over 10 min (can repeat × 3)</p>
                  <p className="text-xs ml-4">→ 10% calcium gluconate = 10mL ampule = 1g = 90mg elemental Ca²⁺</p>
                  <p>2. <strong>Continuous infusion:</strong> 10 ampules in 1L D5W at 50 mL/hr</p>
                  <p>3. <strong>Check Mg²⁺!</strong> Replicate if low (hypocalcemia won't correct)</p>
                  <p>4. <strong>Oral calcium + vitamin D</strong> once stable</p>
                </div>
              </div>

              <div className="border-2 border-purple-600 p-3 rounded">
                <p className="font-bold text-lg mb-2 text-purple-600">Torsades de Pointes</p>
                <div className="text-sm space-y-1">
                  <p className="font-bold">Polymorphic VT with long QT</p>
                  <p><strong>MgSO₄ 2g IV</strong> over 1-2 min (first-line, even if Mg²⁺ normal)</p>
                  <p className="text-xs ml-4">→ Can repeat, then infusion 1-2 g/hr</p>
                  <p>• Remove offending agents (prolonging QT)</p>
                  <p>• Correct K⁺ to 4.5-5 mmol/L</p>
                  <p>• Consider overdrive pacing if refractory</p>
                </div>
              </div>

              <div className="border-2 border-blue-600 p-3 rounded">
                <p className="font-bold text-lg mb-2 text-blue-600">Osmotic Demyelination Risk</p>
                <div className="text-sm space-y-1">
                  <p className="font-bold">When correcting hyponatremia:</p>
                  <p><strong>NEVER exceed 8-10 mmol/L Na⁺ rise per 24h</strong></p>
                  <p className="text-xs">High risk: Chronic hypoNa, malnutrition, alcoholism, liver disease</p>
                  <p>• Recheck Na⁺ q2-4h during active correction</p>
                  <p>• If overcorrected: Consider D5W to re-lower Na⁺</p>
                </div>
              </div>

              <div className="text-xs border-t pt-2 mt-4">
                <p className="font-bold">References:</p>
                <p>NEJM, Harrison's 21st Ed, UpToDate 2023, ACEP Clinical Policies</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Print Footer */}
      <div className="print-footer text-center text-xs py-4">
        <p>Electrolyte Atlas - Educational Reference Cards</p>
        <p>For educational purposes only. Not a substitute for clinical judgment.</p>
        <p>References: Harrison's Principles of Internal Medicine 21st Ed, UpToDate 2023</p>
      </div>
    </>
  )
}
