import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Info } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

export default function CalciumCorrection() {
  // Input states
  const [totalCalcium, setTotalCalcium] = useState<string>('7.5')
  const [albumin, setAlbumin] = useState<string>('2.5')
  const [unit, setUnit] = useState<'mg/dL' | 'mmol/L'>('mg/dL')

  // Result states
  const [correctedCalcium, setCorrectedCalcium] = useState<number>(0)
  const [interpretation, setInterpretation] = useState<string>('')
  const [severity, setSeverity] = useState<'normal' | 'mild' | 'moderate' | 'severe'>('normal')

  // Calculate corrected calcium
  useEffect(() => {
    const ca = parseFloat(totalCalcium)
    const alb = parseFloat(albumin)

    if (isNaN(ca) || isNaN(alb)) {
      return
    }

    let corrected: number

    if (unit === 'mg/dL') {
      // Formula: Corrected Ca (mg/dL) = Total Ca + 0.8 × (4.0 - Albumin)
      // Reference: Payne et al, BMJ 1973
      corrected = ca + 0.8 * (4.0 - alb)
      setCorrectedCalcium(corrected)

      // Interpret results (mg/dL)
      if (corrected < 8.5) {
        if (corrected < 7.0) {
          setSeverity('severe')
          setInterpretation('Severe hypocalcemia - High risk of tetany, seizures')
        } else if (corrected < 8.0) {
          setSeverity('moderate')
          setInterpretation('Moderate hypocalcemia - Monitor closely')
        } else {
          setSeverity('mild')
          setInterpretation('Mild hypocalcemia')
        }
      } else if (corrected > 10.5) {
        if (corrected > 12.0) {
          setSeverity('severe')
          setInterpretation('Severe hypercalcemia - Risk of cardiac and renal complications')
        } else if (corrected > 11.5) {
          setSeverity('moderate')
          setInterpretation('Moderate hypercalcemia')
        } else {
          setSeverity('mild')
          setInterpretation('Mild hypercalcemia')
        }
      } else {
        setSeverity('normal')
        setInterpretation('Normal corrected calcium')
      }
    } else {
      // SI units: mmol/L
      // Formula: Corrected Ca (mmol/L) = Total Ca + 0.02 × (40 - Albumin in g/L)
      // Convert albumin from g/dL to g/L if needed
      const albuminGL = alb * 10 // Convert g/dL to g/L
      corrected = ca + 0.02 * (40 - albuminGL)
      setCorrectedCalcium(corrected)

      // Interpret results (mmol/L)
      if (corrected < 2.1) {
        if (corrected < 1.75) {
          setSeverity('severe')
          setInterpretation('Severe hypocalcemia - High risk of tetany, seizures')
        } else if (corrected < 2.0) {
          setSeverity('moderate')
          setInterpretation('Moderate hypocalcemia - Monitor closely')
        } else {
          setSeverity('mild')
          setInterpretation('Mild hypocalcemia')
        }
      } else if (corrected > 2.6) {
        if (corrected > 3.0) {
          setSeverity('severe')
          setInterpretation('Severe hypercalcemia - Risk of cardiac and renal complications')
        } else if (corrected > 2.9) {
          setSeverity('moderate')
          setInterpretation('Moderate hypercalcemia')
        } else {
          setSeverity('mild')
          setInterpretation('Mild hypercalcemia')
        }
      } else {
        setSeverity('normal')
        setInterpretation('Normal corrected calcium')
      }
    }
  }, [totalCalcium, albumin, unit])

  const getSeverityColor = () => {
    switch (severity) {
      case 'severe':
        return 'text-red-600 dark:text-red-400'
      case 'moderate':
        return 'text-orange-600 dark:text-orange-400'
      case 'mild':
        return 'text-yellow-600 dark:text-yellow-400'
      default:
        return 'text-green-600 dark:text-green-400'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Navigation */}
      <Link to="/calcium">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calcium Module
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Calcium Albumin Corrector</h1>
        <p className="text-lg text-muted-foreground">
          Adjust total calcium for albumin levels to estimate ionized calcium
        </p>
      </div>

      {/* Info Banner */}
      <div className="safety-warning mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-lg mb-1">Why Correction is Necessary</p>
            <p className="text-sm">
              Approximately 40% of calcium is bound to albumin. In hypoalbuminemia, total calcium
              appears low but ionized (active) calcium may be normal. This calculator estimates
              what the total calcium would be if albumin were normal (4.0 g/dL).
            </p>
            <p className="text-sm mt-2">
              <strong>Gold standard:</strong> Direct measurement of ionized calcium (1.1-1.3 mmol/L or 4.5-5.3 mg/dL)
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Laboratory Values</CardTitle>
          <CardDescription>Enter the patient's lab results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Unit Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Unit System</label>
            <div className="flex gap-4">
              <Button
                variant={unit === 'mg/dL' ? 'default' : 'outline'}
                onClick={() => setUnit('mg/dL')}
                className="flex-1"
              >
                US Units (mg/dL)
              </Button>
              <Button
                variant={unit === 'mmol/L' ? 'default' : 'outline'}
                onClick={() => setUnit('mmol/L')}
                className="flex-1"
              >
                SI Units (mmol/L)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Total Serum Calcium ({unit})
              </label>
              <Input
                type="number"
                value={totalCalcium}
                onChange={(e) => setTotalCalcium(e.target.value)}
                min="0"
                max="20"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Normal: {unit === 'mg/dL' ? '8.5-10.5 mg/dL' : '2.1-2.6 mmol/L'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Serum Albumin (g/dL)</label>
              <Input
                type="number"
                value={albumin}
                onChange={(e) => setAlbumin(e.target.value)}
                min="0"
                max="6"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Normal: 3.5-5.5 g/dL
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Corrected Calcium Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Albumin-Corrected Calcium</p>
              <p className={`text-4xl font-bold ${getSeverityColor()}`}>
                {formatNumber(correctedCalcium, 2)} {unit}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Interpretation</p>
              <p className={`text-lg font-semibold ${getSeverityColor()}`}>
                {interpretation}
              </p>
            </div>

            {parseFloat(albumin) < 4.0 && (
              <div className="safety-warning">
                <p className="text-sm">
                  <strong>Note:</strong> Albumin is below normal (4.0 g/dL). The uncorrected
                  calcium of {totalCalcium} {unit} underestimates true calcium status.
                  Corrected value: {formatNumber(correctedCalcium, 2)} {unit}.
                </p>
              </div>
            )}

            {parseFloat(albumin) > 4.0 && (
              <div className="safety-warning">
                <p className="text-sm">
                  <strong>Note:</strong> Albumin is above normal (4.0 g/dL). The uncorrected
                  calcium of {totalCalcium} {unit} may overestimate true calcium status.
                  Corrected value: {formatNumber(correctedCalcium, 2)} {unit}.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Formula Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Correction Formula</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-semibold text-sm mb-1">US Units (mg/dL):</p>
            <code className="block bg-muted p-3 rounded text-sm">
              Corrected Ca = Total Ca + 0.8 × (4.0 - Albumin)
            </code>
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">SI Units (mmol/L):</p>
            <code className="block bg-muted p-3 rounded text-sm">
              Corrected Ca = Total Ca + 0.02 × (40 - Albumin in g/L)
            </code>
          </div>
          <p className="text-sm text-muted-foreground">
            For every 1 g/dL decrease in albumin below 4 g/dL, add 0.8 mg/dL (0.2 mmol/L) to total calcium.
          </p>
        </CardContent>
      </Card>

      {/* Reference Information */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical References</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Key References:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Payne RB, et al. Interpretation of serum calcium in patients with abnormal serum proteins. BMJ. 1973;4:643-646</li>
            <li>Dickerson RN, et al. Accuracy of methods to estimate ionized and "corrected" serum calcium. Am J Crit Care. 2004;13:503-509</li>
            <li>UpToDate: Diagnostic approach to hypocalcemia (2023)</li>
            <li>Harrison's Principles of Internal Medicine, 21st Edition</li>
          </ul>
          <p className="mt-4">
            <strong>Limitations:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Less accurate in critical illness, acidosis, or severe dysalbuminemia</li>
            <li>Consider direct ionized calcium measurement when available</li>
            <li>pH affects calcium binding (acidosis increases ionized Ca²⁺)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
