# AutoParts KSA — landing page demo

A production-quality, single-page storefront demo for a Saudi automotive spare
parts business. Visitors identify their car (make → model → year → engine, or
VIN), compare three quality tiers, browse parts that fit, and add them to a
cart. There is **no backend** — all data is mock data served from the client.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static, prerendered)
npm run start    # serve the production build
npm run lint     # eslint (must finish with zero errors)
```

Node 20+ recommended. `npm run lint` and `npm run build` both pass cleanly.

## Stack

| Concern    | Choice                                                             |
| ---------- | ------------------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, `cacheComponents`, Turbopack)               |
| UI         | React 19, TypeScript (strict)                                       |
| Styling    | Tailwind CSS v4 — CSS-first `@theme` tokens in `src/app/globals.css` |
| Type       | Plus Jakarta Sans (variable, self-hosted through `next/font`)        |
| Icons      | `lucide-react`                                                      |
| Animation  | CSS transitions and keyframes only (no animation library)           |
| State      | One React context (`src/lib/store.tsx`) + `localStorage`            |

Everything is rendered on the server and hydrated on the client; the page is
prerendered as a single static route.

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata, JSON-LD, header/footer, providers
│   ├── page.tsx          # composes the page sections in order
│   └── globals.css       # design tokens, base styles, reduced motion
├── components/
│   ├── layout/           # announcement bar, header, cart drawer, footer, WhatsApp
│   ├── sections/         # one file per page section
│   ├── products/         # product card + quality tier selector
│   ├── vehicle/          # vehicle finder, VIN form, VIN help dialog
│   ├── illustrations/    # inline SVG artwork (hero, products, VIN)
│   └── ui/               # Button, Container, Section, SelectField, Dialog, ToastHost
├── content/
│   ├── copy.ts           # every headline, paragraph and FAQ answer
│   └── site.ts           # brand, contact, legal, payment and footer links
├── data/
│   └── mock.ts           # makes/models/years/engines, categories, products, VIN map
└── lib/
    ├── store.tsx         # vehicle + cart + filters + toast (localStorage-backed)
    ├── navigation.ts     # section ids, scroll and focus helpers
    ├── vin.ts            # VIN normalisation and validation
    ├── format.ts         # SAR currency formatting, vehicle labels
    ├── storage.ts        # safe localStorage/sessionStorage wrappers
    └── finderBus.ts      # "popular make" requests → the vehicle finder
```

## Where to change things

| You want to change…            | Edit                                                |
| ------------------------------ | --------------------------------------------------- |
| Headlines, body copy, FAQ      | `src/content/copy.ts`                               |
| Brand, phone, email, WhatsApp  | `src/content/site.ts`                               |
| Payment / delivery names       | `src/content/site.ts`                               |
| Vehicles, categories, products | `src/data/mock.ts`                                  |
| Colours, type scale, radius, shadows | `src/app/globals.css` (`@theme` block)        |
| Button styles (all actions)    | `src/components/ui/Button.tsx`                      |
| Section order                  | `src/app/page.tsx`                                  |
| Nav / footer anchors           | `src/lib/navigation.ts` + `src/content/site.ts`      |
| SEO title and description      | `src/app/layout.tsx`                                |

### Design tokens

Everything visual is driven by the `@theme` block in `src/app/globals.css`:

- **Type scale** — `text-2xs` (11px) through `text-6xl` (56px), each with a
  paired line-height. Do not add arbitrary `text-[Npx]` values; extend the
  scale instead.
- **Weights** — 400 body / 500 labels & buttons / 600 headings / 700 display.
- **Tracking** — `tracking-display` (-0.03em) for the hero, `tracking-tight`
  (-0.02em) for headings, `tracking-wider` for uppercase micro-labels.
- **Radius** — `rounded-control` (10px, buttons and inputs), `rounded-card`
  (14px), `rounded-panel` (20px, large containers and dialogs).
- **Elevation** — `shadow-xs`, `shadow-sm`, `shadow-card`, `shadow-overlay`
  (dialogs, drawers, popovers) and `shadow-float` (WhatsApp button).
