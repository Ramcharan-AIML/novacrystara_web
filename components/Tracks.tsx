"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

type Difficulty = "Advanced" | "Intermediate" | "Beginner";

interface Track {
  title: string;
  difficulty: Difficulty;
  duration: string;
  desc: string;
  accent: string;
  bgArt: React.ReactNode;
}

const TRACKS: Track[] = [
  {
    title: "AI Agents",
    difficulty: "Advanced",
    duration: "12 Weeks",
    desc: "Autonomous intelligence. Agent logic, prompt chaining, vector stores, tool integration.",
    accent: "#F87171",
    bgArt: <BgArtTrack1 />,
  },
  {
    title: "IoT & Edge",
    difficulty: "Intermediate",
    duration: "10 Weeks",
    desc: "Bridge sensors and cloud. Real-time telemetry, edge computing, device security.",
    accent: "#FBBF24",
    bgArt: <BgArtTrack2 />,
  },
  {
    title: "Multi Cloud",
    difficulty: "Advanced",
    duration: "12 Weeks",
    desc: "Architect across AWS, Azure, GCP. Kubernetes, global load balancing, cost optimisation.",
    accent: "#34D399",
    bgArt: <BgArtTrack3 />,
  },
  {
    title: "Data Engineering",
    difficulty: "Intermediate",
    duration: "8 Weeks",
    desc: "Robust pipelines. Data warehousing, ETL with Airflow, distributed Spark.",
    accent: "#A78BFA",
    bgArt: <BgArtTrack4 />,
  },
  {
    title: "Project Management",
    difficulty: "Beginner",
    duration: "6 Weeks",
    desc: "Lead cross-functional teams. Budget, risk, agile methodologies done right.",
    accent: "#E8C5D8",
    bgArt: <BgArtTrack5 />,
  },
  {
    title: "Scrum Master",
    difficulty: "Beginner",
    duration: "6 Weeks",
    desc: "High-velocity agile. Sprint planning, burn-down charts, self-organising teams.",
    accent: "#C4B5FD",
    bgArt: <BgArtTrack6 />,
  },
];

const DIFFICULTY_STYLE: Record<Difficulty, { border: string; bg: string; color: string; dot: string }> = {
  Advanced: { 
    border: "rgba(248,113,113,0.32)", 
    bg: "rgba(248,113,113,0.06)", 
    color: "#F87171",
    dot: "#EF4444"
  },
  Intermediate: { 
    border: "rgba(251,191,36,0.32)", 
    bg: "rgba(251,191,36,0.06)", 
    color: "#FBBF24",
    dot: "#F59E0B"
  },
  Beginner: { 
    border: "rgba(52,211,153,0.32)", 
    bg: "rgba(52,211,153,0.06)", 
    color: "#34D399",
    dot: "#10B981"
  },
};

