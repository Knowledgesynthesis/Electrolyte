import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, Activity, Heart, Droplet } from 'lucide-react'

export default function Calculators() {
  const calculators = [
    {
      name: 'Sodium Correction Calculator',
      description: 'Safe sodium correction with rate limits and safety warnings',
      path: '/calculators/sodium-correction',
      icon: Droplet,
      electrolyte: 'Sodium',
    },
    {
      name: 'Potassium ECG Visualizer',
      description: 'Interactive ECG changes with potassium levels',
      path: '/calculators/potassium-ecg',
      icon: Heart,
      electrolyte: 'Potassium',
    },
    {
      name: 'Calcium Albumin Corrector',
      description: 'Adjust total calcium for albumin level',
      path: '/calculators/calcium-correction',
      icon: Activity,
      electrolyte: 'Calcium',
    },
    {
      name: 'Magnesium Replacement Calculator',
      description: 'Calculate magnesium repletion strategy',
      path: '/calculators/magnesium-replacement',
      icon: Calculator,
      electrolyte: 'Magnesium',
      comingSoon: true,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Interactive Calculators</h1>
        <p className="text-xl text-muted-foreground">
          Evidence-based clinical decision support tools with built-in safety guardrails
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.map((calc) => {
          const Icon = calc.icon
          return (
            <div key={calc.path} className="relative">
              {calc.comingSoon && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold z-10">
                  Coming Soon
                </div>
              )}
              <Link to={calc.comingSoon ? '#' : calc.path}>
                <Card
                  className={`h-full transition-all ${
                    calc.comingSoon
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:shadow-lg hover:scale-105 cursor-pointer'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                      <CardTitle>{calc.name}</CardTitle>
                    </div>
                    <CardDescription>
                      <span className="text-primary font-semibold">{calc.electrolyte}</span> •{' '}
                      {calc.description}
                    </CardDescription>
                  </CardHeader>
                  {!calc.comingSoon && (
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Open Calculator
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </Link>
            </div>
          )
        })}
      </div>

      <div className="mt-8 safety-warning">
        <p className="font-semibold mb-2">⚠️ Clinical Use Disclaimer</p>
        <p className="text-sm">
          These calculators are educational tools based on established formulas and guidelines.
          Always verify calculations independently and consult current institutional protocols
          and senior clinicians for patient care decisions.
        </p>
      </div>
    </div>
  )
}
