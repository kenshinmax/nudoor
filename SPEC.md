# Spec: Brightline Payments Website (React)

| | |
|---|---|
| Status | Draft v1 |
| Source | `PLAN.md` (strategy, sitemap, copy direction), `index.html` (visual reference for the homepage) |
| Stack | React with Next.js (App Router), TypeScript, Tailwind CSS, Stripe |
| Owner | Founder / lead engineer |

## 1. Summary

Build the marketing website for Brightline Payments, a small Stripe services firm that serves small businesses. The site must:

1. Turn small-business visitors into booked calls, project briefs, and paid Health Checks.
2. Act as public evidence for the Stripe Partner Ecosystem (Services track) application: certified team, clear services, case studies, references.
3. Mention fixed and usage-based billing quietly, only in the hero note line and on the services cards, with full detail on `/services/billing`.

**Why Next.js:** it's a React framework that gives server rendering and static pages for SEO, server-side routes for Stripe Checkout and webhooks, and server actions for forms, all in one deploy. A plain client-only React app (Vite) would need a separate backend and a prerender step for SEO, so it's not the default.

## 2. Goals and non-goals

**Goals**
- Launch the Phase 0–1 pages from the roadmap within 4–6 weeks.
- Take a real payment for the Health Check through Stripe Checkout.
- Let a non-developer edit services, prices, case studies, and posts in content files.
- Enforce brand compliance in code: no partner badge or "Stripe Partner" wording until it's switched on.
- Lighthouse 95+ for Performance, Accessibility, Best Practices, and SEO on the home page (mobile).

**Non-goals (v1)**
- Client login or portal.
- A headless CMS (content lives in the repo; revisit when someone outside engineering edits often).
- Multi-language support.
- Marketplace (Connect) landing pages beyond a short "add-on" mention.

## 3. Audience and key journeys

The audience is owners and operators of small businesses (1–50 people): local services, small online shops, memberships, small SaaS, and businesses switching processors.

| # | Journey | Entry | Success event |
|---|---|---|---|
| J1 | Book a free call | Any "Book a call" button | `call_booked` (booking embed confirms) |
| J2 | Send a project brief | `/contact` form | `brief_submitted` (server accepted) |
| J3 | Buy a Health Check | `/health-check` → Stripe Checkout | `checkout.session.completed` webhook |
| J4 | Learn about billing models | Billing card or hero note → `/services/billing` | `billing_page_view` then J1 or J2 |
| J5 | Download a lead magnet | Resource page | `lead_magnet_downloaded` |

## 4. Routes and page requirements

| Route | Render | Requirements |
|---|---|---|
| `/` | Static | Sections in this order: Hero (with billing note line), Trust strip, Problems, Services grid, How we work, Featured case study, Packages preview, Team, FAQ, Final CTA. Matches `index.html`. |
| `/services` | Static | Grid of all services from content; same `ServiceCard` as home. |
| `/services/[slug]` | Static (generated from content) | Template: hero → who it's for → what's included → deliverables and timeline → related case study → "from $" price → FAQ → CTA. Slugs: `checkout`, `billing`, `invoicing`, `terminal`, `migration`, `care`. |
| `/services/billing` | Static | Same template plus a `BillingModelsCompare` block: Fixed vs Usage-based vs Hybrid, a 3-question "which fits you?" guide, and example invoice snippets. This is the only page where billing models get headline-level space. |
| `/solutions/[segment]` | Static | Segments: `local-services`, `online-shops`, `memberships`, `small-saas`. Pain points, relevant services, one case study, CTA. |
| `/health-check` | Static + server action | Focused layout (no main nav, logo links home). Checklist, sample report preview, price, guarantee text (behind a content flag), "Buy now" button → `POST /api/checkout`. |
| `/health-check/success` | Dynamic | Reads `session_id`, fetches the session server-side, shows a confirmation and a booking embed for the kickoff call. Never trusts query params alone. |
| `/work` | Static | Case study cards, filterable by segment (client-side filter, no reload). |
| `/work/[slug]` | Static | Client, segment, challenge, products (tags), what we built, 3 metrics, quote, CTA. Must show `approvedByClient: true` in content to be published (build fails otherwise). |
| `/pricing` | Static | All packages, how quoting works, FAQ. |
| `/about` | Static | Founder story, team with certifications (only `earned: true` shown), process, security practices, partner section (only if partner status allows). |
| `/resources`, `/resources/[slug]` | Static | MDX posts and lead magnets. |
| `/contact` | Static + server action | Booking embed and project brief form (see §7.2). |
| `/legal/privacy`, `/legal/terms`, `/legal/trademarks` | Static | MDX. |
| `/api/checkout` | Route handler | See §7.1. |
| `/api/stripe/webhook` | Route handler | See §7.1. |
| `sitemap.xml`, `robots.txt` | Generated | From the route list and content. |
| 404 / error | Static | Branded, with links to Services and Contact. |

