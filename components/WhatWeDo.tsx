"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

interface CardProps {
  num: string;
  title: string;
  desc: string;
  link: string;
  linkColor: string;
  accent: string;
  iconBg: string;
  icon: React.ReactNode;
  bgArt: React.ReactNode;
  bottomBarGradient: string;
  onHoverGlow: string;
  glowColor: string;
}

const CARDS: CardProps[] = [
  {
    num: "01",
    title: "AI Consulting & Delivery",
    desc: "Production-grade AI systems for real clients. IoT, multicloud, data pipelines — end to end.",
    link: "Learn more",
    linkColor: "#A78BFA",
    accent: "#A78BFA",
    iconBg: "linear-gradient(135deg, rgba(109,40,217,0.15), rgba(167,139,250,0.08))",
    icon: <IconBolt />,
    bgArt: <BgArt1 />,
    bottomBarGradient: "linear-gradient(90deg, #7C3AED, #A78BFA)",
    onHoverGlow: "0 0 25px rgba(109,40,217,0.30)",
    glowColor: "rgba(109,40,217,0.30)",
  },
  {
    num: "02",
    title: "Innovation Tracks",
    desc: "Live client projects from day one. Real work, expert mentorship, real outcomes guaranteed.",
    link: "Explore tracks",
    linkColor: "#C4B5FD",
    accent: "#C4B5FD",
    iconBg: "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(196,181,253,0.06))",
    icon: <IconBranching />,
    bgArt: <BgArt2 />,
    bottomBarGradient: "linear-gradient(90deg, #A78BFA, #C4B5FD)",
    onHoverGlow: "0 0 25px rgba(167,139,250,0.25)",
    glowColor: "rgba(167,139,250,0.25)",
  },
  {
    num: "03",
    title: "Startup Launchpad",
    desc: "From intern to founder. Funding access, mentorship, and a global network to launch your own venture.",
    link: "Start journey",
    linkColor: "#E8C5D8",
    accent: "#E8C5D8",
    iconBg: "linear-gradient(135deg, rgba(196,181,253,0.10), rgba(232,197,216,0.06))",
    icon: <IconRocket />,
    bgArt: <BgArt3 />,
    bottomBarGradient: "linear-gradient(90deg, #C4B5FD, #E8C5D8)",
    onHoverGlow: "0 0 25px rgba(196,181,253,0.22)",
    glowColor: "rgba(196,181,253,0.22)",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-[#06070E] py-20 sm:py-24 overflow-hidden relative">
      {/* Component-scoped custom animations for float-up particles, spinning conic ring, and sequential SVG building */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-up {
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
        @keyframes spin-conic {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes neural-drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(4px, -2px) rotate(0.8deg); }
          66% { transform: translate(-2px, 4px) rotate(-0.8deg); }
        }
        
        /* ------------------------------------------------------------
           Sequential Draw-Build Animations (Card 1: Neural Network)
           ------------------------------------------------------------ */
        @keyframes center-node-anim {
          0% { transform: scale(0); opacity: 0; }
          4% { transform: scale(1.3); opacity: 1; }
          8% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes draw-line-phase1 {
          0% { stroke-dashoffset: 60; opacity: 0; }
          6% { opacity: 0; }
          10% { opacity: 1; }
          35% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 60; opacity: 0; }
        }
        @keyframes draw-line-phase2 {
          0% { stroke-dashoffset: 60; opacity: 0; }
          22% { opacity: 0; stroke-dashoffset: 60; }
          28% { opacity: 1; }
          52% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 60; opacity: 0; }
        }
        @keyframes outer-node-anim {
          0% { transform: scale(0); opacity: 0; }
          26% { transform: scale(0); opacity: 0; }
          34% { transform: scale(1.3); opacity: 1; }
          38% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }

        /* ------------------------------------------------------------
           Sequential Draw-Build Animations (Card 2: Circuit tracks)
           ------------------------------------------------------------ */
        @keyframes track-draw-1 {
          0% { stroke-dashoffset: 150; opacity: 0; }
          5% { opacity: 1; }
          35% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 150; opacity: 0; }
        }
        @keyframes track-draw-2 {
          0% { stroke-dashoffset: 150; opacity: 0; }
          16% { stroke-dashoffset: 150; opacity: 0; }
          22% { opacity: 1; }
          52% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 150; opacity: 0; }
        }
        @keyframes track-draw-3 {
          0% { stroke-dashoffset: 150; opacity: 0; }
          32% { stroke-dashoffset: 150; opacity: 0; }
          38% { opacity: 1; }
          64% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 150; opacity: 0; }
        }
        @keyframes dot-grow-1 {
          0% { transform: scale(0); opacity: 0; }
          14% { transform: scale(0); opacity: 0; }
          22% { transform: scale(1.3); opacity: 1; }
          26% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes dot-grow-2 {
          0% { transform: scale(0); opacity: 0; }
          26% { transform: scale(0); opacity: 0; }
          34% { transform: scale(1.3); opacity: 1; }
          38% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes dot-grow-3 {
          0% { transform: scale(0); opacity: 0; }
          34% { transform: scale(0); opacity: 0; }
          42% { transform: scale(1.3); opacity: 1; }
          46% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes dot-grow-4 {
          0% { transform: scale(0); opacity: 0; }
          46% { transform: scale(0); opacity: 0; }
          54% { transform: scale(1.3); opacity: 1; }
          58% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }

        /* ------------------------------------------------------------
           Sequential Draw-Build Animations (Card 3: Galaxy orbits)
           ------------------------------------------------------------ */
        @keyframes planet-grow {
          0% { transform: scale(0); opacity: 0; }
          4% { transform: scale(1.3); opacity: 1; }
          8% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          90% { transform: scale(0); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes orbit-draw-3 {
          0% { stroke-dashoffset: 250; opacity: 0; }
          5% { opacity: 1; }
          32% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 250; opacity: 0; }
        }
        @keyframes orbit-draw-2 {
          0% { stroke-dashoffset: 250; opacity: 0; }
          16% { stroke-dashoffset: 250; opacity: 0; }
          22% { opacity: 1; }
          48% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 250; opacity: 0; }
        }
        @keyframes orbit-draw-1 {
          0% { stroke-dashoffset: 250; opacity: 0; }
          32% { stroke-dashoffset: 250; opacity: 0; }
          38% { opacity: 1; }
          64% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 250; opacity: 0; }
        }
        @keyframes trail-draw {
          0% { stroke-dashoffset: 100; opacity: 0; }
          42% { stroke-dashoffset: 100; opacity: 0; }
          48% { opacity: 0.5; }
          72% { stroke-dashoffset: 0; opacity: 0.5; }
          80% { stroke-dashoffset: 0; opacity: 0.5; }
          90% { opacity: 0; }
          100% { stroke-dashoffset: 100; opacity: 0; }
        }

        /* ------------------------------------------------------------
           Static Elements Base Configuration & Animations Assignment
           ------------------------------------------------------------ */
        .spinning-ring {
          opacity: 0;
          filter: blur(8px);
          animation: spin-conic 4s linear infinite;
          transition: opacity 0.4s ease;
        }
        .group\\/outer:hover .spinning-ring {
          opacity: 0.75;
        }
        
        /* Node & planet transforms */
        .center-node, .outer-node, [class^="circuit-dot-"], .center-planet {
          transform-origin: center;
        }
        
        /* Animation assignment hooks on hover */
        .group\\/outer:hover .neuron-group {
          animation: neural-drift 8s ease-in-out infinite;
        }
        .group\\/outer:hover .center-node {
          animation: center-node-anim 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .primary-line {
          stroke-dasharray: 60;
          animation: draw-line-phase1 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .secondary-line {
          stroke-dasharray: 60;
          animation: draw-line-phase2 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .outer-node {
          animation: outer-node-anim 4.5s infinite ease-in-out;
        }

        .group\\/outer:hover .circuit-path-1 {
          stroke-dasharray: 150;
          animation: track-draw-1 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .circuit-path-2 {
          stroke-dasharray: 150;
          animation: track-draw-2 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .circuit-path-3 {
          stroke-dasharray: 150;
          animation: track-draw-3 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .circuit-dot-1 {
          animation: dot-grow-1 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .circuit-dot-2 {
          animation: dot-grow-2 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .circuit-dot-3 {
          animation: dot-grow-3 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .circuit-dot-4 {
          animation: dot-grow-4 4.5s infinite ease-in-out;
        }

        .group\\/outer:hover .center-planet {
          animation: planet-grow 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .orbit-path-1 {
          stroke-dasharray: 250;
          animation: orbit-draw-1 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .orbit-path-2 {
          stroke-dasharray: 250;
          animation: orbit-draw-2 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .orbit-path-3 {
          stroke-dasharray: 250;
          animation: orbit-draw-3 4.5s infinite ease-in-out;
        }
        .group\\/outer:hover .rocket-trail {
          stroke-dasharray: 100;
          animation: trail-draw 4.5s infinite ease-in-out;
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
          animation: float-up 2.2s infinite linear;
          animation-delay: 0s;
        }
        .group\\/outer:hover .particle-dot-1 {
          animation: float-up 2.2s infinite linear;
          animation-delay: 0.4s;
        }
        .group\\/outer:hover .particle-dot-2 {
          animation: float-up 2.2s infinite linear;
          animation-delay: 0.8s;
        }
        .group\\/outer:hover .particle-dot-3 {
          animation: float-up 2.2s infinite linear;
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
          <p className="nc-eyebrow">THE NOVACRYSTARA ECOSYSTEM</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            Three layers.
            <br />
            <span className="grad-text">One mission.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#7068A0] sm:text-[16px]">
            We don&apos;t just train people. We build AI products for clients,
            grow elite talent, and launch the next generation of founders.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {CARDS.map((card, index) => (
            <CardItem key={card.num} card={card} index={index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function CardItem({ card, index }: { card: CardProps; index: number }) {
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
      {/* Inner card content wrapper - Highly expanded padding and height settings */}
      <div className="relative w-full h-full rounded-[16px] bg-[#0D0B1C] px-[28px] py-[38px] min-h-[410px] sm:min-h-[430px] md:min-h-[450px] overflow-hidden flex flex-col justify-between z-10 flex-1">
        {/* Spotlight Effect (radial gradient follows cursor position inside each card) */}
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
          {/* Card Header with Number and Icon Box */}
          <div className="flex items-center justify-between relative z-20">
            <span className="text-[9px] font-bold text-[#211C35] tracking-[0.16em] uppercase">
              {card.num}
            </span>

            {/* Icon Ring Wrapper (52px x 52px) */}
            <div className="relative w-[52px] h-[52px] flex items-center justify-center rounded-[14px] overflow-hidden">
              {/* Spinning conic ring on hover */}
              <div
                className="absolute inset-0 spinning-ring z-0"
                style={{
                  background: "conic-gradient(from 0deg, transparent 30%, #A78BFA 50%, #C4B5FD 70%, transparent 100%)",
                }}
              />
              {/* Mask circle (same bg color as card: #0D0B1C) */}
              <div className="absolute inset-[1px] rounded-[13px] bg-[#0D0B1C] z-10" />

              {/* Actual Icon Box (sits z-index 2 inside, 14px border radius) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-full h-full rounded-[14px] flex items-center justify-center z-20 transition-all duration-300"
                style={{
                  background: card.iconBg,
                  boxShadow: isHovered ? card.onHoverGlow : "none",
                }}
              >
                {card.icon}
              </motion.div>
            </div>
          </div>

          {/* Title - Stylized in its card specific theme accent color and enlarged size */}
          <h3 
            className="mt-10 text-[21px] sm:text-[23px] font-bold leading-snug relative z-20 transition-colors duration-300"
            style={{ color: card.accent }}
          >
            {card.title}
          </h3>

          {/* Description - Set in beautiful, crisp pure white color with high legibility */}
          <p className="mt-4 text-[14px] font-normal text-white leading-[1.8] relative z-20">
            {card.desc}
          </p>
        </div>

        {/* Link arrow element */}
        <div className="mt-10 relative z-20">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            className="group/link inline-flex items-center text-[13px] font-semibold transition-all duration-300"
            style={{ color: card.linkColor }}
          >
            <span>{card.link}</span>
            <span className="transition-all duration-300 ml-[6px] group-hover/link:ml-[10px] group-hover/outer:translate-x-[2px]">
              →
            </span>
          </motion.a>
        </div>

        {/* Background art (SVG, bottom-right, opacity 0.06 -> 0.13 on hover) */}
        <div
          className="absolute bottom-[-20px] right-[-20px] pointer-events-none transition-all duration-500 z-0"
          style={{ opacity: isHovered ? 0.13 : 0.06 }}
        >
          {card.bgArt}
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 z-20"
          style={{
            background: card.bottomBarGradient,
            opacity: isHovered ? 1 : 0.4,
            borderRadius: "0 0 16px 16px",
          }}
        />

        {/* Floating particles (4 x 3px dots floating up on hover) */}
        <div className="absolute bottom-[20px] right-[20px] w-[50px] h-[50px] pointer-events-none overflow-hidden z-20">
          {[0, 1, 2, 3].map((dotIdx) => (
            <div
              key={dotIdx}
              className={`absolute bottom-[10px] right-[10px] w-[3px] h-[3px] rounded-full particle-dot particle-dot-${dotIdx}`}
              style={{
                background: card.accent,
              }}
            />
          ))}
        </div>
      </div>
    </motion.li>
  );
}

/* ============================================================
   Custom SVG Icons & Background Art Components
   ============================================================ */

function IconBolt() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#A78BFA" stroke="#C4B5FD" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  );
}

function IconBranching() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H9C10.5 12 11.5 10.5 12 9.5L14.5 5.5C15 4.5 16 4 17 4H20" stroke="#C4B5FD" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M9 12C10.5 12 11.5 13.5 12 14.5L14.5 18.5C15 19.5 16 20 17 20H20" stroke="#C4B5FD" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="5" cy="12" r="2" fill="#C4B5FD" stroke="#C4B5FD" strokeWidth="0.5"/>
      <circle cx="20" cy="4" r="2" fill="#C4B5FD" stroke="#C4B5FD" strokeWidth="0.5"/>
      <circle cx="20" cy="20" r="2" fill="#C4B5FD" stroke="#C4B5FD" strokeWidth="0.5"/>
    </svg>
  );
}

function IconRocket() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 16 6 16 11C16 15 14 17 12 17C10 17 8 15 8 11C8 6 12 2 12 2Z" fill="#E8C5D8" stroke="#C4B5FD" strokeWidth="0.5"/>
      <path d="M8 12C6.5 13.5 6 16 6 16L8 15" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M16 12C17.5 13.5 18 16 18 16L16 15" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 18C10 20 11 22 12 22C13 22 14 20 14 18" stroke="#E8C5D8" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M11 18C11 19.5 11.5 20.5 12 20.5C12.5 20.5 13 19.5 13 18" stroke="#E8C5D8" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function BgArt1() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#A78BFA" strokeWidth="0.5" className="pointer-events-none">
      <g className="neuron-group origin-center">
        {/* Orbit circles */}
        <circle cx="50" cy="50" r="22" strokeDasharray="3 3" strokeOpacity="0.4" />
        <circle cx="50" cy="50" r="32" strokeDasharray="2 4" strokeOpacity="0.3" />
        <circle cx="50" cy="50" r="42" strokeDasharray="1 5" strokeOpacity="0.2" />
        
        {/* Connections */}
        <line x1="50" y1="50" x2="30" y2="35" strokeOpacity="0.6" className="primary-line" />
        <line x1="50" y1="50" x2="70" y2="30" strokeOpacity="0.6" className="primary-line" />
        <line x1="50" y1="50" x2="75" y2="60" strokeOpacity="0.6" className="primary-line" />
        <line x1="50" y1="50" x2="25" y2="65" strokeOpacity="0.6" className="primary-line" />
        <line x1="50" y1="50" x2="50" y2="80" strokeOpacity="0.6" className="primary-line" />
        
        {/* Connection lines between outer nodes to form a true neural mesh */}
        <line x1="30" y1="35" x2="25" y2="65" strokeDasharray="1 1" strokeOpacity="0.4" className="secondary-line" />
        <line x1="70" y1="30" x2="75" y2="60" strokeDasharray="1 1" strokeOpacity="0.4" className="secondary-line" />
        <line x1="75" y1="60" x2="50" y2="80" strokeDasharray="1 1" strokeOpacity="0.4" className="secondary-line" />
        
        {/* Center node */}
        <circle cx="50" cy="50" r="4" fill="#A78BFA" className="center-node" />

        {/* Outer nodes / neurons */}
        <circle cx="30" cy="35" r="2.5" fill="#C4B5FD" className="outer-node" />
        <circle cx="70" cy="30" r="3" fill="#C4B5FD" className="outer-node" />
        <circle cx="75" cy="60" r="2.5" fill="#C4B5FD" className="outer-node" />
        <circle cx="25" cy="65" r="3.5" fill="#C4B5FD" className="outer-node" />
        <circle cx="50" cy="80" r="2.5" fill="#C4B5FD" className="outer-node" />
      </g>
    </svg>
  );
}

function BgArt2() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#C4B5FD" strokeWidth="0.6" className="pointer-events-none">
      {/* Branching paths that dynamically draw themselves */}
      <path d="M 10 30 L 50 30 L 50 70 L 90 70" className="circuit-path-1" />
      <path d="M 20 50 L 70 50 L 70 20" className="circuit-path-2" />
      <path d="M 40 80 L 40 60 L 80 60" className="circuit-path-3" />
      
      {/* Junction dots that pop-grow as the lines reach them */}
      <circle cx="50" cy="30" r="2.5" fill="#C4B5FD" className="circuit-dot-1" />
      <circle cx="50" cy="70" r="2.5" fill="#C4B5FD" className="circuit-dot-2" />
      <circle cx="70" cy="50" r="2" fill="#C4B5FD" className="circuit-dot-3" />
      <circle cx="40" cy="60" r="2" fill="#C4B5FD" className="circuit-dot-4" />
    </svg>
  );
}

function BgArt3() {
  return (
    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="#E8C5D8" strokeWidth="0.5" className="pointer-events-none">
      <g transform="rotate(-30 50 50)">
        {/* Elliptical orbits that draw themselves */}
        <ellipse cx="50" cy="50" rx="35" ry="12" strokeDasharray="3 3" className="orbit-path-1" />
        <ellipse cx="50" cy="50" rx="25" ry="8" strokeDasharray="2 2" className="orbit-path-2" />
        <ellipse cx="50" cy="50" rx="15" ry="5" className="orbit-path-3" />
      </g>
      {/* Center planet */}
      <circle cx="50" cy="50" r="3.5" fill="#E8C5D8" className="center-planet" />
      {/* Faint rocket trail */}
      <path d="M 30 20 Q 50 15 70 30" strokeDasharray="1 3" opacity="0.5" className="rocket-trail" />
    </svg>
  );
}
