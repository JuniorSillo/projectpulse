import Link from "next/link";
import { notFound } from "next/navigation";
import { comments, files, projects, tasks, users } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { PriorityBadge, StatusBadge } from "@/components/shared/badges";
import { PanelCard } from "@/components/shared/dashboard-primitives";
import { FolderKanban, User, Calendar, Activity, Paperclip, MessageSquare } from "lucide-react";

export default async function TaskDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = tasks.find((t) => t.id === id);
  if (!task) notFound();

  const project = projects.find((p) => p.id === task.projectId);
  const assignee = users.find((u) => u.id === task.assigneeId);
  const taskFiles = files.filter((f) => f.taskId === id);
  const taskComments = comments.filter((c) => c.entityId === id);

  const metaItems = [
    { icon: <FolderKanban className="h-4 w-4" />, label: "Project", content: project ? (
      <Link href={`/projects/${project.id}`} className="text-lg font-semibold text-[#484BF1] hover:underline">
        {project.name}
      </Link>
    ) : <span className="text-lg font-semibold text-slate-400">—</span> },
    { icon: <User className="h-4 w-4" />, label: "Assignee", content: (
      <p className="text-lg font-semibold text-slate-900 dark:text-white">{assignee?.name ?? "Unassigned"}</p>
    )},
    { icon: <Calendar className="h-4 w-4" />, label: "Due date", content: (
      <p className="text-lg font-semibold text-slate-900 dark:text-white">{task.dueDate}</p>
    )},
    { icon: <Activity className="h-4 w-4" />, label: "Activity status", content: (
      <p className="text-lg font-semibold text-slate-900 dark:text-white">{task.status}</p>
    )},
  ];

  return (
    <div className="space-y-7">
      <PageHeader title={task.title} description={task.description} />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.5fr]">
        {/* Task details */}
        <PanelCard title="Task details">
          {/* badge row */}
          <div className="mb-5 flex flex-wrap gap-2">
            <StatusBadge value={task.status} />
            <PriorityBadge value={task.priority} />
          </div>

          {/* meta grid */}
          <div className="grid gap-3 md:grid-cols-2">
            {metaItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-white/[0.05] dark:bg-white/[0.03]"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[#484BF1]">{item.icon}</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
                </div>
                {item.content}
              </div>
            ))}
          </div>
        </PanelCard>

        {/* Attachments */}
        <PanelCard title="Attachments" action={<Paperclip className="h-4 w-4 text-slate-400" />}>
          {taskFiles.length ? (
            <div className="space-y-2">
              {taskFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 dark:border-white/[0.05] dark:bg-white/[0.02]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#484BF1]/10">
                    <Paperclip className="h-3.5 w-3.5 text-[#484BF1]" />
                  </div>
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{file.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-white/[0.07]">
              <p className="text-sm text-slate-400">No attachments yet</p>
            </div>
          )}
        </PanelCard>
      </div>

      {/* Comments */}
      <PanelCard title="Comments & activity" action={<MessageSquare className="h-4 w-4 text-slate-400" />}>
        {taskComments.length ? (
          <div className="space-y-3">
            {taskComments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-white/[0.05] dark:bg-white/[0.02]"
              >
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{comment.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-white/[0.07]">
            <p className="text-sm text-slate-400">No comments on this task yet</p>
          </div>
        )}
      </PanelCard>
    </div>
  );
}