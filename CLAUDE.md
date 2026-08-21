# MoneyTrack — working notes

## Non-negotiables

- **Money is integer minor units (cents), signed.** Negative = outflow, positive =
  inflow. Never store or compute currency as a float. Convert only at the edges:
  `parseMoney` on input, `formatMoney` on display (`src/lib/money.ts`).
- **Dates are local-time `YYYY-MM-DD` strings** (`src/lib/date.ts`). Do not use
  `toISOString()` for dates — it shifts to UTC and moves late-evening entries a day.
- **Persistence stays behind `src/lib/storage.ts`.** UI code reads and writes through
  `useStore()`, never `localStorage` directly, so a real backend can drop in later.
- **Colours are CSS custom properties** in `src/styles/global.css`, defined for light
  and dark. No hard-coded hex in components.

## Checks to run before committing

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Structure

- `src/types/` — the domain model. Change it here first; everything else follows.
- `src/lib/` — pure helpers plus the store. Prefer pure functions with unit tests.
- `src/features/` — one screen per tab, mounted from `src/App.tsx`.
- `src/components/` — shared presentational pieces only, no data fetching.
