import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Activity, Heart } from 'lucide-react'

export default function Hypomagnesemia() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/magnesium">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Magnesium
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Activity className="w-10 h-10 text-emerald-500" />
          Hypomagnesemia
        </h1>
        <p className="text-xl text-muted-foreground">
          Serum magnesium {"<"} 1.5 mg/dL — The "forgotten electrolyte" disorder
        </p>
      </div>

      {/* Critical Safety Warning */}
      <div className="safety-warning mb-8">
        <p className="font-bold text-lg mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Critical Clinical Implications
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <strong>⚠️ Hypomagnesemia causes REFRACTORY hypokalemia and hypocalcemia.</strong> Cannot correct K⁺ or Ca²⁺ until Mg²⁺ is repleted. Always check magnesium!
          </p>
          <p>
            <strong>Arrhythmia risk:</strong> Hypomagnesemia predisposes to torsades de pointes, especially with concurrent hypokalemia or QT-prolonging drugs. Mg²⁺ sulfate is first-line treatment for torsades.
          </p>
          <p>
            <strong>IV magnesium administration:</strong> Give slowly (1-2 g over 15-60 min) to avoid hypotension, flushing, and arrhythmias. Faster rates only for torsades or eclampsia.
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
                <p className="text-2xl">1.2-1.5 mg/dL</p>
                <p className="text-sm text-muted-foreground">Often asymptomatic</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-bold">Moderate</p>
                <p className="text-2xl">1.0-1.2 mg/dL</p>
                <p className="text-sm text-muted-foreground">Cramps, tremor, weakness</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-bold">Severe</p>
                <p className="text-2xl">{"<"} 1.0 mg/dL</p>
                <p className="text-sm text-muted-foreground">Tetany, seizures, arrhythmias</p>
              </div>
            </div>
            <p className="text-sm mt-4 bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <strong>Important:</strong> Serum Mg²⁺ poorly reflects total body stores. Normal serum levels don't exclude deficiency. Clinical suspicion should guide treatment even with "normal" levels.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Manifestations */}
      <Card className="mb-8 bg-emerald-50 dark:bg-emerald-950/30">
        <CardHeader>
          <CardTitle>Clinical Manifestations: Neuromuscular & Cardiac</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Symptoms overlap with hypocalcemia and hypokalemia (often coexist). Many patients are asymptomatic despite low levels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="border-l-4 border-purple-500 pl-3">
                <p className="font-bold mb-1">Neuromuscular (Most Common)</p>
                <ul className="text-xs space-y-1">
                  <li>• Muscle cramps, fasciculations, tremor</li>
                  <li>• Weakness, fatigue</li>
                  <li>• Tetany (similar to hypocalcemia)</li>
                  <li>• Positive Chvostek/Trousseau signs</li>
                  <li>• Vertigo, ataxia</li>
                  <li>• Seizures (rare, severe deficiency)</li>
                </ul>
              </div>
              <div className="border-l-4 border-red-500 pl-3">
                <p className="font-bold mb-1">Cardiac</p>
                <ul className="text-xs space-y-1">
                  <li>• Atrial and ventricular arrhythmias</li>
                  <li>• <strong>Torsades de pointes</strong> (especially with hypokalemia)</li>
                  <li>• Prolonged QT interval</li>
                  <li>• Enhanced sensitivity to digoxin</li>
                  <li>• Refractory VF in cardiac arrest</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-bold mb-1">Electrolyte Disorders</p>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Hypokalemia (refractory)</strong> — cannot correct without Mg²⁺</li>
                  <li>• <strong>Hypocalcemia (refractory)</strong> — impaired PTH secretion/action</li>
                  <li>• Both present in 30-50% of cases</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-bold mb-1">Neuropsychiatric</p>
                <ul className="text-xs space-y-1">
                  <li>• Depression, anxiety, irritability</li>
                  <li>• Confusion, delirium</li>
                  <li>• Personality changes</li>
                  <li>• Nystagmus</li>
                </ul>
              </div>
              <div className="border-l-4 border-orange-500 pl-3">
                <p className="font-bold mb-1">Other</p>
                <ul className="text-xs space-y-1">
                  <li>• Anorexia, nausea, vomiting</li>
                  <li>• Dysphagia</li>
                  <li>• Metabolic bone disease (chronic)</li>
                </ul>
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
            ECG Changes & Torsades de Pointes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">ECG changes similar to hypokalemia/hypocalcemia (often combined):</p>
            <div className="space-y-2 text-sm">
              <div className="bg-muted p-2 rounded">
                <p className="font-semibold">Prolonged QT interval</p>
                <p className="text-xs">Increased risk of torsades de pointes, especially with concurrent hypokalemia or QT-prolonging medications</p>
              </div>
              <div className="bg-muted p-2 rounded">
                <p className="font-semibold">T wave changes</p>
                <p className="text-xs">Flattening or inversion (nonspecific)</p>
              </div>
              <div className="bg-muted p-2 rounded">
                <p className="font-semibold">U waves</p>
                <p className="text-xs">May be present (also seen in hypokalemia)</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                <p className="font-semibold">Torsades de Pointes (Polymorphic VT)</p>
                <p className="text-xs">Characteristic "twisting of the points" pattern. <strong>Mg²⁺ sulfate 2 g IV is first-line treatment</strong> regardless of Mg²⁺ level.</p>
              </div>
            </div>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <p className="font-bold mb-1">Clinical Pearl:</p>
              <p className="text-xs">
                Hypomagnesemia + hypokalemia + QT-prolonging drug (e.g., macrolides, antipsychotics, fluoroquinolones) = high risk for sudden cardiac death. Correct both electrolytes and review medications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Approach */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Diagnostic Approach: GI vs Renal Losses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-lg mb-2">Step 1: Measure 24-hour Urine Mg²⁺ (or Fractional Excretion)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-bold mb-2">Urine Mg²⁺ {"<"} 10-30 mg/day</p>
                  <p className="text-sm mb-2">Appropriate renal conservation → <strong>Extrarenal losses</strong></p>
                  <p className="text-xs">(FE Mg {"<"}2% indicates appropriate conservation)</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-bold mb-2">Urine Mg²⁺ {">"}30 mg/day</p>
                  <p className="text-sm mb-2">Inappropriate renal wasting → <strong>Renal losses</strong></p>
                  <p className="text-xs">(FE Mg {">"}2% indicates renal wasting)</p>
                </div>
              </div>
              <p className="text-xs mt-3 italic">FE Mg = (Urine Mg × Serum Cr) / (0.7 × Serum Mg × Urine Cr) × 100</p>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Etiology by Category</p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold mb-1">Gastrointestinal Losses (Low Urine Mg²⁺)</p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-primary/10 p-3 rounded">
                      <p className="font-bold mb-1">Chronic Diarrhea</p>
                      <p className="text-xs">IBD (Crohn's, ulcerative colitis), chronic laxative abuse, infectious diarrhea, intestinal fistula</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Malabsorption</p>
                      <p className="text-xs">Celiac disease, short bowel syndrome, post-gastric bypass, chronic pancreatitis, Whipple disease</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Proton Pump Inhibitors (PPIs)</p>
                      <p className="text-xs">Chronic use (especially {">"}1 year) impairs intestinal Mg²⁺ absorption via TRPM6/7 channels. <strong>Increasingly common cause.</strong></p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Inadequate Intake</p>
                      <p className="text-xs">Alcoholism (poor diet), malnutrition, eating disorders (rare as sole cause)</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Acute Pancreatitis</p>
                      <p className="text-xs">Mg²⁺ saponification in necrotic fat</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-bold mb-1">Renal Losses (High Urine Mg²⁺)</p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-red-100 dark:bg-red-950/30 p-3 rounded">
                      <p className="font-bold mb-1">Medications (Most Common)</p>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Loop diuretics (furosemide)</strong> — block TAL reabsorption, most potent</li>
                        <li>• <strong>Thiazide diuretics</strong> — less effect than loops but still significant</li>
                        <li>• <strong>Aminoglycosides</strong> (gentamicin, tobramycin) — tubular toxicity</li>
                        <li>• <strong>Cisplatin</strong> — tubular damage (can be irreversible)</li>
                        <li>• <strong>Amphotericin B</strong> — tubular dysfunction</li>
                        <li>• <strong>Pentamidine</strong> — tubular damage</li>
                        <li>• <strong>Calcineurin inhibitors</strong> (cyclosporine, tacrolimus)</li>
                        <li>• <strong>Foscarnet</strong></li>
                      </ul>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Alcohol Abuse</p>
                      <p className="text-xs">Direct renal tubular effect + GI losses + poor intake. Multifactorial. Very common cause.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Diabetic Ketoacidosis / Hyperglycemia</p>
                      <p className="text-xs">Osmotic diuresis → Mg²⁺ wasting. Also seen with SGLT2 inhibitors.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Hypercalcemia / Hypercalciuria</p>
                      <p className="text-xs">Ca²⁺ competes with Mg²⁺ for reabsorption in TAL</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Genetic Tubulopathies</p>
                      <p className="text-xs">Gitelman syndrome (most common — hypokalemia + hypomagnesemia + metabolic alkalosis), Bartter syndrome (usually normal Mg²⁺)</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Post-Obstructive Diuresis / Post-ATN</p>
                      <p className="text-xs">Recovery phase of AKI → tubular dysfunction</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Primary Hyperaldosteronism</p>
                      <p className="text-xs">Increased distal Na⁺ delivery → Mg²⁺ wasting (similar to K⁺)</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-bold mb-1">Redistribution / Other</p>
                  <div className="space-y-1 text-sm mt-2">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Refeeding Syndrome</p>
                      <p className="text-xs">Insulin surge → Mg²⁺ (and K⁺, PO₄³⁻) shift into cells. Occurs when refeeding malnourished patients.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Hungry Bone Syndrome</p>
                      <p className="text-xs">After parathyroidectomy → rapid bone uptake of Mg²⁺, Ca²⁺, PO₄³⁻</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Acute Illness / Burns</p>
                      <p className="text-xs">Increased catecholamines → intracellular shift</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Electrolyte Interactions */}
      <Card className="mb-8 bg-gradient-to-br from-emerald-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle>CRITICAL: Check and Correct K⁺ and Ca²⁺</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-bold">
              Up to 50% of patients with hypomagnesemia have concurrent hypokalemia and/or hypocalcemia.
            </p>
            <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
              <p className="font-bold mb-2">Why K⁺ and Ca²⁺ are Refractory without Mg²⁺:</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Hypokalemia:</strong> Mg²⁺ required for Na-K-ATPase. Low Mg²⁺ → increased ROMK → renal K⁺ wasting.</li>
                <li>• <strong>Hypocalcemia:</strong> Severe hypomagnesemia → impaired PTH secretion + PTH resistance.</li>
              </ul>
            </div>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <p className="font-bold mb-1">Clinical Rule:</p>
              <p className="text-sm">
                <strong>ALWAYS check Mg²⁺ in refractory hypokalemia or hypocalcemia. Replete Mg²⁺ FIRST.</strong> Cannot correct K⁺ or Ca²⁺ without adequate Mg²⁺. Check all three electrolytes together.
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
              <p className="font-bold text-lg mb-2">Severe Symptomatic Hypomagnesemia (Torsades, Seizures, Severe Symptoms)</p>
              <div className="space-y-2 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Magnesium Sulfate 2-4 grams (16-32 mEq) IV</p>
                  <p>• <strong>For torsades de pointes:</strong> 2 g IV push over 1-2 min, repeat if needed</p>
                  <p>• <strong>For other emergencies:</strong> 1-2 g IV over 15 min, then 4-6 g over 24 hrs</p>
                  <p>• Monitor: Cardiac monitoring, check reflexes (loss of DTRs indicates Mg toxicity)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Moderate-Severe Asymptomatic (Mg²⁺ {"<"}1.2 mg/dL)</p>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-semibold">IV Magnesium Sulfate (Faster Repletion)</p>
                  <p className="text-xs mb-1">• <strong>4-6 grams (32-48 mEq) in 1 L NS over 4-6 hours</strong></p>
                  <p className="text-xs mb-1">• Then 4 grams per day (continuous infusion or divided doses) until replete</p>
                  <p className="text-xs mb-1">• Each 1 g MgSO₄ = 8 mEq = 98 mg elemental Mg²⁺</p>
                  <p className="text-xs mb-1">• Recheck Mg²⁺ after 24 hours</p>
                  <p className="text-xs">• Slower infusion if renal impairment (reduce dose by 50%)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Mild or Chronic Hypomagnesemia (Mg²⁺ 1.2-1.5 mg/dL)</p>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-semibold">Oral Magnesium (Preferred for Chronic)</p>
                  <div className="space-y-2 text-xs mt-2">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Magnesium Oxide 400-800 mg PO daily-BID</p>
                      <p>60% elemental Mg, but poorly absorbed (4%). Cheap. Often causes diarrhea at higher doses.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Magnesium Chloride 535 mg (64 mg elemental) PO TID</p>
                      <p>Better absorbed than oxide. Less GI side effects.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Magnesium Citrate 300-400 mg elemental PO daily</p>
                      <p>Well absorbed. Laxative effect (use for constipation).</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Magnesium Gluconate 500 mg (27 mg elemental) PO TID-QID</p>
                      <p>Well absorbed. Less diarrhea. Good for maintenance.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Magnesium L-aspartate / Mg-lactate</p>
                      <p>Excellent absorption. Minimal GI effects. More expensive.</p>
                    </div>
                  </div>
                  <p className="text-xs mt-2"><strong>Note:</strong> GI absorption limited to 30-50%. Divide doses (TID-QID) for better absorption. Diarrhea is dose-limiting.</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-3">
                  <p className="font-semibold">Dietary Sources</p>
                  <p className="text-xs">Green leafy vegetables (spinach, Swiss chard), nuts (almonds, cashews), seeds (pumpkin, sunflower), legumes, whole grains, dark chocolate, avocado</p>
                  <p className="text-xs mt-1">Typical diet provides 300-400 mg/day. Recommend increasing dietary Mg²⁺ for mild deficiency or maintenance.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-4 rounded">
              <p className="font-bold mb-2">General Treatment Principles</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Estimate deficit:</strong> Hard to calculate (poor correlation between serum and total body). Empiric repletion often needed.</li>
                <li>• <strong>Correct concurrent electrolytes:</strong> Replete K⁺, Ca²⁺, and phosphate simultaneously if low.</li>
                <li>• <strong>Treat underlying cause:</strong> Stop offending drugs (diuretics, PPIs), address alcohol use, treat diarrhea/malabsorption.</li>
                <li>• <strong>Recheck levels:</strong> Mg²⁺ after 24 hrs (IV) or 1 week (PO). May take several days to normalize.</li>
                <li>• <strong>Renal impairment:</strong> Reduce IV Mg²⁺ dose by 50% if GFR {"<"}30. Risk of hypermagnesemia.</li>
                <li>• <strong>Monitor for toxicity:</strong> Loss of deep tendon reflexes (DTRs) indicates hypermagnesemia. Stop infusion if reflexes absent.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card className="mb-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>PPI-induced hypomagnesemia:</strong> Increasingly recognized. Chronic PPI use impairs intestinal absorption. Consider discontinuing PPI or switching to H2 blocker if hypomagnesemia develops.</li>
            <li>• <strong>Torsades de pointes:</strong> Mg²⁺ sulfate 2 g IV is first-line treatment regardless of Mg²⁺ level (membrane-stabilizing effect). Works even with normal Mg²⁺.</li>
            <li>• <strong>Alcohol and Mg²⁺:</strong> Triple hit — poor intake, GI losses, renal wasting. Also get refeeding syndrome during recovery. Replete aggressively in alcohol use disorder.</li>
            <li>• <strong>Gitelman syndrome clue:</strong> Young patient with chronic hypokalemia + hypomagnesemia + metabolic alkalosis + hypocalciuria. Genetic defect in NCC (thiazide-sensitive cotransporter).</li>
            <li>• <strong>Refractory VF in cardiac arrest:</strong> Consider hypomagnesemia. Give Mg²⁺ sulfate 1-2 g IV push even without lab confirmation.</li>
            <li>• <strong>Oral repletion is slow:</strong> Takes 1-2 weeks to normalize total body stores with oral Mg²⁺. IV faster but oral better for chronic management.</li>
            <li>• <strong>Diarrhea-limited dosing:</strong> Main side effect of oral Mg²⁺. Start low, divide doses. Magnesium oxide is worst offender. Use better-absorbed forms if diarrhea occurs.</li>
            <li>• <strong>Normal Mg²⁺ doesn't exclude deficiency:</strong> Consider trial of supplementation if high clinical suspicion (refractory K⁺, unexplained symptoms) even with normal serum level.</li>
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
            <li>Huang CL, Kuo E. Mechanism of Hypokalemia in Magnesium Deficiency. J Am Soc Nephrol. 2007;18:2649-2652</li>
            <li>de Baaij JHF, et al. Magnesium in Man: Implications for Health and Disease. Physiol Rev. 2015;95:1-46</li>
            <li>Jahnen-Dechent W, Ketteler M. Magnesium Basics. Clin Kidney J. 2012;5(Suppl 1):i3-i14</li>
            <li>UpToDate: Clinical manifestations and treatment of hypomagnesemia (2023)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link to="/interactions">
          <Button>Mg-K-Ca Interactions</Button>
        </Link>
        <Link to="/cases">
          <Button variant="outline">Practice Cases</Button>
        </Link>
      </div>
    </div>
  )
}
