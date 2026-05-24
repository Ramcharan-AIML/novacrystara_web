"use client";

import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight, staggerContainer, VIEWPORT } from "@/lib/motion";

interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    num: "PROJECT 01",
    title: "Smart IoT Analytics Platform",
    desc: "Device data collection → Real-time processing → AI analytics → Cloud deployment → Automated monitoring.",
    tags: ["IoT", "AI", "Cloud", "DevOps"],
  },
  {
    num: "PROJECT 02",
    title: "Multicloud ML Infrastructure",
    desc: "ML model training → Multi-cloud deployment → DevOps automation → Performance optimization at scale.",
    tags: ["AWS", "Azure", "ML", "GCP"],
  },
  {
    num: "PROJECT 03",
    title: "Enterprise DevOps Pipeline",
    desc: "CI/CD → Container orchestration → Multi-environment deployment → Intelligent scaling.",
    tags: ["Docker", "K8s", "Jenkins"],
  },
  {
    num: "PROJECT 04",
    title: "Data-Driven AI Solutions",
    desc: "Data warehouse → ETL pipelines → AI model integration → BI dashboards → Agile delivery.",
    tags: ["Data Eng", "AI", "BI", "ETL"],
  },
];

export default function OurWork() {
  return (
    <section id="our-work" className="bg-nc-surface1 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="nc-eyebrow">REAL-WORLD DELIVERY</p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight text-nc-heading sm:text-[40px]">
            What we build
            <br />
            <span className="grad-text">for clients</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#5D5380] sm:text-[16px]">
            Production systems delivered. Not assignments. Not demos. Real
            enterprise-grade AI solutions.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.num}
              variants={i % 2 === 0 ? slideLeft : slideRight}
              className="nc-card nc-card-hover p-7"
            >
              <p className="text-[10px] tracking-[0.20em] text-[#4A4070]">
                {p.num}
              </p>
              <h3 className="mt-2 text-[18px] font-semibold text-nc-heading sm:text-[20px]">
                {p.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#5D5380]">
                {p.desc}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-[rgba(167,139,250,0.12)] bg-[rgba(167,139,250,0.05)] px-2 py-0.5 text-[11px] text-[#7A6DA8]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
