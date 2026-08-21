import Link from 'next/link'
import { AppNav } from '@/components/app-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let email: string | undefined

  if (isSupabaseConfigured()) {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    email = user?.email
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[1200px] px-6">
      <header className="flex h-16 items-center justify-between gap-4">
        <Link href="/app" className="text-sm font-semibold tracking-[-0.01em]">
          MoneyTrack
        </Link>

        <div className="flex items-center gap-1">
          {email && (
            <span className="hidden font-mono text-xs text-content-faint sm:inline">
              {email}
            </span>
          )}
          <ThemeToggle />
          <form action={signOut}>
            <Button type="submit" variant="ghost" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </header>

      <AppNav />

      <main className="py-8">{children}</main>
    </div>
  )
}
