"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  { name: "OpenAI", svg: <LogoOpenAI /> },
  { name: "Anthropic", svg: <LogoAnthropic /> },
  { name: "LangChain", svg: <LogoLangChain /> },
  { name: "Hugging Face", svg: <LogoHuggingFace /> },
  { name: "Ollama", svg: <LogoOllama /> },
  { name: "Next.js", svg: <LogoNextJS /> },
  { name: "React", svg: <LogoReact /> },
  { name: "TypeScript", svg: <LogoTypeScript /> },
  { name: "Framer Motion", svg: <LogoFramerMotion /> },
  { name: "Three.js", svg: <LogoThreeJS /> },
  { name: "Docker", svg: <LogoDocker /> },
  { name: "Kubernetes", svg: <LogoK8s /> },
  { name: "Terraform", svg: <LogoTerraform /> },
  { name: "Redis", svg: <LogoRedis /> },
  { name: "PostgreSQL", svg: <LogoPostgreSQL /> },
  { name: "AWS", svg: <LogoAWS /> },
];

// Duplicate the array to ensure a perfectly seamless loop in the marquee track
const PARTNERS_DOUBLE = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function TrustBar() {
  return (
    <section className="relative bg-nc-base py-6 sm:py-8 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-center text-[10px] tracking-[0.28em] text-[#8C7DBE] sm:text-[11px] font-extrabold select-none uppercase mb-2 opacity-90">
          TECHNOLOGIES WE BUILD WITH
        </p>

        <div className="relative mt-4 w-full overflow-hidden">
          {/* Cinematic linear gradient masks on sides for elegant fade-in/out visual flow */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-nc-base to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-nc-base to-transparent z-10" />

          {/* Buttery-smooth infinite scrolling marquee track */}
          <motion.div
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              ease: "linear",
              duration: 32, // Slower speed to reflect the larger text/icons for a premium feel
              repeat: Infinity,
            }}
            className="flex w-max items-center gap-16 sm:gap-20 md:gap-28 py-2"
          >
            {PARTNERS_DOUBLE.map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                className="flex items-center gap-3 text-[#8F8D98] opacity-50 hover:opacity-100 hover:text-nc-violet transition-all duration-300 cursor-pointer select-none"
              >
                <span className="scale-105 transition-transform duration-300 hover:scale-110">{p.svg}</span>
                <span className="text-[13px] font-semibold tracking-[0.16em] font-sans uppercase">
                  {p.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   High-Fidelity, Clean Vector Brand Logos (Accurate 24x24 Dimensions)
   ============================================================ */
function LogoOpenAI() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 0 0z"/>
    </svg>
  );
}

function LogoAnthropic() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.4 4h-3.2L7.6 20h3.2l1.6-4.6h5.2l1.6 4.6h3.2L16.4 4zm-3.2 9.2l1.8-5.3 1.8 5.3h-3.6z" />
    </svg>
  );
}

function LogoLangChain() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function LogoHuggingFace() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.5" fill="#000000" />
      <circle cx="15" cy="9" r="1.5" fill="#000000" />
    </svg>
  );
}

// Simple black vector silhouette for Ollama
function LogoOllama() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9l-4-5-4 5v9z" />
      <circle cx="9" cy="12" r="1" fill="#000000" />
      <circle cx="15" cy="12" r="1" fill="#000000" />
      <path d="M8 6h2v3H8zm6 0h2v3h-2z" />
    </svg>
  );
}

function LogoNextJS() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5L4.5 11h2.5l4 6.5zm7.5-3.5L14 11h2.5l2 3z" />
    </svg>
  );
}

function LogoReact() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-1c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
      <ellipse cx="12" cy="12" rx="7" ry="2" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="7" ry="2" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="7" ry="2" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(150 12 12)" />
    </svg>
  );
}

function LogoTypeScript() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="3" />
      <text x="5" y="18" fill="#06070e" fontSize="13" fontWeight="900" fontFamily="sans-serif">TS</text>
    </svg>
  );
}

function LogoFramerMotion() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h12v12H0V0zm12 12h12v12H12V12zM0 12h12v12H0V12z" />
    </svg>
  );
}

function LogoThreeJS() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l10 17H2L12 2zm0 4.5L5.5 17h13L12 6.5z" />
    </svg>
  );
}

function LogoDocker() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 10h3v3H3zm4 0h3v3H7zm4 0h3v3h-3zm8-2h-3v3h3zm-4 0h-3v3h3zm-4 0H7v3h3zm-4 0H3v3h3zm0-4h3v3H3zm19 11c-2 0-4-1.5-4-3.5S20 10 22 10v7z" />
    </svg>
  );
}

function LogoK8s() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L4.5 5.2v8.6L12 22l7.5-8.2V5.2L12 2zm0 2.5l5.5 2.4V13l-5.5 6-5.5-6V6.9l5.5-2.4z" />
    </svg>
  );
}

function LogoTerraform() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2h7v7H4zm9 0h7v7h-7zm-9 9h7v7H4zm9 9h7v7h-7z" />
    </svg>
  );
}

function LogoRedis() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 5h20v4H2zm0 6h20v4H2zm0 6h20v4H2z" />
    </svg>
  );
}

function LogoPostgreSQL() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.39.4.08.56-.17.56-.38v-1.34c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.84-2.33 4.69-4.56 4.94.36.31.68.92.68 1.85v2.75c0 .22.16.47.57.38C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}

function LogoAWS() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21c-4.4 0-8-1.8-8-4 0-.4.2-.8.6-1.1.4-.3.9-.3 1.1-.1.7.5 3.1 1.7 6.3 1.7s5.6-1.2 6.3-1.7c.3-.2.8-.2 1.1.1.4.3.6.7.6 1.1 0 2.2-3.6 4-8 4zm8.3-5.2c-.2-.4-.6-.6-1.1-.4l-2.1.8c-.4.2-.6.7-.4 1.1.2.4.7.6 1.1.4l2.1-.8.4-1.1z" />
    </svg>
  );
}

