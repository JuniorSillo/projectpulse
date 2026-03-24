import { AuthUser, Comment, FileItem, Milestone, Project, Task, User } from "@/types";
export const users: User[] = [
  { id:"u1", name:"Ava Johnson", email:"ava@projectpulse.io", role:"admin", status:"Active", avatar:"AJ", projectsAssigned:5, lastActive:"2026-03-23T08:30:00Z" },
  { id:"u2", name:"Mason Lee", email:"mason@projectpulse.io", role:"manager", status:"Active", avatar:"ML", projectsAssigned:4, lastActive:"2026-03-23T07:00:00Z" },
  { id:"u3", name:"Lebo Mokoena", email:"lebo@projectpulse.io", role:"developer", status:"Active", avatar:"LM", projectsAssigned:6, lastActive:"2026-03-22T17:11:00Z" },
  { id:"u4", name:"Nina Patel", email:"nina@clientco.com", role:"client", status:"Active", avatar:"NP", projectsAssigned:2, lastActive:"2026-03-21T13:10:00Z" },
  { id:"u5", name:"Daniel Smith", email:"daniel@projectpulse.io", role:"developer", status:"Active", avatar:"DS", projectsAssigned:3, lastActive:"2026-03-23T05:50:00Z" }
];
export const demoAccounts: { role: AuthUser["role"]; email: string; password: string }[] = [
  { role:"admin", email:"admin@projectpulse.io", password:"Password123!" },
  { role:"manager", email:"manager@projectpulse.io", password:"Password123!" },
  { role:"developer", email:"developer@projectpulse.io", password:"Password123!" },
  { role:"client", email:"client@projectpulse.io", password:"Password123!" }
];
export const projects: Project[] = [
  { id:"p1", name:"Apollo Commerce Suite", client:"Northstar Retail", managerId:"u2", status:"Active", progress:72, dueDate:"2026-04-18", risk:"High", description:"Modern omnichannel commerce platform with analytics and loyalty modules.", teamIds:["u2","u3","u5","u4"] },
  { id:"p2", name:"Orion Client Portal", client:"Helix Capital", managerId:"u2", status:"Review", progress:88, dueDate:"2026-03-30", risk:"Moderate", description:"Secure reporting and approvals portal for client servicing teams.", teamIds:["u2","u3","u4"] },
  { id:"p3", name:"Nimbus Support Hub", client:"Vertex Health", managerId:"u2", status:"Planning", progress:24, dueDate:"2026-05-22", risk:"Low", description:"Self-service support experience with knowledge management and workflows.", teamIds:["u2","u5"] }
];
export const milestones: Milestone[] = [
  { id:"m1", projectId:"p1", title:"API Integration", dueDate:"2026-03-29", progress:60, status:"At Risk" },
  { id:"m2", projectId:"p1", title:"Admin Console Release", dueDate:"2026-04-10", progress:80, status:"On Track" },
  { id:"m3", projectId:"p2", title:"Client UAT", dueDate:"2026-03-27", progress:92, status:"On Track" },
  { id:"m4", projectId:"p3", title:"Discovery Signoff", dueDate:"2026-03-31", progress:40, status:"On Track" }
];
export const tasks: Task[] = [
  { id:"t1", title:"Build dashboard KPI endpoints", projectId:"p1", assigneeId:"u3", status:"In Progress", priority:"Critical", dueDate:"2026-03-25", description:"Create metrics pipeline and response contracts for dashboard cards." },
  { id:"t2", title:"Refine billing workflow UI", projectId:"p1", assigneeId:"u5", status:"Review", priority:"High", dueDate:"2026-03-26", description:"Polish user flow and align controls with finance approval states." },
  { id:"t3", title:"Prepare UAT checklist", projectId:"p2", assigneeId:"u2", status:"Todo", priority:"Medium", dueDate:"2026-03-24", description:"Document acceptance checklist for client review and signoff." },
  { id:"t4", title:"Fix document upload validation", projectId:"p2", assigneeId:"u3", status:"Blocked", priority:"High", dueDate:"2026-03-23", description:"Resolve file size validation mismatch with drag-and-drop flow." },
  { id:"t5", title:"Scope intake workshop", projectId:"p3", assigneeId:"u2", status:"Done", priority:"Low", dueDate:"2026-03-20", description:"Kickoff workshop with client stakeholders and internal leads." }
];
export const files: FileItem[] = [
  { id:"f1", name:"Sprint-Plan-Q2.pdf", type:"PDF", projectId:"p1", uploaderId:"u2", uploadedAt:"2026-03-18" },
  { id:"f2", name:"UAT-Checklist.docx", type:"DOCX", projectId:"p2", uploaderId:"u2", taskId:"t3", uploadedAt:"2026-03-22" },
  { id:"f3", name:"Architecture-v4.fig", type:"FIG", projectId:"p1", uploaderId:"u3", uploadedAt:"2026-03-21" }
];
export const comments: Comment[] = [
  { id:"c1", entityId:"p1", authorId:"u2", message:"Payments scope expanded after stakeholder review. Monitoring risk closely.", createdAt:"2026-03-22T09:00:00Z" },
  { id:"c2", entityId:"t4", authorId:"u3", message:"Blocked by missing content type contract from backend team.", createdAt:"2026-03-23T06:10:00Z" },
  { id:"c3", entityId:"p2", authorId:"u4", message:"Client is happy with the current reporting experience.", createdAt:"2026-03-22T14:30:00Z" }
];
export const chartData = {
  projectStatus:[{name:"Planning",value:1},{name:"Active",value:1},{name:"Review",value:1},{name:"Blocked",value:0},{name:"Completed",value:0}],
  roleDistribution:[{name:"Admin",value:1},{name:"Managers",value:1},{name:"Developers",value:2},{name:"Clients",value:1}],
  progressTrend:[{week:"W1",progress:24},{week:"W2",progress:39},{week:"W3",progress:53},{week:"W4",progress:68},{week:"W5",progress:79}]
};
