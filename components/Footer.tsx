"use client";

import Image from "next/image";
import Link from "next/link";

interface Col {
  title: string;
  links: { label: string; href: string }[];
}

const COLS: Col[] = [
  {
    title: "WHAT WE DO",
    links: [
      { label: "AI Consulting", href: "#what-we-do" },
      { label: "Innovation Tracks", href: "#tracks" },
      { label: "Startup Launchpad", href: "#what-we-do" },
      { label: "Our Work", href: "#our-work" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About NC", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Success Stories", href: "#success" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Innovation Roadmap", href: "#" },
      { label: "Tech Blog", href: "#" },
      { label: "Community", href: "#" },
      { label: "Contact Us", href: "#cta" },
    ],
  },
];

const SOCIALS = [
  { label: "in", href: "#" },
  { label: "tw", href: "#" },
  { label: "ig", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(167,139,250,0.07)] bg-[#04050B] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="relative inline-block h-6 w-6 nc-logo-glow">
                <Image
                  src="/assets/main-logo.png"
                  alt="NovaCrystara"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </span>
              <span className="text-[11px] font-bold tracking-[0.18em] text-nc-lavender">
                NOVACRYSTARA AI LABS
              </span>
            </div>
            <p className="mt-4 max-w-[260px] text-[12px] leading-relaxed text-[rgb(152,149,163)]">
              Building AI products. Growing world-class talent. Launching the
              next generation of founders.
            </p>
            <p className="mt-4 text-[11px] text-[rgb(152,149,163)]">
              contact@novacrystara.ai
            </p>
            <p className="mt-1 text-[11px] text-[rgb(152,149,163)]">
              www.novacrystara.ai
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <p className="text-[10px] tracking-[0.18em] text-[#ffffff]">
                {c.title}
              </p>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[11.5px] text-[#858488] transition-colors hover:text-[#7A6DA8]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[rgba(167,139,250,0.08)] pt-6 sm:flex-row sm:items-center">
          <p className="text-[10px] text-nc-lavender">
            © 2025 NovaCrystara AI Labs Ltd. All rights reserved. London, UK.
          </p>
          <ul className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(167,139,250,0.08)] bg-[rgba(167,139,250,0.04)] text-[10px] font-semibold uppercase text-[#3A3450] transition-colors hover:border-[rgba(167,139,250,0.20)] hover:text-[#7A6DA8]"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
