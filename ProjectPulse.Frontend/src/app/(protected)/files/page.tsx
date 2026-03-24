import { files as library, projects, users } from "@/lib/mock-data";
import { FileUploadArea } from "@/components/files/file-upload-area";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Search, FileText } from "lucide-react";

const fileTypeColors: Record<string, string> = {
  PDF:   "bg-rose-50 text-rose-500 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20",
  DOCX:  "bg-blue-50 text-blue-500 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20",
  XLSX:  "bg-emerald-50 text-emerald-500 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20",
  PNG:   "bg-purple-50 text-purple-500 border-purple-100 dark:bg-purple-500/10 dark:border-purple-500/20",
  MP4:   "bg-amber-50 text-amber-500 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20",
};

export default function FilesPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Files"
        description="Access shared documents, mock uploads, and linked assets."
        action={
          <Button
            className="h-9 rounded-xl px-4 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#484BF1,#0F3FC2)", boxShadow: "0 4px 16px rgba(72,75,241,.3)" }}
          >
            Upload file
          </Button>
        }
      />

      <FileUploadArea />

      {/* search */}
      <div className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200/80 bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-[#161B27]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search files…"
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-[#484BF1]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#484BF1]/15 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] dark:border-white/[0.06] dark:bg-[#161B27]">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 dark:border-white/[0.05] dark:bg-white/[0.02]">
              {["Name", "Type", "Project", "Uploader", "Date"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {library.map((file, i) => {
              const project = projects.find((p) => p.id === file.projectId);
              const uploader = users.find((u) => u.id === file.uploaderId);
              const typeStyle = fileTypeColors[file.type] ?? "bg-slate-50 text-slate-500 border-slate-100 dark:bg-white/[0.04] dark:border-white/[0.08]";

              return (
                <tr
                  key={file.id}
                  className={`group border-b border-slate-100/80 transition-colors hover:bg-slate-50/80 dark:border-white/[0.04] dark:hover:bg-white/[0.03] ${i === library.length - 1 ? "border-b-0" : ""}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#484BF1]/10">
                        <FileText className="h-3.5 w-3.5 text-[#484BF1]" />
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${typeStyle}`}>
                      {file.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{project?.name ?? "—"}</td>
                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{uploader?.name ?? "—"}</td>
                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{file.uploadedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}