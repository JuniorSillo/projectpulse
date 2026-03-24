"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthUser, Role } from "@/types";
import { demoAccounts } from "@/lib/mock-data";
type AuthContextValue = { user: AuthUser | null; loading: boolean; login:(email:string,password:string,roleHint?:Role)=>Promise<{success:boolean;message?:string}>; logout:()=>void; };
const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);
const dash = (role: Role) => `/dashboard/${role}`;
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null); const [loading, setLoading] = React.useState(true); const router = useRouter(); const pathname = usePathname();
  React.useEffect(()=>{ const raw = localStorage.getItem("projectpulse_user"); if(raw) setUser(JSON.parse(raw)); setLoading(false); }, []);
  React.useEffect(()=>{ if(loading) return; const isPublic = ["/login","/unauthorized"].includes(pathname); if(!user && !isPublic) router.push("/login"); }, [loading,user,pathname,router]);
  const login = async (email:string,password:string,roleHint?:Role) => { await new Promise(r=>setTimeout(r,600)); const match = demoAccounts.find(a => a.email===email && a.password===password && (!roleHint || a.role===roleHint)); if(!match) return {success:false,message:"Invalid credentials. Use a demo account."}; const signedIn: AuthUser = { id:`auth-${match.role}`, name:`${match.role[0].toUpperCase()}${match.role.slice(1)} User`, email:match.email, role:match.role, token:`mock-jwt-${match.role}` }; localStorage.setItem("projectpulse_user", JSON.stringify(signedIn)); localStorage.setItem("projectpulse_token", signedIn.token); setUser(signedIn); router.push(dash(signedIn.role)); return {success:true}; };
  const logout = () => { localStorage.removeItem("projectpulse_user"); localStorage.removeItem("projectpulse_token"); setUser(null); router.push("/login"); };
  return <AuthContext.Provider value={{user,loading,login,logout}}>{children}</AuthContext.Provider>;
}
export function useAuth(){ const value = React.useContext(AuthContext); if(!value) throw new Error("useAuth must be used within AuthProvider"); return value; }
