import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'

export default function AcidBase() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Acid-Base & Electrolyte Integration</h1>
        <p className="text-xl text-muted-foreground">
          Understanding the bidirectional relationship between pH and electrolytes
        </p>
      </div>

      {/* Key Concept */}
      <Card className="mb-8 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <CardHeader>
          <CardTitle>Core Principle</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Acid-base balance and electrolyte homeostasis are <strong>intimately connected</strong>.
            pH changes affect electrolyte distribution (especially K⁺ and Ca²⁺), while electrolyte
            disorders can cause or contribute to acid-base disturbances.
          </p>
        </CardContent>
      </Card>

      {/* Potassium ↔ pH */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          Potassium ↔ pH: The Critical Interaction
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="border-l-4 border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                Acidosis → Hyperkalemia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">Mechanism:</p>
                <p className="text-sm">
                  In acidosis, H⁺ enters cells in exchange for K⁺ to buffer the pH.
                  Result: <strong>Intracellular K⁺ shifts to extracellular space</strong>
                </p>
              </div>
              <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
                <p className="text-sm font-semibold mb-1">Clinical Rule:</p>
                <p className="text-sm">
                  For every 0.1 decrease in pH, serum K⁺ increases by ~0.6 mmol/L
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Example:</p>
                <p className="text-sm">
                  DKA patient with pH 7.1 (normal 7.4) → 0.3 pH drop → Expect K⁺ elevation of ~1.8 mmol/L
                  above true total body K⁺
                </p>
              </div>
              <div className="safety-warning">
                <p className="text-sm">
                  <strong>⚠️ Critical:</strong> "Normal" K⁺ in severe acidosis often masks total body K⁺ depletion.
                  As acidosis corrects with treatment, K⁺ will drop precipitously.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Alkalosis → Hypokalemia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">Mechanism:</p>
                <p className="text-sm">
                  In alkalosis, K⁺ enters cells in exchange for H⁺ released to compensate for high pH.
                  Result: <strong>K⁺ shifts from extracellular to intracellular space</strong>
                </p>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded p-3">
                <p className="text-sm font-semibold mb-1">Clinical Rule:</p>
                <p className="text-sm">
                  For every 0.1 increase in pH, serum K⁺ decreases by ~0.4 mmol/L
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Example:</p>
                <p className="text-sm">
                  Patient hyperventilating (pH 7.6) → 0.2 pH rise → Expect K⁺ drop of ~0.8 mmol/L
                </p>
              </div>
              <div className="safety-warning">
                <p className="text-sm">
                  <strong>⚠️ Note:</strong> Contraction alkalosis (from volume depletion) often coexists with
                  hypokalemia from renal losses → <strong>severe combined hypokalemia</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bidirectional: K affects pH too */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="px-3 py-1 bg-purple-500/20 rounded font-bold">K⁺ Disorders</span>
              <ArrowRight className="w-5 h-5" />
              <span className="px-3 py-1 bg-purple-500/20 rounded font-bold">Acid-Base Changes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold">Hypokalemia → Metabolic Alkalosis</p>
              <p className="text-sm">
                Low K⁺ triggers: (1) Increased H⁺ secretion in distal tubule, (2) Increased NH₃ production,
                (3) H⁺ shifts into cells to replace K⁺. Net effect: <strong>Alkalosis is generated and maintained</strong>.
              </p>
            </div>
            <div>
              <p className="font-semibold">Hyperkalemia → Metabolic Acidosis</p>
              <p className="text-sm">
                High K⁺ impairs renal ammonia production and H⁺ excretion. Type 4 RTA is the classic example
                (hypoaldosteronism → hyperkalemia → impaired distal acidification).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calcium ↔ pH */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Calcium ↔ pH: Protein Binding Changes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-orange-500">
            <CardHeader>
              <CardTitle>Alkalosis → ↓ Ionized Ca²⁺</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">Mechanism:</p>
                <p className="text-sm">
                  Alkalosis increases negative charge on albumin → More Ca²⁺ binds to albumin →
                  <strong> Ionized (free) Ca²⁺ decreases</strong>
                </p>
              </div>
              <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
                <p className="text-sm font-semibold mb-1">Clinical Significance:</p>
                <p className="text-sm">
                  Acute hyperventilation (respiratory alkalosis) can cause symptomatic hypocalcemia
                  (tetany, perioral numbness) even with normal total calcium
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <strong>Classic scenario:</strong> Panic attack → Hyperventilation → pH 7.6 → Carpopedal spasm
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader>
              <CardTitle>Acidosis → ↑ Ionized Ca²⁺</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">Mechanism:</p>
                <p className="text-sm">
                  Acidosis decreases negative charge on albumin → Less Ca²⁺ binds to albumin →
                  <strong> Ionized (free) Ca²⁺ increases</strong>
                </p>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded p-3">
                <p className="text-sm font-semibold mb-1">Clinical Significance:</p>
                <p className="text-sm">
                  Patients with acidosis may not show symptoms of hypocalcemia despite low total calcium
                  because ionized Ca²⁺ is relatively preserved
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <strong>Clinical pearl:</strong> Correcting acidosis unmasks symptomatic hypocalcemia
                  → Monitor Ca²⁺ during treatment
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Other Interactions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Other Acid-Base & Electrolyte Connections</h2>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chloride & Metabolic Acid-Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Hyperchloremic acidosis:</strong> Non-gap metabolic acidosis from Cl⁻ retention or HCO₃⁻ loss
                (e.g., RTA, diarrhea, normal saline resuscitation)
              </p>
              <p>
                <strong>Hypochloremic alkalosis:</strong> Contraction alkalosis from volume depletion with Cl⁻ loss
                (e.g., vomiting, NG suction, diuretics). Treated with saline (Cl⁻ repletion).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Phosphate & Acid-Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                Phosphate is an important urinary buffer. Chronic hypophosphatemia impairs renal acid excretion
                and can contribute to metabolic acidosis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Magnesium & Acid-Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                While Mg²⁺ doesn't directly shift with pH like K⁺ or Ca²⁺, chronic metabolic acidosis can
                increase renal Mg²⁺ wasting. Additionally, hypomagnesemia often coexists with hypokalemia
                in alkalotic states (e.g., diuretic use).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Clinical Approach */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Clinical Approach to Combined Disorders</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span>
              <div>
                <p className="font-semibold">Assess acid-base status first</p>
                <p className="text-sm text-muted-foreground">
                  Check pH, pCO₂, HCO₃⁻. Identify primary disorder (metabolic vs respiratory) and compensation.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</span>
              <div>
                <p className="font-semibold">Check all electrolytes</p>
                <p className="text-sm text-muted-foreground">
                  Na⁺, K⁺, Cl⁻, HCO₃⁻, Ca²⁺, Mg²⁺, PO₄³⁻. Don't forget anion gap calculation.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-semibold">Predict electrolyte shifts</p>
                <p className="text-sm text-muted-foreground">
                  If acidotic, expect K⁺ to drop as pH corrects. If alkalotic, expect K⁺ to rise.
                  Consider ionized Ca²⁺ if symptomatic.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</span>
              <div>
                <p className="font-semibold">Treat the underlying cause</p>
                <p className="text-sm text-muted-foreground">
                  Address the primary acid-base disorder (e.g., insulin for DKA, mechanical ventilation for
                  respiratory failure) while monitoring and managing electrolyte changes.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">5</span>
              <div>
                <p className="font-semibold">Recheck frequently</p>
                <p className="text-sm text-muted-foreground">
                  In acute settings (DKA, respiratory failure, renal failure), recheck ABG and electrolytes
                  every 1-4 hours initially. Electrolytes can shift rapidly.
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Clinical Scenarios */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>High-Yield Clinical Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-bold mb-1">DKA (Diabetic Ketoacidosis)</p>
              <p className="text-sm mb-2">
                <strong>pH 7.1, K⁺ 5.2 mmol/L, anion gap 28</strong>
              </p>
              <p className="text-sm">
                K⁺ appears normal-high but patient is severely total body K⁺ depleted (osmotic diuresis losses).
                As pH corrects with insulin + fluids, K⁺ will plummet. Start K⁺ repletion when K⁺ {"<"} 5.3 and
                urine output established. Target K⁺ 4-5 mmol/L during treatment.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-bold mb-1">Contraction Alkalosis</p>
              <p className="text-sm mb-2">
                <strong>pH 7.52, HCO₃⁻ 38, K⁺ 2.8 mmol/L, Cl⁻ 88 mmol/L</strong>
              </p>
              <p className="text-sm">
                From vomiting/diuretics. Volume depletion → Cl⁻ loss → metabolic alkalosis → renal K⁺ wasting.
                Treatment: <strong>Normal saline</strong> (to restore volume and provide Cl⁻) + K⁺ repletion.
                Won't correct until both volume and K⁺ are repleted.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-bold mb-1">Type 4 RTA (Renal Tubular Acidosis)</p>
              <p className="text-sm mb-2">
                <strong>pH 7.28, HCO₃⁻ 18, K⁺ 6.1 mmol/L, normal anion gap</strong>
              </p>
              <p className="text-sm">
                Hypoaldosteronism (e.g., from ACE inhibitors, NSAIDs, diabetes). Hyperkalemia impairs NH₃
                production → impaired distal H⁺ secretion → non-gap metabolic acidosis. Treatment: Loop diuretics
                (to lower K⁺), consider mineralocorticoid replacement (fludrocortisone).
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-bold mb-1">Panic Attack with Tetany</p>
              <p className="text-sm mb-2">
                <strong>pH 7.58, pCO₂ 22, total Ca²⁺ 9.2 mg/dL, albumin 4.0 g/dL</strong>
              </p>
              <p className="text-sm">
                Acute respiratory alkalosis from hyperventilation → increased Ca²⁺ binding to albumin →
                decreased ionized Ca²⁺ → carpopedal spasm. Total Ca²⁺ is normal. Treatment: Reassurance,
                rebreathing (↑ pCO₂), benzodiazepine if needed. Resolves as pH normalizes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reference */}
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <ul className="list-disc list-inside space-y-1">
            <li>Gennari FJ. Hypokalemia. N Engl J Med. 1998;339:451-458</li>
            <li>Palmer BF, Clegg DJ. Electrolyte and Acid-Base Disturbances in Patients with Diabetes Mellitus. N Engl J Med. 2015;373:548-559</li>
            <li>Rose BD, Post TW. Clinical Physiology of Acid-Base and Electrolyte Disorders, 5th Edition</li>
            <li>Kraut JA, Madias NE. Serum Anion Gap: Its Uses and Limitations in Clinical Medicine. Clin J Am Soc Nephrol. 2007;2:162-174</li>
            <li>Harrison's Principles of Internal Medicine, 21st Edition</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
