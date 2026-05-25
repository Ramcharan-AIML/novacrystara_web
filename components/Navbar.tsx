"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#what-we-do", label: "What We Do", id: "what-we-do" },
  { href: "#our-work", label: "Our Work", id: "our-work" },
  { href: "#tracks", label: "Tracks", id: "tracks" },
  { href: "#success", label: "Success", id: "success" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock body when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.nav
      animate={{
        backgroundColor: scrolled ? "rgba(6,7,14,0.92)" : "rgba(6,7,14,0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderColor: scrolled
          ? "rgba(140,100,255,0.10)"
          : "rgba(140,100,255,0)",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b"
      style={{ borderBottomWidth: 0.5 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Brand — framed crystal box + NOVACRYSTARA / AI LABS LTD text (scaled down beautifully on mobile) */}
        <Link href="#top" className="flex items-center gap-2 sm:gap-3" aria-label="NovaCrystara home">
          <span
            className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md"
          >
            <span className="relative inline-block h-5 w-5 sm:h-7 sm:w-7 nc-logo-glow">
              <Image
                src="/assets/main-logo.png"
                alt="NovaCrystara"
                fill
                sizes="(min-width: 640px) 28px, 20px"
                className="object-contain"
              />
            </span>
          </span>
          <span className="relative inline-block h-5 w-[120px] sm:h-7 sm:w-[168px]">
            <Image
              src="/assets/name-logo.png"
              alt="NOVACRYSTARA AI LABS LTD"
              fill
              sizes="(min-width: 640px) 168px, 120px"
              priority
              className="object-contain object-left"
            />
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[14px] font-medium transition-colors duration-300 hover:text-white"
                style={{
                  color: active === l.id ? "#A78BFA" : "#E5DEFF",
                  textShadow:
                    active === l.id
                      ? "0 0 12px rgba(167,139,250,0.45)"
                      : "0 1px 6px rgba(0,0,0,0.6)",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link href="#cta" className="nc-btn-secondary hidden lg:inline-flex">
            Partner With Us
            <span aria-hidden>→</span>
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(167,139,250,0.15)] bg-[rgba(167,139,250,0.04)] lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className="absolute left-0 top-0 h-[1.5px] w-full bg-nc-lavender transition-transform duration-300"
                style={{ transform: open ? "translateY(7px) rotate(45deg)" : "" }}
              />
              <span
                className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-nc-lavender transition-opacity duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute bottom-0 left-0 h-[1.5px] w-full bg-nc-lavender transition-transform duration-300"
                style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-t border-[rgba(167,139,250,0.10)] bg-[rgba(6,7,14,0.96)] backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-[15px] text-nc-body hover:bg-[rgba(167,139,250,0.06)] hover:text-nc-lavender"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="nc-btn-primary w-full justify-center"
                >
                  Partner With Us <span aria-hidden>→</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
