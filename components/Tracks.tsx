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
          className="absolute bottom-[-15px] right-[-15px] pointer-events-none transition-all duration-500 z-0"
          style={{ opacity: isHovered ? 0.16 : 0.05 }}
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
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#F87171" strokeWidth="0.5" className="pointer-events-none">
      {/* Central Agent Node */}
      <circle cx="50" cy="50" r="5" fill="#F87171" className="scale-track-node origin-center" />

      {/* Surrounding Helper Agent Nodes */}
      <circle cx="28" cy="35" r="3.5" strokeWidth="0.5" />
      <circle cx="72" cy="38" r="3.5" strokeWidth="0.5" />
      <circle cx="45" cy="72" r="3.5" strokeWidth="0.5" />

      {/* Curved connector paths between agents */}
      <path d="M50,50 Q36,38 28,35" className="draw-track-path" />
      <path d="M50,50 Q64,40 72,38" className="draw-track-path" />
      <path d="M50,50 Q46,64 45,72" className="draw-track-path" />

      <path d="M28,35 Q50,22 72,38" strokeDasharray="2 2" opacity="0.4" />
      <path d="M72,38 Q60,65 45,72" strokeDasharray="2 2" opacity="0.4" />

      {/* Processor chip representation inside core */}
      <rect x="44" y="44" width="12" height="12" rx="1.5" strokeWidth="0.4" opacity="0.3" />

      {/* Metric Badge */}
      <g transform="translate(56, 80)" className="scale-track-node origin-center">
        <text fill="#F87171" fontSize="9.5" fontWeight="extrabold" letterSpacing="0.05em">100%</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Autonomous</text>
      </g>
    </svg>
  );
}

function BgArtTrack2() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#FBBF24" strokeWidth="0.5" className="pointer-events-none">
      {/* Signal Telemetry concentric waves */}
      <circle cx="35" cy="65" r="3" fill="#FBBF24" className="scale-track-node origin-center" />
      <path d="M35,65 A 14 14 0 0 1 47,53" strokeWidth="0.65" className="draw-track-path" />
      <path d="M35,65 A 26 26 0 0 1 57,43" strokeWidth="0.65" className="draw-track-path" />
      <path d="M35,65 A 38 38 0 0 1 67,33" strokeWidth="0.65" className="draw-track-path" opacity="0.5" />

      {/* IoT Device circles connected to edge */}
      <circle cx="47" cy="53" r="2" fill="#FBBF24" className="scale-track-node origin-center" />
      <circle cx="57" cy="43" r="2" fill="#FBBF24" className="scale-track-node origin-center" />

      {/* Device Lock Symbol representation */}
      <rect x="68" y="24" width="7" height="6" rx="1" strokeWidth="0.5" />
      <path d="M70,24 V21 A 2 2 0 0 1 73,21 V24" strokeWidth="0.5" />

      {/* Metric Badge */}
      <g transform="translate(54, 76)" className="scale-track-node origin-center">
        <text fill="#FBBF24" fontSize="9.5" fontWeight="extrabold" letterSpacing="0.05em">Edge</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Real-time Telemetry</text>
      </g>
    </svg>
  );
}

function BgArtTrack3() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#34D399" strokeWidth="0.5" className="pointer-events-none">
      {/* Overlapping AWS, Azure, GCP clouds representation */}
      <path d="M26,38 C22.5,38 19,34.5 19,30 C19,25.5 22.5,22 27,22 C29,16.5 35,12 42,12 C48.5,12 54,16 56.5,21.5 C59,19.5 62,19.5 64.5,21.5 C67,23.5 69,27 69,30.5 C69,35 65.5,38 61,38 Z" className="draw-track-path" />
      <path d="M42,56 C39.5,56 37,53.5 37,50.5 C37,47.5 39.5,45 42,45 C43,40.5 47,37 52,37 C56.5,37 60,39.5 61.5,43 C63,42 65,42 66.5,43.5 C68,45 69,47.5 69,50.5 C69,53.5 66.5,56 64,56 Z" className="draw-track-path" opacity="0.65" />

      {/* Dotted Global Balancer connections */}
      <path d="M42,28 C42,38 52,40 52,45" strokeDasharray="3 3" className="scroll-track-dash" />
      
      <circle cx="52" cy="45" r="2.5" fill="#34D399" className="scale-track-node origin-center" />

      {/* Metric Badge */}
      <g transform="translate(56, 78)" className="scale-track-node origin-center">
        <text fill="#34D399" fontSize="9.5" fontWeight="extrabold" letterSpacing="0.05em">SLA</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Global Load Balancer</text>
      </g>
    </svg>
  );
}

