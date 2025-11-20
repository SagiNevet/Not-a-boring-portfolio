/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "var(--font-display)", "sans-serif"],
        body: ["Assistant", "var(--font-body)", "sans-serif"],
      },
      colors: {
        "ink-900": "#04060a",
        "ink-800": "#0b111b",
        "ink-700": "#151d2b",
        accent: "#7c5dff",
        "accent-2": "#29d6b8",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(0, 0, 0, 0.65)",
      },
    },
  },
  plugins: [],
};

