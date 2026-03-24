import Link from "next/link"; import { notFound } from "next/navigation";
import { comments, files, milestones, projects, tasks, users } from "@/lib/mock-data"; 
import { PageHeader } from "@/components/shared/page-header"; 
import { Progress } from "@/components/ui/progress"; 
import { RiskBadge, StatusBadge } from "@/components/shared/badges"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id:string }> }) {
     const { id } = await params; const project = projects.find(p=>p.id===id); 
     if(!project) notFound(); const projectTasks=tasks.filter(t=>t.projectId===id); 
     const projectMilestones=milestones.filter(m=>m.projectId===id); 
     const team=users.filter(u=>project.teamIds.includes(u.id)); 
     const projectFiles=files.filter(f=>f.projectId===id); 
     const projectComments=comments.filter(c=>c.entityId===id);

return <div className="space-y-6">
<PageHeader title={project.name} description={project.description} />
<Card>
    <CardContent className="grid gap-4 md:grid-cols-4">
        <div>
            <p className="text-sm text-slate-500">Status</p>
        <div className="mt-2">
            <StatusBadge value={project.status} />
        </div>
        </div>

        <div>
            <p className="text-sm text-slate-500">Risk</p>
        <div className="mt-2">
            <RiskBadge value={project.risk} />
        </div>
        </div>
        
        <div>
            <p className="text-sm text-slate-500">Due date</p>
            <p className="mt-2 font-medium">{project.dueDate}</p>
        </div>
        
        <div>
            <p className="text-sm text-slate-500">Progress</p>
            <div className="mt-2 space-y-2"><Progress value={project.progress} />
            <p className="text-sm">{project.progress}%</p>
            </div>
        </div>
        </CardContent>
        </Card>
        <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
        <div className="grid gap-4 md:grid-cols-3">
            <div className="muted-ui p-4">
                <p className="text-xs uppercase">Tasks</p>
                <p className="mt-1 text-2xl font-semibold">{projectTasks.length}</p>
            </div>
        <div className="muted-ui p-4">
            <p className="text-xs uppercase">Milestones</p>
            <p className="mt-1 text-2xl font-semibold">{projectMilestones.length}</p>
        </div>
        
        <div className="muted-ui p-4">
            <p className="text-xs uppercase">Files</p>
            <p className="mt-1 text-2xl font-semibold">{projectFiles.length}</p>
        </div>
    </div>
    </CardContent>
</Card>
    <Card>
        <CardHeader>
            <CardTitle>Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">{team.map(member=><div key={member.id} className="flex items-center justify-between rounded-2xl border p-3 dark:border-slate-800">
            <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-slate-500 capitalize">{member.role}</p>
            </div>
            <span className="text-xs text-slate-500">{member.avatar}</span>
    </div>
    )}</CardContent>
    </Card>
</div>
<div className="grid gap-6 xl:grid-cols-2">
    <Card>
        <CardHeader>
            <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">{projectTasks.map(task=><Link key={task.id} href={`/tasks/${task.id}`} className="block rounded-2xl border p-4 dark:border-slate-800">
        <div className="flex items-center justify-between">
            <p className="font-medium">{task.title}</p>
            <StatusBadge value={task.status} />
        </div>
        <p className="mt-2 text-sm text-slate-500">{task.description}</p>
        </Link>)}
    </CardContent>
</Card>
<Card>
    <CardHeader>
        <CardTitle>Milestones</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">{projectMilestones.map(item=><div key={item.id} className="rounded-2xl border p-4 dark:border-slate-800">
        <div className="flex items-center justify-between">
            <p className="font-medium">{item.title}</p>
            <StatusBadge value={item.status} />
        </div>
        <div className="mt-3">
            <Progress value={item.progress} />
        </div>
    </div>)}
    </CardContent>
</Card>
</div>
<div className="grid gap-6 xl:grid-cols-2">
    <Card>
        <CardHeader>
            <CardTitle>Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">{projectFiles.map(file=><div key={file.id} className="rounded-2xl border p-4 dark:border-slate-800">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-slate-500">{file.type} • {file.uploadedAt}</p>
</div>)}
</CardContent>
</Card>
<Card>
    <CardHeader>
        <CardTitle>Comments & Insights</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">{projectComments.map(comment=><div key={comment.id} className="rounded-2xl muted-ui p-4">
        <p className="text-sm">{comment.message}</p>
        </div>)}
    <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-4">
    <p className="text-sm font-semibold text-brand-primary">AI-powered summary</p>
    <p className="mt-2 text-sm">Project {project.name.split(" ")[0]} is {project.risk.toLowerCase()} risk. Main signal: {projectTasks.filter(t=>t.status==="Blocked").length} blocked tasks and {100 - project.progress}% remaining progress.</p>
    </div>
</CardContent>
</Card>
</div>
</div>; 
}
