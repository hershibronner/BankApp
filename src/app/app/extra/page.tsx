import type { Metadata } from 'next'
import { PhasePlaceholder } from '@/components/phase-placeholder'

export const metadata: Metadata = { title: 'Extra' }

export default function ExtraPage() {
  return (
    <PhasePlaceholder
      phase="Phase 4"
      title="Extra"
      summary="Extra spending against your rolling three-month average, ranked categories, and the annual pace."
    />
  )
}
