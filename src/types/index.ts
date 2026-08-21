/** Core domain types. Amounts are stored as integer minor units (cents) — never floats. */

export type ISODate = string // 'YYYY-MM-DD'
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'ILS'

export type AccountKind = 'checking' | 'savings' | 'credit' | 'cash' | 'investment'

export interface Account {
  id: string
  name: string
  kind: AccountKind
  currency: CurrencyCode
  /** Opening balance in minor units. */
  openingBalance: number
  archived?: boolean
}

export type CategoryKind = 'income' | 'expense'

export interface Category {
  id: string
  name: string
  kind: CategoryKind
  /** Hex colour used by charts and chips. */
  color: string
  parentId?: string
}

export interface Transaction {
  id: string
  accountId: string
  categoryId?: string
  /** Signed minor units: negative is money out, positive is money in. */
  amount: number
  date: ISODate
  payee: string
  note?: string
  /** Set when this transaction is one half of a transfer between accounts. */
  transferPairId?: string
}

export interface Budget {
  id: string
  categoryId: string
  /** Budgeted amount in minor units for one month. */
  limit: number
  /** 'YYYY-MM' — the month this budget applies to. */
  month: string
}

export interface AppData {
  version: number
  accounts: Account[]
  categories: Category[]
  transactions: Transaction[]
  budgets: Budget[]
}
