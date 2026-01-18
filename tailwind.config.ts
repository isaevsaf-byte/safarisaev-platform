import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#E5E5E5",
        secondary: "#737373",
        accent: "#00FF94",
        efficiency: {
          safe: "#10B981", // Emerald-500
          warning: "#F59E0B", // Amber-500
          critical: "#F43F5E", // Rose-500
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

