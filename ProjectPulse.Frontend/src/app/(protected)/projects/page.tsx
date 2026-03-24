import { PageHeader } from "@/components/shared/page-header"; 
import { Button } from "@/components/ui/button"; 
import { ProjectTable } from "@/components/projects/project-table"; 
import { Input } from "@/components/ui/input";


export default function ProjectsPage()
{ return <div className="space-y-6">
    <PageHeader title="Projects" description="Track project health, owners, risk, and delivery momentum." action={<Button>Create Project</Button>} />
    <div className="grid gap-3 rounded-2xl border p-4 md:grid-cols-5 dark:border-slate-800">
        <Input placeholder="Search projects..." />
        <Input placeholder="Status" />
        <Input placeholder="Manager" />
        <Input placeholder="Client" />
        <Input placeholder="Risk / date range" />
    </div>
    <ProjectTable />
</div>; 
}
