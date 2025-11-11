import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react'

interface AlgorithmNode {
  id: string
  label: string
  description?: string
  children?: AlgorithmNode[]
  clinical?: string
  treatment?: string
}

const HYPONATREMIA_ALGORITHM: AlgorithmNode = {
  id: 'hypoNa-root',
  label: 'Hyponatremia (Na⁺ < 135 mmol/L)',
  description: 'Assess volume status and osmolality',
  children: [
    {
      id: 'hypoNa-hypotonic',
      label: 'Hypotonic (Serum Osm < 280)',
      description: 'True hypotonic hyponatremia - most common',
      children: [
        {
          id: 'hypoNa-hypovolemic',
          label: 'Hypovolemic',
          description: 'Low effective arterial volume',
          clinical: 'Dry mucous membranes, ↓ skin turgor, tachycardia, orthostatic hypotension',
          children: [
            {
              id: 'hypoNa-renal-loss',
              label: 'Urine Na⁺ > 20 mmol/L',
              description: 'Renal sodium losses',
              clinical: 'Diuretics, salt-wasting nephropathy, cerebral salt wasting, mineralocorticoid deficiency',
              treatment: 'Stop diuretics, give normal saline, correct underlying cause',
            },
            {
              id: 'hypoNa-extrarenal-loss',
              label: 'Urine Na⁺ < 20 mmol/L',
              description: 'Extrarenal sodium losses',
              clinical: 'Vomiting, diarrhea, third-spacing (pancreatitis, burns)',
              treatment: 'Normal saline resuscitation, replace ongoing losses',
            },
          ],
        },
        {
          id: 'hypoNa-euvolemic',
          label: 'Euvolemic',
          description: 'Normal volume status',
          clinical: 'No edema, normal skin turgor, normal vital signs',
          children: [
            {
              id: 'hypoNa-siadh',
              label: 'SIADH',
              description: 'Syndrome of inappropriate ADH',
              clinical: 'Urine osm > 100, Urine Na⁺ > 20, normal thyroid/adrenal function. Causes: malignancy, CNS disease, pulmonary disease, drugs (SSRIs, carbamazepine)',
              treatment: 'Fluid restriction (< 800 mL/day), treat underlying cause, consider salt tabs, demeclocycline, or tolvaptan in severe cases',
            },
            {
              id: 'hypoNa-hypothyroid',
              label: 'Hypothyroidism',
              description: 'Severe hypothyroidism',
              clinical: 'Low TSH, fatigue, cold intolerance, bradycardia',
              treatment: 'Thyroid hormone replacement',
            },
            {
              id: 'hypoNa-adrenal',
              label: 'Adrenal Insufficiency',
              description: 'Cortisol deficiency',
              clinical: 'Hypotension, hyperkalemia, eosinophilia, hyperpigmentation (primary AI)',
              treatment: 'Hydrocortisone replacement, may need mineralocorticoid',
            },
            {
              id: 'hypoNa-psychogenic',
              label: 'Primary Polydipsia',
              description: 'Excessive water intake',
              clinical: 'Psychiatric history, urine osm < 100 (dilute)',
              treatment: 'Behavioral modification, address psychiatric condition',
            },
          ],
        },
        {
          id: 'hypoNa-hypervolemic',
          label: 'Hypervolemic',
          description: 'Increased total body water > sodium',
          clinical: 'Edema, ascites, elevated JVP',
          children: [
            {
              id: 'hypoNa-chf',
              label: 'Heart Failure',
              description: 'Reduced effective arterial volume',
              clinical: 'Elevated JVP, pulmonary edema, S3 gallop',
              treatment: 'Fluid restriction, diuretics, optimize HF therapy (ACEi, BB, SGLT2i)',
            },
            {
              id: 'hypoNa-cirrhosis',
              label: 'Cirrhosis',
              description: 'Splanchnic vasodilation → ↓ effective volume',
              clinical: 'Ascites, spider angiomata, palmar erythema',
              treatment: 'Fluid restriction, spironolactone, large-volume paracentesis, consider albumin',
            },
            {
              id: 'hypoNa-nephrotic',
              label: 'Nephrotic Syndrome',
              description: 'Hypoalbuminemia → ↓ oncotic pressure',
              clinical: 'Proteinuria > 3.5 g/day, hypoalbuminemia, edema',
              treatment: 'Treat underlying glomerular disease, diuretics, ACEi/ARB',
            },
          ],
        },
      ],
    },
    {
      id: 'hypoNa-isotonic',
      label: 'Isotonic (Serum Osm 280-295)',
      description: 'Pseudohyponatremia',
      clinical: 'Hyperlipidemia or hyperproteinemia (lab artifact with indirect ISE). Normal with direct ISE.',
      treatment: 'None needed - not true hyponatremia',
    },
    {
      id: 'hypoNa-hypertonic',
      label: 'Hypertonic (Serum Osm > 295)',
      description: 'Translocation hyponatremia',
      clinical: 'Hyperglycemia (most common), mannitol, IV contrast. For every 100 mg/dL glucose > 100, Na⁺ drops ~1.6 mmol/L',
      treatment: 'Treat hyperglycemia/remove osmotic agent. Na⁺ will normalize as osmoles clear.',
    },
  ],
}

