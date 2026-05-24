"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, VIEWPORT, fadeUp } from "@/lib/motion";

/**
 * SVG triangle: CLIENTS (top) → NC (bottom-right) → BUILDERS (bottom-left) → CLIENTS.
 * Arcs drawn via Framer pathLength to avoid manual stroke-dashoffset.
 */
export default function Flywheel() {
  return (
    <section className="relative overflow-hidden bg-nc-base py-16 sm:py-20">
      {/* ambient center orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(100,50,220,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="nc-eyebrow">HOW IT WORKS</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            The NC <span className="grad-text">Bussiness Model</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#5D5380] sm:text-[16px]">
            A self-sustaining ecosystem where clients, talent, and NC grow
            together in one continuous loop.
          </p>
        </motion.div>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_280px]">
          <FlywheelSvg />
          <FounderCard />
        </div>

        <Legend />
      </div>
    </section>
  );
}

function FlywheelSvg() {
  // Node geometry constants
  const nodes = {
    clients: { cx: 300, cy: 90 },
    nc: { cx: 460, cy: 310 },
    builders: { cx: 140, cy: 310 },
  };

  return (
    <motion.svg
      viewBox="0 0 600 440"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="NovaCrystara flywheel diagram"
      className="mx-auto w-full max-w-[600px]"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <defs>
        {/* Arc gradients */}
        <linearGradient id="grad-arc1" x1="0" x2="1">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="grad-arc2" x1="1" x2="0">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="grad-arc3" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#E8C5D8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#E8C5D8" stopOpacity="0.9" />
        </linearGradient>

        {/* Node radial fills */}
        <radialGradient id="node-fill" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1B1538" />
          <stop offset="100%" stopColor="#0A0818" />
        </radialGradient>
        <radialGradient id="nc-fill" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2A1A50" />
          <stop offset="100%" stopColor="#130E28" />
        </radialGradient>

        {/* Arrowhead markers */}
        {[
          ["arrowhead-purple", "#A78BFA"],
          ["arrowhead-lavender", "#C4B5FD"],
          ["arrowhead-rose", "#E8C5D8"],
          ["arrowhead-gold", "#D4AF37"],
        ].map(([id, color]) => (
          <marker
            key={id}
            id={id}
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L8,5 L0,10 z" fill={color} />
          </marker>
        ))}

        {/* Glow filter for NC */}
        <filter id="nc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Arcs (drawn first so nodes overlay) */}
      <motion.path
        d="M 348 110 C 470 130, 480 220, 442 268"
        fill="none"
        stroke="url(#grad-arc1)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#arrowhead-purple)"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.7, delay: 0.9, ease: EASE },
          },
        }}
      />
      <motion.path
        d="M 410 348 C 360 400, 220 400, 180 348"
        fill="none"
        stroke="url(#grad-arc2)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#arrowhead-lavender)"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.7, delay: 1.2, ease: EASE },
          },
        }}
      />
      <motion.path
        d="M 100 272 C 70 180, 170 105, 252 95"
        fill="none"
        stroke="url(#grad-arc3)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        markerEnd="url(#arrowhead-rose)"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.7, delay: 1.5, ease: EASE },
          },
        }}
      />

      {/* Arc labels */}
      <motion.text
        x="475"
        y="190"
        fill="#A78BFA"
        fontSize="11"
        fontWeight="500"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        variants={{ visible: { opacity: 1, transition: { delay: 1.7 } } }}
      >
        Pays NC
      </motion.text>
      <motion.text
        x="300"
        y="405"
        fill="#C4B5FD"
        fontSize="11"
        fontWeight="500"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        variants={{ visible: { opacity: 1, transition: { delay: 1.7 } } }}
      >
        NC pays builders
      </motion.text>
      <motion.text
        x="78"
        y="178"
        fill="#E8C5D8"
        fontSize="11"
        fontWeight="500"
        textAnchor="middle"
        transform="rotate(-58 78 178)"
        initial={{ opacity: 0 }}
        variants={{ visible: { opacity: 1, transition: { delay: 1.7 } } }}
      >
        Talent delivers
      </motion.text>

      {/* CLIENTS node */}
      <Node
        cx={nodes.clients.cx}
        cy={nodes.clients.cy}
        title="CLIENTS"
        desc="Pay for consultation & project delivery"
        delay={0}
      >
        <IconBuildingSvg />
      </Node>

      {/* BUILDERS node */}
      <Node
        cx={nodes.builders.cx}
        cy={nodes.builders.cy}
        title="BUILDERS"
        desc="Gain income + skills"
        delay={0.6}
      >
        <IconUsersSvg />
      </Node>

      {/* NC node (special — has logo) */}
      <NCNode cx={nodes.nc.cx} cy={nodes.nc.cy} delay={0.3} />

      {/* Gold dashed arrow NC → Founder (stub — points right offscreen, completes
          visually with the gold card which is positioned in DOM next to SVG) */}
      <motion.path
        d="M 522 310 L 596 310"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        fill="none"
        markerEnd="url(#arrowhead-gold)"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.6, delay: 1.8, ease: EASE },
          },
        }}
      />
    </motion.svg>
  );
}

