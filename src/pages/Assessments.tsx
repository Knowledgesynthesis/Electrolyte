import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  ClipboardCheck,
  Brain,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  Trophy,
  BookOpen
} from 'lucide-react'

// Question types
interface Question {
  id: number
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  rationale: string
  reference: string
  category: 'Physiology' | 'Diagnosis' | 'Treatment' | 'ECG' | 'Calculations'
  difficulty: 'Medical Student' | 'Resident' | 'Fellow'
  electrolyte: 'Sodium' | 'Potassium' | 'Calcium' | 'Magnesium' | 'Mixed'
}

// Quiz questions database
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "A 72-year-old woman with SIADH has a sodium of 118 mEq/L. She is asymptomatic. What is the maximum safe correction rate in the first 24 hours to prevent osmotic demyelination syndrome?",
    options: {
      A: "4-6 mEq/L per 24 hours",
      B: "8-10 mEq/L per 24 hours",
      C: "12-15 mEq/L per 24 hours",
      D: "16-20 mEq/L per 24 hours"
    },
    correctAnswer: 'B',
    rationale: "The maximum safe correction rate for chronic hyponatremia is 8-10 mEq/L in the first 24 hours (or 4-6 mEq/L in the first 6 hours). Exceeding this rate significantly increases the risk of osmotic demyelination syndrome (ODS), formerly known as central pontine myelinolysis. High-risk patients include those with chronic hyponatremia, malnutrition, alcoholism, and hypokalemia.",
    reference: "Sterns RH et al. N Engl J Med. 2018;378:1460-1469",
    category: 'Treatment',
    difficulty: 'Resident',
    electrolyte: 'Sodium'
  },
  {
    id: 2,
    question: "A 45-year-old man presents with muscle weakness and peaked T waves on ECG. His potassium is 7.2 mEq/L. What is the FIRST-LINE treatment to prevent cardiac arrhythmias?",
    options: {
      A: "Insulin + glucose",
      B: "Sodium bicarbonate",
      C: "Calcium gluconate 10% IV",
      D: "Hemodialysis"
    },
    correctAnswer: 'C',
    rationale: "Calcium gluconate (or calcium chloride) is the FIRST-LINE treatment for severe hyperkalemia with ECG changes. It works within minutes to stabilize cardiac membranes and prevent fatal arrhythmias. It does NOT lower potassium levels but protects the heart. After calcium administration, treatments to shift K+ intracellularly (insulin/glucose, albuterol) and remove K+ from the body (diuretics, dialysis) should follow.",
    reference: "Rossignol P et al. Int J Cardiol. 2015;195:106-108",
    category: 'Treatment',
    difficulty: 'Medical Student',
    electrolyte: 'Potassium'
  },
  {
    id: 3,
    question: "A 55-year-old with CHF on furosemide has persistent hypokalemia (K+ 3.0 mEq/L) despite aggressive potassium supplementation. Which additional electrolyte should be checked and repleted?",
    options: {
      A: "Calcium",
      B: "Phosphorus",
      C: "Magnesium",
      D: "Chloride"
    },
    correctAnswer: 'C',
    rationale: "Magnesium deficiency causes refractory hypokalemia. Mg2+ is required for proper function of Na-K-ATPase pumps and also inhibits ROMK channels in the distal tubule. Without adequate magnesium, the kidneys continue to waste potassium despite supplementation. Always check and correct magnesium in patients with persistent hypokalemia. The mnemonic: 'You can't replace K without Mg.'",
    reference: "Huang CL, Kuo E. Kidney Int. 2007;72:526-536",
    category: 'Physiology',
    difficulty: 'Resident',
    electrolyte: 'Mixed'
  },
  {
    id: 4,
    question: "A patient with albumin of 2.0 g/dL has a total calcium of 7.5 mg/dL. What is the corrected calcium?",
    options: {
      A: "7.5 mg/dL",
      B: "8.3 mg/dL",
      C: "9.1 mg/dL",
      D: "9.9 mg/dL"
    },
    correctAnswer: 'C',
    rationale: "Corrected Ca = measured Ca + 0.8 × (4.0 - albumin). In this case: 7.5 + 0.8 × (4.0 - 2.0) = 7.5 + 0.8 × 2.0 = 7.5 + 1.6 = 9.1 mg/dL. Since ~40% of calcium is bound to albumin, hypoalbuminemia causes falsely low total calcium measurements. The corrected calcium formula estimates the physiologically active (ionized) calcium level. However, ionized calcium measurement is the gold standard when available.",
    reference: "Dickerson RN et al. JPEN J Parenter Enteral Nutr. 2007;31:235-238",
    category: 'Calculations',
    difficulty: 'Medical Student',
    electrolyte: 'Calcium'
  },
  {
    id: 5,
    question: "Which set of criteria is REQUIRED for diagnosing SIADH?",
    options: {
      A: "Hyponatremia + high ADH levels + normal renal function",
      B: "Hyponatremia + urine osmolality >100 mOsm/kg + euvolemia + normal thyroid/adrenal function",
      C: "Hyponatremia + edema + low urine sodium",
      D: "Hyponatremia + high serum osmolality + oliguria"
    },
    correctAnswer: 'B',
    rationale: "SIADH diagnostic criteria include: (1) hypotonic hyponatremia (serum osmolality <275 mOsm/kg), (2) inappropriately concentrated urine (urine osmolality >100 mOsm/kg, usually >300), (3) clinical euvolemia (no edema, dehydration), (4) urine sodium >40 mEq/L (on normal salt intake), (5) normal thyroid and adrenal function, and (6) no recent diuretic use. ADH levels are not routinely measured as the diagnosis is clinical.",
    reference: "Verbalis JG et al. Am J Med. 2013;126:S1-S42",
    category: 'Diagnosis',
    difficulty: 'Resident',
    electrolyte: 'Sodium'
  },
  {
    id: 6,
    question: "A 68-year-old woman on hydrochlorothiazide develops polymorphic ventricular tachycardia with QT prolongation. After defibrillation, what is the treatment of choice?",
    options: {
      A: "Amiodarone IV",
      B: "Lidocaine IV",
      C: "Magnesium sulfate IV",
      D: "Potassium chloride IV"
    },
    correctAnswer: 'C',
    rationale: "This patient has torsades de pointes (polymorphic VT with QT prolongation), commonly caused by thiazide-induced hypokalemia and hypomagnesemia. Magnesium sulfate 2g IV over 15 minutes is the treatment of choice for torsades, even if serum Mg2+ is normal. It stabilizes cardiac membranes and suppresses early afterdepolarizations. After Mg2+, correct K+ (goal >4.5 mEq/L), discontinue QT-prolonging drugs, and consider temporary pacing if refractory.",
    reference: "Tzivoni D et al. Circulation. 1988;77:392-397",
    category: 'Treatment',
    difficulty: 'Resident',
    electrolyte: 'Magnesium'
  },
  {
    id: 7,
    question: "A diabetic patient with chronic kidney disease presents with hyperkalemia (K+ 5.8 mEq/L) and a non-anion gap metabolic acidosis. Urine pH is 5.8. What is the most likely diagnosis?",
    options: {
      A: "Type 1 (distal) RTA",
      B: "Type 2 (proximal) RTA",
      C: "Type 4 RTA",
      D: "Diabetic ketoacidosis"
    },
    correctAnswer: 'C',
    rationale: "Type 4 RTA (hyporeninemic hypoaldosteronism) presents with hyperkalemia + non-anion gap metabolic acidosis. It's common in diabetic nephropathy and CKD. The hyperkalemia suppresses ammonia production, limiting acid excretion. Urine pH can be <5.5 (distinguishing it from Type 1 RTA, which has urine pH >5.5). Type 2 RTA causes hypokalemia. Type 4 RTA is treated with fludrocortisone, dietary K+ restriction, and sometimes loop diuretics or sodium bicarbonate.",
    reference: "DuBose TD Jr. N Engl J Med. 2019;381:1865-1875",
    category: 'Diagnosis',
    difficulty: 'Fellow',
    electrolyte: 'Potassium'
  },
  {
    id: 8,
    question: "A marathon runner presents with confusion and a seizure after drinking excessive water. Serum Na+ is 122 mEq/L. What is the most appropriate initial management?",
    options: {
      A: "Fluid restriction alone",
      B: "3% hypertonic saline 100 mL IV bolus",
      C: "Normal saline 1L IV bolus",
      D: "Furosemide 40 mg IV"
    },
    correctAnswer: 'B',
    rationale: "This is acute, symptomatic hyponatremia (exercise-associated hyponatremia) requiring immediate treatment to prevent cerebral herniation. Give 3% hypertonic saline 100-150 mL IV bolus over 10 minutes, repeat as needed until symptoms resolve. The goal is to raise Na+ by 4-6 mEq/L acutely to reverse cerebral edema. For acute hyponatremia (<48 hours), faster correction is safe because the brain hasn't adapted. After stabilization, slower correction can proceed.",
    reference: "Hew-Butler T et al. Clin J Sport Med. 2015;25:303-320",
    category: 'Treatment',
    difficulty: 'Resident',
    electrolyte: 'Sodium'
  },
  {
    id: 9,
    question: "Which ECG finding is the EARLIEST sign of hyperkalemia?",
    options: {
      A: "Widened QRS complex",
      B: "Peaked (tall, narrow) T waves",
      C: "Prolonged PR interval",
      D: "Loss of P waves"
    },
    correctAnswer: 'B',
    rationale: "Peaked T waves (tall, narrow, symmetric) are the earliest ECG manifestation of hyperkalemia, typically appearing when K+ >5.5-6.5 mEq/L. As K+ rises further, ECG changes progress: prolonged PR interval → loss of P waves → widened QRS → sine wave pattern → ventricular fibrillation/asystole. However, ECG changes don't always correlate with K+ levels, and some patients develop arrhythmias without warning signs. Any ECG changes warrant immediate treatment.",
    reference: "Diercks DB et al. J Emerg Med. 2004;27:163-169",
    category: 'ECG',
    difficulty: 'Medical Student',
    electrolyte: 'Potassium'
  },
  {
    id: 10,
    question: "A patient with hyponatremia (Na+ 128 mEq/L) has the following labs: serum osmolality 262 mOsm/kg, urine osmolality 580 mOsm/kg, urine Na+ 65 mEq/L, and trace pedal edema. What is the most likely diagnosis?",
    options: {
      A: "SIADH",
      B: "Heart failure",
      C: "Cirrhosis",
      D: "Hypothyroidism"
    },
    correctAnswer: 'B',
    rationale: "This patient has hypovolemic hyponatremia with high urine osmolality and high urine sodium, but with edema present. The combination of hypotonic hyponatremia + inappropriately concentrated urine + elevated urine Na+ + edema suggests heart failure (or cirrhosis/nephrotic syndrome). In HF, effective arterial volume is decreased despite total volume overload, triggering ADH release. The high urine Na+ distinguishes this from hypovolemia (where urine Na+ <20). SIADH requires euvolemia.",
    reference: "Ellison DH, Berl T. N Engl J Med. 2007;356:2064-2072",
    category: 'Diagnosis',
    difficulty: 'Fellow',
    electrolyte: 'Sodium'
  },
  {
    id: 11,
    question: "A patient on chronic lithium therapy develops polyuria and hypernatremia. Which type of diabetes insipidus is most likely?",
    options: {
      A: "Central (neurogenic) DI",
      B: "Nephrogenic DI",
      C: "Dipsogenic DI",
      D: "Gestational DI"
    },
    correctAnswer: 'B',
    rationale: "Lithium causes nephrogenic diabetes insipidus (NDI) by impairing the kidney's response to ADH in the collecting duct. It downregulates aquaporin-2 channels and disrupts the countercurrent mechanism. Patients develop polyuria, polydipsia, and hypernatremia. Treatment includes discontinuing lithium if possible, amiloride (protects against lithium entry into principal cells), thiazide diuretics (paradoxically reduce urine output in NDI), and NSAIDs. Desmopressin (DDAVP) is ineffective because the kidneys can't respond to ADH.",
    reference: "Liamis G et al. Eur J Endocrinol. 2008;158:451-461",
    category: 'Diagnosis',
    difficulty: 'Resident',
    electrolyte: 'Sodium'
  },
  {
    id: 12,
    question: "Which finding on ECG would you expect in severe hypocalcemia?",
    options: {
      A: "Shortened QT interval",
      B: "Prolonged QT interval",
      C: "Peaked T waves",
      D: "ST segment elevation"
    },
    correctAnswer: 'B',
    rationale: "Hypocalcemia prolongs the QT interval by lengthening the ST segment (plateau phase of the action potential). This increases the risk of torsades de pointes. Clinical manifestations include paresthesias, Chvostek sign (facial twitching), Trousseau sign (carpal spasm with BP cuff), tetany, seizures, and laryngospasm. Conversely, hypercalcemia shortens the QT interval. Both conditions can cause life-threatening arrhythmias.",
    reference: "Zivin JR et al. Cardiol Rev. 2001;9:69-76",
    category: 'ECG',
    difficulty: 'Medical Student',
    electrolyte: 'Calcium'
  },
  {
    id: 13,
    question: "A 28-year-old woman post-thyroidectomy develops perioral numbness and hand spasms. Calcium is 6.8 mg/dL, phosphorus is 5.2 mg/dL. What is the most likely cause?",
    options: {
      A: "Vitamin D deficiency",
      B: "Hypoparathyroidism",
      C: "Pseudohypoparathyroidism",
      D: "Hungry bone syndrome"
    },
    correctAnswer: 'B',
    rationale: "Hypoparathyroidism after thyroid or parathyroid surgery is common due to inadvertent removal or damage to parathyroid glands. It presents with hypocalcemia + hyperphosphatemia (PTH normally increases Ca2+ and decreases PO4). Symptoms include neuromuscular irritability (tetany, paresthesias, Chvostek/Trousseau signs), QT prolongation, and seizures. Treat acutely with IV calcium gluconate, then oral calcium and active vitamin D (calcitriol). Check Mg2+ as hypomagnesemia impairs PTH secretion.",
    reference: "Shoback D. N Engl J Med. 2008;359:391-403",
    category: 'Diagnosis',
    difficulty: 'Resident',
    electrolyte: 'Calcium'
  },
  {
    id: 14,
    question: "Which medication combination is most likely to cause hyperkalemia?",
    options: {
      A: "Furosemide + spironolactone",
      B: "Lisinopril + spironolactone",
      C: "Hydrochlorothiazide + amlodipine",
      D: "Metoprolol + furosemide"
    },
    correctAnswer: 'B',
    rationale: "ACE inhibitors (lisinopril) + potassium-sparing diuretics (spironolactone) is a high-risk combination for hyperkalemia. ACEIs decrease aldosterone by reducing angiotensin II, while spironolactone directly blocks aldosterone receptors. Both reduce K+ excretion in the collecting duct. This combination is used in heart failure but requires close K+ monitoring. Other high-risk combinations include ACEIs/ARBs + NSAIDs, ACEIs + trimethoprim, and any K+-sparing agent in CKD.",
    reference: "Juurlink DN et al. BMJ. 2004;328:288-289",
    category: 'Treatment',
    difficulty: 'Resident',
    electrolyte: 'Potassium'
  },
  {
    id: 15,
    question: "A patient receiving massive blood transfusions develops tetany and prolonged QT. Which electrolyte abnormality is most likely?",
    options: {
      A: "Hypokalemia",
      B: "Hypocalcemia",
      C: "Hypomagnesemia",
      D: "Hyperphosphatemia"
    },
    correctAnswer: 'B',
    rationale: "Massive transfusion can cause hypocalcemia because citrate (used as an anticoagulant in blood products) binds calcium. Each unit of packed RBCs or FFP contains ~3g of citrate. In patients receiving multiple units rapidly, the liver can't metabolize citrate fast enough, leading to citrate toxicity and hypocalcemia. Symptoms include tetany, paresthesias, hypotension, and prolonged QT. Treat with IV calcium chloride or calcium gluconate during transfusions.",
    reference: "Dhawan A, Cheema PS. J Anaesthesiol Clin Pharmacol. 2017;33:188-193",
    category: 'Diagnosis',
    difficulty: 'Fellow',
    electrolyte: 'Calcium'
  },
  {
    id: 16,
    question: "A patient with chronic diarrhea has hypokalemia and metabolic acidosis. What is the mechanism?",
    options: {
      A: "Loss of K+ and HCO3- in stool",
      B: "Increased aldosterone secretion",
      C: "Renal tubular acidosis",
      D: "Lactic acidosis from dehydration"
    },
    correctAnswer: 'A',
    rationale: "Diarrhea causes GI losses of both potassium and bicarbonate, resulting in hypokalemia + non-anion gap metabolic acidosis. Colonic secretions are rich in K+ and HCO3-. The volume depletion also triggers secondary hyperaldosteronism, worsening K+ losses. The acidosis is typically hyperchloremic (normal anion gap) because Cl- is retained by the kidneys to maintain electroneutrality. Urine K+ may be paradoxically low (<20 mEq/L) despite total body K+ depletion due to hypovolemia.",
    reference: "Gennari FJ. Kidney Int. 1998;53:2069-2078",
    category: 'Physiology',
    difficulty: 'Resident',
    electrolyte: 'Potassium'
  },
  {
    id: 17,
    question: "Which of the following is an appropriate indication for emergency hemodialysis in hyperkalemia?",
    options: {
      A: "K+ 5.8 mEq/L with normal ECG",
      B: "K+ 6.5 mEq/L refractory to medical therapy with worsening ECG changes",
      C: "K+ 5.2 mEq/L in a CKD patient",
      D: "K+ 6.0 mEq/L with peaked T waves responding to calcium and insulin"
    },
    correctAnswer: 'B',
    rationale: "Emergency hemodialysis is indicated for: (1) severe hyperkalemia (K+ >6.5 mEq/L) with ECG changes refractory to medical therapy, (2) renal failure preventing adequate K+ excretion, (3) massive K+ loads (tumor lysis, rhabdomyolysis), or (4) life-threatening arrhythmias. Dialysis rapidly removes K+ (can lower by 1-2 mEq/L per hour) and is definitive therapy. Medical management (Ca2+, insulin/glucose, albuterol, sodium bicarbonate) temporizes but doesn't remove K+ from the body (except for diuretics/kayexalate, which are slower).",
    reference: "Allon M. Semin Dial. 2013;26:744-750",
    category: 'Treatment',
    difficulty: 'Fellow',
    electrolyte: 'Potassium'
  },
  {
    id: 18,
    question: "A chronic alcoholic presents with weakness, tremors, and ventricular arrhythmias. Mg2+ is 1.2 mg/dL (normal 1.7-2.2). What is the preferred route of magnesium repletion for this patient?",
    options: {
      A: "Oral magnesium oxide",
      B: "Intramuscular magnesium sulfate",
      C: "Intravenous magnesium sulfate",
      D: "No repletion needed; it will self-correct"
    },
    correctAnswer: 'C',
    rationale: "Severe symptomatic hypomagnesemia (Mg2+ <1.2 mg/dL) with arrhythmias requires IV magnesium sulfate for rapid repletion. Give 1-2g over 15 minutes for arrhythmias, then 4-6g over 24 hours. Oral Mg has poor bioavailability (~30%) and causes diarrhea at high doses. IM is painful and unnecessary when IV access is available. Alcoholics are high-risk due to poor intake, GI losses, and renal wasting. Hypomagnesemia causes refractory hypokalemia, hypocalcemia, and increases arrhythmia risk.",
    reference: "Vormann J. Mol Aspects Med. 2003;24:27-37",
    category: 'Treatment',
    difficulty: 'Resident',
    electrolyte: 'Magnesium'
  },
  {
    id: 19,
    question: "A 65-year-old with metastatic cancer has confusion, constipation, and polyuria. Calcium is 14.2 mg/dL. What is the FIRST-LINE treatment?",
    options: {
      A: "Calcitonin",
      B: "IV bisphosphonates (zoledronic acid)",
      C: "Aggressive IV normal saline hydration",
      D: "Furosemide"
    },
    correctAnswer: 'C',
    rationale: "Severe hypercalcemia (Ca2+ >14 mg/dL) requires immediate IV hydration with normal saline (200-300 mL/hr initially). This restores volume, increases GFR, and promotes calciuresis. After adequate hydration, add calcitonin (rapid onset 4-6 hours, but tachyphylaxis occurs) and bisphosphonates like zoledronic acid (slow onset 2-4 days, but sustained effect). Loop diuretics (furosemide) are ONLY used after volume repletion and are no longer routine. Treat underlying malignancy for definitive management.",
    reference: "Shane E, Berenson JR. J Clin Endocrinol Metab. 2015;100:2146-2158",
    category: 'Treatment',
    difficulty: 'Resident',
    electrolyte: 'Calcium'
  },
  {
    id: 20,
    question: "A volume-depleted patient has Na+ 132 mEq/L, K+ 2.8 mEq/L, and metabolic alkalosis. Urine chloride is 8 mEq/L. What is the most appropriate treatment?",
    options: {
      A: "Normal saline IV + potassium chloride",
      B: "Spironolactone",
      C: "Acetazolamide",
      D: "Sodium bicarbonate"
    },
    correctAnswer: 'A',
    rationale: "This is chloride-responsive metabolic alkalosis (urine Cl- <20 mEq/L indicates volume depletion). Common causes include vomiting, NG suction, and diuretic use. Volume depletion triggers aldosterone secretion, causing Na+ retention and K+/H+ losses, perpetuating alkalosis. Treatment is IV normal saline (provides Cl-) + KCl repletion. The kidneys need Cl- to excrete HCO3-. Once volume-replete, urine Cl- will increase >40 mEq/L as the kidneys correct the alkalosis. Saline-resistant alkalosis (urine Cl- >20) suggests primary hyperaldosteronism.",
    reference: "Galla JH. J Am Soc Nephrol. 2000;11:369-375",
    category: 'Treatment',
    difficulty: 'Fellow',
    electrolyte: 'Mixed'
  },
  {
    id: 21,
    question: "Which medication is most likely to cause hyponatremia in elderly patients?",
    options: {
      A: "Metformin",
      B: "Hydrochlorothiazide",
      C: "Furosemide",
      D: "Amlodipine"
    },
    correctAnswer: 'B',
    rationale: "Thiazide diuretics (especially hydrochlorothiazide) are the most common drug cause of hyponatremia in the elderly. They impair urinary dilution by blocking the Na-Cl cotransporter in the distal tubule while leaving ADH action in the collecting duct intact. Risk factors include female sex, elderly age, low BMI, and low baseline Na+. Hyponatremia typically occurs within the first few weeks of therapy. Loop diuretics (furosemide) are less likely to cause hyponatremia because they impair both dilution and concentration.",
    reference: "Liamis G et al. Am J Kidney Dis. 2008;52:144-153",
    category: 'Diagnosis',
    difficulty: 'Medical Student',
    electrolyte: 'Sodium'
  },
  {
    id: 22,
    question: "A patient with tumor lysis syndrome has K+ 7.8 mEq/L, phosphorus 8.2 mg/dL, calcium 6.5 mg/dL. After treating hyperkalemia, should you give IV calcium?",
    options: {
      A: "Yes, give calcium immediately for symptomatic hypocalcemia",
      B: "No, calcium can precipitate with phosphate causing tissue calcification",
      C: "Yes, but only after phosphate is normalized",
      D: "No, hypocalcemia in tumor lysis syndrome doesn't require treatment"
    },
    correctAnswer: 'C',
    rationale: "In tumor lysis syndrome, avoid IV calcium if phosphate is severely elevated (Ca × PO4 product >55) due to risk of metastatic calcification. The hyperphosphatemia causes hypocalcemia by calcium-phosphate precipitation. First, lower phosphate with aggressive hydration, phosphate binders, and/or dialysis. Give calcium only if: (1) patient is symptomatic (tetany, seizures) despite hyperphosphatemia, or (2) phosphate is controlled. The hypocalcemia often self-corrects as phosphate normalizes.",
    reference: "Wilson FP, Berns JS. Adv Chronic Kidney Dis. 2014;21:18-26",
    category: 'Treatment',
    difficulty: 'Fellow',
    electrolyte: 'Mixed'
  },
  {
    id: 23,
    question: "A patient on chronic loop diuretics develops severe hypokalemia (K+ 2.1 mEq/L). After giving 40 mEq KCl IV, repeat K+ is 2.4 mEq/L. What explains this poor response?",
    options: {
      A: "Ongoing losses exceed repletion rate",
      B: "Concomitant hypomagnesemia preventing K+ retention",
      C: "Metabolic alkalosis shifting K+ intracellularly",
      D: "All of the above"
    },
    correctAnswer: 'D',
    rationale: "All three factors contribute to refractory hypokalemia in this setting. Loop diuretics cause ongoing renal K+ wasting, metabolic alkalosis shifts K+ into cells, and Mg2+ depletion prevents adequate K+ repletion (Mg2+ is required for Na-K-ATPase function and inhibits ROMK). Management: (1) Check and replete Mg2+, (2) aggressive K+ repletion (20-40 mEq/hr with close monitoring), (3) reduce diuretic dose or add K+-sparing agent, (4) correct alkalosis. Total body K+ deficit may be 200-400 mEq.",
    reference: "Mount DB. N Engl J Med. 2020;383:60-72",
    category: 'Physiology',
    difficulty: 'Fellow',
    electrolyte: 'Potassium'
  },
  {
    id: 24,
    question: "Which clinical scenario represents pseudohyponatremia?",
    options: {
      A: "Na+ 118 mEq/L, glucose 600 mg/dL, measured serum osmolality 310 mOsm/kg",
      B: "Na+ 120 mEq/L, triglycerides 4500 mg/dL, measured serum osmolality 285 mOsm/kg",
      C: "Na+ 125 mEq/L, multiple myeloma with paraproteinemia, measured serum osmolality 260 mOsm/kg",
      D: "Na+ 122 mEq/L, recent TURP surgery, measured serum osmolality 250 mOsm/kg"
    },
    correctAnswer: 'B',
    rationale: "Pseudohyponatremia occurs when severe hypertriglyceridemia or hyperproteinemia displaces water volume in the serum sample, causing falsely low Na+ by flame photometry (older analyzers). Measured serum osmolality is NORMAL (~285). Modern ion-selective electrodes largely eliminate this artifact. Options A is hyperosmolar hyponatremia (high glucose), C is hypotonic hyponatremia with true low osmolality, and D is TURP syndrome (true hyponatremia from glycine absorption). Only B shows normal osmolality with low Na+ = pseudohyponatremia.",
    reference: "Hillier TA et al. Am J Med. 1999;106:399-403",
    category: 'Diagnosis',
    difficulty: 'Fellow',
    electrolyte: 'Sodium'
  }
]