const HYPERKALEMIA_ALGORITHM: AlgorithmNode = {
  id: 'hyperK-root',
  label: 'Hyperkalemia (K⁺ > 5.0 mmol/L)',
  description: 'Rule out pseudohyperkalemia first, then assess severity',
  children: [
    {
      id: 'hyperK-pseudo',
      label: 'Pseudohyperkalemia?',
      description: 'K⁺ release in vitro',
      clinical: 'Hemolyzed sample, prolonged tourniquet time, leukocytosis > 100k, thrombocytosis > 1 million',
      treatment: 'Repeat sample without hemolysis. If truly elevated, proceed below.',
    },
    {
      id: 'hyperK-severity',
      label: 'True Hyperkalemia - Assess Severity',
      children: [
        {
          id: 'hyperK-severe',
          label: 'Severe (K⁺ > 6.5 or ECG changes)',
          description: 'Medical emergency',
          clinical: 'ECG: peaked T waves, widened QRS, sine wave. Symptoms: weakness, paralysis',
          treatment: 'IMMEDIATE: (1) Calcium gluconate 1g IV over 2-3 min (cardiac protection), (2) Insulin 10 units + D50 50mL (shift K⁺ into cells), (3) Albuterol 10-20mg nebulized, (4) Consider dialysis if renal failure',
          children: [
            {
              id: 'hyperK-severe-causes',
              label: 'Common Causes',
              clinical: 'AKI/CKD, K⁺-sparing diuretics + ACEi/ARB, rhabdomyolysis, tumor lysis, massive hemolysis, severe metabolic acidosis',
            },
          ],
        },
        {
          id: 'hyperK-moderate',
          label: 'Moderate (K⁺ 6.0-6.5)',
          description: 'Urgent treatment needed',
          treatment: 'Insulin + glucose, albuterol, loop diuretic (if kidneys functional), sodium polystyrene sulfonate or patiromer (K⁺ binders), address underlying cause',
          children: [
            {
              id: 'hyperK-check-meds',
              label: 'Medication Review',
              clinical: 'Hold K⁺-sparing diuretics, ACEi/ARB, NSAIDs, trimethoprim, heparin, tacrolimus',
            },
            {
              id: 'hyperK-check-kidney',
              label: 'Assess Renal Function',
              clinical: 'If GFR < 15 or oliguria → Consider dialysis. If GFR 15-60 → Loop diuretics + K⁺ binders',
            },
          ],
        },
        {
          id: 'hyperK-mild',
          label: 'Mild (K⁺ 5.0-6.0)',
          description: 'Non-urgent, identify cause',
          children: [
            {
              id: 'hyperK-ckd',
              label: 'CKD/AKI',
              clinical: 'Impaired renal excretion - most common cause',
              treatment: 'Dietary K⁺ restriction, loop diuretics, K⁺ binders (patiromer, sodium zirconium cyclosilicate)',
            },
            {
              id: 'hyperK-rta4',
              label: 'Type 4 RTA',
              clinical: 'Hypoaldosteronism → hyperkalemia + non-gap metabolic acidosis. Common in diabetes.',
              treatment: 'Loop diuretics, consider fludrocortisone',
            },
            {
              id: 'hyperK-drugs',
              label: 'Medications',
              clinical: 'ACEi, ARB, spironolactone, amiloride, triamterene, NSAIDs, trimethoprim',
              treatment: 'Hold offending agents, switch to alternatives if needed',
            },
            {
              id: 'hyperK-acidosis',
              label: 'Metabolic Acidosis',
              clinical: 'H⁺/K⁺ exchange → K⁺ shifts out of cells',
              treatment: 'Treat underlying acidosis. K⁺ will drop as pH corrects.',
            },
          ],
        },
      ],
    },
  ],
}

