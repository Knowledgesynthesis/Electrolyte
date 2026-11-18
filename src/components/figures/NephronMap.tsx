import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Seg {
  id: string
  name: string
  path: string
  color: string
  labelAt: [number, number]
  na: string
  transporters: string
  handles: string[]
  drug: string
  mimic: string
  pearl: string
}

const SEGS: Seg[] = [
  {
    id: 'pct',
    name: 'Proximal tubule',
    path: 'M84 70 C 110 40, 130 100, 150 70 S 190 40, 205 75',
    color: '#0ea5e9',
    labelAt: [120, 30],
    na: '~65%',
    transporters: 'NHE3, SGLT2, NaPi-IIa/IIc, carbonic anhydrase, URAT1',
    handles: ['~65% of Ca and water; 10–25% of Mg', '~80% of phosphate (PTH and FGF23 inhibit)', '~90% of filtered HCO₃', 'Glucose, amino acids, urate'],
    drug: 'SGLT2 inhibitors, acetazolamide',
    mimic: 'Fanconi syndrome (tenofovir, ifosfamide, myeloma) → proximal RTA, hypophosphatemia, glycosuria',
    pearl: 'Volume contraction increases proximal Na (and Ca, urate) reabsorption — the reason thiazides cause hypocalciuria and hyperuricemia.',
  },
  {
    id: 'tdl',
    name: 'Thin limbs',
    path: 'M205 75 L 205 300 Q 205 330, 225 330 Q 245 330, 245 300 L 245 240',
    color: '#94a3b8',
    labelAt: [160, 210],
    na: 'passive',
    transporters: 'AQP1 (descending, water-permeable); ascending thin limb water-impermeable',
    handles: ['Concentrates tubular fluid on the way down', 'Countercurrent multiplication with the TAL'],
    drug: '—',
    mimic: '—',
    pearl: 'Urea recycling into the inner medulla sustains concentrating ability — and invalidated the TTKG.',
  },
  {
    id: 'tal',
    name: 'Thick ascending limb',
    path: 'M245 240 L 245 95',
    color: '#8b5cf6',
    labelAt: [255, 175],
    na: '~25%',
    transporters: 'NKCC2 + ROMK (lumen-positive voltage), claudin-16/19, CaSR',
    handles: ['~25% of Ca and ~60% of Mg — paracellular, voltage-driven', 'Water-impermeable: dilutes urine, builds the medullary gradient'],
    drug: 'Loop diuretics (furosemide, bumetanide, torsemide)',
    mimic: 'Bartter syndrome: hypokalemia, alkalosis, hypercalciuria',
    pearl: 'Hypercalcemia activates the CaSR here → Ca and Mg wasting and AVP resistance (polyuria).',
  },
  {
    id: 'dct',
    name: 'Distal convoluted tubule',
    path: 'M245 95 C 260 50, 290 100, 310 65 S 340 50, 352 70',
    color: '#10b981',
    labelAt: [285, 30],
    na: '~5–8%',
    transporters: 'NCC (WNK/SPAK-regulated), TRPM6 (Mg, EGF-dependent), TRPV5 (Ca, PTH-regulated)',
    handles: ['Fine-tunes Ca (PTH) and Mg', 'Switches between Na retention and K excretion (aldosterone paradox)'],
    drug: 'Thiazides; EGFR antibodies block TRPM6; calcineurin inhibitors activate NCC',
    mimic: 'Gitelman syndrome: hypokalemia, hypomagnesemia, hypocalciuria. Gordon syndrome (PHA-II): NCC overactivity → hyperkalemic hypertension',
    pearl: 'Thiazides cause hyponatremia because they spare medullary concentration while impairing dilution.',
  },
  {
    id: 'cd',
    name: 'Collecting duct',
    path: 'M352 70 L 380 70 L 380 360',
    color: '#f59e0b',
    labelAt: [296, 270],
    na: '~2–3%',
    transporters: 'Principal cells: ENaC, ROMK/BK, AQP2 (V2/ADH). Intercalated cells: H⁺-ATPase, pendrin',
    handles: ['K secretion (aldosterone × distal flow)', 'Water reabsorption under ADH', 'Acid secretion (NH₄⁺ trapping)'],
    drug: 'Amiloride, triamterene, trimethoprim (ENaC); spironolactone, eplerenone, finerenone (MR); vaptans (V2)',
    mimic: 'Liddle (ENaC gain) → hypertension, hypokalemia; PHA-1 (loss) → hyperkalemia; distal RTA; AVP resistance (AVPR2, AQP2)',
    pearl: 'Lithium enters principal cells via ENaC and downregulates AQP2 — amiloride blocks its entry.',
  },
]

