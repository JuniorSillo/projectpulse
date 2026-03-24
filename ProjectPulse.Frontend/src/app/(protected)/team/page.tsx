import { users } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type RoleColor = {
  bg: string;
  avatar: string;
};

const roleColors: Record<string, RoleColor> = {
  admin: {
    bg: "bg-[#484BF1]/10 border-[#484BF1]/20 text-[#484BF1]",
    avatar: "from-[#484BF1] to-[#0F3FC2]",
  },
  manager: {
    bg: "bg-blue-500/10 border-blue-500/20 text-blue-500",
    avatar: "from-blue-500 to-blue-700",
  },
  developer: {
    bg: "bg-violet-500/10 border-violet-500/20 text-violet-500",
    avatar: "from-violet-500 to-violet-700",
  },
  client: {
    bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
    avatar: "from-emerald-500 to-emerald-700",
  },
};

const statusDot: Record<string, string> = {
  Active: "bg-emerald-400",
  Inactive: "bg-slate-300",
  Pending: "bg-amber-400",
};

export default function TeamPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Team"
        description="View user roles, activity, allocations, and system access."
        action={
          <Button
            className="h-9 rounded-xl px-4 text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg,#484BF1,#0F3FC2)",
              boxShadow: "0 4px 16px rgba(72,75,241,.3)",
            }}
          >
            + Add user
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3 rounded-[1.25rem] border border-slate-200/80 bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-[#161B27]">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search team members…"
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-[#484BF1]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#484BF1]/15 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="flex gap-2">
          {["Filter by role", "Status"].map((f) => (
            <select
              key={f}
              className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 focus:border-[#484BF1]/40 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400"
            >
              <option value="">{f}</option>
            </select>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] dark:border-white/[0.06] dark:bg-[#161B27]">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 dark:border-white/[0.05] dark:bg-white/[0.02]">
              {["Member", "Email", "Role", "Status", "Projects", "Last active"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => {
              const colors = roleColors[u.role] ?? roleColors.client;
              const dot = statusDot[u.status] ?? "bg-slate-300";

              return (
                <tr
                  key={u.id}
                  className={`group border-b border-slate-100/80 transition-colors hover:bg-slate-50/80 dark:border-white/[0.04] dark:hover:bg-white/[0.03] ${
                    i === users.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[11px] font-bold text-white ${colors.avatar}`}
                      >
                        {u.name
                          .split(" ")
                          .map((x: string) => x[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {u.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{u.email}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold capitalize tracking-wide ${colors.bg}`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                      <span className="text-slate-600 dark:text-slate-300">{u.status}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                    {u.projectsAssigned}
                  </td>

                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                    {new Date(u.lastActive).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}