export default function Assessments() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Array<{questionId: number, answer: string, correct: boolean}>>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [filterElectrolyte, setFilterElectrolyte] = useState<string>('All')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All')
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (quizStarted && !quizCompleted && timerEnabled) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [quizStarted, quizCompleted, timerEnabled])

  // Filter questions based on selected criteria
  const filteredQuestions = QUESTIONS.filter(q => {
    const electrolyteMatch = filterElectrolyte === 'All' || q.electrolyte === filterElectrolyte
    const difficultyMatch = filterDifficulty === 'All' || q.difficulty === filterDifficulty
    return electrolyteMatch && difficultyMatch
  })

  const currentQuestion = filteredQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex) / filteredQuestions.length) * 100
  const score = userAnswers.filter(a => a.correct).length

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setQuizCompleted(false)
    setTimeElapsed(0)
  }

  const handleAnswerSelect = (answer: string) => {
    if (!showFeedback) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer
      setShowFeedback(true)
      setUserAnswers([...userAnswers, {
        questionId: currentQuestion.id,
        answer: selectedAnswer,
        correct: isCorrect
      }])
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setQuizStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setUserAnswers([])
    setQuizCompleted(false)
    setTimeElapsed(0)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Medical Student': return 'bg-green-500'
      case 'Resident': return 'bg-yellow-500'
      case 'Fellow': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Physiology': return <Brain className="w-4 h-4" />
      case 'Diagnosis': return <Target className="w-4 h-4" />
      case 'Treatment': return <ClipboardCheck className="w-4 h-4" />
      case 'ECG': return <ClipboardCheck className="w-4 h-4" />
      case 'Calculations': return <Brain className="w-4 h-4" />
      default: return <ClipboardCheck className="w-4 h-4" />
    }
  }

  // Quiz Setup Screen
  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Knowledge Assessments</h1>
          <p className="text-xl text-muted-foreground">
            Test your knowledge with evidence-based questions and detailed rationales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">24 Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Clinical vignettes covering all major electrolytes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">3 Difficulty Levels</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Medical Student, Resident, and Fellow level questions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">Detailed Rationales</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Evidence-based explanations with references
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Customize Your Quiz</CardTitle>
            <CardDescription>Filter questions by electrolyte or difficulty level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Electrolyte</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Sodium', 'Potassium', 'Calcium', 'Magnesium', 'Mixed'].map(option => (
                  <Button
                    key={option}
                    variant={filterElectrolyte === option ? 'default' : 'outline'}
                    onClick={() => setFilterElectrolyte(option)}
                    size="sm"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Medical Student', 'Resident', 'Fellow'].map(option => (
                  <Button
                    key={option}
                    variant={filterDifficulty === option ? 'default' : 'outline'}
                    onClick={() => setFilterDifficulty(option)}
                    size="sm"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="timer"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="timer" className="text-sm font-medium">
                Enable Timer (optional)
              </label>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} selected
              </p>
              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="w-full md:w-auto"
                disabled={filteredQuestions.length === 0}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz Completed Screen
  if (quizCompleted) {
    const percentage = Math.round((score / filteredQuestions.length) * 100)
    const incorrectAnswers = userAnswers.filter(a => !a.correct)

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-yellow-500" />
            </div>
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            <CardDescription className="text-lg">
              Here's how you performed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {percentage}%
              </div>
              <p className="text-xl text-muted-foreground">
                {score} out of {filteredQuestions.length} correct
              </p>
              {timerEnabled && (
                <p className="text-sm text-muted-foreground mt-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time: {formatTime(timeElapsed)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Performance</span>
                <span className="font-medium">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">
                  {filteredQuestions.length - score}
                </div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
            </div>

            {incorrectAnswers.length > 0 && (
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Review Incorrect Answers</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {incorrectAnswers.map((answer) => {
                    const question = QUESTIONS.find(q => q.id === answer.questionId)
                    if (!question) return null

                    return (
                      <Card key={answer.questionId} className="border-red-200 dark:border-red-900">
                        <CardHeader>
                          <div className="flex items-start gap-2">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                              <CardTitle className="text-base">{question.question}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Your answer: </span>
                            <span className="text-red-600">{answer.answer}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Correct answer: </span>
                            <span className="text-green-600">{question.correctAnswer}</span>
                          </div>
                          <div className="text-sm text-muted-foreground pt-2">
                            <span className="font-medium">Rationale: </span>
                            {question.rationale}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                New Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz Question Screen
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header with Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {filteredQuestions.length}
            </span>
            {timerEnabled && (
              <span className="text-sm font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(timeElapsed)}
              </span>
            )}
          </div>
          <span className="text-sm font-medium">
            Score: {score}/{currentQuestionIndex}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="flex items-center gap-1">
                {getCategoryIcon(currentQuestion.category)}
                {currentQuestion.category}
              </Badge>
              <Badge variant="outline">
                {currentQuestion.electrolyte}
              </Badge>
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Answer Options */}
          <div className="space-y-3">
            {Object.entries(currentQuestion.options).map(([key, value]) => {
              const isSelected = selectedAnswer === key
              const isCorrect = key === currentQuestion.correctAnswer
              const showCorrect = showFeedback && isCorrect
              const showIncorrect = showFeedback && isSelected && !isCorrect

              return (
                <button
                  key={key}
                  onClick={() => handleAnswerSelect(key)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50 dark:bg-red-950'
                      : isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                      showCorrect
                        ? 'border-green-600 bg-green-600 text-white'
                        : showIncorrect
                        ? 'border-red-600 bg-red-600 text-white'
                        : isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-400'
                    }`}>
                      {showCorrect ? <CheckCircle2 className="w-4 h-4" /> : showIncorrect ? <XCircle className="w-4 h-4" /> : key}
                    </div>
                    <span className="flex-1">{value}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'border-green-500 bg-green-50 dark:bg-green-950'
                : 'border-red-500 bg-red-50 dark:bg-red-950'
            }`}>
              <div className="flex items-start gap-3 mb-3">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </h4>
                  {selectedAnswer !== currentQuestion.correctAnswer && (
                    <p className="text-sm mb-2">
                      The correct answer is <strong>{currentQuestion.correctAnswer}</strong>
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-semibold mb-1">Rationale:</h5>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentQuestion.rationale}
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-1">Reference:</h5>
                  <p className="text-muted-foreground italic">
                    {currentQuestion.reference}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!showFeedback ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="flex-1"
                size="lg"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex-1"
                size="lg"
              >
                {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next Question' : 'View Results'}
              </Button>
            )}
            <Button
              onClick={handleRestart}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
