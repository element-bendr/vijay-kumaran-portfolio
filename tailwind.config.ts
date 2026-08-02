import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./data/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: { desktop: "900px", sm: "640px", md: "768px", lg: "1024px" },
    extend: {
      colors: { dark: "#050B14", "dark-soft": "#08111F", "dark-line": "rgba(255,255,255,.12)", light: "#F7F8FA", "light-line": "rgba(11,18,32,.12)", ink: "#0B1220", "muted-dark": "#A7B0C0", "muted-light": "#5D6675", blue: "#2563EB", cyan: "#22D3EE" },
      fontFamily: { sans: ["Inter", "Geist", "Arial", "Helvetica", "sans-serif"], display: ["Georgia", "Times New Roman", "serif"], mono: ["ui-monospace", "SFMono-Regular", "monospace"], comic: ["'Comic Sans MS'", "Chalkboard SE", "'Comic Neue'", "cursive"] },
    },
  },
  plugins: [],
};

export default config;
