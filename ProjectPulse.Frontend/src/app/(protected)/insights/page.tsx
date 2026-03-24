import { PageHeader } from "@/components/shared/page-header";
import { InsightCard } from "@/components/insights/insight-card";
import { Sparkles, TrendingUp, AlertTriangle, Users, CheckCircle2 } from "lucide-react";

const insights = [
  {
    title: "Project Apollo is high risk",
    body: "Five tasks are late and payments scope expanded after stakeholder review.",
    icon: <AlertTriangle className="h-4 w-4" />,
    severity: "high" as const,
  },
  {
    title: "API Integration milestone may slip",
    body: "Current velocity suggests a schedule miss unless blockers are cleared in 48 hours.",
    icon: <TrendingUp className="h-4 w-4" />,
    severity: "medium" as const,
  },
  {
    title: "Developer workload is uneven",
    body: "One engineer carries a disproportionate amount of high-priority delivery work.",
    icon: <Users className="h-4 w-4" />,
    severity: "medium" as const,
  },
  {
    title: "Client readiness is improving",
    body: "UAT preparedness for Orion Client Portal has strengthened over the last week.",
    icon: <CheckCircle2 className="h-4 w-4" />,
    severity: "positive" as const,
  },
];

const severityStyles = {
  high:     { border: "border-rose-200 dark:border-rose-500/20",     glow: "rgba(244,63,94,0.08)",   icon: "bg-rose-50 text-rose-500 dark:bg-rose-500/15",    label: "bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20",    labelText: "High priority" },
  medium:   { border: "border-amber-200 dark:border-amber-500/20",   glow: "rgba(245,158,11,0.08)",  icon: "bg-amber-50 text-amber-500 dark:bg-amber-500/15", label: "bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20", labelText: "Monitor" },
  positive: { border: "border-emerald-200 dark:border-emerald-500/20", glow: "rgba(16,185,129,0.08)", icon: "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/15", label: "bg-emerald-50 text-emerald-500 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20", labelText: "Positive" },
};

export default function InsightsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Insights"
        description="AI-style delivery intelligence without requiring paid AI integrations."
      />

      {/* header callout */}
      <div className="relative overflow-hidden rounded-[1.25rem] border border-[#484BF1]/20 bg-gradient-to-br from-[#484BF1]/[0.07] via-[#484BF1]/[0.04] to-transparent p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#484BF1]/10 blur-3xl" />
        <div className="relative flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#484BF1]/15">
            <Sparkles className="h-5 w-5 text-[#484BF1]" />
          </span>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              AI-powered delivery intelligence
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Signals derived from task status, milestone velocity, and team workload patterns — no external API required.
            </p>
          </div>
        </div>
      </div>

      {/* insight cards grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight) => {
          const s = severityStyles[insight.severity];
          return (
            <div
              key={insight.title}
              className={`relative overflow-hidden rounded-[1.25rem] border bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:bg-[#161B27] ${s.border}`}
              style={{ boxShadow: `0 2px 12px ${s.glow}` }}
            >
              {/* subtle tint */}
              <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: `radial-gradient(ellipse at top right, ${s.glow}, transparent 65%)` }} />

              <div className="relative">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${s.icon}`}>
                    {insight.icon}
                  </span>
                  <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.label}`}>
                    {s.labelText}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{insight.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{insight.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* fallback: still render InsightCard for any externally sourced ones */}
      <div className="hidden">
        {insights.map((i) => <InsightCard key={i.title} title={i.title} body={i.body} />)}
      </div>
    </div>
  );
}