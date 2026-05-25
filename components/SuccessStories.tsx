"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { useCountUp } from "@/lib/useCountUp";
import { useInViewOnce } from "@/lib/useInViewOnce";

interface VerdictCardProps {
  quote: string;
  name: string;
  role: string;
  color: string;
  size: "sm" | "md" | "lg";
  outcomePill?: {
    text: string;
    type: "green" | "purple" | "rose" | "lavender";
  };
}

const ROW1_CARDS: VerdictCardProps[] = [
  {
    size: "md",
    color: "#A78BFA",
    quote: "From intern to founder in 8 months. NC gave me the skills and network to launch my own AI SaaS company.",
    name: "Sarah Chen",
    role: "Founded AI SaaS Co.",
  },
  {
    size: "lg",
    color: "#34D399",
    outcomePill: { text: "£28k → £54k salary", type: "green" },
    quote: "The real client projects on the AI Agents track gave me something no course ever could — actual production experience.",
    name: "James K.",
    role: "ML Engineer, Fintech",
  },
  {
    size: "sm",
    color: "#C4B5FD",
    quote: "Landed Senior ML Engineer at a FAANG company. The NC network opened doors I didn't know existed.",
    name: "Michael D.",
    role: "Senior ML Engineer",
  },
  {
    size: "md",
    color: "#E8C5D8",
    outcomePill: { text: "0 → $180k ARR ↑", type: "purple" },
    quote: "NC didn't just train me — they gave me co-founders, advisors, and my first clients all in one place.",
    name: "Priya R.",
    role: "Founder, AI Analytics",
  },
  {
    size: "lg",
    color: "#A78BFA",
    quote: "The IoT track was intense but the mentors were world-class. I shipped a real telemetry system to a manufacturing client in week 8.",
    name: "Tom M.",
    role: "IoT Engineer, AutoTech",
  },
  {
    size: "sm",
    color: "#C4B5FD",
    quote: "Best decision I ever made. NC is where real builders are made, not just trained.",
    name: "Aisha L.",
    role: "Data Engineer",
  },
];

const ROW2_CARDS: VerdictCardProps[] = [
  {
    size: "lg",
    color: "#E8C5D8",
    outcomePill: { text: "Promoted in 4 months ↑", type: "rose" },
    quote: "The Multi Cloud track gave me architecture skills that my entire team didn't have. Promoted to Lead within 4 months.",
    name: "Rahul N.",
    role: "Cloud Architect, Lead",
  },
  {
    size: "sm",
    color: "#A78BFA",
    quote: "NovaCrystara is what an accelerator should feel like. Not a course. A career launch.",
    name: "Emma W.",
    role: "AI Consultant",
  },
  {
    size: "md",
    color: "#C4B5FD",
    outcomePill: { text: "£0 → £120k funding ↑", type: "lavender" },
    quote: "Got my first investor intro through the NC network. Now raising our seed round.",
    name: "David K.",
    role: "Founder, AgriTech AI",
  },
  {
    size: "lg",
    color: "#34D399",
    quote: "I came in as a junior developer. I left as a Data Engineering specialist with real enterprise pipelines. The difference NC makes is real.",
    name: "Fatima O.",
    role: "Senior Data Engineer",
  },
  {
    size: "sm",
    color: "#A78BFA",
    quote: "The mentors have actually built products used by millions. That knowledge transfers directly.",
    name: "Ben T.",
    role: "AI Engineer",
  },
  {
    size: "md",
    color: "#E8C5D8",
    quote: "Scrum Master track in 6 weeks. Got certified. Got hired. The NC name carries real weight.",
    name: "Lisa H.",
    role: "Scrum Master, HealthTech",
  },
];

const OUTCOME_PILL_STYLE = {
  green: { bg: "rgba(52,211,153,0.06)", border: "rgba(52,211,153,0.18)", text: "#34D399" },
  purple: { bg: "rgba(167,139,250,0.06)", border: "rgba(167,139,250,0.18)", text: "#A78BFA" },
  rose: { bg: "rgba(232,197,216,0.06)", border: "rgba(232,197,216,0.18)", text: "#E8C5D8" },
  lavender: { bg: "rgba(196,181,253,0.06)", border: "rgba(196,181,253,0.18)", text: "#C4B5FD" },
};

