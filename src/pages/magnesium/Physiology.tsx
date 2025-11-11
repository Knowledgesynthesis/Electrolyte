import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Activity } from 'lucide-react'

export default function MagnesiumPhysiology() {
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
          <Sparkles className="w-10 h-10 text-emerald-500" />
          Magnesium Physiology
        </h1>
        <p className="text-xl text-muted-foreground">
          Normal magnesium handling, enzyme function, and electrolyte interactions
        </p>
      </div>

      {/* Core Concept */}
      <Card className="mb-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Core Concept: Magnesium, The "Forgotten Electrolyte"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="font-bold text-base">Key Principle:</p>
            <p>
              <strong>Magnesium is the second most abundant intracellular cation and a cofactor for {">"}300 enzymatic reactions, including ATP-dependent processes, protein synthesis, and nucleic acid stability.</strong>
            </p>
            <p>
              Magnesium is essential for neuromuscular function, cardiovascular stability, and electrolyte homeostasis. It has critical interactions with potassium and calcium that make it indispensable in clinical practice.
            </p>
            <div className="bg-muted p-3 rounded mt-3">
              <p className="font-semibold mb-1">Clinical Translation:</p>
              <ul className="space-y-1 text-xs">
                <li>• Low Mg²⁺ (hypomagnesemia) → Refractory hypokalemia, hypocalcemia, arrhythmias, tetany</li>
                <li>• High Mg²⁺ (hypermagnesemia) → Muscle weakness, hyporeflexia, cardiac conduction blocks</li>
                <li>• Often overlooked but critical — "check magnesium!" should be reflex in K⁺/Ca²⁺ disorders</li>
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
              <p className="font-bold mb-2">Serum Magnesium</p>
              <p className="text-3xl text-primary mb-2">1.5-2.5 mg/dL</p>
              <p className="text-sm text-muted-foreground">(0.7-1.1 mmol/L or 1.4-2.2 mEq/L)</p>
              <p className="text-sm mt-3">
                <strong>Critical values:</strong>
              </p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• {"<"}1.2 mg/dL: Severe hypomagnesemia</li>
                <li>• {">"}4.0 mg/dL: Symptomatic hypermagnesemia</li>
                <li>• {">"}6.0 mg/dL: Respiratory depression, cardiac arrest</li>
              </ul>
              <p className="text-xs mt-3 bg-amber-100 dark:bg-amber-950 p-2 rounded">
                <strong>Caveat:</strong> Serum Mg²⁺ poorly reflects total body stores. Normal serum Mg²⁺ doesn't exclude deficiency. Consider RBC Mg²⁺ or Mg²⁺ loading test if high suspicion.
              </p>
            </div>
            <div>
              <p className="font-bold mb-2">Magnesium Distribution</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Bone (reservoir)</span>
                  <span className="font-bold">~50-60%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Intracellular (muscle, soft tissue)</span>
                  <span className="font-bold">~39%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                  <span>Extracellular (serum)</span>
                  <span className="font-bold">~1%</span>
                </div>
                <p className="text-xs mt-3">
                  Total body Mg²⁺ ~25 g (1000 mmol). Most is intracellular or bound in bone. Serum represents only ~1% of total body stores.
                </p>
                <p className="text-xs mt-2">
                  <strong>Serum fractions:</strong> 30% protein-bound, 55% ionized (active form), 15% complexed (citrate, phosphate)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Physiologic Functions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Magnesium: Essential Cofactor for Life</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded">
              <p className="font-bold mb-2">Cofactor for {">"}300 Enzymatic Reactions</p>
              <p className="text-sm">
                Mg²⁺ is required for all ATP-dependent reactions (forms Mg-ATP complex). Without adequate Mg²⁺, cellular energy metabolism fails.
              </p>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Key Physiologic Roles</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <p className="font-semibold">Energy Metabolism</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Cofactor for ATP synthesis (mitochondrial function)</li>
                    <li>• Glycolysis, Krebs cycle, oxidative phosphorylation</li>
                    <li>• Creatine kinase (muscle energy)</li>
                  </ul>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">Nucleic Acid Stability</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• DNA and RNA synthesis</li>
                    <li>• Protein synthesis (ribosomal function)</li>
                    <li>• DNA repair mechanisms</li>
                  </ul>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold">Ion Channel Regulation</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• <strong>Na-K-ATPase function</strong> (requires Mg-ATP)</li>
                    <li>• Calcium channel regulation</li>
                    <li>• NMDA receptor antagonist (neuroprotective)</li>
                  </ul>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-semibold">Cardiovascular Function</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Vasodilation (Ca²⁺ channel blockade)</li>
                    <li>• Cardiac rhythm stability</li>
                    <li>• Blood pressure regulation</li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Neuromuscular Function</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Acetylcholine release at NMJ</li>
                    <li>• Muscle contraction (competes with Ca²⁺)</li>
                    <li>• Nerve conduction</li>
                  </ul>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">Electrolyte Homeostasis</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• <strong>PTH secretion and action</strong></li>
                    <li>• Renal K⁺ handling (ROMK channel)</li>
                    <li>• Ca²⁺ metabolism</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Renal Handling */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Renal Magnesium Handling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-bold mb-2">Daily Magnesium Balance</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold">Dietary Intake</p>
                  <p className="text-2xl">300-400 mg/day</p>
                  <p className="text-xs">(Green vegetables, nuts, whole grains)</p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold">Absorption & Excretion</p>
                  <p className="text-2xl">30-50% absorbed (GI)</p>
                  <p className="text-xs">Kidneys excrete ~100 mg/day</p>
                </div>
              </div>
              <p className="text-xs mt-3">GI absorption increases with low Mg²⁺ intake. Kidneys are primary regulators of Mg²⁺ homeostasis.</p>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Sites of Renal Mg²⁺ Handling</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">PCT (10-25%)</span>
                  <span>Proximal tubule — passive paracellular reabsorption (follows Na⁺ and water)</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-primary/10 rounded">
                  <span className="font-bold min-w-[100px]">TAL (50-70%)</span>
                  <span><strong>Thick ascending limb — PRIMARY site of regulation</strong>. Paracellular via claudin-16/19. Driven by positive lumen potential (Na-K-2Cl cotransporter).</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">DCT (5-10%)</span>
                  <span>Distal convoluted tubule — active transcellular via TRPM6/7 channels (fine-tuning)</span>
                </div>
              </div>
              <p className="text-xs mt-3">
                Unlike other electrolytes, the TAL (not distal nephron) is the main regulatory site. Loop diuretics cause severe Mg²⁺ wasting.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded">
              <p className="font-bold mb-2">Factors Affecting Renal Mg²⁺ Handling:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-semibold">↑ Excretion (Hypomagnesemia):</p>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• Loop diuretics (block NKCC2 → ↓ lumen potential)</li>
                    <li>• Thiazides (less effect than loops)</li>
                    <li>• Hypercalcemia (competes for reabsorption)</li>
                    <li>• Volume expansion</li>
                    <li>• Metabolic acidosis</li>
                    <li>• Alcohol</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">↓ Excretion (Hypermagnesemia):</p>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• Renal failure (GFR {"<"}30)</li>
                    <li>• Volume depletion</li>
                    <li>• Hypothyroidism</li>
                    <li>• PTH (modest effect)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GI Absorption */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gastrointestinal Magnesium Absorption</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              Mg²⁺ is absorbed throughout the GI tract, but primarily in the <strong>jejunum and ileum</strong>.
            </p>
            <div className="bg-muted p-3 rounded space-y-2">
              <p className="font-semibold">Mechanisms of Absorption:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <strong>Passive paracellular:</strong> Predominant mechanism at high luminal Mg²⁺ concentrations</li>
                <li>• <strong>Active transcellular:</strong> TRPM6/7 channels — upregulated with Mg²⁺ deficiency</li>
              </ul>
              <p className="font-semibold mt-2">Factors Decreasing Absorption:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <strong>Proton pump inhibitors (PPIs)</strong> — impair TRPM6/7 function (major cause of hypomagnesemia)</li>
                <li>• High-fiber diet (phytates bind Mg²⁺)</li>
                <li>• Malabsorption syndromes (Crohn's disease, celiac, short bowel)</li>
                <li>• Chronic diarrhea</li>
                <li>• Alcohol (direct intestinal toxicity)</li>
              </ul>
            </div>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded mt-3">
              <p className="font-bold mb-1">Clinical Pearl:</p>
              <p className="text-xs">
                <strong>PPI-induced hypomagnesemia</strong> is increasingly recognized. Chronic PPI use (especially {">"}1 year) can cause profound Mg²⁺ deficiency. Check Mg²⁺ in long-term PPI users with unexplained symptoms.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Electrolyte Interactions */}
      <Card className="mb-8 bg-gradient-to-br from-emerald-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle>CRITICAL: Magnesium Interactions with K⁺ and Ca²⁺</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded">
              <p className="font-bold text-lg mb-2">Magnesium-Potassium Connection</p>
              <p className="text-sm mb-2">
                <strong>Up to 40% of hypokalemia patients have concurrent hypomagnesemia.</strong>
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Mechanisms:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Mg²⁺ required for Na-K-ATPase function → without Mg²⁺, can't maintain K⁺ gradient</li>
                  <li>• Low Mg²⁺ → increased ROMK activity in collecting duct → renal K⁺ wasting</li>
                  <li>• Both often lost together (diarrhea, diuretics, alcohol)</li>
                </ul>
                <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded mt-2">
                  <p className="font-bold text-sm">Clinical Rule:</p>
                  <p className="text-xs"><strong>Hypokalemia refractory to K⁺ repletion? Check and correct Mg²⁺ first!</strong> Cannot correct K⁺ without adequate Mg²⁺.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded">
              <p className="font-bold text-lg mb-2">Magnesium-Calcium Connection</p>
              <p className="text-sm mb-2">
                <strong>Hypomagnesemia is a common cause of refractory hypocalcemia.</strong>
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Mechanisms:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Severe hypomagnesemia ({"<"}1.0 mg/dL) → impaired PTH secretion</li>
                  <li>• Mg²⁺ required for PTH receptor signaling → end-organ PTH resistance</li>
                  <li>• Both often lost together (diarrhea, diuretics, aminoglycosides, cisplatin)</li>
                </ul>
                <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded mt-2">
                  <p className="font-bold text-sm">Clinical Rule:</p>
                  <p className="text-xs"><strong>Hypocalcemia refractory to Ca²⁺ repletion? Check and correct Mg²⁺!</strong> PTH won't work without Mg²⁺.</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded">
              <p className="font-bold mb-2">Magnesium vs Calcium: Physiologic Antagonism</p>
              <p className="text-sm">Mg²⁺ acts as a natural calcium channel blocker. Competes with Ca²⁺ for binding sites on proteins, channels, and cellular processes.</p>
              <ul className="text-xs space-y-1 ml-4 mt-2">
                <li>• Muscle contraction: Ca²⁺ stimulates, Mg²⁺ relaxes</li>
                <li>• Vasodilation: Mg²⁺ causes smooth muscle relaxation (used in eclampsia, asthma)</li>
                <li>• Neuronal excitability: Mg²⁺ dampens NMDA receptors (neuroprotective)</li>
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
            <li>• <strong>Serum Mg²⁺ underestimates deficiency:</strong> Normal serum Mg²⁺ doesn't exclude total body depletion (99% is intracellular). Consider trial of Mg²⁺ supplementation if high clinical suspicion.</li>
            <li>• <strong>PPI-induced hypomagnesemia:</strong> Increasingly recognized. Chronic PPI use impairs intestinal Mg²⁺ absorption. Consider discontinuing PPI if possible.</li>
            <li>• <strong>Alcohol and Mg²⁺:</strong> Multifactorial depletion — poor intake, GI losses, renal wasting, shift into cells during refeeding. Check and replete in alcohol use disorder.</li>
            <li>• <strong>Loop diuretics:</strong> Cause more severe Mg²⁺ wasting than thiazides (block TAL reabsorption). Consider K⁺-Mg²⁺ combination supplements in chronic diuretic users.</li>
            <li>• <strong>Gitelman syndrome:</strong> Genetic defect mimicking chronic thiazide use → hypokalemia + hypomagnesemia + metabolic alkalosis. Distinguish from Bartter (which spares Mg²⁺).</li>
            <li>• <strong>Aminoglycosides and cisplatin:</strong> Cause renal Mg²⁺ wasting via tubular toxicity. Monitor Mg²⁺ during treatment.</li>
            <li>• <strong>Torsades de pointes:</strong> Mg²⁺ sulfate 2 g IV is first-line treatment regardless of Mg²⁺ level (membrane-stabilizing effect).</li>
            <li>• <strong>Dietary sources:</strong> Green leafy vegetables (chlorophyll has Mg²⁺), nuts, seeds, whole grains, legumes, dark chocolate.</li>
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
            <li>Romani AMP. Cellular Magnesium Homeostasis. Arch Biochem Biophys. 2011;512:1-23</li>
            <li>de Baaij JHF, et al. Magnesium in Man: Implications for Health and Disease. Physiol Rev. 2015;95:1-46</li>
            <li>Vormann J. Magnesium: Nutrition and Metabolism. Mol Aspects Med. 2003;24:27-37</li>
            <li>Mount DB, Zandi-Nejad K. Disorders of Potassium Balance. In: Brenner & Rector's The Kidney, 11th Edition</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
