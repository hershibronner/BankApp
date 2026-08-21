# MoneyTrack — build spec

## 1. What we're building

A personal money tracker for one person (multi-user, but each user only sees their
own data). Most budgeting apps drown you in categories. This one answers four
questions and nothing else.

1. **Where is my money going?** — all spending, logged and categorized.
2. **What was extra?** — separating essential from discretionary spending, because
   that's the number people can actually change.
3. **How fast am I killing my debt?** — balances, payments, projected payoff date.
4. **Am I actually saving?** — savings goals with real progress, not vibes.

**The one-line promise:** See exactly where the extra money went, and what it's
costing you.

## 2. Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui for base primitives — restyled to the design system below. No default
  shadcn look.
- Supabase for Postgres + auth (email/password + magic link)
- Recharts for charts
- date-fns for all date math
- Deployed on Vercel

Rules:

- All secrets in `.env.local`, never committed. `.env.example` lists every key.
- Row Level Security on every table from day one. A user must never read another
  user's rows.
- All money stored as **integer cents**, never floats. Format for display only.
- Server Components by default; Client Components only where interactivity requires it.

## 3. The four buckets

Every transaction belongs to exactly one bucket. This is the spine of the app.

| Bucket | Meaning | Examples |
| --- | --- | --- |
| `essential` | You'd pay it regardless | Rent, groceries, utilities, insurance, gas |
| `extra` | Discretionary — the changeable number | Takeout, subscriptions, impulse buys |
| `debt` | A payment against a debt balance | Credit card payment, loan payment |
| `saving` | Money moved into a savings goal | Emergency fund, vacation fund |

Income is tracked separately (not a bucket).

**Leftover** = income − (essential + extra + debt + saving). Show it prominently. If
negative, say so plainly.

## 4. Data model

```
profiles
  id (uuid, = auth.users.id), display_name, currency (default 'USD'),
  monthly_income_cents, created_at

accounts
  id, user_id, name, type ('checking'|'cash'|'credit')

categories
  id, user_id, name, bucket ('essential'|'extra'|'debt'|'saving'), color, is_archived
  -- seed sensible defaults on signup

transactions
  id, user_id, account_id (nullable), category_id,
  amount_cents (positive int), occurred_on (date), merchant, note,
  bucket (denormalized from category for fast queries),
  debt_id (nullable), goal_id (nullable), created_at

debts
  id, user_id, name, kind ('credit_card'|'loan'|'personal'|'other'),
  original_balance_cents, current_balance_cents, apr (numeric),
  minimum_payment_cents, due_day (1-31), is_paid_off, created_at

goals
  id, user_id, name, target_cents, saved_cents, target_date (nullable),
  is_complete, created_at

budgets
  id, user_id, category_id, month (date, first of month), limit_cents
```

Recording a `debt` transaction decrements `debts.current_balance_cents`. Recording a
`saving` transaction increments `goals.saved_cents`. Do this in a Postgres function
or transaction so it can't drift.

## 5. Screens

- **`/`** — landing page (public, marketing; see section 7)
- **`/login`, `/signup`** — clean, centered, minimal
- **`/app`** — dashboard: Runway Bar, four stat tiles (Spent, Extra, Debt remaining,
  Total saved) each with a delta vs. last month, recent transactions with inline
  bucket editing, and a fast-add row. Extra spending gets visual priority. Fast-add
  must be genuinely fast — it's the thing users do 20x a week.
- **`/app/spending`** — filterable transaction table, 6-month stacked bars by bucket,
  this month's category donut, bulk recategorize.
- **`/app/extra`** — the differentiator. Extra spend vs. rolling 3-month average, top
  5 extra categories as shares of total, an honest annual projection, optional
  per-category limits (warn at 80%, flag at 100%).
- **`/app/debt`** — one card per debt, payoff projections, avalanche vs. snowball
  comparison with months and interest saved, "log payment" action.
- **`/app/savings`** — goal cards with progress rings, required monthly contribution
  to hit a target date, "add to goal" action.
- **`/app/settings`** — income, category CRUD, currency, CSV export, delete account.

## 6. Design direction

Reference points: **vercel.com** for restraint, contrast, and typography;
**incident.io** for section rhythm, tabbed product showcases, and confident headline
structure. Take the discipline from both — do not clone either.

The read: a serious instrument. Dark, quiet, precise. Not a friendly pastel budgeting
app. Not a crypto dashboard.

### Tokens

