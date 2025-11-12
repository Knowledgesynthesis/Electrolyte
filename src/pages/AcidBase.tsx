import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, TrendingUp, TrendingDown, Calculator, CheckCircle2 } from 'lucide-react'

export default function AcidBase() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Comprehensive Acid-Base Analysis</h1>
        <p className="text-xl text-muted-foreground">
          Master the systematic approach to acid-base disorders with evidence-based algorithms
        </p>
      </div>

      {/* Core Principle */}
      <Card className="mb-8 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <CardHeader>
          <CardTitle>Core Principle: The Henderson-Hasselbalch Framework</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded">
            <code className="text-sm">
              pH = 6.1 + log ([HCO₃⁻] / 0.03 × pCO₂)
            </code>
            <p className="text-xs mt-2">Normal: pH 7.35-7.45, pCO₂ 35-45 mmHg, HCO₃⁻ 22-28 mEq/L</p>
          </div>
          <p className="text-sm">
            pH is determined by the ratio of <strong>bicarbonate (HCO₃⁻)</strong> (metabolic component) to
            <strong> pCO₂</strong> (respiratory component). Disorders arise when one or both components change.
          </p>
        </CardContent>
      </Card>

      {/* Step-by-Step Diagnostic Algorithm */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Step-by-Step Diagnostic Algorithm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">Check the pH: Acidemia or Alkalemia?</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
                    <p className="font-semibold">pH {"<"} 7.35 = <span className="text-red-600">ACIDEMIA</span></p>
                    <p className="text-xs">Primary process is either metabolic or respiratory acidosis</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded">
                    <p className="font-semibold">pH {">"} 7.45 = <span className="text-blue-600">ALKALEMIA</span></p>
                    <p className="text-xs">Primary process is either metabolic or respiratory alkalosis</p>
                  </div>
                </div>
                <p className="text-xs mt-2 text-muted-foreground">
                  Note: pH 7.35-7.45 is normal, but may still have compensated acid-base disorder or mixed disorder
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">Determine Primary Disorder: Metabolic or Respiratory?</p>
                <p className="text-sm mb-3">Look at pCO₂ and HCO₃⁻ to identify which moved in the SAME direction as pH:</p>
                <div className="space-y-2 text-sm">
                  <div className="border-l-4 border-red-500 pl-3">
                    <p className="font-semibold">Metabolic Acidosis:</p>
                    <p>pH ↓, HCO₃⁻ ↓ (pCO₂ ↓ if compensating)</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-3">
                    <p className="font-semibold">Metabolic Alkalosis:</p>
                    <p>pH ↑, HCO₃⁻ ↑ (pCO₂ ↑ if compensating)</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <p className="font-semibold">Respiratory Acidosis:</p>
                    <p>pH ↓, pCO₂ ↑ (HCO₃⁻ ↑ if compensating)</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <p className="font-semibold">Respiratory Alkalosis:</p>
                    <p>pH ↑, pCO₂ ↓ (HCO₃⁻ ↓ if compensating)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">Calculate Anion Gap (if Metabolic Acidosis)</p>
                <div className="bg-muted p-3 rounded">
                  <code className="text-sm">
                    Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻)
                  </code>
                  <p className="text-xs mt-2">Normal: 8-12 mEq/L (older labs: 12-16 if K⁺ included)</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
                    <p className="font-semibold text-sm">Anion Gap {">"} 12</p>
                    <p className="text-xs"><strong>High Anion Gap Metabolic Acidosis</strong></p>
                    <p className="text-xs mt-1">MUDPILES: Methanol, Uremia, DKA, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded">
                    <p className="font-semibold text-sm">Anion Gap Normal (8-12)</p>
                    <p className="text-xs"><strong>Non-Anion Gap (Hyperchloremic) Metabolic Acidosis</strong></p>
                    <p className="text-xs mt-1">Diarrhea, RTA, saline administration, carbonic anhydrase inhibitors</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">Check for Appropriate Compensation</p>
                <p className="text-sm mb-2">Use compensation formulas (see below) to determine if compensation is adequate. If not, a mixed disorder is present.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">If High Anion Gap, Calculate Delta-Delta</p>
                <p className="text-sm">To detect hidden metabolic alkalosis or non-gap acidosis</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metabolic Acidosis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-red-600" />
            Metabolic Acidosis (pH ↓, HCO₃⁻ ↓)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="font-bold mb-2">Definition & Pathophysiology:</p>
            <p className="text-sm">
              Primary decrease in serum bicarbonate (HCO₃⁻ {"<"} 22 mEq/L) causing decreased pH. The body compensates
              by increasing ventilation to lower pCO₂ (respiratory compensation).
            </p>
          </div>

          <div>
            <p className="font-bold mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Expected Compensation Formula:
            </p>
            <div className="bg-muted p-4 rounded space-y-2">
              <p className="font-semibold">Winter's Formula:</p>
              <code className="text-sm block">
                Expected pCO₂ = (1.5 × [HCO₃⁻]) + 8 ± 2
              </code>
              <p className="text-xs mt-2">
                <strong>Interpretation:</strong> If measured pCO₂ is HIGHER than expected → concurrent respiratory acidosis.
                If LOWER than expected → concurrent respiratory alkalosis.
              </p>
              <p className="text-xs">
                <strong>Compensation time:</strong> 12-24 hours to reach steady state
              </p>
            </div>
          </div>

          <div>
            <p className="font-bold mb-2">Classification by Anion Gap:</p>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold">High Anion Gap Metabolic Acidosis (HAGMA)</p>
                <p className="text-sm mb-2">Accumulation of unmeasured anions (organic acids)</p>
                <p className="text-sm font-semibold">MUDPILES Mnemonic:</p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• <strong>M</strong>ethanol (formic acid)</li>
                  <li>• <strong>U</strong>remia (organic acids in kidney failure)</li>
                  <li>• <strong>D</strong>iabetic ketoacidosis (β-hydroxybutyrate, acetoacetate)</li>
                  <li>• <strong>P</strong>ropylene glycol, <strong>P</strong>araldehyde</li>
                  <li>• <strong>I</strong>soniazid, <strong>I</strong>ron, <strong>I</strong>nborn errors of metabolism</li>
                  <li>• <strong>L</strong>actic acidosis (Type A: tissue hypoxia; Type B: liver failure, metformin)</li>
                  <li>• <strong>E</strong>thylene glycol (glycolic acid, oxalic acid)</li>
                  <li>• <strong>S</strong>alicylates (aspirin overdose)</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">Non-Anion Gap Metabolic Acidosis (NAGMA) / Hyperchloremic Acidosis</p>
                <p className="text-sm mb-2">Loss of HCO₃⁻ or addition of HCl → Cl⁻ increases to maintain electroneutrality</p>
                <p className="text-sm font-semibold">HARDUPS Mnemonic:</p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• <strong>H</strong>yperalimentation (TPN with high Cl⁻)</li>
                  <li>• <strong>A</strong>cetazolamide, <strong>A</strong>ddison disease</li>
                  <li>• <strong>R</strong>enal tubular acidosis (Types 1, 2, 4)</li>
                  <li>• <strong>D</strong>iarrhea (GI HCO₃⁻ loss)</li>
                  <li>• <strong>U</strong>reteral diversions (ureterosigmoidostomy)</li>
                  <li>• <strong>P</strong>ancreatic fistula</li>
                  <li>• <strong>S</strong>aline administration (large volumes 0.9% NaCl)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-950 p-4 rounded">
            <p className="font-bold mb-2">Delta-Delta Concept (Δ/Δ):</p>
            <p className="text-sm mb-2">
              Used in HAGMA to detect hidden metabolic alkalosis or concurrent NAGMA
            </p>
            <div className="bg-muted p-3 rounded text-sm space-y-1">
              <p><strong>Delta Gap (ΔAG)</strong> = Measured AG - Normal AG (12)</p>
              <p><strong>Delta HCO₃⁻ (ΔHCO₃⁻)</strong> = Normal HCO₃⁻ (24) - Measured HCO₃⁻</p>
              <p className="mt-2"><strong>Δ/Δ Ratio</strong> = ΔAG / ΔHCO₃⁻</p>
              <p className="mt-2 font-semibold">Interpretation:</p>
              <ul className="ml-4 text-xs space-y-1">
                <li>• Δ/Δ ≈ 1: Pure HAGMA (expected)</li>
                <li>• Δ/Δ {"<"} 1: Concurrent NAGMA (HCO₃⁻ fell more than AG rose)</li>
                <li>• Δ/Δ {">"} 2: Concurrent metabolic alkalosis (HCO₃⁻ didn't fall as much as expected)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metabolic Alkalosis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Metabolic Alkalosis (pH ↑, HCO₃⁻ ↑)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="font-bold mb-2">Definition & Pathophysiology:</p>
            <p className="text-sm">
              Primary increase in serum bicarbonate (HCO₃⁻ {">"} 28 mEq/L) causing increased pH. The body compensates
              by hypoventilating to retain CO₂ (respiratory compensation).
            </p>
          </div>

          <div>
            <p className="font-bold mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Expected Compensation Formula:
            </p>
            <div className="bg-muted p-4 rounded space-y-2">
              <code className="text-sm block">
                Expected pCO₂ = 0.7 × [HCO₃⁻] + 20 ± 5
              </code>
              <p className="text-xs">Alternative: <code>ΔpCO₂ = 0.7 × ΔHCO₃⁻</code> (for each 10 mEq/L ↑ in HCO₃⁻, pCO₂ ↑ by 7 mmHg)</p>
              <p className="text-xs mt-2">
                <strong>Interpretation:</strong> If measured pCO₂ is HIGHER than expected → concurrent respiratory acidosis.
                If LOWER than expected → concurrent respiratory alkalosis.
              </p>
              <p className="text-xs">
                <strong>Compensation limit:</strong> pCO₂ rarely exceeds 55 mmHg (risk of hypoxemia limits further hypoventilation)
              </p>
            </div>
          </div>

          <div>
            <p className="font-bold mb-2">Classification by Urine Chloride:</p>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold">Chloride-Responsive (Urine Cl⁻ {"<"} 20 mEq/L)</p>
                <p className="text-sm mb-2">Volume depletion → avid renal Cl⁻ retention</p>
                <p className="text-sm font-semibold">Causes:</p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• Vomiting / NG suction (loss of HCl)</li>
                  <li>• Diuretic use (loop or thiazide) - after discontinuation</li>
                  <li>• Contraction alkalosis (volume depletion concentrates HCO₃⁻)</li>
                  <li>• Post-hypercapnia (chronic respiratory acidosis corrected too quickly)</li>
                </ul>
                <p className="text-sm mt-2"><strong>Treatment:</strong> Normal saline (provides Cl⁻) + KCl repletion</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold">Chloride-Resistant (Urine Cl⁻ {">"} 40 mEq/L)</p>
                <p className="text-sm mb-2">Ongoing renal Cl⁻ wasting despite alkalosis</p>
                <p className="text-sm font-semibold">Causes:</p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• <strong>Mineralocorticoid excess:</strong> Primary hyperaldosteronism, Cushing syndrome, licorice</li>
                  <li>• <strong>Ongoing diuretic use</strong> (active renal K⁺/H⁺ wasting)</li>
                  <li>• <strong>Bartter/Gitelman syndrome</strong> (genetic tubulopathies)</li>
                  <li>• <strong>Severe hypokalemia</strong> (K⁺ {"<"} 2.0 causes alkalosis regardless of volume)</li>
                </ul>
                <p className="text-sm mt-2"><strong>Treatment:</strong> Treat underlying cause, K⁺ repletion, spironolactone (if hyperaldosteronism)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Respiratory Acidosis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            Respiratory Acidosis (pH ↓, pCO₂ ↑)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="font-bold mb-2">Definition & Pathophysiology:</p>
            <p className="text-sm">
              Primary increase in pCO₂ ({">"} 45 mmHg) due to <strong>alveolar hypoventilation</strong>, causing CO₂ retention
              and decreased pH. The kidneys compensate by increasing HCO₃⁻ reabsorption (metabolic compensation).
            </p>
          </div>

          <div>
            <p className="font-bold mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Expected Compensation Formulas:
            </p>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded">
                <p className="font-semibold">Acute Respiratory Acidosis ({"<"} 24 hours):</p>
                <code className="text-sm block mt-2">
                  ΔHCO₃⁻ = 0.1 × ΔpCO₂
                </code>
                <p className="text-xs mt-2">
                  For every 10 mmHg ↑ in pCO₂, HCO₃⁻ ↑ by 1 mEq/L (due to buffering, not renal compensation)
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded">
                <p className="font-semibold">Chronic Respiratory Acidosis ({">"} 3-5 days):</p>
                <code className="text-sm block mt-2">
                  ΔHCO₃⁻ = 0.35 × ΔpCO₂
                </code>
                <p className="text-xs mt-2">
                  For every 10 mmHg ↑ in pCO₂, HCO₃⁻ ↑ by 3.5 mEq/L (maximal renal compensation achieved)
                </p>
              </div>
            </div>
            <p className="text-xs mt-2">
              <strong>Interpretation:</strong> If HCO₃⁻ is HIGHER than expected → concurrent metabolic alkalosis.
              If LOWER than expected → concurrent metabolic acidosis.
            </p>
          </div>

          <div>
            <p className="font-bold mb-2">Common Causes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold">CNS Depression:</p>
                <ul className="text-xs ml-4 space-y-1">
                  <li>• Opioids, benzodiazepines, anesthesia</li>
                  <li>• Brainstem lesions (stroke, tumor)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Neuromuscular:</p>
                <ul className="text-xs ml-4 space-y-1">
                  <li>• Myasthenia gravis, Guillain-Barré</li>
                  <li>• ALS, phrenic nerve injury</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Airway Obstruction:</p>
                <ul className="text-xs ml-4 space-y-1">
                  <li>• COPD exacerbation, severe asthma</li>
                  <li>• Obstructive sleep apnea</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Parenchymal Lung Disease:</p>
                <ul className="text-xs ml-4 space-y-1">
                  <li>• ARDS, pneumonia</li>
                  <li>• Pulmonary edema</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="safety-warning">
            <p className="font-bold mb-1">⚠️ Clinical Warning:</p>
            <p className="text-sm">
              In chronic respiratory acidosis (e.g., COPD), patients adapt to high pCO₂. Rapid correction with mechanical
              ventilation can cause <strong>post-hypercapnic metabolic alkalosis</strong> and may precipitate seizures.
              Correct pCO₂ gradually.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Respiratory Alkalosis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Respiratory Alkalosis (pH ↑, pCO₂ ↓)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="font-bold mb-2">Definition & Pathophysiology:</p>
            <p className="text-sm">
              Primary decrease in pCO₂ ({"<"} 35 mmHg) due to <strong>alveolar hyperventilation</strong>, causing CO₂
              depletion and increased pH. The kidneys compensate by decreasing HCO₃⁻ reabsorption (metabolic compensation).
            </p>
          </div>

          <div>
            <p className="font-bold mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Expected Compensation Formulas:
            </p>
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded">
                <p className="font-semibold">Acute Respiratory Alkalosis ({"<"} 24 hours):</p>
                <code className="text-sm block mt-2">
                  ΔHCO₃⁻ = 0.2 × ΔpCO₂
                </code>
                <p className="text-xs mt-2">
                  For every 10 mmHg ↓ in pCO₂, HCO₃⁻ ↓ by 2 mEq/L (due to buffering)
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded">
                <p className="font-semibold">Chronic Respiratory Alkalosis ({">"} 2-3 days):</p>
                <code className="text-sm block mt-2">
                  ΔHCO₃⁻ = 0.4 × ΔpCO₂
                </code>
                <p className="text-xs mt-2">
                  For every 10 mmHg ↓ in pCO₂, HCO₃⁻ ↓ by 4 mEq/L (maximal renal compensation)
                </p>
              </div>
            </div>
            <p className="text-xs mt-2">
              <strong>Interpretation:</strong> If HCO₃⁻ is LOWER than expected → concurrent metabolic acidosis.
              If HIGHER than expected → concurrent metabolic alkalosis.
            </p>
          </div>

          <div>
            <p className="font-bold mb-2">Common Causes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold">Hypoxemia:</p>
                <ul className="text-xs ml-4 space-y-1">
                  <li>• High altitude</li>
                  <li>• Pulmonary embolism, pneumonia</li>
                  <li>• Severe anemia</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">CNS Stimulation:</p>
                <ul className="text-xs ml-4 space-y-1">
                  <li>• Anxiety / panic attack</li>
                  <li>• Pain, fever</li>
                  <li>• Stroke, meningitis</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Mechanical:</p>
                <ul className="text-xs ml-4 space-y-1">
                  <li>• Mechanical ventilation (over-ventilation)</li>
                  <li>• Pregnancy (progesterone effect)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Drugs:</p>
                <ul className="text-xs ml-4 space-y-1">
                  <li>• Salicylates (early phase - direct stimulation)</li>
                  <li>• Progesterone, catecholamines</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mixed Disorders */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Mixed Acid-Base Disorders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm mb-4">
              Mixed disorders occur when two or more primary acid-base disturbances coexist. They are identified when
              compensation is <strong>inappropriate</strong> (more or less than expected by formulas).
            </p>
          </div>

          <div>
            <p className="font-bold mb-3">Common Mixed Disorders:</p>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold">Metabolic Acidosis + Respiratory Acidosis</p>
                <p className="text-xs">pH severely decreased, both HCO₃⁻ and pCO₂ are low/high respectively</p>
                <p className="text-xs mt-1"><strong>Example:</strong> Cardiac arrest (lactic acidosis + respiratory failure)</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">Metabolic Alkalosis + Respiratory Alkalosis</p>
                <p className="text-xs">pH severely increased, both HCO₃⁻ and pCO₂ are elevated/low respectively</p>
                <p className="text-xs mt-1"><strong>Example:</strong> Cirrhotic on diuretics (alkalosis) + liver disease (hyperventilation)</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-semibold">Metabolic Acidosis + Metabolic Alkalosis</p>
                <p className="text-xs">pH may be normal, but anion gap is elevated AND HCO₃⁻ is not as low as expected</p>
                <p className="text-xs mt-1"><strong>Example:</strong> DKA patient who has been vomiting (HAGMA + alkalosis from HCl loss)</p>
                <p className="text-xs mt-1"><strong>Detection:</strong> Δ/Δ ratio {">"} 2 (HCO₃⁻ didn't fall as much as AG rose)</p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold">Triple Acid-Base Disorder</p>
                <p className="text-xs">All three components (respiratory + two metabolic) are abnormal</p>
                <p className="text-xs mt-1"><strong>Example:</strong> COPD patient (chronic respiratory acidosis) on diuretics (metabolic alkalosis) who develops lactic acidosis from sepsis</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-950 p-4 rounded">
            <p className="font-bold mb-2">How to Detect Mixed Disorders:</p>
            <ol className="text-sm space-y-2 ml-4">
              <li>1. <strong>pH doesn't match expected direction:</strong> If pH is near-normal despite abnormal pCO₂ and HCO₃⁻</li>
              <li>2. <strong>Compensation is excessive or inadequate:</strong> Use compensation formulas - if measured value is outside expected range</li>
              <li>3. <strong>Δ/Δ ratio is abnormal:</strong> In HAGMA, if Δ/Δ {"<"} 1 or {">"} 2</li>
              <li>4. <strong>Both pCO₂ and HCO₃⁻ move in same direction:</strong> E.g., both elevated or both decreased (not compensation)</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Electrolyte Connections */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Acid-Base & Electrolyte Connections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="border-l-4 border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Potassium ↔ pH
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong>Acidosis → Hyperkalemia:</strong> H⁺ in, K⁺ out. For every 0.1 pH ↓, K⁺ ↑ 0.6 mEq/L</p>
              <p><strong>Alkalosis → Hypokalemia:</strong> K⁺ in, H⁺ out. For every 0.1 pH ↑, K⁺ ↓ 0.4 mEq/L</p>
              <div className="safety-warning">
                <p className="text-xs"><strong>⚠️ DKA Alert:</strong> "Normal" K⁺ in severe acidosis = total body K⁺ depletion. Start K⁺ repletion early.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle>Calcium ↔ pH</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong>Alkalosis → ↓ Ionized Ca²⁺:</strong> More Ca²⁺ binds to albumin. Can cause tetany even with normal total Ca²⁺.</p>
              <p><strong>Acidosis → ↑ Ionized Ca²⁺:</strong> Less Ca²⁺ binds to albumin. May not show hypocalcemia symptoms despite low total Ca²⁺.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Clinical Examples */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Worked Clinical Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Example 1 */}
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-bold mb-2">Example 1: DKA</p>
              <p className="text-sm mb-2">ABG: pH 7.18, pCO₂ 24 mmHg, HCO₃⁻ 9 mEq/L. Na⁺ 135, Cl⁻ 98, K⁺ 5.1 mEq/L</p>
              <div className="space-y-2 text-sm">
                <p><strong>Step 1:</strong> pH 7.18 → <span className="text-red-600">ACIDEMIA</span></p>
                <p><strong>Step 2:</strong> HCO₃⁻ is low (9) → <strong>Metabolic Acidosis</strong></p>
                <p><strong>Step 3:</strong> Anion Gap = 135 - (98 + 9) = <strong>28</strong> (high) → <strong>HAGMA</strong></p>
                <p><strong>Step 4:</strong> Winter's formula: Expected pCO₂ = (1.5 × 9) + 8 = 21.5 ± 2 = <strong>19.5-23.5 mmHg</strong></p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Measured pCO₂ (24) is within expected range → <strong>Appropriate compensation</strong>
                </p>
                <p><strong>Step 5:</strong> Δ/Δ = (28-12) / (24-9) = 16/15 ≈ <strong>1.07</strong> → Pure HAGMA</p>
                <p className="mt-2 font-bold">Diagnosis: High Anion Gap Metabolic Acidosis (DKA) with appropriate respiratory compensation</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-bold mb-2">Example 2: Mixed Disorder</p>
              <p className="text-sm mb-2">ABG: pH 7.40, pCO₂ 60 mmHg, HCO₃⁻ 36 mEq/L. Na⁺ 138, Cl⁻ 86</p>
              <div className="space-y-2 text-sm">
                <p><strong>Step 1:</strong> pH 7.40 → Normal (but suspicious!)</p>
                <p><strong>Step 2:</strong> Both pCO₂ (60, high) and HCO₃⁻ (36, high) are elevated</p>
                <p><strong>Analysis:</strong> High pCO₂ suggests respiratory acidosis. High HCO₃⁻ suggests metabolic alkalosis.</p>
                <p><strong>Check chronic respiratory acidosis compensation:</strong> ΔHCO₃⁻ = 0.35 × ΔpCO₂ = 0.35 × (60-40) = <strong>7 mEq/L</strong></p>
                <p>Expected HCO₃⁻ = 24 + 7 = <strong>31 mEq/L</strong></p>
                <p>Measured HCO₃⁻ (36) is HIGHER than expected (31) → <strong>Concurrent metabolic alkalosis</strong></p>
                <p className="mt-2 font-bold">Diagnosis: Chronic Respiratory Acidosis + Metabolic Alkalosis (e.g., COPD patient on diuretics)</p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-bold mb-2">Example 3: Respiratory Alkalosis</p>
              <p className="text-sm mb-2">ABG: pH 7.52, pCO₂ 28 mmHg, HCO₃⁻ 22 mEq/L (Patient with pulmonary embolism)</p>
              <div className="space-y-2 text-sm">
                <p><strong>Step 1:</strong> pH 7.52 → <span className="text-blue-600">ALKALEMIA</span></p>
                <p><strong>Step 2:</strong> pCO₂ is low (28) → <strong>Respiratory Alkalosis</strong></p>
                <p><strong>Step 4:</strong> Acute respiratory alkalosis formula: ΔHCO₃⁻ = 0.2 × ΔpCO₂ = 0.2 × (40-28) = <strong>2.4 mEq/L</strong></p>
                <p>Expected HCO₃⁻ = 24 - 2.4 = <strong>21.6 mEq/L</strong></p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Measured HCO₃⁻ (22) ≈ expected (21.6) → <strong>Appropriate acute compensation</strong>
                </p>
                <p className="mt-2 font-bold">Diagnosis: Acute Respiratory Alkalosis (hypoxemia from PE)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Reference: Compensation Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-3">Disorder</th>
                  <th className="text-left p-3">Primary Change</th>
                  <th className="text-left p-3">Compensation Formula</th>
                  <th className="text-left p-3">Time to Steady State</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b">
                  <td className="p-3 font-semibold">Metabolic Acidosis</td>
                  <td className="p-3">↓ HCO₃⁻</td>
                  <td className="p-3"><code>pCO₂ = 1.5 × HCO₃⁻ + 8 ± 2</code> (Winter's)</td>
                  <td className="p-3">12-24 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-semibold">Metabolic Alkalosis</td>
                  <td className="p-3">↑ HCO₃⁻</td>
                  <td className="p-3"><code>pCO₂ = 0.7 × HCO₃⁻ + 20 ± 5</code></td>
                  <td className="p-3">12-24 hours (max pCO₂ ~55)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-semibold">Acute Resp. Acidosis</td>
                  <td className="p-3">↑ pCO₂</td>
                  <td className="p-3"><code>ΔHCO₃⁻ = 0.1 × ΔpCO₂</code> (1 per 10)</td>
                  <td className="p-3">Minutes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-semibold">Chronic Resp. Acidosis</td>
                  <td className="p-3">↑ pCO₂</td>
                  <td className="p-3"><code>ΔHCO₃⁻ = 0.35 × ΔpCO₂</code> (3.5 per 10)</td>
                  <td className="p-3">3-5 days</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-semibold">Acute Resp. Alkalosis</td>
                  <td className="p-3">↓ pCO₂</td>
                  <td className="p-3"><code>ΔHCO₃⁻ = 0.2 × ΔpCO₂</code> (2 per 10)</td>
                  <td className="p-3">Minutes</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Chronic Resp. Alkalosis</td>
                  <td className="p-3">↓ pCO₂</td>
                  <td className="p-3"><code>ΔHCO₃⁻ = 0.4 × ΔpCO₂</code> (4 per 10)</td>
                  <td className="p-3">2-3 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <ul className="list-disc list-inside space-y-1">
            <li>Berend K, de Vries AP, Gans RO. Physiological approach to assessment of acid-base disturbances. N Engl J Med. 2014;371:1434-1445</li>
            <li>Kraut JA, Madias NE. Serum Anion Gap: Its Uses and Limitations in Clinical Medicine. Clin J Am Soc Nephrol. 2007;2:162-174</li>
            <li>Palmer BF, Clegg DJ. Electrolyte and Acid-Base Disturbances in Patients with Diabetes Mellitus. N Engl J Med. 2015;373:548-559</li>
            <li>Emmett M, Narins RG. Clinical use of the anion gap. Medicine (Baltimore). 1977;56:38-54</li>
            <li>Rose BD, Post TW. Clinical Physiology of Acid-Base and Electrolyte Disorders, 5th Edition. McGraw-Hill, 2001</li>
            <li>Adrogué HJ, Madias NE. Management of life-threatening acid-base disorders. N Engl J Med. 1998;338:26-34</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
