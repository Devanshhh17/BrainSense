# BrainSense Frontend

Futuristic React frontend for **BrainSense: Minimal-Data Cognitive Risk Predictor**.

## Tech Stack

- React + Vite (JavaScript only)
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts
- React Router

## Folder Structure

```text
BrainSense/
  package.json
  index.html
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    assets/
    components/
      BackgroundEffects.jsx
      FeatureCard.jsx
      FuturisticInput.jsx
      GlassCard.jsx
      GlowButton.jsx
      GradientHeading.jsx
      InsightCard.jsx
      LoadingScreen.jsx
      NeonBadge.jsx
      PredictionGauge.jsx
      RangeSlider.jsx
      SectionWrapper.jsx
      Sidebar.jsx
      StatCard.jsx
      Topbar.jsx
    data/
      mockData.js
    hooks/
      usePageTitle.js
    layout/
      DashboardLayout.jsx
      MainLayout.jsx
    pages/
      AboutResearchPage.jsx
      DashboardPage.jsx
      HistoryPage.jsx
      InputFormPage.jsx
      LandingPage.jsx
      NotFoundPage.jsx
      PredictionResultPage.jsx
    utils/
      helpers.js
    App.jsx
    index.css
    main.jsx
```

## Routes

- `/` Landing Page
- `/dashboard` Dashboard Page
- `/input` Input Form Page
- `/results` Prediction Result Page
- `/history` History Page
- `/about` About Research Page
- `*` 404 Not Found

## Setup & Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Notes

- This is **frontend only** and uses mock data.
- No backend/API dependency is required.
- All source files are JavaScript (`.js`, `.jsx`) only.
