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
        @keyframes iot-line-draw {
          0% { stroke-dashoffset: 40; opacity: 0.48; }
          100% { stroke-dashoffset: 0; opacity: 0.95; }
        }
        .iot-line {
          stroke-dasharray: 40;
          stroke-dashoffset: 0;
          opacity: 0.48;
          transition: opacity 0.3s, stroke-dashoffset 0.3s;
        }
        .group\\/outer:hover .iot-line {
          opacity: 0.95;
          animation: iot-line-draw 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes iot-node-pop {
          0% { transform: scale(0); opacity: 0.48; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .iot-node {
          transform: scale(1);
          opacity: 0.48;
          transition: opacity 0.3s, transform 0.3s;
        }
        .iot-node-tl { transform-origin: 28px 28px; }
        .iot-node-tr { transform-origin: 92px 28px; }
        .iot-node-bl { transform-origin: 28px 92px; }
        .iot-node-br { transform-origin: 92px 92px; }
        
        .group\\/outer:hover .iot-node {
          opacity: 1;
          animation: iot-node-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .group\\/outer:hover .iot-node-tl { animation-delay: 0.15s; }
        .group\\/outer:hover .iot-node-tr { animation-delay: 0.3s; }
        .group\\/outer:hover .iot-node-bl { animation-delay: 0.45s; }
        .group\\/outer:hover .iot-node-br { animation-delay: 0.6s; }

        @keyframes iot-center-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 1px rgba(167,139,250,0.3)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 8px rgba(167,139,250,0.7)); }
        }
        .iot-center-g {
          transform-origin: 60px 60px;
          opacity: 0.55;
          transition: opacity 0.3s;
        }
        .group\\/outer:hover .iot-center-g {
          opacity: 1;
          animation: iot-center-glow 2.5s ease-in-out infinite;
        }

        @keyframes cloud-draw {
          0% { stroke-dashoffset: 200; opacity: 0.48; }
          100% { stroke-dashoffset: 0; opacity: 0.95; }
        }
        .cloud-path {
          stroke-dasharray: 200;
          stroke-dashoffset: 0;
          opacity: 0.48;
          transition: opacity 0.3s, stroke-dashoffset 0.3s;
        }
        .group\\/outer:hover .cloud-path {
          opacity: 0.95;
          animation: cloud-draw 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .cloud-node-dot {
          transform: scale(1);
          opacity: 0.48;
          transition: opacity 0.3s, transform 0.3s;
        }
        .cloud-node-top { transform-origin: 64px 34px; }
        .cloud-node-bl { transform-origin: 35px 82px; }
        .cloud-node-br { transform-origin: 85px 82px; }
        
        .group\\/outer:hover .cloud-node-dot {
          opacity: 1;
          animation: iot-node-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .group\\/outer:hover .cloud-node-top { animation-delay: 0.4s; }
        .group\\/outer:hover .cloud-node-bl { animation-delay: 0.8s; }
        .group\\/outer:hover .cloud-node-br { animation-delay: 0.8s; }

        @keyframes devops-draw {
          0% { stroke-dashoffset: 240; opacity: 0.48; }
          100% { stroke-dashoffset: 0; opacity: 0.95; }
        }
        .devops-path {
          stroke-dasharray: 240;
          stroke-dashoffset: 0;
          opacity: 0.48;
          transition: opacity 0.3s, stroke-dashoffset 0.3s;
        }
        .group\\/outer:hover .devops-path {
          opacity: 0.95;
          animation: devops-draw 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .devops-text {
          opacity: 0.55;
          transition: opacity 0.3s, fill 0.3s;
        }
        @keyframes text-glow-devops {
          0%, 100% { opacity: 0.8; fill: #C4B5FD; filter: drop-shadow(0 0 1px rgba(196,181,253,0.3)); }
          50% { opacity: 1; fill: #ffffff; filter: drop-shadow(0 0 6px rgba(196,181,253,0.8)); }
        }
        .group\\/outer:hover .devops-text {
          opacity: 0.95;
          animation: text-glow-devops 2s ease-in-out infinite;
        }

        @keyframes gear-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .gear-group {
          transform-origin: 30px 38px;
          opacity: 0.55;
          transition: opacity 0.3s;
        }
        .group\\/outer:hover .gear-group {
          opacity: 0.95;
          animation: gear-spin 4s linear infinite;
        }

        @keyframes chart-bar-grow {
          0% { transform: scaleY(0); opacity: 0.48; }
          100% { transform: scaleY(1); opacity: 0.95; }
        }
        .chart-bar {
          opacity: 0.48;
          transition: opacity 0.3s, transform 0.3s;
        }
        .chart-bar-1 { transform-origin: 48px 90px; }
        .chart-bar-2 { transform-origin: 60px 90px; }
        .chart-bar-3 { transform-origin: 72px 90px; }
        .chart-bar-4 { transform-origin: 84px 90px; }
        
        .group\\/outer:hover .chart-bar {
          opacity: 0.95;
          animation: chart-bar-grow 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .group\\/outer:hover .chart-bar-1 { animation-delay: 0.1s; }
        .group\\/outer:hover .chart-bar-2 { animation-delay: 0.25s; }
        .group\\/outer:hover .chart-bar-3 { animation-delay: 0.4s; }
        .group\\/outer:hover .chart-bar-4 { animation-delay: 0.55s; }

        @keyframes growth-arrow-draw {
          0% { stroke-dashoffset: 120; opacity: 0.48; }
          100% { stroke-dashoffset: 0; opacity: 0.95; }
        }
        .growth-arrow {
          stroke-dasharray: 120;
          stroke-dashoffset: 0;
          opacity: 0.48;
          transition: opacity 0.3s, stroke-dashoffset 0.3s;
        }
        .group\\/outer:hover .growth-arrow {
          opacity: 0.95;
          animation: growth-arrow-draw 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.3s;
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
          className="absolute bottom-[-6px] right-[-6px] md:bottom-[-8px] md:right-[-8px] lg:bottom-[-10px] lg:right-[-10px] pointer-events-none transition-all duration-500 z-0"
          style={{ opacity: isHovered ? 0.75 : 0.32 }}
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
    <svg viewBox="0 0 120 120" fill="none" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* 4 Satellite Connectors */}
      <line x1="49" y1="49" x2="35" y2="35" stroke="#A78BFA" strokeWidth="1.6" className="iot-line" />
      <line x1="71" y1="49" x2="85" y2="35" stroke="#A78BFA" strokeWidth="1.6" className="iot-line" />
      <line x1="49" y1="71" x2="35" y2="85" stroke="#A78BFA" strokeWidth="1.6" className="iot-line" />
      <line x1="71" y1="71" x2="85" y2="85" stroke="#A78BFA" strokeWidth="1.6" className="iot-line" />

      {/* Top Stacked Dashes */}
      <line x1="57" y1="40" x2="63" y2="40" stroke="#A78BFA" strokeWidth="1.5" />
      <line x1="57" y1="43" x2="63" y2="43" stroke="#A78BFA" strokeWidth="1.5" />

      {/* Bottom Stacked Dashes */}
      <line x1="57" y1="77" x2="63" y2="77" stroke="#A78BFA" strokeWidth="1.5" />
      <line x1="57" y1="80" x2="63" y2="80" stroke="#A78BFA" strokeWidth="1.5" />

      {/* Satellite Nodes */}
      {/* TL: Lock Node */}
      <g className="iot-node iot-node-tl origin-center">
        <circle cx="28" cy="28" r="10" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.8" />
        <rect x="24" y="27" width="8" height="6" rx="1.2" fill="none" stroke="#C4B5FD" strokeWidth="1" />
        <path d="M25.5,27 L25.5,25.5 A2.5,2.5 0 0,1 30.5,25.5 L30.5,27" fill="none" stroke="#C4B5FD" strokeWidth="1" />
      </g>

      {/* TR: Light Bulb Node */}
      <g className="iot-node iot-node-tr origin-center">
        <circle cx="92" cy="28" r="10" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.8" />
        <circle cx="92" cy="26" r="3.2" fill="none" stroke="#C4B5FD" strokeWidth="1" />
        <path d="M90.5,28.2 L90.5,30.5 L93.5,30.5 L93.5,28.2" fill="none" stroke="#C4B5FD" strokeWidth="1" />
        <line x1="91" y1="31.8" x2="93" y2="31.8" stroke="#C4B5FD" strokeWidth="0.8" />
      </g>

      {/* BL: Home Node */}
      <g className="iot-node iot-node-bl origin-center">
        <circle cx="28" cy="92" r="10" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.8" />
        <path d="M23,93 L28,88.5 L33,93 L33,96.5 L23,96.5 Z" fill="none" stroke="#C4B5FD" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="26.5" y="93" width="3" height="3.5" fill="none" stroke="#C4B5FD" strokeWidth="0.8" />
      </g>

      {/* BR: Cloud Node */}
      <g className="iot-node iot-node-br origin-center">
        <circle cx="92" cy="92" r="10" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.8" />
        <path d="M88,94 C86.5,94 85.5,93 85.5,91.8 C85.5,90.6 86.5,89.5 88,89.5 C88.5,88 90,88 91,89 C92,88.5 93.5,89 93.5,91 C93.5,92 92.5,94 91,94 Z" fill="none" stroke="#C4B5FD" strokeWidth="1" strokeLinejoin="round" />
      </g>

      {/* Center IoT Core */}
      <g className="iot-center-g origin-center">
        <circle cx="60" cy="60" r="15" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.8" />
        <text x="60" y="63.5" fill="#A78BFA" fontSize="8" fontWeight="950" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.05em">IOT</text>
      </g>
    </svg>
  );
}

function BgArtWork2() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      <defs>
        <linearGradient id="coralOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* Branching Tree Connectors */}
      <line x1="35" y1="82" x2="85" y2="82" stroke="url(#coralOrangeGrad)" strokeWidth="1.8" className="cloud-path" />
      <line x1="60" y1="34" x2="60" y2="82" stroke="url(#coralOrangeGrad)" strokeWidth="1.8" className="cloud-path" />

      {/* Clouds Outline */}
      {/* Top Cloud */}
      <path 
        d="M48,42 C44.5,42 41,39 41,34.5 C41,30 44.5,26.5 49.5,26.5 C51,19.5 57,15 65,15 C72,15 78,19 81,25 C84,23 87,23 90,25 C93,27 95,31 95,35 C95,40 91,42 86,42 Z" 
        stroke="url(#coralOrangeGrad)" strokeWidth="2" className="cloud-path" strokeLinecap="round"
      />
      
      {/* Bottom-Left Cloud */}
      <path 
        d="M23,90 C20,90 18,87.5 18,84.5 C18,81.5 20.5,79 24.5,79 C25.5,73.5 29.5,70 35,70 C40,70 44,73 45.5,76.5 C47.5,75.5 49.5,75.5 51,77 C52.5,78.5 53.5,81 53.5,84 C53.5,87 51,90 48,90 Z" 
        stroke="url(#coralOrangeGrad)" strokeWidth="1.8" className="cloud-path" strokeLinecap="round"
      />

      {/* Bottom-Right Cloud */}
      <path 
        d="M73,90 C70,90 68,87.5 68,84.5 C68,81.5 70.5,79 74.5,79 C75.5,73.5 79.5,70 85,70 C90,70 94,73 95.5,76.5 C97.5,75.5 99.5,75.5 101,77 C102.5,78.5 103.5,81 103.5,84 C103.5,87 101,90 98,90 Z" 
        stroke="url(#coralOrangeGrad)" strokeWidth="1.8" className="cloud-path" strokeLinecap="round"
      />

      {/* Central Node Dots inside Clouds */}
      <circle cx="60" cy="34" r="2.8" fill="#FFFFFF" stroke="url(#coralOrangeGrad)" strokeWidth="1.2" className="cloud-node-dot cloud-node-top origin-center" />
      <circle cx="35" cy="82" r="2.5" fill="#FFFFFF" stroke="url(#coralOrangeGrad)" strokeWidth="1.2" className="cloud-node-dot cloud-node-bl origin-center" />
      <circle cx="85" cy="82" r="2.5" fill="#FFFFFF" stroke="url(#coralOrangeGrad)" strokeWidth="1.2" className="cloud-node-dot cloud-node-br origin-center" />
    </svg>
  );
}

function BgArtWork3() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* Infinity Lemniscate Path */}
      <path 
        d="M 60,60 C 45,40 20,40 20,60 C 20,80 45,80 60,60 C 75,40 100,40 100,60 C 100,80 75,80 60,60 Z" 
        stroke="#C4B5FD" strokeWidth="2.8" strokeLinecap="round" className="devops-path"
      />

      {/* Arrow Heads at Loops Exits */}
      {/* Bottom-Left Arrow */}
      <path 
        d="M 23,72 L 20,60 L 32,60" 
        stroke="#C4B5FD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" 
      />
      {/* Top-Right Arrow */}
      <path 
        d="M 97,48 L 100,60 L 88,60" 
        stroke="#C4B5FD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" 
      />

      {/* DEV / OPS Texts inside loops */}
      <text x="36" y="63.2" fill="#C4B5FD" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" className="devops-text">DEV</text>
      <text x="84" y="63.2" fill="#C4B5FD" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" className="devops-text">OPS</text>
    </svg>
  );
}

