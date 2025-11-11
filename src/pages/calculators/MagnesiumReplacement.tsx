import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calculator, AlertTriangle } from 'lucide-react'

export default function MagnesiumReplacement() {
  const [weight, setWeight] = useState<string>('70')
  const [currentMg, setCurrentMg] = useState<string>('')
  const [targetMg, setTargetMg] = useState<string>('2.0')
  const [route, setRoute] = useState<'iv' | 'oral'>('oral')

  const calculateReplacement = () => {
    const wt = parseFloat(weight)
    const curr = parseFloat(currentMg)
    const target = parseFloat(targetMg)

    if (!wt || !curr || !target || curr >= target) return null

    // Magnesium deficit calculation
    // Mg space = 0.3 L/kg (predominantly intracellular)
    // For every 0.1 mg/dL decrease, need ~0.5 mEq/kg
    const deficit = (target - curr) * 5 * wt // mEq

    return {
      deficit: deficit.toFixed(0),
      weight: wt,
      current: curr,
      target: target,
    }
  }

  const result = calculateReplacement()

  const getOralProtocol = (deficitMeq: number) => {
    // Oral magnesium: Magnesium oxide 400mg = 241mg elemental Mg = ~20 mEq
    const tablets = Math.ceil(deficitMeq / 20)
    return {
      tablets: Math.min(tablets, 12), // Max 12 tablets/day due to GI tolerance
      dose: '400mg',
      form: 'Magnesium oxide',
      schedule: tablets <= 4 ? 'divided BID-QID' : '2 tablets TID-QID',
      duration: Math.ceil(tablets / 4), // days if taking 4/day
    }
  }

  const getIVProtocol = (deficitMeq: number, severe: boolean) => {
    if (severe) {
      // Severe symptomatic (torsades, seizures)
      return {
        initial: '2-4g (16-32 mEq) MgSO₄ IV',
        rate: 'Over 10-15 minutes',
        followUp: 'Then continuous infusion 1-2 g/hr',
        monitoring: 'Continuous cardiac monitoring, check Mg q2-4h',
      }
    } else {
      // Moderate, asymptomatic
      const grams = Math.min(deficitMeq / 8, 6) // 1g MgSO₄ = 8 mEq, max 6g/day
      return {
        dose: `${grams.toFixed(1)}g MgSO₄`,
        dilution: `In 100-250mL NS or D5W`,
        rate: 'Over 3-6 hours',
        frequency: 'May repeat in 24 hours based on levels',
        monitoring: 'Check Mg, reflexes, renal function',
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link to="/calculators">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculators
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Calculator className="w-10 h-10 text-orange-500" />
          Magnesium Replacement Calculator
        </h1>
        <p className="text-xl text-muted-foreground">
          Calculate magnesium deficit and repletion strategy
        </p>
      </div>

      {/* Safety Warning */}
      <div className="safety-warning mb-8">
        <p className="font-semibold mb-2">⚠️ Clinical Guidance</p>
        <ul className="text-sm space-y-1">
          <li>• <strong>Always check Mg²⁺ when treating hypokalemia</strong> — refractory hypoK won't correct until Mg is repleted</li>
          <li>• <strong>Torsades de pointes:</strong> MgSO₄ 2g IV over 1-2 min is first-line, even if Mg²⁺ normal</li>
          <li>• Reduce IV dose by 50% if GFR {"<"} 30 mL/min (risk of hypermagnesemia)</li>
          <li>• Oral magnesium causes diarrhea (dose-limiting). Mag oxide best absorbed, citrate/gluconate better tolerated.</li>
        </ul>
      </div>

      {/* Input Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Parameters</CardTitle>
          <CardDescription>Enter patient data to calculate magnesium deficit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                min="1"
                max="300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Current Mg²⁺ (mg/dL)</label>
              <Input
                type="number"
                step="0.1"
                value={currentMg}
                onChange={(e) => setCurrentMg(e.target.value)}
                placeholder="1.2"
                min="0.1"
                max="2.5"
              />
              <p className="text-xs text-muted-foreground mt-1">Normal: 1.5-2.5 mg/dL</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Mg²⁺ (mg/dL)</label>
              <Input
                type="number"
                step="0.1"
                value={targetMg}
                onChange={(e) => setTargetMg(e.target.value)}
                placeholder="2.0"
                min="1.5"
                max="2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Route</label>
              <div className="flex gap-4 mt-3">
                <Button
                  variant={route === 'oral' ? 'default' : 'outline'}
                  onClick={() => setRoute('oral')}
                  className="flex-1"
                >
                  Oral
                </Button>
                <Button
                  variant={route === 'iv' ? 'default' : 'outline'}
                  onClick={() => setRoute('iv')}
                  className="flex-1"
                >
                  IV
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <>
          <Card className="mb-8 bg-primary/5">
            <CardHeader>
              <CardTitle>Estimated Magnesium Deficit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background rounded">
                  <p className="text-sm text-muted-foreground">Current Mg²⁺</p>
                  <p className="text-3xl font-bold text-red-600">{result.current} mg/dL</p>
                </div>
                <div className="text-center p-4 bg-background rounded">
                  <p className="text-sm text-muted-foreground">Target Mg²⁺</p>
                  <p className="text-3xl font-bold text-green-600">{result.target} mg/dL</p>
                </div>
                <div className="text-center p-4 bg-background rounded">
                  <p className="text-sm text-muted-foreground">Estimated Deficit</p>
                  <p className="text-3xl font-bold text-orange-600">{result.deficit} mEq</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Note: Mg²⁺ is predominantly intracellular. Serum level may not reflect total body stores. Deficit calculation is an estimate.
              </p>
            </CardContent>
          </Card>

          {route === 'oral' && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Oral Magnesium Replacement</CardTitle>
                <CardDescription>Preferred for asymptomatic, mild-moderate deficiency</CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  const oral = getOralProtocol(parseFloat(result.deficit))
                  return (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded">
                        <p className="font-bold text-lg mb-2">
                          {oral.form} {oral.dose}
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Total tablets needed:</strong> ~{oral.tablets} tablets
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Dosing schedule:</strong> {oral.schedule}
                        </p>
                        <p className="text-sm">
                          <strong>Duration:</strong> ~{oral.duration} days (if taking 4 tablets/day)
                        </p>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded space-y-2 text-sm">
                        <p className="font-semibold">Oral Magnesium Options:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• <strong>Magnesium oxide 400mg:</strong> ~241mg elemental Mg (~20 mEq). Best absorbed, but causes diarrhea.</li>
                          <li>• <strong>Magnesium citrate 400mg:</strong> ~64mg elemental Mg. Better GI tolerance.</li>
                          <li>• <strong>Magnesium gluconate 500mg:</strong> ~27mg elemental Mg. Least diarrhea, but need more tablets.</li>
                        </ul>
                      </div>

                      <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
                        <p className="text-sm">
                          <strong>Limitation:</strong> Diarrhea limits oral repletion. If patient develops diarrhea or cannot tolerate oral, switch to IV route.
                        </p>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}

          {route === 'iv' && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>IV Magnesium Replacement</CardTitle>
                <CardDescription>Select severity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Severe */}
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="font-bold text-lg mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Severe/Symptomatic (Torsades, Seizures, Mg {"<"} 1.0)
                    </p>
                    {(() => {
                      const iv = getIVProtocol(parseFloat(result.deficit), true)
                      return (
                        <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded space-y-2 text-sm">
                          <p><strong>Initial bolus:</strong> {iv.initial}</p>
                          <p><strong>Rate:</strong> {iv.rate}</p>
                          <p><strong>Follow-up:</strong> {iv.followUp}</p>
                          <p><strong>Monitoring:</strong> {iv.monitoring}</p>
                        </div>
                      )
                    })()}
                  </div>

                  {/* Moderate */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="font-bold text-lg mb-2">Moderate, Asymptomatic</p>
                    {(() => {
                      const iv = getIVProtocol(parseFloat(result.deficit), false)
                      return (
                        <div className="bg-muted p-4 rounded space-y-2 text-sm">
                          <p><strong>Dose:</strong> {iv.dose}</p>
                          <p><strong>Dilution:</strong> {iv.dilution}</p>
                          <p><strong>Rate:</strong> {iv.rate}</p>
                          <p><strong>Frequency:</strong> {iv.frequency}</p>
                          <p><strong>Monitoring:</strong> {iv.monitoring}</p>
                        </div>
                      )
                    })()}
                  </div>

                  <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded">
                    <p className="text-sm font-semibold mb-1">Cautions:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Monitor for hypermagnesemia: ↓ reflexes, bradycardia, hypotension</li>
                      <li>• Reduce dose 50% if GFR {"<"} 30 mL/min</li>
                      <li>• Recheck Mg²⁺ after repletion and q24h until stable</li>
                      <li>• <strong>Check K⁺ and Ca²⁺</strong> — often coexist with hypomagnesemia</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Clinical Context */}
      <Card className="mb-8 bg-gradient-to-br from-orange-500/10 to-yellow-500/10">
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Mg-K connection:</strong> Hypomagnesemia impairs Na-K-ATPase → renal K⁺ wasting. Hypokalemia won't correct until Mg is repleted!</li>
            <li>• <strong>Mg-Ca connection:</strong> Severe hypomagnesemia ({"<"}1.0) impairs PTH secretion → hypocalcemia. Check both.</li>
            <li>• <strong>Torsades de pointes:</strong> MgSO₄ is first-line treatment even if Mg²⁺ normal. Dose: 2g IV over 1-2 min, repeat PRN.</li>
            <li>• <strong>PPI-induced hypomagnesemia:</strong> Chronic PPI use ({">"} 1 year) → hypomagnesemia. Consider stopping PPI or switching to H2 blocker.</li>
            <li>• <strong>Alcohol use disorder:</strong> High risk for hypomagnesemia (poor intake + renal wasting + diarrhea). Replicate empirically.</li>
            <li>• <strong>Loop diuretics:</strong> Cause urinary Mg wasting. Consider Mg supplementation in patients on chronic furosemide.</li>
          </ul>
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <ul className="list-disc list-inside">
            <li>William JH, Danziger J. Magnesium Deficiency and Proton-Pump Inhibitor Use: A Clinical Review. J Clin Pharmacol. 2016;56:660-668</li>
            <li>Danziger J, et al. Proton-pump inhibitor use is associated with low serum magnesium concentrations. Kidney Int. 2013;83:692-699</li>
            <li>Jahnen-Dechent W, Ketteler M. Magnesium basics. Clin Kidney J. 2012;5(Suppl 1):i3-i14</li>
            <li>UpToDate: Hypomagnesemia: Clinical manifestations of magnesium depletion (2023)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
