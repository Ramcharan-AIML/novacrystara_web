# 01 — Design System

All values wired in `tailwind.config.ts` (extended theme) and `app/globals.css` (utilities).

---

## Colour palette

| Token | Hex | Use |
| --- | --- | --- |
| `nc-base` | `#06070E` | page background, dark sections |
| `nc-surface1` | `#07080F` | alternate section bg (TrustBar, WhatWeDo, OurWork, Journey, Team) |
| `nc-surface2` | `#09090F` | reserved (deep modal/overlay) |
| `nc-card` | `#0C0A1A` | card background base |
| `nc-card2` | `#0E0C1C` | card background gradient endpoint |
| `nc-purple` | `#7C3AED` | primary CTA, glow base |
| `nc-violet` | `#A78BFA` | primary accent, active nav, eyebrow |
| `nc-lavender` | `#C4B5FD` | secondary accent, hero badge text |
| `nc-rose` | `#E8C5D8` | warm accent, gradient tail |
| `nc-gold` | `#D4AF37` | founder card, premium badge |
| `nc-heading` | `#F0EEF8` | headings, hero H1 |
| `nc-body` | `#94A3B8` | default body (overridden in dark sections) |
| `nc-muted` | `#3D3660` | muted body |
| `nc-dim` | `#2E2A44` | very dim labels |

Most card copy uses `#5D5380` for description text — slightly warmer than `nc-muted`.

---

## Typography

Plus Jakarta Sans, weights 300 / 400 / 500 / 600 / 700 / 800. Wired via `next/font/google` → CSS variable `--font-jakarta` → Tailwind `font-sans`.

| Tailwind class | Px | Weight | Line | Letter |
| --- | --- | --- | --- | --- |
| `text-hero` | 64 | 800 | 1.15 | -0.02em |
| `text-h2` | 40 | 700 | 1.25 | — |
| `text-h3` | 20 | 600 | 1.3 | — |
| `text-body-lg` | 16 | 400 | 1.75 | — |
| `text-eyebrow` | 11 | 600 | 1 | 0.14em |

In practice the H2 in each section uses `text-[34px] sm:text-[40px]` (responsive) rather than the static `text-h2` so it scales gracefully on mobile.

---

## `.grad-text`

Applied to the second line of every H2 (and the second word of "NC **Flywheel**"). Defined in `globals.css`:

```css
.grad-text {
  background: linear-gradient(135deg, #A78BFA 0%, #C4B5FD 45%, #E8C5D8 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
}
```

---

## `.nc-card`

The card primitive — gradient background, 0.5px violet-tinted border, 14px radius, top shimmer line via `::before`.

```css
.nc-card {
  background: linear-gradient(150deg, #0C0A1A, #0E0C1C);
  border: 0.5px solid rgba(167,139,250,0.10);
  border-radius: 14px;
}
.nc-card::before { /* 1px shimmer gradient at the top edge */ }
```

Add `.nc-card-hover` to get the `translateY(-4px)` lift + brighter border on hover.

---

## Buttons

```css
.nc-btn-primary  — linear gradient purple, white text, 0 0 24px purple glow, scale(1.02) on hover
.nc-btn-secondary — 0.5px violet border, near-transparent bg, lavender text, brightens on hover
```

Both: 8px radius, 12px / 28px padding, 14px / 600 weight.

---

## Logo glow

Applied via `.nc-logo-glow`:

```css
filter: drop-shadow(0 0 24px rgba(124,58,237,0.55))
        drop-shadow(0 0 8px rgba(196,181,253,0.3));
```

---

## Other utilities

- `.nc-dot-grid` — subtle radial dot grid background (hero + CTA backdrop layer)
- `.nc-eyebrow` — uppercase 11px violet label above every section heading
- `.nc-divider` — thin violet-tinted horizontal divider
