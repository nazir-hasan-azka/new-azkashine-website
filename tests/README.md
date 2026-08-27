# Tests

Playwright scripts, no test framework. They drive a real browser against a running dev
server and assert on computed styles and measured geometry rather than on screenshots —
which is what lets them catch things the eye misses.

```bash
npm run dev          # in one terminal
npm test             # in another

BASE_URL=http://127.0.0.1:3100 npm test    # or point at a served build
```

| Suite | Covers |
|---|---|
| `routes.mjs` | All 18 routes at 390 / 768 / 1440 — horizontal overflow, one `<h1>` each, no dead `#` links, no images missing `alt`, mobile menu contents |
| `navigation.mjs` | 15 checks: hover-to-open, switching between menus, moving into the panel, click-through, keyboard Enter/Space/Escape, touch |
| `motion.mjs` | Canvas hero painting and filling the viewport, scroll reveals, hover lift as a measured transform, stat count-up, reduced-motion |
| `slider.mjs` | Direction-aware track movement, copy stagger, autoplay pausing on hover, all nine products still crawlable |
| `stats.mjs` | Exactly three products carry a stats band; the other six deliberately do not |

## Why these exist

Each caught a real bug that looked fine in a screenshot:

- **Cards silently never lifted.** A scroll-driven animation with `both` fill holds
  `transform: none`, and animations outrank normal declarations — so `.lift:hover` on the
  same element did nothing. `motion.mjs` asserts the measured transform, not the class.
- **Tawthiq overflowed at 390px.** A grid child at `min-width: auto` refused to shrink
  below its content, pushing 404px into a 326px track. `routes.mjs` measures
  `scrollWidth` against the viewport on every route.
- **The dropdown stayed open through navigation.** The outside-click handler could not
  see clicks on links *inside* the header. `navigation.mjs` reads `aria-expanded`.
- **A claim that turned out to be false.** Cross-route View Transitions were assumed
  wired; counting `startViewTransition` calls showed zero.

## Gotchas

- Wait for hydration before interacting. The home page ships canvas and slider JS; short
  waits produce failures that look real but are not.
- Park the mouse away from the header before keyboard tests, or `mouseenter` fires and
  closes what the keyboard just opened.
- Full-page screenshots do **not** resolve scroll-driven animations — content can appear
  blank in a capture while being perfectly visible to a reader. Assert on computed
  opacity at a real viewport size instead.
