import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'

interface Interaction {
  from: string
  to: string
  mechanism: string
  clinical: string
  severity: 'critical' | 'important' | 'notable'
}

const INTERACTIONS: Interaction[] = [
  {
    from: 'Magnesium',
    to: 'Potassium',
    mechanism: 'Hypomagnesemia impairs Na-K-ATPase function and increases renal K⁺ wasting. Mg²⁺ blocks ROMK channels in the kidney.',
    clinical: 'Refractory hypokalemia that won\'t correct until Mg²⁺ is repleted. Always check Mg²⁺ when treating hypokalemia!',
    severity: 'critical',
  },
  {
    from: 'Magnesium',
    to: 'Calcium',
    mechanism: 'Severe hypomagnesemia impairs PTH secretion and induces PTH resistance at target organs.',
    clinical: 'Hypocalcemia with low or inappropriately normal PTH despite low calcium. Won\'t correct until Mg²⁺ is repleted.',
    severity: 'critical',
  },
  {
    from: 'Potassium',
    to: 'pH (Acid-Base)',
    mechanism: 'H⁺/K⁺ exchange: Acidosis shifts K⁺ out of cells (↑ serum K⁺). Alkalosis shifts K⁺ into cells (↓ serum K⁺).',
    clinical: 'For every 0.1 pH decrease, K⁺ increases ~0.6 mmol/L. Correct acidosis to help treat hyperkalemia.',
    severity: 'critical',
  },
  {
    from: 'Calcium',
    to: 'pH (Acid-Base)',
    mechanism: 'pH affects Ca²⁺ binding to albumin. Acidosis increases ionized Ca²⁺ (less protein binding). Alkalosis decreases ionized Ca²⁺.',
    clinical: 'Acute alkalosis (hyperventilation) can cause symptomatic hypocalcemia (tetany) even with normal total Ca²⁺.',
    severity: 'important',
  },
  {
    from: 'Sodium',
    to: 'Potassium',
    mechanism: 'Aldosterone increases Na⁺ reabsorption and K⁺ secretion. Volume depletion activates RAAS, causing K⁺ wasting.',
    clinical: 'Hypovolemia from vomiting/diarrhea often causes both hyponatremia AND hypokalemia. Diuretics affect both.',
    severity: 'important',
  },
  {
    from: 'Calcium',
    to: 'Magnesium',
    mechanism: 'Severe hypercalcemia causes renal Mg²⁺ wasting through calcium-sensing receptor activation.',
    clinical: 'Hypercalcemia can cause hypomagnesemia. Check Mg²⁺ in hypercalcemic patients.',
    severity: 'notable',
  },
  {
    from: 'Calcium',
    to: 'Phosphate',
    mechanism: 'Inverse relationship: PTH increases Ca²⁺ and decreases PO₄³⁻. CaXPO₄ product >55 risks metastatic calcification.',
    clinical: 'In CKD, manage both to prevent vascular calcification. Vitamin D increases both (risk of calcification).',
    severity: 'important',
  },
  {
    from: 'Magnesium',
    to: 'Sodium',
    mechanism: 'Bartter/Gitelman syndromes cause renal Na⁺, K⁺, AND Mg²⁺ wasting.',
    clinical: 'Combined hyponatremia, hypokalemia, and hypomagnesemia suggest tubular disorder.',
    severity: 'notable',
  },
]