export default function Tracks() {
  return (
    <section id="tracks" className="bg-[#06070E] py-20 sm:py-24 relative overflow-hidden">
      {/* Scope-specific CSS keyframes for custom floating particles, glowing difficulty indicator dots, and background vector drawing */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-up-tracks {
          0% {
            transform: translateY(20px) scale(0);
            opacity: 0;
          }
          30% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-90px) scale(0.4);
            opacity: 0;
          }
        }
        @keyframes pulse-dot-tracks {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }
        
        .pulse-dot-difficulty {
          animation: pulse-dot-tracks 2s infinite ease-in-out;
        }

        .particle-dot-track {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .group\\/outer:hover .particle-dot-track {
          opacity: 1;
        }
        
        .group\\/outer:hover .particle-dot-track-0 {
          animation: float-up-tracks 2.2s infinite linear;
          animation-delay: 0s;
        }
        .group\\/outer:hover .particle-dot-track-1 {
          animation: float-up-tracks 2.2s infinite linear;
          animation-delay: 0.4s;
        }
        .group\\/outer:hover .particle-dot-track-2 {
          animation: float-up-tracks 2.2s infinite linear;
          animation-delay: 0.8s;
        }
        .group\\/outer:hover .particle-dot-track-3 {
          animation: float-up-tracks 2.2s infinite linear;
          animation-delay: 1.2s;
        }

        /* ------------------------------------------------------------
           Dynamic Draw-Build SVG Animations on Hover
           ------------------------------------------------------------ */
        @keyframes draw-path-track {
          0% { stroke-dashoffset: 150; opacity: 0; }
          10% { opacity: 0.8; }
          65% { stroke-dashoffset: 0; opacity: 0.8; }
          80% { stroke-dashoffset: 0; opacity: 0.8; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 150; opacity: 0; }
        }
        @keyframes scale-node-track {
          0% { transform: scale(0); opacity: 0; }
          25% { transform: scale(0); opacity: 0; }
          40% { transform: scale(1.35); opacity: 0.9; }
          45% { transform: scale(1); opacity: 0.9; }
          80% { transform: scale(1); opacity: 0.9; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes scale-bar-track {
          0% { transform: scaleY(0); opacity: 0; }
          20% { transform: scaleY(0); opacity: 0; }
          50% { transform: scaleY(1); opacity: 0.95; }
          80% { transform: scaleY(1); opacity: 0.95; }
          90% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(0); opacity: 0; }
        }
        @keyframes scroll-dash-track {
          to { stroke-dashoffset: -20; }
        }

        /* SVG Hover Triggers */
        .group\\/outer:hover .draw-track-path {
          stroke-dasharray: 150;
          animation: draw-path-track 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .scale-track-node {
          animation: scale-node-track 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .scale-track-bar {
          animation: scale-bar-track 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .scroll-track-dash {
          animation: scroll-dash-track 2.5s infinite linear;
        }
      `}} />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="nc-eyebrow">SPECIALISATION PATHWAYS</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            Choose your
            <br />
            <span className="grad-text">Innovation Track</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#7068A0] sm:text-[16px]">
            Each track puts you on live client projects from day one. Pick your
            domain, build real systems, earn verified credentials.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {TRACKS.map((track, index) => (
            <TrackItem key={track.title} track={track} index={index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function TrackItem({ track, index }: { track: Track; index: number }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLLIElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const ds = DIFFICULTY_STYLE[track.difficulty];

  // Alternating card colors matching standard brand guidelines
  const accentColor = index % 2 === 0 ? "#A78BFA" : "#C4B5FD";
  const bottomBarGradient = index % 2 === 0 
    ? "linear-gradient(90deg, #7C3AED, #A78BFA)" 
    : "linear-gradient(90deg, #A78BFA, #C4B5FD)";

  return (
    <motion.li
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={fadeUp}
      className="relative p-[1.5px] rounded-[17px] overflow-hidden group/outer transition-all duration-500 flex flex-col h-full select-none cursor-pointer"
      style={{
        background: isHovered
          ? "linear-gradient(135deg, rgba(167,139,250,0.7), rgba(196,181,253,0.4), rgba(232,197,216,0.5))"
          : "rgba(167,139,250,0.10)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms ease",
      }}
    >
      {/* Inner premium glassmorphic card content wrapper */}
      <div className="relative w-full h-full rounded-[16px] bg-[#0D0B1C] px-[26px] py-[32px] overflow-hidden flex flex-col justify-between z-10 flex-1 min-h-[340px]">
        {/* Spotlight Effect (radial gradient follows mouse cursor inside card) */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(167,139,250,0.10), transparent)`,
          }}
        />

        {/* Top Shimmer Line */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.45), transparent)",
          }}
        />

        <div>
          {/* Header Row: Custom glowing difficulty badge and duration info */}
          <div className="flex items-center justify-between relative z-20">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase backdrop-blur-md select-none transition-all duration-300"
              style={{ background: ds.bg, borderColor: ds.border, color: ds.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full pulse-dot-difficulty" style={{ backgroundColor: ds.dot }} />
              {track.difficulty}
            </span>
            <span className="text-[11px] text-[#A29EB3] font-semibold flex items-center gap-1 leading-none select-none">
              ⏱ {track.duration}
            </span>
          </div>

          <h3 
            className="mt-6 text-[20px] sm:text-[22px] font-bold leading-snug transition-colors duration-300 relative z-20"
            style={{ color: accentColor }}
          >
            {track.title}
          </h3>
          <p className="mt-3.5 text-[14px] font-normal text-white/95 leading-[1.7] relative z-20 max-w-[85%] sm:max-w-[78%]">
            {track.desc}
          </p>
        </div>

        {/* Apply Button link with arrow sliding micro-animation */}
        <div className="mt-8 relative z-20">
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.02 }}
            className="group/link inline-flex items-center text-[13px] font-semibold transition-all duration-300"
            style={{ color: accentColor }}
          >
            <span>Apply to build</span>
            <span className="transition-all duration-300 ml-[6px] group-hover/link:ml-[10px] group-hover/outer:translate-x-[2px]">
              →
            </span>
          </motion.a>
        </div>

        {/* Background art vector representing Track info (fades in on hover) */}
        <div
          className="absolute bottom-[-6px] right-[-6px] md:bottom-[-8px] md:right-[-8px] lg:bottom-[-10px] lg:right-[-10px] pointer-events-none transition-all duration-500 z-0"
          style={{ opacity: isHovered ? 0.75 : 0.32 }}
        >
          {track.bgArt}
        </div>

        {/* Bottom accent linear gradient bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 z-20"
          style={{
            background: bottomBarGradient,
            opacity: isHovered ? 1 : 0.4,
            borderRadius: "0 0 16px 16px",
          }}
        />

        {/* Floating particles (4 x 3px dots floating up from bottom-right on hover) */}
        <div className="absolute bottom-[20px] right-[20px] w-[50px] h-[50px] pointer-events-none overflow-hidden z-20">
          {[0, 1, 2, 3].map((dotIdx) => (
            <div
              key={dotIdx}
              className={`absolute bottom-[10px] right-[10px] w-[3px] h-[3px] rounded-full particle-dot-track particle-dot-track-${dotIdx}`}
              style={{
                background: accentColor,
              }}
            />
          ))}
        </div>
      </div>
    </motion.li>
  );
}

