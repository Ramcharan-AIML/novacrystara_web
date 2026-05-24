"use client";

import { motion } from "framer-motion";
import { EASE, fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

interface Step {
  num: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Apply & Match",
    desc: "Interview and get matched to a live client project track that fits your level.",
  },
  {
    num: "02",
    title: "Build Real Products",
    desc: "Ship production-ready AI systems alongside world-class expert leads.",
  },
  {
    num: "03",
    title: "Earn & Own",
    desc: "Gain income, verified credentials, and equity in what you build.",
  },
  {
    num: "04",
    title: "Launch or Lead",
    desc: "Found your own AI startup or join a world-class team as a senior engineer.",
  },
];

export default function Journey() {
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
          <p className="nc-eyebrow">THE JOURNEY</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            Intern to founder
            <br />
            <span className="grad-text">in 4 stages</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="relative mt-16 hidden md:block">
          {/* Connecting line */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE }}
            viewport={VIEWPORT}
            style={{ transformOrigin: "left center" }}
            className="absolute left-[6%] right-[6%] top-[22px] block h-[0.5px]"
          >
            <span
              className="block h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(167,139,250,0.15), rgba(196,181,253,0.35), rgba(232,197,216,0.25), rgba(167,139,250,0.10))",
              }}
            />
          </motion.span>

          <motion.ol
            variants={staggerContainer(0.18, 0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative grid grid-cols-4 gap-6"
          >
            {STEPS.map((s, i) => (
              <motion.li key={s.num} variants={fadeUp} className="text-center">
                <StepCircle index={i} num={s.num} />
                <h3 className="mt-5 text-[15px] font-semibold text-nc-heading sm:text-[16px]">
                  {s.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[200px] text-[12.5px] leading-relaxed text-[#5D5380]">
                  {s.desc}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* Mobile: vertical */}
        <ol className="relative mt-12 space-y-9 md:hidden">
          <span
            aria-hidden
            className="absolute left-[21px] top-2 bottom-2 w-[0.5px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(167,139,250,0.20), rgba(196,181,253,0.35), rgba(232,197,216,0.20), rgba(167,139,250,0.10))",
            }}
          />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <StepCircle index={i} num={s.num} />
              <div className="flex-1 pt-1">
                <h3 className="text-[15px] font-semibold text-nc-heading">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5D5380]">
                  {s.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepCircle({ num, index }: { num: string; index: number }) {
  const isLast = index === 3;
  const bg = isLast
    ? "linear-gradient(135deg, #6D28D9, #A78BFA, #E8C5D8)"
    : "linear-gradient(135deg, #16112A, #1E1838)";
  return (
    <span
      className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border text-[14px] font-bold"
      style={{
        background: bg,
        borderColor: "rgba(167,139,250,0.30)",
        borderWidth: 0.5,
        color: isLast ? "#fff" : "#A78BFA",
      }}
    >
      {num}
    </span>
  );
}
