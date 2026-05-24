"use client";

import { motion } from "framer-motion";
import { slideLeft, staggerContainer, VIEWPORT } from "@/lib/motion";

const PARTNERS = [
  { name: "aws", svg: <LogoAWS /> },
  { name: "Azure", svg: <LogoAzure /> },
  { name: "Google Cloud", svg: <LogoGCP /> },
  { name: "TensorFlow", svg: <LogoTF /> },
  { name: "kubernetes", svg: <LogoK8s /> },
];

export default function TrustBar() {
  return (
    <section className="border-b border-[rgba(167,139,250,0.06)] bg-gradient-to-b from-[rgba(8,6,18,0.9)] to-nc-surface1 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-7 text-center text-[10px] tracking-[0.22em] text-[#6E5FA0] sm:text-[11px]">
          TRUSTED TECHNOLOGY PARTNERS
        </p>
        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14 md:gap-x-20"
        >
          {PARTNERS.map((p) => (
            <motion.li
              key={p.name}
              variants={slideLeft}
              className="group flex items-center gap-2 text-[#ffffff] transition-colors duration-300 hover:text-[#6E5FA0]"
            >
              {p.svg}
              <span className="text-[13px] font-medium tracking-wide">
                {p.name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

const baseIcon = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
};

function LogoAWS() {
  return (
    <svg {...baseIcon}>
      <path d="M3 14c2 2 6 3 9 3s7-1 9-3" />
      <path d="M6 11c1.5 0 3-.5 3-2s-1.5-2-3-2-3 .5-3 2 1.5 2 3 2z" />
      <path d="M18 11c1.5 0 3-.5 3-2s-1.5-2-3-2-3 .5-3 2 1.5 2 3 2z" />
      <path d="M12 8v4" />
    </svg>
  );
}
function LogoAzure() {
  return (
    <svg {...baseIcon}>
      <path d="M11 4 4 18h6l5-9z" />
      <path d="M14 11 9 18h11l-4-6z" />
    </svg>
  );
}
function LogoGCP() {
  return (
    <svg {...baseIcon}>
      <path d="M8 16c-2 0-4-1.5-4-4s2-4 4-4c.5-2 2-3 4-3s4 1.5 4 4c2 0 4 1.5 4 3.5s-2 3.5-4 3.5H8z" />
    </svg>
  );
}
function LogoTF() {
  return (
    <svg {...baseIcon}>
      <path d="m6 4 6-2v6L6 10z" />
      <path d="m12 8 6-2v6l-6 2z" />
      <path d="m9 12 3-1v9l-3-2z" />
      <path d="m12 13 3-1v6" />
    </svg>
  );
}
function LogoK8s() {
  return (
    <svg {...baseIcon}>
      <path d="m12 3 8 4v8l-8 5-8-5V7z" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M12 3v6M4 7l5.5 4M20 7l-5.5 4M12 16v4M8 19l3-3M16 19l-3-3" />
    </svg>
  );
}
