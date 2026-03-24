import { PageHeader } from "@/components/shared/page-header"; 
import { Button } from "@/components/ui/button"; 
import { TaskTable } from "@/components/tasks/task-table"; 
import { Input } from "@/components/ui/input";


export default function TasksPage(){ 
    return <div className="space-y-6">
        <PageHeader title="Tasks" description="Manage delivery work across projects, people, and deadlines." action={<Button>Create Task</Button>} />
        <div className="grid gap-3 rounded-2xl border p-4 md:grid-cols-5 dark:border-slate-800">
            <Input placeholder="Search tasks..." />
            <Input placeholder="Status" />
            <Input placeholder="Priority" />
            <Input placeholder="Assignee" />
            <Input placeholder="Project" />
        </div>
     <TaskTable />
    </div>; 
}

