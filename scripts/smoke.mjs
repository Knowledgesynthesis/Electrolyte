// End-to-end smoke test: every route at desktop and phone width, plus key interactions.
// Usage: npm run build && npx vite preview --port 4173 & node scripts/smoke.mjs [baseUrl] [screenshotDir]
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')

const BASE = process.argv[2] ?? 'http://localhost:4173'
const SHOTS = process.argv[3]
const failures = []
const fail = (msg) => {
  failures.push(msg)
  console.log('  ✗', msg)
}

const browser = await chromium.launch()

async function collectRoutes() {
  const page = await browser.newPage()
  await page.goto(BASE + '/learn', { waitUntil: 'networkidle' })
  const lessons = await page.$$eval('a[href^="/learn/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href').split('#')[0]))])
  await page.goto(BASE + '/tools', { waitUntil: 'networkidle' })
  const tools = await page.$$eval('a[href^="/tools/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  await page.goto(BASE + '/algorithms', { waitUntil: 'networkidle' })
  const algos = await page.$$eval('a[href^="/algorithms/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  await page.goto(BASE + '/cases', { waitUntil: 'networkidle' })
  const cases = await page.$$eval('a[href^="/cases/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  await page.close()
  return { lessons, tools, algos, cases }
}

const { lessons, tools, algos, cases } = await collectRoutes()
const routes = ['/', '/learn', '/tools', '/algorithms', '/cases', '/practice', '/review', '/progress', '/reference', '/glossary', '/evidence', '/settings', '/nope-404', ...lessons, ...tools, ...algos, ...cases]
console.log(`Routes: ${routes.length} (${lessons.length} lessons, ${tools.length} tools, ${algos.length} algorithms, ${cases.length} cases)`)
if (lessons.length < 20) fail(`expected ≥20 lessons, found ${lessons.length}`)

for (const vp of [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'phone', width: 390, height: 844 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(`pageerror ${e.message}`))
  page.on('console', (m) => m.type() === 'error' && errors.push(`console ${m.text()}`))
  for (const r of routes) {
    errors.length = 0
    await page.goto(BASE + r, { waitUntil: 'networkidle' })
    await page.waitForTimeout(150)
    const text = await page.locator('main').innerText()
    if (text.trim().length < 80) fail(`[${vp.name}] ${r}: main content too short (${text.trim().length})`)
    if (errors.length) fail(`[${vp.name}] ${r}: ${errors.join(' | ')}`)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    if (overflow > 1) fail(`[${vp.name}] ${r}: horizontal overflow ${overflow}px`)
    if (/NaN|undefined|\[object Object\]/.test(text)) fail(`[${vp.name}] ${r}: suspicious text (NaN/undefined/[object Object])`)
  }
  if (SHOTS) {
    for (const r of ['/', '/learn/hyponatremia-treatment', '/tools/na-planner', '/tools/k-ecg', '/tools/acid-base', '/learn/nephron', '/cases/dialysis-hyperk']) {
      await page.goto(BASE + r, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)
      await page.screenshot({ path: `${SHOTS}/${vp.name}${r.replaceAll('/', '_') || '_home'}.png`, fullPage: false })
    }
  }
  await ctx.close()
}

// Interactions
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()
const errs = []
page.on('pageerror', (e) => errs.push(e.message))

// 1. Inline question in a lesson records progress
await page.goto(BASE + '/learn/hyponatremia-diagnosis', { waitUntil: 'networkidle' })
const firstQ = page.locator('[aria-label="Answer options"]').first()
await firstQ.locator('button').first().click()
if (!(await page.getByText(/Correct|Not quite/).first().isVisible())) fail('inline question did not reveal feedback')
await page.getByRole('button', { name: /Mark lesson complete/ }).click()
await page.goto(BASE + '/progress', { waitUntil: 'networkidle' })
if (!(await page.getByText(/Questions answered/).isVisible())) fail('progress page missing stats')

// 2. Algorithm walk to a result
await page.goto(BASE + '/algorithms/hyponatremia', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'No / mild' }).click()
await page.getByRole('button', { name: /<275/ }).click()
await page.getByRole('button', { name: /≥100/ }).click()
await page.getByRole('button', { name: />30 mmol/ }).click()
await page.getByRole('button', { name: 'Euvolemic' }).click()
await page.getByRole('button', { name: 'Yes' }).click()
if (!(await page.getByRole('heading', { name: 'SIADH' }).isVisible())) fail('algorithm did not reach SIADH endpoint')

// 3. Play a case to the debrief
await page.goto(BASE + '/cases/thiazide-seizure', { waitUntil: 'networkidle' })
for (let i = 0; i < 4; i++) {
  const opts = page.locator('button:not([disabled])', { hasText: /3% NaCl|Aquaresis/ })
  if ((await opts.count()) === 0) break
  await opts.first().click()
  await page.getByRole('button', { name: /Continue/ }).click()
}
if (!(await page.getByText(/Debrief/).isVisible())) fail('case did not reach debrief')

// 4. Practice session
await page.goto(BASE + '/practice', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /^Start$/ }).click()
await page.locator('[aria-label="Answer options"] button').first().click()
await page.getByRole('button', { name: /Next question|See results/ }).click()

// 5. Flashcards
await page.goto(BASE + '/review', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /Learn \d+ new/ }).click()
await page.getByRole('button', { name: 'Show answer' }).click()
await page.getByRole('button', { name: /Good/ }).click()

// 6. Units toggle changes tool inputs
await page.goto(BASE + '/settings', { waitUntil: 'networkidle' })
await page.getByRole('radio', { name: 'SI (mmol/L)' }).click()
await page.goto(BASE + '/tools/ca-adjust', { waitUntil: 'networkidle' })
if (!(await page.getByText('g/L').first().isVisible())) fail('SI units not applied to calcium tool')

// 7. Na planner shows limit crossing with aquaresis
await page.goto(BASE + '/tools/na-planner', { waitUntil: 'networkidle' })
if (!(await page.getByText(/Limit crossed at hour/).isVisible())) fail('Na planner aquaresis warning not shown for default case')

// 8. Legacy redirect
await page.goto(BASE + '/calculators/sodium-correction', { waitUntil: 'networkidle' })
if (!page.url().endsWith('/tools/na-planner')) fail(`legacy redirect failed: ${page.url()}`)

// 9. Search palette
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.keyboard.press('Control+K')
await page.waitForSelector('input[aria-label="Search query"]')
await page.keyboard.type('winters')
await page.waitForTimeout(200)
if ((await page.locator('[role="option"]').count()) === 0) fail('search returned nothing for "winters"')

if (errs.length) fail('interaction page errors: ' + errs.join(' | '))
await browser.close()

if (failures.length) {
  console.log(`\n${failures.length} failure(s)`)
  process.exit(1)
}
console.log('\nAll smoke checks passed')
