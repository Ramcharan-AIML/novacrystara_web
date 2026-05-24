"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  to: number;
  duration?: number;
  startWhen?: boolean;
}

const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

/**
 * Count from 0 → `to`. Triggers only when `startWhen` flips true
 * (typically driven by IntersectionObserver in the caller).
 * Respects prefers-reduced-motion by jumping straight to the final value.
 */
export function useCountUp({ to, duration = 2000, startWhen = true }: Options): number {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startWhen || startedRef.current) return;
    startedRef.current = true;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(to);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(easeOutQuart(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, startWhen]);

  return value;
}
