import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'
import { SetupNotice } from '@/components/setup-notice'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export const metadata: Metadata = { title: 'Sign in' }

const ERRORS: Record<string, string> = {
  expired_link: 'That sign-in link has expired. Request a new one below.',
  missing_code: 'That link was incomplete. Request a new one below.',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const { next, error } = await searchParams
  const message = error ? ERRORS[error] : undefined

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-16">
      {isSupabaseConfigured() ? (
        <div className="w-full max-w-sm">
          {message && (
            <p role="alert" className="mb-6 text-sm text-warn">
              {message}
            </p>
          )}
          <AuthForm mode="login" next={next} />
        </div>
      ) : (
        <SetupNotice />
      )}
    </div>
  )
}
