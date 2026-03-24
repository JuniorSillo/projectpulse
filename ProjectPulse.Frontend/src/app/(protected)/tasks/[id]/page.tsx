import Link from "next/link"; 
import { notFound } from "next/navigation"; 
import { comments, files, projects, tasks, users } from "@/lib/mock-data"; 
import { PageHeader } from "@/components/shared/page-header"; 
import { PriorityBadge, StatusBadge } from "@/components/shared/badges"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default async function TaskDetailsPage({ params }: { params: Promise<{ id:string }> }) { const { id } = await params; const task = tasks.find(t=>t.id===id); if(!task) notFound(); const project=projects.find(p=>p.id===task.projectId); const assignee=users.find(u=>u.id===task.assigneeId); const taskFiles=files.filter(f=>f.taskId===id); const taskComments=comments.filter(c=>c.entityId===id);

return <div className="space-y-6">
    <PageHeader title={task.title} description={task.description} />
    <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card>
            <CardHeader>
                <CardTitle>Task details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                    <StatusBadge value={task.status} />
                    <PriorityBadge value={task.priority} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="muted-ui p-4">
                        <p className="text-xs uppercase">Project</p>
                        <Link href={`/projects/${project?.id}`} className="mt-1 block text-lg font-semibold text-brand-primary">{project?.name}</Link>
                    </div>
                    <div className="muted-ui p-4">
                        <p className="text-xs uppercase">Assignee</p>
                        <p className="mt-1 text-lg font-semibold">{assignee?.name}</p>
                    </div>
                    <div className="muted-ui p-4">
                        <p className="text-xs uppercase">Due date</p>
                        <p className="mt-1 text-lg font-semibold">{task.dueDate}</p>
                    
                    </div>
                    <div className="muted-ui p-4">
                        <p className="text-xs uppercase">Activity status</p>
                        <p className="mt-1 text-lg font-semibold">{task.status}</p>
                    </div>
                    
                    </div>
                    </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Attachments</CardTitle>
                        
                        </CardHeader>
                        <CardContent className="space-y-3">{taskFiles.length ? taskFiles.map(file=><div key={file.id} className="rounded-2xl border p-4 dark:border-slate-800">{file.name}</div>) : 
                        <p className="text-sm text-slate-500">No attachments yet.</p>
                        }
                        </CardContent>
                        </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Comments & activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">{taskComments.length ? taskComments.map(comment=><div key={comment.id} className="rounded-2xl border p-4 dark:border-slate-800">{comment.message}</div>) : 
                            <p className="text-sm text-slate-500">No comments on this task yet.</p>
                }
            </CardContent>
        </Card>
                    
    </div>; 
}
