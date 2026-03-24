"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { demoAccounts } from "@/lib/mock-data";
import { Role } from "@/types";
import Image from "next/image";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "manager", "developer", "client"]).optional(),
});
type FormValues = z.infer<typeof schema>;

const roleIcons: Record<string, string> = {
  admin: "⬡",
  manager: "◈",
  developer: "⟨⟩",
  client: "◎",
};

const roleColors: Record<string, string> = {
  admin: "#484BF1",
  manager: "#0F3FC2",
  developer: "#6366f1",
  client: "#3b82f6",
};

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState("admin");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@projectpulse.io",
      password: "Password123!",
      role: "admin",
    },
  });

  const onSubmit = async (v: FormValues) => {
    setLoading(true);
    setError("");
    const result = await login(v.email, v.password, v.role as Role | undefined);
    setLoading(false);
    if (!result.success) setError(result.message ?? "Login failed");
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr] font-sans">
      {/* ── LEFT PANEL ── */}
      <section className="relative hidden overflow-hidden bg-[#080C1E] lg:flex lg:flex-col lg:justify-between p-14">
        {/* layered background */}
        <div className="pointer-events-none absolute inset-0">
          {/* deep mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_-10%_-10%,rgba(72,75,241,0.55),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_110%_110%,rgba(15,63,194,0.45),transparent_50%)]" />
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* large blurred orb */}
          <div className="absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full bg-[#484BF1]/10 blur-[100px]" />
          <div className="absolute -right-20 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#0F3FC2]/15 blur-[80px]" />
          {/* decorative corner accent */}
          <svg className="absolute right-0 top-0 opacity-20" width="260" height="260" viewBox="0 0 260 260" fill="none">
            <circle cx="260" cy="0" r="200" stroke="url(#cg)" strokeWidth="0.5" />
            <circle cx="260" cy="0" r="140" stroke="url(#cg)" strokeWidth="0.5" />
            <circle cx="260" cy="0" r="80" stroke="url(#cg)" strokeWidth="0.5" />
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="260" y2="260" gradientUnits="userSpaceOnUse">
                <stop stopColor="#484BF1" />
                <stop offset="1" stopColor="#0F3FC2" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Logo */}
     <div className="mb-8 px-1 cursor-pointer">
     
     <Image
          alt="ProjectPulse Logo"
          src="/logo1.png"
          width={190}
          height={60}
          priority
          className="h-auto w-auto object-contain"
     />
 
     </div>

        {/* headline */}
        <div className="relative z-10 max-w-lg">
          {/* eyebrow label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#484BF1] shadow-[0_0_6px_2px_rgba(72,75,241,.8)]" />
            <span className="text-xs font-medium tracking-widest text-slate-300 uppercase">Enterprise SaaS</span>
          </div>
          <h1
            className="text-[3.25rem] font-semibold leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Manage projects
            <br />
            <span className="bg-gradient-to-r from-[#7B7EFF] via-[#484BF1] to-[#0F3FC2] bg-clip-text text-transparent">
              with precision.
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            A multi-role project management platform built to feel like a real enterprise product — AI insights, real-time data, and role-based control.
          </p>
        </div>

        {/* feature cards */}
        <div className="relative z-10 grid grid-cols-2 gap-3">
          {[
            { label: "Role-based dashboards", icon: "◈" },
            { label: "Mock JWT auth", icon: "⬡" },
            { label: "AI-style insights", icon: "◎" },
            { label: "Premium dark mode", icon: "⟐" },
          ].map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.06]"
            >
              <span className="text-[#484BF1] text-lg">{item.icon}</span>
              <span className="text-sm text-slate-300">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── RIGHT PANEL ── */}
      <section className="flex items-center justify-center bg-[#F7F8FC] p-6 dark:bg-[#0D1117]">
        <div className="w-full max-w-[420px]">
          {/* mobile logo */}
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          {/* card */}
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-[0_8px_48px_rgba(0,0,0,0.08)] dark:border-white/[0.06] dark:bg-[#161B27] dark:shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
            {/* header */}
            <div className="mb-8">
              <h2
                className="text-[1.75rem] font-semibold tracking-tight text-slate-900 dark:text-white"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Welcome back
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose a demo role to explore ProjectPulse
              </p>
            </div>

            {/* role selector */}
            <div className="mb-6">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Quick access</p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((a) => (
                  <button
                    key={a.role}
                    type="button"
                    onClick={() => {
                      setActiveRole(a.role);
                      form.reset({ email: a.email, password: a.password, role: a.role as FormValues["role"] });
                    }}
                    className="group relative overflow-hidden rounded-xl border p-3 text-left text-sm transition-all duration-200"
                    style={{
                      borderColor: activeRole === a.role ? roleColors[a.role] : "rgba(0,0,0,0.08)",
                      background:
                        activeRole === a.role
                          ? `linear-gradient(135deg, ${roleColors[a.role]}12, ${roleColors[a.role]}06)`
                          : "transparent",
                    }}
                  >
                    {activeRole === a.role && (
                      <span
                        className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full text-white text-[9px]"
                        style={{ background: roleColors[a.role] }}
                      >
                        ✓
                      </span>
                    )}
                    <span
                      className="mb-0.5 block text-base"
                      style={{ color: activeRole === a.role ? roleColors[a.role] : "#94a3b8" }}
                    >
                      {roleIcons[a.role]}
                    </span>
                    <span className="block font-semibold capitalize text-slate-800 dark:text-slate-100">{a.role}</span>
                    <span className="block truncate text-[11px] text-slate-400">{a.email}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* divider */}
            <div className="relative mb-6 flex items-center">
              <div className="flex-1 border-t border-slate-100 dark:border-white/[0.06]" />
              <span className="mx-3 text-xs text-slate-400">or enter manually</span>
              <div className="flex-1 border-t border-slate-100 dark:border-white/[0.06]" />
            </div>

            {/* form */}
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <Input
                  {...form.register("email")}
                  className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm focus-visible:ring-[#484BF1] dark:border-white/[0.08] dark:bg-white/[0.04]"
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-[11px] text-rose-500">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <Input
                  type="password"
                  {...form.register("password")}
                  className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm focus-visible:ring-[#484BF1] dark:border-white/[0.08] dark:bg-white/[0.04]"
                />
                {form.formState.errors.password && (
                  <p className="mt-1 text-[11px] text-rose-500">{form.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Demo role
                </label>
                <select
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#484BF1] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200"
                  {...form.register("role")}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Project Manager</option>
                  <option value="developer">Developer</option>
                  <option value="client">Client</option>
                </select>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 dark:border-rose-500/20 dark:bg-rose-500/10">
                  <span className="text-rose-500">⚠</span>
                  <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="relative mt-1 h-12 w-full overflow-hidden rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #484BF1 0%, #0F3FC2 100%)",
                  boxShadow: "0 4px 24px rgba(72,75,241,0.35)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in…
                  </span>
                ) : (
                  "Sign in to ProjectPulse →"
                )}
              </button>
            </form>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Demo environment — no real data is stored or transmitted.
          </p>
        </div>
      </section>
    </main>
  );
}