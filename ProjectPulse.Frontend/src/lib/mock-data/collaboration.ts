// ─── lib/mock-data/collaboration.ts ──────────────────────────────────────────

import type {
     ChatMessage, TaskComment, AppNotification,
     CallRoom, ActivityEvent, UserPresence,
   } from "@/types/collaboration";
   
   // ── Presence ──────────────────────────────────────────────────────────────────
   
   export const mockPresence: UserPresence[] = [
     { userId: "u1", name: "Admin User",    role: "admin",     status: "online",   currentProjectId: "p1" },
     { userId: "u2", name: "Sarah Chen",    role: "manager",   status: "in-call",  currentProjectId: "p1", currentCallId: "call-p1" },
     { userId: "u3", name: "James Okafor", role: "developer", status: "online",   currentProjectId: "p2" },
     { userId: "u4", name: "Priya Nair",   role: "developer", status: "away" },
     { userId: "u5", name: "Tom Williams", role: "client",    status: "offline",  lastSeen: "2h ago" },
     { userId: "u6", name: "Lena Kovač",   role: "developer", status: "online",   currentProjectId: "p1" },
   ];
   
   // ── Chat Messages ─────────────────────────────────────────────────────────────
   
   export const mockChatMessages: ChatMessage[] = [
     {
       id: "cm1", projectId: "p1", senderId: "u2",
       senderName: "Sarah Chen", senderRole: "manager",
       content: "Morning team — sprint review is confirmed for Friday 10am. Please have your demos ready.",
       timestamp: "2025-03-24T08:12:00Z",
     },
     {
       id: "cm2", projectId: "p1", senderId: "u3",
       senderName: "James Okafor", senderRole: "developer",
       content: "Confirmed. I'll have the API integration screen ready. Just finishing off the auth flow edge cases.",
       timestamp: "2025-03-24T08:17:00Z",
     },
     {
       id: "cm3", projectId: "p1", senderId: "u6",
       senderName: "Lena Kovač", senderRole: "developer",
       content: "The payments module is unblocked now — Marcus reviewed the spec and approved the approach.",
       timestamp: "2025-03-24T08:34:00Z",
       reactions: [{ emoji: "🎉", count: 3, userIds: ["u1", "u2", "u3"] }],
     },
     {
       id: "cm4", projectId: "p1", senderId: "u1",
       senderName: "Admin User", senderRole: "admin",
       content: "Great progress. Risk level is still high due to the scope expansion — let's discuss mitigation in today's standup.",
       timestamp: "2025-03-24T09:01:00Z",
     },
     {
       id: "cm5", projectId: "p1", senderId: "u2",
       senderName: "Sarah Chen", senderRole: "manager",
       content: "Agreed. I'll update the risk register before standup. James, can you share your blockers list so I can prep?",
       timestamp: "2025-03-24T09:15:00Z",
     },
     {
       id: "cm6", projectId: "p1", senderId: "u3",
       senderName: "James Okafor", senderRole: "developer",
       content: "Already drafted — dropping it in the shared doc now. Main one is still waiting on client sign-off for the data schema.",
       timestamp: "2025-03-24T09:22:00Z",
       attachments: [{ id: "a1", name: "blockers-list.docx", type: "DOCX", size: "24 KB" }],
     },
   ];
   
   export const mockChatMessages_p2: ChatMessage[] = [
     {
       id: "cm7", projectId: "p2", senderId: "u3",
       senderName: "James Okafor", senderRole: "developer",
       content: "Dashboard v2 wireframes are done. Sharing for review.",
       timestamp: "2025-03-23T14:05:00Z",
       attachments: [{ id: "a2", name: "dashboard-v2.pdf", type: "PDF", size: "1.2 MB" }],
     },
     {
       id: "cm8", projectId: "p2", senderId: "u4",
       senderName: "Priya Nair", senderRole: "developer",
       content: "Looks good, left a few comments on the layout. The filter bar needs more breathing room.",
       timestamp: "2025-03-23T14:44:00Z",
     },
   ];
   
   export function getMockChatMessages(projectId: string): ChatMessage[] {
     if (projectId === "p2") return mockChatMessages_p2;
     return mockChatMessages;
   }
   
   // ── Task Comments ─────────────────────────────────────────────────────────────
   
   export const mockTaskComments: TaskComment[] = [
     {
       id: "tc1", taskId: "t1", authorId: "u2",
       authorName: "Sarah Chen", authorRole: "manager",
       content: "This is blocked on client approval per the last sync call. I've sent a follow-up email.",
       timestamp: "2025-03-23T10:30:00Z",
     },
     {
       id: "tc2", taskId: "t1", authorId: "u3",
       authorName: "James Okafor", authorRole: "developer",
       content: "Should we implement a fallback approach in the meantime? We could use the mock data structure to unblock the UI layer.",
       timestamp: "2025-03-23T10:48:00Z",
     },
     {
       id: "tc3", taskId: "t1", authorId: "u1",
       authorName: "Admin User", authorRole: "admin",
       content: "Good call. Go ahead with the mock approach — we can swap in the real schema once approved. This keeps the sprint moving.",
       timestamp: "2025-03-23T11:02:00Z",
     },
   ];
   
   export function getMockTaskComments(taskId: string): TaskComment[] {
     return mockTaskComments.filter((c) => c.taskId === taskId).length > 0
       ? mockTaskComments.filter((c) => c.taskId === taskId)
       : mockTaskComments.map((c) => ({ ...c, taskId }));
   }
   
   // ── Notifications ─────────────────────────────────────────────────────────────
   
   export const mockNotifications: AppNotification[] = [
     {
       id: "n1", type: "call_started", read: false,
       title: "Call started in Project Apollo",
       body: "Sarah Chen started a video call. 2 participants.",
       timestamp: "2025-03-24T09:45:00Z",
       link: "/projects/p1/call", actorName: "Sarah Chen",
     },
     {
       id: "n2", type: "task_assigned", read: false,
       title: "New task assigned to you",
       body: "Integrate Stripe Payments has been assigned to you by Sarah Chen.",
       timestamp: "2025-03-24T09:10:00Z",
       link: "/tasks/t3", actorName: "Sarah Chen",
     },
     {
       id: "n3", type: "project_risk", read: false,
       title: "High risk alert: Project Apollo",
       body: "3 blocked tasks and missed milestone detected. Escalation recommended.",
       timestamp: "2025-03-24T08:55:00Z",
       link: "/projects/p1",
     },
     {
       id: "n4", type: "comment_added", read: false,
       title: "New comment on API Integration task",
       body: "James Okafor: \"Should we implement a fallback approach in the meantime?\"",
       timestamp: "2025-03-23T10:48:00Z",
       link: "/tasks/t1", actorName: "James Okafor",
     },
     {
       id: "n5", type: "milestone_due", read: true,
       title: "Milestone due tomorrow",
       body: "UAT Sign-off is due on 25 March. Current progress: 72%.",
       timestamp: "2025-03-23T09:00:00Z",
       link: "/milestones",
     },
     {
       id: "n6", type: "file_uploaded", read: true,
       title: "File uploaded to Project Apollo",
       body: "Sarah Chen uploaded blockers-list.docx to the project chat.",
       timestamp: "2025-03-23T09:22:00Z",
       link: "/files", actorName: "Sarah Chen",
     },
     {
       id: "n7", type: "task_updated", read: true,
       title: "Task status changed",
       body: "Design System Components moved from In Progress to Review.",
       timestamp: "2025-03-22T16:30:00Z",
       link: "/tasks/t2",
     },
     {
       id: "n8", type: "message_received", read: true,
       title: "New message in Project Apollo",
       body: "Lena Kovač: \"The payments module is unblocked now...\"",
       timestamp: "2025-03-22T08:34:00Z",
       link: "/projects/p1/chat", actorName: "Lena Kovač",
     },
   ];
   
   // ── Call Rooms ────────────────────────────────────────────────────────────────
   
   export const mockCallRooms: CallRoom[] = [
     {
       id: "call-p1", projectId: "p1", projectName: "Project Apollo",
       status: "active", startedAt: "2025-03-24T09:45:00Z",
       startedByName: "Sarah Chen",
       isScreenShareActive: false,
       participants: [
         { userId: "u2", name: "Sarah Chen",    role: "manager",   isMuted: false, isCameraOff: false, isScreenSharing: false, isSpeaking: true,  joinedAt: "2025-03-24T09:45:00Z" },
         { userId: "u6", name: "Lena Kovač",   role: "developer", isMuted: true,  isCameraOff: false, isScreenSharing: false, isSpeaking: false, joinedAt: "2025-03-24T09:47:00Z" },
         { userId: "u3", name: "James Okafor", role: "developer", isMuted: false, isCameraOff: true,  isScreenSharing: false, isSpeaking: false, joinedAt: "2025-03-24T09:50:00Z" },
       ],
     },
     {
       id: "call-p2", projectId: "p2", projectName: "Orion Portal",
       status: "idle",
       isScreenShareActive: false,
       participants: [],
     },
   ];
   
   export function getMockCallRoom(projectId: string): CallRoom | undefined {
     return mockCallRooms.find((r) => r.projectId === projectId);
   }
   
   // ── Activity Events ───────────────────────────────────────────────────────────
   
   export const mockActivityEvents: ActivityEvent[] = [
     { id: "ae1", type: "call_started",       actorName: "Sarah Chen",    entityName: "Project Apollo",            description: "started a video call",                    timestamp: "2025-03-24T09:45:00Z", projectId: "p1" },
     { id: "ae2", type: "message_sent",       actorName: "Lena Kovač",   entityName: "Project Apollo Chat",       description: "sent a message in project chat",           timestamp: "2025-03-24T08:34:00Z", projectId: "p1" },
     { id: "ae3", type: "task_status_changed",actorName: "James Okafor", entityName: "API Integration",           description: "moved task to In Progress",                 timestamp: "2025-03-24T08:10:00Z", projectId: "p1" },
     { id: "ae4", type: "file_shared",        actorName: "James Okafor", entityName: "blockers-list.docx",        description: "shared a file in project chat",             timestamp: "2025-03-23T09:22:00Z", projectId: "p1" },
     { id: "ae5", type: "comment_added",      actorName: "Admin User",   entityName: "API Integration task",      description: "commented on the task",                     timestamp: "2025-03-23T11:02:00Z", projectId: "p1" },
     { id: "ae6", type: "milestone_updated",  actorName: "Sarah Chen",   entityName: "UAT Sign-off",              description: "updated milestone progress to 72%",         timestamp: "2025-03-22T15:00:00Z", projectId: "p1" },
     { id: "ae7", type: "user_joined_call",   actorName: "James Okafor", entityName: "Project Apollo call",       description: "joined the active call",                    timestamp: "2025-03-24T09:50:00Z", projectId: "p1" },
     { id: "ae8", type: "call_ended",         actorName: "Sarah Chen",   entityName: "Orion Portal call",         description: "ended the call · 34 min",                  timestamp: "2025-03-22T11:34:00Z", projectId: "p2" },
   ];