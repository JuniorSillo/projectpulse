import Link from "next/link"; 
import { ActivitySquare } from "lucide-react";


export function Logo() { return <Link href="/dashboard" className="flex items-center gap-2 font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary text-white"><ActivitySquare className="h-5 w-5" /></span><span className="text-lg">ProjectPulse</span></Link>; }
