"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
import { EASE } from "@/lib/motion";
import { useCountUp } from "@/lib/useCountUp";
import { useInViewOnce } from "@/lib/useInViewOnce";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-nc-base"
    >
      {/* Layer 0: background image — focal point shifted up so the planet curve sits higher */}
      <Image
        src="/assets/Background_image_Nova.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none z-0 object-cover"
        style={{ objectPosition: "center 75%" }}
      />

      {/* Layer 1: subtle dark vignette so content reads cleanly over the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6,7,14,0) 0%, rgba(6,7,14,0.35) 70%, rgba(6,7,14,0.7) 100%)",
        }}
      />

      {/* Layer 2: Three.js star particles drift over the image */}
      <HeroScene variant="full" />

      {/* Layer 3: soft dark spotlight behind central text for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-[620px] w-[1100px] max-w-[92vw] -translate-x-1/2 -translate-y-[58%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6,7,14,0.75) 0%, rgba(6,7,14,0.50) 30%, rgba(6,7,14,0.25) 55%, rgba(6,7,14,0) 75%)",
        }}
      />

      {/* Layer 10: content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-56 pt-24 text-center sm:px-8 sm:pb-60 sm:pt-28">
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="relative mb-7 flex h-[140px] w-[120px] flex-col items-center justify-center rounded-md border sm:h-[160px] sm:w-[140px]"
          style={{
            borderColor: "rgba(167,139,250,0.32)",
            borderWidth: 0.5,
            background:
              "linear-gradient(160deg, rgba(15,10,35,0.55), rgba(8,6,20,0.55))",
            backdropFilter: "blur(8px)",
            boxShadow:
              "0 0 32px rgba(124,58,237,0.30), inset 0 0 24px rgba(167,139,250,0.06)",
          }}
        >
          <div className="relative h-12 w-12 nc-logo-glow sm:h-14 sm:w-14">
            <Image
              src="/assets/main-logo.png"
              alt="NovaCrystara crystal logo"
              fill
              sizes="56px"
              priority
              className="object-contain"
            />
          </div>
          <div className="mt-3 flex flex-col items-center leading-tight">
            <span className="text-[15px] font-bold text-white sm:text-[17px]">
              NC
            </span>
            <span className="text-[15px] font-bold text-white sm:text-[17px]">
              Crystal
            </span>
          </div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(29,194,35,0.2)] bg-[rgba(255,255,255,0.04)] px-4 py-1.5 text-[11px] tracking-[0.18em] text-[#efeef0]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-nc-violet shadow-[0_0_8px_rgba(167,139,250,0.7)]" />
          AI &amp; TELEMETRY LABS · LONDON, UK
        </motion.div>

        <h1 className="font-sans text-[40px] font-extrabold leading-[1.1] tracking-tight text-nc-heading sm:text-5xl lg:text-hero">
          {["Where AI Talent Meets", "Real Business Impact"].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.15, ease: EASE }}
              className="block"
            >
              {i === 1 ? <span className="grad-text">{line}</span> : line}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
            className="mt-4 block text-[22px] font-light italic text-[#7A5FAC] sm:text-[28px] lg:text-[36px]"
          >
            Engineering that actually ships.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
          className="mt-7 max-w-[480px] text-[15px] leading-relaxed text-[#ffffff] sm:text-[16px]"
        >
          We build production AI systems for clients, develop world-class tech
          talent, and launch founders — one ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link href="#what-we-do" className="nc-btn-primary">
            Explore the Ecosystem <span aria-hidden>→</span>
          </Link>
          <Link href="#our-work" className="nc-btn-secondary">
            View Our Work <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>

      {/* Stats bar */}
      <StatsBar />
    </section>
  );
}

interface Stat {
  to: number;
  suffix?: string;
  display?: string;
  label: string;
  icon: React.ReactNode;
}

function StatsBar() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ rootMargin: "0px" });

  const stats: Stat[] = [
    { to: 98, suffix: "%", label: "DELIVERY RATE", icon: <IconCheck /> },
    { to: 150, suffix: "+", label: "BUILDERS TRAINED", icon: <IconUsers /> },
    { to: 15, suffix: "+", label: "STARTUPS LAUNCHED", icon: <IconRocket /> },
    { to: 0, display: "London", label: "GLOBAL HQ", icon: <IconPin /> },
  ];

  return (
    <div
      ref={ref}
      className="absolute inset-x-0 bottom-6 z-20 px-4 sm:bottom-10 sm:px-8"
    >
      <div
        className="mx-auto grid max-w-8xl grid-cols-2 divide-x divide-[rgba(167,139,250,0.08)] rounded-2xl border border-[rgba(167,139,250,0.18)] bg-[rgba(8,8,18,0.65)] px-3 py-5 backdrop-blur-md sm:grid-cols-4 sm:px-8"
        style={{
          boxShadow:
            "0 12px 40px rgba(0,0,0,0.45), 0 0 24px rgba(124,58,237,0.10)",
        }}
      >
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} active={inView} />
        ))}
      </div>
    </div>
  );
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const n = useCountUp({ to: stat.to, startWhen: active && !stat.display });
  return (
    <div className="flex items-center justify-center gap-3 px-2 py-2">
      <span className="text-nc-violet/80">{stat.icon}</span>
      <div className="flex flex-col">
        <span className="text-[22px] font-bold leading-none text-nc-lavender sm:text-[28px]">
          {stat.display ?? n}
          {stat.suffix ?? ""}
        </span>
        <span className="mt-1 text-[9px] tracking-[0.18em] text-[#7b6f9d] sm:text-[10px]">
          {stat.label}
        </span>
      </div>
    </div>
  );
}

/* SVG icons */
const stroke = { stroke: "currentColor", strokeWidth: 1.5, fill: "none" };
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="m8 12 3 3 5-7" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
      <path d="M15 19c0-2 2-4 4-4s2 1 2 4" />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <path d="M5 19c2-1 4-1 5 0 1 1 1 3 0 5-2-1-4-1-5-5z" />
      <path d="M14 4c4 0 6 2 6 6-2 4-7 8-10 8L8 14c0-3 4-8 8-10z" />
      <circle cx="15" cy="9" r="1.6" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
