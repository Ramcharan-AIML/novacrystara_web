"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight, staggerContainer, VIEWPORT } from "@/lib/motion";

interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  bgArt: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    num: "PROJECT 01",
    title: "Smart IoT Analytics Platform",
    desc: "Device data collection → Real-time processing → AI analytics → Cloud deployment → Automated monitoring.",
    tags: ["IoT", "AI", "Cloud", "DevOps"],
    bgArt: <BgArtWork1 />,
  },
  {
    num: "PROJECT 02",
    title: "Multicloud ML Infrastructure",
    desc: "ML model training → Multi-cloud deployment → DevOps automation → Performance optimization at scale.",
    tags: ["AWS", "Azure", "ML", "GCP"],
    bgArt: <BgArtWork2 />,
  },
  {
    num: "PROJECT 03",
    title: "Enterprise DevOps Pipeline",
    desc: "CI/CD → Container orchestration → Multi-environment deployment → Intelligent scaling.",
    tags: ["Docker", "K8s", "Jenkins"],
    bgArt: <BgArtWork3 />,
  },
  {
    num: "PROJECT 04",
    title: "Data-Driven AI Solutions",
    desc: "Data warehouse → ETL pipelines → AI model integration → BI dashboards → Agile delivery.",
    tags: ["Data Eng", "AI", "BI", "ETL"],
    bgArt: <BgArtWork4 />,
  },
];

