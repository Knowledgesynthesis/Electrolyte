import { Link, Outlet } from 'react-router-dom'
import { Moon, Sun, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from '@/stores/theme'

export default function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Electrolyte Atlas
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            <Link
              to="/calculators"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Calculators
            </Link>
            <Link
              to="/cases"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Cases
            </Link>
            <Link
              to="/assessments"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Assessments
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Link to="/settings">
              <Button variant="ghost" size="icon" aria-label="Settings">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Built for medical education. Evidence-based. Clinically rigorous.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 Electrolyte Atlas. Educational use only.
          </p>
        </div>
      </footer>
    </div>
  )
}
