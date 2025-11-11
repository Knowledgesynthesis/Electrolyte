import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Bone, Droplet } from 'lucide-react'

export default function Hypercalcemia() {
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
          <Bone className="w-10 h-10 text-orange-500" />
          Hypercalcemia
        </h1>
        <p className="text-xl text-muted-foreground">
          Serum calcium {">"}10.5 mg/dL — "Stones, Bones, Groans, Moans"
        </p>
      </div>

      {/* Critical Safety Warning */}
      <div className="safety-warning mb-8">
        <p className="font-bold text-lg mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Hypercalcemic Crisis Warning
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Severe hypercalcemia (Ca²⁺ {">"}14 mg/dL) is a medical emergency.</strong> Can cause altered mental status, cardiac arrhythmias, acute kidney injury, and death.
          </p>
          <p>
            <strong>Treatment priority:</strong> Aggressive IV hydration (200-300 mL/hr NS) is first-line. Then add calcitonin (rapid) and bisphosphonates (sustained effect). Dialysis for refractory cases.
          </p>
          <p>
            <strong>Never give thiazides or immobilize patients</strong> — both worsen hypercalcemia.
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
                <p className="text-2xl">10.5-11.9 mg/dL</p>
                <p className="text-sm text-muted-foreground">Often asymptomatic</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-bold">Moderate</p>
                <p className="text-2xl">12.0-13.9 mg/dL</p>
                <p className="text-sm text-muted-foreground">Fatigue, polyuria, constipation</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-bold">Severe</p>
                <p className="text-2xl">≥ 14.0 mg/dL</p>
                <p className="text-sm text-muted-foreground">Confusion, coma, cardiac arrest</p>
              </div>
            </div>
            <p className="text-sm mt-4">
              <strong>Remember:</strong> Correct for albumin or measure ionized calcium. Symptoms correlate with rate of rise as much as absolute level.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Manifestations */}
      <Card className="mb-8 bg-orange-50 dark:bg-orange-950/30">
        <CardHeader>
          <CardTitle>"Stones, Bones, Groans, Moans, and Psychiatric Overtones"</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm italic">Classic mnemonic for symptoms of chronic hypercalcemia:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-bold mb-1">Stones (Renal)</p>
                <ul className="text-xs space-y-1">
                  <li>• Nephrolithiasis (calcium oxalate/phosphate stones)</li>
                  <li>• Nephrocalcinosis</li>
                  <li>• Polyuria, polydipsia (nephrogenic DI)</li>
                  <li>• Acute kidney injury (volume depletion, vasoconstriction)</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <p className="font-bold mb-1">Bones</p>
                <ul className="text-xs space-y-1">
                  <li>• Bone pain, fractures</li>
                  <li>• Osteoporosis (from PTH or malignancy)</li>
                  <li>• Osteitis fibrosa cystica (brown tumors in severe hyperparathyroidism)</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-bold mb-1">Groans (GI)</p>
                <ul className="text-xs space-y-1">
                  <li>• Constipation</li>
                  <li>• Nausea, vomiting, anorexia</li>
                  <li>• Peptic ulcer disease (Ca²⁺ stimulates gastrin)</li>
                  <li>• Pancreatitis (chronic hypercalcemia)</li>
                </ul>
              </div>
              <div className="border-l-4 border-orange-500 pl-3">
                <p className="font-bold mb-1">Moans (Neuropsychiatric)</p>
                <ul className="text-xs space-y-1">
                  <li>• Fatigue, weakness, lethargy</li>
                  <li>• Confusion, delirium, coma</li>
                  <li>• Depression, anxiety</li>
                  <li>• Cognitive impairment</li>
                </ul>
              </div>
              <div className="border-l-4 border-red-500 pl-3">
                <p className="font-bold mb-1">Cardiac</p>
                <ul className="text-xs space-y-1">
                  <li>• Shortened QT interval</li>
                  <li>• Bradycardia, heart block</li>
                  <li>• Hypertension</li>
                  <li>• Arrhythmias (rare but serious)</li>
                </ul>
              </div>
              <div className="border-l-4 border-yellow-500 pl-3">
                <p className="font-bold mb-1">Other</p>
                <ul className="text-xs space-y-1">
                  <li>• Muscle weakness</li>
                  <li>• Pruritus</li>
                  <li>• Band keratopathy (corneal calcification)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Approach */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Diagnostic Approach: PTH-Guided Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-lg mb-2">Step 1: Confirm True Hypercalcemia</p>
              <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
                <p className="text-sm mb-2"><strong>Correct for albumin or measure ionized calcium</strong></p>
                <code className="text-xs bg-muted p-2 rounded block">
                  Corrected Ca²⁺ = Measured Ca²⁺ + 0.8 × (4.0 - albumin)
                </code>
                <p className="text-xs mt-2">Repeat test to confirm if mildly elevated. Rule out lab error.</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Step 2: Measure Intact PTH (Key Diagnostic Test)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-bold mb-2">High or Inappropriately Normal PTH</p>
                  <p className="text-sm mb-2"><strong>PTH-Mediated Hypercalcemia</strong></p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-primary/10 p-3 rounded">
                      <p className="font-bold mb-1">Primary Hyperparathyroidism (Most Common Outpatient)</p>
                      <p className="text-xs mb-2">Single parathyroid adenoma (80%), hyperplasia (15%), carcinoma ({"<"}1%)</p>
                      <p className="text-xs"><strong>Labs:</strong> ↑ Ca²⁺, ↑ or high-normal PTH, ↓ PO₄³⁻, ↑ urinary Ca²⁺</p>
                      <p className="text-xs"><strong>Diagnosis:</strong> Sestamibi scan, neck ultrasound</p>
                      <p className="text-xs"><strong>Treatment:</strong> Parathyroidectomy (curative)</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Familial Hypocalciuric Hypercalcemia (FHH)</p>
                      <p className="text-xs">Inactivating CaSR mutation → ↑ Ca²⁺ set-point. <strong>Key:</strong> LOW urinary Ca²⁺ (Ca/Cr clearance ratio {"<"}0.01). Benign, no treatment needed. Don't operate!</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Tertiary Hyperparathyroidism</p>
                      <p className="text-xs">Long-standing secondary hyperparathyroidism (CKD) → autonomous PTH secretion → hypercalcemia despite correcting kidney disease.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Lithium Use</p>
                      <p className="text-xs">Shifts CaSR set-point → ↑ PTH secretion. Check lithium level. May improve with discontinuation.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold mb-2">Low or Suppressed PTH</p>
                  <p className="text-sm mb-2"><strong>Non-PTH-Mediated Hypercalcemia</strong></p>
                  <div className="space-y-2 text-sm mt-2">
                    <div className="bg-red-100 dark:bg-red-950/30 p-3 rounded">
                      <p className="font-bold mb-1">Malignancy (Most Common Inpatient)</p>
                      <p className="text-xs mb-2">20% of all hypercalcemia cases. Often severe (Ca²⁺ {">"}13).</p>
                      <div className="space-y-1 text-xs mt-2">
                        <p><strong>1. Humoral Hypercalcemia of Malignancy (HHM):</strong></p>
                        <p className="ml-3">PTHrP secretion (mimics PTH). Squamous cell (lung, head/neck), renal cell, bladder, breast. Check PTHrP level.</p>
                        <p><strong>2. Osteolytic Metastases:</strong></p>
                        <p className="ml-3">Direct bone destruction. Multiple myeloma (↑ IL-6, RANKL), breast cancer, lymphoma.</p>
                        <p><strong>3. Vitamin D Production:</strong></p>
                        <p className="ml-3">Lymphoma produces 1,25(OH)₂D. Check 1,25(OH)₂D level.</p>
                      </div>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Vitamin D Intoxication</p>
                      <p className="text-xs">Excessive supplementation ({">"}10,000 IU/day for months). ↑ 25(OH)D {">"}150 ng/mL. Also seen in granulomatous disease (sarcoidosis, TB) — macrophages produce 1,25(OH)₂D.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Thiazide Diuretics</p>
                      <p className="text-xs">↑ Renal Ca²⁺ reabsorption. Usually mild. Discontinue and recheck in 2 weeks.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Milk-Alkali Syndrome</p>
                      <p className="text-xs">Excessive Ca²⁺ carbonate intake (antacids, supplements) → hypercalcemia + metabolic alkalosis + AKI. Stop Ca²⁺ supplements.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Immobilization</p>
                      <p className="text-xs">Prolonged bed rest → bone resorption {">"} formation. Common in spinal cord injury, ICU patients, adolescents.</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Endocrine</p>
                      <p className="text-xs">Hyperthyroidism (↑ bone turnover), adrenal insufficiency (volume depletion), pheochromocytoma (PTHrP secretion)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Additional Labs to Consider</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">PTHrP</p>
                  <p className="text-xs">If malignancy suspected and PTH suppressed</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">25(OH)D and 1,25(OH)₂D</p>
                  <p className="text-xs">Vitamin D intoxication, granulomatous disease</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">SPEP/UPEP</p>
                  <p className="text-xs">Multiple myeloma (M-spike, Bence Jones protein)</p>
                </div>
                <div className="bg-muted p-2 rounded">
                  <p className="font-semibold">Urine Ca/Cr ratio</p>
                  <p className="text-xs">Distinguish primary hyperparathyroidism (high) from FHH (low)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Treatment Approach: Hydration, Calcitonin, Bisphosphonates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-lg mb-2">Treatment Algorithm by Severity</p>
              <div className="space-y-3">
                <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded">
                  <p className="font-bold mb-1">Severe (Ca²⁺ ≥14 OR symptomatic)</p>
                  <ol className="text-sm list-decimal list-inside space-y-1">
                    <li><strong>Aggressive IV hydration:</strong> NS 200-300 mL/hr (4-6 L/day). Goal: Restore volume, enhance calciuresis.</li>
                    <li><strong>Calcitonin:</strong> 4 IU/kg SC/IM q12h (max 8 IU/kg q6h). Rapid onset (4-6 hrs) but tachyphylaxis in 48h.</li>
                    <li><strong>Bisphosphonate:</strong> Zoledronic acid 4 mg IV over 15 min OR pamidronate 60-90 mg IV over 2-4 hrs. Onset 2-4 days, peak 7 days.</li>
                    <li><strong>Hemodialysis:</strong> If refractory or severe renal impairment. Use low-Ca²⁺ dialysate.</li>
                  </ol>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded">
                  <p className="font-bold mb-1">Moderate (Ca²⁺ 12-13.9, minimally symptomatic)</p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    <li><strong>IV hydration:</strong> NS 100-150 mL/hr</li>
                    <li><strong>Bisphosphonate:</strong> Zoledronic acid 4 mg IV</li>
                    <li>Loop diuretic (furosemide 20-40 mg IV) ONLY after volume repletion (avoid volume depletion)</li>
                    <li>Treat underlying cause</li>
                  </ul>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                  <p className="font-bold mb-1">Mild (Ca²⁺ 10.5-11.9, asymptomatic)</p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    <li>Treat underlying cause (e.g., parathyroidectomy, stop vitamin D)</li>
                    <li>Adequate oral hydration (2-3 L/day)</li>
                    <li>Avoid thiazides, high-Ca²⁺ diet, prolonged immobilization</li>
                    <li>May not require acute treatment — address etiology</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Pharmacologic Agents in Detail</p>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded">
                  <p className="font-bold mb-1 flex items-center gap-2">
                    <Droplet className="w-4 h-4" />
                    IV Saline (First-Line, Always)
                  </p>
                  <p className="text-xs mb-1">• <strong>Normal saline 200-300 mL/hr</strong> (adjust based on cardiac/renal function)</p>
                  <p className="text-xs mb-1">• Hypercalcemia → nephrogenic DI → volume depletion → ↓ Ca²⁺ excretion (vicious cycle)</p>
                  <p className="text-xs mb-1">• Volume repletion → ↑ GFR → ↑ renal Ca²⁺ excretion</p>
                  <p className="text-xs mb-1">• Lowers Ca²⁺ by 1-3 mg/dL over 24 hrs</p>
                  <p className="text-xs">• Monitor for volume overload (especially if CHF, CKD). Consider CVP monitoring.</p>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Calcitonin (Rapid but Temporary)</p>
                  <p className="text-xs mb-1">• <strong>4-8 IU/kg SC/IM every 12 hours</strong></p>
                  <p className="text-xs mb-1">• Mechanism: ↓ Osteoclast activity, ↑ renal Ca²⁺ excretion</p>
                  <p className="text-xs mb-1">• Onset: 4-6 hours (fastest acting agent)</p>
                  <p className="text-xs mb-1">• Lowers Ca²⁺ by 1-2 mg/dL</p>
                  <p className="text-xs">• Tachyphylaxis develops in 48-72 hrs (limited duration). Bridge to bisphosphonate effect.</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Bisphosphonates (Most Effective, Sustained)</p>
                  <p className="text-xs mb-2"><strong>Zoledronic acid 4 mg IV over 15 min</strong> (preferred) OR <strong>Pamidronate 60-90 mg IV over 2-4 hrs</strong></p>
                  <p className="text-xs mb-1">• Mechanism: Inhibit osteoclast-mediated bone resorption</p>
                  <p className="text-xs mb-1">• Onset: 2-4 days, Peak effect: 7 days, Duration: 2-4 weeks</p>
                  <p className="text-xs mb-1">• Normalizes Ca²⁺ in 70-90% of malignancy-related hypercalcemia</p>
                  <p className="text-xs mb-1">• Dose-adjust for CrCl {"<"}30. Contraindicated in severe CKD (GFR {"<"}30).</p>
                  <p className="text-xs">• Side effects: Acute phase reaction (fever, myalgias), hypocalcemia, osteonecrosis of jaw (rare, chronic use)</p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Denosumab (Alternative to Bisphosphonates)</p>
                  <p className="text-xs mb-1">• <strong>120 mg SC weekly × 4 doses, then monthly</strong></p>
                  <p className="text-xs mb-1">• RANKL inhibitor → ↓ osteoclast formation and activity</p>
                  <p className="text-xs mb-1">• Use if bisphosphonates fail or contraindicated (severe CKD)</p>
                  <p className="text-xs">• Risk of severe hypocalcemia (especially with vitamin D deficiency) — must supplement Ca²⁺ and vitamin D</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  <p className="font-bold mb-1">Glucocorticoids (Specific Indications)</p>
                  <p className="text-xs mb-1">• <strong>Hydrocortisone 200-300 mg/day IV OR prednisone 40-60 mg PO daily</strong></p>
                  <p className="text-xs mb-1">• Effective in: Vitamin D intoxication, granulomatous disease (sarcoidosis), hematologic malignancy (lymphoma, myeloma)</p>
                  <p className="text-xs">• NOT effective in hyperparathyroidism or solid tumor hypercalcemia</p>
                </div>

                <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
                  <p className="font-bold mb-1">Hemodialysis (Last Resort)</p>
                  <p className="text-xs mb-1">• Low-calcium dialysate (0-1 mEq/L)</p>
                  <p className="text-xs mb-1">• Indications: Refractory severe hypercalcemia, AKI/ESRD, heart failure (can't tolerate fluids)</p>
                  <p className="text-xs">• Most rapid and effective method (lowers Ca²⁺ 3-5 mg/dL per session)</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-4 rounded">
              <p className="font-bold mb-2">Treatment by Etiology</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Primary hyperparathyroidism:</strong> Parathyroidectomy (curative). Medical management: Adequate hydration, avoid thiazides, cinacalcet if not surgical candidate.</li>
                <li>• <strong>Malignancy:</strong> Treat cancer. Bisphosphonates first-line. Denosumab if refractory. Often recurs — may need repeat dosing.</li>
                <li>• <strong>Vitamin D toxicity:</strong> Stop vitamin D, glucocorticoids, avoid sun exposure. May take months to resolve.</li>
                <li>• <strong>Granulomatous disease:</strong> Glucocorticoids, hydroxychloroquine (inhibits 1α-hydroxylase).</li>
                <li>• <strong>FHH:</strong> No treatment needed. Benign condition.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card className="mb-8 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Primary hyperparathyroidism vs FHH:</strong> Both have ↑ Ca²⁺ and ↑/normal PTH. FHH has LOW urine Ca²⁺ (Ca/Cr clearance {"<"}0.01) and family history. Don't operate on FHH!</li>
            <li>• <strong>Malignancy clues:</strong> Rapid onset, Ca²⁺ {">"}13, weight loss, known cancer. PTHrP-mediated (HHM) has ↓ PO₄³⁻ (mimics PTH). Osteolytic has normal/↑ PO₄³⁻.</li>
            <li>• <strong>Bisphosphonate timing:</strong> Takes 2-4 days to work. Use calcitonin for rapid effect in severe cases. Combined therapy bridges the gap.</li>
            <li>• <strong>Loop diuretics controversy:</strong> Furosemide increases calciuresis BUT causes volume depletion → worsens hypercalcemia. Only use AFTER adequate hydration. Not first-line.</li>
            <li>• <strong>Granulomatous disease:</strong> Sarcoidosis, TB, histoplasmosis, berylliosis. Macrophages produce 1,25(OH)₂D → ↑ intestinal Ca²⁺ absorption. ↑ 1,25(OH)₂D with normal/low 25(OH)D.</li>
            <li>• <strong>Immobilization hypercalcemia:</strong> Common in teens (rapid bone turnover), spinal cord injury, prolonged ICU stay. Mobilize early, hydration, bisphosphonates if severe.</li>
            <li>• <strong>Milk-alkali syndrome resurgence:</strong> Was rare, now increasing due to over-the-counter Ca²⁺ carbonate supplements for osteoporosis prevention.</li>
            <li>• <strong>Shortened QT interval:</strong> Classic ECG finding but low sensitivity. Can't rely on ECG alone to detect hypercalcemia.</li>
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
            <li>Stewart AF. Clinical Practice: Hypercalcemia Associated with Cancer. N Engl J Med. 2005;352:373-379</li>
            <li>Goldner W. Cancer-Related Hypercalcemia. J Oncol Pract. 2016;12:426-432</li>
            <li>Bilezikian JP, et al. Primary Hyperparathyroidism. Nat Rev Dis Primers. 2016;2:16033</li>
            <li>Shane E, Berenson JR. Treatment of Hypercalcemia. In: DeGroot's Endocrinology, 8th Edition</li>
            <li>UpToDate: Treatment of hypercalcemia (2023)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link to="/calculators">
          <Button>Corrected Calcium Calculator</Button>
        </Link>
        <Link to="/cases">
          <Button variant="outline">Practice Cases</Button>
        </Link>
      </div>
    </div>
  )
}
