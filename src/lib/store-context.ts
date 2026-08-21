import { createContext, useContext } from 'react'
import type { AppData } from '@/types'

export interface StoreValue {
  data: AppData
  update: (recipe: (draft: AppData) => AppData) => void
  reset: () => void
}

export const StoreContext = createContext<StoreValue | null>(null)

export function useStore(): StoreValue {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore must be used inside <StoreProvider>')
  return value
}
