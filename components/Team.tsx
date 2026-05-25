"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

interface TeamCard {
  name: string;
  role: string;
  desc: string;
  roleColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

const TEAM: TeamCard[] = [
  {
    name: "Industry Veterans",
    role: "Google · Microsoft · Amazon",
    desc: "20+ years combined experience in large-scale software development, cloud infrastructure, and product strategy.",
    roleColor: "#A78BFA",
    iconBg: "rgba(167,139,250,0.10)",
    icon: <IconColumn />,
  },
  {
    name: "AI Researchers",
    role: "PhDs · Published Authors",
    desc: "PhDs in Machine Learning from top universities. Deep learning, NLP, and computer vision specialists.",
    roleColor: "#C4B5FD",
    iconBg: "rgba(196,181,253,0.10)",
    icon: <IconFlask />,
  },
  {
    name: "Successful Entrepreneurs",
    role: "$50M+ Raised · Multiple Exits",
    desc: "Founded companies with successful exits. Built products used by millions of users globally.",
    roleColor: "#E8C5D8",
    iconBg: "rgba(232,197,216,0.10)",
    icon: <IconRocket />,
  },
  {
    name: "Dedicated Mentors",
    role: "1-on-1 · Personalised",
    desc: "Career coaching, skill development planning, and networking throughout your entire journey.",
    roleColor: "#A78BFA",
    iconBg: "rgba(167,139,250,0.08)",
    icon: <IconTarget />,
  },
];

export default function Team() {
  return (
    <section className="bg-nc-surface1 py-16 sm:py-20 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-conic {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinning-ring {
          opacity: 0;
          filter: blur(4px);
          animation: spin-conic 4s linear infinite;
          transition: opacity 0.3s ease;
        }
        .group\\/outer:hover .spinning-ring {
          opacity: 0.75;
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
          <p className="nc-eyebrow">THE PEOPLE BEHIND NC</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            Veterans. Researchers.
            <br />
            <span className="grad-text">Founders.</span>
          </h2>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {TEAM.map((m) => (
            <TeamCardItem key={m.name} m={m} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function TeamCardItem({ m }: { m: TeamCard }) {
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

  return (
    <motion.li
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={fadeUp}
      className="relative p-[1.5px] rounded-[17px] overflow-hidden group/outer flex flex-col h-full select-none cursor-pointer"
      style={{
        background: isHovered
          ? "linear-gradient(135deg, rgba(167,139,250,0.7), rgba(196,181,253,0.4), rgba(232,197,216,0.5))"
          : "rgba(167,139,250,0.10)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease",
      }}
    >
      <div className="relative w-full h-full rounded-[16px] bg-[#0D0B1C] p-7 overflow-hidden flex gap-5 z-10 flex-1">
        {/* Spotlight Effect */}
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

        {/* Icon Ring Wrapper (44px x 44px) */}
        <div className="relative w-11 h-11 flex items-center justify-center rounded-[12px] overflow-hidden shrink-0">
          {/* Spinning conic ring on hover */}
          <div
            className="absolute inset-0 spinning-ring z-0"
            style={{
              background: `conic-gradient(from 0deg, transparent 30%, ${m.roleColor} 50%, #C4B5FD 70%, transparent 100%)`,
            }}
          />
          {/* Mask circle (same bg color as card: #0D0B1C) */}
          <div className="absolute inset-[1px] rounded-[11px] bg-[#0D0B1C] z-10" />

          {/* Actual Icon Box (sits z-index 2 inside) */}
          <div
            className="relative w-full h-full rounded-[11px] flex items-center justify-center z-20 transition-all duration-300"
            style={{
              background: m.iconBg,
              color: m.roleColor,
              boxShadow: isHovered ? `0 0 20px ${m.roleColor}40` : "none",
            }}
          >
            {m.icon}
          </div>
        </div>

        <div className="flex-1 relative z-20">
          <h3 className="text-[16px] font-semibold text-nc-heading sm:text-[17px]">
            {m.name}
          </h3>
          <p
            className="mt-1 text-[12.5px] font-medium"
            style={{ color: m.roleColor }}
          >
            {m.role}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-white">
            {m.desc}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

const ic = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
function IconColumn() {
  return (
    <svg {...ic}>
      <path d="M4 20h16M5 20V8l7-4 7 4v12M9 20v-6M15 20v-6M9 11h6" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg {...ic}>
      <path d="M9 3h6M10 3v7L4 20a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3M7 14h10" />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg {...ic}>
      <path d="M5 19c2-1 4-1 5 0 1 1 1 3 0 5-2-1-4-1-5-5z" />
      <path d="M14 4c4 0 6 2 6 6-2 4-7 8-10 8L8 14c0-3 4-8 8-10z" />
      <circle cx="15" cy="9" r="1.6" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg {...ic}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