function Node({
  cx,
  cy,
  title,
  desc,
  delay,
  children,
}: {
  cx: number;
  cy: number;
  title: string;
  desc: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      variants={{
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, delay, ease: EASE },
        },
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={60}
        fill="url(#node-fill)"
        stroke="rgba(167,139,250,0.3)"
        strokeWidth="1"
      />
      <circle
        cx={cx}
        cy={cy}
        r={68}
        fill="none"
        stroke="rgba(167,139,250,0.12)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <g transform={`translate(${cx - 12} ${cy - 28})`}>{children}</g>
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#C4B5FD"
      >
        {title}
      </text>
      <text
        x={cx}
        y={cy + 26}
        textAnchor="middle"
        fontSize="9"
        fill="#5D5380"
      >
        {wrap(desc).map((line, i) => (
          <tspan key={i} x={cx} dy={i === 0 ? 0 : 12}>
            {line}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}

function NCNode({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      variants={{
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, delay, ease: EASE },
        },
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      filter="url(#nc-glow)"
    >
      <circle
        cx={cx}
        cy={cy}
        r={62}
        fill="url(#nc-fill)"
        stroke="rgba(167,139,250,0.5)"
        strokeWidth="1.2"
      />
      <circle
        cx={cx}
        cy={cy}
        r={72}
        fill="none"
        stroke="rgba(167,139,250,0.18)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      {/* Crystal logo (SVG image) */}
      <image
        href="/assets/main-logo.png"
        x={cx - 22}
        y={cy - 32}
        width="44"
        height="44"
        opacity="0.95"
      />
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#C4B5FD"
      >
        NovaCrystara
      </text>
      <text x={cx} y={cy + 38} textAnchor="middle" fontSize="9" fill="#5D5380">
        Earns revenue
      </text>
    </motion.g>
  );
}

function FounderCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.9, ease: EASE }}
      viewport={VIEWPORT}
      className="relative mx-auto w-full max-w-[300px] rounded-[14px] border p-5"
      style={{
        background:
          "linear-gradient(135deg, rgba(212,175,55,0.10), rgba(160,120,20,0.04))",
        borderColor: "rgba(212,175,55,0.30)",
        borderWidth: 0.5,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)",
        }}
      />
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(212,175,55,0.10)] text-nc-gold">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2 2.4 7.3H22l-6.2 4.5 2.4 7.3L12 16.6 5.8 21.1l2.4-7.3L2 9.3h7.6z" />
        </svg>
      </div>
      <p className="text-[10px] tracking-[0.18em] text-nc-gold/80">
        FROM BUILDER
      </p>
      <h3 className="mt-1 text-[18px] font-bold text-nc-gold">INTERN TO FOUNDER</h3>
      <p className="mt-3 text-[13px] leading-relaxed text-[#A28548]">
        Leverage income &amp; ownership to launch your own venture.
      </p>
    </motion.div>
  );
}

function Legend() {
  const items = [
    { color: "#A78BFA", label: "Clients fund NC" },
    { color: "#C4B5FD", label: "NC pays builders" },
    { color: "#D4AF37", label: "Builders → Founders" },
  ];
  return (
    <motion.ul
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.0, ease: EASE }}
      viewport={VIEWPORT}
      className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
    >
      {items.map((i) => (
        <li
          key={i.label}
          className="flex items-center gap-2 text-[12px] text-[#5D5380]"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: i.color }}
          />
          {i.label}
        </li>
      ))}
    </motion.ul>
  );
}

/* Wrap helper: split desc into ~22-char lines */
function wrap(text: string, max = 22): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur += " " + w;
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines.slice(0, 2);
}

function IconBuildingSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.4">
      <rect x="4" y="6" width="16" height="14" rx="1" />
      <path d="M8 6V3h8v3M8 10h2M14 10h2M8 14h2M14 14h2M11 20v-3h2v3" />
    </svg>
  );
}
function IconUsersSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.4">
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
      <path d="M15 19c0-2 2-4 4-4s2 1 2 4" />
    </svg>
  );
}
