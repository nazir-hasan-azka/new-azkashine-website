# Azkashine Website

Marketing website for **Azkashine**, built from provided designs.

## Status

**Built and deploying.** 18 routes, nine products, full imagery and motion pass complete.
Deployed via GitHub Actions to the Hostinger `test/` subfolder on every push to `main`.
See `README.md` for what is done, what is pending, and the known gaps.

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Package manager:** npm (assume npm unless a lockfile says otherwise)
- **Target:** static/mostly-static marketing site; SEO matters

## Commands

- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type check

## Project structure

```
app/
  page.tsx                    Home
  what-we-do/                 Practice index + [category] pages (3)
  products/                   Product index + [slug] pages (9)
  industries/  about/  contact/
components/
  sections/                   Page sections (Hero, Navbar, Footer, CapabilityGrid, ...)
  ui/                         Primitives (Container, Media, PageHeader, StatsBand, ...)
  product-ui/                 Coded product interfaces — see "Product visuals" below
lib/content/                  ALL copy and data lives here; routes stay thin
public/img/                   18 curated WebP images (banner + -card variants)
```

### Content layer

`lib/content/` is the single source of copy. Never hard-code marketing text in a route.

- `taxonomy.ts` — the three practices and twelve capabilities (deck p4, verbatim)
- `products.ts` — the nine products; each carries `deckPage` recording provenance
- `industries.ts`, `client-work.ts`, `site.ts`

**Rule: if a claim is not in a deck, it does not go on the site.** No invented clients,
metrics, or capabilities. `stats` bands appear on only the three products whose decks
state measured figures.

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

### Motion

A fixed vocabulary lives in `app/globals.css` — `--dur-fast/base/slow/slower` and two
easings. Components pick from these; they do not invent timings.

- Helper classes: `.lift`, `.btn-motion`, `.nudge`, `.underline-wipe`, `.zoom-frame`,
  `.panel-in`, `.reveal`, `.reveal-group`, `.tile-pulse`.
- Scroll reveals use native CSS `animation-timeline: view()` behind `@supports`. **No
  animation library is installed and none should be added** — every effect here is CSS,
  including the interactive tile backdrop ported from the previous site.
- `prefers-reduced-motion` is honoured globally. Keep it that way.
- Gotcha: a scroll-driven animation with `both` fill holds `transform: none`, and
  animations outrank normal declarations. A `.reveal-group` child and a `.lift` card must
  therefore be **different elements**, or hover transforms silently never apply.

### Images

- 18 curated images in `public/img/`, each as `name.webp` (banner) + `name-card.webp`.
- **No image is used in two places.** Sources: Azkashine's own asset repo at
  `C:\dev\Azkashine\Azkashine_Website\src\`, the product catalogs, and two CC0
  photographs. Provenance of deck imagery is the client's to confirm.
- Use the `Media` component, never a bare `next/image` — it handles the clip frame,
  fixed aspect ratio, and hover zoom.

### Product visuals

`components/product-ui/` builds each product's interface **in markup, not screenshots** —
the only real screens in the decks are 1152×648 and smaller. These are labelled
"Representative … interface" on the page and must not be presented as literal captures.

### Layout gotcha

Grid and flex items default to `min-width: auto` and will not shrink below their content's
min-content width. Any grid child holding a card or a `truncate` element needs `min-w-0`,
or it pushes past the page gutter on narrow screens.

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
