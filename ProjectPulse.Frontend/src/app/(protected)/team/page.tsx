import { users } from "@/lib/mock-data"; 
import { PageHeader } from "@/components/shared/page-header"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";


export default function TeamPage(){ 
    return <div className="space-y-6">
        <PageHeader title="Team" description="View user roles, activity, allocations, and system access." action={<Button>Add user</Button>} />
        <div className="grid gap-3 rounded-2xl border p-4 md:grid-cols-3 dark:border-slate-800">
            <Input placeholder="Search team members..." />
            <Input placeholder="Filter by role" />
            <Input placeholder="Status" />
        </div>
    <div className="overflow-x-auto rounded-2xl border dark:border-slate-800">
        <table className="min-w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
                <tr className="text-left">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Projects</th>
                    <th className="p-4">Last active</th>
                </tr>
            </thead>
            <tbody>{users.map(u=>
                <tr key={u.id} className="border-t dark:border-slate-800">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 capitalize">{u.role}</td>
                <td className="p-4">{u.status}</td>
                <td className="p-4">{u.projectsAssigned}</td>
                <td className="p-4">{new Date(u.lastActive).toLocaleString()}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
</div>; 
}
