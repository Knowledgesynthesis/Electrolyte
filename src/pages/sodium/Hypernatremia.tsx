import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Droplet } from 'lucide-react'

export default function Hypernatremia() {
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
          <Droplet className="w-10 h-10 text-red-500" />
          Hypernatremia
        </h1>
        <p className="text-xl text-muted-foreground">
          Serum sodium {">"}145 mmol/L — Water deficit and management
        </p>
      </div>

      {/* Critical Safety Warning */}
      <div className="safety-warning mb-8">
        <p className="font-bold text-lg mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Critical Safety Limit
        </p>
        <p className="text-sm mb-2">
          <strong>Never exceed 10-12 mmol/L correction in 24 hours</strong> to prevent cerebral edema.
          Slower correction (6-8 mmol/L/24h) is safer, especially for chronic hypernatremia.
        </p>
        <p className="text-xs">Rapid correction → water influx into brain → seizures, permanent neurologic damage</p>
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
                <p className="text-2xl">146-150 mmol/L</p>
                <p className="text-sm text-muted-foreground">Thirst, weakness</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-bold">Moderate</p>
                <p className="text-2xl">151-160 mmol/L</p>
                <p className="text-sm text-muted-foreground">Confusion, irritability, lethargy</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-bold">Severe</p>
                <p className="text-2xl">{">"}160 mmol/L</p>
                <p className="text-sm text-muted-foreground">Seizures, coma, death</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pathophysiology */}
      <Card className="mb-8 bg-primary/5">
        <CardHeader>
          <CardTitle>Core Concept: Hypernatremia = Free Water Deficit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              Hypernatremia always represents <strong>hyperosmolality</strong> and indicates either:
            </p>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li><strong>Pure water loss</strong> (most common): Insensible losses, diabetes insipidus, osmotic diuresis</li>
              <li><strong>Hypotonic fluid loss</strong>: GI losses (diarrhea), renal losses (diuretics)</li>
              <li><strong>Sodium gain</strong> (rare): Hypertonic saline, IV sodium bicarbonate, salt tablets, seawater ingestion</li>
            </ol>
            <p className="text-sm mt-3">
              <strong>Key insight:</strong> Intact thirst mechanism usually prevents hypernatremia. Patients at risk are those who can't access water (infants, elderly, intubated, altered mental status, immobile).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Approach */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Diagnostic Approach: Assess Urine Osmolality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-lg mb-3">Step 1: Measure Urine Osmolality</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold mb-2">Urine Osm {">"}700 mOsm/kg</p>
                  <p className="text-sm mb-2">Kidneys concentrating appropriately → <strong>Extrarenal water loss</strong></p>
                  <ul className="text-sm space-y-1">
                    <li>• Insensible losses (fever, burns, ventilation)</li>
                    <li>• GI losses (diarrhea)</li>
                    <li>• Inadequate water intake</li>
                  </ul>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-bold mb-2">Urine Osm {"<"}300 mOsm/kg</p>
                  <p className="text-sm mb-2">Kidneys NOT concentrating → <strong>Renal water loss</strong></p>
                  <p className="text-sm font-semibold mt-2">Diabetes Insipidus (DI)</p>
                  <ul className="text-sm space-y-1">
                    <li>• Central DI: ↓ ADH production (trauma, surgery, tumor)</li>
                    <li>• Nephrogenic DI: Kidney ADH resistance (lithium, hypercalcemia, chronic kidney disease)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded">
              <p className="font-bold mb-2">Urine Osm 300-700 mOsm/kg (Intermediate)</p>
              <p className="text-sm">Partial DI or osmotic diuresis (glucose, urea, mannitol)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diabetes Insipidus */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Diabetes Insipidus: Central vs Nephrogenic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded">
                <p className="font-bold text-lg mb-2">Central DI</p>
                <p className="text-sm mb-2"><strong>Pathophysiology:</strong> Inadequate ADH secretion from posterior pituitary</p>
                <p className="text-sm font-semibold mb-1">Causes:</p>
                <ul className="text-xs space-y-1">
                  <li>• Neurosurgery (transsphenoidal)</li>
                  <li>• Head trauma</li>
                  <li>• Pituitary tumors (craniopharyngioma)</li>
                  <li>• Infiltrative (sarcoidosis, histiocytosis X)</li>
                  <li>• Idiopathic</li>
                </ul>
                <p className="text-sm font-semibold mt-3 mb-1">Diagnosis:</p>
                <p className="text-xs">Water deprivation test: Urine Osm remains low, increases with desmopressin</p>
                <p className="text-sm font-semibold mt-2 mb-1">Treatment:</p>
                <p className="text-xs"><strong>Desmopressin (DDAVP)</strong> 0.1-0.2 mg PO BID or 10-20 mcg intranasal BID</p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded">
                <p className="font-bold text-lg mb-2">Nephrogenic DI</p>
                <p className="text-sm mb-2"><strong>Pathophysiology:</strong> Kidney resistance to ADH</p>
                <p className="text-sm font-semibold mb-1">Causes:</p>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Lithium</strong> (most common drug cause)</li>
                  <li>• Hypercalcemia</li>
                  <li>• Hypokalemia</li>
                  <li>• Chronic kidney disease</li>
                  <li>• Post-obstructive uropathy</li>
                  <li>• Genetic (V2 receptor, aquaporin-2 mutations)</li>
                </ul>
                <p className="text-sm font-semibold mt-3 mb-1">Diagnosis:</p>
                <p className="text-xs">Water deprivation test: Urine Osm remains low, does NOT increase with desmopressin</p>
                <p className="text-sm font-semibold mt-2 mb-1">Treatment:</p>
                <p className="text-xs">Remove offending agent, <strong>thiazide diuretics</strong> + low-salt diet, <strong>amiloride</strong> (for lithium-induced), NSAIDs</p>
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
            <div>
              <p className="font-bold text-lg mb-2">Calculate Water Deficit</p>
              <div className="bg-muted p-4 rounded">
                <code className="text-sm">
                  Water deficit (L) = TBW × [(Current Na / 140) - 1]<br />
                  <br />
                  TBW = 0.6 × weight (kg) for men<br />
                  TBW = 0.5 × weight (kg) for women
                </code>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-3">Fluid Selection</p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">Mild Hypernatremia + Conscious:</p>
                  <p className="text-sm">Oral free water (best). IV if can't tolerate PO.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold">Moderate-Severe OR Altered Mental Status:</p>
                  <p className="text-sm mb-1"><strong>D5W</strong> (5% dextrose in water) — pure free water replacement</p>
                  <p className="text-xs">Alternative: 0.45% saline (half-normal saline) if also volume depleted</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">Hypovolemic Hypernatremia:</p>
                  <p className="text-sm">Restore volume with 0.9% NS first, then switch to hypotonic fluids</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-950 p-4 rounded">
              <p className="font-bold mb-2">Correction Rate & Monitoring</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Acute hypernatremia ({"<"}24h):</strong> Can correct faster (1 mmol/L/hr) — brain hasn't adapted</li>
                <li>• <strong>Chronic hypernatremia ({">"}48h):</strong> Correct slowly ≤10 mmol/L per 24h — brain has adapted with idiogenic osmoles</li>
                <li>• Check Na every 2-4 hours during active correction</li>
                <li>• Adjust IV rate based on response</li>
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
            <li>• <strong>Hypernatremia = sentinel for poor outcomes:</strong> Often indicates severe illness or lack of access to care (immobile, demented, intubated). Mortality 40-60% in hospitalized patients.</li>
            <li>• <strong>Osmotic demyelination with hypernatremia?</strong> No. ODS occurs with rapid Na RISE (hypo→normal), not with rapid Na FALL (hyper→normal).</li>
            <li>• <strong>Post-op neurosurgery:</strong> Watch for central DI (sudden polyuria). Triphasic response: DI → SIADH → permanent DI.</li>
            <li>• <strong>Lithium toxicity:</strong> Causes nephrogenic DI. Check lithium level, hold lithium, consider amiloride.</li>
            <li>• <strong>Elderly paradox:</strong> Blunted thirst response despite intact ADH. Hypernatremia common in nursing homes.</li>
            <li>• <strong>Formula caveat:</strong> Water deficit formula assumes total body water is normal. Adjust for obesity or severe dehydration.</li>
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
            <li>Sterns RH, et al. Disorders of Water Balance. In: Brenner & Rector's The Kidney, 11th Edition</li>
            <li>Adrogué HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342:1493-1499</li>
            <li>Liamis G, et al. Diabetes insipidus: Diagnosis and management. Hormones. 2016;15:30-40</li>
            <li>UpToDate: Treatment of hypernatremia in adults (2023)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link to="/calculators/sodium-correction">
          <Button>Sodium Correction Calculator</Button>
        </Link>
        <Link to="/cases">
          <Button variant="outline">Practice Cases</Button>
        </Link>
      </div>
    </div>
  )
}
