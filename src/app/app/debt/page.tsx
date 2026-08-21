import type { Metadata } from 'next'
import { PhasePlaceholder } from '@/components/phase-placeholder'

export const metadata: Metadata = { title: 'Debt' }

export default function DebtPage() {
  return (
    <PhasePlaceholder
      phase="Phase 5"
      title="Debt"
      summary="Balances, payoff projections, and the avalanche versus snowball comparison."
    />
  )
}
