# Website Plan: Stripe Services Partner (Small Business)

Working name used throughout: **Brightline Payments**. Swap in your real name.

## 1. Context and assumptions

- **Goal of the business:** join the Stripe Partner Ecosystem on the **Services track**. This track is for system integrators, dev agencies, payments providers, and digital agencies that advise on, implement, or deploy Stripe.
- **What Stripe checks (as of the April 2026 program update):**
  - Entry ("Partner" tier) requires an activated Stripe account, not being on the Restricted Businesses list, **at least two certified individuals**, an application (which asks for your company website), and accepting the Partner Ecosystem Agreement.
  - Partners are vetted on technical expertise, business impact, and customer success.
  - Specializations need professional certifications, a record of implementations, validated customer references, and a capabilities assessment.
- **What this means for the site:** it has two jobs.
  1. Win small-business clients directly. Think owner-led businesses with roughly 1–50 employees and up to a few million dollars a year in sales.
  2. Act as the evidence Stripe reviews: certified people, a clear services practice, case studies with numbers, and references.
- The page you linked (`stripe.com/lp/payments/`) currently returns 404. The plan uses `stripe.com/payments` and the partner docs instead.

## 2. Positioning

**One-liner:** "Stripe payments for small businesses, set up right and priced the way you sell."

**Who it's for:** small businesses only. Lead with one or two segments. The tone is plain English with no jargon, and every price is visible.

| Segment | Pain | Stripe products involved |
|---|---|---|
| Local service businesses (clinics, salons, studios, trades) | Deposits, no-shows, card-on-file, paying in person and online | Payment Links, Invoicing, Terminal |
| Small online shops | Checkout drop-off, missing wallets, fraud | Checkout, Link, Radar |
| Memberships and subscription boxes | Recurring plans, failed renewals, pausing and cancelling | Billing, Customer portal |
| Small SaaS and digital tools | Charging per seat, per use, or a mix | Billing (meters), Invoicing, Tax |
| Small businesses switching processors | Fear of losing saved cards and subscribers | Data migration, Billing |

Marketplace payments (Connect) are a later add-on, not a lead offer. They are rarely a first project for a small business, and the price point doesn't fit this audience.

**Differentiators to claim (only if true):** flat, published prices; owners deal with the same senior engineer from start to finish; delivery in days or weeks; and support during local business hours.

### Billing models: fixed and usage-based (a quiet differentiator)

We set up both ways small businesses charge on Stripe:
- **Fixed pricing:** flat monthly or yearly plans, memberships, retainers, and tiered packages (Stripe Billing subscriptions).
- **Usage-based pricing:** pay-per-use, per-seat, per-session, or credits, plus hybrid "base fee + usage" plans (Stripe Billing meters; Metronome for heavier usage cases).

**How to call it out:** subtly, never as a headline or banner.
- **Hero note line:** a short line under the buttons with a small mint dot, such as "Fixed and usage-based billing, set up in Stripe."
- **Services cards:**
  - Billing card: one small "Fixed · Usage-based" chip and one plain sentence.
  - Other cards: a quiet one-line footnote where it applies (for example, invoicing for retainers or metered work).
- **Elsewhere:** a full explanation lives only on `/services/billing`, which compares the two models and covers when to use each.

## 3. Offer packaging (productized services)

Fixed scopes with published prices are easier for small businesses to buy, and easier to turn into case studies. Prices are placeholders set at small-business levels.

| Package | What's included | Example price | Timeline |
|---|---|---|---|
| **Payments Health Check** (entry offer) | Review of the account, checkout, fraud settings, failed payments, and fees; a written fix list | $495 | 1 week |
| **Get Paid Online** | Checkout or Payment Links, wallets, receipts, Tax, testing, go-live | from $1,500 | 1–2 weeks |
| **Billing Setup: fixed or usage-based** | Fixed plans or metered usage (or a hybrid), trials, renewal retries, customer portal, invoices | from $2,500 | 2–4 weeks |
| **Invoicing & Payment Links** | Branded invoices, deposits, card-on-file, reminders, accounting sync | from $750 | 3–5 days |
| **In-person payments** | Card readers or Tap to Pay, synced with online sales | from $1,500 | 1–2 weeks |
| **Switch to Stripe** | Moving saved cards and subscriptions from another processor, with a cutover plan | from $2,500 | 2–4 weeks |
| **Care Plan** (monthly) | Monitoring, fraud tuning, API upgrades, a monthly report, and support hours | from $299 / month | Ongoing |
| *Marketplaces (Connect)* (add-on) | Seller onboarding and payouts | quoted | 4–8 weeks |

Use a Stripe Payment Link or Checkout to take payment for the Health Check. You get a working example of your own work on the site, and it's an easy first sale.
## 4. Sitemap

