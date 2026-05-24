import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "nc-base": "#06070E",
        "nc-surface1": "#07080F",
        "nc-surface2": "#09090F",
        "nc-card": "#0C0A1A",
        "nc-card2": "#0E0C1C",
        "nc-purple": "#7C3AED",
        "nc-violet": "#A78BFA",
        "nc-lavender": "#C4B5FD",
        "nc-rose": "#E8C5D8",
        "nc-gold": "#D4AF37",
        "nc-heading": "#F0EEF8",
        "nc-body": "#94A3B8",
        "nc-muted": "#3D3660",
        "nc-dim": "#2E2A44",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: [
          "64px",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        h2: ["40px", { lineHeight: "1.25", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "1.75", fontWeight: "400" }],
        eyebrow: [
          "11px",
          { lineHeight: "1", fontWeight: "600", letterSpacing: "0.14em" },
        ],
      },
      boxShadow: {
        "nc-primary": "0 0 24px rgba(109,40,217,0.35)",
        "nc-glow": "0 0 32px rgba(124,58,237,0.30)",
      },
      backgroundImage: {
        "nc-card": "linear-gradient(150deg, #0C0A1A, #0E0C1C)",
        "nc-primary":
          "linear-gradient(135deg, #6D28D9, #8B5CF6, #A78BFA)",
        "nc-grad-text":
          "linear-gradient(135deg, #A78BFA 0%, #C4B5FD 45%, #E8C5D8 100%)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