/* ============================================================
   Custom SVG Background Art Vector Components for Each Track Info
   ============================================================ */

function BgArtTrack1() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#F87171" strokeWidth="0.75" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* Yellow Speech Bubble (drawing and scaling) */}
      <g className="origin-bottom scale-track-node" style={{ transformOrigin: "50px 32px" }}>
        {/* Speech bubble rounded box */}
        <rect x="36" y="10" width="28" height="18" rx="4" stroke="#F87171" strokeWidth="0.8" fill="rgba(248,113,113,0.08)" className="draw-track-path" />
        {/* Speech bubble tail pointer */}
        <path d="M46,28 L50,33 L54,28" stroke="#F87171" strokeWidth="0.8" fill="none" className="draw-track-path" />
      </g>

      {/* Robot Head Structure */}
      {/* Left antenna */}
      <path d="M22,54 L25,54" stroke="#F87171" strokeWidth="0.85" className="draw-track-path" />
      <rect x="18" y="42" width="4" height="24" rx="2" stroke="#F87171" strokeWidth="0.8" fill="rgba(248,113,113,0.05)" className="draw-track-path" />
      
      {/* Right antenna */}
      <path d="M75,54 L78,54" stroke="#F87171" strokeWidth="0.85" className="draw-track-path" />
      <rect x="78" y="42" width="4" height="24" rx="2" stroke="#F87171" strokeWidth="0.8" fill="rgba(248,113,113,0.05)" className="draw-track-path" />

      {/* Main outer robot head box */}
      <rect x="25" y="38" width="50" height="36" rx="10" stroke="#F87171" strokeWidth="1" fill="rgba(248,113,113,0.04)" className="draw-track-path" />

      {/* Top accent hair stripe */}
      <rect x="44" y="38" width="12" height="7" rx="1" stroke="#F87171" strokeWidth="0.75" fill="rgba(248,113,113,0.3)" className="scale-track-node origin-top" />

      {/* Inner screen glass box */}
      <rect x="30" y="46" width="40" height="22" rx="6" stroke="#F87171" strokeWidth="0.8" fill="rgba(248,113,113,0.08)" className="draw-track-path" />

      {/* Screen elements (eyes and mouth) */}
      <circle cx="40" cy="55" r="2.2" fill="#F87171" className="scale-track-node origin-center" />
      <circle cx="60" cy="55" r="2.2" fill="#F87171" className="scale-track-node origin-center" />
      <path d="M47,60 Q50,63 53,60" stroke="#F87171" strokeWidth="1" strokeLinecap="round" className="scale-track-node origin-center" />


    </svg>
  );
}

