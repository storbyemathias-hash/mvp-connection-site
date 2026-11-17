# MVP Connection: marketing site

Astro + Tailwind v4, static output, dark greyscale design. The 3D chrome logo in the home hero
uses three.js, which loads on the visitor's first scroll, touch or mouse move (or after 5 s);
a silver SVG version of the logo shows until then.
Mobile Lighthouse scores from a local run: home and pricing 100 / 100 / 100 / 100.
Features: performance 28 on a simulated slow phone (94 on desktop), the rest 100. This is a deliberate
choice: the Liquid Glass Logo (React island, ReactDrops license header kept in its files) plays
on load. To trade it back, start it on first scroll/touch on phones.

## Structure

```
src/
  config.ts                  ← EVERY fill-in lives here (contact, plans, comparison table, FAQ, GHL embeds, analytics)
  lib/logo.ts                ← logo geometry, shared by the SVG and 3D versions
  layouts/Base.astro         ← SEO/OG/schema, glass header + mobile menu, footer, mobile call bar, Plausible
  layouts/Legal.astro        ← legal page wrapper with the "DRAFT" banner
  components/
    ChromeLogo3D.astro       ← spinning, draggable chrome logo (home hero)
    PhoneDemo.astro          ← iPhone mockup that plays the text-back conversation
    Mock.astro               ← small product-UI mockups used inside cards
    Beams.astro              ← drifting light streaks behind heroes and cards
    LogoTile.astro           ← app-icon style logo tile (features hero, CTA, thanks)
    Faq.astro, CtaCard.astro ← shared FAQ and closing call-to-action
    LeadForm.astro           ← short form with 10DLC consent boxes
  scripts/chrome-logo.ts     ← extruded 3D logo built from the real geometry
  pages/ index, features, pricing, book, privacy, terms, thanks
public/  favicon.svg, robots.txt, img/ (logo, 3D render, og.png)
```

Palette ("Graphite", contrast on `#050505`): text `#f1f1f2` (18.6:1), muted `#9a9aa0` (7.2:1),
dim `#6c6c72` (3.8:1, large text only). Surfaces `#0c0c0d` / `#131315` / `#1a1a1d`, hairlines `#222225`.
Green, amber and red appear only as status chips inside the mockups. Typeface: Inter (self-hosted).
Design rules came from the Apple design skill: glass only on the floating header and bottom bar,
one bright object per screen (the chrome logo), 17px body text, and support for reduced motion,
reduced transparency and increased contrast.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
```

## Deploy (Cloudflare Pages)

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **Astro**. Build command `npm run build`, output directory `dist`. Set env var `NODE_VERSION=22` (or newer).
4. Deploy. Then Custom domains → add `yourdomain.com` and `www.yourdomain.com` (Cloudflare sets up DNS if the domain is on Cloudflare).
5. Update the domain in `src/config.ts` (`SITE.url`), `astro.config.mjs` (`site`) and `public/robots.txt`. Push again.

Netlify works the same way: build command `npm run build`, publish directory `dist`.

## What you must fill in before launch

Search the project for `TODO(fill-in)`, `[BRACKETED]` and `[CONFIRM]`.

**Contact and domain**
- [ ] Real US phone number (`SITE.phoneDisplay` + `SITE.phoneHref`). The current one is a fake 555 number.
- [ ] Email, legal entity name and mailing address
- [ ] Domain in 3 places (see Deploy step 5)

**GoHighLevel**
- [ ] `GHL.calendarEmbed`: calendar embed code (book page)
- [ ] `GHL.chatWidget`: chat widget code (every page)
- [ ] `GHL.formWebhookUrl`: create a workflow with trigger **Inbound Webhook**, paste the URL. Map `name`, `phone`, `company`, `trade`, `sms_consent_service`, `sms_consent_marketing` to contact fields. Only send texts to contacts whose consent flag is `true`.

**Analytics**
- [ ] Create the site in Plausible and set `PLAUSIBLE_DOMAIN`. Optional goals: `Book Click`, `Call Click`, `Form Submit`.

**Content to confirm (I wrote proposals)**
- [ ] What each plan includes (`PLANS` and `COMPARE`). Answer is removed and the website is in both plans. "Website chat on Growth only" and "Priority support on Growth" are my proposals.
- [ ] Trial terms (`PILOT.detail`, Terms page "Free trial" section). "Cancel anytime" and "no long-term contract" are in the FAQ.
- [ ] FAQ answers: keeping their number via call forwarding, no app needed, setup flow
- [ ] "We'll call you back, usually the same business day" (book page)
- [ ] Marketing SMS cap "up to 4 msgs/month" (form + Terms). It must match your 10DLC campaign registration.
- [ ] Testimonials stay hidden until you add real ones to `TESTIMONIALS`.

**Legal (marked DRAFT on the page)**
- [ ] Have a US attorney review `/privacy` and `/terms`, fill `[DATE]`, `[STATE]`, the vendor list and the retention period, then remove the DRAFT banner in `src/layouts/Legal.astro`.
- [ ] For 10DLC registration, the campaign's opt-in description should point to the form on the site and quote the consent text exactly.

**Assets**
- [ ] `public/img/og.png` is a quick generated share image. Replace it with a designed 1200×630 version if you like.
- [ ] Cookie notice: not needed. Plausible doesn't use cookies. If GHL's chat widget sets cookies, check with your lawyer.
