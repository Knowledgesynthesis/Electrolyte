import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, XCircle, Award, BookOpen } from 'lucide-react'
import { useProgress } from '@/stores/progress'

interface CaseOption {
  id: string
  text: string
  isCorrect: boolean
  feedback: string
  nextStageId?: string
}

interface CaseStage {
  id: string
  title: string
  description: string
  labs?: { name: string; value: string; unit: string; abnormal?: boolean }[]
  question?: string
  options?: CaseOption[]
  clinicalPearl?: string
}

interface CaseVignette {
  id: string
  title: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  electrolytes: string[]
  stages: CaseStage[]
  learningObjectives: string[]
}

const SAMPLE_CASES: CaseVignette[] = [
  {
    id: 'hyponatremia-1',
    title: 'Confused Elderly Woman with Low Sodium',
    difficulty: 'intermediate',
    electrolytes: ['sodium'],
    learningObjectives: [
      'Classify hyponatremia by tonicity and volume status',
      'Identify SIADH as a cause of euvolemic hyponatremia',
      'Calculate safe sodium correction rate',
      'Recognize symptoms of severe hyponatremia',
    ],
    stages: [
      {
        id: 'presentation',
        title: 'Initial Presentation',
        description: `A 72-year-old woman is brought to the ED by her daughter who reports progressive confusion over 3 days. The patient has been "acting strange," with word-finding difficulties and appearing disoriented. No recent illness, but started taking hydrochlorothiazide for hypertension 2 weeks ago.

**Physical Exam:**
- Temp 37°C, BP 135/82, HR 78, RR 16
- Alert but confused to time and place
- Mucous membranes moist
- No edema
- Normal skin turgor
- Lungs clear, heart regular`,
        labs: [
          { name: 'Sodium', value: '118', unit: 'mmol/L', abnormal: true },
          { name: 'Potassium', value: '3.2', unit: 'mmol/L', abnormal: true },
          { name: 'Chloride', value: '82', unit: 'mmol/L' },
          { name: 'Bicarbonate', value: '26', unit: 'mmol/L' },
          { name: 'BUN', value: '12', unit: 'mg/dL' },
          { name: 'Creatinine', value: '0.8', unit: 'mg/dL' },
          { name: 'Glucose', value: '95', unit: 'mg/dL' },
        ],
        question: 'What is the FIRST step in classifying this hyponatremia?',
        options: [
          {
            id: 'tonicity',
            text: 'Assess serum osmolality to determine tonicity',
            isCorrect: true,
            feedback: '✓ Correct! Assessing tonicity is the critical first step. Hyponatremia can be hypotonic, isotonic (pseudohyponatremia), or hypertonic. Most true hyponatremia is hypotonic.',
            nextStageId: 'volume-status',
          },
          {
            id: 'volume',
            text: 'Assess volume status immediately',
            isCorrect: false,
            feedback: '✗ While volume status is important, you must first confirm this is true hypotonic hyponatremia by checking osmolality. Pseudohyponatremia (from hyperlipidemia/hyperproteinemia) and hypertonic hyponatremia (from hyperglycemia) require different management.',
          },
          {
            id: 'treat',
            text: 'Start hypertonic saline immediately',
            isCorrect: false,
            feedback: '✗ While the patient is symptomatic, you must first assess the type of hyponatremia before treatment. Starting hypertonic saline for hypertonic or isotonic hyponatremia would be harmful.',
          },
          {
            id: 'urine',
            text: 'Check urine sodium and osmolality first',
            isCorrect: false,
            feedback: '✗ Urine studies are helpful but come after confirming hypotonic hyponatremia and assessing volume status.',
          },
        ],
      },
      {
        id: 'volume-status',
        title: 'Additional Labs',
        description: `**Additional Results:**
- Serum osmolality: 245 mOsm/kg (low - confirms hypotonic hyponatremia)
- Urine osmolality: 420 mOsm/kg (inappropriately concentrated)
- Urine sodium: 65 mmol/L (elevated)
- TSH, cortisol: normal

**Volume Status Assessment:**
Based on physical exam, the patient appears euvolemic (no edema, normal skin turgor, moist mucous membranes, normal BP).`,
        question: 'What is the MOST likely diagnosis?',
        options: [
          {
            id: 'siadh',
            text: 'SIADH (Syndrome of Inappropriate ADH)',
            isCorrect: true,
            feedback: '✓ Excellent! This is classic SIADH: hypotonic hyponatremia + euvolemia + urine osmolality >100 mOsm/kg + urine sodium >40 mmol/L + normal thyroid/adrenal function. The thiazide diuretic is a common precipitant.',
            nextStageId: 'management',
          },
          {
            id: 'hypovolemia',
            text: 'Hypovolemic hyponatremia from thiazide',
            isCorrect: false,
            feedback: '✗ While thiazides can cause hyponatremia, the patient is clinically euvolemic with high urine sodium (>40), arguing against hypovolemia. In hypovolemia, urine sodium is typically <20 mmol/L unless the kidney is the source of loss.',
          },
          {
            id: 'psychogenic',
            text: 'Psychogenic polydipsia',
            isCorrect: false,
            feedback: '✗ In psychogenic polydipsia, urine osmolality would be low (<100 mOsm/kg) as the kidneys try to excrete excess water. This patient has inappropriately concentrated urine (420 mOsm/kg).',
          },
          {
            id: 'beer',
            text: 'Beer potomania',
            isCorrect: false,
            feedback: '✗ Beer potomania occurs with low solute intake and high fluid intake. There\'s no history of excessive beer consumption, and urine osmolality would be low.',
          },
        ],
      },
      {
        id: 'management',
        title: 'Management',
        description: `**Diagnosis: SIADH secondary to thiazide diuretic**

The patient is symptomatic (confusion, altered mental status) with severe hyponatremia (118 mmol/L).

**Treatment Principles:**
- Symptomatic hyponatremia requires active treatment
- STOP the thiazide diuretic
- Correction must be SLOW to avoid osmotic demyelination syndrome
- Target: 4-6 mmol/L increase in 24 hours (conservative)
- Maximum: 8-10 mmol/L in 24 hours`,
        question: 'What is the MOST appropriate initial treatment?',
        options: [
          {
            id: 'isotonic',
            text: 'Normal saline (0.9% NaCl) infusion',
            isCorrect: false,
            feedback: '✗ Normal saline is CONTRAINDICATED in SIADH! In SIADH, the kidneys excrete sodium but retain water. Normal saline (154 mmol/L Na) is hypotonic relative to the patient\'s urine (420 mOsm/kg), so it will actually WORSEN hyponatremia.',
          },
          {
            id: 'hypertonic',
            text: '3% hypertonic saline at controlled rate + fluid restriction',
            isCorrect: true,
            feedback: '✓ Correct! For symptomatic severe hyponatremia, hypertonic saline (3% = 513 mmol/L) is appropriate. Infuse slowly (aim for 0.5 mmol/L/hour increase), monitor sodium every 2-4 hours, and restrict fluids. The hypertonic saline overcomes ADH effect.',
            nextStageId: 'outcome',
          },
          {
            id: 'restriction-only',
            text: 'Fluid restriction alone (800 mL/day)',
            isCorrect: false,
            feedback: '✗ While fluid restriction is part of SIADH management, it\'s too slow for symptomatic severe hyponatremia. The patient needs active treatment with hypertonic saline. Fluid restriction can be used for maintenance after initial correction.',
          },
          {
            id: 'demeclocycline',
            text: 'Demeclocycline to induce nephrogenic DI',
            isCorrect: false,
            feedback: '✗ Demeclocycline induces nephrogenic diabetes insipidus and can treat chronic SIADH, but it takes days to work. This patient needs immediate treatment for symptomatic severe hyponatremia.',
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Outcome & Pearls',
        description: `**Treatment Course:**
- Thiazide discontinued
- 3% hypertonic saline infused at 30 mL/hour
- Fluid restriction to 800 mL/day
- Sodium checked every 2 hours

**24-Hour Labs:**
- Sodium increased from 118 to 124 mmol/L (6 mmol/L rise - safe!)
- Mental status improving
- Continued on fluid restriction and slow correction

**Final Sodium (48 hours):** 131 mmol/L
**Outcome:** Patient fully recovered, discharged with close follow-up

**Key Learning Points:**
1. **Classification:** Always assess tonicity → volume status → urine studies
2. **SIADH Criteria:** Hypotonic hyponatremia + euvolemia + Uosm >100 + UNa >40 + normal thyroid/adrenal
3. **Thiazides:** Common cause of SIADH-like picture, especially in elderly women
4. **Never use normal saline in SIADH** - it can worsen hyponatremia!
5. **Osmotic demyelination:** Limit correction to 8-10 mmol/L per 24 hours (4-6 is safer)
6. **Symptomatic = hypertonic saline**, asymptomatic = fluid restriction`,
        clinicalPearl: `🔑 **Critical Pearl:** In SIADH, normal saline is paradoxically HYPOtonic relative to the patient's urine. The kidneys will excrete the sodium and retain the water, worsening hyponatremia. Always use hypertonic saline (3%) for symptomatic cases or fluid restriction for mild cases.`,
      },
    ],
  },
  {
    id: 'hyperkalemia-1',
    title: 'Dialysis Patient with Peaked T Waves',
    difficulty: 'advanced',
    electrolytes: ['potassium'],
    learningObjectives: [
      'Recognize ECG changes of severe hyperkalemia',
      'Apply emergency hyperkalemia treatment protocol',
      'Understand mechanism of each treatment modality',
      'Identify when emergent dialysis is indicated',
    ],
    stages: [
      {
        id: 'presentation',
        title: 'Code Blue',
        description: `**Overhead Page: "Code Blue, Dialysis Unit"**

You rush to the dialysis unit where a 58-year-old man on the dialysis machine is unresponsive. Telemetry shows a wide-complex bradycardia.

**Background:**
- ESRD on hemodialysis (M/W/F schedule)
- Missed yesterday's dialysis session (self-discontinued early)
- Called in this morning with "weakness and nausea"

**Vitals:**
- BP 88/45, HR 38, RR 10, O2 sat 85%
- Patient barely responsive`,
        labs: [
          { name: 'Potassium (stat)', value: '8.2', unit: 'mmol/L', abnormal: true },
          { name: 'pH', value: '7.18', unit: '', abnormal: true },
          { name: 'HCO3', value: '14', unit: 'mmol/L', abnormal: true },
        ],
        question: 'What is the IMMEDIATE first action?',
        options: [
          {
            id: 'calcium',
            text: 'Administer IV calcium gluconate 10% 10 mL immediately',
            isCorrect: true,
            feedback: '✓ CORRECT! Cardiac protection is FIRST. Calcium gluconate stabilizes the cardiac membrane within 1-3 minutes but does NOT lower potassium. Give this while preparing other treatments. Repeat if ECG changes persist after 5-10 min.',
            nextStageId: 'shift-potassium',
          },
          {
            id: 'insulin',
            text: 'Give insulin + glucose to shift potassium',
            isCorrect: false,
            feedback: '✗ While insulin+glucose is critical, you must FIRST protect the heart with calcium. This patient has life-threatening bradycardia from hyperkalemia. Calcium works in 1-3 minutes; insulin takes 15-30 minutes.',
          },
          {
            id: 'dialysis',
            text: 'Start emergent hemodialysis immediately',
            isCorrect: false,
            feedback: '✗ While dialysis is needed, it takes time to set up and initiate. You need immediate cardiac protection with calcium gluconate first, then start dialysis while giving other temporizing treatments.',
          },
          {
            id: 'bicarb',
            text: 'Give sodium bicarbonate for the acidosis',
            isCorrect: false,
            feedback: '✗ Bicarbonate can help with acidosis and shift K+ intracellularly, but cardiac protection is the priority. Also, bicarbonate works slowly and evidence is limited for hyperkalemia treatment.',
          },
        ],
      },
      {
        id: 'shift-potassium',
        title: 'Shifting Potassium',
        description: `**Calcium given!** ECG now shows less widening of QRS.

**Current Status:**
- Calcium gluconate 10 mL IV push given
- Patient more responsive
- HR improved to 52
- Still critically hyperkalemic (K+ 8.2)

**Multi-pronged approach needed:**
You need to SHIFT potassium into cells while arranging for REMOVAL from the body.`,
        question: 'Which combination is BEST for shifting K+ intracellularly?',
        options: [
          {
            id: 'all-three',
            text: 'Insulin 10U IV + D50 25g IV + Albuterol 10-20mg nebulized + NaHCO3 50mEq IV',
            isCorrect: true,
            feedback: '✓ EXCELLENT! Use ALL available therapies in severe hyperkalemia:\n• Insulin+glucose: 10 units regular + 25g dextrose (lowers K+ 0.6-1.0 in 30 min)\n• Albuterol: 10-20 mg nebulized (lowers K+ 0.5-1.0 in 30 min) \n• Bicarbonate: 50 mEq if acidotic (may help)\n\nThese are TEMPORIZING - you still need to REMOVE K+ from body!',
            nextStageId: 'removal',
          },
          {
            id: 'insulin-only',
            text: 'Insulin 10 units IV + D50 25g IV only',
            isCorrect: false,
            feedback: '✗ Insulin+glucose is good but in SEVERE hyperkalemia (8.2!), use MULTIPLE modalities. Add albuterol for additive effect. Each mmol/L reduction matters when K+ is this high.',
          },
          {
            id: 'albuterol-only',
            text: 'Albuterol 20 mg nebulized only',
            isCorrect: false,
            feedback: '✗ Albuterol alone is insufficient for K+ 8.2. Use it WITH insulin+glucose for maximum effect. The therapies work through different mechanisms and are additive.',
          },
          {
            id: 'wrong-dose',
            text: 'Insulin 20 units IV + D50 50g IV',
            isCorrect: false,
            feedback: '✗ The standard dose is 10 units regular insulin + 25g dextrose (D50 50 mL). Higher insulin doses don\'t lower K+ more and increase hypoglycemia risk.',
          },
        ],
      },
      {
        id: 'removal',
        title: 'Potassium Removal',
        description: `**After Temporizing Measures:**
- Calcium given (cardiac protection)
- Insulin + glucose + albuterol + bicarb given
- K+ shifted intracellularly (temporarily!)
- HR now 68, BP 105/62
- Repeat K+ 15 minutes later: 7.4 mmol/L (↓ 0.8)

**Problem:** These measures only SHIFT K+. In 2-4 hours, K+ will redistribute back out of cells. **You MUST remove K+ from the body.**

**Patient factors:**
- Anuric (no urine output)
- On chronic hemodialysis
- Next scheduled dialysis: tomorrow`,
        question: 'What is the definitive treatment for K+ removal?',
        options: [
          {
            id: 'emergent-hd',
            text: 'Emergent hemodialysis NOW',
            isCorrect: true,
            feedback: '✓ CORRECT! This patient is anuric with life-threatening hyperkalemia. Hemodialysis removes ~40-50 mEq K+ per hour and is the ONLY definitive therapy for severe hyperkalemia in ESRD. Start immediately - don\'t wait for scheduled session!',
            nextStageId: 'outcome',
          },
          {
            id: 'kayexalate',
            text: 'Sodium polystyrene sulfonate (Kayexalate) 30g PO',
            isCorrect: false,
            feedback: '✗ Kayexalate works very slowly (hours to days) and has limited efficacy. In life-threatening hyperkalemia with ESRD, this is inadequate. Need emergent dialysis. Kayexalate may help prevent recurrence but won\'t save the patient now.',
          },
          {
            id: 'lasix',
            text: 'Furosemide 80 mg IV to promote renal K+ excretion',
            isCorrect: false,
            feedback: '✗ The patient is ANURIC (no urine output) from ESRD. Loop diuretics won\'t work without kidney function. This patient needs dialysis.',
          },
          {
            id: 'patiromer',
            text: 'Patiromer 8.4g PO once daily',
            isCorrect: false,
            feedback: '✗ Patiromer (Veltassa) is a newer K+ binder for chronic management, but it takes 4-7 hours to start working and is not for acute life-threatening hyperkalemia. Need emergent dialysis.',
          },
        ],
      },
      {
        id: 'outcome',
        title: 'Outcome & Pearls',
        description: `**Treatment Summary:**
1. ✓ Calcium gluconate 10 mL IV → cardiac protection (1-3 min)
2. ✓ Insulin 10U + D50 25g IV → shift K+ into cells (15-30 min)
3. ✓ Albuterol 20 mg nebulized → shift K+ into cells (15-30 min)
4. ✓ NaHCO3 50 mEq IV → correct acidosis, shift K+ (variable)
5. ✓ EMERGENT hemodialysis → remove K+ from body

**4 Hours Later:**
- Post-dialysis K+: 4.8 mmol/L
- ECG: Normal sinus rhythm, normal QRS
- Patient awake, alert, oriented

**Discharge Plan:**
- Resume M/W/F dialysis schedule
- Dietary K+ restriction <2g/day
- Close monitoring
- Patient education on NEVER missing dialysis

**Key Learning Points:**
1. **Calcium FIRST** for cardiac protection (doesn't lower K+, just protects heart)
2. **Multi-modal shifting:** Use insulin+glucose AND albuterol (additive effects)
3. **Temporizing vs Definitive:** Shifting buys time; must REMOVE K+
4. **Dialysis indications:** Refractory hyperkalemia, ESRD, severe toxicity
5. **ECG progression:** Peaked T's → PR prolongation → QRS widening → sine wave → VF
6. **Repeat calcium:** If ECG changes persist after 5-10 min, give another dose`,
        clinicalPearl: `🔑 **Critical Pearl:** Hyperkalemia treatment has 3 goals with different time frames:
1. PROTECT the heart (calcium - works in 1-3 min, lasts 30-60 min)
2. SHIFT K+ into cells (insulin+glucose, albuterol - works in 15-30 min, lasts 2-4 hours)
3. REMOVE K+ from body (dialysis, diuretics - hours)

In severe hyperkalemia, you must do ALL THREE simultaneously!`,
      },
    ],
  },
]

export default function CasesList() {
  const [selectedCase, setSelectedCase] = useState<CaseVignette | null>(null)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const { completeLesson } = useProgress()

  const handleSelectCase = (caseVignette: CaseVignette) => {
    setSelectedCase(caseVignette)
    setCurrentStageIndex(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setCorrectAnswers(0)
    setTotalQuestions(caseVignette.stages.filter(s => s.options).length)
  }

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId)
    setShowFeedback(true)

    const option = currentStage?.options?.find(o => o.id === optionId)
    if (option?.isCorrect) {
      setCorrectAnswers(prev => prev + 1)
    }
  }

  const handleNext = () => {
    const option = currentStage?.options?.find(o => o.id === selectedOption)

    if (option?.nextStageId) {
      const nextIndex = selectedCase!.stages.findIndex(s => s.id === option.nextStageId)
      setCurrentStageIndex(nextIndex)
    } else {
      setCurrentStageIndex(prev => prev + 1)
    }

    setSelectedOption(null)
    setShowFeedback(false)

    // If completed, mark as completed
    if (currentStageIndex === selectedCase!.stages.length - 1) {
      completeLesson(`case-${selectedCase!.id}`)
    }
  }

  const handleRestart = () => {
    setCurrentStageIndex(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setCorrectAnswers(0)
  }

  const handleBackToList = () => {
    setSelectedCase(null)
    setCurrentStageIndex(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setCorrectAnswers(0)
  }

  if (!selectedCase) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Clinical Case Vignettes</h1>
          <p className="text-xl text-muted-foreground">
            Interactive scenarios to apply your electrolyte knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_CASES.map((caseVignette) => (
            <Card
              key={caseVignette.id}
              className="cursor-pointer hover:shadow-lg transition-all"
              onClick={() => handleSelectCase(caseVignette)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>{caseVignette.title}</CardTitle>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      caseVignette.difficulty === 'beginner'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : caseVignette.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {caseVignette.difficulty}
                  </span>
                </div>
                <CardDescription>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4" />
                    {caseVignette.stages.length} stages
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseVignette.electrolytes.map(e => (
                      <span key={e} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                        {e}
                      </span>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold mb-2">Learning Objectives:</p>
                <ul className="text-sm space-y-1">
                  {caseVignette.learningObjectives.slice(0, 2).map((obj, i) => (
                    <li key={i} className="text-muted-foreground">• {obj}</li>
                  ))}
                  {caseVignette.learningObjectives.length > 2 && (
                    <li className="text-muted-foreground">• +{caseVignette.learningObjectives.length - 2} more...</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 safety-warning">
          <p className="font-semibold mb-2">📚 Learning Format</p>
          <p className="text-sm">
            Each case presents a realistic clinical scenario with branching decisions.
            You'll receive immediate feedback on your choices and learn key clinical pearls.
            These cases are designed to mirror real-world clinical reasoning.
          </p>
        </div>
      </div>
    )
  }

  const currentStage = selectedCase.stages[currentStageIndex]
  const isLastStage = currentStageIndex === selectedCase.stages.length - 1
  const selectedOptionData = currentStage.options?.find(o => o.id === selectedOption)

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" className="mb-6" onClick={handleBackToList}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Cases
      </Button>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">{selectedCase.title}</h2>
          <span className="text-sm text-muted-foreground">
            Stage {currentStageIndex + 1} of {selectedCase.stages.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentStageIndex + 1) / selectedCase.stages.length) * 100}%` }}
          />
        </div>
        {totalQuestions > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Score: {correctAnswers}/{totalQuestions} correct
          </p>
        )}
      </div>

      {/* Stage Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{currentStage.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="whitespace-pre-line">{currentStage.description}</div>

          {/* Labs Table */}
          {currentStage.labs && currentStage.labs.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Test</th>
                    <th className="text-left p-3 font-semibold">Value</th>
                    <th className="text-left p-3 font-semibold">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStage.labs.map((lab, i) => (
                    <tr key={i} className={lab.abnormal ? 'bg-destructive/10' : ''}>
                      <td className="p-3">{lab.name}</td>
                      <td className={`p-3 font-semibold ${lab.abnormal ? 'text-destructive' : ''}`}>
                        {lab.value}
                      </td>
                      <td className="p-3">{lab.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Question */}
          {currentStage.question && (
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="font-semibold text-lg mb-4">{currentStage.question}</p>

              <div className="space-y-3">
                {currentStage.options?.map((option) => {
                  const isSelected = selectedOption === option.id
                  const showCorrect = showFeedback && option.isCorrect
                  const showIncorrect = showFeedback && isSelected && !option.isCorrect

                  return (
                    <button
                      key={option.id}
                      onClick={() => !showFeedback && handleSelectOption(option.id)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                          : showIncorrect
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                          : isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary hover:bg-accent'
                      } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start gap-3">
                        {showCorrect && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />}
                        {showIncorrect && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Feedback */}
              {showFeedback && selectedOptionData && (
                <div className={`mt-4 p-4 rounded-lg ${
                  selectedOptionData.isCorrect
                    ? 'bg-green-50 dark:bg-green-950/30 border border-green-500'
                    : 'bg-red-50 dark:bg-red-950/30 border border-red-500'
                }`}>
                  <p className="whitespace-pre-line">{selectedOptionData.feedback}</p>
                </div>
              )}
            </div>
          )}

          {/* Clinical Pearl */}
          {currentStage.clinicalPearl && (
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <p className="whitespace-pre-line">{currentStage.clinicalPearl}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {currentStageIndex > 0 && !showFeedback && (
          <Button
            variant="outline"
            onClick={() => setCurrentStageIndex(prev => prev - 1)}
          >
            Previous Stage
          </Button>
        )}
        <div className="flex-1" />
        {showFeedback && !isLastStage && (
          <Button onClick={handleNext}>
            Continue to Next Stage
          </Button>
        )}
        {isLastStage && (
          <div className="flex gap-3">
            <Card className="bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold">Case Completed!</p>
                  <p className="text-sm text-muted-foreground">
                    Final Score: {correctAnswers}/{totalQuestions} ({Math.round((correctAnswers/totalQuestions)*100)}%)
                  </p>
                </div>
              </div>
            </Card>
            <Button onClick={handleRestart} variant="outline">
              Restart Case
            </Button>
            <Button onClick={handleBackToList}>
              More Cases
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