function BgArtTrack2() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#FBBF24" strokeWidth="0.5" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* Central microchip processor unit */}
      <rect x="35" y="35" width="30" height="30" rx="4.5" strokeWidth="0.75" className="draw-track-path" />
      <text x="50" y="53.5" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="extrabold" letterSpacing="0.03em" className="scale-track-node origin-center">IoT</text>

      {/* 8 branching circuit path lines & terminal node dots representing connection pins */}
      {/* Top pins */}
      <path d="M 50 35 L 50 20" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="50" cy="20" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />
      
      <path d="M 42 35 L 42 24 L 30 24" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="30" cy="24" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />

      <path d="M 58 35 L 58 24 L 70 24" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="70" cy="24" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />

      {/* Right pins */}
      <path d="M 65 50 L 78 50" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="78" cy="50" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />

      <path d="M 65 42 L 72 42 L 72 32" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="72" cy="32" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />

      {/* Bottom pins */}
      <path d="M 50 65 L 50 80" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="50" cy="80" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />

      <path d="M 58 65 L 58 74 L 68 74" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="68" cy="74" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />

      {/* Left pins */}
      <path d="M 35 50 L 22 50" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="22" cy="50" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />

      <path d="M 35 58 L 27 58 L 27 68" strokeWidth="0.65" className="draw-track-path" />
      <circle cx="27" cy="68" r="1.8" fill="#FBBF24" className="scale-track-node origin-center" />


    </svg>
  );
}

function BgArtTrack3() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#34D399" strokeWidth="0.5" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* Overlapping AWS, Azure, GCP clouds representation */}
      <path d="M26,38 C22.5,38 19,34.5 19,30 C19,25.5 22.5,22 27,22 C29,16.5 35,12 42,12 C48.5,12 54,16 56.5,21.5 C59,19.5 62,19.5 64.5,21.5 C67,23.5 69,27 69,30.5 C69,35 65.5,38 61,38 Z" className="draw-track-path" />
      <path d="M42,56 C39.5,56 37,53.5 37,50.5 C37,47.5 39.5,45 42,45 C43,40.5 47,37 52,37 C56.5,37 60,39.5 61.5,43 C63,42 65,42 66.5,43.5 C68,45 69,47.5 69,50.5 C69,53.5 66.5,56 64,56 Z" className="draw-track-path" opacity="0.65" />

      {/* Dotted Global Balancer connections */}
      <path d="M42,28 C42,38 52,40 52,45" strokeDasharray="3 3" className="scroll-track-dash" />
      
      <circle cx="52" cy="45" r="2.5" fill="#34D399" className="scale-track-node origin-center" />


    </svg>
  );
}

