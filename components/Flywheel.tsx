"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ThreeNoiseCircle
 * A highly performant 2D Canvas particle system that renders a beautiful shimmering
 * particle/sand texture inside each circular node. It simulates WebGL additive particle blending
 * without consuming precious browser WebGL contexts, avoiding context-loss crashes completely.
 */
function ThreeNoiseCircle({ theme, isHovered = false }: { theme: "clients" | "nc" | "builders"; isHovered?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef(isHovered);


  
  // Sync hover state ref for smooth visual transitions without resetting the animation loop
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

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
    let edgeColor = { r: 196, g: 181, b: 253 }; // Premium Lavender (#C4B5FD) for clients

    if (theme === "nc") {
      coreColor = { r: 22, g: 14, b: 53 };     // Deep violet background
      edgeColor = { r: 167, g: 139, b: 250 };  // Premium Purple (#A78BFA) for NC
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
      
      // Dynamic opacity boost on hover
      const glowScale = isHoveredRef.current ? 0.09 : 0.04;
      bgGrad.addColorStop(0, `rgb(${coreColor.r}, ${coreColor.g}, ${coreColor.b})`);
      bgGrad.addColorStop(0.75, `rgba(${edgeColor.r}, ${edgeColor.g}, ${edgeColor.b}, ${glowScale})`);
      bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw our shimmering cosmic sand particles
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];

        // Slowly swirl particles (swirl faster when hovered)
        const currentSpeed = isHoveredRef.current ? p.speed * 2.8 : p.speed;
        p.angle += currentSpeed * 0.035;

        // Apply harmonic radial breathing coordinate wobble
        const wobble = Math.sin(elapsed * 2.2 + p.phase) * 0.45;
        const currentR = p.r + wobble;
        // Polar to Cartesian positioning (centered in canvas)
        const x = width / 2 + currentR * Math.cos(p.angle);
        const y = height / 2 + currentR * Math.sin(p.angle);
        // Sinusoidal shimmer opacity
        let alpha = p.alpha * (0.8 + Math.sin(elapsed * 1.8 + p.phase) * 0.16);
        if (isHoveredRef.current) {
          alpha = Math.min(1.0, alpha * 1.3); // Brighten up the particles on hover
        }
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
  endAngleDeg: number,
  clockwise = true
) {
  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad = (endAngleDeg * Math.PI) / 180;
  const startX = cx + r * Math.cos(startRad);
  const startY = cy + r * Math.sin(startRad);
  const endX = cx + r * Math.cos(endRad);
  const endY = cy + r * Math.sin(endRad);

  const largeArcFlag = Math.abs(endAngleDeg - startAngleDeg) <= 180 ? 0 : 1;
  const sweepFlag = clockwise ? 1 : 0;

  return `M ${startX} ${startY} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
}

export default function Flywheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<"clients" | "nc" | "builders" | null>(null);
  
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
      {/* Dynamic Keyframes for rotating dotted borders around nodes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rotate-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotate-counter-clockwise {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .dotted-border-node1 {
          transform-origin: 300px 90px;
          animation: rotate-clockwise 35s linear infinite;
          transition: stroke 0.4s ease, stroke-width 0.4s ease, filter 0.4s ease, r 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dotted-border-node2 {
          transform-origin: 460px 310px;
          animation: rotate-counter-clockwise 38s linear infinite;
          transition: stroke 0.4s ease, stroke-width 0.4s ease, filter 0.4s ease, r 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dotted-border-node3 {
          transform-origin: 140px 310px;
          animation: rotate-clockwise 36s linear infinite;
          transition: stroke 0.4s ease, stroke-width 0.4s ease, filter 0.4s ease, r 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Interactive dynamic behavior when hovered anywhere over the whole SVG viewport area */
        .diagram-container:hover .dotted-border-node1 {
          animation: rotate-clockwise 12s linear infinite;
          stroke: rgba(196, 181, 253, 0.65);
          stroke-width: 1.8px;
        }
        .diagram-container:hover .dotted-border-node2 {
          animation: rotate-counter-clockwise 13s linear infinite;
          stroke: rgba(167, 139, 250, 0.65);
          stroke-width: 1.8px;
        }
        .diagram-container:hover .dotted-border-node3 {
          animation: rotate-clockwise 12.5s linear infinite;
          stroke: rgba(139, 92, 246, 0.65);
          stroke-width: 1.8px;
        }
      `}} />

      {/* Sticky section container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-4 md:py-8 lg:py-12">
        {/* ambient background orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(196,181,253,0.05) 0%, transparent 70%)",
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
            <h2 className="mt-1 md:mt-3 text-[26px] sm:text-[32px] md:text-[38px] font-extrabold leading-tight text-nc-heading">
              The NC <span className="grad-text">Business Model</span>
            </h2>
            <p className="mx-auto mt-2 md:mt-4 max-w-lg text-[13px] md:text-[14.5px] leading-relaxed text-[#7068A0]">
              A self-sustaining ecosystem where clients, talent, and NC grow
              together in one continuous, perfectly aligned loop.
            </p>
          </div>

          {/* Interactive diagram area - NO card block container background or border! Seamless integration. */}
          <div className="w-full max-w-[1100px] mt-4 md:mt-8 grid items-center gap-4 md:gap-8 md:grid-cols-[1.2fr_260px] lg:grid-cols-[1.3fr_300px] select-none">
            
            {/* Left column: SVG viewport diagram (Locks nodes and curves in 100% perfect, unified coordinate system) */}
            <div className="relative w-full max-w-[1220px] mx-auto aspect-[30/23] diagram-container group/diagram">
              <svg
                viewBox="0 0 600 460"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
              >
                <defs>
                  {/* Premium Purple-Lavender brand gradient mappings (Cyan and Fuchsia replaced) */}
                  <linearGradient id="grad-clients-nc" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="grad-nc-builders" x1="1" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="grad-builders-clients" x1="0" x2="1" y1="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Text Paths definitions for perfect label curving. We restrict the angular range 
                      so that labels reside perfectly in the gaps between nodes and never touch or overlap them!
                      Bottom path runs counter-clockwise to render text right-side up! */}
                  <path id="text-path-clients-nc" d={getArcPath(geom.cx, geom.cy, geom.r + 20, -55, -17, true)} />
                  <path id="text-path-nc-builders" d={getArcPath(geom.cx, geom.cy, geom.r + 20, 121, 59, false)} />
                  <path id="text-path-builders-clients" d={getArcPath(geom.cx, geom.cy, geom.r + 20, 197, 235, true)} />
                </defs>

                {/* Arc 1: CLIENTS -> NC (Pays NC) - Perfect Symmetric Circle-Edge Path */}
                <motion.path
                  d={getArcPath(geom.cx, geom.cy, geom.r, -67, -5)}
                  fill="none"
                  stroke="url(#grad-clients-nc)"
                  strokeWidth="6.5"
                  className="drop-shadow-[0_0_10px_rgba(196,181,253,0.45)]"
                  style={{ pathLength: clientsToNcPathLength }}
                />

                {/* Arc 2: NC -> BUILDERS (NC pays builders) - Perfect Symmetric Circle-Edge Path */}
                <motion.path
                  d={getArcPath(geom.cx, geom.cy, geom.r, 41, 139)}
                  fill="none"
                  stroke="url(#grad-nc-builders)"
                  strokeWidth="6.5"
                  className="drop-shadow-[0_0_10px_rgba(167,139,250,0.45)]"
                  style={{ pathLength: ncToBuildersPathLength }}
                />

                {/* Arc 3: BUILDERS -> CLIENTS (Talent delivers) - Perfect Symmetric Circle-Edge Path */}
                <motion.path
                  d={getArcPath(geom.cx, geom.cy, geom.r, 185, 247)}
                  fill="none"
                  stroke="url(#grad-builders-clients)"
                  strokeWidth="6.5"
                  className="drop-shadow-[0_0_10px_rgba(139,92,246,0.45)]"
                  style={{ pathLength: buildersToClientsPathLength }}
                />

                {/* Gold Dashed Arrow: NC -> Founders Card (Desktop) */}
                <motion.path
                  d="M 526 310 C 555 310, 580 290, 595 260"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3.5"
                  strokeDasharray="5 5"
                  className="hidden md:block drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  style={{ pathLength: ncToFounderPathLength }}
                />

                {/* Gold Dashed Arrow: NC -> Founders Card (Mobile/Tablet) */}
                <motion.path
                  d="M 460 376 L 460 432"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3.5"
                  strokeDasharray="5 5"
                  className="block md:hidden drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  style={{ pathLength: ncToFounderPathLength }}
                />

                {/* --- ROTATING DOTTED BORDERS AROUND THE NODE CIRCLES --- */}
                {/* Dotted border node 1 */}
                <motion.circle
                  cx="300"
                  cy="90"
                  r={hoveredNode === "clients" ? 81 : 76}
                  fill="none"
                  stroke={hoveredNode === "clients" ? "rgba(196,181,253,0.85)" : "rgba(196,181,253,0.32)"}
                  strokeWidth={hoveredNode === "clients" ? 2 : 1.5}
                  strokeDasharray="6 6"
                  className="dotted-border-node1"
                  style={{
                    opacity: clientsOpacity,
                    filter: hoveredNode === "clients" ? "drop-shadow(0 0 8px rgba(196,181,253,0.65))" : "none"
                  }}
                />

                {/* Dotted border node 2 */}
                <motion.circle
                  cx="460"
                  cy="310"
                  r={hoveredNode === "nc" ? 81 : 76}
                  fill="none"
                  stroke={hoveredNode === "nc" ? "rgba(167,139,250,0.85)" : "rgba(167,139,250,0.32)"}
                  strokeWidth={hoveredNode === "nc" ? 2 : 1.5}
                  strokeDasharray="6 6"
                  className="dotted-border-node2"
                  style={{
                    opacity: ncOpacity,
                    filter: hoveredNode === "nc" ? "drop-shadow(0 0 8px rgba(167,139,250,0.65))" : "none"
                  }}
                />

                {/* Dotted border node 3 */}
                <motion.circle
                  cx="140"
                  cy="310"
                  r={hoveredNode === "builders" ? 81 : 76}
                  fill="none"
                  stroke={hoveredNode === "builders" ? "rgba(139,92,246,0.85)" : "rgba(139,92,246,0.32)"}
                  strokeWidth={hoveredNode === "builders" ? 2 : 1.5}
                  strokeDasharray="6 6"
                  className="dotted-border-node3"
                  style={{
                    opacity: buildersOpacity,
                    filter: hoveredNode === "builders" ? "drop-shadow(0 0 8px rgba(139,92,246,0.65))" : "none"
                  }}
                />

                {/* --- MATHEMATICALLY PERFECTED SOLID VECTOR ARROWHEADS (Zero visual gaps at boundaries!) --- */}
                {/* Arrow 1 Head (CLIENTS -> NC) */}
                <g transform="translate(466.8, 236.9) rotate(85)">
                  <motion.path
                    d="M -16 -11 L 6.5 0 L -16 11 Z"
                    fill="#A78BFA"
                    style={{ opacity: arrow1HeadOpacity }}
                  />
                </g>

                {/* Arrow 2 Head (NC -> BUILDERS) */}
                <g transform="translate(177.5, 373.1) rotate(229)">
                  <motion.path
                    d="M -16 -11 L 6.5 0 L -16 11 Z"
                    fill="#8B5CF6"
                    style={{ opacity: arrow2HeadOpacity }}
                  />
                </g>

                {/* Arrow 3 Head (BUILDERS -> CLIENTS) */}
                <g transform="translate(228.4, 105.9) rotate(337)">
                  <motion.path
                    d="M -16 -11 L 6.5 0 L -16 11 Z"
                    fill="#C4B5FD"
                    style={{ opacity: arrow3HeadOpacity }}
                  />
                </g>

                {/* Gold Arrow Head (Desktop) */}
                <g transform="translate(595, 260) rotate(-60)" className="hidden md:block">
                  <motion.path
                    d="M -16 -11 L 6.5 0 L -16 11 Z"
                    fill="#D4AF37"
                    style={{ opacity: goldArrowHeadOpacity }}
                  />
                </g>

                {/* Gold Arrow Head (Mobile/Tablet) */}
                <g transform="translate(460, 432) rotate(90)" className="block md:hidden">
                  <motion.path
                    d="M -16 -11 L 6.5 0 L -16 11 Z"
                    fill="#D4AF37"
                    style={{ opacity: goldArrowHeadOpacity }}
                  />
                </g>

                {/* ========================================================
                    SVG FOREIGN OBJECTS (Guarantees perfect coordinate locking!)
                    We render these first so that the curved texts appear ON TOP 
                    of the circle nodes rather than being clipped or hidden by them!
                    ======================================================== */}
                {/* 1. CLIENTS Node (Top) - Radius 66 / Diameter 132 */}
                <foreignObject
                  x={300 - 66}
                  y={90 - 66}
                  width="132"
                  height="132"
                  className="overflow-visible pointer-events-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.07, y: -3 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    onMouseEnter={() => setHoveredNode("clients")}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="w-[132px] h-[132px] cursor-pointer"
                  >
                    <motion.div
                      style={{
                        scale: clientsScale,
                        opacity: clientsOpacity,
                        background: "linear-gradient(135deg, rgba(8, 7, 24, 0.9) 0%, rgba(15, 12, 41, 0.95) 100%) padding-box, linear-gradient(135deg, #C4B5FD, #7C3AED) border-box",
                        boxShadow: hoveredNode === "clients" 
                          ? "0 0 35px rgba(196, 181, 253, 0.45), inset 0 0 20px rgba(124, 58, 237, 0.25)"
                          : "0 0 25px rgba(196, 181, 253, 0.22), inset 0 0 15px rgba(124, 58, 237, 0.15)",
                      }}
                      className="w-full h-full rounded-full border border-transparent p-[2.5px] flex items-center justify-center pointer-events-auto transition-all duration-300"
                    >
                      <ThreeNoiseCircle theme="clients" isHovered={hoveredNode === "clients"} />
                      <div className="relative z-10 flex flex-col items-center text-center px-1 select-none">
                        {/* Briefcase/Building Icon with Dynamic Pulsing Drop Shadow */}
                        <svg
                          className="w-6 h-6 text-[#C4B5FD] transition-all duration-300"
                          style={{
                            filter: hoveredNode === "clients" ? "drop-shadow(0 0 8px rgba(196,181,253,0.7))" : "none"
                          }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.65"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        <span className="mt-1.5 text-[11px] font-extrabold tracking-wider text-nc-heading uppercase leading-none">
                          CLIENTS
                        </span>
                        <span className="mt-1 text-[7.5px] text-[#A29EB3] max-w-[90px] leading-tight font-medium">
                          Pay for consultation &amp; project delivery
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </foreignObject>

                {/* 2. NC Node (Bottom-Right) - Radius 66 / Diameter 132 */}
                <foreignObject
                  x={460 - 66}
                  y={310 - 66}
                  width="132"
                  height="132"
                  className="overflow-visible pointer-events-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.07, y: -3 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    onMouseEnter={() => setHoveredNode("nc")}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="w-[132px] h-[132px] cursor-pointer"
                  >
                    <motion.div
                      style={{
                        scale: ncScale,
                        opacity: ncOpacity,
                        background: "linear-gradient(135deg, rgba(8, 7, 24, 0.9) 0%, rgba(15, 12, 41, 0.95) 100%) padding-box, linear-gradient(135deg, #A78BFA, #7C3AED) border-box",
                        boxShadow: hoveredNode === "nc" 
                          ? "0 0 35px rgba(167, 139, 250, 0.45), inset 0 0 20px rgba(124, 58, 237, 0.25)"
                          : "0 0 25px rgba(167, 139, 250, 0.22), inset 0 0 15px rgba(124, 58, 237, 0.15)",
                      }}
                      className="w-full h-full rounded-full border border-transparent p-[2.5px] flex items-center justify-center pointer-events-auto transition-all duration-300"
                    >
                      <ThreeNoiseCircle theme="nc" isHovered={hoveredNode === "nc"} />
                      <div className="relative z-10 flex flex-col items-center text-center px-1 select-none">
                        {/* Purple solid circular NC logo badge with Dynamic Shadow */}
                        <div 
                          className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] rounded-full border border-purple-400/35 text-[10px] font-extrabold text-white mb-0.5 shadow-md transition-all duration-300"
                          style={{
                            boxShadow: hoveredNode === "nc" ? "0 0 12px rgba(124,58,237,0.7)" : "0 4px 6px rgba(0,0,0,0.3)"
                          }}
                        >
                          NC
                        </div>
                        <span className="mt-1 text-[11px] font-extrabold tracking-wider text-nc-heading uppercase leading-none">
                          NOVACRYSTARA
                        </span>
                        <span className="mt-1 text-[7.5px] text-[#A29EB3] max-w-[90px] leading-tight font-medium">
                          Earns revenue
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </foreignObject>

                {/* 3. BUILDERS Node (Bottom-Left) - Radius 66 / Diameter 132 */}
                <foreignObject
                  x={140 - 66}
                  y={310 - 66}
                  width="132"
                  height="132"
                  className="overflow-visible pointer-events-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.07, y: -3 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    onMouseEnter={() => setHoveredNode("builders")}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="w-[132px] h-[132px] cursor-pointer"
                  >
                    <motion.div
                      style={{
                        scale: buildersScale,
                        opacity: buildersOpacity,
                        background: "linear-gradient(135deg, rgba(8, 7, 24, 0.9) 0%, rgba(15, 12, 41, 0.95) 100%) padding-box, linear-gradient(135deg, #8B5CF6, #C4B5FD) border-box",
                        boxShadow: hoveredNode === "builders" 
                          ? "0 0 35px rgba(139, 92, 246, 0.45), inset 0 0 20px rgba(124, 58, 237, 0.25)"
                          : "0 0 25px rgba(139, 92, 246, 0.22), inset 0 0 15px rgba(124, 58, 237, 0.15)",
                      }}
                      className="w-full h-full rounded-full border border-transparent p-[2.5px] flex items-center justify-center pointer-events-auto transition-all duration-300"
                    >
                      <ThreeNoiseCircle theme="builders" isHovered={hoveredNode === "builders"} />
                      <div className="relative z-10 flex flex-col items-center text-center px-1 select-none">
                        {/* Users Icon with Pulsing Glow Shadow */}
                        <svg
                          className="w-6 h-6 text-[#A78BFA] transition-all duration-300"
                          style={{
                            filter: hoveredNode === "builders" ? "drop-shadow(0 0 8px rgba(167,139,250,0.7))" : "none"
                          }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.65"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span className="mt-1.5 text-[11px] font-extrabold tracking-wider text-nc-heading uppercase leading-none">
                          INTERNS
                        </span>
                        <span className="mt-1 text-[7.5px] text-[#A29EB3] max-w-[90px] leading-tight font-medium">
                          Gain income + skills
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </foreignObject>

                {/* --- CURVED LABELS ALONG THE ARROWS (Rendered AFTER foreignObjects so they sit on top!) --- */}
                {/* Curved Label 1: Pays NC */}
                <motion.text
                  fill="#C4B5FD"
                  className="text-[10.5px] sm:text-[11.5px] font-extrabold tracking-[0.25em] select-none uppercase"
                  style={{ opacity: clientsToNcPathLength }}
                  textAnchor="middle"
                >
                  <textPath xlinkHref="#text-path-clients-nc" href="#text-path-clients-nc" startOffset="50%">
                    Pays NC
                  </textPath>
                </motion.text>

                {/* Curved Label 2: NC pays builders */}
                <motion.text
                  fill="#A78BFA"
                  className="text-[10.5px] sm:text-[11.5px] font-extrabold tracking-[0.25em] select-none uppercase"
                  style={{ opacity: ncToBuildersPathLength }}
                  textAnchor="middle"
                >
                  <textPath xlinkHref="#text-path-nc-builders" href="#text-path-nc-builders" startOffset="50%">
                    NC pays builders
                  </textPath>
                </motion.text>

                {/* Curved Label 3: Talent delivers */}
                <motion.text
                  fill="#C4B5FD"
                  className="text-[10.5px] sm:text-[11.5px] font-extrabold tracking-[0.25em] select-none uppercase"
                  style={{ opacity: buildersToClientsPathLength }}
                  textAnchor="middle"
                >
                  <textPath xlinkHref="#text-path-builders-clients" href="#text-path-builders-clients" startOffset="50%">
                    Talent deliver
                  </textPath>
                </motion.text>
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
        </div>
      </div>
    </section>
  );
}

