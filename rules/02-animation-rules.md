# 02 — Animation Rules

All Framer Motion variants live in `lib/motion.ts`. Import from there — never inline.

---

## Globals

```ts
export const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
export const VIEWPORT = { once: true, margin: "-100px" };
```

- `EASE` is the smooth ease for every section reveal.
- `VIEWPORT` is the `viewport={...}` prop. `once: true` means each animation runs exactly once — never re-trigger on scroll-up.

---

## Variant catalogue

| Variant | Hidden → Visible | Default duration |
| --- | --- | --- |
| `fadeUp` | `{opacity:0, y:40}` → `{opacity:1, y:0}` | 0.7s |
| `fadeIn` | `{opacity:0}` → `{opacity:1}` | 0.6s |
| `slideLeft` | `{opacity:0, x:-40}` → `{opacity:1, x:0}` | 0.6s |
| `slideRight` | `{opacity:0, x:40}` → `{opacity:1, x:0}` | 0.6s |
| `scaleIn` | `{opacity:0, scale:0.92}` → `{opacity:1, scale:1}` | 0.6s |

### Stagger

`staggerContainer(staggerChildren, delayChildren?)` — apply on the parent `<motion.ul>` or `<motion.div>`; children use any of the above variants:

```tsx
<motion.ul
  variants={staggerContainer(0.15)}
  initial="hidden"
  whileInView="visible"
  viewport={VIEWPORT}
>
  {items.map(i => <motion.li key={i.id} variants={fadeUp}>…</motion.li>)}
</motion.ul>
```

---

## Per-section animation map

| Section | Behaviour |
| --- | --- |
| Hero | Stacked on **mount** (not scroll). Logo `scaleIn` delay 0.2s → badge `fadeIn` 0.4s → H1 lines staggered 0.15s → subtext 1.0s → buttons 1.15s |
| Stats bar | CountUp triggered when bar enters viewport (`useInViewOnce`) |
| TrustBar | `slideLeft` stagger 0.1s on each partner logo |
| WhatWeDo | `staggerContainer(0.15)` + `fadeUp` per card |
| Flywheel | Custom timeline — nodes scale in 0/0.3/0.6s, arcs draw via `pathLength` 0→1 at 0.9/1.2/1.5s, labels fade at 1.7s, founder card slides in at 1.9s, legend fades at 2.0s |
| OurWork | `slideLeft` for odd cards, `slideRight` for even — 0.2s stagger |
| Tracks | `fadeUp` 0.12s stagger |
| Journey | Connecting line `scaleX 0→1` (`transformOrigin: left`) 1s, then `staggerContainer(0.18, 0.5)` for the nodes |
| SuccessStories | Stat tiles `fadeUp` + CountUp on viewport entry; testimonial cards `fadeUp` |
| Team | `fadeUp` 0.1s stagger |
| CTA | Whole block `scaleIn`, inner elements `fadeUp`-style stagger 0.15s |

---

## Flywheel arc draw — the canonical pattern

Use `<motion.path>` with Framer's built-in `pathLength`. Cleaner than computing `stroke-dasharray` + `stroke-dashoffset` manually, and visually equivalent.

```tsx
<motion.path
  d="M …"
  fill="none"
  stroke="url(#grad-arc1)"
  strokeWidth={1.5}
  strokeDasharray="6 4"
  initial={{ pathLength: 0, opacity: 0 }}
  variants={{
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.7, delay: 0.9, ease: EASE },
    },
  }}
/>
```

Drive the parent `<motion.svg>` with `whileInView="visible"` + `viewport={VIEWPORT}`.

---

## CountUp

`lib/useCountUp.ts`:

```ts
const n = useCountUp({ to: 92, duration: 2000, startWhen: inView });
```

- `startWhen` must be externally driven by `useInViewOnce` — don't trigger on mount.
- `easeOutQuart` baked in.
- Reduced motion → instantly returns `to`.

---

## Reduced motion

Two layers:

1. **Global CSS guard** (`globals.css`) — zeroes out all CSS transitions and animations under `prefers-reduced-motion: reduce`.
2. **`useReducedMotion()` hook** (`lib/motion.ts`) — for component-level branching when you need to swap a Framer variant for an instant one, or skip a Three.js animation loop side effect.

The HeroScene Three.js loop checks the media query at the top of its effect and skips rotation/pulse maths if reduced-motion is set, but still renders the scene (just static).

---

## Rules of thumb

- Never animate on initial page load except the hero.
- Never stack two animations on the same element back-to-back — let one finish.
- Always `once: true` — section reveals are one-shot, not re-triggerable.
- Set `margin: "-100px"` so animations start a bit before the element fully enters the viewport (feels snappier).
