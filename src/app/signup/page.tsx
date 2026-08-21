import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'
import { SetupNotice } from '@/components/setup-notice'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export const metadata: Metadata = { title: 'Create account' }

export default function SignupPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-16">
      {isSupabaseConfigured() ? <AuthForm mode="signup" /> : <SetupNotice />}
    </div>
  )
}
