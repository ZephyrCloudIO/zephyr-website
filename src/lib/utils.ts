import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse a date string as a local date to avoid timezone offset issues.
 * If the date is in YYYY-MM-DD format, it treats it as a local date at noon
 * to prevent timezone shifts from displaying the wrong day.
 *
 * @param dateString - The date string to parse (e.g., "2025-11-06")
 * @returns A Date object representing the date in local time
 */
export function parseLocalDate(dateString: string | undefined): Date {
  if (!dateString) {
    return new Date();
  }

  // If date is in YYYY-MM-DD format, treat it as local date at noon to avoid timezone issues
  const dateMatch = String(dateString).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    return new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0);
  }

  // For other formats, parse normally
  return new Date(dateString);
}
