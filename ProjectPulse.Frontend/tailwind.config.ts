import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: { primary:"#484BF1", secondary:"#0F3FC2", accent:"#052A90", surface:"#0A132A", background:"#020E2C" } }, boxShadow:{soft:"0 10px 30px rgba(2,14,44,0.12)"} } },
  plugins: []
} satisfies Config;