export default function NephronMap() {
  const [sel, setSel] = useState('tal')
  const s = SEGS.find((x) => x.id === sel)!
  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,22rem)_1fr]">
      <svg viewBox="0 0 440 380" className="h-auto w-full" role="group" aria-label="Interactive nephron diagram">
        <rect x="0" y="0" width="440" height="150" fill="var(--muted)" opacity="0.5" />
        <text x="10" y="142" fontSize="11" fill="var(--muted-fg)">
          Cortex
        </text>
        <text x="10" y="370" fontSize="11" fill="var(--muted-fg)">
          Medulla
        </text>
        <circle cx="62" cy="70" r="22" fill="none" stroke="#ef4444" strokeWidth="5" />
        <circle cx="62" cy="70" r="12" fill="#ef4444" opacity="0.35" />
        <text x="40" y="112" fontSize="11" fill="var(--muted-fg)">
          Glomerulus
        </text>
        {SEGS.map((seg) => (
          <g key={seg.id} onClick={() => setSel(seg.id)} className="cursor-pointer" role="button" tabIndex={0} aria-label={seg.name} aria-pressed={sel === seg.id} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(seg.id)}>
            <path d={seg.path} fill="none" stroke="transparent" strokeWidth={28} />
            <path d={seg.path} fill="none" stroke={seg.color} strokeWidth={sel === seg.id ? 16 : 10} strokeLinecap="round" strokeLinejoin="round" opacity={sel === seg.id ? 1 : 0.55} className="transition-all" />
            <text x={seg.labelAt[0]} y={seg.labelAt[1]} fontSize="12" fontWeight={sel === seg.id ? 700 : 500} fill="var(--fg)">
              {seg.name.split(' ').map((w, i) => (
                <tspan key={i} x={seg.labelAt[0]} dy={i ? 14 : 0}>
                  {w}
                </tspan>
              ))}
            </text>
          </g>
        ))}
        <path d="M380 360 L 380 372" stroke="#f59e0b" strokeWidth="6" markerEnd="" />
        <text x="350" y="378" fontSize="10" fill="var(--muted-fg)">
          to ureter
        </text>
      </svg>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {SEGS.map((seg) => (
            <button key={seg.id} type="button" onClick={() => setSel(seg.id)} className={cn('rounded-full px-3 py-1 text-xs font-medium transition', sel === seg.id ? 'text-white' : 'bg-muted text-muted-foreground hover:text-foreground')} style={sel === seg.id ? { background: seg.color } : undefined}>
              {seg.name}
            </button>
          ))}
        </div>
        <div>
          <h4 className="text-lg font-semibold">{s.name}</h4>
          <div className="text-sm text-muted-foreground">Filtered Na reabsorbed: {s.na}</div>
        </div>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="font-semibold">Transporters</dt>
            <dd className="text-muted-foreground">{s.transporters}</dd>
          </div>
          <div>
            <dt className="font-semibold">Also handles</dt>
            <dd>
              <ul className="list-disc pl-5 text-muted-foreground">
                {s.handles.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Drugs acting here</dt>
            <dd className="text-muted-foreground">{s.drug}</dd>
          </div>
          <div>
            <dt className="font-semibold">Genetic/disease mimic</dt>
            <dd className="text-muted-foreground">{s.mimic}</dd>
          </div>
        </dl>
        <p className="rounded-lg bg-pearl-bg p-3 text-sm">
          <span className="font-semibold text-pearl">Pearl: </span>
          {s.pearl}
        </p>
      </div>
    </div>
  )
}
