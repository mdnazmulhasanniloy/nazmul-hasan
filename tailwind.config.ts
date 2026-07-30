import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070908",
        panel: "#0d100f",
        line: "#242a26",
        acid: "#c7ff4a",
        cyan: "#7ee7f2",
        muted: "#9ba49d",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(199,255,74,.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
