# MoneyTrack

A personal finance web app — track what comes in, what goes out, and what's left.

This repository is currently a **scaffold**: the build, types, storage layer, and app
shell are in place and running, with feature screens as placeholders. The product
spec drives what gets built on top.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Type-check, then produce a production bundle in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the whole project |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Vitest, single run |

## Stack

- **React 19** + **TypeScript** (strict)
- **Vite 6** for dev server and bundling
- **Vitest** for unit tests
- **ESLint 9** (flat config) with the React Hooks rules
- No backend yet — state persists to `localStorage` behind a narrow interface
  (`src/lib/storage.ts`) that can be swapped for an API without touching the UI.

## Layout

```
src/
  components/   Small presentational pieces (Amount, EmptyState)
  features/     One folder-level screen per tab (Dashboard, Transactions, Budgets)
  lib/          Money math, dates, ids, persistence, the app store
  styles/       Global CSS with light/dark design tokens
  types/        Domain model — Account, Category, Transaction, Budget
```

## Conventions

**Money is integers.** Every amount is stored as **minor units** (cents) as a signed
integer: negative is money out, positive is money in. Floats are never used for
currency. Parse at the input edge with `parseMoney`, format at the display edge with
`formatMoney`.

**Dates are local `YYYY-MM-DD` strings.** `toISODate` uses local time deliberately, so
a transaction entered late at night doesn't jump a day.

**Theme.** Colours come from CSS custom properties on `:root`, with a
`prefers-color-scheme: dark` override. Add new colours as tokens, not literals.

## License

Private project — all rights reserved.
