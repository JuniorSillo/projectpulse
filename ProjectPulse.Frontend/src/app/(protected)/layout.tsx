import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-[#0D1117] lg:p-6">
      <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <AppSidebar />
        <main className="min-w-0">
          <TopNavbar />
          {children}
        </main>
      </div>
    </div>
  );
}