"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const roleColors: Record<string, string> = {
  admin:     "#484BF1",
  manager:   "#0F3FC2",
  developer: "#6366f1",
  client:    "#3b82f6",
};

export function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user?.name?.split(" ").map((x: string) => x[0]).join("").slice(0, 2) ?? "??";
  const accentColor = roleColors[user?.role ?? "admin"] ?? "#484BF1";

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white
          px-2.5 py-1.5 transition-all duration-150
          hover:border-slate-300
          dark:border-white/[0.08] dark:bg-white/[0.04]
          dark:hover:border-white/[0.16]
        "
      >
        {/* Avatar */}
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` }}
        >
          {initials}
        </div>

        {/* Name + role */}
        <div className="hidden text-left sm:block">
          <p className="text-xs font-semibold leading-tight text-slate-800 dark:text-slate-100">{user?.name}</p>
          <p className="text-[10px] capitalize leading-tight text-slate-400">{user?.role}</p>
        </div>

        <ChevronDown
          className={`hidden h-3.5 w-3.5 text-slate-400 transition-transform duration-200 sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 top-full z-50 mt-2
            min-w-[200px] overflow-hidden
            rounded-2xl border border-slate-200 bg-white
            shadow-[0_8px_32px_rgba(0,0,0,0.12)]
            dark:border-white/[0.08] dark:bg-[#1C2133]
            dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          "
        >
          {/* User info header */}
          <div className="border-b border-slate-100 px-4 py-3 dark:border-white/[0.06]">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user?.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">{user?.email ?? `${user?.role}@projectpulse.io`}</p>
            {/* Role badge */}
            <span
              className="mt-2 inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize text-white"
              style={{ background: accentColor }}
            >
              {user?.role}
            </span>
          </div>

          {/* Menu items */}
          <div className="p-1.5">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-2.5 rounded-xl px-3 py-2.5
                text-sm text-slate-600 transition-colors
                hover:bg-slate-50 hover:text-slate-900
                dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white
              "
            >
              <Settings className="h-4 w-4 text-slate-400" />
              Settings
            </Link>

            <button
              onClick={() => { setOpen(false); logout(); }}
              className="
                flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5
                text-sm text-rose-500 transition-colors
                hover:bg-rose-50 dark:hover:bg-rose-500/10
              "
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}