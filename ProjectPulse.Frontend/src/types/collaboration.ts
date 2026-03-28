
export type PresenceStatus = "online" | "away" | "in-call" | "offline";

export interface UserPresence {
  userId: string;
  name: string;
  role: string;
  status: PresenceStatus;
  lastSeen?: string;
  currentProjectId?: string;
  currentCallId?: string;
}

// ── Chat ──────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  edited?: boolean;
  reactions?: { emoji: string; count: number; userIds: string[] }[];
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
}

export interface ChatRoom {
  projectId: string;
  projectName: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
}

// ── Task Discussion ───────────────────────────────────────────────────────────

export interface TaskComment {
  id: string;
  taskId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
  edited?: boolean;
}

// ── Notifications ─────────────────────────────────────────────────────────────

export type NotificationType =
  | "task_assigned"
  | "task_updated"
  | "comment_added"
  | "file_uploaded"
  | "milestone_due"
  | "project_risk"
  | "message_received"
  | "call_started";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  link?: string;
  actorName?: string;
}

// ── Video Call ────────────────────────────────────────────────────────────────

export type CallStatus = "idle" | "ringing" | "active" | "ended";

export interface CallParticipant {
  userId: string;
  name: string;
  role: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isScreenSharing: boolean;
  isSpeaking: boolean;
  joinedAt: string;
}

export interface CallRoom {
  id: string;
  projectId: string;
  projectName: string;
  status: CallStatus;
  startedAt?: string;
  startedByName?: string;
  participants: CallParticipant[];
  isScreenShareActive: boolean;
  screenSharerName?: string;
}

// ── Activity Timeline ─────────────────────────────────────────────────────────

export type ActivityEventType =
  | "message_sent"
  | "user_joined_call"
  | "call_started"
  | "call_ended"
  | "file_shared"
  | "milestone_updated"
  | "task_status_changed"
  | "comment_added"
  | "user_joined_project";

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  actorName: string;
  entityName?: string;
  description: string;
  timestamp: string;
  projectId?: string;
}