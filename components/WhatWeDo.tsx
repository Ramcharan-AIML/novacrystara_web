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

        .spinning-ring {
          opacity: 0;
          filter: blur(8px);
          animation: spin-conic 4s linear infinite;
          transition: opacity 0.4s ease;
        }
        .group\\/outer:hover .spinning-ring {
          opacity: 0.75;
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
        }        /* ============================================================
           CARD 1: AI Chip CPU forming & glowing animations
           ============================================================ */
        @keyframes cpu-track-draw {
          0% { stroke-dashoffset: 60; opacity: 0.48; }
          100% { stroke-dashoffset: 0; opacity: 0.95; }
        }
        .cpu-track {
          stroke-dasharray: 60;
          stroke-dashoffset: 0;
          opacity: 0.48;
          transition: opacity 0.3s, stroke-dashoffset 0.3s;
        }
        .group\\/outer:hover .cpu-track {
          opacity: 0.95;
          animation: cpu-track-draw 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .group\\/outer:hover .track-top-mid { animation-delay: 0.05s; }
        .group\\/outer:hover .track-bot-mid { animation-delay: 0.05s; }
        .group\\/outer:hover .track-left-mid { animation-delay: 0.05s; }
        .group\\/outer:hover .track-right-mid { animation-delay: 0.05s; }
        
        .group\\/outer:hover .track-top-left { animation-delay: 0.2s; }
        .group\\/outer:hover .track-top-right { animation-delay: 0.2s; }
        .group\\/outer:hover .track-bot-left { animation-delay: 0.2s; }
        .group\\/outer:hover .track-bot-right { animation-delay: 0.2s; }
        .group\\/outer:hover .track-left-top { animation-delay: 0.2s; }
        .group\\/outer:hover .track-left-bot { animation-delay: 0.2s; }
        .group\\/outer:hover .track-right-top { animation-delay: 0.2s; }
        .group\\/outer:hover .track-right-bot { animation-delay: 0.2s; }

        @keyframes cpu-dot-pop {
          0% { transform: scale(0); opacity: 0.48; }
          65% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .cpu-dot {
          transform: scale(1);
          opacity: 0.48;
          transition: opacity 0.3s, transform 0.3s;
        }
        /* Top dots origins */
        .dot-top-mid { transform-origin: 50px 15px; }
        .dot-top-left { transform-origin: 35px 15px; }
        .dot-top-right { transform-origin: 65px 15px; }
        /* Bot dots origins */
        .dot-bot-mid { transform-origin: 50px 85px; }
        .dot-bot-left { transform-origin: 35px 85px; }
        .dot-bot-right { transform-origin: 65px 85px; }
        /* Left dots origins */
        .dot-left-mid { transform-origin: 15px 50px; }
        .dot-left-top { transform-origin: 15px 35px; }
        .dot-left-bot { transform-origin: 15px 65px; }
        /* Right dots origins */
        .dot-right-mid { transform-origin: 85px 50px; }
        .dot-right-top { transform-origin: 85px 35px; }
        .dot-right-bot { transform-origin: 85px 65px; }

        .group\\/outer:hover .cpu-dot {
          opacity: 1;
          animation: cpu-dot-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .group\\/outer:hover .dot-top-mid { animation-delay: 0.35s; }
        .group\\/outer:hover .dot-bot-mid { animation-delay: 0.35s; }
        .group\\/outer:hover .dot-left-mid { animation-delay: 0.35s; }
        .group\\/outer:hover .dot-right-mid { animation-delay: 0.35s; }

        .group\\/outer:hover .dot-top-left { animation-delay: 0.5s; }
        .group\\/outer:hover .dot-top-right { animation-delay: 0.5s; }
        .group\\/outer:hover .dot-bot-left { animation-delay: 0.5s; }
        .group\\/outer:hover .dot-bot-right { animation-delay: 0.5s; }
        .group\\/outer:hover .dot-left-top { animation-delay: 0.5s; }
        .group\\/outer:hover .dot-left-bot { animation-delay: 0.5s; }
        .group\\/outer:hover .dot-right-top { animation-delay: 0.5s; }
        .group\\/outer:hover .dot-right-bot { animation-delay: 0.5s; }

        @keyframes chip-scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .cpu-box, .cpu-inner-box {
          transform-origin: 50px 50px;
          opacity: 0.55;
          transition: opacity 0.3s, stroke 0.3s;
        }
        .cpu-text {
          opacity: 0.55;
          transition: opacity 0.3s, fill 0.3s;
        }
        .group\\/outer:hover .cpu-box {
          opacity: 1;
          animation: chip-scale 3s ease-in-out infinite;
          stroke: #A78BFA;
        }
        .group\\/outer:hover .cpu-inner-box {
          opacity: 1;
        }
        @keyframes text-glow {
          0%, 100% { opacity: 0.8; fill: #A78BFA; filter: drop-shadow(0 0 1px rgba(167,139,250,0.3)); }
          50% { opacity: 1; fill: #ffffff; filter: drop-shadow(0 0 6px rgba(196,181,253,0.8)); }
        }
        .group\\/outer:hover .cpu-text {
          opacity: 1;
          animation: text-glow 2s ease-in-out infinite;
        }

        /* ============================================================
           CARD 2: Serpentine Winding Track animations
           ============================================================ */
        @keyframes serpentine-draw {
          0% { stroke-dashoffset: 350; opacity: 0.48; }
          100% { stroke-dashoffset: 0; opacity: 0.95; }
        }
        .serpentine-path {
          stroke-dasharray: 350;
          stroke-dashoffset: 0;
          opacity: 0.48;
          transition: opacity 0.3s, stroke-dashoffset 0.3s;
        }
        .group\\/outer:hover .serpentine-path {
          opacity: 0.95;
          animation: serpentine-draw 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .track-dot {
          transform: scale(1);
          opacity: 0.48;
          transition: opacity 0.3s, transform 0.3s;
        }
        .junction-1 { transform-origin: 70px 30px; }
        .junction-2 { transform-origin: 50px 60px; }
        .junction-3 { transform-origin: 50px 90px; }
        
        .group\\/outer:hover .track-dot {
          opacity: 1;
          animation: cpu-dot-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .group\\/outer:hover .junction-1 { animation-delay: 0.3s; }
        .group\\/outer:hover .junction-2 { animation-delay: 0.75s; }
        .group\\/outer:hover .junction-3 { animation-delay: 1.2s; }

        @keyframes start-chevron-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 1px rgba(196,181,253,0.3)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 5px rgba(196,181,253,0.6)); }
        }
        .start-node {
          transform-origin: 25px 30px;
          opacity: 0.55;
          transition: opacity 0.3s;
        }
        .group\\/outer:hover .start-node {
          opacity: 1;
          animation: start-chevron-pulse 2s ease-in-out infinite;
        }

        .target-node {
          transform-origin: 75px 90px;
          opacity: 0.55;
          transition: opacity 0.3s;
        }
        .target-outer { transform-origin: 75px 90px; }
        .target-inner {
          transform-origin: 75px 90px;
          opacity: 0.55;
          transition: opacity 0.3s, fill 0.3s;
        }
        
        .group\\/outer:hover .target-node {
          opacity: 1;
          animation: cpu-dot-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 1.35s;
        }
        @keyframes target-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.22); opacity: 1; fill: #ffffff; }
        }
        .group\\/outer:hover .target-inner {
          opacity: 1;
          animation: target-pulse 1.8s ease-in-out infinite;
          animation-delay: 1.85s;
        }

        /* ============================================================
           CARD 3: Rocket Space Badge circular & blast-off animations
           ============================================================ */
        @keyframes badge-ring-draw {
          0% { stroke-dashoffset: 240; opacity: 0.48; }
          100% { stroke-dashoffset: 0; opacity: 0.85; }
        }
        .badge-ring {
          stroke-dasharray: 240;
          stroke-dashoffset: 0;
          opacity: 0.48;
          transform-origin: 50px 50px;
          transition: opacity 0.3s, stroke-dashoffset 0.3s;
        }
        .group\\/outer:hover .badge-ring {
          opacity: 0.85;
          animation: badge-ring-draw 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.05s;
        }
        @keyframes badge-inner-scale {
          0% { transform: scale(0); opacity: 0.48; }
          100% { transform: scale(1); opacity: 1; }
        }
        .badge-inner-ring {
          transform-origin: 50px 50px;
          transform: scale(1);
          opacity: 0.48;
          transition: opacity 0.3s, transform 0.3s;
        }
        .group\\/outer:hover .badge-inner-ring {
          opacity: 1;
          animation: badge-inner-scale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.25s;
        }

        @keyframes star-pop {
          0% { transform: scale(0); opacity: 0.48; }
          70% { transform: scale(1.2); opacity: 0.95; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .star {
          transform: scale(1);
          opacity: 0.48;
          transition: opacity 0.3s, transform 0.3s;
        }
        .star-1 { transform-origin: 28px 44px; }
        .star-2 { transform-origin: 72px 66.5px; }
        .star-3 { transform-origin: 34px 65px; }
        .star-4 { transform-origin: 65px 28px; }
        
        .group\\/outer:hover .star {
          opacity: 0.9;
          animation: star-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .group\\/outer:hover .star-1 { animation-delay: 0.35s; }
        .group\\/outer:hover .star-2 { animation-delay: 0.55s; }
        .group\\/outer:hover .star-3 { animation-delay: 0.75s; }
        .group\\/outer:hover .star-4 { animation-delay: 0.95s; }

        @keyframes rocket-entry {
          0% { transform: translate(-30px, 30px) scale(0.6); opacity: 0.5; }
          70% { transform: translate(3px, -3px) scale(1.05); opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes rocket-vibrate {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(0.6px, -0.6px); }
          50% { transform: translate(-0.3px, 0.3px); }
          75% { transform: translate(0.3px, 0.6px); }
        }
        .rocket-ship {
          transform: translate(0, 0) scale(1);
          opacity: 0.55;
          transform-origin: 29.5px 70.5px;
          transition: opacity 0.3s, transform 0.3s;
        }
        .group\\/outer:hover .rocket-ship {
          opacity: 1;
          animation: rocket-entry 1.1s cubic-bezier(0.19, 1, 0.22, 1) forwards,
                     rocket-vibrate 0.15s linear infinite;
          animation-delay: 0.25s, 1.25s;
        }
        @keyframes flame-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.15) translate(-1px, 1px); opacity: 1; }
        }
        .rocket-thruster, .rocket-core-thruster {
          transform-origin: 29.5px 70.5px;
          opacity: 0.48;
          transition: opacity 0.3s;
        }
        .group\\/outer:hover .rocket-thruster {
          opacity: 0.85;
          animation: flame-pulse 0.12s ease-in-out infinite;
          animation-delay: 1.25s;
        }
        .group\\/outer:hover .rocket-core-thruster {
          opacity: 1;
          animation: flame-pulse 0.08s ease-in-out infinite;
          animation-delay: 1.25s;
        } }
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

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "167, 139, 250";
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

        {/* Giant background blueprint watermark number */}
        <div className="absolute top-[-10px] left-[-5px] pointer-events-none z-0">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text
              x="5"
              y="115"
              fontWeight="900"
              className="transition-all duration-500 select-none font-sans"
              style={{
                fontSize: "125px",
                letterSpacing: "-0.06em",
                fill: isHovered
                  ? `rgba(${hexToRgb(card.accent)}, 0.08)`
                  : `rgba(${hexToRgb(card.accent)}, 0.035)`,
              }}
            >
              {card.num}
            </text>
          </svg>
        </div>

        <div>
          {/* Card Header with Icon Box */}
          <div className="flex items-center justify-end relative z-20">
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

        {/* Background art (SVG, bottom-right, opacity 0.32 -> 0.75 on hover) */}
        <div
          className="absolute bottom-[-10px] right-[-10px] md:bottom-[-12px] md:right-[-12px] lg:bottom-[-20px] lg:right-[-20px] pointer-events-none transition-all duration-500 z-0"
          style={{ opacity: isHovered ? 0.75 : 0.32 }}
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
    <svg viewBox="0 0 120 120" fill="none" className="w-[130px] h-[130px] md:w-[145px] md:h-[145px] lg:w-[185px] lg:h-[185px] pointer-events-none origin-bottom-right">
      {/* AI CPU Center Group */}
      <g className="cpu-group origin-center">
        {/* Wires/Tracks that branch out */}
        {/* Top tracks */}
        <path d="M 50 35 L 50 15" className="cpu-track track-top-mid" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 55 35 L 55 22 L 65 22 L 65 15" className="cpu-track track-top-right" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 45 35 L 45 22 L 35 22 L 35 15" className="cpu-track track-top-left" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" />

        {/* Bottom tracks */}
        <path d="M 50 65 L 50 85" className="cpu-track track-bot-mid" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 55 65 L 55 78 L 65 78 L 65 85" className="cpu-track track-bot-right" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 45 65 L 45 78 L 35 78 L 35 85" className="cpu-track track-bot-left" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" />

        {/* Left tracks */}
        <path d="M 35 50 L 15 50" className="cpu-track track-left-mid" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 35 45 L 22 45 L 22 35 L 15 35" className="cpu-track track-left-top" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 35 55 L 22 55 L 22 65 L 15 65" className="cpu-track track-left-bot" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" />

        {/* Right tracks */}
        <path d="M 65 50 L 85 50" className="cpu-track track-right-mid" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 65 45 L 78 45 L 78 35 L 85 35" className="cpu-track track-right-top" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 65 55 L 78 55 L 78 65 L 85 65" className="cpu-track track-right-bot" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" />

        {/* Outer terminal node dots */}
        {/* Top dots */}
        <circle cx="50" cy="15" r="2.5" fill="#E8C5D8" className="cpu-dot dot-top-mid" />
        <circle cx="65" cy="15" r="2" stroke="#A78BFA" strokeWidth="1" fill="#0D0B1C" className="cpu-dot dot-top-right" />
        <circle cx="35" cy="15" r="2" stroke="#A78BFA" strokeWidth="1" fill="#0D0B1C" className="cpu-dot dot-top-left" />

        {/* Bottom dots */}
        <circle cx="50" cy="85" r="2.5" fill="#E8C5D8" className="cpu-dot dot-bot-mid" />
        <circle cx="65" cy="85" r="2" stroke="#A78BFA" strokeWidth="1" fill="#0D0B1C" className="cpu-dot dot-bot-right" />
        <circle cx="35" cy="85" r="2" stroke="#A78BFA" strokeWidth="1" fill="#0D0B1C" className="cpu-dot dot-bot-left" />

        {/* Left dots */}
        <circle cx="15" cy="50" r="2.5" fill="#E8C5D8" className="cpu-dot dot-left-mid" />
        <circle cx="15" cy="35" r="2" stroke="#A78BFA" strokeWidth="1" fill="#0D0B1C" className="cpu-dot dot-left-top" />
        <circle cx="15" cy="65" r="2" stroke="#A78BFA" strokeWidth="1" fill="#0D0B1C" className="cpu-dot dot-left-bot" />

        {/* Right dots */}
        <circle cx="85" cy="50" r="2.5" fill="#E8C5D8" className="cpu-dot dot-right-mid" />
        <circle cx="85" cy="35" r="2" stroke="#A78BFA" strokeWidth="1" fill="#0D0B1C" className="cpu-dot dot-right-top" />
        <circle cx="85" cy="65" r="2" stroke="#A78BFA" strokeWidth="1" fill="#0D0B1C" className="cpu-dot dot-right-bot" />

        {/* Center Chip Box */}
        <rect x="35" y="35" width="30" height="30" rx="5" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.8" className="cpu-box shadow-[0_0_15px_rgba(167,139,250,0.15)]" />
        <rect x="40" y="40" width="20" height="20" rx="2.5" fill="none" stroke="#C4B5FD" strokeWidth="1" className="cpu-inner-box" />
        
        {/* "AI" Glowing Text */}
        <text x="50" y="53" fill="#A78BFA" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em" className="cpu-text font-sans">AI</text>
      </g>
    </svg>
  );
}

