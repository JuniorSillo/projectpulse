"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, ListChecks, Milestone,
  Users, Files, BarChart3, Settings,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import Image from "next/image";


const items = [
  { href: "/dashboard",   label: "Dashboard",  icon: LayoutDashboard, roles: ["admin","manager","developer","client"] },
  { href: "/projects",    label: "Projects",   icon: FolderKanban,    roles: ["admin","manager","developer","client"] },
  { href: "/tasks",       label: "Tasks",      icon: ListChecks,      roles: ["admin","manager","developer"] },
  { href: "/milestones",  label: "Milestones", icon: Milestone,       roles: ["admin","manager","developer","client"] },
  { href: "/team",        label: "Team",       icon: Users,           roles: ["admin","manager"] },
  { href: "/files",       label: "Files",      icon: Files,           roles: ["admin","manager","developer","client"] },
  { href: "/insights",    label: "Insights",   icon: BarChart3,       roles: ["admin","manager"] },
  { href: "/settings",    label: "Settings",   icon: Settings,        roles: ["admin","manager","developer","client"] },
];

const SECTION_BREAK_BEFORE = ["/settings"];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const allowed = items.filter((i) => user && i.roles.includes(user.role));

  return (
    <aside className="
      flex w-full flex-col
      rounded-[1.75rem] border border-slate-200/70 bg-white
      p-5 shadow-[0_2px_24px_rgba(0,0,0,0.06)]
      lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-[17rem]
      dark:border-white/[0.06] dark:bg-[#161B27]
      dark:shadow-[0_2px_40px_rgba(0,0,0,0.35)]
    ">
      {/* Logo */}
     <div className="mb-8 px-1 cursor-pointer">
     <Link href="/dashboard" className="inline-flex items-center">
     <Image
          alt="ProjectPulse Logo"
          src="/logo1.png"
          width={190}
          height={60}
          priority
          className="h-auto w-auto object-contain"
     />
     </Link>
     </div>

      {/* Nav label */}
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
        Navigation
      </p>

      {/* Nav items */}
      <nav className="flex-1 space-y-0.5">
        {allowed.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const isBreak = SECTION_BREAK_BEFORE.includes(item.href);

          return (
            <div key={item.href}>
              {isBreak && (
                <div className="my-3 border-t border-slate-100 dark:border-white/[0.05]" />
              )}
              <Link
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  active
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                {/* active background */}
                {active && (
                  <span
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, #484BF1 0%, #0F3FC2 100%)",
                      boxShadow: "0 4px 16px rgba(72,75,241,0.30)",
                    }}
                  />
                )}
                {/* hover background */}
                {!active && (
                  <span className="absolute inset-0 rounded-xl bg-slate-100 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:bg-white/[0.05]" />
                )}

                {/* icon */}
                <span className="relative z-10 flex h-5 w-5 items-center justify-center">
                  <Icon className="h-4 w-4 shrink-0" />
                </span>

                {/* label */}
                <span className="relative z-10 flex-1">{item.label}</span>

                {/* active dot indicator on right */}
                {active && (
                  <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-white/60" />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom user hint */}
      {user && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #484BF1, #0F3FC2)" }}
          >
            {user.name?.split(" ").map((x: string) => x[0]).join("").slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">{user.name}</p>
            <p className="text-[10px] capitalize text-slate-400">{user.role}</p>
          </div>
        </div>
      )}
    </aside>
  );
}