import type { Metadata } from 'next'
import { PhasePlaceholder } from '@/components/phase-placeholder'

export const metadata: Metadata = { title: 'Spending' }

export default function SpendingPage() {
  return (
    <PhasePlaceholder
      phase="Phase 4"
      title="Spending"
      summary="Filterable transaction table, six-month stacked bars, and a category donut."
    />
  )
}
