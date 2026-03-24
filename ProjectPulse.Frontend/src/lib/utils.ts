import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export const formatDate = (v: string) => new Intl.DateTimeFormat("en-ZA",{dateStyle:"medium"}).format(new Date(v));
