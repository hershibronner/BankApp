import type { ISODate } from '@/types'

/** 'YYYY-MM-DD' for a Date, in local time (not UTC — avoids off-by-one days). */
export function toISODate(date: Date): ISODate {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** 'YYYY-MM' — the month key used by budgets. */
export function monthKey(date: ISODate | Date): string {
  const iso = typeof date === 'string' ? date : toISODate(date)
  return iso.slice(0, 7)
}

export function formatDate(iso: ISODate, locale = 'en-US'): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
