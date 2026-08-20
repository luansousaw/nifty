import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { aracar: { red: "#e31b23", dark: "#111111", cream: "#f5f4f1" } },
      boxShadow: { panel: "0 24px 70px rgba(0,0,0,.10)" },
    },
  },
  plugins: [],
} satisfies Config;