function BgArtTrack4() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#A78BFA" strokeWidth="0.75" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* Top Right Speech Bubbles */}
      <g className="scale-track-node origin-top-right">
        {/* Back speech bubble */}
        <rect x="52" y="10" width="22" height="15" rx="3" stroke="#A78BFA" strokeWidth="0.7" fill="rgba(167,139,250,0.05)" className="draw-track-path" />
        <path d="M57,25 L57,29 L62,25" stroke="#A78BFA" strokeWidth="0.7" fill="none" className="draw-track-path" />
        <line x1="57" y1="14" x2="69" y2="14" stroke="#A78BFA" strokeWidth="0.55" opacity="0.5" />
        <line x1="57" y1="18" x2="65" y2="18" stroke="#A78BFA" strokeWidth="0.55" opacity="0.5" />

        {/* Front speech bubble */}
        <rect x="42" y="16" width="20" height="13" rx="2.5" stroke="#A78BFA" strokeWidth="0.75" fill="rgba(167,139,250,0.12)" className="draw-track-path" />
        <path d="M53,29 L53,33 L49,29" stroke="#A78BFA" strokeWidth="0.75" fill="none" className="draw-track-path" />
        <line x1="47" y1="20" x2="57" y2="20" stroke="#A78BFA" strokeWidth="0.6" />
        <line x1="47" y1="24" x2="53" y2="24" stroke="#A78BFA" strokeWidth="0.6" />
      </g>

      {/* Person (Top-Left) */}
      <g className="scale-track-node origin-center" style={{ transformOrigin: "26px 26px" }}>
        {/* Head */}
        <circle cx="26" cy="20" r="5" stroke="#A78BFA" strokeWidth="0.85" fill="rgba(167,139,250,0.1)" className="draw-track-path" />
        {/* Hair block */}
        <path d="M21,20 C21,15 31,15 31,20 C29,18 23,18 21,20 Z" fill="#A78BFA" />
        {/* Shoulders */}
        <path d="M14,38 L14,33 C14,29 38,29 38,33 L38,38 Z" stroke="#A78BFA" strokeWidth="0.85" fill="rgba(167,139,250,0.06)" className="draw-track-path" />
        {/* Collar & Tie */}
        <path d="M23,29 L26,33 L29,29" stroke="#A78BFA" strokeWidth="0.7" fill="none" />
        <path d="M25,33 L27,33 L28,38 L24,38 Z" fill="#A78BFA" opacity="0.8" />
      </g>

      {/* Bottom Left Gear */}
      <g className="scale-track-node origin-center" style={{ transformOrigin: "26px 60px" }}>
        {/* Central hub */}
        <circle cx="26" cy="60" r="5.5" stroke="#A78BFA" strokeWidth="0.95" fill="rgba(167,139,250,0.1)" className="draw-track-path" />
        <circle cx="26" cy="60" r="2" fill="#A78BFA" />
        {/* 8 Gear teeth */}
        <path d="M25,51 L27,51 L27,54 L25,54 Z" fill="#A78BFA" />
        <path d="M25,66 L27,66 L27,69 L25,69 Z" fill="#A78BFA" />
        <path d="M17,59 L17,61 L20,61 L20,59 Z" fill="#A78BFA" />
        <path d="M32,59 L32,61 L35,61 L35,59 Z" fill="#A78BFA" />
        {/* Diagonals */}
        <path d="M19,53 L21,55 L22,54 L20,52 Z" fill="#A78BFA" />
        <path d="M31,65 L33,67 L34,66 L32,64 Z" fill="#A78BFA" />
        <path d="M19,67 L21,65 L20,64 L18,66 Z" fill="#A78BFA" />
        <path d="M31,53 L33,55 L32,56 L30,54 Z" fill="#A78BFA" />
      </g>

      {/* Bar Chart (Bottom Right) */}
      <g className="scale-track-bar origin-bottom" style={{ transformOrigin: "60px 72px" }}>
        {/* Bar 1 */}
        <rect x="52" y="52" width="4" height="20" rx="1" stroke="#A78BFA" strokeWidth="0.75" fill="rgba(167,139,250,0.08)" />
        {/* Bar 2 */}
        <rect x="60" y="44" width="4" height="28" rx="1" stroke="#A78BFA" strokeWidth="0.75" fill="rgba(167,139,250,0.15)" />
        {/* Bar 3 */}
        <rect x="68" y="36" width="4" height="36" rx="1" stroke="#A78BFA" strokeWidth="0.75" fill="rgba(167,139,250,0.3)" />
      </g>

      {/* Line Chart connecting them */}
      <g>
        {/* Path line */}
        <path d="M33,59 L43,44 L53,52 L62,38 L70,38" stroke="#A78BFA" strokeWidth="1" strokeLinecap="round" className="draw-track-path" />
        {/* Nodes */}
        <circle cx="33" cy="59" r="1.8" fill="#A78BFA" className="scale-track-node origin-center" />
        <circle cx="43" cy="44" r="1.8" fill="#A78BFA" className="scale-track-node origin-center" />
        <circle cx="53" cy="52" r="1.8" fill="#A78BFA" className="scale-track-node origin-center" />
        <circle cx="62" cy="38" r="1.8" fill="#A78BFA" className="scale-track-node origin-center" />
        <circle cx="70" cy="38" r="1.8" fill="#A78BFA" className="scale-track-node origin-center" />
      </g>


    </svg>
  );
}

