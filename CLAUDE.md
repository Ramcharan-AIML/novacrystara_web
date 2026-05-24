# NovaCrystara AI Labs — Marketing Site

Single-page, cinematic Next.js marketing site for **NovaCrystara AI Labs Ltd** (London). Premium dark theme, Three.js hero, scroll-revealed sections, SVG flywheel diagram.

The full original spec lives in [README.md](README.md). The deep design / animation / Three.js / responsive details live in [rules/](rules/) — keep this file scannable.

---

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS 3** (design tokens in `tailwind.config.ts`)
- **Framer Motion 11** (all scroll reveals via `whileInView`)
- **Three.js 0.163** — hero star particles only (no planet curve; the hero uses a real background image)
- **Plus Jakarta Sans** via `next/font/google`

---

## Run

```
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

No `.env` required. Brand PNG assets live in `public/assets/` — see `public/assets/README.md` for the swap-in instructions.

---

## Repo layout

```
app/
  layout.tsx           Plus Jakarta Sans, metadata, body shell
  page.tsx             composes all 12 sections in order
  globals.css          Tailwind + .grad-text + .nc-card shimmer + buttons + reduced-motion
components/
  Navbar.tsx           fixed, scroll-spy, mobile drawer
  Hero.tsx             content + bottom stats bar
  HeroScene.tsx        Three.js (variant: "full" | "mini")
  TrustBar.tsx         partner logos row
  WhatWeDo.tsx         3-card ecosystem
  Flywheel.tsx         SVG triangle + Framer pathLength arcs + gold founder card
  OurWork.tsx          2×2 project cards
  Tracks.tsx           3×2 track grid with difficulty badges
  Journey.tsx          4-step timeline (horizontal desktop, vertical mobile)
  SuccessStories.tsx   3 count-up stat cards + 2 testimonial cards
  Team.tsx             2×2 team grid
  CTA.tsx              mini planet curve + 3 buttons
  Footer.tsx           4-col + bottom bar
lib/
  motion.ts            shared variants (fadeUp, fadeIn, slideLeft/Right, scaleIn, staggerContainer) + EASE + VIEWPORT + useReducedMotion
  useCountUp.ts        count 0 → N driven by external "start" flag
  useInViewOnce.ts     IntersectionObserver helper, one-shot
public/
  assets/              main-logo.png + name-logo.png (placeholders until user swaps)
rules/                 deep design / animation / Three.js / responsive specs
```

---

## Conventions

- **All scroll animations** use `whileInView` + `viewport={VIEWPORT}` (`{ once: true, margin: "-100px" }`). Never animate on mount except for the hero stack.
- **Easing constant:** `EASE = [0.25, 0.1, 0.25, 1]`. Import from `lib/motion.ts` — never inline.
- **Cards** use the `.nc-card` class (gradient bg + 0.5px border + top shimmer line via `::before`). Add `.nc-card-hover` for the lift-on-hover variant.
- **H2 second line** always gets `.grad-text` (purple→lavender→rose gradient).
- **Section IDs** for scroll-spy: `top`, `what-we-do`, `our-work`, `tracks`, `success`, `cta`. Don't rename without updating `components/Navbar.tsx`.
- **Three.js canvas** is `pointer-events: none` so clicks/scroll pass through. Geometries and materials disposed on unmount — see `components/HeroScene.tsx`.
- **CountUp** is driven by an external `startWhen` flag (typically `useInViewOnce`) — not by mount. Honors `prefers-reduced-motion` by jumping to the final value.
- **Reduced motion** is double-handled: a global CSS guard in `globals.css` kills all transitions, plus `useReducedMotion()` from `lib/motion.ts` for component-level branching.

---

## Where to make common changes

| Want to change... | Edit... |
| --- | --- |
| Brand colours / fonts / sizes | `tailwind.config.ts` |
| Button / card / shimmer styles | `app/globals.css` |
| Section content (copy, stats, partners, tracks, team) | the corresponding `components/<Section>.tsx` — content lives at the top of the file in a typed array |
| Animation variants (timings, easings) | `lib/motion.ts` |
| Hero Three.js scene (particle count, planet glow colours) | `components/HeroScene.tsx` |
| Flywheel node positions / arc curves | `components/Flywheel.tsx` (constants at top of `FlywheelSvg`) |
| Navbar links / scroll-spy targets | `NAV_LINKS` at top of `components/Navbar.tsx` |

---

## Responsive breakpoints (Tailwind defaults)

| Bp | Width | Behaviour |
| --- | --- | --- |
| Mobile | < 640 | single-column grids, vertical timeline, hamburger nav, stats 2×2 |
| `sm` | ≥ 640 | hero buttons row, stats 4 columns |
| `md` | ≥ 768 | 2-col grids, desktop nav, horizontal timeline |
| `lg` | ≥ 1024 | 3-col tracks, founder card sits beside flywheel SVG |

Test in DevTools at 375 / 768 / 1280.

---

## Deep dives

- [rules/01-design-system.md](rules/01-design-system.md) — colours, typography, card/button recipes
- [rules/02-animation-rules.md](rules/02-animation-rules.md) — Framer variants, easing, whileInView contract, reduced-motion
- [rules/03-three-js-hero.md](rules/03-three-js-hero.md) — HeroScene layering, planet curve composition, cleanup contract, CTA mini-variant
- [rules/04-responsive.md](rules/04-responsive.md) — per-section breakpoint behaviour

---

## Things to NOT do

- Do **not** add Three.js anywhere except `HeroScene.tsx`. The CTA mini planet reuses the same component via `variant="mini"`.
- Do **not** animate on initial page load except the hero. Everything else waits for `whileInView`.
- Do **not** drop the `.nc-card` shimmer pseudo-element when adding new cards — always use the class.
- Do **not** stack animations back to back — let one finish before the next starts.
- Do **not** add backend dependencies. This is a marketing front-end only; all forms link to `#cta` or similar anchors.
