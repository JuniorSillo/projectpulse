import Link from "next/link"; 
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage(){ 
    return <main className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-lg text-center">
            <h1 className="text-5xl font-semibold">403</h1>
            <p className="mt-4 text-lg">You do not have permission to access this area.</p>
            <div className="mt-6">
                <Link href="/login">
                    <Button>Return to login</Button>
                </Link>
            </div>
        </div>
    </main>; 
}
