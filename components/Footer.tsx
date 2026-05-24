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
  { label: "LinkedIn", href: "#", icon: <IconLinkedIn /> },
  { label: "X (Twitter)", href: "#", icon: <IconX /> },
  { label: "Facebook", href: "#", icon: <IconFacebook /> },
  { label: "GitHub", href: "#", icon: <IconGitHub /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(167,139,250,0.07)] bg-[#04050B] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Giant premium brand signature (placed at the top of the footer, above columns) */}
        <div className="mb-14 select-none overflow-hidden text-center sm:mb-16">
          <h2 className="text-[11vw] font-extrabold tracking-tighter leading-none bg-gradient-to-b from-[#A78BFA] via-[#7C3AED] to-[#04050B] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(167,139,250,0.22)]">
            NovaCrystara
          </h2>
        </div>

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
              {/* <span className="text-[11px] font-bold tracking-[0.18em] text-nc-lavender">
                NOVACRYSTARA AI LABS
              </span> */}
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
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[rgba(167,139,250,0.08)] bg-[rgba(167,139,250,0.04)] text-[#4E4765] transition-all hover:border-[rgba(167,139,250,0.32)] hover:bg-[rgba(167,139,250,0.08)] hover:text-nc-lavender hover:shadow-[0_0_12px_rgba(167,139,250,0.20)]"
                >
                  {s.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   SVG Icons for Footer Socials
   ============================================================ */
function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}
