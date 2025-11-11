import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Heart, Zap } from 'lucide-react'

export default function Hyperkalemia() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/potassium">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Potassium
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Zap className="w-10 h-10 text-red-500" />
          Hyperkalemia
        </h1>
        <p className="text-xl text-muted-foreground">
          Serum potassium {">"}5.0 mmol/L — Emergency recognition and treatment
        </p>
      </div>

      {/* Critical Safety Warning */}
      <div className="safety-warning mb-8">
        <p className="font-bold text-lg mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Medical Emergency — Life-Threatening Arrhythmia Risk
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Severe hyperkalemia (K⁺ {">"}6.5 or ECG changes) is a medical emergency.</strong> Can rapidly progress to cardiac arrest (sine wave → VF → asystole).
          </p>
          <p>
            <strong>Treatment sequence:</strong> STABILIZE (Ca gluconate) → SHIFT (insulin+glucose, albuterol) → ELIMINATE (diuretics, dialysis).
          </p>
          <p>
            <strong>ECG is essential:</strong> K⁺ level may not correlate with cardiac toxicity. ECG changes indicate membrane instability and require immediate treatment.
          </p>
        </div>
      </div>

      {/* Definition & Severity */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Definition & Severity Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-bold">Mild</p>
                <p className="text-2xl">5.1-5.9 mmol/L</p>
                <p className="text-sm text-muted-foreground">Usually asymptomatic</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-bold">Moderate</p>
                <p className="text-2xl">6.0-6.4 mmol/L</p>
                <p className="text-sm text-muted-foreground">Weakness, palpitations</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-bold">Severe</p>
                <p className="text-2xl">≥ 6.5 mmol/L</p>
                <p className="text-sm text-muted-foreground">Paralysis, cardiac arrest</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ECG Changes */}
      <Card className="mb-8 bg-red-50 dark:bg-red-950/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Progressive ECG Changes in Hyperkalemia (CRITICAL)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-bold">
              ECG changes progress with increasing K⁺, but correlation is imperfect. Any ECG changes indicate HIGH RISK and require immediate treatment.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                <span className="font-bold min-w-[140px]">K⁺ 5.5-6.5:</span>
                <span><strong>Peaked T waves</strong> (narrow, tall, tent-shaped) — earliest and most sensitive sign</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                <span className="font-bold min-w-[140px]">K⁺ 6.5-7.5:</span>
                <span>PR interval prolongation, P wave flattening/loss, QRS widening</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-red-100 dark:bg-red-900/50 rounded">
                <span className="font-bold min-w-[140px]">K⁺ 7.5-8.0:</span>
                <span><strong>Sine wave pattern</strong> (wide QRS merges with T wave) — pre-arrest rhythm</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-red-200 dark:bg-red-800 rounded">
                <span className="font-bold min-w-[140px]">K⁺ {">"}8.0:</span>
                <span><strong>Ventricular fibrillation → Asystole</strong> (cardiac arrest)</span>
              </div>
            </div>
            <div className="bg-red-100 dark:bg-red-950 p-4 rounded mt-4">
              <p className="font-bold mb-2">IMMEDIATE ACTION REQUIRED IF:</p>
              <ul className="text-sm space-y-1">
                <li>• Any ECG changes beyond peaked T waves</li>
                <li>• K⁺ {">"}6.5 mmol/L</li>
                <li>• Rapidly rising K⁺ (e.g., tumor lysis, rhabdomyolysis)</li>
                <li>• Symptoms (muscle weakness, palpitations, paresthesias)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Etiology */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Etiology: Categorized by Mechanism</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-lg mb-2">1. Transcellular Shift (K⁺ out of cells)</p>
              <div className="space-y-2 text-sm">
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Metabolic Acidosis</p>
                  <p className="text-xs">H⁺ enters cells, K⁺ exits. Especially with mineral acids (normal anion gap acidosis). Organic acidosis (DKA, lactic) has less effect.</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Insulin Deficiency</p>
                  <p className="text-xs">Diabetic ketoacidosis — hyperkalemia despite total body K⁺ depletion. Corrects with insulin treatment.</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Cell Lysis</p>
                  <p className="text-xs"><strong>Rhabdomyolysis, tumor lysis syndrome, massive hemolysis</strong> — release of intracellular K⁺. Check CK, LDH, uric acid, phosphate.</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Medications</p>
                  <p className="text-xs">β-blockers (inhibit cellular uptake), succinylcholine (depolarizing paralytic), digoxin toxicity (blocks Na-K-ATPase)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">2. Decreased Renal Excretion (Most Common)</p>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-bold mb-1">Chronic Kidney Disease / Acute Kidney Injury</p>
                  <p className="text-sm">GFR {"<"}15-20 mL/min typically required. Most common overall cause of hyperkalemia.</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-bold mb-1">Medications (Very Common)</p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-primary/10 p-2 rounded">
                      <p className="font-semibold">RAAS Inhibitors</p>
                      <p className="text-xs">ACE inhibitors, ARBs, aliskiren (direct renin inhibitor) → ↓ aldosterone → ↓ K⁺ excretion</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">K⁺-Sparing Diuretics</p>
                      <p className="text-xs">Spironolactone, eplerenone (aldosterone antagonists), amiloride, triamterene (ENaC blockers)</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">NSAIDs</p>
                      <p className="text-xs">Decrease renin → ↓ aldosterone. Especially risky with CKD + ACEi/ARB.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Others</p>
                      <p className="text-xs">Trimethoprim (blocks ENaC), pentamidine, calcineurin inhibitors (tacrolimus, cyclosporine), heparin (↓ aldosterone synthesis)</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold mb-1">Hypoaldosteronism</p>
                  <div className="space-y-1 text-sm mt-2">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Addison's Disease (Primary Adrenal Insufficiency)</p>
                      <p className="text-xs">Hyperkalemia + hyponatremia + hypotension. Check cortisol, ACTH stimulation test.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Type 4 RTA (Hyporeninemic Hypoaldosteronism)</p>
                      <p className="text-xs">Common in diabetic nephropathy. Mild hyperkalemia + normal anion gap acidosis. Low renin, low aldosterone.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">3. Increased Intake (Rare Alone)</p>
              <p className="text-sm">Usually requires concurrent impaired excretion. Sources: Salt substitutes (KCl), IV K⁺ administration, massive blood transfusion (stored blood accumulates K⁺).</p>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">4. Pseudohyperkalemia</p>
              <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
                <p className="text-sm mb-2"><strong>Rule this out first!</strong> K⁺ released from cells during/after blood draw.</p>
                <ul className="text-xs space-y-1">
                  <li>• Hemolysis (most common) — RBCs lyse in tube, release K⁺. Serum appears pink. Repeat with careful draw.</li>
                  <li>• Prolonged tourniquet time, fist clenching</li>
                  <li>• Thrombocytosis ({">"}500k) or leukocytosis ({">"}100k) — cells release K⁺ during clotting</li>
                  <li>• <strong>Clue:</strong> Asymptomatic patient with elevated K⁺, no ECG changes. Repeat draw to confirm.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Treatment */}
      <Card className="mb-8 bg-red-50 dark:bg-red-950/30">
        <CardHeader>
          <CardTitle>EMERGENCY TREATMENT: 3-Step Approach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded">
              <p className="font-bold text-lg mb-2">Step 1: STABILIZE Cardiac Membrane (Immediate, ECG changes present)</p>
              <div className="space-y-2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Calcium Gluconate 10% 1-2 grams (10-20 mL) IV over 2-5 min</p>
                  <p className="text-sm">• Antagonizes cardiac effects of hyperkalemia (stabilizes membrane potential)</p>
                  <p className="text-sm">• Onset: 1-3 minutes. Duration: 30-60 minutes</p>
                  <p className="text-sm">• Does NOT lower K⁺ — only protects heart</p>
                  <p className="text-sm">• Repeat dose if ECG changes persist after 5-10 min</p>
                  <p className="text-sm">• <strong>Caution:</strong> Give slowly in digoxin toxicity (risk of arrhythmia)</p>
                </div>
                <p className="text-xs italic">Alternative: Calcium chloride 10% 5-10 mL IV (more potent but requires central line, caustic to veins)</p>
              </div>
            </div>

            <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded">
              <p className="font-bold text-lg mb-2">Step 2: SHIFT K⁺ Into Cells (Temporary, lowers K⁺ for 4-6 hours)</p>
              <div className="space-y-3 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Insulin + Glucose (Most Effective)</p>
                  <p>• <strong>10 units regular insulin IV</strong> + <strong>25g dextrose</strong> (50 mL D50 or 250 mL D10)</p>
                  <p>• Onset: 10-20 min, Peak: 30-60 min, Duration: 4-6 hours</p>
                  <p>• Lowers K⁺ by 0.5-1.2 mmol/L</p>
                  <p>• Check glucose at 1 hr and 4-6 hrs (risk of hypoglycemia)</p>
                  <p>• If blood glucose {"<"}250 mg/dL, give dextrose. If {">"}250, insulin alone OK.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Albuterol (β2-agonist)</p>
                  <p>• <strong>10-20 mg nebulized</strong> (or 0.5 mg IV, rarely available)</p>
                  <p>• Onset: 30 min, Duration: 2-4 hours</p>
                  <p>• Lowers K⁺ by 0.5-1.0 mmol/L</p>
                  <p>• Synergistic with insulin — use both for severe cases</p>
                  <p>• Note: 10-20 mg = 4-8× standard dose (5 mg for bronchospasm)</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Sodium Bicarbonate (Controversial)</p>
                  <p>• <strong>50-100 mEq IV</strong> over 5-10 min</p>
                  <p>• Effective mainly if concurrent metabolic acidosis</p>
                  <p>• Limited benefit in normal pH, slower onset (hours)</p>
                  <p>• May worsen hypocalcemia. Generally not first-line.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded">
              <p className="font-bold text-lg mb-2">Step 3: ELIMINATE K⁺ From Body (Definitive, takes hours)</p>
              <div className="space-y-3 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Loop Diuretics</p>
                  <p>• <strong>Furosemide 40-80 mg IV</strong> (or bumetanide 1-2 mg IV)</p>
                  <p>• Increases renal K⁺ excretion (only if kidneys functional)</p>
                  <p>• Onset: 30-60 min</p>
                  <p>• Ineffective if anuric or GFR {"<"}15-20</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Sodium Polystyrene Sulfonate (Kayexalate)</p>
                  <p>• <strong>15-30 g PO or 30-50 g PR</strong></p>
                  <p>• Cation exchange resin — binds K⁺ in GI tract</p>
                  <p>• Onset: 2-4 hours PO, 1-2 hours PR. Lowers K⁺ by 0.5-1 mmol/L</p>
                  <p>• <strong>⚠️ Risk:</strong> Intestinal necrosis (rare but serious). Avoid in post-op, ileus, constipation.</p>
                  <p>• Less commonly used due to slow onset and side effects</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Patiromer (Veltassa) or Sodium Zirconium Cyclosilicate (Lokelma)</p>
                  <p>• <strong>Newer K⁺ binders</strong> — safer than kayexalate, no necrosis risk</p>
                  <p>• Patiromer: 8.4 g PO daily. Onset: 7+ hours (too slow for emergency)</p>
                  <p>• Lokelma: 10 g PO TID. Onset: 1 hour. Can be used for urgent hyperkalemia.</p>
                  <p>• Use for chronic hyperkalemia management or subacute treatment</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded">
                  <p className="font-bold mb-1">Hemodialysis (Most Effective)</p>
                  <p>• <strong>Emergent HD</strong> for severe hyperkalemia refractory to medical treatment</p>
                  <p>• Removes 25-50 mEq K⁺ per hour</p>
                  <p>• Indications: K⁺ {">"}7.0 with ECG changes, refractory hyperkalemia, AKI with anuria, severe acidosis</p>
                  <p>• Most definitive treatment</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Algorithm */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Treatment Decision Algorithm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded">
              <p className="font-bold mb-1">Severe (K⁺ ≥6.5 OR ECG changes OR symptoms)</p>
              <ol className="text-sm list-decimal list-inside space-y-1">
                <li><strong>Calcium gluconate</strong> IV immediately (if ECG changes)</li>
                <li><strong>Insulin 10U + D50</strong> IV + <strong>Albuterol 10-20 mg</strong> nebulized</li>
                <li><strong>Furosemide</strong> IV or <strong>emergent hemodialysis</strong> (if anuric/refractory)</li>
                <li>Continuous cardiac monitoring</li>
                <li>Recheck K⁺ in 1-2 hours</li>
              </ol>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded">
              <p className="font-bold mb-1">Moderate (K⁺ 6.0-6.4, no ECG changes, asymptomatic)</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li><strong>Insulin + glucose</strong> or <strong>albuterol</strong> (consider both)</li>
                <li>Furosemide IV or K⁺ binder (lokelma or patiromer)</li>
                <li>Discontinue offending medications (ACEi, ARBs, K-sparing diuretics, NSAIDs)</li>
                <li>Recheck K⁺ in 2-4 hours</li>
              </ul>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded">
              <p className="font-bold mb-1">Mild (K⁺ 5.1-5.9, no ECG changes, asymptomatic)</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Discontinue K⁺ sources (dietary, supplements, salt substitutes)</li>
                <li>Stop/adjust offending medications</li>
                <li>Loop diuretic or K⁺ binder if persistently elevated</li>
                <li>Treat underlying cause (optimize CKD management)</li>
                <li>Recheck K⁺ in 1-2 days</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card className="mb-8 bg-gradient-to-br from-red-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>ECG trumps K⁺ level:</strong> A patient with K⁺ 5.8 and peaked T waves is higher risk than K⁺ 6.8 without ECG changes. Treat based on ECG.</li>
            <li>• <strong>Chronic vs acute:</strong> Chronic hyperkalemia (CKD) is better tolerated than acute (rhabdomyolysis). Cells adapt over time.</li>
            <li>• <strong>Pseudohyperkalemia clues:</strong> Asymptomatic, normal ECG, hemolyzed sample. Always repeat if suspicious.</li>
            <li>• <strong>DKA paradox:</strong> Total body K⁺ is depleted, but serum K⁺ may be elevated due to insulin deficiency + acidosis. K⁺ drops rapidly with treatment. Replete K⁺ once {"<"}5.3.</li>
            <li>• <strong>CKD + RAAS inhibitor + NSAID:</strong> "Triple whammy" for hyperkalemia. Common culprit combination.</li>
            <li>• <strong>Calcium + digoxin:</strong> Give calcium slowly if patient on digoxin (risk of "stone heart" — tetanic contraction). Some avoid calcium altogether in dig toxicity.</li>
            <li>• <strong>Rebound hyperkalemia:</strong> K⁺ shifts back out of cells as insulin wears off (4-6 hrs). Need definitive elimination (dialysis, diuretics, binders).</li>
            <li>• <strong>Type 4 RTA:</strong> Think of this in diabetics with mild hyperkalemia + normal anion gap acidosis. Low renin, low aldosterone. Treat with fludrocortisone or loop diuretic.</li>
          </ul>
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <ul className="list-disc list-inside">
            <li>Alfonzo AVM, et al. Potassium Disorders: Clinical Spectrum and Emergency Management. Resuscitation. 2006;70:10-25</li>
            <li>Rossignol P, et al. Emergency Management of Severe Hyperkalemia: Guideline for Best Practice. Nat Rev Nephrol. 2016;12:573-585</li>
            <li>Mount DB. Disorders of Potassium Balance. In: Brenner & Rector's The Kidney, 11th Edition</li>
            <li>Palmer BF, Clegg DJ. Diagnosis and Treatment of Hyperkalemia. Cleve Clin J Med. 2017;84:934-942</li>
            <li>UpToDate: Treatment and prevention of hyperkalemia in adults (2023)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link to="/algorithms">
          <Button>Hyperkalemia Algorithm</Button>
        </Link>
        <Link to="/cases">
          <Button variant="outline">Practice Cases</Button>
        </Link>
      </div>
    </div>
  )
}
