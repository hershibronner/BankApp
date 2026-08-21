/**
 * Supabase credentials are read through here rather than inline so that a
 * missing .env.local degrades to a clear in-app message instead of a build
 * failure or an opaque runtime crash.
 */
export interface SupabaseEnv {
  url: string
  anonKey: string
}

export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  return { url, anonKey }
}

export function requireSupabaseEnv(): SupabaseEnv {
  const env = getSupabaseEnv()
  if (!env) {
    throw new Error(
      'Supabase is not configured. Copy .env.example to .env.local and set ' +
        'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    )
  }
  return env
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv() !== null
}
