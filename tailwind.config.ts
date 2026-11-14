import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F7F4",
        foreground: "#151515",
        brand: {
          bg: "#F8F7F4",
          card: "#F0EFEB",
          text: "#151515",
          muted: "#777777",
          border: "#E8E6E1",
          accent: "#C66B39",
          "accent-hover": "#B25C2D",
          dark: "#171717",
          "dark-surface": "#222222",
          "dark-border": "#333333",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        luxury: "0.25em",
        wide: "0.15em",
        tightest: "-0.04em",
      },
      boxShadow: {
        luxury: "0 20px 40px -15px rgba(0, 0, 0, 0.05)",
        "luxury-hover": "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
        floating: "0 30px 60px -20px rgba(0, 0, 0, 0.12)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
