import Link from 'next/link'

/** Shown instead of auth UI when the Supabase keys are missing. */
export function SetupNotice() {
  return (
    <div className="panel w-full max-w-sm p-6">
      <p className="eyebrow">Setup needed</p>
      <h1 className="mt-3 text-lg font-semibold">Connect Supabase</h1>
      <p className="mt-2 text-sm text-content-dim">
        Copy <code className="font-mono text-content">.env.example</code> to{' '}
        <code className="font-mono text-content">.env.local</code> and fill in your project
        URL and anon key, then restart the dev server.
      </p>
      <p className="mt-4 text-sm text-content-dim">
        Both values are in your Supabase dashboard under{' '}
        <Link
          href="https://supabase.com/dashboard"
          className="text-content underline underline-offset-4 transition-colors duration-150 ease-out hover:text-accent"
        >
          Project Settings → API
        </Link>
        .
      </p>
    </div>
  )
}
