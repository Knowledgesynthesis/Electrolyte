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
import MagnesiumReplacement from './pages/calculators/MagnesiumReplacement'
// Sodium sub-pages
import SodiumPhysiology from './pages/sodium/Physiology'
import Hyponatremia from './pages/sodium/Hyponatremia'
import Hypernatremia from './pages/sodium/Hypernatremia'
// Potassium sub-pages
import PotassiumPhysiology from './pages/potassium/Physiology'
import Hypokalemia from './pages/potassium/Hypokalemia'
import Hyperkalemia from './pages/potassium/Hyperkalemia'
// Calcium sub-pages
import CalciumPhysiology from './pages/calcium/Physiology'
import Hypocalcemia from './pages/calcium/Hypocalcemia'
import Hypercalcemia from './pages/calcium/Hypercalcemia'
// Magnesium sub-pages
import MagnesiumPhysiology from './pages/magnesium/Physiology'
import Hypomagnesemia from './pages/magnesium/Hypomagnesemia'
import Hypermagnesemia from './pages/magnesium/Hypermagnesemia'
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
          <Route path="sodium/physiology" element={<SodiumPhysiology />} />
          <Route path="sodium/hyponatremia" element={<Hyponatremia />} />
          <Route path="sodium/hypernatremia" element={<Hypernatremia />} />

          <Route path="potassium" element={<Potassium />} />
          <Route path="potassium/physiology" element={<PotassiumPhysiology />} />
          <Route path="potassium/hypokalemia" element={<Hypokalemia />} />
          <Route path="potassium/hyperkalemia" element={<Hyperkalemia />} />

          <Route path="calcium" element={<Calcium />} />
          <Route path="calcium/physiology" element={<CalciumPhysiology />} />
          <Route path="calcium/hypocalcemia" element={<Hypocalcemia />} />
          <Route path="calcium/hypercalcemia" element={<Hypercalcemia />} />

          <Route path="magnesium" element={<Magnesium />} />
          <Route path="magnesium/physiology" element={<MagnesiumPhysiology />} />
          <Route path="magnesium/hypomagnesemia" element={<Hypomagnesemia />} />
          <Route path="magnesium/hypermagnesemia" element={<Hypermagnesemia />} />

          {/* Calculators */}
          <Route path="calculators" element={<Calculators />} />
          <Route path="calculators/sodium-correction" element={<SodiumCorrection />} />
          <Route path="calculators/calcium-correction" element={<CalciumCorrection />} />
          <Route path="calculators/potassium-ecg" element={<PotassiumECG />} />
          <Route path="calculators/magnesium-replacement" element={<MagnesiumReplacement />} />

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
