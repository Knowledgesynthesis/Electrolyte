import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'

const Home = lazy(() => import('./pages/Home'))
const Learn = lazy(() => import('./pages/Learn'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const ToolsPage = lazy(() => import('./pages/ToolsPage'))
const ToolPage = lazy(() => import('./pages/ToolPage'))
const AlgorithmsPage = lazy(() => import('./pages/AlgorithmsPage'))
const AlgorithmPage = lazy(() => import('./pages/AlgorithmPage'))
const CasesPage = lazy(() => import('./pages/CasesPage'))
const CasePage = lazy(() => import('./pages/CasePage'))
const Practice = lazy(() => import('./pages/Practice'))
const Review = lazy(() => import('./pages/Review'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const Reference = lazy(() => import('./pages/Reference'))
const Glossary = lazy(() => import('./pages/Glossary'))
const Evidence = lazy(() => import('./pages/Evidence'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Old URLs from the previous version keep working */
const LEGACY: [string, string][] = [
  ['sodium', '/learn#sodium'],
  ['sodium/physiology', '/learn/water-balance'],
  ['sodium/hyponatremia', '/learn/hyponatremia-diagnosis'],
  ['sodium/hypernatremia', '/learn/hypernatremia'],
  ['potassium', '/learn#potassium'],
  ['potassium/physiology', '/learn/potassium-physiology'],
  ['potassium/hypokalemia', '/learn/hypokalemia'],
  ['potassium/hyperkalemia', '/learn/hyperkalemia'],
  ['calcium', '/learn#calcium'],
  ['calcium/physiology', '/learn/calcium-physiology'],
  ['calcium/hypocalcemia', '/learn/hypocalcemia'],
  ['calcium/hypercalcemia', '/learn/hypercalcemia'],
  ['magnesium', '/learn#magnesium'],
  ['magnesium/physiology', '/learn/hypomagnesemia'],
  ['magnesium/hypomagnesemia', '/learn/hypomagnesemia'],
  ['magnesium/hypermagnesemia', '/learn/hypermagnesemia'],
  ['calculators', '/tools'],
  ['calculators/sodium-correction', '/tools/na-planner'],
  ['calculators/calcium-correction', '/tools/ca-adjust'],
  ['calculators/potassium-ecg', '/tools/k-ecg'],
  ['calculators/magnesium-replacement', '/tools/mg-planner'],
  ['interactions', '/learn/interactions'],
  ['acid-base', '/learn/acid-base-approach'],
  ['reference-cards', '/reference'],
  ['assessments', '/practice'],
  ['dashboard', '/progress'],
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:lessonId" element={<LessonPage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="tools/:toolId" element={<ToolPage />} />
          <Route path="algorithms" element={<AlgorithmsPage />} />
          <Route path="algorithms/:algoId" element={<AlgorithmPage />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="cases/:caseId" element={<CasePage />} />
          <Route path="practice" element={<Practice />} />
          <Route path="review" element={<Review />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="reference" element={<Reference />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="evidence" element={<Evidence />} />
          <Route path="settings" element={<SettingsPage />} />
          {LEGACY.map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
