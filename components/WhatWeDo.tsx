"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

interface Card {
  num: string;
  title: string;
  desc: string;
  link: string;
  linkColor: string;
  accent: string;
  iconBg: string;
  icon: React.ReactNode;
}

const CARDS: Card[] = [
  {
    num: "01",
    title: "AI Consulting & Delivery",
    desc: "Production-grade AI systems for real clients. IoT, multicloud, data pipelines — end to end.",
    link: "Learn more →",
    linkColor: "#A78BFA",
    accent: "#A78BFA",
    iconBg: "rgba(167,139,250,0.10)",
    icon: <IconBolt />,
  },
  {
    num: "02",
    title: "Innovation Tracks",
    desc: "Live client projects from day one. Real work, expert mentorship, real outcomes.",
    link: "Explore tracks →",
    linkColor: "#C4B5FD",
    accent: "#C4B5FD",
    iconBg: "rgba(196,181,253,0.10)",
    icon: <IconFlask />,
  },
  {
    num: "03",
    title: "Startup Launchpad",
    desc: "From intern to founder. Funding access, mentorship, and a global network to launch your venture.",
    link: "Start journey →",
    linkColor: "#E8C5D8",
    accent: "#E8C5D8",
    iconBg: "rgba(232,197,216,0.10)",
    icon: <IconRocket />,
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-nc-surface1 py-16 sm:py-20">
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
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#5D5380] sm:text-[16px]">
            We don&apos;t just train people. We build AI products for clients,
            grow elite talent, and launch the next generation of founders.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {CARDS.map((c) => (
            <motion.li
              key={c.num}
              variants={fadeUp}
              className="nc-card nc-card-hover group p-7"
            >
              <div
                className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ background: c.iconBg, color: c.accent }}
              >
                {c.icon}
              </div>
              <span className="text-[11px] tracking-[0.20em] text-[#3A3252]">
                {c.num}
              </span>
              <h3 className="mt-2 text-[18px] font-semibold text-nc-heading sm:text-[20px]">
                {c.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#5D5380]">
                {c.desc}
              </p>
              <a
                href="#"
                className="mt-6 inline-block text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ color: c.linkColor }}
              >
                {c.link}
              </a>
              <span
                aria-hidden
                className="mt-7 block h-[2px] w-12 transition-all group-hover:w-20"
                style={{ background: c.accent }}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
function IconBolt() {
  return (
    <svg {...iconProps}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg {...iconProps}>
      <path d="M9 3h6" />
      <path d="M10 3v7L4 20a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3" />
      <path d="M7 14h10" />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg {...iconProps}>
      <path d="M5 19c2-1 4-1 5 0 1 1 1 3 0 5-2-1-4-1-5-5z" />
      <path d="M14 4c4 0 6 2 6 6-2 4-7 8-10 8L8 14c0-3 4-8 8-10z" />
      <circle cx="15" cy="9" r="1.6" />
    </svg>
  );
}
