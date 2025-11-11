import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Activity, Hand } from 'lucide-react'

export default function Hypocalcemia() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/calcium">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calcium
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Activity className="w-10 h-10 text-blue-500" />
          Hypocalcemia
        </h1>
        <p className="text-xl text-muted-foreground">
          Serum calcium {"<"} 8.5 mg/dL — Diagnosis and management
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
            <strong>⚠️ Severe symptomatic hypocalcemia is a medical emergency.</strong> Can cause laryngospasm, seizures, cardiac arrhythmias (prolonged QT → torsades de pointes).
          </p>
          <p>
            <strong>ALWAYS check magnesium!</strong> Hypomagnesemia causes refractory hypocalcemia by impairing PTH secretion and action. Cannot correct Ca²⁺ until Mg²⁺ is repleted.
          </p>
          <p>
            <strong>Rapid IV calcium correction:</strong> Can precipitate arrhythmias in digoxin toxicity. Give slowly over 10-20 minutes with cardiac monitoring.
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
                <p className="text-2xl">7.5-8.4 mg/dL</p>
                <p className="text-sm text-muted-foreground">Often asymptomatic</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-bold">Moderate</p>
                <p className="text-2xl">7.0-7.4 mg/dL</p>
                <p className="text-sm text-muted-foreground">Paresthesias, cramps</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-bold">Severe</p>
                <p className="text-2xl">{"<"} 7.0 mg/dL</p>
                <p className="text-sm text-muted-foreground">Tetany, seizures, laryngospasm</p>
              </div>
            </div>
            <p className="text-sm mt-4">
              <strong>Remember:</strong> Must correct for albumin or measure ionized calcium. Alkalosis decreases ionized Ca²⁺ → symptoms can occur with normal total Ca²⁺.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Manifestations */}
      <Card className="mb-8 bg-blue-50 dark:bg-blue-950/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hand className="w-6 h-6" />
            Clinical Manifestations: Increased Neuromuscular Excitability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-lg mb-2">Classic Physical Exam Findings</p>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Chvostek Sign</p>
                  <p className="text-sm">Tapping facial nerve (just anterior to ear) → ipsilateral facial muscle twitching</p>
                  <p className="text-xs mt-1 italic">Sensitivity 60-70%, specificity ~70% (can be positive in 10% of normal individuals)</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Trousseau Sign (More Specific)</p>
                  <p className="text-sm">Inflate BP cuff above systolic pressure for 3 minutes → carpal spasm (flexion of wrist/MCP, extension of IP joints)</p>
                  <p className="text-xs mt-1 italic">Sensitivity ~90%, specificity ~95% — highly specific for hypocalcemia</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Symptoms by System</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="border-l-4 border-purple-500 pl-3">
                  <p className="font-semibold">Neuromuscular</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Paresthesias (perioral, fingertips)</li>
                    <li>• Muscle cramps, tetany</li>
                    <li>• Carpopedal spasm</li>
                    <li>• Laryngospasm (life-threatening)</li>
                    <li>• Seizures (generalized)</li>
                  </ul>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-semibold">Cardiac</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Prolonged QT interval</li>
                    <li>• Torsades de pointes</li>
                    <li>• Heart failure (chronic)</li>
                    <li>• Hypotension</li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-semibold">Neuropsychiatric</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Anxiety, depression, irritability</li>
                    <li>• Confusion, delirium</li>
                    <li>• Papilledema (increased ICP)</li>
                    <li>• Basal ganglia calcifications (chronic)</li>
                  </ul>
                </div>
                <div className="border-l-4 border-orange-500 pl-3">
                  <p className="font-semibold">Chronic (if longstanding)</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Cataracts</li>
                    <li>• Dry skin, brittle nails</li>
                    <li>• Dental hypoplasia</li>
                    <li>• Osteomalacia/rickets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Approach */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Diagnostic Approach: Check PTH & Vitamin D</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-lg mb-2">Step 1: Confirm True Hypocalcemia</p>
              <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
                <p className="text-sm mb-2"><strong>Correct for albumin or measure ionized calcium</strong></p>
                <code className="text-xs bg-muted p-2 rounded block">
                  Corrected Ca²⁺ = Measured Ca²⁺ + 0.8 × (4.0 - albumin)
                </code>
                <p className="text-xs mt-2">Hypoalbuminemia is the most common cause of "low calcium" — but ionized Ca²⁺ is normal.</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Step 2: Measure PTH (Key Diagnostic Test)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-bold mb-2">Low or Inappropriately Normal PTH</p>
                  <p className="text-sm mb-2"><strong>Hypoparathyroidism</strong> (lack of PTH)</p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Post-Surgical (Most Common)</p>
                      <p className="text-xs">Thyroidectomy, parathyroidectomy, neck surgery. Usually transient, can be permanent.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Autoimmune</p>
                      <p className="text-xs">Isolated or part of polyglandular syndrome (APS-1). Check anti-parathyroid antibodies.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Genetic</p>
                      <p className="text-xs">DiGeorge syndrome (22q11 deletion), CASR mutations, mitochondrial disorders</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Infiltrative</p>
                      <p className="text-xs">Hemochromatosis, Wilson's disease, granulomatous disease</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Severe Hypomagnesemia</p>
                      <p className="text-xs">Impairs PTH secretion (functional hypoparathyroidism). Check Mg²⁺!</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold mb-2">High PTH (Appropriate Response)</p>
                  <p className="text-sm mb-2"><strong>Secondary Hyperparathyroidism</strong></p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-primary/10 p-3 rounded">
                      <p className="font-bold mb-1">Vitamin D Deficiency (Most Common)</p>
                      <p className="text-xs">↓ 25(OH)D {"<"}20 ng/mL → ↓ intestinal Ca²⁺ absorption → hypocalcemia → ↑ PTH</p>
                      <p className="text-xs mt-1"><strong>Causes:</strong> Inadequate sun exposure, malabsorption, obesity, dark skin, elderly</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Chronic Kidney Disease</p>
                      <p className="text-xs">↓ 1α-hydroxylase → ↓ active vitamin D [1,25(OH)₂D] → ↓ Ca²⁺ absorption, ↑ PO₄³⁻ → ↑ PTH</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Vitamin D-Dependent Rickets</p>
                      <p className="text-xs">Type 1: 1α-hydroxylase deficiency. Type 2: Vitamin D receptor defects.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Malabsorption</p>
                      <p className="text-xs">Celiac disease, Crohn's, post-gastric bypass. ↓ Ca²⁺ and vitamin D absorption.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Pseudohypoparathyroidism</p>
                      <p className="text-xs">PTH resistance (GNAS mutations). High PTH but end-organ unresponsive. Albright hereditary osteodystrophy phenotype.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Step 3: Other Causes (Usually Obvious Clinically)</p>
              <div className="space-y-2 text-sm">
                <div className="bg-red-100 dark:bg-red-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Acute Pancreatitis</p>
                  <p className="text-xs">Fat saponification (Ca²⁺ binds to free fatty acids). Hypocalcemia correlates with severity.</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Hyperphosphatemia</p>
                  <p className="text-xs">Tumor lysis syndrome, rhabdomyolysis, phosphate enemas. Ca × PO₄ precipitation.</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Massive Blood Transfusion</p>
                  <p className="text-xs">Citrate (preservative) binds Ca²⁺. Each unit decreases iCa by ~0.05 mmol/L.</p>
                </div>
                <div className="bg-green-100 dark:bg-green-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Medications</p>
                  <p className="text-xs">Bisphosphonates, denosumab, calcitonin, cinacalcet, foscarnet, loop diuretics (chronic use)</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Sepsis / Critical Illness</p>
                  <p className="text-xs">Multifactorial: ↓ PTH, ↑ calcitonin, vitamin D deficiency, Ca²⁺ sequestration</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hypomagnesemia */}
      <Card className="mb-8 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle>CRITICAL: Check Magnesium in ALL Hypocalcemia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-bold">
              Hypomagnesemia is present in 30-50% of patients with hypocalcemia.
            </p>
            <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
              <p className="font-semibold mb-2">Why Hypocalcemia is Refractory with Low Mg²⁺:</p>
              <ul className="text-sm space-y-1">
                <li>• Severe hypomagnesemia ({"<"}1.0 mg/dL) → impaired PTH secretion</li>
                <li>• Mg²⁺ required for PTH receptor signaling → end-organ PTH resistance</li>
                <li>• Both lost together: diarrhea, diuretics, alcohol, aminoglycosides, cisplatin, PPI</li>
              </ul>
            </div>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <p className="font-bold mb-1">Clinical Rule:</p>
              <p className="text-sm">
                <strong>ALWAYS check and correct magnesium first in refractory hypocalcemia.</strong> Give 2-4 grams MgSO₄ IV, then recheck Ca²⁺. PTH levels may be inappropriately low or normal despite hypocalcemia.
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
              <p className="font-bold text-lg mb-2">Severe Symptomatic Hypocalcemia (Tetany, Seizures, QT Prolongation)</p>
              <p className="text-sm mb-2"><strong>IMMEDIATE IV CALCIUM</strong></p>
              <div className="space-y-2 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Calcium Gluconate 10% (Preferred)</p>
                  <p>• <strong>1-2 grams (10-20 mL) IV over 10-20 minutes</strong></p>
                  <p>• Can give via peripheral IV (less caustic than calcium chloride)</p>
                  <p>• Repeat dose PRN for persistent symptoms</p>
                  <p>• Follow with continuous infusion if recurrent symptoms</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Calcium Chloride 10% (Alternative)</p>
                  <p>• <strong>5-10 mL IV over 10 minutes</strong></p>
                  <p>• Provides 3× more elemental Ca²⁺ than gluconate</p>
                  <p>• Requires central line (caustic to peripheral veins)</p>
                  <p>• Use in cardiac arrest or critical situations</p>
                </div>
                <p className="font-bold mt-2">⚠️ Monitor: Cardiac monitor required. Check iCa or total Ca²⁺ every 4-6 hours. Risk of arrhythmia if given too fast or in digoxin toxicity.</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Calcium Infusion (for Ongoing Symptomatic Hypocalcemia)</p>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded">
                <p className="text-sm mb-2"><strong>Continuous IV Calcium Gluconate</strong></p>
                <p className="text-sm">• 10 grams (100 mL of 10% solution) in 1 L D5W or NS</p>
                <p className="text-sm">• Infuse at 50 mL/hr (0.5-1.5 mg/kg/hr elemental Ca)</p>
                <p className="text-sm">• Titrate to symptoms and Ca²⁺ level</p>
                <p className="text-sm">• Transition to oral therapy once stable</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Oral Calcium (for Chronic or Mild-Moderate Hypocalcemia)</p>
              <div className="space-y-2 text-sm">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-semibold">Calcium Carbonate (40% elemental Ca)</p>
                  <p className="text-xs">500-1000 mg elemental Ca PO TID (total 1.5-3 g/day)</p>
                  <p className="text-xs">Best absorbed with food (requires acid). Cheap. Can cause constipation.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <p className="font-semibold">Calcium Citrate (21% elemental Ca)</p>
                  <p className="text-xs">500-1000 mg elemental Ca PO TID</p>
                  <p className="text-xs">Better absorbed on empty stomach. Use in achlorhydria (PPI use, gastric bypass).</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Vitamin D Supplementation (Essential for Chronic Management)</p>
              <div className="space-y-2 text-sm">
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold mb-1">Vitamin D Deficiency</p>
                  <p className="text-xs">• <strong>Ergocalciferol (D₂) or Cholecalciferol (D₃) 50,000 IU PO weekly × 8-12 weeks</strong></p>
                  <p className="text-xs">• Then 800-2000 IU daily for maintenance</p>
                  <p className="text-xs">• Recheck 25(OH)D in 3 months (goal {">"}30 ng/mL)</p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold mb-1">Hypoparathyroidism or CKD</p>
                  <p className="text-xs">• <strong>Calcitriol (1,25-OH D₃) 0.25-0.5 mcg PO BID</strong> — active vitamin D</p>
                  <p className="text-xs">• Bypasses need for PTH-stimulated activation</p>
                  <p className="text-xs">• Monitor Ca²⁺ closely (risk of hypercalcemia, hypercalciuria)</p>
                  <p className="text-xs">• Alternative: Alfacalcidol, paricalcitol, doxercalciferol</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-4 rounded">
              <p className="font-bold mb-2">Treatment Guidelines by Cause</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Hypoparathyroidism:</strong> High-dose oral Ca²⁺ (1.5-3 g/day) + calcitriol (0.25-2 mcg/day). Goal: Low-normal Ca²⁺ to avoid hypercalciuria.</li>
                <li>• <strong>Vitamin D deficiency:</strong> Replete vitamin D, then add oral Ca²⁺ if needed.</li>
                <li>• <strong>CKD:</strong> Active vitamin D (calcitriol/analogs) + phosphate binders + dietary phosphate restriction.</li>
                <li>• <strong>Hypomagnesemia:</strong> Correct Mg²⁺ first! 2-4 g MgSO₄ IV or 400-800 mg Mg PO daily.</li>
                <li>• <strong>Post-thyroidectomy:</strong> Often transient. Monitor closely. May need temporary Ca²⁺/calcitriol.</li>
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
            <li>• <strong>Hungry bone syndrome:</strong> After parathyroidectomy for severe hyperparathyroidism → rapid bone uptake of Ca²⁺ → profound hypocalcemia requiring massive Ca²⁺ repletion (10+ g/day).</li>
            <li>• <strong>Alkalosis unmasks hypocalcemia:</strong> Respiratory alkalosis (hyperventilation, anxiety) → ↓ ionized Ca²⁺ → tetany despite normal total Ca²⁺. Treat with rebreathing, anxiolytics.</li>
            <li>• <strong>Bisphosphonate-induced:</strong> Acute hypocalcemia after IV zoledronic acid or pamidronate, especially if pre-existing vitamin D deficiency. Pre-treat with vitamin D.</li>
            <li>• <strong>Hypoparathyroidism characteristics:</strong> Low Ca²⁺, high PO₄³⁻ (PTH normally lowers phosphate), low/normal PTH. Reverse of hyperparathyroidism.</li>
            <li>• <strong>Ca²⁺ × PO₄³⁻ product:</strong> In hypoparathyroidism, giving too much Ca²⁺ + high PO₄³⁻ → soft tissue calcifications. Keep Ca²⁺ low-normal.</li>
            <li>• <strong>QT prolongation:</strong> Hypocalcemia prolongs QT by prolonging ST segment (vs hypokalemia which prolongs T wave). Risk of torsades.</li>
            <li>• <strong>Trousseau {'>'} Chvostek:</strong> Trousseau sign is more specific. Chvostek can be positive in normal people and negative in chronic hypocalcemia.</li>
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
            <li>Cooper MS, Gittoes NJ. Diagnosis and Management of Hypocalcemia. BMJ. 2008;336:1298-1302</li>
            <li>Schafer AL, Shoback DM. Hypocalcemia: Diagnosis and Treatment. In: DeGroot's Endocrinology, 8th Edition</li>
            <li>Goltzman D, Mannstadt M, Marcocci C. Hypoparathyroidism. N Engl J Med. 2018;379:1655-1668</li>
            <li>UpToDate: Treatment of hypocalcemia (2023)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link to="/calculators">
          <Button>Corrected Calcium Calculator</Button>
        </Link>
        <Link to="/interactions">
          <Button variant="outline">Ca-Mg Interactions</Button>
        </Link>
        <Link to="/cases">
          <Button variant="outline">Practice Cases</Button>
        </Link>
      </div>
    </div>
  )
}
