# MoneyTrack — working notes

Read `PROJECT.md` first. It is the product spec and it wins any disagreement with
this file.

## Non-negotiables

- **Money is integer cents.** Never a float, never a string, never dollars. Convert
  only at the edges: `parseMoney` on input, `formatMoney` on display
  (`src/lib/money.ts`). Every rendered figure uses Geist Mono for tabular numerals.
- **Row Level Security on every table**, from the migration that creates it. A user
  must never be able to read another user's rows. No exceptions, no "add it later".
- **Colours are tokens.** Defined for both themes in `src/app/globals.css`, mapped in
  `tailwind.config.ts`. Use `bg-surface` / `text-content-dim` / `border-hairline`.
  Never a literal hex in a component; never a `dark:` variant — the theme is a
  variable swap on `<html data-theme>`.
- **Hairline borders, not shadows.** Elevation is a 1px border plus a surface shift.
- **Server Components by default.** Add `'use client'` only when interaction needs it.
- **375px is a supported width.** Check it before calling anything done.
- `getUser()`, never `getSession()`, on the server — `getSession` trusts the cookie
  and can be spoofed.

## Checks before committing

```bash
npm run lint && npm run typecheck && npm run build
```

## Gotchas already hit

- **React 19 resets uncontrolled form fields once a form action settles.** Anything
  the user would hate to retype after an error (an email, a transaction amount) has
  to be controlled state. This bit the login form.
- **Don't swap which action you hand `useActionState`.** It keeps the previous one
  and submits the wrong handler. Pass one stable action and branch on a hidden field
  — see `method` in `src/components/auth-form.tsx`.
- **Supabase error strings are developer-facing.** Route them through
  `readableError` in `src/app/auth/actions.ts` so users never see "fetch failed".
- The app must run without Supabase keys — missing env degrades to a setup notice
  rather than a build failure. Read credentials via `src/lib/supabase/env.ts`.

## Structure

- `src/app/app/` — the product shell; one folder per section from `PROJECT.md` §5.
- `src/components/ui/` — shadcn primitives, restyled. Restyle rather than re-adding
  from the CLI, which would overwrite them with the default look.
- `src/lib/supabase/` — three clients: browser, server (cookies), middleware (session
  refresh + route guard).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