const HYPOKALEMIA_ALGORITHM: AlgorithmNode = {
  id: 'hypoK-root',
  label: 'Hypokalemia (K⁺ < 3.5 mmol/L)',
  description: 'Assess severity and determine cause',
  children: [
    {
      id: 'hypoK-severe',
      label: 'Severe (K⁺ < 2.5 mmol/L)',
      description: 'High risk of arrhythmia',
      clinical: 'ECG: U waves, T wave flattening, ST depression, ventricular ectopy. Symptoms: muscle weakness, cramps, ileus',
      treatment: 'IV KCl (max 10-20 mEq/hr via peripheral line, 40 mEq/hr via central line). Monitor ECG. CHECK MAGNESIUM - replicate if low.',
    },
    {
      id: 'hypoK-causes',
      label: 'Identify Cause',
      children: [
        {
          id: 'hypoK-gi-loss',
          label: 'GI Losses',
          clinical: 'Diarrhea, vomiting, NG suction, laxative abuse',
          description: 'Urine K⁺ < 20 mmol/L (kidney conserving K⁺)',
          treatment: 'Oral KCl repletion, treat underlying GI condition',
        },
        {
          id: 'hypoK-renal-loss',
          label: 'Renal Losses',
          description: 'Urine K⁺ > 20 mmol/L',
          children: [
            {
              id: 'hypoK-diuretics',
              label: 'Diuretics',
              clinical: 'Loop or thiazide diuretics - most common iatrogenic cause',
              treatment: 'KCl supplementation, consider K⁺-sparing diuretic (spironolactone, amiloride)',
            },
            {
              id: 'hypoK-hyperaldo',
              label: 'Hyperaldosteronism',
              clinical: 'Primary (Conn syndrome): HTN + hypokalemia + metabolic alkalosis. Secondary: CHF, cirrhosis, renal artery stenosis',
              treatment: 'Primary: surgical resection of adenoma or spironolactone. Secondary: treat underlying condition',
            },
            {
              id: 'hypoK-bartter-gitelman',
              label: 'Bartter/Gitelman Syndrome',
              clinical: 'Genetic tubulopathies. Hypokalemia + metabolic alkalosis + normal BP. Gitelman: also hypomagnesemia',
              treatment: 'K⁺ and Mg²⁺ supplementation, K⁺-sparing diuretics, NSAIDs (reduce renal K⁺ wasting)',
            },
            {
              id: 'hypoK-rta',
              label: 'Type 1 or 2 RTA',
              clinical: 'Type 1 (distal): Non-gap acidosis + urine pH > 5.5. Type 2 (proximal): HCO₃⁻ wasting',
              treatment: 'Alkali therapy (sodium bicarbonate or citrate), K⁺ supplementation',
            },
          ],
        },
        {
          id: 'hypoK-shift',
          label: 'Transcellular Shift',
          clinical: 'K⁺ moves into cells (not true K⁺ depletion)',
          children: [
            {
              id: 'hypoK-insulin',
              label: 'Insulin Excess',
              clinical: 'Insulin therapy, refeeding syndrome',
              treatment: 'K⁺ repletion, monitor during insulin treatment',
            },
            {
              id: 'hypoK-beta-agonist',
              label: 'β₂-Agonists',
              clinical: 'Albuterol, terbutaline',
              treatment: 'Usually mild, self-limited. Replicate if symptomatic.',
            },
            {
              id: 'hypoK-alkalosis',
              label: 'Metabolic Alkalosis',
              clinical: 'K⁺ shifts into cells to exchange for H⁺',
              treatment: 'Treat underlying alkalosis (volume repletion, KCl)',
            },
          ],
        },
      ],
    },
    {
      id: 'hypoK-mag-check',
      label: '⚠️ ALWAYS Check Magnesium',
      description: 'Refractory hypokalemia',
      clinical: 'Hypomagnesemia impairs K⁺ reabsorption. Hypokalemia won\'t correct until Mg²⁺ is repleted.',
      treatment: 'Magnesium sulfate 2-4g IV or magnesium oxide 400-800mg PO',
    },
  ],
}