- **Colour** — `--color-brand`, `--color-ink`, `--color-muted`, `--color-line`,
  `--color-surface`, `--color-danger`.

Every action on the site uses the `Button` primitive
(`src/components/ui/Button.tsx`) with `variant` (`primary`, `secondary`,
`ghost`, `onBrand`, `danger`) and `size` (`sm`, `md`, `lg`). Add new actions
through it rather than hand-rolling button classes.

## How the demo behaves

- **Vehicle finder** — pick make, model, year and (optionally) engine. Fields
  cascade: each one unlocks after the previous choice, and changing an upstream
  field clears the ones downstream. Submitting runs a simulated 700 ms lookup,
  shows a success panel, stores the vehicle and scrolls to Featured Parts.
- **VIN lookup** — enter any 17-character VIN. Format errors (wrong length,
  letters I/O/Q) are reported inline. The demo resolves exactly one VIN:
  `2HGFC2F59LH500001` → **Honda Civic 2020 · 1.5T**. A "use the sample VIN"
  button fills it in; anything else is rejected with an honest message.
- **My Garage** — the saved vehicle persists in `localStorage`, appears in the
  header, and drives the "fits your vehicle" labels on every product card.
  Removing it from the garage returns the page to the unselected state.
- **Quality tiers** — every product has three price points (China, Japan,
  Germany). Changing a tier updates the card price and, if the item is already
  in the cart, the cart line.
- **Featured parts** — filter by category or search by name/part number.
  Selecting a category scrolls to this section and applies the filter. Results
  are cross-checked against the saved vehicle; incompatible parts are marked,
  never silently hidden.
- **Cart** — quantities, remove, subtotal, and an honest notice that checkout
  is not part of this demo. The cart persists across refreshes.
- **Popular makes** — clicking a make switches the finder to the selector tab,
  preselects that make and resets the dependent fields.
- **Placeholder links** — About, Careers, Wholesale and the social icons have
  no destination yet, so they raise a toast saying so rather than dead-ending.

## What is deliberately *not* real

This is a front-end demo. The following are honest placeholders and must be
confirmed by the business before anything goes live:

- **Contact details** — phone, email and the WhatsApp number
  (`966500000000`) in `src/content/site.ts`.
- **Legal** — commercial registration and VAT registration numbers.
- **Payment** — method names are text only; no licensed logos are used and no
  gateway is integrated.
- **Delivery partners** — Aramex and SMSA are listed as text pending
  commercial confirmation; delivery times are not claimed anywhere.
- **Prices** — example SAR amounts including an assumed 15% VAT.
- **Fitment** — compatibility flags are illustrative, derived from the mock
  data, not a real catalogue.
- **VIN decoding** — a hard-coded lookup for a single demo VIN, no decoding.
- **Checkout, accounts, order tracking** — out of scope; the UI says so.

`FAQ` answers about returns and delivery times are written conservatively and
should be re-checked against the real policy.

## Accessibility and quality bar

- Semantic landmarks, one `<h1>`, labelled sections, skip-to-content link.
- Keyboard: roving-tabindex tablist for the finder tabs, native selects and
  radios, focus-trapped dialogs (Escape, backdrop click, focus restored on
  close), visible `:focus-visible` outlines everywhere.
- `aria-expanded` / `aria-controls` on the FAQ accordion; `role="status"` for
  async confirmations; `aria-live` toasts.
- `prefers-reduced-motion` disables smooth scrolling, transitions and
  animations.
- Layouts are fluid from 320 px to wide desktop; safe-area aware floating
  WhatsApp button; the toast host never covers it.
- No gradients, glassmorphism, decorative blobs, fake testimonials, invented
  ratings or a "most popular" tier.

## Verifying changes

```bash
npm run lint   # zero errors expected
npm run build  # static prerender must succeed
```

After a build, `npm run start` and check the page source for the section
anchors in `src/lib/navigation.ts`.