**Navigation:** Services, Solutions, Work, Pricing, About, Resources, plus a primary "Book a call" button. On screens under 960px, show a menu button that opens an accessible drawer (focus trap, Escape to close, `aria-expanded`). The prototype hides the nav on mobile; production must not.

## 5. Billing-model callout (fixed and usage-based)

This is a deliberate, subtle callout. Rules:

1. **Hero note line:** the first item in the note under the hero buttons reads "Fixed and usage-based billing, set up in Stripe". It has a 7px mint dot before it, uses 13–14px slate text, and is not a link styled as a button. It may be a plain text link to `/services/billing` with an underline on hover only.
2. **Billing service card:** shows a `BillingModelTag` with "Fixed · Usage-based" in 12px mono, mint-700 text, and a small dot. One plain sentence in the description: "Charge a flat monthly fee, bill for what customers use, or combine both."
3. **Other service cards:** show an optional one-line `footnote` from content (for example, Invoicing: "Works for flat retainers or metered hours."). At most two non-billing cards show a footnote.
4. **Not allowed:** banners, badges in the header, a homepage section about billing models, or bold or colored headlines about it anywhere except `/services/billing`.
5. **Hero diagram:** the Billing node subtitle reads "Fixed plans · usage metering".

These are driven by content fields (`billingModels`, `footnote`), not hard-coded in components.

## 6. Architecture

```
Browser ──► Next.js on Vercel (static pages at the CDN edge)
              ├─ Server actions: brief form, newsletter
              ├─ /api/checkout ──────────► Stripe API (Checkout Session)
              ├─ /api/stripe/webhook ◄──── Stripe events
              │        └─► Resend (emails) + HubSpot (CRM)
              └─ Booking embed (Cal.com) loaded client-side on demand
```

**Libraries**

| Concern | Choice |
|---|---|
| Framework | Next.js latest stable, App Router, React Server Components by default |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS with design tokens from §9 in the theme; `clsx` for class composition |
| Content | MDX for long-form (case studies, posts, legal) via `@next/mdx` or Velite; typed TS data files for services, packages, team, FAQ |
| Validation | `zod` for content schemas, form input, and env vars |
| Payments | `stripe` (Node SDK), server only |
| Email | Resend (transactional) |
| CRM | HubSpot Forms or CRM API |
| Spam | Cloudflare Turnstile on forms |
| Analytics | Plausible (no cookies) by default; GA4 only behind consent |
| Fonts | `next/font` with Inter and JetBrains Mono, self-hosted, `display: swap` |
| Images | `next/image`, AVIF/WebP |

**Client components** are limited to: mobile nav drawer, FAQ accordion (or native `<details>`, preferred), work filter, booking embed loader, and the Health Check buy button. Everything else renders on the server.

### Directory structure

