import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstMissingLetter(name: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letters = new Set(name.toLowerCase().replace(/[^a-z]/g, ""));
  for (const char of alphabet) {
    if (!letters.has(char)) return char;
  }
  return "-";
}