function BgArtTrack4() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#A78BFA" strokeWidth="0.5" className="pointer-events-none">
      {/* DB stacks */}
      <g transform="translate(18, 14)">
        {/* Top Disk */}
        <ellipse cx="12" cy="6" rx="7.5" ry="3" strokeWidth="0.55" className="draw-track-path" />
        <line x1="4.5" y1="6" x2="4.5" y2="13" strokeWidth="0.55" />
        <line x1="19.5" y1="6" x2="19.5" y2="13" strokeWidth="0.55" />
        <path d="M4.5,13 C4.5,16 19.5,16 19.5,13" strokeWidth="0.55" className="draw-track-path" />

        {/* Middle Disk */}
        <line x1="4.5" y1="13" x2="4.5" y2="20" strokeWidth="0.55" />
        <line x1="19.5" y1="13" x2="19.5" y2="20" strokeWidth="0.55" />
        <path d="M4.5,20 C4.5,23 19.5,23 19.5,20" strokeWidth="0.55" className="draw-track-path" />
      </g>

      {/* Dotted Stream flow */}
      <path d="M38,24 C45,24 48,32 48,42" strokeDasharray="2 3" className="scroll-track-dash" />
      <circle cx="48" cy="42" r="2" fill="#A78BFA" className="scale-track-node origin-center" />

      {/* Pipeline node representation */}
      <rect x="42" y="42" width="12" height="7" rx="1" strokeWidth="0.4" opacity="0.4" />

      {/* Metric Badge */}
      <g transform="translate(56, 76)" className="scale-track-node origin-center">
        <text fill="#A78BFA" fontSize="9.5" fontWeight="extrabold" letterSpacing="0.05em">Airflow</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Spark DAG Pipelines</text>
      </g>
    </svg>
  );
}

function BgArtTrack5() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#E8C5D8" strokeWidth="0.5" className="pointer-events-none">
      {/* Gantt Timeline Grid */}
      <line x1="20" y1="16" x2="20" y2="52" opacity="0.3" />
      <line x1="20" y1="52" x2="80" y2="52" opacity="0.3" />

      {/* Gantt horizontal bars */}
      <rect x="25" y="20" width="18" height="3" rx="0.55" className="scale-track-bar" style={{ transformOrigin: "25px 20px" }} />
      <rect x="40" y="28" width="22" height="3" rx="0.55" className="scale-track-bar" style={{ transformOrigin: "40px 28px" }} />
      <rect x="58" y="36" width="16" height="3" rx="0.55" className="scale-track-bar" style={{ transformOrigin: "58px 36px" }} />

      <path d="M43,21.5 L40,29.5 M62,29.5 L58,37.5" strokeDasharray="1.5 1.5" opacity="0.4" />

      <circle cx="74" cy="37.5" r="2" fill="#34D399" className="scale-track-node origin-center" />

      {/* Metric Badge */}
      <g transform="translate(54, 76)" className="scale-track-node origin-center">
        <text fill="#E8C5D8" fontSize="9.5" fontWeight="extrabold" letterSpacing="0.05em">Sprint</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Agile Gantt Timeline</text>
      </g>
    </svg>
  );
}

function BgArtTrack6() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#C4B5FD" strokeWidth="0.5" className="pointer-events-none">
      {/* Iteration circle loop */}
      <path 
        d="M 50,45 A 18,18 0 1,1 68,45 A 18,18 0 0,1 50,45" 
        strokeWidth="0.7" 
        strokeDasharray="4 2" 
        className="scroll-track-dash" 
      />
      
      {/* Loop Arrowhead */}
      <path d="M 68,42 L 72,46 L 68,50 Z" fill="#C4B5FD" className="scale-track-node origin-center" />

      {/* Burn-down grid behind loop */}
      <line x1="22" y1="20" x2="22" y2="48" opacity="0.25" />
      <line x1="22" y1="48" x2="52" y2="48" opacity="0.25" />
      <path d="M22,20 L32,32 L42,38 L52,48" opacity="0.3" strokeWidth="0.6" className="draw-track-path" />

      <circle cx="52" cy="48" r="1.5" fill="#34D399" className="scale-track-node origin-center" />

      {/* Metric Badge */}
      <g transform="translate(56, 76)" className="scale-track-node origin-center">
        <text fill="#C4B5FD" fontSize="9.5" fontWeight="extrabold" letterSpacing="0.05em">Velocity</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Sprint Iterations</text>
      </g>
    </svg>
  );
}