function BgArt2() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-[130px] h-[130px] md:w-[145px] md:h-[145px] lg:w-[185px] lg:h-[185px] pointer-events-none origin-bottom-right">
      <g className="track-group origin-center">
        {/* Serpentine Winding Path */}
        <path d="M 25 30 L 70 30 A 15 15 0 0 1 85 45 A 15 15 0 0 1 70 60 L 50 60 A 15 15 0 0 0 35 75 A 15 15 0 0 0 50 90 L 75 90" 
          className="serpentine-path" stroke="#C4B5FD" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Starting play button circle (top-left) */}
        <g className="start-node origin-center">
          <circle cx="25" cy="30" r="10" fill="#0D0B1C" stroke="#C4B5FD" strokeWidth="1.8" />
          <path d="M 23 26.5 L 29 30 L 23 33.5 Z" fill="#C4B5FD" />
        </g>

        {/* Junction dot 1 (top-right) */}
        <circle cx="70" cy="30" r="4.5" fill="#0D0B1C" stroke="#E8C5D8" strokeWidth="1.8" className="track-dot junction-1" />

        {/* Junction dot 2 (middle) */}
        <circle cx="50" cy="60" r="4.5" fill="#0D0B1C" stroke="#A78BFA" strokeWidth="1.8" className="track-dot junction-2" />

        {/* Junction dot 3 (bottom-left) */}
        <circle cx="50" cy="90" r="4.5" fill="#0D0B1C" stroke="#E8C5D8" strokeWidth="1.8" className="track-dot junction-3" />

        {/* Target Concentric Circles (bottom-right) */}
        <g className="target-node origin-center">
          <circle cx="75" cy="90" r="10" fill="#0D0B1C" stroke="#C4B5FD" strokeWidth="1.8" className="target-outer" />
          <circle cx="75" cy="90" r="4.5" fill="#A78BFA" className="target-inner" />
        </g>
      </g>
    </svg>
  );
}

