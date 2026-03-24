'use client';

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "next-themes";
import { User, Lock, Monitor, LogOut, Check, Sun, Moon, Laptop } from "lucide-react";

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.05)] dark:border-white/[0.06] dark:bg-[#161B27]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4 dark:border-white/[0.05]">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#484BF1]/10 text-[#484BF1]">
          {icon}
        </span>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</label>
      {children}
    </div>
  );
}

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#484BF1]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#484BF1]/15 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:placeholder:text-slate-500"
    />
  );
}

function SaveButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [saved, setSaved] = useState(false);
  const handle = () => {
    setSaved(true);
    onClick?.();
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <button
      onClick={handle}
      className="flex h-9 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
      style={{ background: "linear-gradient(135deg,#484BF1,#0F3FC2)", boxShadow: "0 4px 14px rgba(72,75,241,.28)" }}
    >
      {saved ? <><Check className="h-3.5 w-3.5" /> Saved!</> : children}
    </button>
  );
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
    { value: "dark",  label: "Dark",  icon: <Moon className="h-4 w-4" /> },
    { value: "system",label: "System",icon: <Laptop className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Settings & Profile"
        description="Manage profile details, password, theme preference, and session controls."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        {/* ── Profile ── */}
        <SectionCard title="Profile" icon={<User className="h-4 w-4" />}>
          <div className="space-y-4">
            {/* avatar */}
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white"
                style={{ background: "linear-gradient(135deg,#484BF1,#0F3FC2)" }}
              >
                {user?.name?.split(" ").map((x: string) => x[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{user?.name}</p>
                <span className="inline-flex items-center rounded-lg bg-[#484BF1]/10 px-2 py-0.5 text-[10px] font-bold capitalize tracking-wide text-[#484BF1]">
                  {user?.role}
                </span>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-white/[0.05]" />

            <FieldGroup label="Full name">
              <StyledInput defaultValue={user?.name ?? ""} />
            </FieldGroup>
            <FieldGroup label="Email address">
              <StyledInput type="email" defaultValue={user?.email ?? `${user?.role}@projectpulse.io`} />
            </FieldGroup>

            <SaveButton>Save profile</SaveButton>
          </div>
        </SectionCard>

        {/* ── Password ── */}
        <SectionCard title="Password" icon={<Lock className="h-4 w-4" />}>
          <div className="space-y-4">
            <FieldGroup label="Current password">
              <StyledInput type="password" placeholder="••••••••" />
            </FieldGroup>
            <FieldGroup label="New password">
              <StyledInput type="password" placeholder="Min 8 characters" />
            </FieldGroup>
            <FieldGroup label="Confirm new password">
              <StyledInput type="password" placeholder="Repeat new password" />
            </FieldGroup>

            {/* password strength hint */}
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-1 flex-1 rounded-full bg-slate-100 dark:bg-white/[0.06]" />
              ))}
            </div>
            <p className="text-xs text-slate-400">Use 8+ characters with a mix of letters, numbers and symbols.</p>

            <SaveButton>Update password</SaveButton>
          </div>
        </SectionCard>
      </div>

      {/* ── Session & Preferences ── */}
      <SectionCard title="Session & preferences" icon={<Monitor className="h-4 w-4" />}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* theme picker */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Theme</p>
            <div className="flex gap-2">
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-semibold transition-all duration-150 ${
                    theme === opt.value
                      ? "border-[#484BF1]/40 bg-[#484BF1]/08 text-[#484BF1] dark:bg-[#484BF1]/15"
                      : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-white/[0.16] dark:hover:text-white"
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                  {theme === opt.value && <span className="h-1 w-1 rounded-full bg-[#484BF1]" />}
                </button>
              ))}
            </div>
          </div>

          {/* session info */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Session</p>
            <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Auth method</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">Mock JWT</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Storage</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">In-memory (demo)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Backend</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">Ready to integrate</span>
              </div>
            </div>
          </div>
        </div>

        {/* sign out */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/[0.05]">
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Sign out</p>
            <p className="text-xs text-slate-400">End your current demo session</p>
          </div>
          <button
            onClick={logout}
            className="flex h-9 items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-500 transition-all hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:hover:bg-rose-500/15"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </SectionCard>
    </div>
  );
}