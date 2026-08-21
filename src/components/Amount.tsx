import type { CurrencyCode } from '@/types'
import { formatMoney } from '@/lib/money'

interface AmountProps {
  /** Signed minor units. */
  value: number
  currency?: CurrencyCode
}

export function Amount({ value, currency = 'USD' }: AmountProps) {
  const tone = value < 0 ? 'amount--negative' : value > 0 ? 'amount--positive' : ''
  return <span className={`amount ${tone}`.trim()}>{formatMoney(value, currency)}</span>
}
