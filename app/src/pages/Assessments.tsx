import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ClipboardCheck, Brain, Target } from 'lucide-react'

export default function Assessments() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Knowledge Assessments</h1>
        <p className="text-xl text-muted-foreground">
          Test your knowledge with evidence-based questions and detailed rationales
        </p>
      </div>

      <Card className="bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="w-8 h-8 text-primary" />
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
          </div>
          <CardDescription className="text-base">
            Assessment modules are currently in development. Check back soon!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">Features in development:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Multiple question formats: MCQ, calculation, ECG interpretation, case-based</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Bloom-level tagged questions from recall to synthesis</span>
              </li>
              <li className="flex items-start gap-2">
                <ClipboardCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Detailed rationales with references to learning modules</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