export default function OurWork() {
  return (
    <section id="our-work" className="bg-[#06070E] py-20 sm:py-24 relative overflow-hidden">
      {/* Scope-specific keyframe animations for floating hover particles & background building vectors */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-up-work {
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
        
        .particle-dot {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .group\\/outer:hover .particle-dot {
          opacity: 1;
        }
        
        .group\\/outer:hover .particle-dot-0 {
          animation: float-up-work 2.2s infinite linear;
          animation-delay: 0s;
        }
        .group\\/outer:hover .particle-dot-1 {
          animation: float-up-work 2.2s infinite linear;
          animation-delay: 0.4s;
        }
        .group\\/outer:hover .particle-dot-2 {
          animation: float-up-work 2.2s infinite linear;
          animation-delay: 0.8s;
        }
        .group\\/outer:hover .particle-dot-3 {
          animation: float-up-work 2.2s infinite linear;
          animation-delay: 1.2s;
        }

        /* ------------------------------------------------------------
           Sequential Background Draw-Build Animations (On Hover)
           ------------------------------------------------------------ */
        @keyframes draw-path-work {
          0% { stroke-dashoffset: 150; opacity: 0; }
          10% { opacity: 0.8; }
          65% { stroke-dashoffset: 0; opacity: 0.8; }
          80% { stroke-dashoffset: 0; opacity: 0.8; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 150; opacity: 0; }
        }
        @keyframes scale-bar-work {
          0% { transform: scaleY(0); opacity: 0; }
          20% { transform: scaleY(0); opacity: 0; }
          55% { transform: scaleY(1); opacity: 0.9; }
          80% { transform: scaleY(1); opacity: 0.9; }
          90% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(0); opacity: 0; }
        }
        @keyframes scale-node-work {
          0% { transform: scale(0); opacity: 0; }
          25% { transform: scale(0); opacity: 0; }
          40% { transform: scale(1.3); opacity: 0.9; }
          45% { transform: scale(1); opacity: 0.9; }
          80% { transform: scale(1); opacity: 0.9; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes scale-box-work {
          0% { transform: scale(0); opacity: 0; }
          12% { transform: scale(0); opacity: 0; }
          26% { transform: scale(1.1); opacity: 0.85; }
          30% { transform: scale(1); opacity: 0.85; }
          80% { transform: scale(1); opacity: 0.85; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes pulse-radial {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.08); opacity: 0.55; }
        }
        @keyframes scroll-dash-work {
          to { stroke-dashoffset: -20; }
        }

        /* SVG Class Assignment Triggers */
        .group\\/outer:hover .draw-path-line {
          stroke-dasharray: 150;
          animation: draw-path-work 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .scale-chart-bar {
          animation: scale-bar-work 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .scale-node-dot {
          animation: scale-node-work 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .scale-devops-box {
          animation: scale-box-work 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .scroll-dash-path {
          animation: scroll-dash-work 2.5s infinite linear;
        }
        .group\\/outer:hover .pulse-circle {
          animation: pulse-radial 3s infinite ease-in-out;
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
          <p className="nc-eyebrow">REAL-WORLD DELIVERY</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            What we build
            <br />
            <span className="grad-text">for clients</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#7068A0] sm:text-[16px]">
            Production systems delivered. Not assignments. Not demos. Real
            enterprise-grade AI solutions.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {PROJECTS.map((project, index) => (
            <ProjectItem key={project.num} project={project} index={index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
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

  // Harmonious theme matching colors
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
      className="relative p-[1.5px] rounded-[17px] overflow-hidden group/outer transition-all duration-500 flex flex-col h-full select-none cursor-pointer"
      style={{
        background: isHovered
          ? "linear-gradient(135deg, rgba(167,139,250,0.7), rgba(196,181,253,0.4), rgba(232,197,216,0.5))"
          : "rgba(167,139,250,0.10)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms ease",
      }}
    >
      {/* Inner premium glass card content wrapper */}
      <div className="relative w-full h-full rounded-[16px] bg-[#0D0B1C] px-[28px] py-[32px] overflow-hidden flex flex-col justify-between z-10 flex-1 min-h-[260px]">
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
          <p className="text-[10px] font-bold tracking-[0.20em] text-[#4A4070] uppercase relative z-20">
            {project.num}
          </p>
          <h3 
            className="mt-3 text-[19px] sm:text-[21px] font-bold leading-snug transition-colors duration-300 relative z-20"
            style={{ color: accentColor }}
          >
            {project.title}
          </h3>
          <p className="mt-3.5 text-[14px] font-normal text-white/95 leading-[1.7] relative z-20 max-w-[85%] sm:max-w-[78%]">
            {project.desc}
          </p>
        </div>

        {/* Project tags list */}
        <ul className="mt-6 flex flex-wrap gap-2 relative z-20">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[rgba(167,139,250,0.15)] bg-[rgba(167,139,250,0.06)] px-3.5 py-0.5 text-[11.5px] text-[#A78BFA] font-semibold transition-all duration-300 group-hover/outer:border-[#C4B5FD]/30 group-hover/outer:text-[#E8E4F8]"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* View Case Study Button Link */}
        <div className="mt-6 relative z-20">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            className="group/link inline-flex items-center text-[13px] font-semibold transition-all duration-300"
            style={{ color: accentColor }}
          >
            <span>View case study</span>
            <span className="transition-all duration-300 ml-[6px] group-hover/link:ml-[10px] group-hover/outer:translate-x-[2px]">
              →
            </span>
          </motion.a>
        </div>

        {/* Background art vector (Sits bottom-right, opacity boosts on hover) */}
        <div
          className="absolute bottom-[-15px] right-[-15px] pointer-events-none transition-all duration-500 z-0"
          style={{ opacity: isHovered ? 0.16 : 0.05 }}
        >
          {project.bgArt}
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
              className={`absolute bottom-[10px] right-[10px] w-[3px] h-[3px] rounded-full particle-dot particle-dot-${dotIdx}`}
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
   Custom SVG Background Art Vector Components with Sequential Draw Anim Rules
   ============================================================ */

function BgArtWork1() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#A78BFA" strokeWidth="0.5" className="pointer-events-none">
      {/* Radar circle concentric scans */}
      <circle cx="50" cy="50" r="16" strokeDasharray="3 3" className="pulse-circle origin-center" />
      <circle cx="50" cy="50" r="28" strokeDasharray="2 4" opacity="0.4" />
      <circle cx="50" cy="50" r="40" strokeDasharray="1 5" opacity="0.2" />

      {/* Grid cross lines */}
      <line x1="10" y1="50" x2="90" y2="50" opacity="0.3" />
      <line x1="50" y1="10" x2="50" y2="90" opacity="0.3" />

      {/* Radar sweeping line & nodes */}
      <line x1="50" y1="50" x2="82" y2="28" strokeWidth="0.85" className="draw-path-line" />
      <line x1="50" y1="50" x2="22" y2="72" strokeWidth="0.85" className="draw-path-line" />

      <circle cx="82" cy="28" r="3.5" fill="#34D399" className="scale-node-dot origin-center" />
      <circle cx="22" cy="72" r="3" fill="#A78BFA" className="scale-node-dot origin-center" />

      {/* Uptime metric badge text */}
      <g transform="translate(56, 75)" className="scale-node-dot origin-center">
        <text fill="#10B981" fontSize="9.5" fontWeight="extrabold" letterSpacing="0.05em">99.9%</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Uptime delivered</text>
      </g>
    </svg>
  );
}

function BgArtWork2() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#C4B5FD" strokeWidth="0.6" className="pointer-events-none">
      {/* Big Cloud */}
      <path 
        d="M28,45 C24,45 20,41 20,36 C20,31 24,27 29,27 C31,20 38,15 46,15 C53,15 59,19 62,25 C65,23 68,23 71,25 C74,27 76,31 76,35 C76,40 72,45 67,45 Z" 
        className="draw-path-line"
      />
      
      {/* Small Cloud */}
      <path 
        d="M50,68 C47.5,68 45,65.5 45,63 C45,60.5 47.5,58 50,58 C51,53.5 55,50 60,50 C64.5,50 68,52.5 69.5,56 C71,55 73,55 74.5,56.5 C76,58 77,60.5 77,63 C77,65.5 74.5,68 72,68 Z" 
        className="draw-path-line"
      />

      {/* Connecting Dotted Line with active scroll dash */}
      <path 
        d="M46,38 C46,46 54,48 54,54" 
        strokeWidth="0.8" 
        strokeDasharray="3 3" 
        className="scroll-dash-path" 
      />

      <circle cx="54" cy="54" r="2" fill="#C4B5FD" className="scale-node-dot origin-center" />

      {/* Deployment metric badge text */}
      <g transform="translate(68, 80)" className="scale-node-dot origin-center">
        <text fill="#C4B5FD" fontSize="10.5" fontWeight="extrabold" letterSpacing="0.05em">3x</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Faster deployment</text>
      </g>
    </svg>
  );
}

function BgArtWork3() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#A78BFA" strokeWidth="0.55" className="pointer-events-none">
      {/* Horizontal Pipeline flow path */}
      <line x1="10" y1="36" x2="90" y2="36" className="draw-path-line" />

      {/* DevOps Stage Blocks */}
      <g className="scale-devops-box origin-center">
        {/* Code Box */}
        <rect x="12" y="28" width="13" height="8" rx="1.5" strokeWidth="0.5" />
        <text fill="#A78BFA" fontSize="3" fontWeight="bold" x="14.5" y="33.5">CODE</text>

        {/* Build Box */}
        <rect x="31" y="28" width="13" height="8" rx="1.5" strokeWidth="0.5" />
        <text fill="#A78BFA" fontSize="3" fontWeight="bold" x="33" y="33.5">BUILD</text>

        {/* Test Box */}
        <rect x="50" y="28" width="13" height="8" rx="1.5" strokeWidth="0.5" />
        <text fill="#A78BFA" fontSize="3" fontWeight="bold" x="52.5" y="33.5">TEST</text>

        {/* Deploy Box */}
        <rect x="69" y="28" width="13" height="8" rx="1.5" strokeWidth="0.5" />
        <text fill="#A78BFA" fontSize="3" fontWeight="bold" x="70.5" y="33.5">DEPLOY</text>
      </g>

      {/* Loops underneath representing iterations */}
      <path d="M25,48 A 6 6 0 0 0 37,48" strokeDasharray="2 2" opacity="0.4" />
      <path d="M44,48 A 6 6 0 0 0 56,48" strokeDasharray="2 2" opacity="0.4" />
      <path d="M63,48 A 6 6 0 0 0 75,48" strokeDasharray="2 2" opacity="0.4" />

      {/* DevOps metric badge text */}
      <g transform="translate(68, 76)" className="scale-node-dot origin-center">
        <text fill="#A78BFA" fontSize="10.5" fontWeight="extrabold" letterSpacing="0.05em">80%</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Deploy time cut</text>
      </g>
    </svg>
  );
}

function BgArtWork4() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#C4B5FD" strokeWidth="0.5" className="pointer-events-none">
      {/* ETL cylinder storage */}
      <g transform="translate(18, 15)">
        <ellipse cx="12" cy="6" rx="8" ry="3.5" strokeWidth="0.6" className="draw-path-line" />
        <line x1="4" y1="6" x2="4" y2="20" strokeWidth="0.6" />
        <line x1="20" y1="6" x2="20" y2="20" strokeWidth="0.6" />
        <path d="M4,13 C4,16.5 20,16.5 20,13" strokeWidth="0.6" opacity="0.5" />
        <path d="M4,20 C4,23.5 20,23.5 20,20" strokeWidth="0.6" className="draw-path-line" />
        <text fill="#C4B5FD" fontSize="3" fontWeight="bold" x="8.5" y="14.5" opacity="0.7">ETL</text>
      </g>

      {/* Arrow going from ETL to Chart */}
      <path d="M42,26 C48,26 50,34 50,42" strokeDasharray="2 2" className="scroll-dash-path" />

      {/* Incremental Bar Chart */}
      <g transform="translate(54, 30)">
        {/* Bar 1 */}
        <rect x="2" y="24" width="4.5" height="12" rx="0.8" className="scale-chart-bar origin-bottom" style={{ transformOrigin: "4px 36px" }} />
        {/* Bar 2 */}
        <rect x="9.5" y="16" width="4.5" height="20" rx="0.8" className="scale-chart-bar origin-bottom" style={{ transformOrigin: "11px 36px" }} />
        {/* Bar 3 */}
        <rect x="17" y="6" width="4.5" height="30" rx="0.8" className="scale-chart-bar origin-bottom" style={{ transformOrigin: "19px 36px" }} />
        {/* Bar 4 */}
        <rect x="24.5" y="12" width="4.5" height="24" rx="0.8" className="scale-chart-bar origin-bottom" style={{ transformOrigin: "26px 36px" }} />

        {/* Peak chart line connecting bars */}
        <path d="M4.5,24 L12,16 L19.5,6 L27,12" strokeWidth="0.75" className="draw-path-line" />
        <circle cx="19.5" cy="6" r="1.5" fill="#34D399" className="scale-node-dot origin-center" />
      </g>

      {/* Revenue metric badge text */}
      <g transform="translate(62, 80)" className="scale-node-dot origin-center">
        <text fill="#C4B5FD" fontSize="10.5" fontWeight="extrabold" letterSpacing="0.05em">2.4x</text>
        <text fill="#7068A0" fontSize="5" fontWeight="semibold" y="7">Revenue insight gain</text>
      </g>
    </svg>
  );
}
