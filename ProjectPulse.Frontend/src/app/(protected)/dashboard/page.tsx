import Link from "next/link";

const roles = [
  {
    href: "/dashboard/admin",
    label: "Admin",
    description: "Portfolio oversight & risk signals",
    icon: "⬡",
    accent: "#484BF1",
  },
  {
    href: "/dashboard/manager",
    label: "Manager",
    description: "Milestones, timelines & team health",
    icon: "◈",
    accent: "#0F3FC2",
  },
  {
    href: "/dashboard/developer",
    label: "Developer",
    description: "Tasks, priorities & blockers",
    icon: "⟨⟩",
    accent: "#6366f1",
  },
  {
    href: "/dashboard/client",
    label: "Client",
    description: "Delivery progress & milestones",
    icon: "◎",
    accent: "#3b82f6",
  },
];

export default function DashboardIndexPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:border-white/[0.08] dark:bg-white/[0.04]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#484BF1]" />
          Demo environment
        </p>
        <h1
          className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Choose a role dashboard
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          After login you are redirected automatically. Use these cards during development.
        </p>
      </div>

      {/* Role cards */}
      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        {roles.map((role) => (
          <Link
            key={role.href}
            href={role.href}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:border-white/[0.07] dark:bg-[#161B27] dark:hover:border-white/[0.14]"
          >
            {/* accent glow on hover */}
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `radial-gradient(circle at 0% 0%, ${role.accent}12, transparent 65%)` }}
            />

            <div className="relative z-10 flex items-start gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg font-light text-white"
                style={{ background: `linear-gradient(135deg, ${role.accent}, ${role.accent}bb)` }}
              >
                {role.icon}
              </span>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{role.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {role.description}
                </p>
              </div>
            </div>

            {/* arrow hint */}
            <span className="absolute bottom-4 right-4 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 dark:text-slate-600">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}