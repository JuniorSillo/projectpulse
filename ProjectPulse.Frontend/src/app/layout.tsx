import "./globals.css"; 
import { AppProviders } from "@/components/providers/app-providers";

export const metadata = { title:"ProjectPulse", description:"AI-powered client project management dashboard" };
export default function RootLayout({ children }: { children: React.ReactNode }) { 
    return <html lang="en" suppressHydrationWarning>
        <body className="bg-app">
            <AppProviders>{children}</AppProviders>
        </body>
    </html>; 
}
