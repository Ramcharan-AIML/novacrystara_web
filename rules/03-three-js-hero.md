# 03 — Three.js Hero Scene

Three.js is used **only** in `components/HeroScene.tsx`. Both the Hero section (`variant="full"`) and the CTA section (`variant="mini"`) render the same component with different particle density.

---

## Why this is the only Three.js usage

The hero's primary visual is now `public/assets/Background_image_Nova.png` — a high-resolution NovaCrystara backdrop. Three.js is restricted to **drifting particle stars over the image**, nothing else. Everywhere else (Flywheel arcs, journey timeline, etc.) is plain SVG + Framer Motion, which is cheaper, accessible, and crisp at any zoom.

Earlier iterations included a Three.js "planet curve" glow at the bottom of the hero. That has been removed — the background image carries the cinematic atmosphere now, and a synthetic curve on top would clash.

---

## Hero layering (Hero.tsx → top of stack)

Back → front:

1. `<Image>` of `Background_image_Nova.png` (`fill`, `object-cover`, `priority`, `z-0`)
2. Radial vignette overlay (`z-1`) — darkens edges so the headline reads cleanly without flattening the image's centre
3. `<HeroScene variant="full" />` — 800 drifting particles in additive blend (`z-0` inside its own container, but it sits as the next sibling)
4. Hero content (logo, badge, H1, subtext, buttons) at `z-10`
5. Stats bar at `z-20`

The Three.js canvas is `pointer-events: none` so scroll and clicks pass straight through to the content above the image.

---

## Star field configuration

| Knob | Where | `full` | `mini` |
| --- | --- | --- | --- |
| Particle count | `const COUNT` | 800 | 450 |
| Point size | `PointsMaterial.size` | 1.6 | 1.3 |
| Base opacity | `PointsMaterial.opacity` | 0.7 (pulsing 0.48 ↔ 0.72) | same |
| Rotation speed | `particles.rotation.y +=` | 0.0003 | 0.0003 |

Positions are sampled in a sphere of radius 400 using a cube-root distribution to keep 3D density uniform. Colours are randomly drawn from `#A78BFA / #C4B5FD / #FFFFFF` per particle.

---

## CTA mini variant

The CTA section (`components/CTA.tsx`) reuses `HeroScene` with `variant="mini"` to get a lighter star field over its dot-grid + ambient orb backdrop. This closes the page with the same particle motif that opens it, even though the planet curve is gone from both ends.

---

## Cleanup contract (must follow)

Single biggest leak risk. Each Three.js geometry / material / texture **must** be pushed to a `disposables` array and disposed in the effect cleanup:

```ts
const disposables: Array<THREE.BufferGeometry | THREE.Material | THREE.Texture> = [];
// … push every geometry & material …
return () => {
  cancelAnimationFrame(rafId);
  window.removeEventListener("resize", onResize);
  disposables.forEach((d) => d.dispose());
  renderer.dispose();
  if (renderer.domElement.parentNode === mount) {
    mount.removeChild(renderer.domElement);
  }
};
```

If you add a new mesh, also add its geometry and material to `disposables` — there is no automatic tracking.

---

## Hard rules

- **`pointer-events: none`** on the mounting div so the canvas never blocks click or scroll.
- **`setPixelRatio(Math.min(window.devicePixelRatio, 2))`** — uncapped DPR on retina screens tanks framerate.
- **`alpha: true`** on the renderer — the background colour comes from the image / CSS layer beneath, not the scene clear colour.
- **`AdditiveBlending` + `transparent: true` + `depthWrite: false`** on the particles — gives the soft cinematic bloom over the dark image.
- **Reduced motion:** the animation loop branches on `prefers-reduced-motion` — the scene still renders (static stars), but rotation and the opacity pulse are skipped.
- **SSR:** the component is `"use client"`. Three.js touches `window` and DOM — no SSR work happens. Next.js handles this correctly without `dynamic(..., { ssr: false })`.

---

## Where to swap the background

`components/Hero.tsx`, the first `<Image>` after the section opens. Change `src` and the filename in `public/assets/`. Keep `fill` + `object-cover` + `priority` for correct sizing and LCP performance.
