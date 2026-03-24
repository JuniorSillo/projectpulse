import { AppSidebar } from "@/components/layout/app-sidebar"; 
import { TopNavbar } from "@/components/layout/top-navbar";


export default function ProtectedLayout({ children }: { children: React.ReactNode }) { 
    return <div className="min-h-screen p-4 lg:p-6">
        <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">
            <AppSidebar />
            <main className="min-w-0">
                <TopNavbar />{children}
            </main>
        </div>
    </div>; 
}
