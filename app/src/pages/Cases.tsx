import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Clock, Award } from 'lucide-react'

export default function Cases() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Clinical Case Vignettes</h1>
        <p className="text-xl text-muted-foreground">
          Dynamic clinical scenarios with real-time feedback and learning
        </p>
      </div>

      <Card className="bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
          </div>
          <CardDescription className="text-base">
            Interactive case vignettes are currently in development. Check back soon!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">Features in development:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Sequential case presentations with branching decision trees</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Real-time feedback and clinical pearls</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Cases covering all electrolyte disorders with varying difficulty levels</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
