import { Priority, RiskLevel } from "@/types";
export function StatusBadge({ value }: { value:string }) { return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium dark:bg-slate-800">{value}</span>; }
export function PriorityBadge({ value }: { value:Priority }) { return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium dark:bg-slate-800">{value}</span>; }
export function RiskBadge({ value }: { value:RiskLevel }) { return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium dark:bg-slate-800">{value} risk</span>; }
