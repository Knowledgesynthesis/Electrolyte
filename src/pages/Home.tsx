import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, Beaker, BookOpen, Calculator, FlaskConical } from 'lucide-react'

export default function Home() {
  const electrolytes = [
    {
      name: 'Sodium (Na⁺)',
      path: '/sodium',
      icon: Activity,
      description: 'Hypo/hypernatremia, osmolarity, and water balance',
      color: 'text-blue-500',
    },
    {
      name: 'Potassium (K⁺)',
      path: '/potassium',
      icon: Activity,
      description: 'Hypo/hyperkalemia, ECG changes, and management',
      color: 'text-purple-500',
    },
    {
      name: 'Calcium (Ca²⁺)',
      path: '/calcium',
      icon: Beaker,
      description: 'Hypo/hypercalcemia, PTH axis, and bone metabolism',
      color: 'text-green-500',
    },
    {
      name: 'Magnesium (Mg²⁺)',
      path: '/magnesium',
      icon: FlaskConical,
      description: 'Hypo/hypermagnesemia and electrolyte interactions',
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Electrolyte Atlas
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Navigate Na⁺ to Ca²⁺ with confidence
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive, evidence-based platform for mastering electrolyte physiology and disorders.
          From medical students to attending physicians.
        </p>
      </div>

      {/* Electrolyte Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {electrolytes.map((electrolyte) => {
          const Icon = electrolyte.icon
          return (
            <Link key={electrolyte.path} to={electrolyte.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-8 h-8 ${electrolyte.color}`} />
                    <CardTitle className="text-2xl">{electrolyte.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {electrolyte.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Explore Module
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/calculators">
          <Card className="h-full transition-all hover:shadow-lg cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-6 h-6 text-primary" />
                <CardTitle>Calculators</CardTitle>
              </div>
              <CardDescription>
                Interactive tools for correction calculations and clinical decision support
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/cases">
          <Card className="h-full transition-all hover:shadow-lg cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <CardTitle>Case Vignettes</CardTitle>
              </div>
              <CardDescription>
                Dynamic clinical scenarios with real-time feedback and learning
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/assessments">
          <Card className="h-full transition-all hover:shadow-lg cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-6 h-6 text-primary" />
                <CardTitle>Assessments</CardTitle>
              </div>
              <CardDescription>
                Test your knowledge with evidence-based questions and detailed rationales
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Educational Disclaimer */}
      <div className="mt-12 p-6 bg-warning/10 border-l-4 border-warning rounded-md">
        <p className="text-sm text-muted-foreground">
          <strong>Educational Use Only:</strong> This application is designed for educational purposes
          and should not replace clinical judgment or established treatment protocols. Always consult
          current guidelines and senior clinicians for patient care decisions.
        </p>
      </div>
    </div>
  )
}
