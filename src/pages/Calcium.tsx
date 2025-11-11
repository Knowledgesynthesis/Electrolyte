import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calculator, BookOpen, Activity, Bone } from 'lucide-react'

export default function Calcium() {
  const topics = [
    {
      title: 'Calcium Physiology',
      description: 'Calcium homeostasis, PTH axis, and bone metabolism',
      icon: BookOpen,
      path: '/calcium/physiology',
    },
    {
      title: 'Hypocalcemia',
      description: 'Causes, manifestations, and management of low calcium',
      icon: Activity,
      path: '/calcium/hypocalcemia',
    },
    {
      title: 'Hypercalcemia',
      description: 'Differential diagnosis and treatment strategies',
      icon: Activity,
      path: '/calcium/hypercalcemia',
    },
    {
      title: 'Albumin Corrector',
      description: 'Adjust total calcium for albumin level',
      icon: Calculator,
      path: '/calculators/calcium-correction',
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
          <Bone className="w-10 h-10 text-green-500" />
          Calcium (Ca²⁺)
        </h1>
        <p className="text-xl text-muted-foreground">
          Master calcium disorders and parathyroid hormone regulation
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
              <p className="font-semibold">Normal Serum Calcium:</p>
              <p className="text-2xl text-primary">8.5-10.5 mg/dL</p>
              <p className="text-sm text-muted-foreground mt-1">
                2.1-2.6 mmol/L (SI units)
              </p>
              <p className="text-sm text-muted-foreground">
                Ionized Ca²⁺: 4.5-5.3 mg/dL (1.1-1.3 mmol/L)
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Key Regulators:</p>
              <ul className="text-sm space-y-1">
                <li>• Parathyroid hormone (PTH)</li>
                <li>• Vitamin D (1,25-dihydroxyvitamin D)</li>
                <li>• Calcitonin</li>
                <li>• Albumin (affects total, not ionized Ca²⁺)</li>
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

      {/* Clinical Pearls */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">💡 Hypocalcemia Signs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li><strong>Chvostek sign:</strong> Facial twitching with tapping facial nerve</li>
              <li><strong>Trousseau sign:</strong> Carpal spasm with BP cuff inflation</li>
              <li><strong>ECG:</strong> Prolonged QT interval</li>
              <li><strong>Symptoms:</strong> Paresthesias, tetany, seizures, laryngospasm</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">💡 Hypercalcemia ("Stones, Bones, Groans, Moans")</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li><strong>Stones:</strong> Nephrolithiasis, nephrocalcinosis</li>
              <li><strong>Bones:</strong> Bone pain, osteoporosis</li>
              <li><strong>Groans:</strong> Abdominal pain, constipation, nausea</li>
              <li><strong>Moans:</strong> Depression, confusion, fatigue</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Important Note */}
      <div className="mt-6 safety-warning">
        <p className="font-semibold mb-2">⚠️ Albumin Correction Essential</p>
        <p className="text-sm">
          <strong>Total calcium must be corrected for albumin</strong> in hypoalbuminemia.
          For every 1 g/dL decrease in albumin below 4 g/dL, add 0.8 mg/dL to total calcium.
          Alternatively, measure ionized calcium directly.
        </p>
        <p className="text-xs mt-2 opacity-80">
          Reference: Harrison's Principles 21st Ed, UpToDate 2023
        </p>
      </div>
    </div>
  )
}
