Build a complete, production-ready single-page website for 
"NovaCrystara AI Labs Ltd" — a premium AI innovation ecosystem 
based in London. The website must look world-class, cinematic, 
and premium — NOT like a bootcamp or gaming site.

════════════════════════════════════════
TECH STACK
════════════════════════════════════════
- Next.js 14 (App Router)
- Tailwind CSS (for layout and spacing)
- Framer Motion (for all scroll animations, 
  reveals, and transitions)
- Three.js (ONLY for hero planet curve/glow 
  and particle star field — nowhere else)
- Plus Jakarta Sans from Google Fonts 
  (via next/font/google)
- TypeScript
- Single page — all sections in app/page.tsx
- Components in /components folder, 
  one file per section

════════════════════════════════════════
LOGO ASSETS
════════════════════════════════════════
Two logo files in /public/assets/:
  main-logo.png — crystal icon (transparent PNG)
  name-logo.png — NOVACRYSTARA AI LABS LTD text

Use main-logo.png as icon everywhere.
Apply this glow on logo:
  filter: drop-shadow(0 0 24px rgba(124,58,237,0.55)) 
          drop-shadow(0 0 8px rgba(196,181,253,0.3))

════════════════════════════════════════
DESIGN SYSTEM (apply globally)
════════════════════════════════════════
Add these to tailwind.config.ts:

colors:
  nc-base:     #06070E   ← page background
  nc-surface1: #07080F   ← section backgrounds
  nc-surface2: #09090F   ← alternate sections
  nc-card:     #0C0A1A   ← card backgrounds
  nc-card2:    #0E0C1C   ← card hover/deep
  nc-purple:   #7C3AED   ← primary CTA
  nc-violet:   #A78BFA   ← primary accent
  nc-lavender: #C4B5FD   ← secondary accent
  nc-rose:     #E8C5D8   ← warm accent
  nc-gold:     #D4AF37   ← founder/premium
  nc-heading:  #F0EEF8   ← headings
  nc-body:     #94A3B8   ← body text
  nc-muted:    #3D3660   ← muted text
  nc-dim:      #2E2A44   ← very dim text

