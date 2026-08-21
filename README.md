# MoneyTrack

See exactly where the extra money went, and what it's costing you.

A personal money tracker built around four buckets — **essential**, **extra**,
**debt**, **saving**. The one you can actually change is *extra*, so that is the
number the app puts in front of you.

The full product spec is in [`PROJECT.md`](./PROJECT.md).

## Status

**Phase 1 (Foundation) is complete.** The remaining phases are listed in
`PROJECT.md` section 8. Screens beyond the shell show a placeholder naming the phase
that fills them in.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase keys
npm run dev                  # http://localhost:3000
```

Without Supabase keys the app still runs — `/login` and `/signup` show a setup
notice instead of crashing, and route protection is inert.

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy **Project URL** and the **anon public** key from Project Settings → API into
   `.env.local`.
3. Under Authentication → URL Configuration, add `http://localhost:3000/auth/callback`
   (and your deployed equivalent) to the redirect allow-list, or magic links and
   confirmation emails will bounce.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build, including type checking |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3 ·
shadcn/ui primitives (restyled) · Supabase (Postgres + auth) · Recharts · date-fns ·
Geist Sans + Geist Mono. Deployed on Vercel.

## Layout

```
src/
  app/
    page.tsx            Landing (Phase 6 stand-in)
    login/ signup/      Auth screens
    auth/               Server actions + the email-link callback route
    app/                The product shell and its sections
  components/
    ui/                 shadcn primitives, restyled to the design system
  lib/
    supabase/           Browser, server, and middleware clients
    money.ts            Cents in, formatted string out
middleware.ts           Session refresh + route protection
```

## Conventions

**Money is integer cents.** Never a float. `parseMoney` at the input edge,
`formatMoney` at the display edge. Every figure renders in Geist Mono with tabular
numerals so columns line up.

**Colour comes from tokens.** All colours are CSS custom properties defined for both
themes in `globals.css` and mapped in `tailwind.config.ts`. Components use
`bg-surface`, `text-content-dim`, `border-hairline` — never a literal hex, and never
a `dark:` variant.

**Elevation is a hairline plus a surface shift**, never a drop shadow.

**Server Components by default.** `'use client'` only where interaction requires it.

## Deploying

Push to a Vercel-linked repo and set `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_SITE_URL` (your deployment origin,
used to build magic-link redirects) in the project's environment variables.