```
/app
  layout.tsx                 # fonts, header, footer, analytics
  page.tsx                   # home
  services/page.tsx
  services/[slug]/page.tsx
  solutions/[segment]/page.tsx
  health-check/page.tsx
  health-check/success/page.tsx
  work/page.tsx
  work/[slug]/page.tsx
  pricing/page.tsx
  about/page.tsx
  resources/page.tsx
  resources/[slug]/page.tsx
  contact/page.tsx
  contact/actions.ts         # submitBrief server action
  legal/[slug]/page.tsx
  api/checkout/route.ts
  api/stripe/webhook/route.ts
  sitemap.ts
  robots.ts
  not-found.tsx
/components
  layout/   SiteHeader, MobileNav, SiteFooter
  marketing/ Hero, HeroNote, FlowDiagram, TrustStrip, ProblemGrid, ServiceCard,
             BillingModelTag, StepsTimeline, CaseStudyFeature, MetricCard,
             PricingCard, TeamCard, FaqList, CtaSection, BillingModelsCompare
  ui/       Button, Tag, Card, Section, SectionHeader, Container
  brand/    PartnerBadge, CertificationBadge
/content
  services.ts  packages.ts  team.ts  faq.ts  segments.ts  site.ts
  work/*.mdx   resources/*.mdx   legal/*.mdx
/lib
  content.ts   # loaders + zod validation (build fails on invalid content)
  stripe.ts    # server-only Stripe client
  env.ts       # zod-validated env
  analytics.ts
  crm.ts  email.ts
/tests
  unit/  e2e/
```

## 7. Functional requirements

### 7.1 Health Check purchase (Stripe Checkout)

- The buy button posts to `POST /api/checkout` with no client-supplied price or amount.
- The server creates a Checkout Session:
  - `mode: 'payment'`, `line_items: [{ price: env.STRIPE_PRICE_HEALTH_CHECK, quantity: 1 }]`
  - `success_url: {SITE_URL}/health-check/success?session_id={CHECKOUT_SESSION_ID}`
  - `cancel_url: {SITE_URL}/health-check`
  - `automatic_tax: { enabled: true }` if Stripe Tax is on (config flag)
  - `customer_creation: 'always'`, `allow_promotion_codes: true`
  - Collects company name through `custom_fields`
