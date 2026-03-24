import Link from "next/link"; 
import { Button } from "@/components/ui/button";

export default function NotFound(){ 
    return <main className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-lg text-center">
            <h1 className="text-5xl font-semibold">404</h1> 
            <p className="mt-4 text-lg">The page you requested could not be found.</p>
        <div className="mt-6">
            <Link href="/dashboard">
            <Button>Go to dashboard</Button>
            </Link>
        </div>
    </div>
</main>; 
}
