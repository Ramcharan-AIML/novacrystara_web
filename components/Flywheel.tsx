"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ThreeNoiseCircle
 * A highly performant 2D Canvas particle system that renders a beautiful shimmering
 * particle/sand texture inside each circular node. It simulates WebGL additive particle blending
 * without consuming precious browser WebGL contexts, avoiding context-loss crashes completely.
 */
function ThreeNoiseCircle({ theme }: { theme: "clients" | "nc" | "builders" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI screens for pixel-perfect clarity
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.clientWidth || 120;
    let height = canvas.clientHeight || 120;

    const initCanvas = () => {
      width = canvas.clientWidth || 120;
      height = canvas.clientHeight || 120;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    initCanvas();

    // Particle distribution setup
    const COUNT = 1600;
    const particles: Array<{
      angle: number;
      r: number;
      size: number;
      speed: number;
      phase: number;
      alpha: number;
    }> = [];

    // Core (deep center glow) to edge (saturated neon border glow) colors
    let coreColor = { r: 10, g: 9, b: 26 };     // Deep indigo background
    let edgeColor = { r: 6, g: 182, b: 212 };   // Cyan for clients

    if (theme === "nc") {
      coreColor = { r: 22, g: 14, b: 53 };     // Deep violet background
      edgeColor = { r: 236, g: 72, b: 153 };   // Fuchsia for NC
    } else if (theme === "builders") {
      coreColor = { r: 10, g: 9, b: 26 };      // Deep indigo background
      edgeColor = { r: 139, g: 92, b: 246 };   // Violet for builders
    }

    const radius = Math.min(width, height) / 2 * 0.95;

    for (let i = 0; i < COUNT; i++) {
      // Uniform random coordinates in polar circle space (sqrt provides even area density)
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;

      particles.push({
        angle,
        r,
        size: Math.random() * 0.95 + 0.35, // extremely fine sand points (0.35px - 1.3px)
        speed: (Math.random() * 0.012 + 0.006) * (Math.random() < 0.5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.65 + 0.3,
      });
    }

    let animationFrameId = 0;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Clear previous frames
      ctx.clearRect(0, 0, width, height);

      // 1. Draw a soft, glowing background radial gradient for the additive core glow
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        radius
      );
      bgGrad.addColorStop(0, `rgb(${coreColor.r}, ${coreColor.g}, ${coreColor.b})`);
      bgGrad.addColorStop(0.75, `rgba(${edgeColor.r}, ${edgeColor.g}, ${edgeColor.b}, 0.04)`);
      bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw our shimmering cosmic sand particles
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];

        // Slowly swirl particles
        p.angle += p.speed * 0.035;

        // Apply harmonic radial breathing coordinate wobble
        const wobble = Math.sin(elapsed * 2.2 + p.phase) * 0.45;
        const currentR = p.r + wobble;
        // Polar to Cartesian positioning (centered in canvas)
        const x = width / 2 + currentR * Math.cos(p.angle);
        const y = height / 2 + currentR * Math.sin(p.angle);
        // Sinusoidal shimmer opacity
        const alpha = p.alpha * (0.8 + Math.sin(elapsed * 1.8 + p.phase) * 0.16);
        // Radial color interpolation: particles brighten near the outer boundary
        const distRatio = Math.min(1, currentR / radius);
        const rColor = Math.round(coreColor.r + (edgeColor.r - coreColor.r) * distRatio);
        const gColor = Math.round(coreColor.g + (edgeColor.g - coreColor.g) * distRatio);
        const bColor = Math.round(coreColor.b + (edgeColor.b - coreColor.b) * distRatio);
        // Draw subpixel anti-aliased square particle
        ctx.fillStyle = `rgba(${rColor}, ${gColor}, ${bColor}, ${alpha})`;
        ctx.fillRect(x - p.size / 2, y - p.size / 2, p.size, p.size);
      }

      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    const onResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-[1px] w-full h-full rounded-full overflow-hidden pointer-events-none z-0"
    />
  );
}

/**
 * Helper to calculate mathematically perfect circular SVG arcs.
 */
