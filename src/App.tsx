import { useState } from 'react'
import { StoreProvider } from '@/lib/store'
import { Dashboard } from '@/features/Dashboard'
import { Transactions } from '@/features/Transactions'
import { Budgets } from '@/features/Budgets'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', View: Dashboard },
  { id: 'transactions', label: 'Transactions', View: Transactions },
  { id: 'budgets', label: 'Budgets', View: Budgets },
] as const

type TabId = (typeof TABS)[number]['id']

export default function App() {
  const [tab, setTab] = useState<TabId>('dashboard')
  const active = TABS.find((candidate) => candidate.id === tab) ?? TABS[0]
  const View = active.View

  return (
    <StoreProvider>
      <div className="app">
        <header className="app__header">
          <img className="app__logo" src="/favicon.svg" alt="" />
          <span className="app__title">MoneyTrack</span>
        </header>

        <nav className="app__nav">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={id === tab ? 'page' : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        <main className="app__main">
          <View />
        </main>
      </div>
    </StoreProvider>
  )
}
