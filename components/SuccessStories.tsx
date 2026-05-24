"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { useCountUp } from "@/lib/useCountUp";
import { useInViewOnce } from "@/lib/useInViewOnce";

interface StatCard {
  to: number;
  suffix: string;
  label: string;
  gradient: string;
}

const STATS: StatCard[] = [
  {
    to: 92,
    suffix: "%",
    label: "CAREER ADVANCEMENT",
    gradient: "linear-gradient(135deg, #A78BFA, #C4B5FD)",
  },
  {
    to: 45,
    suffix: "%",
    label: "AVG SALARY INCREASE",
    gradient: "linear-gradient(135deg, #C4B5FD, #E8C5D8)",
  },
  {
    to: 15,
    suffix: "+",
    label: "STARTUPS LAUNCHED",
    gradient: "linear-gradient(135deg, #E8C5D8, #A78BFA)",
  },
];

const QUOTES = [
  {
    text: "From intern to founder in 8 months. NovaCrystara gave me the skills, the network, and the confidence to launch my own AI SaaS company.",
    author: "Sarah Chen",
    role: "Founded AI SaaS Company",
  },
  {
    text: "I landed my dream role as Senior ML Engineer. The real client projects made all the difference in every single interview I had.",
    author: "Michael Davis",
    role: "Senior ML Engineer",
  },
];

export default function SuccessStories() {
  return (
    <section id="success" className="bg-nc-base py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="nc-eyebrow">PROVEN OUTCOMES</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            Results that
            <br />
            <span className="grad-text">speak for themselves</span>
          </h2>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {STATS.map((s) => (
            <StatTile key={s.label} stat={s} />
          ))}
        </motion.ul>

        <motion.ul
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {QUOTES.map((q) => (
            <motion.li
              key={q.author}
              variants={fadeUp}
              className="nc-card relative p-7"
            >
              <span
                aria-hidden
                className="absolute left-5 top-2 text-[80px] leading-none text-[#1E1A30]"
              >
                &ldquo;
              </span>
              <p className="relative mt-6 text-[14.5px] italic leading-relaxed text-[#5D5380]">
                {q.text}
              </p>
              <div className="mt-6">
                <p className="text-[14px] font-bold text-nc-violet">
                  {q.author}
                </p>
                <p className="mt-1 text-[11.5px] text-[#3A3252]">{q.role}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function StatTile({ stat }: { stat: StatCard }) {
  const [ref, inView] = useInViewOnce<HTMLLIElement>();
  const n = useCountUp({ to: stat.to, startWhen: inView });
  return (
    <motion.li
      ref={ref}
      variants={fadeUp}
      className="nc-card p-8 text-center sm:text-left"
    >
      <p
        className="text-[56px] font-extrabold leading-none"
        style={{
          backgroundImage: stat.gradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {n}
        {stat.suffix}
      </p>
      <p className="mt-3 text-[10.5px] tracking-[0.18em] text-[#3A3252]">
        {stat.label}
      </p>
    </motion.li>
  );
}
