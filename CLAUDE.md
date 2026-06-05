# Azkashine Website

Marketing website for **Azkashine**, built from provided designs.

## Status

Greenfield. The harness (this file + `.claude/agents/`) is set up first; the Next.js
app is scaffolded next. Update the **Commands** and **Structure** sections once the app exists.

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Package manager:** npm (assume npm unless a lockfile says otherwise)
- **Target:** static/mostly-static marketing site; SEO matters

## Commands

> Filled in after scaffolding. Expected:
- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type check

## Project structure

> Filled in after scaffolding. Intended layout:
```
app/                 # App Router routes, layouts, pages
components/           # Reusable UI components
  ui/                # Primitive/shared components (Button, Card, ...)
  sections/          # Page sections (Hero, Features, Footer, ...)
lib/                 # Utilities, data fetching, helpers
public/              # Static assets (images, fonts, favicons)
styles/              # Global CSS / Tailwind layers (if any beyond globals.css)
```

## Conventions

- **Components:** Server Components by default. Add `"use client"` only when a component
  needs interactivity (state, effects, event handlers, browser APIs).
- **Files:** PascalCase for component files (`Hero.tsx`); kebab-case for route segments.
- **Styling:** Tailwind utility classes in markup. Extract repeated patterns into components,
  not `@apply` soup. Use design tokens from `tailwind.config` (colors, spacing, fonts) —
  do not hardcode hex values once tokens exist.
- **Images:** always `next/image`. Provide `width`/`height` or `fill` + sized container.
- **Fonts:** load via `next/font` — no render-blocking `<link>` font tags.
- **Imports:** use the `@/` path alias for absolute imports.
- **Accessibility:** semantic HTML first; ARIA only to fill real gaps. All interactive
  elements keyboard-reachable; images have meaningful `alt`.
- **Metadata/SEO:** every route exports `metadata` (title, description, OG). No layout
  shift; respect Core Web Vitals.

## Design fidelity

- Designs are the source of truth for spacing, color, type scale, and breakpoints.
- Match the design system exactly; if a value isn't specified, follow the nearest token.
- Mobile-first; verify each breakpoint the design defines.

## Workflow

- Prefer small, reviewable changes. Build a section/component, then verify it.
- Use the specialized subagents in `.claude/agents/` for their domains
  (building UI, design review, a11y/perf/SEO/responsive checks, code review).
- Don't introduce new dependencies without a clear need; prefer the platform and Tailwind.
- Keep `app/` routes thin — push markup into `components/sections` and `components/ui`.
