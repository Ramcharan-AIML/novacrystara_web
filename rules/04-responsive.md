# 04 — Responsive Behaviour

Tailwind default breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. Test in DevTools at **375 / 768 / 1280**.

---

## Navbar

- **≥ md:** logo + link row + "Partner With Us" button visible.
- **< md:** links + CTA collapse into a hamburger; tap opens a Framer Motion slide-down drawer. Body scroll is locked while open.
- Scroll past 80px → translucent backdrop-blur background on the nav (animated via Framer).

---

## Hero

- **H1:** `text-[40px] sm:text-5xl lg:text-hero` (40 → 48 → 64). Italic third line scales `22 → 28 → 36`.
- **Buttons:** stack vertically on mobile, side-by-side on `sm+`.
- **Stats bar:** 2×2 grid on mobile, 4-column row on `sm+`. Dividers fade on small widths thanks to the `divide-x` becoming visually trivial at narrow widths.
- **Logo:** 72px mobile → 88px `sm+`.

---

## Trust bar

Logos wrap onto multiple rows on mobile (`flex-wrap` + `gap-y-4`), single row on `sm+` with vertical dividers from `md+`.

---

## WhatWeDo / OurWork / Tracks / Team

| Section | Mobile | md | lg |
| --- | --- | --- | --- |
| WhatWeDo (3 cards) | 1 col | 3 col | 3 col |
| OurWork (4 cards) | 1 col | 2 col | 2 col |
| Tracks (6 cards) | 1 col | 2 col | 3 col |
| Team (4 cards) | 1 col | 2 col | 2 col |

All grids: `gap-5`.

---

## Flywheel

- SVG keeps its `viewBox="0 0 600 440"` + `preserveAspectRatio="xMidYMid meet"` so it scales fluidly.
- **≥ lg:** grid layout `[1fr 280px]` — flywheel SVG on the left, gold founder card on the right.
- **< lg:** founder card stacks below the SVG, full-width.
- Text inside nodes uses a `wrap()` helper to break descriptions into two short lines so the text fits inside the 60px-radius circles at any zoom.

---

## Journey

- **≥ md:** horizontal 4-column timeline. Connecting line is a 0.5px horizontal gradient running `left-[6%] right-[6%]` behind the step circles, animated `scaleX 0 → 1` from left.
- **< md:** vertical layout. Steps stack with a vertical gradient line on the left of the step circles.

---

## Success Stories

- Stat cards: 1 col mobile → 3 col `md+`.
- Testimonial cards: 1 col mobile → 2 col `md+`.
- CountUp values trigger on `IntersectionObserver`, so the number animation only runs once on first scroll-in regardless of viewport size.

---

## CTA

- Heading scales `text-[36px] sm:text-[44px] lg:text-[52px]`.
- 3-button row: `flex-col` on mobile (full-width buttons), `sm+` wraps horizontally.
- The mini planet curve is sized by viewport via the camera-aspect resize handler in HeroScene — no manual breakpoint needed.

---

## Footer

- Mobile: brand column spans 2 cols, link columns 2 per row.
- `lg+`: brand + 3 link columns side-by-side.
- Bottom bar: copyright + socials stack vertically on mobile, justified row on `sm+`.

---

## Reduced motion

Independent of breakpoints. See `rules/02-animation-rules.md`.
