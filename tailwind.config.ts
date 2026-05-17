import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0e27",
        foreground: "#ffffff",
        accent: {
          cyan: "#00d9ff",
          purple: "#a855f7",
          magenta: "#ec4899",
        },
        secondary: "#a0aec0",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeSlideIn 0.8s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeSlideIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(to right, #00d9ff, #a855f7, #ec4899)",
      },
      boxShadow: {
        "neon-cyan": "0 0 10px #00d9ff, 0 0 20px #00d9ff",
        "neon-purple": "0 0 10px #a855f7, 0 0 20px #a855f7",
      },
    },
  },
  plugins: [],
};

export default config;
