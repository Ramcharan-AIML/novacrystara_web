"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";
import HeroScene from "./HeroScene";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-nc-base py-20 sm:py-24"
    >
      <HeroScene variant="mini" />


      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        viewport={VIEWPORT}
        className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={VIEWPORT}
          className="mb-8 flex flex-col items-center gap-3.5 select-none"
        >
          <div className="relative h-[60px] w-[60px] nc-logo-glow sm:h-[72px] sm:w-[72px]">
            <Image
              src="/assets/main-logo.png"
              alt="NovaCrystara"
              fill
              sizes="(min-width: 640px) 72px, 60px"
              loading="lazy"
              className="object-contain"
            />
          </div>
          {/* <h3 className="text-[20px] font-extrabold tracking-[0.24em] sm:text-[25px] uppercase bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-[#E8C5D8] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(167,139,250,0.40)]">
            NOVACRYSTARA
          </h3> */}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          viewport={VIEWPORT}
          className="text-[36px] font-extrabold leading-tight text-nc-heading sm:text-[44px] lg:text-[52px]"
        >
          Ready to build
          <br />
          <span className="grad-text">something real?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          viewport={VIEWPORT}
          className="mx-auto mt-6 max-w-[460px] text-[14.5px] leading-relaxed text-[#5D5380] sm:text-[15.5px]"
        >
          Join the NC ecosystem — as a client who needs AI delivered, a builder
          ready to grow, or a future founder ready to launch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          viewport={VIEWPORT}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
        >
          <Link href="#" className="nc-btn-primary">
            Apply to Build
          </Link>
          <Link href="#" className="nc-btn-secondary">
            Partner as a Client
          </Link>
          <Link href="#" className="nc-btn-secondary">
            Schedule a Call
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
