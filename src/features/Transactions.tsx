import { Amount } from '@/components/Amount'
import { EmptyState } from '@/components/EmptyState'
import { formatDate } from '@/lib/date'
import { useStore } from '@/lib/store-context'

export function Transactions() {
  const { data } = useStore()

  if (data.transactions.length === 0) {
    return (
      <div className="card">
        <EmptyState title="No transactions" hint="Add one to get started." />
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Transactions</h2>
      <ul>
        {data.transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{formatDate(transaction.date)}</span> <span>{transaction.payee}</span>{' '}
            <Amount value={transaction.amount} />
          </li>
        ))}
      </ul>
    </div>
  )
}
