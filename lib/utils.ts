import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