const WIDTH_CLASSES = {
  sm: "w-[240px] md:w-[250px] lg:w-[290px]",
  md: "w-[260px] md:w-[290px] lg:w-[330px]",
  lg: "w-[290px] md:w-[340px] lg:w-[380px]",
};

export default function SuccessStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: "0px" });
  const shouldReduceMotion = useReducedMotion();

  // Dominant card view tracking
  const [dominantRef, inViewDominant] = useInViewOnce<HTMLDivElement>();
  const dominantVal = useCountUp({ to: 92, startWhen: inViewDominant });

  // Secondary stack view tracking
  const [secRef1, inViewSec1] = useInViewOnce<HTMLDivElement>();
  const secVal1 = useCountUp({ to: 45, startWhen: inViewSec1 });

  const [secRef2, inViewSec2] = useInViewOnce<HTMLDivElement>();
  const secVal2 = useCountUp({ to: 15, startWhen: inViewSec2 });

  return (
    <section 
      ref={sectionRef}
      id="success" 
      className="bg-[#07080F] pt-[40px] pb-[100px] relative overflow-hidden select-none"
    >
      {/* Dynamic CSS rules for continuous smooth loop scrolling, pause controls, and top shimmers */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drift-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes drift-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-drift-left {
          animation: drift-left 28s linear infinite;
        }
        .animate-drift-right {
          animation: drift-right 32s linear infinite;
        }
        
        @media (max-width: 767px) {
          .animate-drift-left {
            animation: drift-left 20s linear infinite;
          }
        }

        .wall-outer:hover .animate-drift-left,
        .wall-outer:hover .animate-drift-right {
          animation-play-state: paused !important;
        }

        .premium-shimmer-top::before {
          content: "";
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent);
          pointer-events: none;
        }
        
        .premium-shimmer-top-light::before {
          content: "";
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent);
          pointer-events: none;
        }

        .verdict-card-hover {
          transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          transition-property: transform, border-color, box-shadow, background-color !important;
        }
        .premium-shimmer-top, .premium-shimmer-top-light {
          transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          transition-property: transform, border-color, box-shadow, background-color !important;
        }

        .verdict-card-hover::before {
          content: "";
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent);
          pointer-events: none;
          opacity: 0;
          transition: opacity 250ms ease;
        }
        .verdict-card-hover:hover::before {
          opacity: 1;
        }
        .verdict-card-hover:hover {
          border-color: rgba(167,139,250,0.22) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(109,40,217,0.10);
          background: linear-gradient(150deg,#0E0C1E,#120F22) !important;
        }
      `}} />

      {/* Ambient header radial orb */}
      <div 
        className="pointer-events-none absolute top-[40px] left-1/2 -translate-x-1/2 w-[350px] h-[220px] rounded-full z-0"
        style={{
          background: "radial-gradient(ellipse, rgba(109,40,217,0.05) 0%, transparent 70%)"
        }}
      />

      {/* Section Header */}
      <div className="mx-auto max-w-6xl px-6 md:px-12 relative z-10 text-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="nc-eyebrow">PROVEN OUTCOMES</p>
          <h2 className="mt-4 text-[38px] font-bold leading-tight text-nc-heading sm:text-[46px]">
            Results that
            <br />
            <span className="grad-text">speak for themselves</span>
          </h2>
        </motion.div>
      </div>

      {/* PART 1 — MAGAZINE SPREAD STATS */}
      <div className="mx-auto max-w-6xl px-[28px] mb-[44px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr,1fr] gap-[16px]">
          
          {/* Dominant Stat Card */}
          <DominantStatTile 
            refEl={dominantRef}
            value={dominantVal}
            shouldReduceMotion={!!shouldReduceMotion}
          />

          {/* Secondary Stats Stack */}
          <div className="flex flex-col gap-[16px]">
            
            {/* Stat 1 */}
            <SecondaryStatTile 
              refEl={secRef1}
              value={secVal1}
              suffix="%"
              label="AVG SALARY INCREASE"
              sub="within 6 months"
              gradient="linear-gradient(135deg, #C4B5FD, #E8C5D8)"
              delay={0.25}
              shouldReduceMotion={!!shouldReduceMotion}
            />

            {/* Stat 2 */}
            <SecondaryStatTile 
              refEl={secRef2}
              value={secVal2}
              suffix="+"
              label="STARTUPS LAUNCHED"
              sub="globally operating"
              gradient="linear-gradient(135deg, #E8C5D8, #A78BFA)"
              delay={0.4}
              shouldReduceMotion={!!shouldReduceMotion}
            />

          </div>
        </div>
      </div>

      {/* PART 2 — THE VERDICT WALL */}
      <div className="relative w-full overflow-hidden mt-20">
        
        {/* Wall Label Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto max-w-6xl px-[28px] mb-[18px] flex justify-between items-center relative z-10"
        >
          <span className="text-[10px] font-extrabold text-[#2E2A3A] tracking-[0.2em] uppercase">
            WHAT OUR BUILDERS SAY
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[rgba(167,139,250,0.3)] animate-pulse" />
            <span className="text-[10px] font-bold text-[#1E1A2E]">
              Hover to pause
            </span>
          </div>
        </motion.div>

        {/* Edge Fade Masks - Widened dynamically to reduce stretched borders */}
        <div className="absolute left-0 top-0 bottom-0 w-[120px] md:w-[220px] lg:w-[320px] bg-gradient-to-r from-[#07080F] via-[#07080F]/80 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-[120px] md:w-[220px] lg:w-[320px] bg-gradient-to-l from-[#07080F] via-[#07080F]/80 to-transparent pointer-events-none z-20" />

        {/* Wall Outer Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="wall-outer w-full py-4 flex flex-col gap-4 relative z-10"
        >
          
          {/* Row 1 — Drifts LEFT */}
          <div 
            className="flex gap-4 w-max animate-drift-left"
            style={{
              animationPlayState: (shouldReduceMotion || !isSectionInView) ? "paused" : "running"
            }}
          >
            {/* Row 1 First half */}
            <div className="flex gap-4 pl-[28px]">
              {ROW1_CARDS.map((card, i) => (
                <VerdictCard key={`r1-${i}`} card={card} />
              ))}
            </div>
            {/* Row 1 Duplicated second half (loop connector) */}
            <div className="flex gap-4 pr-[28px]">
              {ROW1_CARDS.map((card, i) => (
                <VerdictCard key={`r1-dup-${i}`} card={card} />
              ))}
            </div>
          </div>

          {/* Row 2 — Drifts RIGHT (Hidden on Mobile) */}
          <div 
            className="hidden md:flex gap-4 w-max animate-drift-right"
            style={{
              animationPlayState: (shouldReduceMotion || !isSectionInView) ? "paused" : "running"
            }}
          >
            {/* Row 2 First half */}
            <div className="flex gap-4 pl-[28px]">
              {ROW2_CARDS.map((card, i) => (
                <VerdictCard key={`r2-${i}`} card={card} />
              ))}
            </div>
            {/* Row 2 Duplicated second half (loop connector) */}
            <div className="flex gap-4 pr-[28px]">
              {ROW2_CARDS.map((card, i) => (
                <VerdictCard key={`r2-dup-${i}`} card={card} />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

function DominantStatTile({ 
  refEl, 
  value, 
  shouldReduceMotion 
}: { 
  refEl: React.RefObject<HTMLDivElement | null>; 
  value: number; 
  shouldReduceMotion: boolean;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Synchronise both references safely
  const setRefs = (node: HTMLDivElement | null) => {
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (refEl) {
      (refEl as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      whileInView="visible"
      variants={fadeUp}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="premium-shimmer-top relative bg-gradient-to-br from-[#0D0B1C] to-[#110E22] border border-[rgba(167,139,250,0.12)] rounded-[14px] p-[36px] overflow-hidden flex flex-col justify-between select-none cursor-pointer min-h-[260px] z-10"
      style={{
        transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms, box-shadow 180ms",
        boxShadow: isHovered 
          ? "0 20px 50px rgba(109,40,217,0.12)" 
          : "0 4px 20px rgba(0, 0, 0, 0.2)"
      }}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(167,139,250,0.12), transparent)`,
        }}
      />

      {/* Concentric rings in bottom right */}
      <div 
        className="absolute bottom-[-40px] right-[-40px] pointer-events-none w-[140px] h-[140px] rounded-full border border-[rgba(167,139,250,0.05)] z-0"
        style={{
          boxShadow: "0 0 0 24px rgba(167,139,250,0.02)"
        }}
      />

      <div className="relative z-10">
        <span className="block text-[11px] font-extrabold text-[#3D3058] tracking-[0.2em] uppercase">
          Our headline number
        </span>
        <span className="block text-[84px] md:text-[96px] lg:text-[110px] font-extrabold tracking-tighter leading-none my-3 grad-text select-none">
          {value}%
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <span className="block text-[11px] font-extrabold text-[#3D3058] tracking-[0.16em] uppercase mb-1">
          CAREER ADVANCEMENT
        </span>
        <p className="text-[13px] md:text-[14px] font-normal leading-[1.7] text-white max-w-[240px]">
          of builders land senior roles or found companies within 12 months
        </p>
      </div>
    </motion.div>
  );
}

