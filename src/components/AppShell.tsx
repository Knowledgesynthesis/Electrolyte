import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BookOpen, Brain, Calculator, GitBranch, Menu, Moon, Search, Stethoscope, Sun, X, FileText, LineChart, Library, Settings, BookA, Repeat } from 'lucide-react'
import { useSettings, resolvedTheme } from '@/stores/settings'
import { useProgress } from '@/stores/progress'
import { isDue } from '@/lib/srs'
import { cn } from '@/lib/utils'

const CommandPalette = lazy(() => import('./CommandPalette').then((m) => ({ default: m.CommandPalette })))

const PRIMARY = [
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/tools', label: 'Tools', icon: Calculator },
  { to: '/algorithms', label: 'Algorithms', icon: GitBranch },
  { to: '/cases', label: 'Cases', icon: Stethoscope },
  { to: '/practice', label: 'Practice', icon: Brain },
  { to: '/reference', label: 'Reference', icon: FileText },
]
const SECONDARY = [
  { to: '/review', label: 'Review queue', icon: Repeat },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/evidence', label: "Evidence & what's new", icon: Library },
  { to: '/glossary', label: 'Glossary', icon: BookA },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold tracking-tight" aria-label="Electrolyte Atlas home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-violet-600 text-sm text-white shadow-sm">Na⁺</span>
      <span className="whitespace-nowrap text-base sm:text-lg">Electrolyte Atlas</span>
    </Link>
  )
}

export function AppShell() {
  const { theme, setTheme } = useSettings()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = useLocation()
  const srs = useProgress((s) => s.srs)
  const due = Object.values(srs).filter((s) => isDue(s)).length
  const dark = resolvedTheme(theme) === 'dark'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    if (!loc.hash) window.scrollTo({ top: 0 })
  }, [loc.pathname, loc.hash])

  useEffect(() => {
    if (!loc.hash) return
    const id = decodeURIComponent(loc.hash.slice(1))
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    return () => clearTimeout(t)
  }, [loc.pathname, loc.hash])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Logo />
          <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
            {PRIMARY.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => cn('rounded-lg px-3 py-2 text-sm font-medium transition', isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <button type="button" onClick={() => setPaletteOpen(true)} className="flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground hover:text-foreground" aria-label="Search">
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden rounded border border-border px-1.5 text-[10px] md:inline">⌘K</kbd>
            </button>
            <Link to="/review" className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted" aria-label={`Review queue, ${due} due`}>
              <Repeat className="h-5 w-5" />
              {due > 0 && <span className="absolute right-1 top-1 min-w-4 rounded-full bg-danger px-1 text-center text-[10px] font-bold leading-4 text-white">{due > 99 ? '99+' : due}</span>}
            </Link>
            <button type="button" onClick={() => setTheme(dark ? 'light' : 'dark')} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button type="button" onClick={() => setMenuOpen((o) => !o)} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted" aria-label="Menu" aria-expanded={menuOpen}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-border bg-card">
            <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-1 p-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="All sections">
              {[...PRIMARY, ...SECONDARY].map((n) => (
                <NavLink key={n.to} to={n.to} className={({ isActive }) => cn('flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium', isActive ? 'bg-muted' : 'hover:bg-muted')}>
                  <n.icon className="h-4 w-4 text-muted-foreground" /> {n.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main id="main" className="flex-1 pb-20 lg:pb-0">
        <Suspense fallback={<div className="mx-auto max-w-5xl p-8"><div className="h-64 animate-pulse rounded-2xl bg-muted" /></div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="border-t border-border pb-20 lg:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Made by <strong className="text-foreground">Bashar Hasan MD</strong> · © {new Date().getFullYear()} Electrolyte Atlas
          </p>
          <p>For learning — confirm doses against your local protocol. Evidence reviewed November 2026.</p>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur lg:hidden" aria-label="Mobile">
        {PRIMARY.slice(0, 5).map((n) => (
          <NavLink key={n.to} to={n.to} className={({ isActive }) => cn('flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}>
            <n.icon className="h-5 w-5" />
            {n.label}
          </NavLink>
        ))}
      </nav>
      {paletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        </Suspense>
      )}
    </div>
  )
}
