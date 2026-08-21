import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

/**
 * Phase 1 stand-in. The full landing page — hero, problem/solution, tabbed
 * showcase, debt payoff block — is Phase 6, once there is UI worth screenshotting.
 */
export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1200px] flex-col px-6">
      <header className="flex h-16 items-center justify-between">
        <span className="text-sm font-semibold tracking-[-0.01em]">MoneyTrack</span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-center py-24">
        <p className="eyebrow">Personal money tracker</p>
        <h1 className="mt-6 max-w-3xl text-2xl font-semibold sm:text-3xl">
          See exactly where the extra money went.
        </h1>
        <p className="mt-6 max-w-xl text-base text-content-dim">
          Every transaction lands in one of four buckets — essential, extra, debt, saving.
          The one you can actually change is extra, so that is the number this app puts
          in front of you.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/signup">Start free</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </main>

      <footer className="border-t border-hairline py-8">
        <p className="font-mono text-xs text-content-faint">
          MoneyTrack — &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