- It responds with a 303 redirect to `session.url`. It is rate limited to 10 requests per minute per IP.
- `POST /api/stripe/webhook`:
  - Reads the raw body and verifies `Stripe-Signature` with `STRIPE_WEBHOOK_SECRET`. On failure it returns 400.
  - Handles `checkout.session.completed`: it sends a confirmation email to the customer and a notification to the team, and creates or updates the CRM contact with `source=health_check`.
  - Is idempotent: it stores processed event IDs (Vercel KV or the CRM's note field) and skips duplicates.
  - Returns 200 quickly and does slow work after the response or with retries.
- Fallback: if `STRIPE_PAYMENT_LINK_HEALTH_CHECK` is set and the API route is disabled, the button links to the Payment Link instead.
- Everything runs in Stripe **test mode** outside production (separate keys per environment).

### 7.2 Project brief form (`/contact`)

| Field | Type | Rules |
|---|---|---|
| Name | text | required, 2–80 chars |
| Work email | email | required, valid format |
| Company | text | required |
| Website | url | optional |
| Business type | select | Local services, Online shop, Memberships, Small SaaS, Other |
| Current processor | select | None, Stripe, Square, PayPal, Other |
| Monthly volume | select | Under $10k, $10–50k, $50–250k, $250k+ |
| Interested in | checkboxes | Get paid online, Billing (fixed), Billing (usage-based), Invoicing, In-person, Switch to Stripe, Care plan |
| Timeline | select | ASAP, 1–3 months, Exploring |
| Budget | select | Under $1.5k, $1.5–5k, $5–15k, $15k+ |
| Notes | textarea | optional, max 2,000 chars |
| Turnstile token | hidden | required, verified server-side |

- It submits through a server action and validates with the same zod schema on the client (for inline errors) and the server (as the source of truth).
- On success, it shows a confirmation inline. It sends an auto-reply with next steps and a Health Check link, creates a CRM contact tagged with interests (including `billing_fixed` and `billing_usage`), and emails the team.
- Errors are shown next to each field and announced through `aria-live`. Submitting twice within 30 seconds is ignored.
- It works without JavaScript (progressive enhancement).

### 7.3 Booking

- Cal.com embed for a 20-minute call. It loads only when it scrolls into view or someone clicks "Book a call" (keeps the JS budget).
- It fires `call_booked` on the embed's booking-success event.

### 7.4 Partner status and certifications (compliance)

`content/site.ts`:

```ts
export const site = {
  name: 'Brightline Payments',
  partnerStatus: 'none' as 'none' | 'partner' | 'premier',
  // ...
};
```

- `PartnerBadge` renders nothing when `partnerStatus === 'none'`. Partner wording in the footer and FAQ switches based on the same value.
- `team.ts` certifications have `{ name, earned: boolean, verifyUrl?: string }`. Only `earned: true` appear anywhere.
- The footer always shows the trademark disclaimer.
- A unit test enforces both rules (see §12).

### 7.5 Content model

```ts
type BillingModel = 'fixed' | 'usage';

interface Service {
  slug: 'checkout' | 'billing' | 'invoicing' | 'terminal' | 'migration' | 'care';
  order: number;
  title: string;
  summary: string;              // one-line card description
  stripeProducts: string[];     // shown as tags, plain text names
  billingModels?: BillingModel[]; // renders BillingModelTag when present
  footnote?: string;            // quiet one-liner on the card
  priceFrom: number;            // USD
  priceUnit?: 'one-time' | 'month';
  timeline: string;
  includes: string[];
  faq: { q: string; a: string }[];
  segments: Segment[];
}

interface Package {
  id: 'health-check' | 'get-paid-online' | 'care-plan';
  title: string; tagline: string;
  price: number; priceSuffix: string;
  features: string[];
  cta: { label: string; href: string } | { label: string; action: 'checkout' };
  featured?: boolean;
}

interface CaseStudy {           // MDX frontmatter
  slug: string; client: string; segment: Segment;
  headline: string; summary: string;
  products: string[];
  metrics: { value: string; label: string }[]; // exactly 3 or 4
  quote?: { text: string; name: string; role: string };
  approvedByClient: boolean;    // must be true to publish
  featured?: boolean;
}

interface TeamMember {
  name: string; role: string; photo: string;
  certifications: { name: string; earned: boolean; verifyUrl?: string }[];
}

type Segment = 'local-services' | 'online-shops' | 'memberships' | 'small-saas';
```

Initial service data (prices are placeholders from the plan):

| slug | title | priceFrom | billingModels | footnote |
|---|---|---|---|---|
| checkout | Get paid online | 1500 | none | none |
| billing | Subscriptions & billing | 2500 | `['fixed','usage']` | none |
| invoicing | Invoicing & deposits | 750 | none | "Works for flat retainers or metered hours." |
| terminal | In-person payments | 1500 | none | none |
| migration | Switch to Stripe | 2500 | none | "Keeps existing fixed or usage-based plans intact." |
| care | Care plans | 299 / month | none | none |

## 8. Component specs (key ones)

| Component | Props | Notes |
|---|---|---|
| `Button` | `variant: 'primary' \| 'secondary'`, `href?`, `size?: 'sm' \| 'md'` | Renders `<a>` or `<button>`; pill shape; `white-space: nowrap`; visible 3px indigo focus ring. |
| `HeroNote` | `items: string[]`, `highlightFirst?: boolean` | Joins items with " · ". When `highlightFirst`, the first item gets the mint dot. |
| `FlowDiagram` | `nodes: { title, subtitle, pill }[]`, `metrics: { value, label }[]` | Decorative; `role="img"` with an `aria-label`; no Stripe screenshots or logos. |
| `ServiceCard` | `service: Service` | Order: number icon, title, summary, tags, `BillingModelTag` (if any), footnote (if any), price, "Learn more" link. |
| `BillingModelTag` | `models: BillingModel[]` | Renders "Fixed · Usage-based" (labels map: fixed → "Fixed", usage → "Usage-based"). 12px mono, mint-700, 7px dot. Returns `null` for an empty array. |
| `BillingModelsCompare` | none (reads content) | Three columns (Fixed, Usage-based, Hybrid) that stack on mobile: who it fits, examples, what we set up in Stripe, an example invoice. |
| `PricingCard` | `pkg: Package` | `featured` adds a 2px indigo border and a "Most popular" label. The checkout action renders a `<form method="post" action="/api/checkout">`. |
| `CaseStudyFeature` | `study: CaseStudy` | Dark ink panel, metrics grid, quote. |
| `TeamCard` | `member: TeamMember` | Filters to earned certifications. |
| `PartnerBadge` | none | Reads `site.partnerStatus`; `null` when `'none'`. |
| `FaqList` | `items: {q,a}[]` | Native `<details>/<summary>`; emits `FAQPage` JSON-LD on pages that use it. |
| `MobileNav` | `links` | Client component; focus trap, Escape closes, body scroll lock. |

## 9. Design tokens

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B1B3A` | Text, dark panels |
| `indigo` / `indigo-700` | `#4F46E5` / `#4338CA` | Primary buttons, links, accents |
| `mint` / `mint-700` | `#10B981` / `#047857` | Success, metrics, billing-model dot and text |
| `bg` | `#F7F7FB` | Page background |
| `slate` | `#64748B` | Secondary text |
| `line` | `#E5E7F0` | Borders |
| Radius | 12px cards, 999px buttons and pills, 24px feature panels | |
| Spacing | 8px grid; sections 88px vertical (64px under 620px) | |
| Container | 1200px max, 24px gutters | |
| Type | Inter 400/600/700/800; JetBrains Mono 600 for eyebrows, tags, metrics | H1 `clamp(36px, 5vw, 58px)` |
| Breakpoints | 620px, 960px | 3 columns → 2 → 1 |

Use the brand from `index.html` exactly. Do not use Stripe's logo, gradient wave, or anything that implies you are Stripe.

## 10. SEO

- Each page sets `title`, `description`, canonical, and Open Graph through the Next.js `metadata` API. OG images are generated per page with `next/og`.
- JSON-LD:
  - `Organization` and `ProfessionalService` (with `areaServed`) on every page.
  - `Service` (with `offers.price`) on service pages.
  - `FAQPage` wherever FAQs render.
  - `Article` on posts.
- One `<h1>` per page and a logical heading order.
- `sitemap.ts` includes every static and content route. `robots.ts` allows everything except `/api` and `/health-check/success`.
- Target keywords per page come from `PLAN.md` §8 (for example `/services/billing` targets "Stripe usage-based billing setup" and "Stripe subscriptions for small business").

## 11. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Mobile LCP under 2.0s, CLS under 0.05, INP under 200ms; home page first-load JS under 90KB gzip; no layout shift from fonts. |
| Accessibility | WCAG 2.2 AA; contrast 4.5:1 or better (the mint-700 tag text passes on white); full keyboard support; `prefers-reduced-motion` respected; axe shows 0 serious or critical issues. |
| Browsers | Last 2 versions of Chrome, Safari, Firefox, and Edge; iOS Safari 16+. |
| Security | Secret keys only on the server (`server-only` import guard); strict CSP (allow Stripe, Cal.com, Turnstile, Plausible); HSTS; forms rate limited; webhook signature verified; no card data touches this site. |
| Privacy | No cookies by default (Plausible). If GA4 is enabled, a consent banner is required before loading. The privacy policy lists processors: Stripe, Resend, HubSpot, Cal.com, Cloudflare. |
| Reliability | Static pages served from the CDN; API routes return friendly errors; the webhook tolerates retries. |

### Environment variables (validated at build and boot)

```
NEXT_PUBLIC_SITE_URL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_HEALTH_CHECK
STRIPE_PAYMENT_LINK_HEALTH_CHECK   # optional fallback
STRIPE_TAX_ENABLED                 # "true" | "false"
RESEND_API_KEY
HUBSPOT_TOKEN
TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY
NEXT_PUBLIC_CAL_LINK
NEXT_PUBLIC_PLAUSIBLE_DOMAIN
```

## 12. Testing and acceptance

**Unit and component tests (Vitest + React Testing Library)**
- `BillingModelTag` renders "Fixed · Usage-based" for `['fixed','usage']` and nothing for `[]` or `undefined`.
- `ServiceCard` shows the tag only for the billing service and the footnote only when it is set.
- On the home page, the hero note contains "Fixed and usage-based billing". The phrase appears nowhere else on `/`, except the billing card and the two allowed footnotes (enforces §5).
- `PartnerBadge` returns `null` when `partnerStatus` is `'none'`. No rendered page contains "Stripe Partner" text when the status is `'none'`.
- Team cards never show certifications with `earned: false`.
- Content loader: the build fails when a case study has `approvedByClient: false` and isn't marked draft, or when a service is missing required fields.
- Brief-form zod schema: valid and invalid cases for every field.

**End-to-end tests (Playwright, desktop and iPhone 13 viewport)**
- Home renders every section in order. The mobile menu opens, traps focus, and closes on Escape.
- Health Check: clicking Buy redirects to `checkout.stripe.com` (test mode). Completing with test card `4242 4242 4242 4242` lands on `/health-check/success` with a confirmation.
- Webhook: replay `checkout.session.completed` with the Stripe CLI (`stripe trigger`); the email and CRM calls fire once; a duplicate event is ignored.
- Brief form: an empty submit shows inline errors; a valid submit shows the confirmation (CRM and email mocked).
- Every page returns 200 and is in the sitemap; there are no broken internal links.

**Quality gates in CI (GitHub Actions on every PR)**
- `tsc --noEmit`, ESLint, and Prettier.
- Unit tests and Playwright on a preview deploy.
- Lighthouse CI on `/`, `/services/billing`, and `/health-check` (mobile): every category 95 or higher, plus the JS budget in §11.
- An axe scan on all routes.

**Definition of done (v1)**
- [ ] All Phase 0–1 routes live: `/`, `/services`, the six service pages, `/health-check` (+ success), `/work` with one approved case study, `/pricing`, `/about`, `/contact`, legal pages.
- [ ] A real Health Check purchase works in production and triggers emails and a CRM record.
- [ ] Billing callout rules in §5 pass their automated checks and a visual review against `index.html`.
- [ ] Partner and certification compliance checks pass.
- [ ] CI gates are green; Lighthouse and axe targets are met.

## 13. Milestones

| Milestone | Scope | Estimate |
|---|---|---|
| M1 Foundation | Repo, Next.js + Tailwind + tokens, layout, header and mobile nav, footer, content schemas, CI | 1 week |
| M2 Home + Services | Home page (matching `index.html`), `/services`, service template, billing page with `BillingModelsCompare` | 1–1.5 weeks |
| M3 Conversions | Contact form + CRM + email, Cal.com embed, Health Check with Checkout + webhook | 1 week |
| M4 Proof pages | Work index and detail, About, Pricing, Solutions, Resources, legal | 1 week |
| M5 Launch hardening | SEO and JSON-LD, OG images, CSP, analytics, Lighthouse and axe fixes, production Stripe keys | 0.5–1 week |
| Post-acceptance | Set `partnerStatus: 'partner'`, add the official badge per Stripe co-branding guidelines, partner directory link | 0.5 day |

## 14. Open questions

1. Final business name, domain, and logo.
2. Which 1–2 small-business segments to lead with on the home page?
3. Will the Health Check guarantee ("free if we don't find $X/yr") be offered? It's behind a content flag until decided.
4. CRM choice: HubSpot (assumed) or Pipedrive?
5. Is Stripe Tax needed on the Health Check sale in your region?
6. Who edits content after launch? If not a developer, plan a headless CMS in v1.1.
