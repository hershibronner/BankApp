import type { CurrencyCode } from '@/types'

/**
 * Money is handled in integer minor units (cents) so arithmetic never drifts.
 * Convert at the edges only: parse on input, format on display.
 */

export function formatMoney(
  minorUnits: number,
  currency: CurrencyCode = 'USD',
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(minorUnits / 100)
}

/** Parse user input like "12.34", "1,234.5", "-8" into minor units. Returns null if unparsable. */
export function parseMoney(input: string): number | null {
  const cleaned = input.replace(/[^0-9.-]/g, '')
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return null
  const value = Number(cleaned)
  if (!Number.isFinite(value)) return null
  return Math.round(value * 100)
}

export function sum(amounts: number[]): number {
  return amounts.reduce((total, amount) => total + amount, 0)
}
