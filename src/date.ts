const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDateLong(date: Date) {
  return longDateFormatter.format(date);
}

export function formatDateShort(date: Date) {
  return shortDateFormatter.format(date);
}

export function formatMonthDay(date: Date) {
  return monthDayFormatter.format(date);
}
