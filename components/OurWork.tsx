"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight, staggerContainer, VIEWPORT } from "@/lib/motion";

interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    num: "PROJECT 01",
    title: "Smart IoT Analytics Platform",
    desc: "Device data collection → Real-time processing → AI analytics → Cloud deployment → Automated monitoring.",
    tags: ["IoT", "AI", "Cloud", "DevOps"],
  },
  {
    num: "PROJECT 02",
    title: "Multicloud ML Infrastructure",
    desc: "ML model training → Multi-cloud deployment → DevOps automation → Performance optimization at scale.",
    tags: ["AWS", "Azure", "ML", "GCP"],
  },
  {
    num: "PROJECT 03",
    title: "Enterprise DevOps Pipeline",
    desc: "CI/CD → Container orchestration → Multi-environment deployment → Intelligent scaling.",
    tags: ["Docker", "K8s", "Jenkins"],
  },
  {
    num: "PROJECT 04",
    title: "Data-Driven AI Solutions",
    desc: "Data warehouse → ETL pipelines → AI model integration → BI dashboards → Agile delivery.",
    tags: ["Data Eng", "AI", "BI", "ETL"],
  },
];

export default function OurWork() {
  return (
    <section id="our-work" className="bg-[#06070E] py-20 sm:py-24 relative overflow-hidden">
      {/* Scope-specific keyframe animations for floating hover particles */}
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
      variants={index % 2 === 0 ? slideLeft : slideRight}
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
      <div className="relative w-full h-full rounded-[16px] bg-[#0D0B1C] px-[28px] py-[32px] overflow-hidden flex flex-col justify-between z-10 flex-1 min-h-[220px]">
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
          <p className="text-[10px] font-bold tracking-[0.20em] text-[#4A4070] uppercase">
            {project.num}
          </p>
          <h3 
            className="mt-3 text-[19px] sm:text-[21px] font-bold leading-snug transition-colors duration-300"
            style={{ color: accentColor }}
          >
            {project.title}
          </h3>
          <p className="mt-3.5 text-[14px] font-normal text-white/95 leading-[1.7] relative z-20">
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
