import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function calculateTime(seconds: number) {
  const days = Math.floor(seconds / (60 * 60 * 24)); // 计算天数
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)); // 计算小时数

  return {
    days,
    hours,
  };
}
