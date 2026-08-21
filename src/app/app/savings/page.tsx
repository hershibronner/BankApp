import type { Metadata } from 'next'
import { PhasePlaceholder } from '@/components/phase-placeholder'

export const metadata: Metadata = { title: 'Savings' }

export default function SavingsPage() {
  return (
    <PhasePlaceholder
      phase="Phase 5"
      title="Savings"
      summary="Goal cards with progress rings and the monthly contribution needed to hit each target date."
    />
  )
}
