# MVP Connection – marketing site

Marketing site for MVP Connection, a 2-person startup selling a done-for-you automation bundle
to US plumbing/HVAC contractors: missed-call text-back, 45-day review collection,
retention follow-up, website + chat. Main goal: book a 15-min call. Second goal: capture a phone number.
Copy is plain American English; the user speaks Norwegian in chat.

## Stack
- Astro 7 (static), Tailwind v4 via `@tailwindcss/vite` (`@theme` in `src/styles/global.css`, no tailwind.config)
- React 19 via `@astrojs/react`, ONLY for the Liquid Glass logo island on /features (`client:load`)
- three.js for the spinning 3D chrome logo on Home (lazy: first interaction or 5 s)
- Inter Variable (@fontsource). Plausible analytics, GoHighLevel (calendar, chat, form webhook)
- @astrojs/sitemap. Deploy target: Cloudflare Pages or Netlify (see README.md)

## Structure
- `src/config.ts` – ALL editable content: SITE info, PILOT, PLANS, COMPARE, FAQ, TESTIMONIALS, GHL slots, Plausible domain
- `src/pages/` – index, features, pricing, book, thanks, privacy, terms
- `src/layouts/` – `Base.astro` (header, footer, mobile call bar, global scripts), `Legal.astro` (DRAFT banner)
- `src/components/` – PhoneDemo, Mock, ChromeLogo3D, FeaturesHeroLogo + `liquid-glass-logo*` (ReactDrops, keep verbatim), LeadForm, Faq, CtaCard, Beams
- `src/scripts/chrome-logo.ts`, `src/lib/logo.ts` – 3D logo
- `public/` – logo.svg, favicon.svg, img/og.png

## Fixed rules
- Copy tone: say plainly what we sell (website + automatic texts), short sentences, contractor language, a little humor. No jargon like "retention" or "lead capture system".
- No invented testimonials, stats, names, logos or customer claims. Never cite "62%". Use "Recommended", not "Most popular".
- Colors: greyscale "Graphite" palette + ONE accent, safety orange. Hex values live only in `:root`
  (`--accent #FF6A1A`, `--accent-hover #FF8140`, `--on-accent #0B0B0B`). Use `text-accent`/`bg-accent`/`btn-accent`; never hardcode orange.
- Orange only on: primary CTAs, "texted back" hero phrase, header phone icon, link hover, active nav underline,
  step numbers, pricing checks, Recommended badge, focus ring. Never large backgrounds or body text; max 1–2 orange things in view.
- Repeat CTAs (header/mobile bar) use `.cta-dup`; pages pass `mainCta` to Base and mark the hero CTA `data-main-cta` so dups turn white while it is visible.
- Secondary buttons: `btn-dark`. Mockup status chips: ok green, wait amber, miss neutral grey (no red).
- Website is included in both plans (Recovery $197, Growth $297 featured). There is no "Answer" plan.
- Glass effect only on the floating header and mobile bottom bar (Apple design skill rules).
- Respect prefers-reduced-motion / prefers-contrast; visible focus ring; body text 17px; contrast AA or better.
- SMS consent (A2P 10DLC): two optional, never pre-checked checkboxes in LeadForm. Legal pages stay marked DRAFT for a lawyer.
- Plausible goals via `data-goal="..."` attributes. Mobile-first, click-to-call everywhere.
- Lighthouse 90+ target (exception accepted: /features mobile performance due to Liquid Glass on load).

## Run / build / test
```bash
npm install
npm run dev        # http://localhost:4321 (or 4322 if taken)
npm run build      # outputs dist/
npm run preview    # serve the build
npx -y lighthouse@12 http://localhost:4321/ --only-categories=performance,accessibility,best-practices,seo
```
No test suite. Check changes in the browser at desktop and 390px width, then run `npm run build`.