function BgArt3() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-[130px] h-[130px] md:w-[145px] md:h-[145px] lg:w-[185px] lg:h-[185px] pointer-events-none origin-bottom-right">
      {/* Rocket Space Badge Group */}
      <g className="rocket-badge origin-center">
        {/* Circular Outer Badge Ring */}
        <circle cx="50" cy="50" r="38" stroke="#E8C5D8" strokeWidth="1.8" strokeDasharray="4 2" className="badge-ring" />
        <circle cx="50" cy="50" r="34" stroke="rgba(196,181,253,0.15)" strokeWidth="1" className="badge-inner-ring" />

        {/* Tiny stars inside the badge */}
        <path d="M 28 42 L 30 44 L 28 46 L 26 44 Z" fill="#A78BFA" opacity="0.6" className="star star-1" />
        <path d="M 72 65 L 73.5 66.5 L 72 68 L 70.5 66.5 Z" fill="#E8C5D8" opacity="0.8" className="star star-2" />
        <circle cx="34" cy="65" r="1" fill="#C4B5FD" className="star star-3" />
        <circle cx="65" cy="28" r="1.2" fill="#E8C5D8" className="star star-4" />

        {/* Sleek Launch Rocket Group */}
        <g className="rocket-ship origin-center">
          {/* Flame / Thruster exhaust */}
          <path d="M 26 69 C 24 73 21 82 25 81 C 29 80 34 76 30 71 Z" fill="#F59E0B" opacity="0.85" className="rocket-thruster" />
          <path d="M 27.5 70 C 26 73 24 78 26.5 77.5 C 29 77 31 74 29.5 71 Z" fill="#EF4444" className="rocket-core-thruster" />

          {/* Fins / Wings */}
          <path d="M 33 67 L 24 74 C 23.5 74.5 24 75.5 25 75 L 34 68 Z" fill="#C4B5FD" />
          <path d="M 43 57 L 50 66 C 50.5 66.5 49.5 67.5 49 66.5 L 42 58 Z" fill="#C4B5FD" />

          {/* Main Rocket Body */}
          <path d="M 29.5 70.5 C 33 65 42 55 58 36 C 60 34 62 36 60.5 38.5 C 50 55 42.5 65 37 68.5 C 34.5 70.2 31.5 71.5 29.5 70.5 Z" 
            fill="#0D0B1C" stroke="#E8C5D8" strokeWidth="1.8" className="rocket-body" />

          {/* Windows */}
          <circle cx="43" cy="52" r="2.5" stroke="#C4B5FD" strokeWidth="1" fill="#0D0B1C" className="rocket-window" />

          {/* Rocket nose cone accent tip */}
          <path d="M 52.8 42 C 55 39.5 58 36 58 36 C 58 36 54.5 39 52 41.2 Z" fill="#E8C5D8" />
        </g>
      </g>
    </svg>
  );
}
