import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a0f1a",
          900: "#0f1729",
          800: "#151d33",
          700: "#1a2540",
          600: "#243358",
        },
        clinical: {
          100: "#e8eef7",
          200: "#c5d4eb",
          300: "#9eb8df",
          400: "#5c8bc9",
          500: "#2d5a9e",
          600: "#1e407a",
        },
        silver: {
          50: "#f8fafc",
          100: "#f5f7fa",
          200: "#e8ecf1",
          300: "#d1d9e4",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "mesh-gradient": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(45, 90, 158, 0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(30, 58, 100, 0.15), transparent)",
        "hero-glow": "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(92, 139, 201, 0.25), transparent 60%)",
        "treatment-hero": "linear-gradient(165deg, #0f1729 0%, #151d33 40%, #1a2540 100%)",
        "treatment-hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(92, 139, 201, 0.12) 0%, transparent 60%)",
        "cta-gradient": "linear-gradient(135deg, #0f1729 0%, #151d33 50%, #1a2540 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(92, 139, 201, 0.4)",
        "glow-lg": "0 0 60px -15px rgba(92, 139, 201, 0.35)",
        soft: "0 4px 24px -4px rgba(10, 15, 26, 0.08)",
        "soft-lg": "0 8px 40px -8px rgba(10, 15, 26, 0.12)",
        card: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(10, 15, 26, 0.1)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.06), 0 16px 40px -12px rgba(10, 15, 26, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