Gradient text utility class (add to globals.css):
.grad-text {
  background: linear-gradient(
    135deg, #A78BFA 0%, #C4B5FD 45%, #E8C5D8 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

Typography (add to tailwind config):
  fontSize:
    hero:    ['64px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }]
    h2:      ['40px', { lineHeight: '1.25', fontWeight: '700' }]
    h3:      ['20px', { lineHeight: '1.3',  fontWeight: '600' }]
    body-lg: ['16px', { lineHeight: '1.75', fontWeight: '400' }]
    eyebrow: ['11px', { lineHeight: '1',    fontWeight: '600', 
                        letterSpacing: '0.14em' }]

Card style (reusable):
  background: linear-gradient(150deg, #0C0A1A, #0E0C1C)
  border: 0.5px solid rgba(167,139,250,0.10)
  border-radius: 14px
  Top shimmer line on every card:
    ::before pseudo — position absolute top
    height: 1px
    background: linear-gradient(90deg, transparent, 
    rgba(167,139,250,0.25), transparent)

Button styles:
  Primary:
    background: linear-gradient(135deg, #6D28D9, #8B5CF6, #A78BFA)
    color: white, border-radius: 8px, padding: 12px 28px
    box-shadow: 0 0 24px rgba(109,40,217,0.35)
    hover: scale(1.02), brightness up slightly
  Secondary:
    border: 0.5px solid rgba(167,139,250,0.20)
    background: rgba(167,139,250,0.04)
    color: #5A4480, border-radius: 8px
    hover: border-color rgba(167,139,250,0.40), 
           background rgba(167,139,250,0.08)

════════════════════════════════════════
FRAMER MOTION — ANIMATION RULES
════════════════════════════════════════
Global rules:
- ALL animations trigger via whileInView 
  (Intersection Observer) — NEVER on page load
- viewport: { once: true, margin: "-100px" }
- Use AnimatePresence where needed
- Easing: [0.25, 0.1, 0.25, 1] (smooth ease)
- Never stack animations back to back

Standard reveal variants (define once, reuse):

fadeUp:
  hidden:  { opacity: 0, y: 40 }
  visible: { opacity: 1, y: 0, 
              transition: { duration: 0.7, ease: [0.25,0.1,0.25,1] }}

fadeIn:
  hidden:  { opacity: 0 }
  visible: { opacity: 1, 
              transition: { duration: 0.6 }}

slideLeft:
  hidden:  { opacity: 0, x: -40 }
  visible: { opacity: 1, x: 0,
              transition: { duration: 0.6 }}

slideRight:
  hidden:  { opacity: 0, x: 40 }
  visible: { opacity: 1, x: 0,
              transition: { duration: 0.6 }}

staggerContainer:
  visible: { transition: { staggerChildren: 0.15 }}

scaleIn:
  hidden:  { opacity: 0, scale: 0.92 }
  visible: { opacity: 1, scale: 1,
              transition: { duration: 0.6 }}

Section-specific animations:
  Hero content:     words appear staggered 80ms each
  Hero stats:       countUp numbers on mount using 
                    useEffect + requestAnimationFrame
  Trust bar logos:  slideLeft stagger 100ms each
  Ecosystem cards:  fadeUp stagger 150ms each
  Flywheel nodes:   scaleIn stagger 300ms each, 
                    then SVG arc paths animate 
                    stroke-dashoffset 0 → full length
  Work cards:       fadeUp stagger 200ms alternating sides
  Tracks grid:      fadeUp stagger 120ms each
  Journey timeline: line draws left→right via 
                    scaleX 0→1 transform-origin left,
                    then step nodes fadeUp stagger
  Success numbers:  countUp animation when in view
                    92 / 45 / 15 counting from 0
  Team cards:       fadeUp stagger 100ms 2x2 grid
  CTA section:      scaleIn gentle zoom

════════════════════════════════════════
THREE.JS — HERO SCENE ONLY
════════════════════════════════════════
Create /components/HeroScene.tsx
Use Three.js ONLY for:

1. STAR FIELD PARTICLES:
   - 800 particles, random positions in sphere 
     radius 400
   - Colors: mix of #A78BFA, #C4B5FD, #ffffff 
     at 0.2–0.6 opacity randomly
   - Size: 0.8–2.5 random
   - Slow rotation: scene.rotation.y += 0.0003
     per frame
   - Some particles pulse opacity via sin wave

2. PLANET CURVE GLOW (the hero centerpiece):
   - Large ellipse geometry at bottom of canvas
   - Width: 2.2x viewport width
   - Position: bottom center, mostly below fold
   - Material: custom shader or MeshBasicMaterial
   - Color: mix of #7C3AED and #C4B5FD
   - Top edge: bright white-purple shimmer line
     (separate thin torus or line geometry)
   - Glow effect: multiple overlapping ellipses 
     at decreasing opacity
     Layer 1: rgba(124,58,237, 0.20) — widest
     Layer 2: rgba(167,139,250, 0.15) — medium  
     Layer 3: rgba(220,200,255, 0.80) — shimmer top line
   - Atmospheric haze below curve:
     radial gradient plane mesh
     rgba(80,30,180, 0.15) fading to transparent
   - Canvas: position absolute, 
     width 100%, height 100%, z-index 0
   - useRef + useEffect for mount/unmount cleanup

════════════════════════════════════════
SECTION 01 — NAVBAR
Component: /components/Navbar.tsx
════════════════════════════════════════
- position: fixed, top 0, full width, z-index 50
- Initial: bg transparent
- On scroll > 80px: 
  background rgba(6,7,14,0.92), 
  backdrop-filter blur(20px),
  border-bottom 0.5px solid rgba(140,100,255,0.10)
  (Framer Motion animate this transition)
- Left side:
  main-logo.png at 28px with glow filter
  + "NOVACRYSTARA" text bold #C4B5FD
  + "AI LABS LTD" text 10px #5A3E8A below
- Center links: 
  What We Do / Our Work / Tracks / Success Stories
  14px, color #3D3660, 
  hover: color #A78BFA, smooth 300ms transition
  Active section highlight via scroll spy
- Right: "Partner With Us →" button (secondary style)
- Mobile: hamburger menu with Framer Motion 
  slide-down drawer

════════════════════════════════════════
SECTION 02 — HERO
Component: /components/Hero.tsx
════════════════════════════════════════
Height: 100vh, overflow hidden
Background: #06070E

Layer order (back to front):
1. HeroScene.tsx (Three.js canvas) — z-index 0
2. Hero content — z-index 10
3. Stats bar — z-index 20

Hero content (centered, text-center):
  - main-logo.png: 72px, centered, with glow
    Framer: initial scale 0.8 opacity 0 
    → animate scale 1 opacity 1, 
    duration 1s, delay 0.2s
  
  - Badge pill: "● AI & TELEMETRY LABS · LONDON, UK"
    border: 0.5px solid rgba(167,139,250,0.20)
    background: rgba(167,139,250,0.04)
    color: #6D4FA0, border-radius 999px
    Framer: fadeIn delay 0.4s
  
  - H1 line 1: "Where AI Talent Meets"
    color: #F0EEF8, font-size 64px weight 800
  - H1 line 2: "Real Business Impact"
    apply .grad-text class
  - H1 line 3: "Engineering that actually ships."
    font-style italic, weight 300, 
    font-size 36px, color #5A4480
    Framer: each line staggered 0.15s apart,
    fadeUp from y:30

  - Subtext paragraph:
    "We build production AI systems for clients, 
    develop world-class tech talent, and launch 
    founders — one ecosystem."
    color: #3D3660, 16px, max-width 480px centered
    Framer: fadeIn delay 0.8s

  - Two buttons side by side centered:
    Primary: "Explore the Ecosystem →"
    Secondary: "View Our Work →"
    Framer: fadeUp delay 1s

Stats bar (position absolute, bottom 0):
  Full width, 4 columns
  background: rgba(8,8,18,0.75)
  backdrop-filter: blur(12px)
  border: 0.5px solid rgba(167,139,250,0.12)
  border-radius: 0 (full width bottom bar)
  
  4 stats with dividers between:
  - 98% / DELIVERY RATE
  - 150+ / BUILDERS TRAINED  
  - 15+ / STARTUPS LAUNCHED
  - London / GLOBAL HQ
  
  Each stat number: countUp animation on mount
  Number color: #C4B5FD, 28px weight 700
  Label: #2E2A3E, 10px uppercase tracking-widest
  Add icon before each number (use SVG icons)
  Dividers: 0.5px solid rgba(167,139,250,0.08)

════════════════════════════════════════
SECTION 03 — TRUST BAR
Component: /components/TrustBar.tsx
════════════════════════════════════════
- Background: linear-gradient(180deg, 
  rgba(8,6,18,0.9), #07080F)
- Border bottom: 0.5px solid rgba(167,139,250,0.06)
- Padding: 24px 0

- Eyebrow label: "TRUSTED TECHNOLOGY PARTNERS"
  10px, #25203A, centered, margin-bottom 16px

- 5 logo items in a row with dividers:
  AWS / Azure / Google Cloud / TensorFlow / Kubernetes
  Use actual SVG logos or white-colored text logos
  Color: #252038 (very dimmed, premium look)
  On hover: color brightens to #4A4070
  Framer: slideLeft stagger 100ms each

════════════════════════════════════════
SECTION 04 — WHAT WE DO
Component: /components/WhatWeDo.tsx
════════════════════════════════════════
- Background: #07080F
- Padding: 100px container

- Eyebrow: "THE NOVACRYSTARA ECOSYSTEM"
- H2: "Three layers." + line break + 
      "One mission." (second line .grad-text)
- Body: "We don't just train people. We build AI 
  products for clients, grow elite talent, and 
  launch the next generation of founders."

- 3 cards in a row (grid-cols-3):
  
  Card 1 — AI Consulting & Delivery:
    icon: ⚡ in rgba(167,139,250,0.08) bg
    number: "01" dimmed top-left
    title: "AI Consulting & Delivery"
    desc: "Production-grade AI systems for real 
    clients. IoT, multicloud, data pipelines — 
    end to end."
    link: "Learn more →" color #A78BFA
    bottom accent line: #A78BFA
  
  Card 2 — Innovation Tracks:
    icon: 🔬 in rgba(196,181,253,0.07) bg
    number: "02"
    title: "Innovation Tracks"
    desc: "Live client projects from day one. 
    Real work, expert mentorship, real outcomes."
    link: "Explore tracks →" color #C4B5FD
    bottom accent: #C4B5FD
  
  Card 3 — Startup Launchpad:
    icon: 🚀 in rgba(232,197,216,0.07) bg
    number: "03"
    title: "Startup Launchpad"
    desc: "From intern to founder. Funding access, 
    mentorship, and a global network to launch 
    your venture."
    link: "Start journey →" color #E8C5D8
    bottom accent: #E8C5D8
  
  Framer: staggerContainer + fadeUp 0.15s stagger

════════════════════════════════════════
SECTION 05 — BUSINESS MODEL FLYWHEEL
Component: /components/Flywheel.tsx
════════════════════════════════════════
- Background: #06070E
- Padding: 100px container
- Center ambient orb behind flywheel:
  300px radial-gradient rgba(100,50,220,0.07)

- Eyebrow: "HOW IT WORKS"
- H2: "The NC " + "Flywheel" (.grad-text)
- Body: "A self-sustaining ecosystem where clients, 
  talent, and NC grow together in one 
  continuous loop."

FLYWHEEL SVG (the critical section):
Build as inline SVG or SVG component
viewBox: "0 0 600 420"

Triangle layout:
  CLIENTS node:     cx=300, cy=80   (top center)
  NC node:          cx=460, cy=310  (bottom right)
  BUILDERS node:    cx=140, cy=310  (bottom left)

Each node = circle (r=60):
  - Double ring: outer stroke rgba(167,139,250,0.3)
                 inner stroke rgba(167,139,250,0.15) dashed
  - Fill: radial gradient dark purple
  - Center icon (emoji or SVG icon)
  - Title text below icon, bold, #C4B5FD
  - Description text, 12px, #4A4070

NC node special styling:
  - Slightly larger glow
  - Fill: darker gradient #2A1A50 → #130E28
  - stroke: rgba(167,139,250,0.5) brighter
  - NC crystal logo in center (img tag inside SVG 
    using foreignObject or image tag)
  - Purple glow filter applied

CURVED ARC ARROWS (3 connecting arcs):
Use SVG <path> with cubic bezier curves

Arc 1: CLIENTS → NC (right side)
  d="M 348 100 C 450 120, 460 200, 440 260"
  stroke: url(#grad-arc1) — purple gradient
  stroke-width: 1.5
  stroke-dasharray: 6 4
  marker-end: url(#arrowhead-purple)
  Label "Pays NC" beside arc

Arc 2: NC → BUILDERS (bottom)
  d="M 400 348 C 360 390, 220 390, 180 348"
  stroke: url(#grad-arc2)
  stroke-dasharray: 6 4
  marker-end: url(#arrowhead-lavender)
  Label "NC pays builders" below arc

Arc 3: BUILDERS → CLIENTS (left side)
  d="M 100 272 C 80 180, 180 100, 252 88"
  stroke: url(#grad-arc3)
  stroke-dasharray: 6 4
  marker-end: url(#arrowhead-rose)
  Label "Talent delivers" beside arc

Arrowhead markers:
  Define 3 <marker> elements with triangle paths
  Colors: #A78BFA / #C4B5FD / #E8C5D8

FROM BUILDER TO FOUNDER card (right side):
  position: absolute right of SVG
  background: linear-gradient(135deg, 
    rgba(212,175,55,0.08), rgba(160,120,20,0.04))
  border: 0.5px solid rgba(212,175,55,0.30)
  border-radius: 14px, padding 20px
  Top shimmer: gold gradient
  Icon: 🌟 or rocket
  Title: "FROM BUILDER TO FOUNDER" 
         color #D4AF37, bold
  Desc: "Leverage income & ownership 
         to launch your own venture"
         color #6B5520
  
  Gold dashed arrow from NC node to this card:
    stroke: #D4AF37
    stroke-dasharray: 4 4
    marker-end: gold arrowhead

FLYWHEEL SCROLL ANIMATION (Framer Motion):
  On whileInView trigger:
  1. Delay 0s:   CLIENTS node scaleIn 
                 (scale 0→1, opacity 0→1, 300ms)
  2. Delay 0.3s: NC node scaleIn
  3. Delay 0.6s: BUILDERS node scaleIn
  4. Delay 0.9s: Arc 1 draws (stroke-dashoffset 
                 animation 500ms)
  5. Delay 1.2s: Arc 2 draws (500ms)
  6. Delay 1.5s: Arc 3 draws (500ms)
  7. Delay 1.8s: FOUNDER card slides in from right
                 (x: 40→0, opacity 0→1)
  8. Delay 2.0s: Legend dots fadeIn

Legend bottom row:
  3 colored dots with labels:
  ● Clients fund NC  ● NC pays builders  ● Builders → Founders

════════════════════════════════════════
SECTION 06 — OUR WORK
Component: /components/OurWork.tsx
════════════════════════════════════════
- Background: #07080F
- Padding: 100px container

- Eyebrow: "REAL-WORLD DELIVERY"
- H2: "What we build" + line break + 
      "for clients" (.grad-text)
- Body: "Production systems delivered. Not 
  assignments. Not demos. Real enterprise-grade 
  AI solutions."

- 2x2 grid of project cards:

  Card 1 — Smart IoT Analytics Platform:
    label: "PROJECT 01"
    title: "Smart IoT Analytics Platform"
    desc: "Device data collection → Real-time 
    processing → AI analytics → Cloud deployment 
    → Automated monitoring"
    tags: IoT / AI / Cloud / DevOps

  Card 2 — Multicloud ML Infrastructure:
    label: "PROJECT 02"
    title: "Multicloud ML Infrastructure"
    desc: "ML model training → Multi-cloud 
    deployment → DevOps automation → 
    Performance optimization at scale"
    tags: AWS / Azure / ML / GCP

  Card 3 — Enterprise DevOps Pipeline:
    label: "PROJECT 03"
    title: "Enterprise DevOps Pipeline"
    desc: "CI/CD → Container orchestration → 
    Multi-environment deployment → Intelligent 
    scaling"
    tags: Docker / Kubernetes / Jenkins

  Card 4 — Data-Driven AI Solutions:
    label: "PROJECT 04"
    title: "Data-Driven AI Solutions"
    desc: "Data warehouse → ETL pipelines → 
    AI model integration → BI dashboards → 
    Agile delivery"
    tags: Data Eng / AI / BI / ETL

  Tag style: 
    background: rgba(167,139,250,0.05)
    border: 0.5px solid rgba(167,139,250,0.12)
    color: #4A4070, font-size 11px, 
    border-radius 4px, padding 2px 8px

  Framer: cards fadeUp alternating left/right 
  stagger 200ms each

════════════════════════════════════════
SECTION 07 — INNOVATION TRACKS
Component: /components/Tracks.tsx
════════════════════════════════════════
- Background: #06070E
- Padding: 100px container

- Eyebrow: "SPECIALISATION PATHWAYS"
- H2: "Choose your" + line break + 
      "Innovation Track" (.grad-text)
- Body: "Each track puts you on live client 
  projects from day one. Pick your domain, 
  build real systems, earn verified credentials."

- 3x2 grid of track cards (6 total):

  Each card has:
  - Top row: difficulty badge + duration
  - Title (H3)
  - Description
  - "Apply to build →" link in #A78BFA
  - Bottom accent line (2px, color matches badge)
  - Card hover: translateY(-4px), 
    border-color rgba(167,139,250,0.25)
    transition 300ms

  Track 1: AI Agents
    badge: "Advanced" — red bg/text
    duration: "⏱ 12 Weeks"
    desc: "Autonomous intelligence. Agent logic, 
    prompt chaining, vector stores, 
    tool integration."
    accent: #F87171

  Track 2: IoT & Edge
    badge: "Intermediate" — amber
    duration: "⏱ 10 Weeks"
    desc: "Bridge sensors and cloud. Real-time 
    telemetry, edge computing, device security."
    accent: #FBBF24

  Track 3: Multi Cloud
    badge: "Advanced" — red
    duration: "⏱ 12 Weeks"
    desc: "Architect across AWS, Azure, GCP. 
    Kubernetes, global load balancing, 
    cost optimisation."
    accent: #34D399

  Track 4: Data Engineering
    badge: "Intermediate" — amber
    duration: "⏱ 8 Weeks"
    desc: "Robust pipelines. Data warehousing, 
    ETL with Airflow, distributed Spark."
    accent: #A78BFA

  Track 5: Project Management
    badge: "Beginner" — green
    duration: "⏱ 6 Weeks"
    desc: "Lead cross-functional teams. Budget, 
    risk, agile methodologies done right."
    accent: #E8C5D8

  Track 6: Scrum Master
    badge: "Beginner" — green
    duration: "⏱ 6 Weeks"
    desc: "High-velocity agile. Sprint planning, 
    burn-down charts, self-organising teams."
    accent: #C4B5FD

  Framer: fadeUp stagger 0.12s each card

════════════════════════════════════════
SECTION 08 — THE JOURNEY
Component: /components/Journey.tsx
════════════════════════════════════════
- Background: #07080F
- Padding: 100px container

- Eyebrow: "THE JOURNEY"
- H2: "Builder to founder" + line break + 
      "in 4 stages" (.grad-text)

- 4-step horizontal timeline:

  Connecting line:
    Full width horizontal line between step numbers
    background: linear-gradient(90deg, 
      rgba(167,139,250,0.15), rgba(196,181,253,0.35), 
      rgba(232,197,216,0.25), rgba(167,139,250,0.10))
    height: 0.5px, position absolute at circle centers
  
  Framer animation:
    Line: scaleX 0→1, transformOrigin left, 
    duration 1s, then nodes stagger in

  Step 1: 
    num: "01" circle — #A78BFA
    title: "Apply & Match"
    desc: "Interview and get matched to a live 
    client project track that fits your level"

  Step 2:
    num: "02" circle — #C4B5FD
    title: "Build Real Products"
    desc: "Ship production-ready AI systems 
    alongside world-class expert leads"

  Step 3:
    num: "03" circle — #E8C5D8
    title: "Earn & Own"
    desc: "Gain income, verified credentials, 
    and equity in what you build"

  Step 4:
    num: "04" circle — gradient purple→rose
    title: "Launch or Lead"
    desc: "Found your own AI startup or join 
    a world-class team as a senior engineer"

  Step number circles:
    width/height: 44px, border-radius 50%
    background: linear-gradient(135deg, #16112A, #1E1838)
    border: 0.5px solid rgba(167,139,250,0.30)
    color: #A78BFA, font-size 14px weight 700

════════════════════════════════════════
SECTION 09 — SUCCESS STORIES
Component: /components/SuccessStories.tsx
════════════════════════════════════════
- Background: #06070E
- Padding: 100px container

- Eyebrow: "PROVEN OUTCOMES"
- H2: "Results that" + line break + 
      "speak for themselves" (.grad-text)

- 3 stat cards (grid-cols-3):
  Each with top shimmer line
  
  Stat 1: 
    number: 92 (countUp) + "%"
    gradient: #A78BFA → #C4B5FD
    label: "CAREER ADVANCEMENT"
  
  Stat 2:
    number: 45 (countUp) + "%"
    gradient: #C4B5FD → #E8C5D8
    label: "AVG SALARY INCREASE"
  
  Stat 3:
    number: 15 (countUp) + "+"
    gradient: #E8C5D8 → #A78BFA
    label: "STARTUPS LAUNCHED"

  CountUp animation:
    useEffect + requestAnimationFrame
    duration: 2000ms, easing: easeOutQuart
    triggers when section enters viewport

- 2 testimonial quote cards (grid-cols-2):
  
  Quote card style:
    Large opening quote mark " in #1E1A30
    Italic quote text in #4A4070
    Author name in #A78BFA bold
    Role/company in #211C35

  Quote 1:
    text: "From intern to founder in 8 months. 
    NovaCrystara gave me the skills, the network, 
    and the confidence to launch my own 
    AI SaaS company."
    author: Sarah Chen
    role: Founded AI SaaS Company

  Quote 2:
    text: "I landed my dream role as Senior ML 
    Engineer. The real client projects made all 
    the difference in every single interview I had."
    author: Michael Davis
    role: Senior ML Engineer

  Framer: fadeUp stagger for all 5 elements

════════════════════════════════════════
SECTION 10 — OUR TEAM
Component: /components/Team.tsx
════════════════════════════════════════
- Background: #07080F
- Padding: 100px container

- Eyebrow: "THE PEOPLE BEHIND NC"
- H2: "Veterans. Researchers." + line break + 
      "Founders." (.grad-text)

- 2x2 grid of team cards:
  Each card: horizontal layout (icon left, text right)
  Icon box: 44px, border-radius 12px, 
            colored bg, emoji icon

  Card 1 — Industry Veterans:
    icon bg: rgba(167,139,250,0.08), icon: 🏛️
    name: "Industry Veterans"
    role: "Google · Microsoft · Amazon" #A78BFA
    desc: "20+ years combined experience in 
    large-scale software development, cloud 
    infrastructure, and product strategy."

  Card 2 — AI Researchers:
    icon bg: rgba(196,181,253,0.07), icon: 🔬
    name: "AI Researchers"
    role: "PhDs · Published Authors" #C4B5FD
    desc: "PhDs in Machine Learning from top 
    universities. Deep learning, NLP, and 
    computer vision specialists."

  Card 3 — Entrepreneurs:
    icon bg: rgba(232,197,216,0.07), icon: 🚀
    name: "Successful Entrepreneurs"
    role: "$50M+ Raised · Multiple Exits" #E8C5D8
    desc: "Founded companies with successful 
    exits. Built products used by millions 
    of users globally."

  Card 4 — Dedicated Mentors:
    icon bg: rgba(167,139,250,0.05), icon: 🎯
    name: "Dedicated Mentors"
    role: "1-on-1 · Personalised" #A78BFA
    desc: "Career coaching, skill development 
    planning, and networking throughout 
    your entire journey."

  Framer: fadeUp stagger 0.10s each

════════════════════════════════════════
SECTION 11 — CTA
Component: /components/CTA.tsx
════════════════════════════════════════
- Background: #06070E
- Padding: 120px container
- text-align: center
- overflow: hidden, position: relative

Background layers:
  1. Dot grid (same as hero, smaller opacity)
  2. Ambient purple orb center
  3. MINI PLANET CURVE at bottom:
     Same technique as hero but smaller
     width: 140%, height: 200px
     position absolute bottom -60px
     This closes the page with same 
     cinematic feel as the opening

Content:
  - main-logo.png: 52px centered, glow filter
    Framer: scaleIn 0.8→1, opacity 0→1
  
  - H2: "Ready to build" + line break + 
        "something real?" (.grad-text)
    font-size: 52px, weight 800
  
  - Body: "Join the NC ecosystem — as a client 
    who needs AI delivered, a builder ready to 
    grow, or a future founder ready to launch."
    max-width: 440px, centered, color #3D3660
  
  - 3 buttons row centered:
    1. Primary: "Apply to Build"
    2. Secondary: "Partner as a Client"
    3. Secondary: "Schedule a Call"
  
  Framer: scaleIn for whole section, 
  buttons fadeUp stagger 0.15s

════════════════════════════════════════
SECTION 12 — FOOTER
Component: /components/Footer.tsx
════════════════════════════════════════
- Background: #04050B
- Border top: 0.5px solid rgba(167,139,250,0.07)
- Padding: 60px container 40px

Top grid (4 columns):
  
  Col 1 — Brand:
    main-logo.png 22px + "NOVACRYSTARA AI LABS" text
    tagline: "Building AI products. Growing 
    world-class talent. Launching the next 
    generation of founders."
    contact@novacrystara.ai
    www.novacrystara.ai
  
  Col 2 — What We Do:
    AI Consulting
    Innovation Tracks
    Startup Launchpad
    Our Work

  Col 3 — Company:
    About NC
    Our Team
    Success Stories
    Careers

  Col 4 — Resources:
    Innovation Roadmap
    Tech Blog
    Community
    Contact Us

Footer column title: 
  10px, uppercase, letter-spacing 0.10em, 
  color #2E2A40, margin-bottom 14px

Footer links:
  11px, color #1A1628, margin-bottom 6px
  hover: color #4A4070, transition 200ms

Bottom bar (border-top divider):
  Left: "© 2025 NovaCrystara AI Labs Ltd. 
         All rights reserved. London, UK."
         9px, #131020
  Right: 3 social buttons (LinkedIn / Twitter / Instagram)
    26px squares, border-radius 6px
    background: rgba(167,139,250,0.04)
    border: 0.5px solid rgba(167,139,250,0.08)
    text: "in" / "tw" / "ig"
    hover: border-color rgba(167,139,250,0.2)

════════════════════════════════════════
RESPONSIVE BREAKPOINTS
════════════════════════════════════════
Desktop: 1280px+ — full layout as described
Laptop:  1024px  — slight padding reduction
Tablet:  768px   — 2-col grids, 
                   tracks 2x3 instead of 3x2
Mobile:  375px   — all single column,
                   hero H1 reduces to 40px,
                   planet curve scales down,
                   hamburger nav

════════════════════════════════════════
PERFORMANCE REQUIREMENTS
════════════════════════════════════════
- Three.js canvas: dispose geometries and 
  materials on component unmount
- Images: next/image with priority on logo
- Fonts: next/font/google with display: swap
- All animations: respect 
  prefers-reduced-motion media query
  (disable all Framer Motion animations if set)
- Intersection Observer: once: true 
  (don't re-animate on scroll up)
- No animation on initial page load 
  except hero elements

════════════════════════════════════════
FILE STRUCTURE
════════════════════════════════════════
novacrystara/
├── app/
│   ├── page.tsx          ← imports all sections
│   ├── layout.tsx        ← font, metadata, globals
│   └── globals.css       ← .grad-text + base styles
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── HeroScene.tsx     ← Three.js canvas
│   ├── TrustBar.tsx
│   ├── WhatWeDo.tsx
│   ├── Flywheel.tsx      ← SVG flywheel + animation
│   ├── OurWork.tsx
│   ├── Tracks.tsx
│   ├── Journey.tsx
│   ├── SuccessStories.tsx
│   ├── Team.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── public/
│   └── assets/
│       ├── main-logo.png
│       └── name-logo.png
├── tailwind.config.ts
├── next.config.js
└── package.json

════════════════════════════════════════
PACKAGE.JSON DEPENDENCIES
════════════════════════════════════════
{
  "dependencies": {
    "next": "14.2.0",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11.0.0",
    "three": "^0.163.0",
    "@types/three": "^0.163.0",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.0.1",
    "postcss": "^8"
  }
}

════════════════════════════════════════
IMPORTANT NOTES FOR CLAUDE CODE
════════════════════════════════════════
1. Build ALL 12 components completely — 
   do not leave any section as placeholder
2. The Flywheel SVG arc animations are critical — 
   implement the stroke-dashoffset scroll 
   animation properly using Framer Motion
3. The hero planet curve is the most important 
   visual — spend the most effort here making 
   the Three.js glow look cinematic
4. Every card must have the top shimmer line 
   pseudo-element
5. CountUp animations must use 
   Intersection Observer — not just mount
6. All scroll animations must use 
   whileInView with once: true
7. The .grad-text class must be applied to 
   the second line of every H2 heading
8. Place main-logo.png in the hero center, 
   navbar left, CTA center, and footer
9. Make sure Three.js canvas has 
   pointer-events: none so it doesn't 
   block scroll/click
10. Test that the planet curve looks identical 
    in both hero and CTA sections