function BgArtWork4() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] lg:w-[165px] lg:h-[165px] pointer-events-none origin-bottom-right">
      {/* High-Tech Gear Spinning Group (Top-Left) */}
      <g className="gear-group origin-center">
        <circle cx="30" cy="38" r="7.5" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.8" />
        <circle cx="30" cy="38" r="3" fill="none" stroke="#C4B5FD" strokeWidth="1.2" />
        {/* Gear Spokes / Teeth */}
        <path d="M 30 29 L 30 32 M 30 44 L 30 47 M 21 38 L 24 38 M 36 38 L 39 38 M 23.5 31.5 L 26 34 M 34 42 L 36.5 44.5 M 23.5 44.5 L 26 42 M 34 31.5 L 36.5 34" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Incremental Bar Chart Group (Right Side) */}
      <g>
        {/* Bar 1 */}
        <rect x="52" y="75" width="6.5" height="15" rx="1.5" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.2" className="chart-bar chart-bar-1 origin-bottom" />
        {/* Bar 2 */}
        <rect x="64" y="60" width="6.5" height="30" rx="1.5" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.2" className="chart-bar chart-bar-2 origin-bottom" />
        {/* Bar 3 */}
        <rect x="76" y="45" width="6.5" height="45" rx="1.5" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.2" className="chart-bar chart-bar-3 origin-bottom" />
        {/* Bar 4 */}
        <rect x="88" y="30" width="6.5" height="60" rx="1.5" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.2" className="chart-bar chart-bar-4 origin-bottom" />
      </g>

      {/* Sweeping Growth Curve Arrow */}
      <path 
        d="M 30,80 Q 60,75 88,25" 
        stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" className="growth-arrow"
      />
      {/* Arrow Tip */}
      <path 
        d="M 79,26 L 88,25 L 89,34" 
        stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" 
      />
    </svg>
  );
}
