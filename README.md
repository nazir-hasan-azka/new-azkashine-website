# Azkashine Website

Marketing site for **Azkashine Software and Services Private Limited** — a Bengaluru-based
software and services company building AI products, digital platforms, and the cloud
engineering to run them.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · static export.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into out/
npm run lint
npx tsc --noEmit
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: build, then FTP the `out/`
folder to Hostinger.

> **It deploys to the `test/` subfolder, not the live site.** The workflow's `server-dir`
> is deliberately scoped so a deploy can never write into `azkashine.com`'s root. Pointing
> it at production is a one-line change, and a deliberate decision to take.

The workflow currently emits a warning that `actions/checkout@v4`, `actions/setup-node@v4`
and `SamKirkland/FTP-Deploy-Action@v4.3.5` are being force-run on Node 24 because Node 20
is deprecated. It succeeds, but those versions will need bumping.

---

## What's done

**Information architecture — 18 routes.** Structure follows the corporate portfolio deck's
own three-bucket taxonomy (deck p4): AI & Automation, Digital Platforms, Cloud Services &
Testing.

```
/                        /industries/          /products/            + 9 product pages
/what-we-do/             /about/               /contact/
  + 3 practice pages
```

**Nine products.** Savant AI, Tawthiq, AgentOS, Agent Siddhi, Smart AI Assistant, Ethics
Intelligence, Community Connect, Cloud Orchestration Platform, ProSiddhi. Two of these
(ProSiddhi, Agent Siddhi) do not appear in the portfolio deck and were sourced from their
own catalogs.

**Content layer.** All copy lives in `lib/content/`; routes stay thin. Every product
records a `deckPage` so any claim can be traced back.

**Product interfaces built in markup** (`components/product-ui/`) rather than
screenshotted — the only real screens in the decks are 1152×648 and smaller.

**Imagery.** 18 curated WebP images, none reused, from Azkashine's own asset repo, the
product catalogs, and two CC0 photographs.

**Motion.** Duration/easing tokens, card lift, button press, arrow nudge, underline wipe,
dropdown entrance, native CSS scroll reveals, stat count-up, and the interactive tile
backdrop ported from the previous site. **No animation dependency** — all CSS.
`prefers-reduced-motion` honoured throughout.

### Deliberately omitted

- **Client logos, testimonials, case studies.** Twelve client logos exist (in the old
  repo's `src/images/clients/` and on the live site) but are off by client decision.
  `Partners.tsx` and `Testimonials.tsx` were deleted rather than left as placeholders.
- **Stats bands on six of nine products.** Only Community Connect, AgentOS, and Cloud
  Orchestration have measured figures in their decks. The rest have no band rather than
  one padded with counts of their own bullet points.
- **SAP & Enterprise and IT Consulting / Placement Services.** On the old live site;
  confirmed discontinued.

---

## What's next

### Blocked on someone else

| Item | Needs |
|---|---|
| **Chairman's portrait** | A photo of Ishaq Shaik. The About page currently shows architecture — deliberately not a person, since any face beside a signed letter reads as *being* the Chairman. Marked with a comment in `app/about/page.tsx`. |
| **Contact form** | Static export has no backend, so contact is `mailto:` + phone. Needs a form service (Formspree / Web3Forms) or a decision to stay as-is. |
| **Product demo links** | `demoUrl` is `null` for all nine. The CTA slot is built; setting the field in `lib/content/products.ts` is a one-line change per product. |
| **Deck image licensing** | Provenance of the product-catalog imagery is unconfirmed. If any came from an unlicensed source, it should be swapped before the site goes to the production domain. |
| **A consistent icon set** | The decks use different palettes per product (Tawthiq mint, Agent Siddhi orange, AgentOS blue) against a cyan brand. The three "Why choose us" cards still use Figma-template 3D renders. One coherent set would fix this properly. |

### Ready to pick up

- **Thin industry pages.** The deck gives four industry names and little else. They ship
  short and honest; deepening them needs sector content.
- **Four orphaned components** — `Services.tsx`, `Process.tsx`, `Faq.tsx`,
  `FaqAccordion.tsx` (~296 lines). Their content is template placeholder that contradicts
  the current IA. Delete or repurpose.
- **Arabic / GCC.** The nav reserves a language-toggle slot (marked in `Navbar.tsx`).
  Tawthiq is Arabic-first with SOCPA/CMA/SAMA coverage, so an `/ar` build is a real
  opportunity, not a nicety.
- **Cross-route View Transitions.** Not wired: React 19.2 does not export
  `unstable_ViewTransition`, and Next's `experimental.viewTransition` flag enables that
  component rather than wrapping navigations. Verified by counting `startViewTransition`
  calls — zero. Revisit when the API reaches stable React.
- **Mega-menu tab order.** The dropdown panel renders after `<nav>` in the DOM, so tabbing
  from "Products" reaches Industries/About/Contact before the panel's own links. Standard
  for mega-menus, but not ideal.
- **Routes that slot in without restructuring** as content arrives: `/clients`,
  `/insights`, `/careers`.

---

## Verification

There is no test runner in `package.json`; checks are Playwright scripts run against a
local dev server. Current state:

- `npx tsc --noEmit` and `npm run lint` — clean
- `npm run build` — all 18 routes export as static HTML
- 18 routes × 390/768/1440 — no horizontal overflow, exactly one `<h1>` each, no dead
  `#` links, no images missing `alt`
- 15 navigation interaction tests (hover, click-through, keyboard, touch, Escape)
- 9 motion tests (reveals, hover lift, count-up, reduced-motion)

Worth formalising these into a committed `tests/` directory with an `npm test` script —
they currently live in the session scratchpad.

---

## Reference

- Corporate portfolio deck: `Azkashine-Portfolio-Portrait-View.pdf` / `.pptx`
- Product catalogs: `Azkashine Product  Catalog/`, `ProSiddhi All Catalog/`
- Previous site source: `C:\dev\Azkashine\Azkashine_Website` (live at azkashine.com)
