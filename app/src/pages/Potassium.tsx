import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Activity, Heart } from 'lucide-react'

export default function Potassium() {
  const topics = [
    {
      title: 'Potassium Physiology',
      description: 'Normal potassium handling and cellular membrane potential',
      icon: BookOpen,
      path: '/potassium/physiology',
    },
    {
      title: 'Hypokalemia',
      description: 'Causes, ECG changes, and management of low potassium',
      icon: Activity,
      path: '/potassium/hypokalemia',
    },
    {
      title: 'Hyperkalemia',
      description: 'Emergency management and chronic treatment strategies',
      icon: Activity,
      path: '/potassium/hyperkalemia',
    },
    {
      title: 'ECG Visualizer',
      description: 'Interactive ECG changes with potassium levels',
      icon: Heart,
      path: '/calculators/potassium-ecg',
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
          <Activity className="w-10 h-10 text-purple-500" />
          Potassium (K⁺)
        </h1>
        <p className="text-xl text-muted-foreground">
          Master potassium disorders and their cardiac manifestations
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
              <p className="font-semibold">Normal Serum Potassium:</p>
              <p className="text-2xl text-primary">3.5-5.0 mmol/L</p>
              <p className="text-sm text-muted-foreground mt-1">
                (SI units = US units for K⁺)
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Key Regulators:</p>
              <ul className="text-sm space-y-1">
                <li>• Aldosterone (renal excretion)</li>
                <li>• Insulin (cellular uptake)</li>
                <li>• β2-agonists (cellular uptake)</li>
                <li>• Acid-base balance (H⁺/K⁺ exchange)</li>
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

      {/* Emergency Alert */}
      <div className="mt-8 emergency-alert">
        <div className="flex items-start gap-3">
          <Heart className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-2">🚨 EMERGENCY: Severe Hyperkalemia (&gt; 6.5 mmol/L)</p>
            <p className="mb-2">Immediate treatment required due to cardiac arrest risk:</p>
            <ol className="text-sm space-y-1 ml-4 list-decimal">
              <li><strong>Cardiac protection:</strong> Calcium gluconate 10% 10 mL IV over 2-3 min</li>
              <li><strong>Shift K⁺ intracellularly:</strong> Insulin + glucose, β2-agonists, sodium bicarbonate</li>
              <li><strong>Remove K⁺:</strong> Diuretics, dialysis, GI cation exchangers</li>
            </ol>
            <p className="text-xs mt-3 opacity-90">
              Reference: Harrison's Principles 21st Ed, UpToDate 2023
            </p>
          </div>
        </div>
      </div>

      {/* ECG Warning */}
      <div className="mt-6 safety-warning">
        <div className="flex items-start gap-3">
          <Activity className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-2">ECG Changes with Hyperkalemia</p>
            <ul className="text-sm space-y-1">
              <li>• 5.5-6.5: Peaked T waves</li>
              <li>• 6.5-7.5: Prolonged PR interval, wide QRS</li>
              <li>• &gt;7.5: Loss of P waves, sine wave pattern</li>
              <li>• &gt;8.0: Ventricular fibrillation, cardiac arrest</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
