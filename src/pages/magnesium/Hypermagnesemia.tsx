import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Activity, Zap } from 'lucide-react'

export default function Hypermagnesemia() {
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
          <Zap className="w-10 h-10 text-red-500" />
          Hypermagnesemia
        </h1>
        <p className="text-xl text-muted-foreground">
          Serum magnesium {">"}2.5 mg/dL — Rare but potentially life-threatening
        </p>
      </div>

      {/* Critical Safety Warning */}
      <div className="safety-warning mb-8">
        <p className="font-bold text-lg mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Life-Threatening Complications
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Severe hypermagnesemia (Mg²⁺ {">"}6 mg/dL) can cause respiratory paralysis and cardiac arrest.</strong> Progressive loss of reflexes → respiratory depression → complete heart block → asystole.
          </p>
          <p>
            <strong>Emergency treatment:</strong> Stop all Mg²⁺ sources immediately. Calcium gluconate 10-20 mL IV (antagonizes Mg²⁺ effects). Hemodialysis for severe cases or renal failure.
          </p>
          <p>
            <strong>Prevention is key:</strong> Avoid Mg²⁺ administration in renal failure. Monitor levels when giving IV Mg²⁺, especially in CKD/AKI.
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
                <p className="text-2xl">2.5-4.0 mg/dL</p>
                <p className="text-sm text-muted-foreground">Usually asymptomatic</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-bold">Moderate</p>
                <p className="text-2xl">4.0-6.0 mg/dL</p>
                <p className="text-sm text-muted-foreground">Hyporeflexia, weakness, nausea</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-bold">Severe</p>
                <p className="text-2xl">{">"}6.0 mg/dL</p>
                <p className="text-sm text-muted-foreground">Paralysis, bradycardia, cardiac arrest</p>
              </div>
            </div>
            <p className="text-sm mt-4 bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <strong>Important:</strong> Hypermagnesemia is rare in patients with normal kidney function. Almost always occurs in context of renal impairment + exogenous Mg²⁺ administration.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Manifestations */}
      <Card className="mb-8 bg-red-50 dark:bg-red-950/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Clinical Manifestations: Progressive Neuromuscular Blockade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm font-bold">
              Symptoms correlate with Mg²⁺ level and develop progressively. Mg²⁺ acts as physiologic calcium channel blocker.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                <p className="font-bold mb-1">Mg²⁺ 3-4 mg/dL (Mild)</p>
                <ul className="text-sm space-y-1">
                  <li>• Nausea, vomiting</li>
                  <li>• Facial flushing, warmth</li>
                  <li>• Lethargy, mild weakness</li>
                  <li>• Usually asymptomatic</li>
                </ul>
              </div>

              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded">
                <p className="font-bold mb-1">Mg²⁺ 4-6 mg/dL (Moderate)</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Hyporeflexia</strong> (diminished deep tendon reflexes) — earliest reliable sign</li>
                  <li>• Muscle weakness</li>
                  <li>• Hypotension</li>
                  <li>• Bradycardia</li>
                  <li>• ECG changes (prolonged PR, widened QRS)</li>
                  <li>• Drowsiness, confusion</li>
                </ul>
              </div>

              <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded">
                <p className="font-bold mb-1">Mg²⁺ 6-10 mg/dL (Severe)</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Areflexia</strong> (loss of deep tendon reflexes)</li>
                  <li>• Severe hypotension</li>
                  <li>• Respiratory depression (muscular weakness)</li>
                  <li>• Paralysis</li>
                  <li>• Somnolence → coma</li>
                  <li>• Complete heart block</li>
                </ul>
              </div>

              <div className="p-3 bg-red-200 dark:bg-red-800 rounded">
                <p className="font-bold mb-1">Mg²⁺ {">"}10 mg/dL (Life-Threatening)</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Respiratory arrest</strong> (diaphragm paralysis)</li>
                  <li>• <strong>Cardiac arrest</strong> (asystole)</li>
                  <li>• Coma</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded mt-4">
              <p className="font-bold mb-1">Key Clinical Sign:</p>
              <p className="text-sm">
                <strong>Loss of deep tendon reflexes (DTRs)</strong> occurs around Mg²⁺ 6-7 mg/dL and is the most reliable clinical indicator of dangerous hypermagnesemia. Check reflexes regularly when giving IV Mg²⁺. Stop infusion if reflexes are absent.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ECG Changes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ECG Changes in Hypermagnesemia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">Progressive cardiac conduction abnormalities (similar to hyperkalemia but less predictable):</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 p-2 bg-muted rounded">
                <span className="font-bold min-w-[120px]">Mg²⁺ 5-7:</span>
                <span>Prolonged PR interval, prolonged QT interval</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-muted rounded">
                <span className="font-bold min-w-[120px]">Mg²⁺ 7-10:</span>
                <span>Widened QRS complex, tall T waves (may resemble hyperkalemia)</span>
              </div>
              <div className="flex items-start gap-3 p-2 bg-red-100 dark:bg-red-900/30 rounded">
                <span className="font-bold min-w-[120px]">Mg²⁺ {">"}10:</span>
                <span>Complete heart block, asystole</span>
              </div>
            </div>
            <p className="text-xs mt-3 italic">Note: ECG changes are less consistent than with hyperkalemia. Clinical symptoms (especially reflexes) are more reliable.</p>
          </div>
        </CardContent>
      </Card>

      {/* Etiology */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Etiology: Almost Always Iatrogenic + Renal Impairment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm font-bold bg-amber-100 dark:bg-amber-950 p-3 rounded">
              Hypermagnesemia is RARE in patients with normal renal function. Kidneys can excrete up to 5 g Mg²⁺ per day. Hypermagnesemia requires: (1) Renal impairment (GFR {"<"}30) AND (2) Increased Mg²⁺ intake/administration.
            </p>

            <div>
              <p className="font-bold text-lg mb-2">Common Causes (Iatrogenic)</p>
              <div className="space-y-2 text-sm">
                <div className="bg-red-100 dark:bg-red-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Magnesium-Containing Medications (in CKD/AKI)</p>
                  <ul className="space-y-1 text-xs ml-4">
                    <li>• <strong>Magnesium-containing antacids</strong> (Maalox, Mylanta, Milk of Magnesia) — most common cause</li>
                    <li>• <strong>Magnesium-containing laxatives</strong> (magnesium citrate, magnesium hydroxide, Epsom salts)</li>
                    <li>• <strong>Magnesium enemas</strong> (can be absorbed, especially with colonic perforation/mucosal injury)</li>
                    <li>• <strong>Magnesium-containing cathartics</strong> (bowel prep solutions)</li>
                  </ul>
                  <p className="text-xs mt-2"><strong>Classic scenario:</strong> Elderly patient with CKD using Mg-containing antacids for years.</p>
                </div>

                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded">
                  <p className="font-bold mb-1">IV/IM Magnesium Administration</p>
                  <ul className="space-y-1 text-xs ml-4">
                    <li>• <strong>Eclampsia/pre-eclampsia treatment</strong> — loading dose 4-6 g IV, then 1-2 g/hr infusion. Monitor closely.</li>
                    <li>• <strong>Torsades de pointes treatment</strong> — usually safe single dose, but monitor if repeated</li>
                    <li>• <strong>Severe asthma</strong> — 2 g IV bolus (rarely causes toxicity)</li>
                    <li>• <strong>Overly aggressive repletion</strong> in hypomagnesemia with concurrent renal impairment</li>
                  </ul>
                </div>

                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Acute/Chronic Kidney Disease</p>
                  <p className="text-xs">GFR {"<"}30 mL/min → impaired Mg²⁺ excretion. Mild hypermagnesemia common in ESRD (usually 2.5-3.5 mg/dL), rarely symptomatic unless exogenous Mg²⁺ given.</p>
                </div>

                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Tumor Lysis Syndrome</p>
                  <p className="text-xs">Massive cell lysis → release of intracellular Mg²⁺, K⁺, PO₄³⁻. Usually concurrent with AKI.</p>
                </div>

                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Rhabdomyolysis</p>
                  <p className="text-xs">Muscle breakdown → release of intracellular Mg²⁺. Concurrent AKI impairs excretion.</p>
                </div>

                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Lithium Therapy</p>
                  <p className="text-xs">Increases renal Mg²⁺ reabsorption (rare cause of hypermagnesemia)</p>
                </div>

                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Hypothyroidism</p>
                  <p className="text-xs">Decreased GFR and increased tubular reabsorption (very rare, usually mild)</p>
                </div>

                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Familial Hypocalciuric Hypercalcemia (FHH)</p>
                  <p className="text-xs">CaSR mutation → increased Mg²⁺ reabsorption (mild hypermagnesemia, usually asymptomatic)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Rare Causes</p>
              <div className="space-y-1 text-sm">
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Adrenal Insufficiency (Addison's Disease)</p>
                  <p className="text-xs">Decreased GFR from volume depletion</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Massive Blood Transfusion</p>
                  <p className="text-xs">Stored blood accumulates Mg²⁺ over time</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Milk-Alkali Syndrome</p>
                  <p className="text-xs">Excessive Ca²⁺/Mg²⁺ carbonate ingestion + AKI</p>
                </div>
              </div>
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
              <p className="font-bold text-lg mb-2">Severe Symptomatic Hypermagnesemia (Mg²⁺ {">"}6 OR Areflexia/Respiratory Depression)</p>
              <div className="space-y-3 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">1. STOP All Magnesium Sources Immediately</p>
                  <p className="text-xs">Discontinue all Mg-containing medications, IV fluids, laxatives, antacids, enemas</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">2. Calcium Gluconate 10% 1-2 grams (10-20 mL) IV over 5-10 min</p>
                  <p className="text-xs">• Direct antagonist of Mg²⁺ effects on neuromuscular and cardiac tissue</p>
                  <p className="text-xs">• Rapidly reverses cardiac and respiratory depression</p>
                  <p className="text-xs">• Onset: 1-2 minutes, Duration: 30-60 minutes</p>
                  <p className="text-xs">• Repeat PRN while arranging definitive treatment (dialysis)</p>
                  <p className="text-xs">• Does NOT lower Mg²⁺ level — only antagonizes effects</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">3. Emergent Hemodialysis (Definitive Treatment)</p>
                  <p className="text-xs">• Most effective method to rapidly remove Mg²⁺</p>
                  <p className="text-xs">• Lowers Mg²⁺ by 1-2 mg/dL per hour</p>
                  <p className="text-xs">• Indications: Mg²⁺ {">"}6 with symptoms, respiratory depression, cardiac toxicity, AKI/ESRD</p>
                  <p className="text-xs">• Use low-Mg²⁺ or Mg²⁺-free dialysate</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">4. Supportive Care</p>
                  <p className="text-xs">• Mechanical ventilation if respiratory failure</p>
                  <p className="text-xs">• Cardiac monitoring, pacing if needed</p>
                  <p className="text-xs">• Vasopressors for refractory hypotension</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Moderate Hypermagnesemia (Mg²⁺ 4-6, Symptomatic)</p>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-orange-500 pl-3">
                  <p className="font-semibold">Stop Magnesium Sources</p>
                  <p className="text-xs">Discontinue all Mg-containing medications and supplements</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-semibold">IV Saline + Loop Diuretics (if Normal Renal Function)</p>
                  <p className="text-xs">• Normal saline 100-150 mL/hr to promote renal Mg²⁺ excretion</p>
                  <p className="text-xs">• Furosemide 40-80 mg IV (inhibits TAL Mg²⁺ reabsorption)</p>
                  <p className="text-xs">• Only effective if GFR {">"}30 mL/min</p>
                  <p className="text-xs">• Monitor for volume overload</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <p className="font-semibold">Calcium Gluconate (if Symptomatic)</p>
                  <p className="text-xs">Give if bradycardia, hypotension, or neuromuscular symptoms</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-semibold">Consider Dialysis</p>
                  <p className="text-xs">If renal impairment, rising Mg²⁺, or refractory symptoms</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Mild Asymptomatic Hypermagnesemia (Mg²⁺ 2.5-4.0)</p>
              <div className="space-y-2 text-sm">
                <div className="border-l-4 border-yellow-500 pl-3">
                  <p className="font-semibold">Stop Exogenous Magnesium</p>
                  <p className="text-xs">Discontinue all Mg-containing products</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-semibold">Ensure Adequate Hydration</p>
                  <p className="text-xs">Oral or IV fluids to maintain good urine output (if kidneys functional)</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-semibold">Monitor and Recheck</p>
                  <p className="text-xs">Recheck Mg²⁺ in 6-12 hrs. Observe for symptoms. Check DTRs.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <p className="font-semibold">No Active Intervention Usually Needed</p>
                  <p className="text-xs">Kidneys will excrete excess if function is adequate. Levels typically normalize in 24-48 hrs.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-4 rounded">
              <p className="font-bold mb-2">Key Treatment Principles</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Calcium is the antidote:</strong> Directly antagonizes Mg²⁺ effects. Give immediately if severe symptoms.</li>
                <li>• <strong>Dialysis is definitive:</strong> Only way to rapidly lower Mg²⁺ in renal failure. Don't delay in severe cases.</li>
                <li>• <strong>Saline + furosemide:</strong> Only works with normal kidneys. Ineffective in CKD/ESRD.</li>
                <li>• <strong>Monitor reflexes:</strong> Best clinical indicator of toxicity. Loss of DTRs = dangerous level.</li>
                <li>• <strong>Prevention is key:</strong> Avoid Mg-containing products in renal impairment. Use alternative antacids/laxatives.</li>
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
            <li>• <strong>Classic scenario:</strong> Elderly patient with CKD using Mg-containing antacids (Mylanta, Maalox) for years develops weakness and hyporeflexia. Always ask about OTC meds!</li>
            <li>• <strong>DTRs as monitor:</strong> Check deep tendon reflexes regularly during IV Mg²⁺ infusion (e.g., eclampsia treatment). Loss of reflexes (areflexia) occurs at ~7 mg/dL — stop infusion immediately.</li>
            <li>• <strong>Hypermagnesemia in ESRD:</strong> Mild elevation (2.5-3.5 mg/dL) common and usually tolerated. Becomes problematic only with exogenous Mg²⁺ administration.</li>
            <li>• <strong>Calcium reverses symptoms but doesn't lower Mg²⁺:</strong> Calcium gluconate is temporizing measure while arranging dialysis. Effects wear off in 30-60 min.</li>
            <li>• <strong>Enema absorption:</strong> Mg²⁺ enemas can be absorbed, especially with colonic perforation or severe constipation. Avoid in renal impairment.</li>
            <li>• <strong>Eclampsia treatment:</strong> Mg²⁺ sulfate infusion for seizure prophylaxis is safe if kidneys normal. Monitor reflexes, respiratory rate, urine output. Have calcium gluconate at bedside.</li>
            <li>• <strong>Paradoxical hypocalcemia:</strong> Severe hypermagnesemia can suppress PTH secretion → hypocalcemia (opposite of mild hypermagnesemia which has no effect on Ca²⁺).</li>
            <li>• <strong>Alternative antacids for CKD:</strong> Use aluminum hydroxide or calcium carbonate instead of Mg-containing antacids. Avoid Mg-based laxatives — use polyethylene glycol or senna.</li>
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
            <li>Soar J, et al. European Resuscitation Council Guidelines: Cardiac Arrest in Special Circumstances. Resuscitation. 2015;95:148-201</li>
            <li>Onishi S, Yoshino S. Cathartic-Induced Magnesium Toxicity in the Elderly. Intern Med. 2006;45:207-210</li>
            <li>de Baaij JHF, et al. Magnesium in Man: Implications for Health and Disease. Physiol Rev. 2015;95:1-46</li>
            <li>UpToDate: Causes and treatment of hypermagnesemia (2023)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link to="/cases">
          <Button>Practice Cases</Button>
        </Link>
      </div>
    </div>
  )
}
