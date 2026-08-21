'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface AuthState {
  error?: string
  notice?: string
}

/** Only allow relative paths, so ?next= cannot be used as an open redirect. */
function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === 'string' ? value : ''
  return next.startsWith('/') && !next.startsWith('//') ? next : '/app'
}

async function siteOrigin(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  const headerList = await headers()
  const host = headerList.get('host') ?? 'localhost:3000'
  const protocol = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https'
  return `${protocol}://${host}`
}

/**
 * Supabase error strings are developer-facing ("fetch failed", "Invalid login
 * credentials"). Map the ones users actually hit to a sentence that says what
 * happened and what to do next.
 */
function readableError(message: string): string {
  const text = message.toLowerCase()

  if (text.includes('fetch failed') || text.includes('network') || text.includes('timeout')) {
    return 'Could not reach the server. Check your connection and try again.'
  }
  if (text.includes('invalid login credentials')) {
    return 'That email and password do not match an account.'
  }
  if (text.includes('email not confirmed')) {
    return 'Confirm your email first — the link is in your inbox.'
  }
  if (text.includes('already registered')) {
    return 'That email already has an account. Sign in instead.'
  }
  if (text.includes('rate limit') || text.includes('too many')) {
    return 'Too many attempts. Wait a minute, then try again.'
  }
  if (text.includes('weak password')) {
    return 'That password is too easy to guess. Try a longer one.'
  }
  return `That did not work: ${message}`
}

/**
 * One action for the whole login form. The `method` field picks the path rather
 * than the form swapping which action it dispatches to — swapping leaves
 * useActionState holding the previous action and submits the wrong one.
 */
export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim()
  const method = formData.get('method') === 'magic' ? 'magic' : 'password'
  const next = safeNext(formData.get('next'))

  if (!email) return { error: 'Enter your email.' }

  const supabase = await createClient()

  if (method === 'magic') {
    const origin = await siteOrigin()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
    })
    if (error) return { error: readableError(error.message) }
    return { notice: `Check ${email} for your sign-in link.` }
  }

  const password = String(formData.get('password') ?? '')
  if (!password) return { error: 'Enter your password.' }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: readableError(error.message) }

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email) return { error: 'Enter your email.' }
  if (password.length < 8) return { error: 'Use at least 8 characters for your password.' }

  const supabase = await createClient()
  const origin = await siteOrigin()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback?next=/app` },
  })

  if (error) return { error: readableError(error.message) }

  // Supabase returns a user with no session when email confirmation is on.
  if (!data.session) {
    return { notice: `Check ${email} for a link to confirm your account.` }
  }

  revalidatePath('/', 'layout')
  redirect('/app')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
