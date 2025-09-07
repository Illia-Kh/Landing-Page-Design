export function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date, locale = 'en'): string {
  return new Intl.DateTimeFormat(locale).format(date)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}