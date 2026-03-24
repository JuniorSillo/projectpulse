// ─── Shared dashboard design tokens & primitives ─────────────────────────────
// Used across all four role dashboards for visual consistency.

import React from "react";
import { cn } from "@/lib/utils";

// ── Risk / priority badge ─────────────────────────────────────────────────────
const riskStyles: Record<string, string> = {
  High:     "bg-rose-500/10   text-rose-500   border-rose-500/20",
  Medium:   "bg-amber-500/10  text-amber-500  border-amber-500/20",
  Low:      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Critical: "bg-rose-600/15   text-rose-600   border-rose-600/25",
};

export function RiskBadge({ label }: { label: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
      riskStyles[label] ?? "bg-slate-100 text-slate-500 border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:border-white/10"
    )}>
      {label}
    </span>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
export function ProgressBar({ value, accent = "#484BF1" }: { value: number; accent?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, background: `linear-gradient(90deg, ${accent}, ${accent}bb)` }}
      />
    </div>
  );
}

// ── Panel card (replaces bare <Card>) ────────────────────────────────────────
export function PanelCard({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "flex flex-col rounded-[1.5rem] border border-slate-200/80 bg-white",
      "shadow-[0_2px_20px_rgba(0,0,0,0.05)]",
      "dark:border-white/[0.06] dark:bg-[#161B27] dark:shadow-[0_2px_32px_rgba(0,0,0,0.35)]",
      className,
    )}>
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-white/[0.05]">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
        {action && <div className="text-xs text-slate-400">{action}</div>}
      </div>
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
}

// ── Priority project row (admin) ──────────────────────────────────────────────
export function PriorityProjectRow({
  name,
  description,
  progress,
  risk,
}: {
  name: string;
  description: string;
  progress: number;
  risk: string;
}) {
  return (
    <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200 hover:bg-slate-50 dark:border-white/[0.05] dark:bg-white/[0.02] dark:hover:border-white/[0.09] dark:hover:bg-white/[0.04]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{name}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <RiskBadge label={risk} />
      </div>
      <div className="flex items-center gap-3">
        <ProgressBar value={progress} accent="#f43f5e" />
        <span className="shrink-0 text-xs font-semibold tabular-nums text-rose-500">{progress}%</span>
      </div>
    </div>
  );
}

// ── Milestone row (manager / client) ─────────────────────────────────────────
export function MilestoneRow({
  title,
  dueDate,
  progress,
  invert = false,
}: {
  title: string;
  dueDate: string;
  progress: number;
  invert?: boolean;
}) {
  const displayValue = invert ? 100 - progress : progress;
  const accent = invert ? "#f43f5e" : "#484BF1";

  return (
    <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200 hover:bg-slate-50 dark:border-white/[0.05] dark:bg-white/[0.02] dark:hover:border-white/[0.09] dark:hover:bg-white/[0.04]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        <span className="shrink-0 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400">
          {dueDate}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <ProgressBar value={displayValue} accent={accent} />
        <span className="shrink-0 text-xs font-semibold tabular-nums" style={{ color: accent }}>
          {displayValue}%
        </span>
      </div>
    </div>
  );
}

// ── Task row (developer) ──────────────────────────────────────────────────────
export function TaskRow({
  title,
  description,
  priority,
}: {
  title: string;
  description: string;
  priority: string;
}) {
  return (
    <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200 hover:bg-slate-50 dark:border-white/[0.05] dark:bg-white/[0.02] dark:hover:border-white/[0.09] dark:hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <RiskBadge label={priority} />
      </div>
    </div>
  );
}

// ── Project row (client) ──────────────────────────────────────────────────────
export function ProjectRow({
  name,
  description,
  progress,
}: {
  name: string;
  description: string;
  progress?: number;
}) {
  return (
    <div className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200 hover:bg-slate-50 dark:border-white/[0.05] dark:bg-white/[0.02] dark:hover:border-white/[0.09] dark:hover:bg-white/[0.04]">
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{name}</p>
      <p className="mt-0.5 mb-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
      {progress !== undefined && (
        <div className="flex items-center gap-3">
          <ProgressBar value={progress} />
          <span className="shrink-0 text-xs font-semibold tabular-nums text-[#484BF1]">{progress}%</span>
        </div>
      )}
    </div>
  );
}