export default function Algorithms() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'hypoNa' | 'hyperK' | 'hypoK'>('hypoNa')

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const renderNode = (node: AlgorithmNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const indent = level * 24

    return (
      <div key={node.id} style={{ marginLeft: `${indent}px` }} className="mb-2">
        <div
          className={`border rounded-lg p-3 cursor-pointer transition-all ${
            isExpanded ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-accent'
          }`}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className="flex items-start gap-2">
            {hasChildren && (
              <div className="flex-shrink-0 mt-1">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-primary" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            )}
            {!hasChildren && <div className="w-4" />}
            <div className="flex-1">
              <p className="font-semibold">{node.label}</p>
              {node.description && (
                <p className="text-sm text-muted-foreground mt-1">{node.description}</p>
              )}
              {isExpanded && node.clinical && (
                <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                  <p className="text-xs font-semibold mb-1">Clinical:</p>
                  <p className="text-sm">{node.clinical}</p>
                </div>
              )}
              {isExpanded && node.treatment && (
                <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded">
                  <p className="text-xs font-semibold mb-1">Treatment:</p>
                  <p className="text-sm">{node.treatment}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="mt-2">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const getAlgorithm = () => {
    switch (selectedAlgorithm) {
      case 'hypoNa':
        return HYPONATREMIA_ALGORITHM
      case 'hyperK':
        return HYPERKALEMIA_ALGORITHM
      case 'hypoK':
        return HYPOKALEMIA_ALGORITHM
    }
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
        <h1 className="text-4xl font-bold mb-4">Diagnostic Algorithms</h1>
        <p className="text-xl text-muted-foreground">
          Interactive clinical decision trees for electrolyte disorders
        </p>
      </div>

      {/* Algorithm Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Algorithm</CardTitle>
          <CardDescription>Click on nodes to expand and see clinical details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant={selectedAlgorithm === 'hypoNa' ? 'default' : 'outline'}
              onClick={() => setSelectedAlgorithm('hypoNa')}
              className="h-auto py-4"
            >
              <div>
                <p className="font-bold">Hyponatremia</p>
                <p className="text-xs">Na⁺ {"<"} 135 mmol/L</p>
              </div>
            </Button>
            <Button
              variant={selectedAlgorithm === 'hyperK' ? 'default' : 'outline'}
              onClick={() => setSelectedAlgorithm('hyperK')}
              className="h-auto py-4"
            >
              <div>
                <p className="font-bold">Hyperkalemia</p>
                <p className="text-xs">K⁺ {">"} 5.0 mmol/L</p>
              </div>
            </Button>
            <Button
              variant={selectedAlgorithm === 'hypoK' ? 'default' : 'outline'}
              onClick={() => setSelectedAlgorithm('hypoK')}
              className="h-auto py-4"
            >
              <div>
                <p className="font-bold">Hypokalemia</p>
                <p className="text-xs">K⁺ {"<"} 3.5 mmol/L</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Algorithm Tree */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedAlgorithm === 'hypoNa' && 'Hyponatremia Diagnostic Algorithm'}
            {selectedAlgorithm === 'hyperK' && 'Hyperkalemia Diagnostic Algorithm'}
            {selectedAlgorithm === 'hypoK' && 'Hypokalemia Diagnostic Algorithm'}
          </CardTitle>
          <CardDescription>
            Click on any node to expand and see clinical features and treatment recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderNode(getAlgorithm())}
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card className="mt-8 bg-primary/5">
        <CardHeader>
          <CardTitle>Using These Algorithms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>1. Start at the top:</strong> Each algorithm begins with the abnormal lab value and
            branches based on clinical findings.
          </p>
          <p>
            <strong>2. Gather key data:</strong> Before using the algorithm, have ready: volume status,
            vital signs, urine electrolytes, serum osmolality, ECG (for K⁺ disorders).
          </p>
          <p>
            <strong>3. Follow the branches:</strong> Click to expand nodes and navigate through the
            decision tree based on your patient's findings.
          </p>
          <p>
            <strong>4. Cross-check interactions:</strong> Remember that electrolytes don't exist in
            isolation. Always check Mg²⁺ with K⁺ disorders, consider acid-base status, and review
            medications.
          </p>
          <p>
            <strong>5. Verify with experts:</strong> These algorithms are educational tools. For complex
            cases, consult nephrology or critical care.
          </p>
        </CardContent>
      </Card>

      {/* References */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <ul className="list-disc list-inside space-y-1">
            <li>Verbalis JG, et al. Diagnosis, Evaluation, and Treatment of Hyponatremia: Expert Panel Recommendations. Am J Med. 2013;126(10 Suppl 1):S1-42</li>
            <li>Sterns RH. Disorders of Plasma Sodium - Causes, Consequences, and Correction. N Engl J Med. 2015;372:55-65</li>
            <li>Palmer BF, Clegg DJ. Diagnosis and Treatment of Hyperkalemia. Cleve Clin J Med. 2017;84:934-942</li>
            <li>Gennari FJ. Hypokalemia. N Engl J Med. 1998;339:451-458</li>
            <li>Mount DB. Fluid and Electrolyte Disturbances. In: Harrison's Principles of Internal Medicine, 21st Edition</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
