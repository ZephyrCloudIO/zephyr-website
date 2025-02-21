import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

interface LinePosition {
  top: number;
  height: number;
}

export function calculateLinePositions(
  code: string,
  lineHeight: number,
): LinePosition[] {
  const lines = code.split('\n');
  return lines.map((_, index) => ({
    top: index * lineHeight,
    height: lineHeight,
  }));
}

export function getHighlightedLines(highlights?: string): number[] {
  if (!highlights) {
    return [];
  }

  const lines: number[] = [];
  const ranges = highlights.split(',').map(range => range.trim());

  for (const range of ranges) {
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        lines.push(i);
      }
    } else {
      lines.push(Number(range));
    }
  }

  return [...new Set(lines)]
    .filter(line => !Number.isNaN(line))
    .sort((a, b) => a - b);
}

export function getLineClasses(
  lineNumber: number,
  highlightedLines: number[],
): string {
  return cn(
    'transition-opacity duration-200',
    highlightedLines.includes(lineNumber)
      ? 'opacity-100'
      : (highlightedLines.length > 0 && 'opacity-40') || 'opacity-100',
  );
}
