import { useRef, useState } from 'react'
import { Download, Upload, Trash2 } from 'lucide-react'
import { useSettings } from '@/stores/settings'
import { useProgress } from '@/stores/progress'
import { Button, Card, PageHeader, Segmented } from '@/components/ui'

export default function SettingsPage() {
  const { theme, setTheme, units, setUnits } = useSettings()
  const progress = useProgress()
  const file = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')

  const exportData = () => {
    const { lessons, attempts, srs, cases, activeDays } = useProgress.getState()
    const blob = new Blob([JSON.stringify({ app: 'electrolyte-atlas', version: 2, exported: new Date().toISOString(), lessons, attempts, srs, cases, activeDays }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `electrolyte-atlas-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const importData = async (f: File) => {
    try {
      const ok = progress.importData(JSON.parse(await f.text()))
      setMsg(ok ? 'Progress imported.' : 'That file does not look like an Electrolyte Atlas export.')
    } catch {
      setMsg('Could not read that file.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader title="Settings" />
      <div className="space-y-4">
        <Card className="space-y-5 p-6">
          <Segmented label="Theme" value={theme} onChange={setTheme} options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }, { value: 'system', label: 'System' }]} />
          <div>
            <Segmented
              label="Units for calcium, magnesium, phosphate, glucose, urea, albumin"
              value={units}
              onChange={setUnits}
              options={[
                { value: 'conventional', label: 'Conventional (mg/dL)' },
                { value: 'SI', label: 'SI (mmol/L)' },
              ]}
            />
            <p className="mt-2 text-xs text-muted-foreground">Na, K, Cl and HCO₃ are identical in both systems (mmol/L = mEq/L). Tools switch their input units; lessons show both.</p>
          </div>
        </Card>
        <Card className="space-y-3 p-6">
          <h2 className="font-semibold">Your data</h2>
          <p className="text-sm text-muted-foreground">Progress is stored only in this browser (no account, nothing sent anywhere). Export it to move devices.</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={exportData}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="outline" onClick={() => file.current?.click()}>
              <Upload className="h-4 w-4" /> Import
            </Button>
            <input ref={file} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
            <Button
              variant="danger"
              onClick={() => {
                if (confirm('Erase all lessons, answers, reviews and case scores?')) {
                  progress.reset()
                  setMsg('Progress reset.')
                }
              }}
            >
              <Trash2 className="h-4 w-4" /> Reset progress
            </Button>
          </div>
          {msg && <p className="text-sm text-primary" role="status">{msg}</p>}
        </Card>
        <Card className="p-6 text-sm text-muted-foreground">
          <h2 className="mb-2 font-semibold text-foreground">Scope</h2>
          Adult internal medicine and critical care unless stated. Doses and thresholds reflect the cited guidelines as of November 2026; local protocols and product labels take precedence. Works offline once loaded — install it from your browser menu.
        </Card>
      </div>
    </div>
  )
}
