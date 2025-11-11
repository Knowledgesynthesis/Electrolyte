import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calculator, BookOpen, Activity } from 'lucide-react'

export default function Sodium() {
  const topics = [
    {
      title: 'Sodium Physiology',
      description: 'Normal sodium handling, osmolarity, and water balance',
      icon: BookOpen,
      path: '/sodium/physiology',
    },
    {
      title: 'Hyponatremia',
      description: 'Causes, diagnosis, and management of low sodium',
      icon: Activity,
      path: '/sodium/hyponatremia',
    },
    {
      title: 'Hypernatremia',
      description: 'Causes, diagnosis, and management of high sodium',
      icon: Activity,
      path: '/sodium/hypernatremia',
    },
    {
      title: 'Correction Calculator',
      description: 'Safe sodium correction with rate limits',
      icon: Calculator,
      path: '/calculators/sodium-correction',
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
          <Activity className="w-10 h-10 text-blue-500" />
          Sodium (Na⁺)
        </h1>
        <p className="text-xl text-muted-foreground">
          Master sodium disorders from physiology to clinical management
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
              <p className="font-semibold">Normal Serum Sodium:</p>
              <p className="text-2xl text-primary">135-145 mmol/L</p>
              <p className="text-sm text-muted-foreground mt-1">
                (SI units = US units for Na⁺)
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Key Regulators:</p>
              <ul className="text-sm space-y-1">
                <li>• ADH (Antidiuretic Hormone)</li>
                <li>• Thirst mechanism</li>
                <li>• Renal water handling</li>
                <li>• Aldosterone (indirect)</li>
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

      {/* Safety Warning */}
      <div className="mt-8 safety-warning">
        <p className="font-semibold mb-2">⚠️ Critical Safety Reminder</p>
        <p className="text-sm">
          <strong>Never exceed 8-10 mmol/L correction in 24 hours</strong> to avoid osmotic demyelination syndrome.
          Slower correction (4-6 mmol/L/24h) is safer for chronic hyponatremia.
        </p>
        <p className="text-xs mt-2 text-muted-foreground">
          Source: UpToDate, KDIGO Guidelines 2021
        </p>
      </div>
    </div>
  )
}
