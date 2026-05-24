"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

type Difficulty = "Advanced" | "Intermediate" | "Beginner";

interface Track {
  title: string;
  difficulty: Difficulty;
  duration: string;
  desc: string;
  accent: string;
}

const TRACKS: Track[] = [
  {
    title: "AI Agents",
    difficulty: "Advanced",
    duration: "12 Weeks",
    desc: "Autonomous intelligence. Agent logic, prompt chaining, vector stores, tool integration.",
    accent: "#F87171",
  },
  {
    title: "IoT & Edge",
    difficulty: "Intermediate",
    duration: "10 Weeks",
    desc: "Bridge sensors and cloud. Real-time telemetry, edge computing, device security.",
    accent: "#FBBF24",
  },
  {
    title: "Multi Cloud",
    difficulty: "Advanced",
    duration: "12 Weeks",
    desc: "Architect across AWS, Azure, GCP. Kubernetes, global load balancing, cost optimisation.",
    accent: "#34D399",
  },
  {
    title: "Data Engineering",
    difficulty: "Intermediate",
    duration: "8 Weeks",
    desc: "Robust pipelines. Data warehousing, ETL with Airflow, distributed Spark.",
    accent: "#A78BFA",
  },
  {
    title: "Project Management",
    difficulty: "Beginner",
    duration: "6 Weeks",
    desc: "Lead cross-functional teams. Budget, risk, agile methodologies done right.",
    accent: "#E8C5D8",
  },
  {
    title: "Scrum Master",
    difficulty: "Beginner",
    duration: "6 Weeks",
    desc: "High-velocity agile. Sprint planning, burn-down charts, self-organising teams.",
    accent: "#C4B5FD",
  },
];

const DIFFICULTY_STYLE: Record<Difficulty, { bg: string; color: string }> = {
  Advanced: { bg: "rgba(248,113,113,0.10)", color: "#F87171" },
  Intermediate: { bg: "rgba(251,191,36,0.10)", color: "#FBBF24" },
  Beginner: { bg: "rgba(52,211,153,0.10)", color: "#34D399" },
};

export default function Tracks() {
  return (
    <section id="tracks" className="bg-nc-base py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="nc-eyebrow">SPECIALISATION PATHWAYS</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            Choose your
            <br />
            <span className="grad-text">Innovation Track</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#5D5380] sm:text-[16px]">
            Each track puts you on live client projects from day one. Pick your
            domain, build real systems, earn verified credentials.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {TRACKS.map((t) => {
            const ds = DIFFICULTY_STYLE[t.difficulty];
            return (
              <motion.li
                key={t.title}
                variants={fadeUp}
                className="nc-card nc-card-hover flex flex-col p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded px-2 py-1 text-[10px] font-semibold tracking-wide"
                    style={{ background: ds.bg, color: ds.color }}
                  >
                    {t.difficulty}
                  </span>
                  <span className="text-[11px] text-[#5D5380]">
                    ⏱ {t.duration}
                  </span>
                </div>
                <h3 className="mt-5 text-[18px] font-semibold text-nc-heading sm:text-[20px]">
                  {t.title}
                </h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-[#5D5380]">
                  {t.desc}
                </p>
                <a
                  href="#cta"
                  className="mt-5 inline-block text-[13px] font-medium text-nc-violet transition-opacity hover:opacity-80"
                >
                  Apply to build →
                </a>
                <span
                  aria-hidden
                  className="mt-5 block h-[2px] w-12 transition-all group-hover:w-20"
                  style={{ background: t.accent }}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