function BgArtTrack5() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#E8C5D8" strokeWidth="0.5" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* Gantt Timeline Grid */}
      <line x1="20" y1="16" x2="20" y2="52" opacity="0.3" />
      <line x1="20" y1="52" x2="80" y2="52" opacity="0.3" />

      {/* Gantt horizontal bars */}
      <rect x="25" y="20" width="18" height="3" rx="0.55" className="scale-track-bar" style={{ transformOrigin: "25px 20px" }} />
      <rect x="40" y="28" width="22" height="3" rx="0.55" className="scale-track-bar" style={{ transformOrigin: "40px 28px" }} />
      <rect x="58" y="36" width="16" height="3" rx="0.55" className="scale-track-bar" style={{ transformOrigin: "58px 36px" }} />

      <path d="M43,21.5 L40,29.5 M62,29.5 L58,37.5" strokeDasharray="1.5 1.5" opacity="0.4" />

      <circle cx="74" cy="37.5" r="2" fill="#34D399" className="scale-track-node origin-center" />


    </svg>
  );
}

function BgArtTrack6() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="#C4B5FD" strokeWidth="0.5" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* Central meeting board table */}
      <rect x="36" y="36" width="28" height="20" rx="3.5" strokeWidth="0.75" className="draw-track-path" />

      {/* Five team members positioned around the table (heads, shoulders, and bowties) */}
      {/* Member 1 (Top Left) */}
      <circle cx="40" cy="20" r="3.2" className="scale-track-node origin-center" />
      <path d="M34,28 A6,6 0 0,1 46,28" className="draw-track-path" />
      <path d="M38.5,27.5 L41.5,28.5 M41.5,27.5 L38.5,28.5" stroke="#C4B5FD" strokeWidth="0.8" className="draw-track-path" />

      {/* Member 2 (Top Right) */}
      <circle cx="60" cy="20" r="3.2" className="scale-track-node origin-center" />
      <path d="M54,28 A6,6 0 0,1 66,28" className="draw-track-path" />
      <path d="M58.5,27.5 L61.5,28.5 M61.5,27.5 L58.5,28.5" stroke="#C4B5FD" strokeWidth="0.8" className="draw-track-path" />

      {/* Member 3 (Left) */}
      <circle cx="24" cy="42" r="3.2" className="scale-track-node origin-center" />
      <path d="M18,50 A6,6 0 0,1 30,50" className="draw-track-path" />
      <path d="M22.5,49.5 L25.5,50.5 M25.5,49.5 L22.5,50.5" stroke="#C4B5FD" strokeWidth="0.8" className="draw-track-path" />

      {/* Member 4 (Right) */}
      <circle cx="76" cy="42" r="3.2" className="scale-track-node origin-center" />
      <path d="M70,50 A6,6 0 0,1 82,50" className="draw-track-path" />
      <path d="M74.5,49.5 L77.5,50.5 M77.5,49.5 L74.5,50.5" stroke="#C4B5FD" strokeWidth="0.8" className="draw-track-path" />

      {/* Member 5 (Bottom / Scrum Master) */}
      <circle cx="50" cy="68" r="3.2" className="scale-track-node origin-center" />
      <path d="M44,76 A6,6 0 0,1 56,76" className="draw-track-path" />
      <path d="M48.5,75.5 L51.5,76.5 M51.5,75.5 L48.5,75.5" stroke="#34D399" strokeWidth="0.8" className="draw-track-path" />


    </svg>
  );
}
