import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useProgress } from '@/stores/progress'
import { ArrowLeft, Award, BookOpen, CheckCircle, TrendingUp, Target } from 'lucide-react'

export default function Dashboard() {
  const {
    lessonsCompleted,
    assessmentScores,
    masteryLevel,
    getElectrolyteMastery,
  } = useProgress()

  const electrolytes = [
    { id: 'sodium', name: 'Sodium (Na⁺)', color: 'text-blue-600 dark:text-blue-400' },
    { id: 'potassium', name: 'Potassium (K⁺)', color: 'text-purple-600 dark:text-purple-400' },
    { id: 'calcium', name: 'Calcium (Ca²⁺)', color: 'text-green-600 dark:text-green-400' },
    { id: 'magnesium', name: 'Magnesium (Mg²⁺)', color: 'text-orange-600 dark:text-orange-400' },
  ]

  const overallMastery = electrolytes.reduce((sum, e) => sum + getElectrolyteMastery(e.id as any), 0) / electrolytes.length

  const getMasteryColor = (level: number) => {
    if (level >= 80) return 'bg-green-500'
    if (level >= 60) return 'bg-blue-500'
    if (level >= 40) return 'bg-yellow-500'
    if (level >= 20) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getMasteryLabel = (level: number) => {
    if (level >= 80) return 'Expert'
    if (level >= 60) return 'Proficient'
    if (level >= 40) return 'Intermediate'
    if (level >= 20) return 'Beginner'
    return 'Getting Started'
  }

  const completedCases = lessonsCompleted.filter(id => id.startsWith('case-')).length
  const totalCases = 2 // Update when more cases are added

  const assessmentCount = Object.keys(assessmentScores).length
  const avgAssessmentScore = assessmentCount > 0
    ? Object.values(assessmentScores).reduce((sum, score) => sum + score, 0) / assessmentCount
    : 0

  const recommendations = []

  // Generate personalized recommendations
  if (getElectrolyteMastery('sodium') < 50) {
    recommendations.push({
      title: 'Continue Sodium Module',
      description: 'Complete the sodium physiology and correction calculator to build foundational knowledge',
      link: '/sodium',
      icon: TrendingUp,
    })
  }

  if (completedCases === 0) {
    recommendations.push({
      title: 'Try a Case Vignette',
      description: 'Apply your knowledge with interactive clinical scenarios',
      link: '/cases',
      icon: BookOpen,
    })
  }

  if (getElectrolyteMastery('potassium') < getElectrolyteMastery('sodium') - 20) {
    recommendations.push({
      title: 'Balance Your Learning',
      description: 'Your potassium knowledge lags behind sodium - explore the potassium module',
      link: '/potassium',
      icon: Target,
    })
  }

  if (Object.keys(masteryLevel).length > 0 && assessmentCount === 0) {
    recommendations.push({
      title: 'Test Your Knowledge',
      description: 'Take assessments to identify gaps and reinforce learning',
      link: '/assessments',
      icon: Award,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Learning Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Track your progress and master electrolyte disorders
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8 bg-gradient-to-br from-primary/10 to-purple-500/10">
        <CardHeader>
          <CardTitle className="text-2xl">Overall Mastery</CardTitle>
          <CardDescription>Your comprehensive understanding across all electrolytes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">{Math.round(overallMastery)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${getMasteryColor(overallMastery)}`}
                  style={{ width: `${overallMastery}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Level: <span className="font-semibold">{getMasteryLabel(overallMastery)}</span>
              </p>
            </div>
            <Award className="w-16 h-16 text-primary flex-shrink-0" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Lessons Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{lessonsCompleted.length}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Keep learning to unlock mastery
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Cases Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{completedCases}/{totalCases}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Clinical scenarios mastered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Assessment Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {assessmentCount > 0 ? `${Math.round(avgAssessmentScore)}%` : 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {assessmentCount} assessment{assessmentCount !== 1 ? 's' : ''} taken
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Electrolyte-Specific Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mastery by Electrolyte</CardTitle>
          <CardDescription>Your understanding of each electrolyte disorder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {electrolytes.map((electrolyte) => {
            const mastery = getElectrolyteMastery(electrolyte.id as any)
            return (
              <div key={electrolyte.id}>
                <div className="flex justify-between mb-2">
                  <span className={`font-semibold ${electrolyte.color}`}>{electrolyte.name}</span>
                  <span className="text-sm font-medium">{Math.round(mastery)}% - {getMasteryLabel(mastery)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${getMasteryColor(mastery)}`}
                    style={{ width: `${mastery}%` }}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
            <CardDescription>Personalized learning path based on your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon
                return (
                  <Link key={index} to={rec.link}>
                    <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-all cursor-pointer">
                      <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{rec.title}</p>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievement Badges (Future Enhancement) */}
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle>How Mastery is Calculated</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>Your mastery level increases as you:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Complete lessons and modules</li>
            <li>Successfully solve case vignettes</li>
            <li>Score well on assessments</li>
            <li>Use interactive calculators correctly</li>
            <li>Review material over time (spaced repetition)</li>
          </ul>
          <p className="mt-4 italic">
            The adaptive learning system identifies gaps and recommends targeted content to optimize your learning efficiency.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
