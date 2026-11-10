# Brightline Payments site

Marketing site for a small-business Stripe services partner. Built with Next.js (App Router), TypeScript, Tailwind CSS 4, and [shadcn/ui](https://ui.shadcn.com) components. The design follows `../index.html`; the full spec is in `../SPEC.md`.

## Run it

```bash
npm install
cp .env.example .env.local   # optional; the site runs without any keys
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` |
| `npm test` | Vitest unit and component tests |
| `npm run test:e2e` | Playwright on desktop and iPhone 13 viewports (starts `npm start` on port 3100 if nothing is running; run `npm run build` first) |
| `npm run check` | Lint, typecheck, unit tests, and build |

Playwright uses its own browsers (`npx playwright install chromium`). To use an installed Chrome instead, set `PLAYWRIGHT_CHROMIUM_PATH=/usr/bin/google-chrome`. Set `E2E_STRIPE=1` with Stripe test keys to also run the full test-mode checkout.

## Where things live

- `src/content/` – all copy, prices, case studies, team, and posts as typed data, validated with zod at build time. A case study must have `approvedByClient: true` or `draft: true`.
- `src/content/site.ts` – `partnerStatus` (keep `"none"` until Stripe accepts the application; it controls every partner mention), the preview banner, and feature flags.
- `src/components/ui/` – shadcn/ui components (add more with `npx shadcn@latest add <name>`).
- `src/components/marketing/` – page sections. The billing callout is driven only by the `billingModels` and `footnote` fields in `src/content/services.ts`.
- `src/app/api/checkout` – creates the Health Check Checkout Session. `src/app/api/stripe/webhook` verifies signatures and fulfills `checkout.session.completed` once per event.
- `src/app/(site)/contact/actions.ts` – project brief server action (validation, rate limit, Turnstile, HubSpot, Resend).

## Stripe setup

1. Create a product "Payments Health Check" with a one-time $495 price, and put the price ID in `STRIPE_PRICE_HEALTH_CHECK`.
2. Add a webhook endpoint at `https://<domain>/api/stripe/webhook` for `checkout.session.completed`, and put its signing secret in `STRIPE_WEBHOOK_SECRET`.
3. Locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

The rate limiter and processed-event store are in memory per server instance. Use a shared store (for example Vercel KV or Redis) before running more than one instance.

## Before launch

Replace the placeholder names, logos, numbers, and certifications, then set `previewBanner: false` in `src/content/site.ts`.
