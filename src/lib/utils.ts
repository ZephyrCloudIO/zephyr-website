import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse a date string into a timezone-stable Date.
 * If the date is in YYYY-MM-DD format, it is anchored to UTC midnight so that
 * `toISOString()` and the UTC-based formatters in `@/date` produce identical
 * output on the SSG build server and during client hydration (avoiding React
 * hydration mismatches and off-by-one day shifts in extreme timezones).
 *
 * @param dateString - The date string to parse (e.g., "2025-11-06")
 * @returns A Date object representing the date at UTC midnight
 */
export function parseLocalDate(dateString: string | undefined): Date {
  if (!dateString) {
    return new Date();
  }

  // If date is in YYYY-MM-DD format, anchor it to UTC midnight to keep SSG and
  // client hydration deterministic regardless of the runtime timezone.
  const dateMatch = String(dateString).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  }

  // For other formats, parse normally
  return new Date(dateString);
}
