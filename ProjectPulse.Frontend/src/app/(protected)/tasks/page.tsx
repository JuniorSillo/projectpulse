import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { TaskTable } from "@/components/tasks/task-table";
import { Search, SlidersHorizontal } from "lucide-react";

const filterFields = ["Status", "Priority", "Assignee", "Project"];

export default function TasksPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Tasks"
        description="Manage delivery work across projects, people, and deadlines."
        action={
          <Button
            className="h-9 rounded-xl px-4 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#484BF1,#0F3FC2)", boxShadow: "0 4px 16px rgba(72,75,241,.3)" }}
          >
            + Create Task
          </Button>
        }
      />

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-[1.25rem] border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-[#161B27]">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search tasks…"
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#484BF1]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#484BF1]/15 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filterFields.map((f) => (
            <select
              key={f}
              className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 focus:border-[#484BF1]/40 focus:outline-none focus:ring-2 focus:ring-[#484BF1]/15 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400"
            >
              <option value="">{f}</option>
            </select>
          ))}
          <button className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 transition hover:border-slate-300 hover:text-slate-800 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400 dark:hover:text-white">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden dark:border-white/[0.06] dark:bg-[#161B27]">
        <TaskTable />
      </div>
    </div>
  );
}