import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Bone, Activity } from 'lucide-react'

export default function CalciumPhysiology() {
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
          Calcium Physiology
        </h1>
        <p className="text-xl text-muted-foreground">
          Normal calcium homeostasis, PTH axis, and bone metabolism
        </p>
      </div>

      {/* Core Concept */}
      <Card className="mb-8 bg-gradient-to-br from-orange-500/10 to-amber-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Core Concept: Calcium Homeostasis via PTH Axis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="font-bold text-base">Key Principle:</p>
            <p>
              <strong>Serum calcium is tightly regulated by parathyroid hormone (PTH), vitamin D, and calcitonin to maintain bone health, neuromuscular function, and cellular signaling.</strong>
            </p>
            <p>
              Calcium is the most abundant mineral in the body (99% in bone, 1% in blood/soft tissues). Even small changes in serum Ca²⁺ have profound effects on membrane excitability, coagulation, and enzyme function.
            </p>
            <div className="bg-muted p-3 rounded mt-3">
              <p className="font-semibold mb-1">Clinical Translation:</p>
              <ul className="space-y-1 text-xs">
                <li>• Low Ca²⁺ (hypocalcemia) → Increased neuromuscular excitability → tetany, seizures</li>
                <li>• High Ca²⁺ (hypercalcemia) → "Stones, bones, groans, moans" (nephrolithiasis, bone pain, constipation, confusion)</li>
                <li>• Albumin correction is essential for accurate interpretation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Normal Values */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Normal Values & Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold mb-2">Serum Calcium</p>
              <p className="text-3xl text-primary mb-2">8.5-10.5 mg/dL</p>
              <p className="text-sm text-muted-foreground">(2.1-2.6 mmol/L)</p>
              <p className="text-sm mt-3">
                <strong>Critical values:</strong>
              </p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• {"<"}7.0 mg/dL: Severe hypocalcemia</li>
                <li>• {">"}12.0 mg/dL: Severe hypercalcemia</li>
                <li>• {">"}14.0 mg/dL: Hypercalcemic crisis</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-2">Calcium Fractions in Serum</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Ionized Ca²⁺ (free)</span>
                  <span className="font-bold">~50% (4.5-5.3 mg/dL)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Protein-bound (albumin)</span>
                  <span className="font-bold">~40%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Complexed (citrate, PO₄)</span>
                  <span className="font-bold">~10%</span>
                </div>
                <p className="text-xs mt-3 bg-amber-100 dark:bg-amber-950 p-2 rounded">
                  <strong>Only ionized Ca²⁺ is physiologically active.</strong> Low albumin → low total Ca²⁺ but ionized Ca²⁺ may be normal. Must correct for albumin!
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded">
            <p className="font-bold mb-2">Albumin Correction Formula:</p>
            <code className="text-sm">
              Corrected Ca²⁺ (mg/dL) = Measured Ca²⁺ + 0.8 × (4.0 - albumin)
            </code>
            <p className="text-xs mt-2">For every 1 g/dL decrease in albumin below 4.0, add 0.8 mg/dL to total calcium.</p>
            <p className="text-xs mt-1"><strong>Alternative:</strong> Directly measure ionized calcium (iCa) — more accurate but not always available.</p>
          </div>
        </CardContent>
      </Card>

      {/* PTH System */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Parathyroid Hormone (PTH): The Master Regulator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded">
              <p className="font-bold mb-2">PTH Secretion & Regulation</p>
              <p className="text-sm">
                PTH is an 84-amino acid peptide secreted by chief cells of the parathyroid glands. Secretion is inversely related to serum ionized Ca²⁺ via calcium-sensing receptors (CaSR) on parathyroid cells.
              </p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• Low Ca²⁺ → ↑ PTH release (within seconds to minutes)</li>
                <li>• High Ca²⁺ → ↓ PTH release</li>
                <li>• Chronic hypocalcemia → parathyroid hyperplasia</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">PTH Actions (All Increase Serum Ca²⁺)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-semibold mb-2">1. Bone (Rapid)</p>
                  <p className="text-sm">↑ Osteoclast activity → bone resorption → release Ca²⁺ and PO₄³⁻ into blood</p>
                  <p className="text-xs mt-2 italic">Chronic excess PTH → osteoporosis, osteitis fibrosa cystica</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold mb-2">2. Kidney</p>
                  <ul className="text-sm space-y-1">
                    <li>• ↑ Ca²⁺ reabsorption (distal tubule)</li>
                    <li>• ↓ PO₄³⁻ reabsorption (proximal tubule) → phosphaturia</li>
                    <li>• ↑ 1α-hydroxylase → activates vitamin D</li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold mb-2">3. GI (Indirect)</p>
                  <p className="text-sm">PTH stimulates 1,25(OH)₂D production → ↑ intestinal Ca²⁺ absorption</p>
                  <p className="text-xs mt-2 italic">(PTH has no direct GI effect)</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <p className="font-bold mb-1">Clinical Pearl:</p>
              <p className="text-sm">
                <strong>PTH increases Ca²⁺ but decreases PO₄³⁻.</strong> This is why primary hyperparathyroidism presents with high Ca²⁺ and low PO₄³⁻. In contrast, vitamin D excess increases both Ca²⁺ and PO₄³⁻.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vitamin D */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Vitamin D Metabolism & Function</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-lg mb-3">Vitamin D Activation Pathway</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 p-3 bg-muted rounded">
                  <span className="font-bold min-w-[120px]">Step 1: Skin</span>
                  <span>7-dehydrocholesterol + UV light → Vitamin D₃ (cholecalciferol)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded">
                  <span className="font-bold min-w-[120px]">Step 2: Liver</span>
                  <span>25-hydroxylase → <strong>25(OH)D</strong> (calcidiol) — storage form, measure this to assess Vit D status</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded">
                  <span className="font-bold min-w-[120px]">Step 3: Kidney</span>
                  <span><strong>1α-hydroxylase</strong> (PTH-stimulated) → <strong>1,25(OH)₂D</strong> (calcitriol) — active form</span>
                </div>
              </div>
              <p className="text-xs mt-3 italic">Dietary sources: Vitamin D₂ (ergocalciferol) from plants, Vitamin D₃ from animal products/fortified foods</p>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Active Vitamin D [1,25(OH)₂D] Actions</p>
              <div className="space-y-2 text-sm">
                <div className="bg-green-100 dark:bg-green-950/30 p-3 rounded">
                  <p className="font-semibold mb-1">Intestine (Primary Site)</p>
                  <p>↑ Ca²⁺ and PO₄³⁻ absorption via calcium-binding proteins (calbindin)</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-950/30 p-3 rounded">
                  <p className="font-semibold mb-1">Bone</p>
                  <p>Works with PTH to mobilize Ca²⁺. Also promotes bone mineralization (requires adequate Ca²⁺ and PO₄³⁻)</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-950/30 p-3 rounded">
                  <p className="font-semibold mb-1">Kidney</p>
                  <p>↑ Ca²⁺ and PO₄³⁻ reabsorption (minor effect)</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-950/30 p-3 rounded">
                  <p className="font-semibold mb-1">Negative Feedback</p>
                  <p>↓ PTH secretion (when Ca²⁺ normalized), ↓ 1α-hydroxylase activity</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
              <p className="font-bold mb-2">CKD & Vitamin D:</p>
              <p className="text-sm">
                Chronic kidney disease → loss of 1α-hydroxylase → ↓ active vitamin D → ↓ intestinal Ca²⁺ absorption → hypocalcemia → secondary hyperparathyroidism → renal osteodystrophy. Treatment: Active vitamin D analogs (calcitriol, paricalcitol).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calcitonin */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Calcitonin: The Minor Player</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Calcitonin</strong> is a 32-amino acid peptide secreted by parafollicular C cells of the thyroid gland in response to hypercalcemia.
            </p>
            <div className="bg-muted p-3 rounded space-y-2">
              <p className="font-semibold">Actions (Opposite of PTH):</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• ↓ Osteoclast activity → ↓ bone resorption → ↓ serum Ca²⁺</li>
                <li>• ↑ Renal Ca²⁺ excretion (minor effect)</li>
              </ul>
              <p className="font-semibold mt-2">Clinical Significance:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Role in normal calcium homeostasis is minimal (can live without thyroid/calcitonin)</li>
                <li>• <strong>Therapeutic use:</strong> Calcitonin (salmon) for acute hypercalcemia (Paget's disease, malignancy-related)</li>
                <li>• <strong>Tumor marker:</strong> Elevated in medullary thyroid carcinoma</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Renal Handling */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Renal Calcium Handling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-bold mb-2">Daily Calcium Balance</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold">Filtered</p>
                  <p className="text-2xl">~10,000 mg/day</p>
                  <p className="text-xs">(~60% of serum Ca²⁺ is filterable)</p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold">Excreted</p>
                  <p className="text-2xl">~100-200 mg/day</p>
                  <p className="text-xs">(98-99% reabsorbed)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Sites of Renal Ca²⁺ Reabsorption</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">PCT (65%)</span>
                  <span>Proximal tubule — passive, follows Na⁺ and water</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">TAL (25%)</span>
                  <span>Thick ascending limb — paracellular, driven by positive lumen potential</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-primary/10 rounded">
                  <span className="font-bold min-w-[100px]">DCT (8-10%)</span>
                  <span><strong>Distal convoluted tubule — active, transcellular, PTH-regulated</strong> (fine-tuning)</span>
                </div>
              </div>
              <p className="text-xs mt-3">
                Most reabsorption is passive (PCT, TAL). PTH acts on DCT to fine-tune Ca²⁺ excretion.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded">
              <p className="font-bold mb-2">Factors Affecting Renal Ca²⁺ Excretion:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-semibold">↑ Excretion (Hypercalciuria):</p>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• High Na⁺ intake (Na⁺ competes with Ca²⁺ in PCT)</li>
                    <li>• Loop diuretics</li>
                    <li>• Volume expansion</li>
                    <li>• Metabolic acidosis</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">↓ Excretion:</p>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• PTH</li>
                    <li>• Thiazide diuretics (↑ DCT reabsorption)</li>
                    <li>• Volume depletion</li>
                    <li>• Metabolic alkalosis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Magnesium Interaction */}
      <Card className="mb-8 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle>CRITICAL: The Magnesium-Calcium Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-bold">
              Hypomagnesemia is a common cause of refractory hypocalcemia.
            </p>
            <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
              <p className="font-semibold mb-2">Why Hypocalcemia is Refractory with Low Mg²⁺:</p>
              <ul className="text-sm space-y-1">
                <li>• Mg²⁺ is required for PTH secretion → severe hypomagnesemia impairs PTH release</li>
                <li>• Mg²⁺ is required for PTH action → end-organ resistance to PTH</li>
                <li>• Both are lost together (diarrhea, diuretics, alcohol, aminoglycosides, PPI use)</li>
              </ul>
            </div>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <p className="font-bold mb-1">Clinical Rule:</p>
              <p className="text-sm">
                <strong>ALWAYS check serum magnesium in hypocalcemia.</strong> If Mg²⁺ is low, replete BOTH. Ca²⁺ repletion will fail without adequate Mg²⁺.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card className="mb-8 bg-gradient-to-br from-orange-500/10 to-amber-500/10">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Ionized vs total Ca²⁺:</strong> Acidosis increases ionized Ca²⁺ (H⁺ displaces Ca²⁺ from albumin). Alkalosis decreases ionized Ca²⁺ (symptoms of hypocalcemia can occur with normal total Ca²⁺).</li>
            <li>• <strong>Hungry bone syndrome:</strong> After parathyroidectomy for severe hyperparathyroidism, bone rapidly takes up Ca²⁺ → profound hypocalcemia. Requires aggressive Ca²⁺ repletion.</li>
            <li>• <strong>Thiazides for kidney stones:</strong> Thiazides ↓ urinary Ca²⁺ excretion → used to prevent calcium oxalate stones in hypercalciuria.</li>
            <li>• <strong>Vitamin D deficiency:</strong> Extremely common. Causes secondary hyperparathyroidism even before hypocalcemia develops. Check 25(OH)D level.</li>
            <li>• <strong>CaSR mutations:</strong> Familial hypocalciuric hypercalcemia (inactivating CaSR) → mild hypercalcemia with inappropriately low urine Ca²⁺. Benign, no treatment needed.</li>
            <li>• <strong>Phosphate-calcium product:</strong> Ca × PO₄ {">"}55-60 → risk of metastatic calcifications (especially in CKD). Manage with phosphate binders.</li>
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
            <li>Felsenfeld AJ, Levine BS. Calciotropic Hormones and the Kidney. In: Brenner & Rector's The Kidney, 11th Edition</li>
            <li>Goltzman D. Approach to Hypercalcemia. In: DeGroot's Endocrinology, 8th Edition</li>
            <li>Slatopolsky E, Brown A, Dusso A. Calcium, Phosphorus and Vitamin D. In: Brenner & Rector's The Kidney, 11th Edition</li>
            <li>UpToDate: Regulation of calcium and phosphate balance (2023)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
