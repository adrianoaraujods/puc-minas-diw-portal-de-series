import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToInput(date: string | Date | undefined): string {
  return !date || date === "" ? "" : new Date(date).toISOString().slice(0, 10);
}

export function formatStringForSearch(string: string): string {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .toLowerCase();
}

export function parseObjectPropertiesToNumber(obj: unknown): unknown {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(parseObjectPropertiesToNumber);
  }

  const parsedObj: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      parsedObj[key] = parseObjectPropertiesToNumber(value);
    } else if (typeof value === "string") {
      const parsedValue = Number(value);
      parsedObj[key] = isNaN(parsedValue) ? value : parsedValue;
    } else {
      parsedObj[key] = value;
    }
  }

  return parsedObj;
}
