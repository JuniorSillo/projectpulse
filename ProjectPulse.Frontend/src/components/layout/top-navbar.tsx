import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";

export function TopNavbar() {
  return (
    <header className="
      sticky top-0 z-20 mb-6
      flex items-center justify-between gap-4
      rounded-[1.25rem] border border-slate-200/70
      bg-white/90 px-5 py-3
      backdrop-blur-md
      dark:border-white/[0.06] dark:bg-[#161B27]/90
    ">
      {/* Search */}
      <div className="relative hidden md:block">
        {/* search icon */}
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

        <input
          className="
            h-9 w-72 rounded-xl border border-slate-200 bg-slate-50
            pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400
            focus:border-[#484BF1]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#484BF1]/20
            transition-all duration-200
            dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200
            dark:placeholder:text-slate-500
            dark:focus:border-[#484BF1]/50 dark:focus:bg-white/[0.07]
          "
          placeholder="Search projects, tasks, files…"
        />
      </div>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notification bell */}
        <button
          className="
            group relative flex h-9 w-9 items-center justify-center
            rounded-xl border border-slate-200 bg-white
            text-slate-500 transition-all duration-200
            hover:border-slate-300 hover:text-slate-900
            dark:border-white/[0.08] dark:bg-white/[0.04]
            dark:text-slate-400 dark:hover:border-white/[0.16] dark:hover:text-white
          "
          aria-label="Notifications"
        >
          <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[#484BF1]/10" />
          <Bell className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          {/* unread dot */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#484BF1] ring-2 ring-white dark:ring-[#161B27]" />
        </button>

        <ThemeToggle />

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-white/[0.08]" />

        <UserMenu />
      </div>
    </header>
  );
}