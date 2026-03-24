"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  if (!mounted) {
    return <div className="h-9 w-9 rounded-xl border border-slate-200 dark:border-white/[0.08]" />;
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        group relative flex h-9 w-9 items-center justify-center
        rounded-xl border border-slate-200 bg-white
        text-slate-500 transition-all duration-200
        hover:border-slate-300 hover:text-slate-900
        dark:border-white/[0.08] dark:bg-white/[0.04]
        dark:text-slate-400 dark:hover:border-white/[0.16]
        dark:hover:text-white
      "
      aria-label="Toggle theme"
    >
      {/* glow on hover in dark mode */}
      <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[#484BF1]/10" />

      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
    </button>
  );
}