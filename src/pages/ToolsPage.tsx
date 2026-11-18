import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { MODULES } from '@/content/modules'
import { TOOLS } from '@/content/tools'
import { MODULE_STYLE } from '@/lib/moduleColors'
import { cn } from '@/lib/utils'
import { Card, PageHeader } from '@/components/ui'

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageHeader eyebrow="Interactive" title="Tools & calculators">
        Each tool shows its formula, assumptions and the trap it is designed to catch. Inputs are validated against plausible ranges; outputs are starting points to be checked against measured values.
      </PageHeader>
      {MODULES.filter((m) => TOOLS.some((t) => t.module === m.id)).map((m) => (
        <section key={m.id} className="mb-8">
          <h2 className={cn('mb-3 text-sm font-semibold uppercase tracking-wide', MODULE_STYLE[m.id].text)}>{m.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.filter((t) => t.module === m.id).map((t) => (
              <Link key={t.id} to={`/tools/${t.id}`} className="group">
                <Card className="h-full p-5 transition group-hover:border-primary group-hover:shadow-md">
                  <h3 className="flex items-center justify-between gap-2 font-semibold">
                    {t.title} <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