function getArcPath(
  cx: number,
  cy: number,
  r: number,
  startAngleDeg: number,
  endAngleDeg: number
) {
  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad = (endAngleDeg * Math.PI) / 180;
  const startX = cx + r * Math.cos(startRad);
  const startY = cy + r * Math.sin(startRad);
  const endX = cx + r * Math.cos(endRad);
  const endY = cy + r * Math.sin(endRad);

  const largeArcFlag = Math.abs(endAngleDeg - startAngleDeg) <= 180 ? 0 : 1;
  const sweepFlag = 1; // Always clockwise

  return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
}

export default function Flywheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position within section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // CLIENTS is always fully visible (First Circle)
  const clientsOpacity = 1;
  const clientsScale = 1;

  // 1. First Arrow draws from CLIENTS (top) to NC (bottom-right)
  const clientsToNcPathLength = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);
  // Fades in the arrowhead exactly when it touches the next circle
  const arrow1HeadOpacity = useTransform(scrollYProgress, [0.26, 0.28], [0, 1]);

  // 2. Second Circle (NC) scales and glows in when the arrow touches it
  const ncOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const ncScale = useTransform(scrollYProgress, [0.25, 0.35], [0.8, 1]);

  // 3. Second Arrow draws from NC (bottom-right) to BUILDERS (bottom-left)
  const ncToBuildersPathLength = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  // Fades in the arrowhead exactly when it touches the next circle
  const arrow2HeadOpacity = useTransform(scrollYProgress, [0.53, 0.55], [0, 1]);

  // 4. Third Circle (BUILDERS) scales and glows in when the arrow touches it
  const buildersOpacity = useTransform(scrollYProgress, [0.52, 0.62], [0, 1]);
  const buildersScale = useTransform(scrollYProgress, [0.52, 0.62], [0.8, 1]);

  // 5. Third Arrow draws from BUILDERS (bottom-left) to CLIENTS (top)
  const buildersToClientsPathLength = useTransform(scrollYProgress, [0.62, 0.77], [0, 1]);
  // Fades in the arrowhead exactly when it touches the next circle
  const arrow3HeadOpacity = useTransform(scrollYProgress, [0.75, 0.77], [0, 1]);

  // 6. Gold Dashed Arrow draws from NC (bottom-right) to Founders Card
  const ncToFounderPathLength = useTransform(scrollYProgress, [0.77, 0.88], [0, 1]);
  // Fades in the golden arrowhead exactly when it touches the card
  const goldArrowHeadOpacity = useTransform(scrollYProgress, [0.86, 0.88], [0, 1]);

  // 7. Golden Founders Card fades, scales, and slides in
  const founderCardOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const founderCardScale = useTransform(scrollYProgress, [0.85, 0.95], [0.8, 1]);

  // Locked SVG Geometry constants (600 x 440 circumcircle coordinates)
  const geom = {
    cx: 300,   // Circumcircle center X
    cy: 258,   // Circumcircle center Y
    r: 168,    // Circumcircle radius
  };

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-nc-base">
      {/* Sticky section container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-12">
        {/* ambient background orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-1/4 top-1/2 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 flex flex-col items-center">
          {/* Header */}
          <div className="text-center max-w-2xl select-none">
            <p className="nc-eyebrow">HOW IT WORKS</p>
            <h2 className="mt-3 text-[32px] font-extrabold leading-tight text-nc-heading sm:text-[38px]">
              The NC <span className="grad-text">Business Model</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#5D5380] sm:text-[15px]">
              A self-sustaining ecosystem where clients, talent, and NC grow
              together in one continuous, perfectly aligned loop.
            </p>
          </div>

          {/* Interactive diagram area - NO card block container background or border! Seamless integration. */}
          <div className="w-full max-w-[1100px] mt-8 grid items-center gap-12 lg:grid-cols-[1.3fr_300px] select-none">
            
            {/* Left column: SVG viewport diagram (Locks nodes and curves in 100% perfect, unified coordinate system) */}
            <div className="relative w-full max-w-[1220px] mx-auto aspect-[600/440]">
              <svg
                viewBox="0 0 600 440"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
              >
                <defs>
                  {/* Neon glow gradients for paths */}
                  <linearGradient id="grad-clients-nc" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="grad-nc-builders" x1="1" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="grad-builders-clients" x1="0" x2="1" y1="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* Arc 1: CLIENTS -> NC (Pays NC) */}
                <motion.path
                  d={getArcPath(geom.cx, geom.cy, geom.r, -66, -4.5)}
                  fill="none"
                  stroke="url(#grad-clients-nc)"
                  strokeWidth="3.5"
                  className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  style={{ pathLength: clientsToNcPathLength }}
                />

                {/* Arc 2: NC -> BUILDERS (NC pays builders) */}
                <motion.path
                  d={getArcPath(geom.cx, geom.cy, geom.r, 46.5, 133.5)}
                  fill="none"
                  stroke="url(#grad-nc-builders)"
                  strokeWidth="3.5"
                  className="drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]"
                  style={{ pathLength: ncToBuildersPathLength }}
                />

                {/* Arc 3: BUILDERS -> CLIENTS (Talent delivers) */}
                <motion.path
                  d={getArcPath(geom.cx, geom.cy, geom.r, 182.5, 246)}
                  fill="none"
                  stroke="url(#grad-builders-clients)"
                  strokeWidth="3.5"
                  className="drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]"
                  style={{ pathLength: buildersToClientsPathLength }}
                />

                {/* Gold Dashed Arrow: NC -> Founders Card (Desktop: Curves elegantly to the right) */}
                <motion.path
                  d="M 522 310 C 555 310, 580 290, 595 260"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3.0"
                  strokeDasharray="5 5"
                  className="hidden lg:block drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  style={{ pathLength: ncToFounderPathLength }}
                />

                {/* Gold Dashed Arrow: NC -> Founders Card (Mobile/Tablet: Goes straight vertically downwards) */}
                <motion.path
                  d="M 460 372 L 460 432"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3.0"
                  strokeDasharray="5 5"
                  className="block lg:hidden drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  style={{ pathLength: ncToFounderPathLength }}
                />

                {/* --- LARGE SOLID VECTOR ARROWHEADS (Fade in at tip exactly on touch) --- */}
                {/* Arrow 1 Head */}
                <g transform="translate(467.5, 245.2) rotate(85.5)">
                  <motion.path
                    d="M -10 -6.5 L 3.5 0 L -10 6.5 Z"
                    fill="#A78BFA"
                    style={{ opacity: arrow1HeadOpacity }}
                  />
                </g>

                {/* Arrow 2 Head */}
                <g transform="translate(193.3, 387.5) rotate(219.5)">
                  <motion.path
                    d="M -10 -6.5 L 3.5 0 L -10 6.5 Z"
                    fill="#8B5CF6"
                    style={{ opacity: arrow2HeadOpacity }}
                  />
                </g>

                {/* Arrow 3 Head */}
                <g transform="translate(221.3, 109.5) rotate(332)">
                  <motion.path
                    d="M -10 -6.5 L 3.5 0 L -10 6.5 Z"
                    fill="#06B6D4"
                    style={{ opacity: arrow3HeadOpacity }}
                  />
                </g>

                {/* Gold Arrow Head (Desktop: At right border pointing to the card) */}
                <g transform="translate(595, 260) rotate(-60)" className="hidden lg:block">
                  <motion.path
                    d="M -10 -6.5 L 3.5 0 L -10 6.5 Z"
                    fill="#D4AF37"
                    style={{ opacity: goldArrowHeadOpacity }}
                  />
                </g>

                {/* Gold Arrow Head (Mobile/Tablet: Points straight down towards the bottom card) */}
                <g transform="translate(460, 432) rotate(90)" className="block lg:hidden">
                  <motion.path
                    d="M -10 -6.5 L 3.5 0 L -10 6.5 Z"
                    fill="#D4AF37"
                    style={{ opacity: goldArrowHeadOpacity }}
                  />
                </g>

                {/* Arc 1 Label: Pays NC */}
                <motion.text
                  x="430"
                  y="200"
                  fill="#C4B5FD"
                  className="text-[10px] sm:text-[11.5px] font-bold tracking-wide select-none"
                  textAnchor="middle"
                  style={{ opacity: clientsToNcPathLength }}
                >
                  Pays NC
                </motion.text>

                {/* Arc 2 Label: NC pays builders */}
                <motion.text
                  x="300"
                  y="410"
                  fill="#A78BFA"
                  className="text-[10px] sm:text-[11.5px] font-bold tracking-wide select-none"
                  textAnchor="middle"
                  style={{ opacity: ncToBuildersPathLength }}
                >
                  NC pays builders
                </motion.text>

                {/* Arc 3 Label: Talent delivers */}
                <motion.text
                  x="180"
                  y="180"
                  fill="#34D399"
                  className="text-[10px] sm:text-[11.5px] font-bold tracking-wide select-none"
                  textAnchor="middle"
                  transform="rotate(-58 180 180)"
                  style={{ opacity: buildersToClientsPathLength }}
                >
                  Talent delivers
                </motion.text>

                {/* ========================================================
                    SVG FOREIGN OBJECTS (Guarantees perfect coordinate locking!)
                    ======================================================== */}
                {/* 1. CLIENTS Node (Top) */}
                <foreignObject
                  x={300 - 62}
                  y={90 - 62}
                  width="124"
                  height="124"
                  className="overflow-visible pointer-events-auto"
                >
                  <motion.div
                    style={{
                      scale: clientsScale,
                      opacity: clientsOpacity,
                      background: "linear-gradient(#080718, #080718) padding-box, linear-gradient(135deg, #06B6D4, #7C3AED) border-box",
                      boxShadow: "0 0 25px rgba(6, 182, 212, 0.25), inset 0 0 15px rgba(124, 58, 237, 0.15)",
                    }}
                    className="w-[124px] h-[124px] rounded-full border border-transparent p-[2px] flex items-center justify-center pointer-events-auto"
                  >
                    <ThreeNoiseCircle theme="clients" />
                    <div className="relative z-10 flex flex-col items-center text-center px-1 select-none">
                      {/* Briefcase/Building Icon */}
                      <svg
                        className="w-6 h-6 text-[#06B6D4]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <span className="mt-1 text-[11px] font-extrabold tracking-wider text-nc-heading uppercase leading-none">
                        CLIENTS
                      </span>
                      <span className="mt-1 text-[7.5px] text-[#A29EB3] max-w-[85px] leading-tight font-medium">
                        Pay for consultation &amp; project delivery
                      </span>
                    </div>
                  </motion.div>
                </foreignObject>

                {/* 2. NC Node (Bottom-Right) */}
                <foreignObject
                  x={460 - 62}
                  y={310 - 62}
                  width="124"
                  height="124"
                  className="overflow-visible pointer-events-auto"
                >
                  <motion.div
                    style={{
                      scale: ncScale,
                      opacity: ncOpacity,
                      background: "linear-gradient(#080718, #080718) padding-box, linear-gradient(135deg, #EC4899, #7C3AED) border-box",
                      boxShadow: "0 0 25px rgba(236, 72, 153, 0.25), inset 0 0 15px rgba(124, 58, 237, 0.15)",
                    }}
                    className="w-[124px] h-[124px] rounded-full border border-transparent p-[2px] flex items-center justify-center pointer-events-auto"
                  >
                    <ThreeNoiseCircle theme="nc" />
                    <div className="relative z-10 flex flex-col items-center text-center px-1 select-none">
                      {/* Purple solid circular NC logo badge */}
                      <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] rounded-full border border-purple-400/35 text-[10px] font-extrabold text-white mb-0.5 shadow-md shadow-purple-950/40">
                        NC
                      </div>
                      <span className="mt-0.5 text-[11px] font-extrabold tracking-wider text-nc-heading uppercase leading-none">
                        NOVACRYSTARA
                      </span>
                      <span className="mt-1 text-[7.5px] text-[#A29EB3] max-w-[85px] leading-tight font-medium">
                        Earns revenue
                      </span>
                    </div>
                  </motion.div>
                </foreignObject>

                {/* 3. BUILDERS Node (Bottom-Left) */}
                <foreignObject
                  x={140 - 62}
                  y={310 - 62}
                  width="124"
                  height="124"
                  className="overflow-visible pointer-events-auto"
                >
                  <motion.div
                    style={{
                      scale: buildersScale,
                      opacity: buildersOpacity,
                      background: "linear-gradient(#080718, #080718) padding-box, linear-gradient(135deg, #8B5CF6, #06B6D4) border-box",
                      boxShadow: "0 0 25px rgba(139, 92, 246, 0.25), inset 0 0 15px rgba(124, 58, 237, 0.15)",
                    }}
                    className="w-[124px] h-[124px] rounded-full border border-transparent p-[2px] flex items-center justify-center pointer-events-auto"
                  >
                    <ThreeNoiseCircle theme="builders" />
                    <div className="relative z-10 flex flex-col items-center text-center px-1 select-none">
                      {/* Users Icon */}
                      <svg
                        className="w-6 h-6 text-[#A78BFA]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span className="mt-1 text-[11px] font-extrabold tracking-wider text-nc-heading uppercase leading-none">
                        BUILDERS
                      </span>
                      <span className="mt-1 text-[7.5px] text-[#A29EB3] max-w-[85px] leading-tight font-medium">
                        Gain income + skills
                      </span>
                    </div>
                  </motion.div>
                </foreignObject>
              </svg>
            </div>

            {/* Right column: Premium Glassmorphic Founders Card */}
            <motion.div
              style={{
                opacity: founderCardOpacity,
                scale: founderCardScale,
                background: "linear-gradient(135deg, rgba(12, 10, 26, 0.96) 0%, rgba(8, 7, 18, 0.96) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: "rgba(212, 175, 55, 0.35)",
                boxShadow: "0 0 35px rgba(212, 175, 55, 0.12), inset 0 0 15px rgba(212, 175, 55, 0.04)",
              }}
              className="relative mx-auto w-full max-w-[300px] rounded-2xl border p-6 flex flex-col select-none z-10"
            >
              {/* Premium top gold highlight strip */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)",
                }}
              />
              
              {/* Rocket Icon in Glowing Golden Square */}
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.08)] text-[#D4AF37] border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.12)]">
                {/* Premium solid launch rocket icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.66 4.34a2.98 2.98 0 0 0-4.24 0L12 7.76l-1.06-1.06a1 1 0 0 0-1.41 0L7.41 8.82a1 1 0 0 0 0 1.41L8.82 11.3l-5.66 5.66a2 2 0 0 0 0 2.83l1.41 1.41a2 2 0 0 0 2.83 0l5.66-5.66 1.06 1.06a1 1 0 0 0 1.41 0l2.12-2.12a1 1 0 0 0 0-1.41L16.24 12l3.41-3.41a2.98 2.98 0 0 0 0-4.25zM6 18a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
                </svg>
              </div>

              <p className="text-[14px] font-extrabold tracking-[0.16em] text-[#D4AF37]/90 leading-none">
                FROM INTERN
              </p>
              <h3 className="mt-1.5 text-[17px] font-extrabold text-[#D4AF37] tracking-wide leading-tight drop-shadow-[0_0_10px_rgba(212,175,55,0.15)]">
                TO FOUNDER
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#BFA56E] font-medium">
                Leverage income &amp; ownership to launch your own venture.
              </p>
            </motion.div>

          </div>

          {/* Legend */}
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 select-none"
          >
            {[
              { color: "#06B6D4", label: "Clients fund NC" },
              { color: "#A78BFA", label: "NC pays builders" },
              { color: "#D4AF37", label: "Builders → Founders" },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-[11px] sm:text-[12px] text-[#5D5380] font-semibold"
              >
                <span
                  className="h-2 w-2 rounded-full shadow-[0_0_6px_currentColor]"
                  style={{ background: item.color, color: item.color }}
                />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
