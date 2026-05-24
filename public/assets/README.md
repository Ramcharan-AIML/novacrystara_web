# Brand assets

Replace these two files with the actual brand PNGs (same names, same paths):

- **`main-logo.png`** — the silver/purple crystal icon (transparent background)
- **`name-logo.png`** — the silver "NOVACRYSTARA AI LABS LTD" wordmark (transparent background)

The current files are 1×1 transparent placeholders so the dev server doesn't return 404s. Once you drop in the real PNGs they will appear automatically — no code change needed.

Components that consume these:
- `components/Navbar.tsx` (small crystal in top-left)
- `components/Hero.tsx` (large crystal above the H1)
- `components/Flywheel.tsx` (NC node centre — uses `main-logo.png` via SVG `<image>`)
- `components/CTA.tsx` (crystal above "Ready to build something real?")
- `components/Footer.tsx` (tiny crystal in brand column)
