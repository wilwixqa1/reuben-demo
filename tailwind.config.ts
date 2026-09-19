import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: { DEFAULT: "#1a2332", mid: "#2a3a4e" },
        ink: "#0f1419",
        sand: { DEFAULT: "#f4f0eb", dark: "#e8e2d9" },
        warm: { DEFAULT: "#c2956b", light: "#d4ae88" },
        forest: { DEFAULT: "#3d6b52", dark: "#2e5440" },
        border: "#ddd8d0",
      },
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