function SecondaryStatTile({ 
  refEl, 
  value, 
  suffix, 
  label, 
  sub, 
  gradient, 
  delay, 
  shouldReduceMotion 
}: { 
  refEl: React.RefObject<HTMLDivElement | null>; 
  value: number; 
  suffix: string; 
  label: string; 
  sub: string; 
  gradient: string; 
  delay: number; 
  shouldReduceMotion: boolean;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Synchronise both references safely
  const setRefs = (node: HTMLDivElement | null) => {
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (refEl) {
      (refEl as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      whileInView="visible"
      variants={fadeUp}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className="premium-shimmer-top-light relative bg-gradient-to-br from-[#0D0B1C] to-[#100D20] border border-[rgba(167,139,250,0.09)] rounded-[14px] p-[26px] flex flex-col justify-between flex-1 select-none cursor-pointer z-10"
      style={{
        transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms, box-shadow 180ms",
        boxShadow: isHovered 
          ? "0 12px 24px rgba(109,40,217,0.05)" 
          : "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(167,139,250,0.10), transparent)`,
        }}
      />

      <div className="relative z-10">
        <span 
          className="block text-[44px] md:text-[54px] font-extrabold tracking-tighter leading-none mb-1 text-transparent bg-clip-text"
          style={{ backgroundImage: gradient }}
        >
          {value}{suffix}
        </span>
        <span className="block text-[11px] font-extrabold text-[#3D3058] tracking-[0.16em] uppercase">
          {label}
        </span>
      </div>
      <span className="block text-[11px] font-bold text-white mt-2 relative z-10">
        {sub}
      </span>
    </motion.div>
  );
}

function VerdictCard({ card }: { card: VerdictCardProps }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const initials = card.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const pill = card.outcomePill;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`verdict-card-hover flex-shrink-0 ${
        WIDTH_CLASSES[card.size]
      } relative bg-gradient-to-br from-[#0C0A1A] to-[#0F0D1E] border border-[rgba(167,139,250,0.09)] rounded-[12px] p-[20px] md:p-[24px] overflow-hidden flex flex-col justify-between cursor-default z-10`}
      style={{
        transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
      }}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(167,139,250,0.08), transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Optional Outcome Pill */}
        {pill && (
          <span
            className="inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] md:text-[10px] font-bold mb-3 select-none"
            style={{
              backgroundColor: OUTCOME_PILL_STYLE[pill.type].bg,
              borderColor: OUTCOME_PILL_STYLE[pill.type].border,
              color: OUTCOME_PILL_STYLE[pill.type].text,
            }}
          >
            {pill.text}
          </span>
        )}

        {/* Quote Mark */}
        <span className="block text-[26px] font-extrabold text-[rgba(167,139,250,0.12)] leading-none select-none mb-1">
          &ldquo;
        </span>

        {/* Quote Text - Elevated to white for high-contrast reading */}
        <p className="text-[12px] md:text-[13px] font-normal italic leading-[1.75] text-white mt-1 pr-1">
          {card.quote}
        </p>
      </div>

      {/* Author Footer */}
      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-[rgba(167,139,250,0.04)] relative z-10">
        {/* Initials Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] select-none shrink-0"
          style={{
            border: `0.5px solid ${card.color}`,
            color: card.color,
            background: `${card.color}05`,
          }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <span 
            className="block text-[11px] md:text-[12px] font-bold leading-tight truncate"
            style={{ color: card.color }}
          >
            {card.name}
          </span>
          <span className="block text-[9.5px] md:text-[10px] font-semibold text-[#5D5380] truncate">
            {card.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
