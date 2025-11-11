import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Zap, Activity } from 'lucide-react'

export default function PotassiumPhysiology() {
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
          <Zap className="w-10 h-10 text-purple-500" />
          Potassium Physiology
        </h1>
        <p className="text-xl text-muted-foreground">
          Normal potassium handling, membrane potential, and cellular function
        </p>
      </div>

      {/* Core Concept */}
      <Card className="mb-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Core Concept: Potassium Determines Membrane Potential
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="font-bold text-base">Key Principle:</p>
            <p>
              <strong>Serum [K⁺] primarily determines resting membrane potential in excitable tissues (heart, skeletal muscle, nerves).</strong>
            </p>
            <p>
              Small changes in extracellular K⁺ have profound effects on membrane excitability because 98% of total body potassium is intracellular. The K⁺ gradient across cell membranes is essential for normal cardiac and neuromuscular function.
            </p>
            <div className="bg-muted p-3 rounded mt-3">
              <p className="font-semibold mb-1">Clinical Translation:</p>
              <ul className="space-y-1 text-xs">
                <li>• Low K⁺ (hypokalemia) → Hyperpolarization → Muscle weakness, arrhythmias</li>
                <li>• High K⁺ (hyperkalemia) → Depolarization → Cardiac arrest risk</li>
                <li>• ECG changes are the most important clinical manifestation</li>
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
              <p className="font-bold mb-2">Serum Potassium</p>
              <p className="text-3xl text-primary mb-2">3.5-5.0 mmol/L</p>
              <p className="text-sm text-muted-foreground">Note: mmol/L = mEq/L for monovalent ions</p>
              <p className="text-sm mt-3">
                <strong>Critical values:</strong>
              </p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• {"<"}2.5 mmol/L: Severe hypokalemia</li>
                <li>• {">"}6.0 mmol/L: Severe hyperkalemia</li>
                <li>• {">"}7.0 mmol/L: Life-threatening</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-2">Potassium Distribution</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Intracellular [K⁺]</span>
                  <span className="font-bold">~140 mmol/L</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Extracellular [K⁺]</span>
                  <span className="font-bold">~4 mmol/L</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-primary/10 rounded">
                  <span>Total body K⁺</span>
                  <span className="font-bold">~3500 mEq (50 mEq/kg)</span>
                </div>
                <p className="text-xs mt-3">
                  This 35:1 gradient is maintained by the Na-K-ATPase pump (3 Na⁺ out, 2 K⁺ in), which consumes ~30% of the body's ATP at rest.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Na-K-ATPase */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Na-K-ATPase: The Master Pump</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded">
              <p className="font-bold mb-2">Mechanism of Action</p>
              <p className="text-sm">
                The Na-K-ATPase actively transports 3 Na⁺ out and 2 K⁺ in per ATP hydrolyzed, creating and maintaining the electrochemical gradients essential for cellular function.
              </p>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Key Functions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold">Maintains Resting Membrane Potential</p>
                  <p className="text-sm">Typically -70 to -90 mV (inside negative)</p>
                  <p className="text-xs mt-2">Determined primarily by K⁺ gradient via Nernst equation:</p>
                  <code className="text-xs bg-muted p-2 rounded block mt-1">
                    E_K = -61 log([K⁺]in/[K⁺]out)
                  </code>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">Enables Cellular Excitability</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Action potentials (nerves, muscle)</li>
                    <li>• Cardiac pacemaker activity</li>
                    <li>• Neurotransmitter release</li>
                    <li>• Muscle contraction</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <p className="font-bold mb-1">Clinical Insight:</p>
              <p className="text-sm">
                <strong>Digoxin</strong> inhibits Na-K-ATPase, leading to increased intracellular Ca²⁺ (positive inotrope). However, this also makes patients more susceptible to hypokalemia-induced arrhythmias because K⁺ competes with digoxin for the pump binding site.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* K Distribution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Transcellular Potassium Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Potassium constantly shifts between intracellular and extracellular compartments. Acute changes in serum K⁺ often reflect shifts rather than total body K⁺ changes.
            </p>

            <div>
              <p className="font-bold text-lg mb-3">Factors Shifting K⁺ INTO Cells (↓ Serum K⁺)</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">Insulin</span>
                  <span>Activates Na-K-ATPase → K⁺ uptake (used therapeutically in hyperkalemia)</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">β2-agonists</span>
                  <span>Albuterol, epinephrine → activate Na-K-ATPase</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">Alkalosis</span>
                  <span>H⁺ exits cells, K⁺ enters to maintain electroneutrality (0.6 mmol/L ↓ per 0.1 pH ↑)</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">Hypothermia</span>
                  <span>Enhanced Na-K-ATPase activity</span>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Factors Shifting K⁺ OUT of Cells (↑ Serum K⁺)</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">Insulin deficiency</span>
                  <span>Diabetic ketoacidosis → hyperkalemia despite total body K⁺ depletion</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">Acidosis</span>
                  <span>H⁺ enters cells, K⁺ exits (metabolic {'>'} respiratory effect)</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">Hyperosmolality</span>
                  <span>Water exits cells, drags K⁺ via solvent drag</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">Cell lysis</span>
                  <span>Rhabdomyolysis, tumor lysis syndrome, hemolysis</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">β-blockers</span>
                  <span>Inhibit cellular K⁺ uptake (usually mild effect)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Renal Potassium Handling */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Renal Potassium Handling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-bold mb-2">Daily Potassium Balance</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold">Dietary Intake</p>
                  <p className="text-2xl">50-100 mEq/day</p>
                  <p className="text-xs">(Western diet)</p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold">Excretion</p>
                  <p className="text-2xl">90% renal, 10% GI</p>
                  <p className="text-xs">(matches intake)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Sites of Renal K⁺ Handling</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[120px]">PCT (67%)</span>
                  <span>Proximal tubule — passive reabsorption with water and Na⁺</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[120px]">TAL (20%)</span>
                  <span>Thick ascending limb — Na-K-2Cl cotransporter (NKCC2)</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-primary/10 rounded">
                  <span className="font-bold min-w-[120px]">CD (Variable)</span>
                  <span><strong>Collecting duct — principal site of K⁺ SECRETION</strong> (aldosterone-regulated)</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded">
              <p className="font-bold mb-2">K⁺ Secretion in Collecting Duct</p>
              <p className="text-sm mb-2">Unlike Na⁺ (which is reabsorbed), K⁺ is actively secreted in the collecting duct via principal cells:</p>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Na-K-ATPase on basolateral membrane pumps K⁺ into principal cells</li>
                <li>ROMK channels on apical membrane secrete K⁺ into tubular lumen</li>
                <li>Na⁺ reabsorption via ENaC creates negative lumen → drives K⁺ secretion</li>
              </ol>
              <p className="text-sm mt-3 font-semibold">Factors increasing K⁺ secretion:</p>
              <ul className="text-xs space-y-1 ml-4">
                <li>• High aldosterone</li>
                <li>• High distal tubular flow (diuretics)</li>
                <li>• High distal Na⁺ delivery</li>
                <li>• Metabolic alkalosis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aldosterone */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Aldosterone: The Master Regulator of K⁺ Excretion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Aldosterone increases K⁺ secretion in the collecting duct.</strong>
            </p>
            <div className="bg-muted p-3 rounded space-y-2">
              <p className="font-semibold">Triggers for Aldosterone Release:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <strong>Hyperkalemia</strong> (direct effect on adrenal zona glomerulosa) — most potent stimulus</li>
                <li>• Angiotensin II (via RAAS from hypovolemia)</li>
                <li>• ACTH (minor effect)</li>
              </ul>
              <p className="font-semibold mt-2">Aldosterone Actions:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• ↑ Na⁺ reabsorption (via ENaC)</li>
                <li>• ↑ K⁺ secretion (via ROMK)</li>
                <li>• ↑ H⁺ secretion (via H⁺-ATPase in α-intercalated cells)</li>
              </ul>
            </div>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded mt-3">
              <p className="font-bold mb-1">Clinical Pearl:</p>
              <p className="text-xs">
                The K⁺-aldosterone feedback loop is critical for K⁺ homeostasis. Hyperkalemia stimulates aldosterone → increases K⁺ excretion. This is why patients with hyperkalemia should be evaluated for hypoaldosteronism (Addison's disease, type 4 RTA).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card className="mb-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Pseudohyperkalemia:</strong> Hemolysis during blood draw releases intracellular K⁺ → falsely elevated. Repeat with careful venipuncture.</li>
            <li>• <strong>K⁺ adaptation:</strong> Chronic hyperkalemia (CKD) → increased colonic K⁺ secretion (GI becomes important route)</li>
            <li>• <strong>Exercise effect:</strong> K⁺ released from muscle during exercise → transient ↑ serum K⁺ → normalizes with rest</li>
            <li>• <strong>Potassium sparing diuretics:</strong> Amiloride/triamterene block ENaC, spironolactone/eplerenone block aldosterone → decreased K⁺ secretion</li>
            <li>• <strong>Loop vs thiazide diuretics:</strong> Both cause hypokalemia by increasing distal Na⁺ delivery and flow. Loop diuretics {'>'} thiazides for K⁺ wasting.</li>
            <li>• <strong>RAAS inhibitors:</strong> ACEi/ARBs decrease aldosterone → hyperkalemia risk, especially with CKD or diabetes</li>
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
            <li>Gennari FJ. Disorders of Potassium Homeostasis: Hypokalemia and Hyperkalemia. Crit Care Clin. 2002;18:273-288</li>
            <li>Palmer BF, Clegg DJ. Physiology and Pathophysiology of Potassium Homeostasis. Adv Physiol Educ. 2016;40:480-490</li>
            <li>Mount DB. Fluid and Electrolyte Disturbances. In: Harrison's Principles of Internal Medicine, 21st Edition</li>
            <li>Boron WF, Boulpaep EL. Medical Physiology, 3rd Edition - Chapter 36: Transport of Solutes and Water</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