```
/                         Home
/services                 Services overview
  /services/checkout      Get paid online
  /services/billing       Billing: fixed & usage-based (explains both models)
  /services/invoicing     Invoicing & payment links
  /services/terminal      In-person payments
  /services/migration     Switch to Stripe
  /services/care          Care plans
/solutions                By small-business type (local services, online shops, memberships, small SaaS)/health-check             Lead magnet landing page + paid audit checkout
/work                     Case studies index
  /work/[slug]            Case study detail
/pricing                  Packages and how we quote
/about                    Team, certifications, process, values
/resources                Blog / guides / checklists
/contact                  Book a call + project brief form
/legal/privacy, /legal/terms, /legal/trademarks
```

Main nav: Services, Solutions, Work, Pricing, About, Resources, plus a **Book a call** button.

## 5. Page designs (wireframe level)

### Home
1. **Hero.** Headline: "Stripe, set up right the first time." Subhead: "We're a small team of certified Stripe developers who help small businesses take payments online, in person, and on repeat, without the tech headaches." Buttons: **Book a free 20-min call** and **Get a Payments Health Check**. Note line under the buttons: "• Fixed and usage-based billing, set up in Stripe · Flat project prices · You always own your account" (the billing part has a small mint dot). Visual: a stylized flow diagram (Checkout → Radar → Billing → Payouts) built from your own UI, not Stripe screenshots. The Billing node reads "Fixed plans · usage metering."
2. **Trust strip.** Certification badges (only once earned), small-business client logos, and a quick stat ("N small businesses launched").
3. **Problems we fix.** Six cards: checkout drop-off, failed renewals, chasing invoices, fraud and disputes, sales tax, switching processors.
4. **Services grid.** Six cards, each with a "from $" price. The Billing card carries a small "Fixed · Usage-based" chip. Other cards get a quiet footnote where relevant.
5. **How we work.** Four steps: Discover (free call) → Plan (fixed quote) → Build and test → Launch and support.
6. **Featured case study.** A small-business story with before/after numbers (for example: a 9-person studio moved to hybrid membership + pay-per-class billing and cut failed renewals by 41%).
7. **Packages preview.** Three cards: Health Check, Get Paid Online, Care Plan.
8. **Team.** Photos and certifications. Small businesses win on trust in named people.
9. **FAQ.** Do you handle card data? (No, Stripe-hosted fields keep you in the lightest PCI scope.) Do you work with my platform (Shopify, WooCommerce, custom)? Who owns the Stripe account? (You do, always.)
10. **Final call to action** and footer with the trademark disclaimer.

### Service detail page (template)
Hero with outcome headline → who it's for → what's included (checklist) → deliverables and timeline → related case study → price anchor ("from $") → FAQ → call to action. Each page targets one search intent (for example "Stripe subscriptions setup for small business").

### Billing page (`/services/billing`)
This is the one place the billing models get full space. It has a side-by-side comparison: **Fixed** (flat plans, memberships, retainers) and **Usage-based** (per use, per seat, credits). Below that are a "Hybrid: base fee + usage" row, a short "which fits you?" guide with three questions, example invoices for each model, and the price and timeline.

### Health Check landing page
A focused page with no main nav. It covers: what we review (15-point checklist), a sample report preview (blurred PDF pages), the price and turnaround, a pay-now button using Stripe Checkout, and a guarantee ("If we don't find at least $X/yr in savings or recovered revenue, it's free"; only offer this if you can honor it).

### Case study page
Client and industry → challenge → Stripe products used (as text tags) → what we built → results (3 big numbers) → client quote with name and photo → "Start a similar project" button. Get written client approval. These double as your **validated customer references** for Stripe specializations.

### About page
Founder story, team cards with certification names and verification links, and a "Stripe Partner Ecosystem" section (once accepted). Also covers the delivery process, security practices (least-privilege restricted API keys, no card data on our systems, NDAs on request), and location and hours.

### Contact page
Two paths: a **calendar booking** (Cal.com or Calendly) and a **project brief form** with these fields: name, work email, company, website, current processor, monthly volume range, products of interest (checkboxes), timeline, budget range, and notes. Send an auto-reply with next steps and a link to the Health Check.

## 6. Visual design system

The look should be trustworthy and technical without copying Stripe's brand. Avoid their signature gradient wave, their logo as decoration, and anything that implies you are Stripe.

