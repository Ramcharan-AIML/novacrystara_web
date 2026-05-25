"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface Chapter {
  num: string;
  label: string;
  title: string;
  desc: string;
  tag: string;
  themeColor: string;
}

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    label: "First — Apply",
    title: "Apply & Match",
    desc: "Interview and get matched to a live client project track that perfectly fits your current skill level and ambitions.",
    tag: "Week 1",
    themeColor: "#A78BFA", // purple
  },
  {
    num: "02",
    label: "Then — Build",
    title: "Build Real Products",
    desc: "Ship production-ready AI systems alongside world-class expert leads on actual client projects — not simulations.",
    tag: "Week 2–10",
    themeColor: "#C4B5FD", // lavender
  },
  {
    num: "03",
    label: "Meanwhile — Earn",
    title: "Earn & Own",
    desc: "Gain income while you learn. Earn verified credentials and equity stake in the systems you help build for real clients.",
    tag: "Ongoing",
    themeColor: "#E8C5D8", // rose gold
  },
  {
    num: "04",
    label: "Finally — Launch",
    title: "Launch or Lead",
    desc: "Found your own AI startup with full NC support — or join a world-class engineering team as a senior. This is what it all leads to.",
    tag: "The Outcome",
    themeColor: "#C4B5FD",
  },
];

