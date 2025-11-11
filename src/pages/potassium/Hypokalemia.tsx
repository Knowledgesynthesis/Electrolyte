import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Activity, Heart } from 'lucide-react'

export default function Hypokalemia() {
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
          <Activity className="w-10 h-10 text-blue-500" />
          Hypokalemia
        </h1>
        <p className="text-xl text-muted-foreground">
          Serum potassium {"<"} 3.5 mmol/L — Diagnosis and management
        </p>
      </div>

      {/* Critical Safety Warning */}
      <div className="safety-warning mb-8">
        <p className="font-bold text-lg mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Critical Safety Considerations
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <strong>⚠️ ALWAYS check magnesium in hypokalemia!</strong> Hypomagnesemia causes refractory hypokalemia by increasing renal K⁺ wasting. Cannot correct K⁺ until Mg²⁺ is repleted.
          </p>
          <p>
            <strong>IV K⁺ administration:</strong> Maximum 10-20 mEq/hr via peripheral line (40 mEq/hr via central line). Faster rates risk cardiac arrest. Never give IV push.
          </p>
          <p>
            <strong>Digoxin toxicity:</strong> Hypokalemia potentiates digoxin toxicity. Check digoxin level and correct K⁺ cautiously.
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
                <p className="text-2xl">3.0-3.4 mmol/L</p>
                <p className="text-sm text-muted-foreground">Often asymptomatic</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-bold">Moderate</p>
                <p className="text-2xl">2.5-2.9 mmol/L</p>
                <p className="text-sm text-muted-foreground">Weakness, cramps, constipation</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-bold">Severe</p>
                <p className="text-2xl">{"<"} 2.5 mmol/L</p>
                <p className="text-sm text-muted-foreground">Paralysis, rhabdomyolysis, arrhythmias</p>
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
            ECG Changes in Hypokalemia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">Progressive ECG changes correlate with severity (appear around K⁺ {"<"} 3.0):</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 p-2 bg-muted rounded">
                <span className="font-bold min-w-[120px]">Early:</span>
                <span>T wave flattening, ST depression</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-muted rounded">
                <span className="font-bold min-w-[120px]">Moderate:</span>
                <span><strong>U waves</strong> (most characteristic finding — small positive deflection after T wave)</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-muted rounded">
                <span className="font-bold min-w-[120px]">Severe:</span>
                <span>Prolonged QT interval, ventricular ectopy, PVCs</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-red-100 dark:bg-red-900/30 rounded">
                <span className="font-bold min-w-[120px]">Life-threatening:</span>
                <span>Ventricular tachycardia, ventricular fibrillation, torsades de pointes</span>
              </div>
            </div>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded mt-3">
              <p className="font-bold mb-1">Clinical Pearl:</p>
              <p className="text-xs">
                Hypokalemia + digoxin = dangerous combination. Both cause similar ECG changes (T flattening, U waves) and hypokalemia increases myocardial sensitivity to digoxin, predisposing to digoxin-induced arrhythmias.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Approach */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Diagnostic Approach: 3-Step Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-lg mb-2">Step 1: Rule Out Transcellular Shift</p>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded">
                <p className="text-sm mb-2">K⁺ shifts INTO cells (serum K⁺ low but total body K⁺ normal):</p>
                <ul className="text-sm space-y-1">
                  <li>• Insulin excess (DKA treatment, insulin overdose)</li>
                  <li>• β2-agonists (albuterol, terbutaline)</li>
                  <li>• Alkalosis (metabolic or respiratory)</li>
                  <li>• Refeeding syndrome</li>
                  <li>• Hypothermia</li>
                  <li>• Familial hypokalemic periodic paralysis (rare)</li>
                </ul>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Step 2: Assess 24hr Urine K⁺ or Spot Urine K⁺/Cr Ratio</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-bold mb-2">Urine K⁺ {"<"} 20 mEq/day</p>
                  <p className="text-sm mb-2">Appropriate renal conservation → <strong>Extrarenal losses</strong></p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">GI Losses:</p>
                      <p className="text-xs">Diarrhea, vomiting (gastric fluid only 5-10 mEq/L K⁺, but triggers renal losses via metabolic alkalosis), laxative abuse, villous adenoma, VIPoma</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Inadequate Intake:</p>
                      <p className="text-xs">Tea-and-toast diet, anorexia nervosa (rare as sole cause)</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Skin Losses:</p>
                      <p className="text-xs">Excessive sweating (rare)</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-bold mb-2">Urine K⁺ {">"}20 mEq/day</p>
                  <p className="text-sm mb-2">Inappropriate renal wasting → <strong>Renal losses</strong></p>
                  <p className="text-xs mb-2 italic">Proceed to Step 3 (check blood pressure)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Step 3: For Renal Losses — Assess Blood Pressure & Acid-Base</p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold mb-1">Hypertension + Hypokalemia</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Primary Hyperaldosteronism</p>
                      <p className="text-xs">Adenoma or bilateral hyperplasia. Check aldosterone/renin ratio. Metabolic alkalosis common.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Renovascular HTN</p>
                      <p className="text-xs">↑ Renin → ↑ Aldosterone (secondary hyperaldosteronism)</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Cushing Syndrome</p>
                      <p className="text-xs">Cortisol has mineralocorticoid activity. Check 24hr urine cortisol, dexamethasone suppression test.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Liddle Syndrome</p>
                      <p className="text-xs">Genetic: Constitutively active ENaC. Low aldosterone, low renin.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-bold mb-1">Normotensive + Hypokalemia</p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-primary/10 p-3 rounded">
                      <p className="font-bold mb-1">Diuretics (Most Common Cause)</p>
                      <p className="text-xs">Loop diuretics (furosemide) and thiazides → ↑ distal Na⁺ delivery → ↑ K⁺ secretion. Metabolic alkalosis typically present.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Renal Tubular Acidosis (Type 1 or 2)</p>
                      <p className="text-xs">Metabolic acidosis + hypokalemia. Type 1 (distal RTA): urine pH {">"}5.5 despite acidosis.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Hypomagnesemia</p>
                      <p className="text-xs"><strong>MUST CHECK!</strong> Mg²⁺ deficiency causes renal K⁺ wasting. Common with diuretics, diarrhea, PPI use.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Bartter/Gitelman Syndromes</p>
                      <p className="text-xs">Genetic tubulopathies mimicking loop/thiazide diuretics. Metabolic alkalosis, normal BP.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hypomagnesemia */}
      <Card className="mb-8 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle>CRITICAL: The Magnesium-Potassium Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-bold">
              Up to 40% of patients with hypokalemia have concurrent hypomagnesemia.
            </p>
            <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
              <p className="font-semibold mb-2">Why Hypokalemia is Refractory with Low Mg²⁺:</p>
              <ul className="text-sm space-y-1">
                <li>• Mg²⁺ is required for Na-K-ATPase function → without Mg²⁺, can't maintain K⁺ gradient</li>
                <li>• Low Mg²⁺ → increased ROMK activity in collecting duct → renal K⁺ wasting</li>
                <li>• Both are lost together (diarrhea, diuretics, alcohol, PPI use)</li>
              </ul>
            </div>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <p className="font-bold mb-1">Clinical Rule:</p>
              <p className="text-sm">
                <strong>ALWAYS check serum magnesium in hypokalemia.</strong> If Mg²⁺ is low, replete BOTH. K⁺ repletion will fail without adequate Mg²⁺.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Treatment Approach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded">
              <p className="font-bold text-lg mb-2">Severe Symptomatic Hypokalemia (K⁺ {"<"}2.5 or Arrhythmias)</p>
              <p className="text-sm mb-2"><strong>IV potassium chloride (KCl)</strong></p>
              <ul className="text-sm space-y-1">
                <li>• Peripheral line: 10 mEq/hr (max 20 mEq/hr)</li>
                <li>• Central line: 20-40 mEq/hr (for emergencies only)</li>
                <li>• Continuous cardiac monitoring required</li>
                <li>• Check K⁺ every 2-4 hours</li>
                <li>• Each 10 mEq given raises serum K⁺ by ~0.1 mmol/L</li>
              </ul>
              <p className="text-sm font-bold mt-2">⚠️ Never give IV KCl as bolus/push — risk of cardiac arrest</p>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Oral Potassium Repletion (Preferred for Mild-Moderate)</p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">Potassium Chloride (KCl)</p>
                  <p className="text-sm">20-40 mEq PO 2-4 times daily (max 80-100 mEq/day divided doses)</p>
                  <p className="text-xs mt-1">Preferred for metabolic alkalosis (provides Cl⁻). GI side effects common (nausea, GI upset).</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold">Potassium Phosphate or Citrate</p>
                  <p className="text-sm">Alternative formulations for specific situations</p>
                  <p className="text-xs mt-1">K-Phos for hypophosphatemia. K-citrate for metabolic acidosis (RTA).</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Dietary Sources</p>
                  <p className="text-sm">High-K⁺ foods: Bananas, oranges, potatoes, spinach, beans, yogurt</p>
                  <p className="text-xs mt-1">Each serving ~10-15 mEq. Good for mild hypokalemia or prevention.</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Potassium-Sparing Diuretics (for Chronic Management)</p>
              <div className="space-y-2 text-sm">
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Spironolactone (Aldactone) 25-100 mg daily</p>
                  <p className="text-xs">Aldosterone antagonist. Use in hyperaldosteronism. Side effects: Gynecomastia, hyperkalemia.</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Amiloride 5-10 mg daily</p>
                  <p className="text-xs">ENaC blocker. Preferred for Liddle syndrome, lithium-induced hypokalemia.</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Triamterene 50-100 mg daily</p>
                  <p className="text-xs">ENaC blocker. Similar to amiloride. Can cause kidney stones.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-4 rounded">
              <p className="font-bold mb-2">Repletion Guidelines</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Estimate deficit:</strong> Each 0.3 mmol/L ↓ in K⁺ ≈ 100 mEq total body deficit (rough estimate)</li>
                <li>• <strong>Check Mg²⁺:</strong> Correct hypomagnesemia first or simultaneously</li>
                <li>• <strong>Treat underlying cause:</strong> Stop offending drugs, treat diarrhea, address hyperaldosteronism</li>
                <li>• <strong>Monitor closely:</strong> Recheck K⁺ after repletion. Risk of rebound hyperkalemia if given too aggressively.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card className="mb-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Hypokalemia + metabolic alkalosis:</strong> Think diuretics, vomiting, or hyperaldosteronism. Alkalosis shifts K⁺ into cells AND increases renal K⁺ wasting.</li>
            <li>• <strong>Hypokalemia + metabolic acidosis:</strong> Think RTA (renal tubular acidosis) or diarrhea (GI HCO₃⁻ losses).</li>
            <li>• <strong>Vomiting paradox:</strong> Gastric fluid is low in K⁺, but metabolic alkalosis from HCl loss triggers secondary hyperaldosteronism → renal K⁺ wasting.</li>
            <li>• <strong>Loop vs thiazide:</strong> Loop diuretics cause more severe hypokalemia than thiazides due to greater distal Na⁺ delivery.</li>
            <li>• <strong>Chronic hypokalemia complications:</strong> Nephrogenic DI, chronic kidney disease (tubulointerstitial nephritis), glucose intolerance (impaired insulin secretion).</li>
            <li>• <strong>Pseudohypokalemia:</strong> Rare. Occurs in acute leukemia with very high WBC ({">"} 100k) — cells take up K⁺ in test tube at room temp.</li>
            <li>• <strong>Rhabdomyolysis risk:</strong> Severe hypokalemia ({"<"}2.5) can cause muscle breakdown → myoglobinuria, AKI. Check CK.</li>
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
            <li>Gennari FJ. Hypokalemia. N Engl J Med. 1998;339:451-458</li>
            <li>Mount DB. Disorders of Potassium Balance. In: Brenner & Rector's The Kidney, 11th Edition</li>
            <li>Palmer BF, Clegg DJ. Diagnosis and Treatment of Hypokalemia. Cleve Clin J Med. 2021;88:385-396</li>
            <li>UpToDate: Clinical manifestations and treatment of hypokalemia in adults (2023)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link to="/calculators">
          <Button>K⁺ Deficit Calculator</Button>
        </Link>
        <Link to="/interactions">
          <Button variant="outline">K-Mg Interactions</Button>
        </Link>
        <Link to="/cases">
          <Button variant="outline">Practice Cases</Button>
        </Link>
      </div>
    </div>
  )
}
