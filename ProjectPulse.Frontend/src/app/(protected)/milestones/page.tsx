import { milestones, projects } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/badges";
import { ProgressBar } from "@/components/shared/dashboard-primitives";
import { Flag } from "lucide-react";

export default function MilestonesPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Milestones"
        description="Monitor major delivery checkpoints across the portfolio."
        action={
          <Button
            className="h-9 rounded-xl px-4 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#484BF1,#0F3FC2)", boxShadow: "0 4px 16px rgba(72,75,241,.3)" }}
          >
            + Create Milestone
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {milestones.map((m) => {
          const project = projects.find((x) => x.id === m.projectId);
          const isAtRisk = m.progress < 40;

          return (
            <div
              key={m.id}
              className="group relative overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:border-white/[0.06] dark:bg-[#161B27]"
            >
              {/* subtle corner glow based on risk */}
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl opacity-20"
                style={{ background: isAtRisk ? "#f43f5e" : "#484BF1" }}
              />

              {/* header */}
              <div className="relative mb-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: isAtRisk ? "rgba(244,63,94,.12)" : "rgba(72,75,241,.12)" }}
                  >
                    <Flag
                      className="h-3.5 w-3.5"
                      style={{ color: isAtRisk ? "#f43f5e" : "#484BF1" }}
                    />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold leading-tight text-slate-800 dark:text-slate-100">{m.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-400">{project?.name}</p>
                  </div>
                </div>
                <StatusBadge value={m.status} />
              </div>

              {/* progress */}
              <div className="relative space-y-2">
                <ProgressBar value={m.progress} accent={isAtRisk ? "#f43f5e" : "#484BF1"} />
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: isAtRisk ? "#f43f5e" : "#484BF1" }}
                  >
                    {m.progress}% complete
                  </span>
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.04]">
                    {m.dueDate}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}