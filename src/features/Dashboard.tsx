import { EmptyState } from '@/components/EmptyState'
import { useStore } from '@/lib/store-context'

export function Dashboard() {
  const { data } = useStore()

  if (data.transactions.length === 0) {
    return (
      <div className="card">
        <EmptyState
          title="No activity yet"
          hint="Once transactions land here, this is where the month's summary lives."
        />
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>{data.transactions.length} transactions tracked.</p>
    </div>
  )
}