- **Color:** deep ink navy `#0B1B3A` for text and dark sections, electric indigo `#4F46E5` as the primary accent, mint `#10B981` for success and metrics, warm off-white `#F7F7FB` for the background, and slate `#64748B` for secondary text.
- **Type:** Inter (or a system sans) for UI and body text. Use one display weight (700) for headlines and JetBrains Mono for small code and metric accents.
- **Shape and spacing:** 12px corner radius, soft shadows, an 8px spacing grid, and a 1200px max content width.
- **Imagery:** real team photos plus custom UI-style illustrations (flow diagrams, dashboard snippets). No stock photos of handshakes.
- **Components:** button (primary/secondary), service card, metric card, step timeline, pricing card, logo strip, FAQ accordion, testimonial, product tag chips, and a callout banner.
- **Accessibility:** meet WCAG 2.2 AA. Keep contrast at 4.5:1 or better, show visible focus states, support reduced motion, and use semantic headings.

## 7. Trust, legal, and brand compliance

- **Don't call yourself a "Stripe Partner" or use the Partner badge until you're accepted.** After acceptance, follow Stripe's co-branding guidelines from the partner portal.
- Before acceptance, use factual wording such as "We build on Stripe" or "Stripe-certified developers" (only once the certifications are earned). Write Stripe product names as plain text.
- Add a footer disclaimer: "Stripe is a trademark of Stripe, Inc. Brightline Payments is an independent company and is not affiliated with Stripe, Inc. unless stated."
- **PCI and data:** say clearly that clients' card data stays with Stripe (Checkout, Elements, Terminal) and that you never store it. Use restricted API keys and the client's own account ownership.
- Required pages: privacy policy, terms, a cookie notice if you use analytics cookies, and a statement of work and MSA template ready for sales.

## 8. SEO and content

- **Target keywords:** "Stripe developer for hire", "Stripe consultant", "Stripe integration agency", "Stripe for small business", "Stripe Billing setup", "Stripe usage-based billing setup", "migrate to Stripe from [processor]", "Stripe Terminal setup", plus local modifiers ("Stripe developer Chicago").
- **Content pillars (two posts a month):**
  - Checkout conversion
  - Subscriptions and dunning
  - Fixed vs usage-based pricing for small businesses
  - Fraud and disputes
  - Migrations
  - Stripe product updates explained for owners
- **Lead magnets:** "Stripe Launch Checklist" (PDF), a "Failed Payment Recovery Calculator" (simple interactive tool), a "Fixed or Usage-Based?" one-page guide, and the Health Check.
- **Technical SEO:** a static or SSR site, `Organization` and `Service` schema, FAQ schema, fast Core Web Vitals (LCP under 2s), and one H1 per page.

## 9. Conversion and analytics

- Primary conversions are booked calls, project briefs, and Health Check purchases. The secondary conversion is checklist downloads.
- Use privacy-friendly analytics (Plausible or GA4 with consent). Track button clicks, form starts and completions, and Checkout success.
- Send leads to a CRM (HubSpot free or Pipedrive), tagged by product interest and volume. Later, register qualified deals in Stripe's **deal registration** to get co-selling support.

## 10. Tech stack

| Need | Recommendation |
|---|---|
| Site framework | Astro (or Next.js) with Tailwind CSS |
| CMS | MDX in the repo, or a headless CMS (Sanity, Contentful) if non-developers edit |
| Hosting | Vercel or Netlify with a CDN and preview deploys |
| Forms | Server action or Formspree → CRM webhook; spam protection with Cloudflare Turnstile |
| Booking | Cal.com or Calendly embed |
| Payments on the site | Stripe Payment Links or Checkout for the Health Check and retainer deposits; Stripe Invoicing for projects |
| Email | Resend or Postmark for transactional mail; a newsletter tool for content |

## 11. Roadmap (aligned with the partnership)

| Phase | Weeks | Website work | Partnership work |
|---|---|---|---|
| 0. Foundation | 1–2 | Brand, Home, Services overview, Contact, Legal | Activate the Stripe account; two team members start certification training |
| 1. Proof | 3–6 | Health Check page with live Checkout, 2–3 service pages, first case study (a pilot or discounted client is fine if disclosed) | Earn certifications; finish 2–3 real implementations |
| 2. Apply | 6–8 | About page with certifications, Work index, Pricing | Submit the partner application with the website as evidence |
| 3. Partner | After acceptance | Add the Partner badge per guidelines, a partner directory link, and co-branded campaign pages | Get listed in the directory, use deal registration and marketing assets |
| 4. Specialize | 6–12 months | Industry solution pages, more case studies, verified references | Pursue a specialization through your PDM; aim for Premier |

## 12. Success metrics

- 3–5 qualified leads a month by month 3 and 10+ by month 6
- A 25%+ booking rate from service-page visitors who start a form
- 5+ Health Checks sold in the first quarter, with at least 30% converting to a project
- 3 published case studies with client approval before applying for a specialization
