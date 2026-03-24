export type Role = "admin" | "manager" | "developer" | "client";
export type Priority = "Low" | "Medium" | "High" | "Critical";
export type RiskLevel = "Low" | "Moderate" | "High";
export interface AuthUser { id:string; name:string; email:string; role:Role; token:string; }
export interface User { id:string; name:string; email:string; role:Role; status:"Active"|"Inactive"; avatar:string; projectsAssigned:number; lastActive:string; }
export interface Project { id:string; name:string; client:string; managerId:string; status:string; progress:number; dueDate:string; risk:RiskLevel; description:string; teamIds:string[]; }
export interface Milestone { id:string; projectId:string; title:string; dueDate:string; progress:number; status:string; }
export interface Task { id:string; title:string; projectId:string; assigneeId:string; status:string; priority:Priority; dueDate:string; description:string; }
export interface FileItem { id:string; name:string; type:string; projectId:string; taskId?:string; uploaderId:string; uploadedAt:string; }
export interface Comment { id:string; entityId:string; authorId:string; message:string; createdAt:string; }