export default function Interactions() {
  const getCriticalInteractions = () => INTERACTIONS.filter(i => i.severity === 'critical')
  const getImportantInteractions = () => INTERACTIONS.filter(i => i.severity === 'important')
  const getNotableInteractions = () => INTERACTIONS.filter(i => i.severity === 'notable')

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Cross-Electrolyte Interactions</h1>
        <p className="text-xl text-muted-foreground">
          Understanding how electrolytes affect each other
        </p>
      </div>

      {/* Visual Map */}
      <Card className="mb-8 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <CardHeader>
          <CardTitle>Interaction Network</CardTitle>
          <CardDescription>Key relationships between electrolytes and acid-base balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-100 dark:bg-blue-950/50 border-2 border-blue-500 rounded-lg p-4 text-center">
              <p className="font-bold text-blue-700 dark:text-blue-300">Na⁺</p>
              <p className="text-xs text-muted-foreground">Sodium</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-950/50 border-2 border-purple-500 rounded-lg p-4 text-center">
              <p className="font-bold text-purple-700 dark:text-purple-300">K⁺</p>
              <p className="text-xs text-muted-foreground">Potassium</p>
            </div>
            <div className="bg-green-100 dark:bg-green-950/50 border-2 border-green-500 rounded-lg p-4 text-center">
              <p className="font-bold text-green-700 dark:text-green-300">Ca²⁺</p>
              <p className="text-xs text-muted-foreground">Calcium</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-950/50 border-2 border-orange-500 rounded-lg p-4 text-center">
              <p className="font-bold text-orange-700 dark:text-orange-300">Mg²⁺</p>
              <p className="text-xs text-muted-foreground">Magnesium</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            These electrolytes don't exist in isolation - they interact through multiple physiologic mechanisms
          </p>
        </CardContent>
      </Card>

      {/* Critical Interactions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          Critical Interactions
        </h2>
        <p className="text-muted-foreground mb-4">
          These interactions have major clinical implications and must be considered in treatment
        </p>
        <div className="space-y-4">
          {getCriticalInteractions().map((interaction, index) => (
            <Card key={index} className="border-l-4 border-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary/20 rounded font-bold">{interaction.from}</span>
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <span className="px-3 py-1 bg-primary/20 rounded font-bold">{interaction.to}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Mechanism:</p>
                  <p className="text-sm">{interaction.mechanism}</p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
                  <p className="text-sm font-semibold mb-1">Clinical Significance:</p>
                  <p className="text-sm">{interaction.clinical}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Important Interactions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          Important Interactions
        </h2>
        <div className="space-y-4">
          {getImportantInteractions().map((interaction, index) => (
            <Card key={index} className="border-l-4 border-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="px-3 py-1 bg-primary/10 rounded font-bold">{interaction.from}</span>
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <span className="px-3 py-1 bg-primary/10 rounded font-bold">{interaction.to}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Mechanism:</p>
                  <p className="text-sm">{interaction.mechanism}</p>
                </div>
                <div className="bg-warning-background border border-warning rounded p-3">
                  <p className="text-sm font-semibold mb-1">Clinical Significance:</p>
                  <p className="text-sm">{interaction.clinical}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Notable Interactions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Notable Interactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getNotableInteractions().map((interaction, index) => (
            <Card key={index} className="border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-sm font-bold">{interaction.from}</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-sm font-bold">{interaction.to}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{interaction.mechanism}</p>
                <p className="text-sm italic text-muted-foreground">{interaction.clinical}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Clinical Pearls */}
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle>Clinical Pearls for Managing Multiple Electrolyte Disorders</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0">1.</span>
              <span><strong>Always check Mg²⁺ when treating hypokalemia or hypocalcemia</strong> - It's often the hidden culprit preventing correction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0">2.</span>
              <span><strong>Correct acid-base abnormalities</strong> - They significantly affect K⁺ and Ca²⁺ levels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0">3.</span>
              <span><strong>Consider medication effects</strong> - Diuretics affect multiple electrolytes simultaneously (Na⁺, K⁺, Mg²⁺, Ca²⁺)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0">4.</span>
              <span><strong>Volume status matters</strong> - Hypovolemia activates RAAS affecting Na⁺, K⁺, and indirectly Mg²⁺</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0">5.</span>
              <span><strong>Check a complete metabolic panel</strong> - Don't treat electrolytes in isolation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0">6.</span>
              <span><strong>Recheck after correction</strong> - Correcting one electrolyte may unmask another abnormality</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Reference */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <ul className="list-disc list-inside space-y-1">
            <li>Huang CL, Kuo E. Mechanism of hypokalemia in magnesium deficiency. J Am Soc Nephrol. 2007;18:2649-2652</li>
            <li>Rude RK, et al. Magnesium deficiency-induced osteoporosis in the rat: uncoupling of bone formation and bone resorption. Magnes Res. 1999;12:257-267</li>
            <li>Gennari FJ. Hypokalemia. N Engl J Med. 1998;339:451-458</li>
            <li>Palmer BF. Regulation of Potassium Homeostasis. Clin J Am Soc Nephrol. 2015;10:1050-1060</li>
            <li>Harrison's Principles of Internal Medicine, 21st Edition</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
