import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AppData } from '@/types'
import { EMPTY_DATA, loadData, saveData } from '@/lib/storage'
import { StoreContext } from '@/lib/store-context'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadData())

  useEffect(() => {
    saveData(data)
  }, [data])

  const update = useCallback((recipe: (draft: AppData) => AppData) => {
    setData((current) => recipe(current))
  }, [])

  const reset = useCallback(() => setData(EMPTY_DATA), [])

  const value = useMemo(() => ({ data, update, reset }), [data, update, reset])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
