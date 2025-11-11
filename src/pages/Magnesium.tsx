import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calculator, BookOpen, Activity, Zap } from 'lucide-react'

export default function Magnesium() {
  const topics = [
    {
      title: 'Magnesium Physiology',
      description: 'Normal magnesium handling and cellular functions',
      icon: BookOpen,
      path: '/magnesium/physiology',
    },
    {
      title: 'Hypomagnesemia',
      description: 'Causes, clinical effects, and repletion strategies',
      icon: Activity,
      path: '/magnesium/hypomagnesemia',
    },
    {
      title: 'Hypermagnesemia',
      description: 'Etiology and management of elevated magnesium',
      icon: Activity,
      path: '/magnesium/hypermagnesemia',
    },
    {
      title: 'Replacement Calculator',
      description: 'Calculate magnesium repletion dosing',
      icon: Calculator,
      path: '/calculators/magnesium-replacement',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Navigation */}
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Zap className="w-10 h-10 text-orange-500" />
          Magnesium (Mg²⁺)
        </h1>
        <p className="text-xl text-muted-foreground">
          Master magnesium disorders and electrolyte interactions
        </p>
      </div>

      {/* Key Facts */}
      <Card className="mb-8 bg-primary/5">
        <CardHeader>
          <CardTitle>Normal Range & Key Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Normal Serum Magnesium:</p>
              <p className="text-2xl text-primary">1.5-2.5 mg/dL</p>
              <p className="text-sm text-muted-foreground mt-1">
                0.7-1.1 mmol/L (SI units)
              </p>
              <p className="text-sm text-muted-foreground">
                Note: 1 mmol/L = 2 mEq/L (divalent)
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Key Functions:</p>
              <ul className="text-sm space-y-1">
                <li>• Cofactor for 300+ enzymes</li>
                <li>• Required for ATP function</li>
                <li>• Essential for PTH secretion</li>
                <li>• Critical for K⁺ homeostasis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic) => {
          const Icon = topic.icon
          return (
            <Link key={topic.path} to={topic.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6 text-primary" />
                    <CardTitle>{topic.title}</CardTitle>
                  </div>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Critical Interaction */}
      <div className="mt-8 emergency-alert">
        <div className="flex items-start gap-3">
          <Zap className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-2">🔗 CRITICAL: Magnesium-Potassium Interaction</p>
            <p className="mb-2">
              Hypomagnesemia must be corrected BEFORE or WITH potassium repletion:
            </p>
            <ul className="text-sm space-y-1 ml-4 list-disc">
              <li>Mg²⁺ deficiency impairs cellular K⁺ uptake</li>
              <li>Low Mg²⁺ increases renal K⁺ wasting</li>
              <li>Refractory hypokalemia often indicates concurrent hypomagnesemia</li>
              <li><strong>Always check Mg²⁺ when treating hypokalemia</strong></li>
            </ul>
            <p className="text-xs mt-3 opacity-90">
              Reference: NEJM 2015;373:1650, Harrison's Principles 21st Ed
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Applications */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">💡 Hypomagnesemia Causes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold mb-2">Common:</p>
            <ul className="text-sm space-y-1 ml-4 list-disc mb-3">
              <li>GI losses (diarrhea, malabsorption)</li>
              <li>Renal losses (diuretics, aminoglycosides)</li>
              <li>Alcohol use disorder</li>
              <li>Proton pump inhibitors (chronic use)</li>
            </ul>
            <p className="text-sm"><strong>Symptoms:</strong> Similar to hypocalcemia (tetany, seizures, arrhythmias)</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">💡 Torsades de Pointes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">
              <strong>Magnesium sulfate is first-line treatment</strong> for torsades de pointes:
            </p>
            <ul className="text-sm space-y-1 ml-4 list-disc">
              <li>Dose: 2 g IV over 1-2 minutes</li>
              <li>Effective even in normal Mg²⁺ levels</li>
              <li>Stabilizes cardiac membrane</li>
              <li>Prevents recurrence</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Important Note */}
      <div className="mt-6 safety-warning">
        <p className="font-semibold mb-2">⚠️ Repletion Considerations</p>
        <p className="text-sm">
          <strong>Oral magnesium has poor bioavailability</strong> and commonly causes diarrhea.
          IV repletion is preferred for severe deficiency or symptomatic patients.
          Monitor for hypermagnesemia in renal impairment (Mg²⁺ is renally excreted).
        </p>
        <p className="text-xs mt-2 opacity-80">
          Reference: UpToDate 2023, KDIGO Guidelines
        </p>
      </div>
    </div>
  )
}
