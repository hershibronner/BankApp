import type { AppData } from '@/types'

const STORAGE_KEY = 'moneytrack:data:v1'

export const EMPTY_DATA: AppData = {
  version: 1,
  accounts: [],
  categories: [],
  transactions: [],
  budgets: [],
}

/**
 * Local persistence. Deliberately behind a narrow interface so it can be swapped
 * for a real backend later without touching the UI.
 */
export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_DATA
    const parsed = JSON.parse(raw) as Partial<AppData>
    return { ...EMPTY_DATA, ...parsed, version: EMPTY_DATA.version }
  } catch {
    return EMPTY_DATA
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage full or blocked (private window) — the app keeps working in memory.
  }
}

export function clearData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
