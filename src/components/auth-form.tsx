'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, signUp, type AuthState } from '@/app/auth/actions'

type Mode = 'login' | 'signup'

function SubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? 'Working…' : children}
    </Button>
  )
}

export function AuthForm({ mode, next }: { mode: Mode; next?: string }) {
  const isLogin = mode === 'login'
  const [usePassword, setUsePassword] = useState(true)
  // React resets uncontrolled fields once a form action settles. Holding the
  // email in state keeps it on screen after a failed attempt, so only the
  // password has to be retyped.
  const [email, setEmail] = useState('')

  // The action is fixed per form; `method` below selects the branch.
  const [state, formAction] = useActionState<AuthState, FormData>(
    isLogin ? login : signUp,
    {},
  )

  const wantsPassword = !isLogin || usePassword

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-xl font-semibold">{isLogin ? 'Sign in' : 'Create your account'}</h1>
      <p className="mt-2 text-sm text-content-dim">
        {isLogin ? 'Pick up where you left off.' : 'Start tracking where the extra money goes.'}
      </p>

      <form action={formAction} className="mt-8 space-y-4">
        {next && <input type="hidden" name="next" value={next} />}
        {isLogin && <input type="hidden" name="method" value={usePassword ? 'password' : 'magic'} />}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        {wantsPassword && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              placeholder={isLogin ? '••••••••' : 'At least 8 characters'}
              minLength={isLogin ? undefined : 8}
              required
            />
          </div>
        )}

        {state.error && (
          <p role="alert" className="text-sm text-negative">
            {state.error}
          </p>
        )}
        {state.notice && (
          <p role="status" className="text-sm text-positive">
            {state.notice}
          </p>
        )}

        <SubmitButton>
          {isLogin ? (usePassword ? 'Sign in' : 'Send sign-in link') : 'Create account'}
        </SubmitButton>
      </form>

      {isLogin && (
        <button
          type="button"
          onClick={() => setUsePassword((value) => !value)}
          className="mt-4 w-full text-center text-sm text-content-dim transition-colors duration-150 ease-out hover:text-content"
        >
          {usePassword ? 'Email me a sign-in link instead' : 'Use a password instead'}
        </button>
      )}

      <p className="mt-8 border-t border-hairline pt-6 text-sm text-content-dim">
        {isLogin ? 'No account yet? ' : 'Already have an account? '}
        <Link
          href={isLogin ? '/signup' : '/login'}
          className="text-content underline underline-offset-4 transition-colors duration-150 ease-out hover:text-accent"
        >
          {isLogin ? 'Create one' : 'Sign in'}
        </Link>
      </p>
    </div>
  )
}
