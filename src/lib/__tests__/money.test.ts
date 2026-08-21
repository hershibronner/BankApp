import { describe, expect, it } from 'vitest'
import { formatMoney, parseMoney, sum } from '@/lib/money'

describe('parseMoney', () => {
  it('converts decimal input to minor units', () => {
    expect(parseMoney('12.34')).toBe(1234)
    expect(parseMoney('8')).toBe(800)
    expect(parseMoney('-8.5')).toBe(-850)
  })

  it('strips currency symbols and separators', () => {
    expect(parseMoney('$1,234.50')).toBe(123450)
  })

  it('returns null for unparsable input', () => {
    expect(parseMoney('')).toBeNull()
    expect(parseMoney('abc')).toBeNull()
  })
})

describe('formatMoney', () => {
  it('renders minor units as currency', () => {
    expect(formatMoney(123450, 'USD')).toBe('$1,234.50')
  })
})

describe('sum', () => {
  it('adds without floating point drift', () => {
    expect(sum([1010, 2020, -30])).toBe(3000)
  })
})
