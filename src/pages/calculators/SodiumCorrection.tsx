import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, AlertTriangle, Info } from 'lucide-react'
import { useSettings } from '@/stores/settings'
import { formatNumber } from '@/lib/utils'

export default function SodiumCorrection() {
  const { unitSystem } = useSettings()

  // Input states
  const [currentNa, setCurrentNa] = useState<string>('120')
  const [targetNa, setTargetNa] = useState<string>('135')
  const [weight, setWeight] = useState<string>('70')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState<string>('50')

  // Result states
  const [totalBodyWater, setTotalBodyWater] = useState<number>(0)
  const [sodiumDeficit, setSodiumDeficit] = useState<number>(0)
  const [correctionRate, setCorrectionRate] = useState<number>(0)
  const [timeToCorrect, setTimeToCorrect] = useState<number>(0)
  const [warnings, setWarnings] = useState<string[]>([])

  // Calculate results
  useEffect(() => {
    const na = parseFloat(currentNa)
    const target = parseFloat(targetNa)
    const wt = parseFloat(weight)
    const ageNum = parseFloat(age)

    if (isNaN(na) || isNaN(target) || isNaN(wt) || isNaN(ageNum)) {
      return
    }

    // Calculate Total Body Water (TBW)
    // Elderly: reduce by 10%
    // Male: 60% body weight (50% if elderly)
    // Female: 50% body weight (45% if elderly)
    let tbwPercent = sex === 'male' ? 0.6 : 0.5
    if (ageNum > 65) {
      tbwPercent -= 0.05
    }
    const tbw = wt * tbwPercent
    setTotalBodyWater(tbw)

    // Calculate sodium deficit
    // Sodium deficit = TBW × (target Na - current Na)
    const deficit = tbw * (target - na)
    setSodiumDeficit(deficit)

    // Calculate change needed
    const changeNeeded = target - na

    // Check warnings
    const newWarnings: string[] = []

    // Critical: Never exceed 10 mmol/L per 24h for safety
    const maxSafeChange24h = 8 // Conservative limit

    if (Math.abs(changeNeeded) > maxSafeChange24h) {
      newWarnings.push(
        `⚠️ DANGER: Target change of ${formatNumber(changeNeeded, 1)} mmol/L exceeds safe 24h limit of ${maxSafeChange24h} mmol/L`
      )
      newWarnings.push(
        '🛑 OSMOTIC DEMYELINATION RISK: Correction too rapid can cause permanent neurological damage'
      )
    }

    if (na < 120 && changeNeeded > 6) {
      newWarnings.push(
        '⚠️ Severe hyponatremia: Recommend slower correction (4-6 mmol/L in 24h)'
      )
    }

    if (changeNeeded > 0) {
      // Correcting hyponatremia
      // Safe rate: 0.5 mmol/L/hour maximum, but aim for 4-6 mmol/L per 24h
      const safeRatePerHour = 0.25 // Conservative
      setCorrectionRate(safeRatePerHour)
      setTimeToCorrect(changeNeeded / safeRatePerHour)
    } else if (changeNeeded < 0) {
      // Correcting hypernatremia
      const safeRatePerHour = 0.5 // Can be slightly faster for hypernatremia
      setCorrectionRate(safeRatePerHour)
      setTimeToCorrect(Math.abs(changeNeeded) / safeRatePerHour)
    }

    setWarnings(newWarnings)
  }, [currentNa, targetNa, weight, sex, age])

  // Calculate infusion recommendations
  const calculateInfusion = () => {
    const na = parseFloat(currentNa)

    if (na < 135) {
      // Hyponatremia
      return {
        fluid: '3% Saline (hypertonic)',
        concentration: '513 mEq/L',
        note: 'Use for severe symptomatic hyponatremia. Monitor closely.',
      }
    } else if (na > 145) {
      // Hypernatremia
      return {
        fluid: '0.45% Saline (hypotonic) or D5W',
        concentration: '77 mEq/L (0.45% saline)',
        note: 'Free water replacement. Monitor closely.',
      }
    }

    return null
  }

  const infusionRec = calculateInfusion()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Navigation */}
      <Link to="/sodium">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sodium Module
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Sodium Correction Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate safe sodium correction rates with built-in safety limits
        </p>
      </div>

      {/* Warning Banner */}
      <div className="emergency-alert mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-lg mb-1">CRITICAL SAFETY LIMIT</p>
            <p>
              Never exceed 8-10 mmol/L sodium correction in 24 hours. Rapid correction can cause
              osmotic demyelination syndrome (ODS), leading to permanent neurological damage or death.
            </p>
            <p className="text-sm mt-2 opacity-90">
              Reference: UpToDate 2023, KDIGO Guidelines, Harrison's Principles 21st Ed.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Parameters</CardTitle>
          <CardDescription>Enter current lab values and patient demographics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Serum Sodium ({unitSystem === 'SI' ? 'mmol/L' : 'mEq/L'})
              </label>
              <Input
                type="number"
                value={currentNa}
                onChange={(e) => setCurrentNa(e.target.value)}
                min="100"
                max="180"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Target Serum Sodium ({unitSystem === 'SI' ? 'mmol/L' : 'mEq/L'})
              </label>
              <Input
                type="number"
                value={targetNa}
                onChange={(e) => setTargetNa(e.target.value)}
                min="100"
                max="180"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="1"
                max="300"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Age (years)</label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sex</label>
              <div className="flex gap-4">
                <Button
                  variant={sex === 'male' ? 'default' : 'outline'}
                  onClick={() => setSex('male')}
                  className="flex-1"
                >
                  Male
                </Button>
                <Button
                  variant={sex === 'female' ? 'default' : 'outline'}
                  onClick={() => setSex('female')}
                  className="flex-1"
                >
                  Female
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="emergency-alert mb-6">
          <div className="space-y-2">
            {warnings.map((warning, index) => (
              <p key={index} className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                {warning}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Results Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Calculated Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Body Water</p>
                <p className="text-2xl font-bold">{formatNumber(totalBodyWater, 1)} L</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Sodium Deficit/Excess</p>
                <p className="text-2xl font-bold">
                  {formatNumber(sodiumDeficit, 1)} mmol
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Safe Correction Rate</p>
                <p className="text-2xl font-bold">
                  {formatNumber(correctionRate, 2)} mmol/L/hour
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Estimated Time to Target</p>
                <p className="text-2xl font-bold">{formatNumber(timeToCorrect, 1)} hours</p>
                <p className="text-sm text-muted-foreground">
                  ({formatNumber(timeToCorrect / 24, 1)} days)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Infusion Recommendations */}
      {infusionRec && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recommended Infusion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Fluid Type</p>
                <p className="text-xl font-semibold">{infusionRec.fluid}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sodium Concentration</p>
                <p className="text-xl font-semibold">{infusionRec.concentration}</p>
              </div>
              <div className="safety-warning">
                <p className="flex items-start gap-2">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  {infusionRec.note}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reference Information */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical References</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Formulas Used:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Total Body Water (TBW) = Weight × Factor (0.6 male, 0.5 female, -0.05 if age &gt; 65)</li>
            <li>Sodium Deficit = TBW × (Target Na - Current Na)</li>
            <li>Safe Correction Rate: 0.25-0.5 mmol/L/hour (max 8-10 mmol/L per 24h)</li>
          </ul>
          <p className="mt-4">
            <strong>Key References:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatremia. Eur J Endocrinol. 2014</li>
            <li>Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia. J Clin Endocrinol Metab. 2013</li>
            <li>UpToDate: Treatment of Hyponatremia (Accessed 2023)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
