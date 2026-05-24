"use client";

import { useEffect, useState } from "react";
import type { Variants, Transition } from "framer-motion";

export const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const VIEWPORT = { once: true, margin: "-100px" } as const;

const t = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: t(0.7) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: t(0.6) },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: t(0.6) },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: t(0.6) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: t(0.6) },
};

export const staggerContainer = (stagger = 0.15, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/* ============================================================
   useReducedMotion — returns true when user has prefers-reduced-motion
   ============================================================ */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}
