# Portfolio — Florin Iordache

Personal portfolio built with React and TypeScript. Single-page application with section-based navigation, animated star background, and full test coverage.

**Live:** https://portfolio-florin-iordache.vercel.app/ 

---

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | React 18, TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Build | Vite 5 |
| Testing | Jest 30, React Testing Library 16 |
| Linting | ESLint 9, typescript-eslint 8 |

---

## Project Structure

```
src/
├── components/       # UI components (HeroSection, AboutSection, SkillsSection, ...)
├── constants/        # Static data (projects, skills, content, emojis)
├── hooks/            # useScrollTo, useClickOutside
├── pages/            # Home, NotFound
├── types/            # TypeScript interfaces and types
└── utils/            # Utility functions
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Coverage thresholds enforced: 70% branches, 80% functions/lines/statements.

Tests cover component behaviour, hook logic, cross-constant integrity, and accessibility attributes.

---

## Key Features

- **Animated canvas background** — 100 moving stars rendered via `requestAnimationFrame`, debounced resize handler, full cleanup on unmount
- **FAB navigation** — floating action button with smooth scroll to sections, closes on outside click via `useClickOutside`
- **Typing animation** — cycles through job roles character by character
- **Skills filtering** — filter by Frontend / Backend / Tools with accessible progress bars (`aria-valuenow`, `aria-label`)
- **Project image fallback** — shows a placeholder icon if an image fails to load
- **Error boundary** — catches runtime errors and renders a fallback UI at the app root
- **404 page** — dedicated NotFound route

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run test suite |
| `npm run test:coverage` | Run tests with coverage report |

---
