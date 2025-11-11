import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, AlertTriangle } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

export default function PotassiumECG() {
  const [potassium, setPotassium] = useState<number>(4.0)

  // Get ECG findings based on potassium level
  const getECGFindings = (k: number) => {
    if (k >= 3.5 && k <= 5.0) {
      return {
        findings: ['Normal ECG morphology', 'Normal PR interval (120-200 ms)', 'Normal QRS duration (<120 ms)', 'Normal T wave morphology'],
        severity: 'normal',
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-950/30',
      }
    } else if (k < 2.5) {
      return {
        findings: [
          '⚠️ SEVERE HYPOKALEMIA - EMERGENCY',
          'Prominent U waves',
          'Flattened or inverted T waves',
          'ST segment depression',
          'Prolonged QT interval',
          'Increased risk of ventricular arrhythmias',
          'Possible ventricular tachycardia/fibrillation',
        ],
        severity: 'severe',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
      }
    } else if (k < 3.0) {
      return {
        findings: [
          'Moderate hypokalemia',
          'Prominent U waves appearing',
          'T wave flattening',
          'ST segment changes',
          'Prolonged QT interval',
        ],
        severity: 'moderate',
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      }
    } else if (k < 3.5) {
      return {
        findings: ['Mild hypokalemia', 'Subtle U waves may appear', 'Mild T wave flattening', 'Monitor closely'],
        severity: 'mild',
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      }
    } else if (k > 7.5) {
      return {
        findings: [
          '🚨 SEVERE HYPERKALEMIA - CARDIAC ARREST IMMINENT',
          'Loss of P waves (atrial standstill)',
          'Sine wave pattern',
          'Very wide QRS complexes',
          'Risk of ventricular fibrillation',
          'IMMEDIATE TREATMENT REQUIRED',
        ],
        severity: 'severe',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
      }
    } else if (k > 6.5) {
      return {
        findings: [
          '⚠️ SEVERE HYPERKALEMIA',
          'Absent P waves or very small P waves',
          'Widened QRS complex (>120 ms)',
          'Prolonged PR interval (if P waves visible)',
          'Peaked T waves',
          'Sine wave pattern may develop',
          'High risk of cardiac arrest',
        ],
        severity: 'severe',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
      }
    } else if (k > 5.5) {
      return {
        findings: [
          'Moderate hyperkalemia',
          'Tall peaked T waves (narrow base)',
          'Prolonged PR interval',
          'Widening QRS complex',
          'P wave flattening',
        ],
        severity: 'moderate',
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      }
    } else {
      return {
        findings: ['Mild hyperkalemia', 'Tall peaked T waves beginning', 'Narrow-based T waves', 'Monitor closely'],
        severity: 'mild',
        color: 'text-yellow-600 dark:text-yellow-400',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      }
    }
  }

  const ecgInfo = getECGFindings(potassium)

  // Get treatment recommendations
  const getTreatment = (k: number) => {
    if (k < 2.5) {
      return {
        urgency: 'EMERGENCY',
        steps: [
          'Continuous cardiac monitoring',
          'IV potassium replacement (10-20 mEq/hour max)',
          'Check Mg²⁺ level (correct if low)',
          'Monitor K⁺ every 2-4 hours',
          'Avoid rapid correction (arrhythmia risk)',
        ],
      }
    } else if (k < 3.0) {
      return {
        urgency: 'URGENT',
        steps: [
          'Cardiac monitoring recommended',
          'IV or oral potassium replacement',
          'Check Mg²⁺ level',
          'Monitor K⁺ every 4-6 hours',
        ],
      }
    } else if (k < 3.5) {
      return {
        urgency: 'Non-urgent',
        steps: ['Oral potassium supplementation', 'Dietary counseling', 'Recheck in 24-48 hours'],
      }
    } else if (k > 7.5) {
      return {
        urgency: 'LIFE-THREATENING EMERGENCY',
        steps: [
          '1. Cardiac protection: Calcium gluconate 10% 10 mL IV over 2-3 min (repeat if needed)',
          '2. Shift K⁺ intracellularly (immediate):',
          '   • Insulin 10 units IV + 25g dextrose (D50W)',
          '   • Albuterol 10-20 mg nebulized',
          '   • Sodium bicarbonate 50-100 mEq IV (if metabolic acidosis)',
          '3. Remove K⁺ from body:',
          '   • Furosemide 40-80 mg IV (if adequate renal function)',
          '   • Sodium polystyrene sulfonate (if time permits)',
          '   • EMERGENT HEMODIALYSIS',
          'Continuous cardiac monitoring',
          'Recheck K⁺ every 1-2 hours',
        ],
      }
    } else if (k > 6.5) {
      return {
        urgency: 'EMERGENCY',
        steps: [
          '1. Cardiac protection: Calcium gluconate 10% 10 mL IV over 2-3 min',
          '2. Shift K⁺ intracellularly:',
          '   • Insulin + glucose',
          '   • Albuterol nebulized',
          '   • Sodium bicarbonate (if acidotic)',
          '3. Remove K⁺:',
          '   • Loop diuretics',
          '   • GI cation exchangers',
          '   • Consider hemodialysis',
          'Continuous cardiac monitoring',
        ],
      }
    } else if (k > 5.5) {
      return {
        urgency: 'URGENT',
        steps: [
          'Stop K⁺-sparing medications',
          'Consider insulin + glucose for rapid reduction',
          'Albuterol nebulizer',
          'Diuretics if volume overloaded',
          'Cardiac monitoring',
        ],
      }
    } else if (k > 5.0) {
      return {
        urgency: 'Non-urgent',
        steps: [
          'Stop K⁺ supplements',
          'Review medications (ACEi, ARBs, K⁺-sparing diuretics)',
          'Dietary restriction',
          'Recheck in 24-48 hours',
        ],
      }
    }
    return null
  }

  const treatment = getTreatment(potassium)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Navigation */}
      <Link to="/potassium">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Potassium Module
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Heart className="w-10 h-10 text-purple-500" />
          Potassium ECG Visualizer
        </h1>
        <p className="text-lg text-muted-foreground">
          Interactive correlation between serum potassium levels and ECG findings
        </p>
      </div>

      {/* Interactive Slider */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Serum Potassium Level</CardTitle>
          <CardDescription>Adjust the slider to see corresponding ECG changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Current Value Display */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Current Level</p>
              <p className={`text-5xl font-bold ${ecgInfo.color}`}>
                {formatNumber(potassium, 1)} mmol/L
              </p>
            </div>

            {/* Slider */}
            <div className="px-4">
              <input
                type="range"
                min="2.0"
                max="8.5"
                step="0.1"
                value={potassium}
                onChange={(e) => setPotassium(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>2.0</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">3.5 - 5.0 (Normal)</span>
                <span>8.5</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button size="sm" variant="outline" onClick={() => setPotassium(2.5)}>
                Severe Low (2.5)
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPotassium(3.0)}>
                Low (3.0)
              </Button>
              <Button size="sm" variant="default" onClick={() => setPotassium(4.0)}>
                Normal (4.0)
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPotassium(6.0)}>
                High (6.0)
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPotassium(7.0)}>
                Severe High (7.0)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ECG Findings */}
      <Card className={`mb-6 ${ecgInfo.bgColor}`}>
        <CardHeader>
          <CardTitle className={ecgInfo.color}>ECG Findings</CardTitle>
          <CardDescription>Expected electrocardiographic changes at this potassium level</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {ecgInfo.findings.map((finding, index) => (
              <li key={index} className="flex items-start gap-2">
                {finding.includes('🚨') || finding.includes('⚠️') ? (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                ) : (
                  <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-primary">•</span>
                )}
                <span className={finding.includes('EMERGENCY') || finding.includes('🚨') ? 'font-bold' : ''}>
                  {finding}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Treatment Recommendations */}
      {treatment && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              Treatment Approach
              {(treatment.urgency === 'EMERGENCY' || treatment.urgency === 'LIFE-THREATENING EMERGENCY') && (
                <span className="ml-3 text-red-600 dark:text-red-400">⚠️ {treatment.urgency}</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {treatment.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">{index + 1}.</span>
                  <span className="whitespace-pre-line">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Emergency Protocol */}
      {potassium > 6.5 && (
        <div className="emergency-alert mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-lg mb-2">🚨 HYPERKALEMIA EMERGENCY PROTOCOL</p>
              <p className="mb-3">
                <strong>Life-threatening hyperkalemia (&gt; 6.5 mmol/L) requires immediate multi-pronged treatment:</strong>
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>STEP 1 - Cardiac Protection (works in 1-3 minutes):</strong>
                  <br />• Calcium gluconate 10% 10 mL IV over 2-3 minutes (stabilizes cardiac membrane)
                  <br />• Repeat dose if ECG changes persist after 5-10 minutes
                  <br />• <em>Note: Does NOT lower K⁺, only protects heart</em>
                </p>
                <p>
                  <strong>STEP 2 - Shift K⁺ Intracellularly (works in 15-30 minutes):</strong>
                  <br />• Regular insulin 10 units IV + 25g dextrose (D50W 50 mL)
                  <br />• Albuterol 10-20 mg nebulized over 10 minutes
                  <br />• Sodium bicarbonate 50 mEq IV if metabolic acidosis present
                </p>
                <p>
                  <strong>STEP 3 - Remove K⁺ from Body (works in hours):</strong>
                  <br />• Furosemide 40-80 mg IV (if adequate kidney function)
                  <br />• Patiromer or sodium polystyrene sulfonate
                  <br />• <strong>Hemodialysis</strong> for refractory cases or renal failure
                </p>
              </div>
              <p className="text-xs mt-3 opacity-90">
                Reference: Harrison's Principles 21st Ed, UpToDate 2023, NEJM 2015;372:1312-1319
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Clinical Pearls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">💡 ECG Sensitivity</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>Important:</strong> ECG changes correlate poorly with absolute K⁺ level. The rate of change
              matters more than the absolute value.
            </p>
            <p>Some patients may have severe hyperkalemia without ECG changes, while others show changes at modest elevations.</p>
            <p className="font-semibold text-orange-600 dark:text-orange-400">
              Never rely solely on ECG to rule out dangerous hyperkalemia!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">💡 Pseudo-hyperkalemia</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>Consider artifact if:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Hemolyzed specimen</li>
              <li>Prolonged tourniquet time</li>
              <li>Fist clenching during draw</li>
              <li>Thrombocytosis/leukocytosis</li>
            </ul>
            <p className="font-semibold">Repeat with proper collection technique or check whole blood K⁺ (blood gas analyzer).</p>
          </CardContent>
        </Card>
      </div>

      {/* References */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Clinical References</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <ul className="list-disc list-inside space-y-1">
            <li>Mount DB, Zandi-Nejad K. Disorders of Potassium Balance. In: Brenner and Rector's The Kidney. 11th ed.</li>
            <li>Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36:3246-3251</li>
            <li>Parham WA, et al. Hyperkalemia revisited. Tex Heart Inst J. 2006;33:40-47</li>
            <li>UpToDate: Treatment and prevention of hyperkalemia in adults (2023)</li>
            <li>NEJM: Disorders of Potassium Metabolism (2015;372:1312)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
