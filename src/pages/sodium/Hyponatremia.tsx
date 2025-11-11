import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertTriangle, Activity } from 'lucide-react'

export default function Hyponatremia() {
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
          <Activity className="w-10 h-10 text-blue-500" />
          Hyponatremia
        </h1>
        <p className="text-xl text-muted-foreground">
          Serum sodium {"<"} 135 mmol/L — Diagnosis and safe management
        </p>
      </div>

      {/* Critical Safety Warning */}
      <div className="safety-warning mb-8">
        <p className="font-bold text-lg mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Critical Safety Limit
        </p>
        <p className="text-sm mb-2">
          <strong>Never exceed 8-10 mmol/L correction in 24 hours</strong> to prevent osmotic demyelination syndrome (ODS).
          Slower correction (4-6 mmol/L/24h) is safer for chronic hyponatremia.
        </p>
        <p className="text-xs">High-risk patients: Malnutrition, alcoholism, liver disease, chronic hypoNa {">"} 48h</p>
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
                <p className="text-2xl">130-134 mmol/L</p>
                <p className="text-sm text-muted-foreground">Often asymptomatic</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-bold">Moderate</p>
                <p className="text-2xl">125-129 mmol/L</p>
                <p className="text-sm text-muted-foreground">Nausea, confusion, headache</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-bold">Severe</p>
                <p className="text-2xl">{"<"} 125 mmol/L</p>
                <p className="text-sm text-muted-foreground">Seizures, coma, respiratory arrest</p>
              </div>
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
              <p className="font-bold text-lg mb-2">Step 1: Assess Serum Osmolality</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded">
                  <p className="font-semibold">Hypotonic ({"<"}280)</p>
                  <p className="text-sm">True hyponatremia — Most common</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                  <p className="font-semibold">Isotonic (280-295)</p>
                  <p className="text-sm">Pseudohyponatremia (lipids/proteins)</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded">
                  <p className="font-semibold">Hypertonic ({">"}295)</p>
                  <p className="text-sm">Translocational (glucose, mannitol)</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold text-lg mb-2">Step 2: Assess Volume Status (for Hypotonic HypoNa)</p>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-bold">Hypovolemic (Total body Na↓↓, Water↓)</p>
                  <p className="text-sm mb-2">Physical exam: Dry mucous membranes, orthostatic hypotension, tachycardia</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Urine Na {">"} 20: Renal losses</p>
                      <p className="text-xs">Diuretics, salt-wasting, cerebral salt wasting, mineralocorticoid deficiency</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Urine Na {"<"} 20: Extrarenal losses</p>
                      <p className="text-xs">Vomiting, diarrhea, third-spacing, burns</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold">Euvolemic (Total body Na normal, Water↑)</p>
                  <p className="text-sm mb-2">Physical exam: Normal skin turgor, no edema, normal BP</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-primary/10 p-3 rounded">
                      <p className="font-bold mb-1">SIADH (Most Common)</p>
                      <p className="text-xs mb-1"><strong>Criteria:</strong> Urine Osm {">"}100, Urine Na {">"}20, normal thyroid/adrenal</p>
                      <p className="text-xs"><strong>Causes:</strong> Malignancy (SCLC), CNS disease, pulmonary disease, drugs (SSRIs, carbamazepine, cyclophosphamide)</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Other causes:</p>
                      <p className="text-xs">Hypothyroidism, adrenal insufficiency, primary polydipsia (urine Osm {"<"}100)</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-bold">Hypervolemic (Total body Na↑↑, Water↑↑↑)</p>
                  <p className="text-sm mb-2">Physical exam: Edema, ascites, elevated JVP</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Heart Failure</p>
                      <p className="text-xs">↓ Effective arterial volume</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Cirrhosis</p>
                      <p className="text-xs">Splanchnic vasodilation</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-semibold">Nephrotic Syndrome</p>
                      <p className="text-xs">↓ Oncotic pressure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SIADH Deep Dive */}
      <Card className="mb-8 bg-primary/5">
        <CardHeader>
          <CardTitle>SIADH: The Most Common Cause of Euvolemic Hyponatremia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-bold mb-2">Diagnostic Criteria:</p>
              <ul className="space-y-1 text-sm">
                <li>✓ Hypotonic hyponatremia (Na {"<"}135, Serum Osm {"<"}280)</li>
                <li>✓ Urine osmolality {">"}100 mOsm/kg (inappropriately concentrated)</li>
                <li>✓ Urine sodium {">"}20 mmol/L (renal sodium wasting)</li>
                <li>✓ Euvolemic on exam</li>
                <li>✓ Normal thyroid and adrenal function</li>
                <li>✓ No recent diuretic use</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-2">Common Causes:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold">Malignancy</p>
                  <p>Small cell lung cancer (SCLC), head & neck, GI cancers</p>
                </div>
                <div>
                  <p className="font-semibold">CNS Disorders</p>
                  <p>Meningitis, encephalitis, stroke, subdural hematoma</p>
                </div>
                <div>
                  <p className="font-semibold">Pulmonary</p>
                  <p>Pneumonia, TB, positive pressure ventilation</p>
                </div>
                <div>
                  <p className="font-semibold">Medications</p>
                  <p>SSRIs, carbamazepine, oxcarbazepine, cyclophosphamide, vincristine, NSAIDs</p>
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
              <p className="font-bold text-lg mb-2">Severe Symptomatic Hyponatremia (Seizures, Coma)</p>
              <p className="text-sm mb-2"><strong>Goal:</strong> Raise Na by 4-6 mmol/L in first 3-4 hours to stop symptoms</p>
              <p className="text-sm mb-2"><strong>Treatment:</strong> 3% hypertonic saline 100 mL IV bolus over 10 min, repeat × 2 if needed</p>
              <p className="text-sm font-bold">⚠️ Then SLOW DOWN: Total correction ≤8-10 mmol/L in 24 hours</p>
            </div>

            <div>
              <p className="font-bold mb-2">Chronic/Asymptomatic Hyponatremia by Cause:</p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">Hypovolemic:</p>
                  <p className="text-sm">Normal saline (0.9% NaCl). Replace ongoing losses.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold">SIADH:</p>
                  <p className="text-sm mb-1"><strong>1st line:</strong> Fluid restriction ({"<"}800 mL/day)</p>
                  <p className="text-sm mb-1"><strong>2nd line:</strong> Salt tabs, loop diuretics + oral salt</p>
                  <p className="text-sm"><strong>3rd line:</strong> Vaptans (tolvaptan, conivaptan) - use with extreme caution, risk of overcorrection</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Hypervolemic (CHF, Cirrhosis):</p>
                  <p className="text-sm">Fluid restriction, treat underlying condition, consider vaptans in select cases</p>
                </div>
              </div>
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
            <li>• <strong>Hyponatremia + hyperkalemia:</strong> Think adrenal insufficiency (low cortisol/aldosterone)</li>
            <li>• <strong>Post-op hyponatremia:</strong> Often SIADH from pain/nausea + hypotonic IV fluids</li>
            <li>• <strong>Exercise-associated hyponatremia:</strong> Endurance athletes drinking excessive hypotonic fluids</li>
            <li>• <strong>Pseudohyponatremia:</strong> High lipids or proteins → lab artifact with indirect ISE. Use direct ISE or calculate corrected Na</li>
            <li>• <strong>Cerebral salt wasting vs SIADH:</strong> Both have ↑ urine Na, euvolemia. CSW has true volume depletion on CVP/echo. Treat CSW with saline, not fluid restriction</li>
            <li>• <strong>Beer potomania / Tea-and-toast diet:</strong> Low solute intake → impaired free water excretion despite low ADH</li>
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
            <li>Verbalis JG, et al. Diagnosis, Evaluation, and Treatment of Hyponatremia: Expert Panel Recommendations. Am J Med. 2013;126(10 Suppl 1):S1-42</li>
            <li>Sterns RH. Disorders of Plasma Sodium. N Engl J Med. 2015;372:55-65</li>
            <li>Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol. 2014;170:G1-47</li>
            <li>UpToDate: Overview of the treatment of hyponatremia in adults (2023)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link to="/calculators/sodium-correction">
          <Button>Sodium Correction Calculator</Button>
        </Link>
        <Link to="/algorithms">
          <Button variant="outline">Hyponatremia Algorithm</Button>
        </Link>
        <Link to="/cases">
          <Button variant="outline">Practice Cases</Button>
        </Link>
      </div>
    </div>
  )
}
