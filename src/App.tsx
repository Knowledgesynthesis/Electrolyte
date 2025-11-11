import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sodium from './pages/Sodium'
import Potassium from './pages/Potassium'
import Calcium from './pages/Calcium'
import Magnesium from './pages/Magnesium'
import Calculators from './pages/Calculators'
import Cases from './pages/Cases'
import Interactions from './pages/Interactions'
import Assessments from './pages/Assessments'
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard'
import AcidBase from './pages/AcidBase'
import Algorithms from './pages/Algorithms'
import ReferenceCards from './pages/ReferenceCards'
import SodiumCorrection from './pages/calculators/SodiumCorrection'
import CalciumCorrection from './pages/calculators/CalciumCorrection'
import PotassiumECG from './pages/calculators/PotassiumECG'
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
          <Route path="calcium" element={<Calcium />} />
          <Route path="magnesium" element={<Magnesium />} />

          {/* Calculators */}
          <Route path="calculators" element={<Calculators />} />
          <Route path="calculators/sodium-correction" element={<SodiumCorrection />} />
          <Route path="calculators/calcium-correction" element={<CalciumCorrection />} />
          <Route path="calculators/potassium-ecg" element={<PotassiumECG />} />

          {/* Cases, Interactions & Assessments */}
          <Route path="cases" element={<Cases />} />
          <Route path="interactions" element={<Interactions />} />
          <Route path="acid-base" element={<AcidBase />} />
          <Route path="algorithms" element={<Algorithms />} />
          <Route path="reference-cards" element={<ReferenceCards />} />
          <Route path="assessments" element={<Assessments />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

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
