import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sodium from './pages/Sodium'
import Potassium from './pages/Potassium'
import Calculators from './pages/Calculators'
import Cases from './pages/Cases'
import Assessments from './pages/Assessments'
import Settings from './pages/Settings'
import SodiumCorrection from './pages/calculators/SodiumCorrection'
import { useTheme } from './stores/theme'

function App() {
  const { theme } = useTheme()

  // Initialize theme on mount
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Electrolyte Modules */}
          <Route path="sodium" element={<Sodium />} />
          <Route path="potassium" element={<Potassium />} />

          {/* Calculators */}
          <Route path="calculators" element={<Calculators />} />
          <Route path="calculators/sodium-correction" element={<SodiumCorrection />} />

          {/* Cases & Assessments */}
          <Route path="cases" element={<Cases />} />
          <Route path="assessments" element={<Assessments />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

          {/* 404 - Redirect to home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