```
--canvas:        #0B0C0E
--surface:       #141619
--surface-hover: #1B1E22
--border:        #24282D
--text:          #ECEDEE
--text-dim:      #8A9096
--text-faint:    #565C63
--accent:        #7C7BFF
--positive:      #35D0A5
--warn:          #F0A93B
--negative:      #EF5B54
```

Light mode inverts to a warm off-white canvas (`#FAFAFA`), same accent. Ship both,
dark as default. Respect `prefers-color-scheme`.

### Type

- **Geist Sans** for everything textual. Weights 400 / 500 / 600 only.
- **Geist Mono** for every number, currency value, date, and eyebrow label. Tabular
  figures make columns of money legible; the mono/sans split gives the interface its
  voice.
- Scale: 12 / 14 / 16 / 20 / 28 / 40 / 64. Eyebrows at 12px mono, uppercase,
  `letter-spacing: 0.08em`, `--text-faint`.
- Headlines tight: `letter-spacing: -0.02em`, `line-height: 1.05`.

### Layout & surface

- Max content width 1200px; 96–128px between marketing sections.
- Radius 8px on cards, 6px on inputs and buttons. No pills except status chips.
- **Hairline borders instead of shadows.** Elevation comes from surface colour shifts.
- Numbers right-aligned in every table. Currency symbol at the same size as the digits.

### Motion

Restrained. 150ms `ease-out` on hover and state changes. One orchestrated moment: the
Runway Bar segments animate in left-to-right on dashboard load, staggered 60ms.
Nothing else animates on load. Respect `prefers-reduced-motion`.

### Signature element — the Runway Bar

A single full-width horizontal bar representing the month's income, divided into four
proportional segments (essential / extra / debt / saved) with the remainder left as
empty canvas. A thin vertical rule marks today's position in the month. Hovering a
segment lifts it slightly and shows amount and percentage.

It turns "how am I doing" into one glance, and makes overspending physically visible:
when segments exceed the bar width, the bar overflows past its container edge in
`--negative`. Don't clip it. Let it break out.

### Copy rules

- Plain verbs, sentence case, no exclamation marks.
- Never scold. "Extra spending is $340 above your 3-month average" — not "Yikes!"
- Empty states are invitations: "No transactions yet. Add your first one above."
- Errors say what happened and what to do. Never just "Something went wrong."

## 7. Landing page

1. **Hero** — headline about the extra-spending insight, one-sentence subhead, two
   CTAs (`Start free` primary, `See how it works` ghost), then one large dashboard
   screenshot in a subtle bordered frame.
2. **Problem/solution pair** — money disappears and you can't name where; the four
   buckets.
3. **Tabbed feature showcase** — four tabs (Spending / Extra / Debt / Savings), each
   swapping the product screenshot beside it. Real screenshots of our own UI.
4. **Debt payoff section** — the avalanche vs. snowball comparison.
5. **Closing CTA** — one line, one button.
6. **Footer** — minimal.

No fake testimonials, no fake customer logos, no invented statistics. If there's
nothing real to put in a section, leave the section out.

## 8. Build order

Commit after each working piece. Don't start the next phase until the current one is
confirmed.

- **Phase 1 — Foundation.** Next.js + TypeScript + Tailwind scaffold. Geist wired up.
  Design tokens as CSS variables mapped into `tailwind.config.ts`. Dark/light toggle.
  Supabase connected, auth working (signup, login, logout, protected routes). Empty
  `/app` shell with nav.
- **Phase 2 — Data layer.** All tables with RLS policies. Seed default categories on
  signup. Typed Supabase client. Server actions for transaction CRUD.
- **Phase 3 — Dashboard.** Runway Bar, stat tiles, recent transactions, fast-add. If
  adding a transaction isn't fast and satisfying, stop and fix it before moving on.
- **Phase 4 — Spending & Extra.** The two analysis screens, filters, charts.
- **Phase 5 — Debt & Savings.** Debt cards, payoff math, avalanche/snowball, goals.
- **Phase 6 — Landing page.** Only once the app is worth screenshotting.
- **Phase 7 — Polish.** Empty states, loading skeletons, error boundaries, mobile
  pass, keyboard focus states, CSV export.

## 9. Working rules

- Ask before assuming.
- Small commits, clear messages.
- Run `npm run build` before calling a phase done.
- No dead code.
- Explain trade-offs in one sentence when there's a real alternative.
- **Mobile is not optional.** Every screen works at 375px.
- Don't over-engineer. No state management library, no custom abstractions until
  something repeats three times.
- Say when you disagree.

## 10. Out of scope for v1

Bank syncing / Plaid, receipt OCR, shared or household accounts, recurring
transaction automation, investment tracking, native mobile app, notifications or
email digests.
