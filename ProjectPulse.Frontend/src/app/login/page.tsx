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


const schema = z.object({ email: z.string().email(), password: z.string().min(8), role: z.enum(["admin","manager","developer","client"]).optional() }); type FormValues = z.infer<typeof schema>;

export default function LoginPage(){ 
    const { login }=useAuth(); 
    const [error,setError]=useState(""); 
    const [loading,setLoading]=useState(false); 
    const form=useForm<FormValues>({resolver:zodResolver(schema), defaultValues:{email:"admin@projectpulse.io",password:"Password123!",role:"admin"}}); 
    const onSubmit=async(v:FormValues)=>{ setLoading(true); setError(""); 
    const result=await login(v.email,v.password,v.role as Role | undefined); 
    setLoading(false); if(!result.success) setError(result.message ?? "Login failed"); 
};
return <main className="grid min-h-screen lg:grid-cols-2">
    <section className="relative hidden overflow-hidden bg-brand-background p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(72,75,241,.45),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(15,63,194,.30),transparent_30%)]" />
        <div className="relative z-10">
            <Logo />
        </div>
        <div className="relative z-10 max-w-xl">
            <h1 className="text-5xl font-semibold leading-tight">Manage projects with clarity, speed, and control.</h1>
            <p className="mt-5 text-lg text-slate-300">A polished multi-role project management experience built to feel like a real enterprise SaaS product.</p>
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-4">{["Role-based dashboards","Mock JWT auth","AI-style insights","Premium dark mode"].map(i=><div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">{i}</div>)}</div>
        </section>
        <section className="flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-3xl border bg-[rgb(var(--card))] p-8 shadow-soft">
                <div className="mb-8 space-y-3">
                    <div className="lg:hidden">
                        <Logo />
                    </div>
                    <h2 className="text-3xl font-semibold">Welcome back</h2>
                    <p className="text-sm text-slate-500">Sign in with a demo account to explore ProjectPulse.</p>
                </div>
                <div className="mb-6 grid gap-2">{demoAccounts.map(a=><button key={a.role} type="button" className="rounded-2xl border p-3 text-left text-sm hover:border-brand-primary" onClick={()=>form.reset({email:a.email,password:a.password,role:a.role})}>
                    <span className="font-medium capitalize">{a.role}</span>
                    <span className="block text-slate-500">{a.email}</span>
                    </button>)}
                </div>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <Input {...form.register("email")} />
                        <p className="mt-1 text-xs text-rose-500">{form.formState.errors.email?.message}</p>
                    </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Password</label>
                    <Input type="password" {...form.register("password")} />
                    <p className="mt-1 text-xs text-rose-500">{form.formState.errors.password?.message}</p>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Demo role</label>
                    <select className="h-11 w-full rounded-xl border bg-transparent px-3" {...form.register("role")}>
                        <option value="admin">Admin</option>
                        <option value="manager">Project Manager</option>
                        <option value="developer">Developer</option>
                        <option value="client">Client</option>
                    </select>
                </div>{error ? <p className="text-sm text-rose-500">{error}</p> : null}<Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in to ProjectPulse"}</Button>
            </form>
        </div>
    </section>
</main>; 
}
