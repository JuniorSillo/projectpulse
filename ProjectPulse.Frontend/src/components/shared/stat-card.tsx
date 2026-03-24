import { Card, CardContent } from "@/components/ui/card";
export function StatCard({ label, value, helper }: { label:string; value:string; helper:string }) { return <Card><CardContent className="space-y-2"><p className="text-sm text-slate-500">{label}</p><p className="text-3xl font-semibold">{value}</p><p className="text-xs text-slate-500">{helper}</p></CardContent></Card>; }
