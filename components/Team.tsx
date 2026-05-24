"use client";

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
    <section className="bg-nc-surface1 py-16 sm:py-20">
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
            <motion.li
              key={m.name}
              variants={fadeUp}
              className="nc-card nc-card-hover flex gap-5 p-7"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: m.iconBg, color: m.roleColor }}
              >
                {m.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-semibold text-nc-heading sm:text-[17px]">
                  {m.name}
                </h3>
                <p
                  className="mt-1 text-[12.5px] font-medium"
                  style={{ color: m.roleColor }}
                >
                  {m.role}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#5D5380]">
                  {m.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
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
