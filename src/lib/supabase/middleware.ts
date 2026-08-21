import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { getSupabaseEnv } from '@/lib/supabase/env'

/** Routes that require a session. Everything else is public. */
const PROTECTED_PREFIX = '/app'

/** Routes a signed-in user should not see. */
const AUTH_ROUTES = ['/login', '/signup']

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const env = getSupabaseEnv()
  if (!env) {
    // Without credentials there is no session to refresh and nothing to guard;
    // the app surfaces a setup notice instead of redirect-looping.
    return response
  }

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }
        response = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  // getUser() revalidates the token with Supabase. Do not swap it for
  // getSession(), which trusts the cookie and can be spoofed.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (!user && pathname.startsWith(PROTECTED_PREFIX)) {
    const redirect = request.nextUrl.clone()
    redirect.pathname = '/login'
    redirect.searchParams.set('next', pathname)
    return NextResponse.redirect(redirect)
  }

  if (user && AUTH_ROUTES.includes(pathname)) {
    const redirect = request.nextUrl.clone()
    redirect.pathname = '/app'
    redirect.search = ''
    return NextResponse.redirect(redirect)
  }

  return response
}
