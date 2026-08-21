import { EmptyState } from '@/components/EmptyState'
import { useStore } from '@/lib/store-context'

export function Budgets() {
  const { data } = useStore()

  if (data.budgets.length === 0) {
    return (
      <div className="card">
        <EmptyState title="No budgets set" hint="Set a monthly limit per category." />
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Budgets</h2>
      <p>{data.budgets.length} budgets configured.</p>
    </div>
  )
}