const PARTICLES = [
  { color: "#A78BFA", top: "25%", duration: 3, delay: 0.5 },
  { color: "#C4B5FD", top: "50%", duration: 3.5, delay: 1.2 },
  { color: "#A78BFA", top: "70%", duration: 2.8, delay: 2.0 },
  { color: "#E8C5D8", top: "85%", duration: 4.0, delay: 0.8 },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Timings & Delays
  const headerDelay = 0.1;
  const chDelays = [0.8, 1.2, 1.6, 2.0];
  const completionDelay = 2.6;

  return (
    <section 
      ref={containerRef} 
      className="bg-[#07080F] py-[100px] relative overflow-hidden select-none"
    >
      {/* Dynamic CSS rules for horizontal shimmers, active dividers, and button text sweeps */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes journey-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        
        .ch4-shimmer-text {
          background: linear-gradient(270deg, #A78BFA, #C4B5FD, #E8C5D8, #C4B5FD, #A78BFA);
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .group\\/row:hover .ch4-shimmer-text {
          animation: journey-shimmer 3s linear infinite;
        }

        .spine-dot-hover {
          transition: all 300ms ease;
        }

        .group\\/row:hover .spine-dot-hover {
          border-color: rgba(167,139,250,0.8) !important;
          background: rgba(167,139,250,0.15) !important;
          box-shadow: 0 0 0 5px rgba(167,139,250,0.08) !important;
        }
      `}} />

      {/* Ambient center radial background glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full z-0"
        style={{
          background: "radial-gradient(ellipse, rgba(109,40,217,0.05) 0%, transparent 70%)"
        }}
      />

      <div className="mx-auto max-w-4xl px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.7, delay: headerDelay }}
          className="text-center mb-16"
        >
          <p className="nc-eyebrow">THE JOURNEY</p>
          <h2 className="mt-4 text-[36px] font-bold leading-tight text-nc-heading sm:text-[44px]">
            Intern to founder
            <br />
            <span className="grad-text">in 4 stages</span>
          </h2>
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="relative mt-20">
          
          {/* Continuous floating particles along spine (Desktop/Tablet only) */}
          {!shouldReduceMotion && isInView && PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute left-[79.5px] w-[3.5px] h-[3.5px] rounded-full pointer-events-none z-25 hidden md:block"
              style={{
                top: p.top,
                backgroundColor: p.color,
              }}
              animate={{
                y: [0, -40],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Chapters List */}
          <ol className="flex flex-col gap-6 md:gap-0 relative z-30">
            {CHAPTERS.map((ch, idx) => {
              const delay = chDelays[idx];
              const isLast = idx === CHAPTERS.length - 1;
              const isHovered = hoveredIdx === idx;

              // Timings for step animations
              const dotDelay = delay;
              const numDelay = delay + 0.1;
              const contentDelay = delay + 0.2;
              const tagDelay = delay + 0.4;

              return (
                <li
                  key={ch.num}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group/row relative flex flex-col md:flex-row pl-6 pr-5 py-8 md:pl-[160px] md:pr-[40px] md:py-9 border-l-2 border-[rgba(167,139,250,0.2)] md:border-l-0 transition-all duration-500 rounded-r-lg md:rounded-none"
                  style={{
                    backgroundColor: isHovered ? "rgba(167,139,250,0.018)" : "transparent"
                  }}
                >
                  {/* Mobile Big Number (hidden on desktop) */}
                  <div className="md:hidden text-[32px] font-extrabold mb-1" style={{ color: "rgba(167,139,250,0.1)" }}>
                    {ch.num}
                  </div>

                  {/* Desktop Left Column (absolute positioned to match height perfectly with row) */}
                  <div className="absolute left-[32px] top-0 bottom-0 w-[96px] hidden md:flex flex-col items-center justify-start pointer-events-none z-20">
                    
                    {/* SEGMENT SPINE SVG: Draws row line segments. 
                        Completely removes the extra line extending below numeral 04! */}
                    <svg 
                      className="absolute left-[48px] top-0 bottom-0 w-[2px] h-[calc(100%+2px)] overflow-visible pointer-events-none" 
                      fill="none"
                    >
                      <motion.line
                        x1="1"
                        y1={idx === 0 ? "64" : "0"}
                        x2="1"
                        y2={idx === 3 ? "64" : "100%"}
                        stroke="#A78BFA"
                        strokeWidth="0.55"
                        strokeOpacity="0.3"
                        initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "linear",
                          delay: delay - 0.4
                        }}
                      />
                    </svg>

                    {/* Spine Dot centered exactly at spine boundary */}
                    <motion.span
                      initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.15 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        delay: dotDelay
                      }}
                      className="absolute top-[64px] -translate-y-1/2 rounded-full spine-dot-hover z-30 pointer-events-auto"
                      style={{
                        width: idx === 3 ? "18px" : "14px",
                        height: idx === 3 ? "18px" : "14px",
                        left: idx === 3 ? "39px" : "41px", // Centered at 48px
                        background: "#07080F",
                        border: idx === 3
                          ? "1.5px solid rgba(167,139,250,0.45)"
                          : "1.5px solid rgba(167,139,250,0.25)"
                      }}
                    />

                    {/* Big Faded Number */}
                    <motion.div
                      initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: numDelay }}
                      className="font-extrabold tracking-tighter select-none leading-none w-[96px] text-center text-[32px] md:text-[44px] lg:text-[56px] pt-[36px]"
                      style={{
                        color: isHovered
                          ? "rgba(167,139,250,0.16)"
                          : idx === 3
                          ? "rgba(167,139,250,0.10)"
                          : "rgba(167,139,250,0.05)",
                        transition: "color 400ms"
                      }}
                    >
                      {ch.num}
                    </motion.div>
                  </div>

                  {/* Right Column: main content block */}
                  <motion.div
                    initial={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: -28, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : shouldReduceMotion ? { x: 0, opacity: 1 } : { x: -28, opacity: 0 }}
                    transition={{ duration: 0.6, delay: contentDelay }}
                    className="flex-1 mt-2 md:mt-0"
                  >
                    {/* Step label */}
                    <span 
                      className="block text-[10px] md:text-[11px] font-extrabold tracking-[0.14em] uppercase mb-1 transition-colors duration-300"
                      style={{
                        color: isHovered ? "#4A4070" : "#2E2A3A"
                      }}
                    >
                      {ch.label}
                    </span>

                    {/* Chapter Title */}
                    <h3 
                      className={`text-[20px] md:text-[23px] lg:text-[25px] font-bold leading-snug mb-2 transition-colors duration-300 ${
                        idx === 3 ? "ch4-shimmer-text" : ""
                      }`}
                      style={{
                        color: idx === 3 ? undefined : isHovered ? "#F0EEF8" : ch.themeColor
                      }}
                    >
                      {ch.title}
                    </h3>

                    {/* Description - Promoted to high-contrast white */}
                    <p className="text-[14px] md:text-[15px] font-normal leading-[1.8] text-white/95">
                      {ch.desc}
                    </p>
                  </motion.div>

                  {/* Far Right Column: timeline tag pill (hidden on mobile and tablet) */}
                  <motion.div
                    initial={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: 16, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : shouldReduceMotion ? { x: 0, opacity: 1 } : { x: 16, opacity: 0 }}
                    transition={{ duration: 0.5, delay: tagDelay }}
                    className="hidden lg:inline-block shrink-0 ml-6 mt-1.5"
                  >
                    <span 
                      className="inline-block text-[10px] md:text-[11px] font-bold px-4 py-1.5 rounded-full border tracking-[0.06em] whitespace-nowrap transition-all duration-400"
                      style={{
                        borderColor: isHovered 
                          ? "rgba(167,139,250,0.28)" 
                          : idx === 3 
                          ? "rgba(167,139,250,0.20)" 
                          : "rgba(167,139,250,0.10)",
                        color: isHovered 
                          ? "#7B6FA0" 
                          : idx === 3 
                          ? "#5A4A8A" 
                          : "#2E2A3A",
                        backgroundColor: isHovered 
                          ? "rgba(167,139,250,0.04)" 
                          : "transparent"
                      }}
                    >
                      {ch.tag}
                    </span>
                  </motion.div>

                  {/* Horizontal visual divider at bottom of each row (excluded on last chapter) */}
                  {!isLast && (
                    <div 
                      className="absolute bottom-0 left-[32px] right-[40px] h-[0.5px] pointer-events-none hidden md:block"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.06), transparent)"
                      }}
                    />
                  )}

                  {/* Animated hover sweep progress line */}
                  <div 
                    className="absolute bottom-0 left-[32px] h-[0.5px] pointer-events-none transition-all duration-[600ms] hidden md:block"
                    style={{
                      width: isHovered ? "calc(100% - 72px)" : "0px",
                      background: idx === 3 
                        ? "linear-gradient(90deg, #A78BFA, #C4B5FD, #E8C5D8)" 
                        : "linear-gradient(90deg, rgba(167,139,250,0.4), rgba(196,181,253,0.3))"
                    }}
                  />
                </li>
              );
            })}
          </ol>
        </div>

        {/* Completion Indicator at bottom of section */}
        <motion.div
          initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.6, delay: completionDelay }}
          className="flex items-center gap-4 mt-12 pt-8 px-8"
        >
          {/* Left line */}
          <div 
            className="flex-1 h-[0.5px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.3))"
            }}
          />
          
          {/* Left dot */}
          <span 
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              background: "linear-gradient(135deg, #A78BFA, #E8C5D8)",
              boxShadow: "0 0 8px rgba(167,139,250,0.4)"
            }}
          />

          {/* Center Text */}
          <span className="text-[10px] font-bold text-[#3D3058] tracking-[0.08em] whitespace-nowrap">
            YOUR JOURNEY BEGINS HERE
          </span>

          {/* Right dot */}
          <span 
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              background: "linear-gradient(135deg, #E8C5D8, #A78BFA)",
              boxShadow: "0 0 8px rgba(167,139,250,0.4)"
            }}
          />

          {/* Right line */}
          <div 
            className="flex-1 h-[0.5px]"
            style={{
              background: "linear-gradient(90deg, rgba(167,139,250,0.3), transparent)"
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}
