import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Droplet, Brain } from 'lucide-react'

export default function SodiumPhysiology() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/sodium">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sodium
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Droplet className="w-10 h-10 text-blue-500" />
          Sodium Physiology
        </h1>
        <p className="text-xl text-muted-foreground">
          Normal sodium handling, osmolarity, and water balance
        </p>
      </div>

      {/* Core Concept */}
      <Card className="mb-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Core Concept: Sodium Determines Osmolarity, Not Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="font-bold text-base">Key Principle:</p>
            <p>
              <strong>Serum [Na⁺] primarily reflects water balance, not sodium balance.</strong>
            </p>
            <p>
              Sodium is the dominant osmotically active cation in the extracellular fluid. Changes in serum [Na⁺]
              represent changes in the ratio of total body sodium to total body water.
            </p>
            <div className="bg-muted p-3 rounded mt-3">
              <p className="font-semibold mb-1">Clinical Translation:</p>
              <ul className="space-y-1 text-xs">
                <li>• Low Na⁺ (hyponatremia) = Too much water relative to sodium</li>
                <li>• High Na⁺ (hypernatremia) = Too little water relative to sodium</li>
                <li>• Volume status (edema, dehydration) reflects total body sodium, not serum [Na⁺]</li>
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
              <p className="font-bold mb-2">Serum Sodium</p>
              <p className="text-3xl text-primary mb-2">135-145 mmol/L</p>
              <p className="text-sm text-muted-foreground">Note: mmol/L = mEq/L for monovalent ions</p>
              <p className="text-sm mt-3">
                <strong>Serum osmolality:</strong> 275-295 mOsm/kg
              </p>
              <code className="text-xs bg-muted p-2 rounded block mt-2">
                Serum Osm ≈ 2 × [Na] + [Glucose]/18 + [BUN]/2.8
              </code>
            </div>
            <div>
              <p className="font-bold mb-2">Sodium Distribution</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Extracellular [Na⁺]</span>
                  <span className="font-bold">~140 mmol/L</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Intracellular [Na⁺]</span>
                  <span className="font-bold">~10 mmol/L</span>
                </div>
                <p className="text-xs mt-3">
                  This 14:1 gradient is maintained by the Na-K-ATPase pump, which uses ~30% of the body's ATP.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ADH System */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ADH (Vasopressin): The Master Regulator of Water Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded">
              <p className="font-bold mb-2">ADH Synthesis & Release</p>
              <p className="text-sm">
                Synthesized in hypothalamus (supraoptic & paraventricular nuclei), stored in posterior pituitary, released into bloodstream
              </p>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Triggers for ADH Release</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">Osmotic Stimulation (Primary)</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Detected by hypothalamic osmoreceptors</li>
                    <li>• Threshold: ~280 mOsm/kg</li>
                    <li>• Very sensitive: 1-2% ↑ in osmolality → robust ADH release</li>
                    <li>• Result: ↑ water reabsorption → dilute serum osmolality</li>
                  </ul>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold">Non-Osmotic Stimulation</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Volume depletion ({">"} 10% loss): baroreceptors in carotid/aorta</li>
                    <li>• Nausea (very potent trigger)</li>
                    <li>• Pain, stress, hypoxia</li>
                    <li>• Medications: SSRIs, carbamazepine, vincristine</li>
                    <li>• Result: Water retention even if serum is hypotonic</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">ADH Mechanism of Action</p>
              <div className="bg-muted p-4 rounded space-y-2 text-sm">
                <p><strong>1.</strong> ADH binds to V2 receptors on collecting duct principal cells</p>
                <p><strong>2.</strong> Triggers insertion of aquaporin-2 (AQP2) water channels into apical membrane</p>
                <p><strong>3.</strong> Water flows from tubular lumen → cell → blood (following osmotic gradient)</p>
                <p><strong>4.</strong> Result: <strong>Concentrated urine</strong> (Urine Osm up to 1200 mOsm/kg)</p>
                <p className="mt-3"><strong>Without ADH:</strong> AQP2 channels internalized → collecting duct impermeable to water → <strong>dilute urine</strong> (Urine Osm 50-100 mOsm/kg)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thirst */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Thirst: The Primary Defense Against Hypernatremia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              Thirst is triggered by the same hypothalamic osmoreceptors that stimulate ADH, but at a slightly higher threshold (~295 mOsm/kg vs 280 for ADH).
            </p>
            <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
              <p className="font-bold mb-1">Clinical Insight:</p>
              <p className="text-xs">
                Intact thirst mechanism prevents hypernatremia in healthy individuals with access to water.
                Hypernatremia occurs when thirst is impaired (elderly, dementia) or access to water is restricted
                (intubated, infants, immobile, altered mental status).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Renal Sodium Handling */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Renal Sodium Handling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-bold mb-2">Daily Sodium Balance</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold">Filtered</p>
                  <p className="text-2xl">~25,000 mEq/day</p>
                  <p className="text-xs">(140 mEq/L × 180 L GFR)</p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="font-semibold">Excreted</p>
                  <p className="text-2xl">~100-200 mEq/day</p>
                  <p className="text-xs">(matches dietary intake)</p>
                </div>
              </div>
              <p className="text-sm mt-3">
                <strong>Reabsorption: {">"}99%</strong> of filtered sodium is reabsorbed
              </p>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Sites of Sodium Reabsorption</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">PCT (67%)</span>
                  <span>Proximal convoluted tubule — bulk reabsorption, follows water</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">TAL (25%)</span>
                  <span>Thick ascending limb — Na-K-2Cl cotransporter (NKCC2), target of loop diuretics</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-muted rounded">
                  <span className="font-bold min-w-[100px]">DCT (5%)</span>
                  <span>Distal convoluted tubule — NaCl cotransporter (NCC), target of thiazides</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-primary/10 rounded">
                  <span className="font-bold min-w-[100px]">CD (2-3%)</span>
                  <span><strong>Collecting duct — ENaC channels, regulated by aldosterone</strong> (fine-tuning)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aldosterone */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Aldosterone: Volume Regulator (Not Osmolarity)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Aldosterone regulates sodium reabsorption (and thus extracellular volume), not serum [Na⁺].</strong>
            </p>
            <div className="bg-muted p-3 rounded space-y-2">
              <p className="font-semibold">RAAS Cascade:</p>
              <p>↓ Renal perfusion → Renin release → Angiotensin I → ACE → Angiotensin II → Aldosterone secretion</p>
              <p className="font-semibold mt-2">Aldosterone Actions:</p>
              <ul className="text-xs space-y-1 ml-4">
                <li>• ↑ Na⁺ reabsorption in collecting duct (via ENaC)</li>
                <li>• ↑ K⁺ secretion (exchange for Na⁺)</li>
                <li>• ↑ H⁺ secretion (can cause metabolic alkalosis)</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded mt-3">
              <p className="font-bold mb-1">Key Concept:</p>
              <p className="text-xs">
                Aldosterone causes sodium AND water retention → expands extracellular volume → BUT serum [Na⁺] stays normal because water is retained proportionally. This is why hyperaldosteronism causes hypertension and hypokalemia, NOT hypernatremia.
              </p>
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
            <li>• <strong>ADH vs Aldosterone:</strong> ADH regulates osmolarity (by controlling water). Aldosterone regulates volume (by controlling sodium).</li>
            <li>• <strong>Effective arterial blood volume (EABV):</strong> The volume sensed by arterial baroreceptors. In CHF/cirrhosis, total volume↑ but EABV↓ → RAAS activation → Na retention → edema</li>
            <li>• <strong>Sodium paradox in heart failure:</strong> Hyponatremia common in decompensated CHF despite total body sodium excess. Mechanism: ↓ EABV → ADH release → water retention {">"} sodium retention → dilutional hyponatremia</li>
            <li>• <strong>Osmotic threshold:</strong> Normal individuals begin releasing ADH at serum Osm 280-290, feel thirsty at 295, and can concentrate urine to 1200 mOsm/kg</li>
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
            <li>Mount DB. Fluid and Electrolyte Disturbances. In: Harrison's Principles of Internal Medicine, 21st Edition</li>
            <li>Rose BD, Post TW. Clinical Physiology of Acid-Base and Electrolyte Disorders, 5th Edition</li>
            <li>Guyton & Hall. Textbook of Medical Physiology, 14th Edition</li>
            <li>Boron WF, Boulpaep EL. Medical Physiology, 3rd Edition</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
