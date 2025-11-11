# Electrolyte Atlas

**Navigate Na⁺ to Ca²⁺ with confidence**

A comprehensive, evidence-based educational platform for mastering electrolyte physiology and disorders. Built for medical professionals from students to attending physicians.

## 🎯 Features

### Current (M0 Prototype)
- **Sodium (Na⁺) Module**: Comprehensive overview with hypo/hypernatremia information
- **Potassium (K⁺) Module**: Complete guide with ECG correlations and emergency protocols
- **Sodium Correction Calculator**:
  - Real-time calculation with safety guardrails
  - Osmotic demyelination syndrome warnings
  - Age and sex-adjusted total body water calculations
  - Infusion recommendations
- **Interactive UI**: Dark mode, responsive design, accessibility features
- **PWA Support**: Install as app, works offline
- **Unit System Toggle**: Switch between SI (mmol/L) and US (mEq/L) units

### Coming Soon
- Calcium (Ca²⁺) and Magnesium (Mg²⁺) modules
- Potassium ECG Visualizer
- Calcium Albumin Corrector
- Interactive case vignettes
- Knowledge assessments with detailed rationales
- Diagnostic flowcharts
- Spaced repetition learning system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 🏗️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router v6
- **PWA**: vite-plugin-pwa with Workbox
- **Icons**: Lucide React
- **Charts**: Recharts
- **Math Rendering**: KaTeX

## 📁 Project Structure

```
app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Base components (Button, Card, Input)
│   │   └── Layout.tsx   # Main app layout
│   ├── pages/           # Route pages
│   │   ├── Home.tsx
│   │   ├── Sodium.tsx
│   │   ├── Potassium.tsx
│   │   ├── Calculators.tsx
│   │   ├── Settings.tsx
│   │   └── calculators/
│   │       └── SodiumCorrection.tsx
│   ├── stores/          # Zustand state stores
│   │   ├── theme.ts     # Theme management
│   │   ├── settings.ts  # User settings
│   │   └── progress.ts  # Learning progress
│   ├── types/           # TypeScript definitions
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── dist/                # Production build output
```

## 🎨 Design Philosophy

Built according to the **ultrathink.md** principles:
- **Elegant Architecture**: Every component serves a purpose
- **Clinical Accuracy**: Evidence-based with proper citations
- **Safety First**: Prominent warnings and guardrails
- **User-Centric**: Intuitive, accessible, mobile-first
- **Performance**: Optimized for speed and offline use

## 🏥 Medical Accuracy

All content is based on current clinical guidelines:
- UpToDate (2023)
- KDIGO Guidelines
- Harrison's Principles of Internal Medicine (21st Ed)
- Endocrine Society Guidelines
- NEJM Clinical Practice Reviews

### Safety Warnings
- Sodium correction limits: ≤ 8-10 mmol/L per 24 hours
- Hyperkalemia emergency protocols clearly marked
- All calculators include validation and safety checks

## 🎓 Educational Use Only

**Important**: This application is designed for educational purposes only. It should not replace clinical judgment, established treatment protocols, or consultation with senior clinicians. Always verify calculations independently and follow current institutional guidelines.

## 🌐 Deployment

### Build & Deploy
```bash
# Production build
npm run build

# The dist/ folder contains:
# - Optimized JS/CSS bundles
# - Service worker for offline support
# - PWA manifest
# - All assets
```

Deploy to:
- Vercel: `vercel deploy`
- Netlify: `netlify deploy`
- GitHub Pages: Build and push `dist/` folder

### PWA Installation
Once deployed, users can install the app:
- **Desktop**: Chrome/Edge - Click install icon in address bar
- **iOS**: Safari - Share → Add to Home Screen
- **Android**: Chrome - Menu → Install App

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start dev server with HMR
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in `src/components/` or `src/pages/`
2. Add types to `src/types/index.ts`
3. Update routing in `src/App.tsx`
4. Add utilities to `src/lib/utils.ts`

## 📝 Future Roadmap

### M1 (Next Phase)
- [ ] Calcium and Magnesium modules
- [ ] Potassium ECG Visualizer with interactive waveforms
- [ ] Volume & Tonicity Navigator
- [ ] Case vignette engine

### M2 (Advanced Features)
- [ ] Cross-electrolyte interaction maps
- [ ] Acid-base integration
- [ ] Advanced diagnostic algorithms
- [ ] Spaced repetition system

### M3 (Personalization)
- [ ] User progress tracking
- [ ] Adaptive learning paths
- [ ] Printable reference cards
- [ ] Multi-language support

## 🤝 Contributing

This is an educational project. Contributions welcome:
1. Medical accuracy improvements
2. New calculators/tools
3. UI/UX enhancements
4. Bug fixes

## 📄 License

Educational use. All medical content properly cited.

## 🙏 Acknowledgments

Built with clinical rigor and attention to detail, following evidence-based medicine principles. Special thanks to the medical education community for their continuous work in making medicine accessible and understandable.

---

**Version**: 0.1.0 (M0 Prototype)
**Last Updated**: November 2025
