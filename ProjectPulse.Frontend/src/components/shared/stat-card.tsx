import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
  icon?: React.ReactNode;
  accent?: string;
}

export function StatCard({ label, value, helper, icon, accent = "#484BF1" }: StatCardProps) {
  return (
    <div className="
      relative overflow-hidden rounded-[1.25rem]
      border border-slate-200/80 bg-white p-5
      shadow-[0_2px_16px_rgba(0,0,0,0.05)]
      transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.09)]
      dark:border-white/[0.06] dark:bg-[#161B27]
      dark:shadow-[0_2px_24px_rgba(0,0,0,0.3)]
    ">
      {/* subtle tinted corner glow */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.12] blur-2xl"
        style={{ background: accent }}
      />

      {/* icon + label row */}
      <div className="relative mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {label}
        </p>
        {icon && (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl text-white"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}
          >
            {icon}
          </span>
        )}
      </div>

      {/* value */}
      <p
        className="relative text-[2rem] font-semibold leading-none tracking-tight text-slate-900 dark:text-white"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        {value}
      </p>

      {/* helper */}
      <div className="relative mt-3 flex items-center gap-1.5">
        <span
          className="h-1 w-1 rounded-full"
          style={{ background: accent }}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">{helper}</p>
      </div>
    </div>
  );
}