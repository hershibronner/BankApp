import type { Metadata } from 'next'
import { PhasePlaceholder } from '@/components/phase-placeholder'

export const metadata: Metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <PhasePlaceholder
      phase="Phase 7"
      title="Settings"
      summary="Monthly income, category management, currency, CSV export, and account deletion."
    />
  )
}
