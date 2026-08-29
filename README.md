# Delta (Δ) — pre-launch landing page

Single-page marketing and validation site. Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion.

```bash
npm run dev
```

Then open http://localhost:3000.

## Waitlist

Both forms (hero and the full early-access block) POST to `/api/waitlist`.

**Storage.** Every signup appends to `data/waitlist.jsonl` — gitignored, one JSON object per line. Emails are lower-cased and de-duplicated; phones are normalised to `+91XXXXXXXXXX` so `98765 43210` and `+91 98765 43210` are the same person.

```bash
# how many people have signed up
wc -l < data/waitlist.jsonl
```

**Email notification.** Optional. Copy `.env.example` to `.env.local` and add a Resend key:

```
RESEND_API_KEY=re_xxxxxxxx
WAITLIST_FROM="Delta <onboarding@resend.dev>"
WAITLIST_TO=reach.delta.in@gmail.com
```

Without a key, signups still persist — the notification is simply skipped. A failed send never fails a signup, because the JSONL append is the source of truth.

> On Vercel, the filesystem is ephemeral: `data/waitlist.jsonl` will not survive a redeploy. Set `RESEND_API_KEY` so you get every signup by email, and swap `persist()` / `alreadyJoined()` in `lib/waitlist.ts` for a real table when you want durable storage. Those two functions are the only place that touches the store.

## Design system

Tokens live in `app/globals.css` under `@theme` — colours, fonts and easing. Nothing hard-codes a hex outside that block.

- **Canvas** `#090a0f`, surfaces `#0c0e15` → `#161a23`, hairlines `#1b1f28` → `#333a48`
- **Accent** a muted celadon: `--color-delta` `#a8c5b4` for the Δ mark, status dots and positive figures; `--color-delta-fill` `#8fb39b` for filled buttons, always with near-black (`#06070b`) label text — 8.6:1. No outer glows anywhere; depth comes from the `inner-edge` utility.
- **`--color-warn`** `#d9a441` is status, not brand: it appears only on "behind pace", "bill due" and an over-average figure.

Changing the accent means editing those three tokens in `@theme` plus two hard-coded spots: the ambient wash in `components/ui/rails.tsx` and the first card tint in `components/widgets/card-stack.tsx`.
- **Type** Cabinet Grotesk (display, via Fontshare) · Geist (body/UI) · Geist Mono (every numeral, eyebrow and step number, tabular). If Fontshare is unreachable the display stack falls back to Geist, which Next self-hosts.

## Pre-launch posture

Delta has not shipped, and the widgets carry realistic merchant names and rupee amounts, so the page says so in five places: the hero badge, the copy under the hero form, the early-access subhead, the form footer, and the footer disclosure. Every mock UI also carries a `<PreviewNote>` reading "Product preview · sample data". **If you add another mock widget, add the note under it.** Remove all of this only when the product is actually live.

## Conventions worth keeping

- **Every numeral goes through `<Num>`** (`components/ui/num.tsx`). That is what enforces mono + tabular figures.
- **The mock data reconciles.** The digest's food-delivery rows sum to exactly ₹4,120; ₹25,600 set aside against ₹1,42,000 of inflow is the quoted 18%; the category bars total the ₹21,680 in the dashboard header; September at ₹21,680 sits ₹2,303 under the six-month average of ₹23,983. If you edit a figure, edit the rows under it too.
- **Card mockups stay generic** (`Card ending 4821`). Never attach an invented reward structure to a real, named bank product.
- **Above-the-fold content uses `<Reveal mount>`**, not scroll-into-view, so it never waits on an IntersectionObserver.
- **`prefers-reduced-motion` is honoured everywhere.** `Reveal` renders a plain div, parallax and scrub are skipped, and counters jump straight to their value.

## Structure

```
app/
  layout.tsx            fonts, metadata
  page.tsx              section order
  api/waitlist/route.ts validation + persistence + notification
lib/waitlist.ts         store, normalisation, Resend
components/
  ui/                   primitives (Num, Reveal, Parallax, CountUp, Rails, ...)
  widgets/              the interactive mock UIs
  sections/             page sections
```
