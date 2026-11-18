# Progress

## Done
- 7 pages build and work: Home, Features, Pricing, Book, Thanks, Privacy, Terms (+ sitemap, JSON-LD, OG image)
- Graphite design in the style of projectise.framer.ai, with an iPhone mockup in the hero instead of a desktop screenshot
- 3D chrome MVP logo on Home (one turn about 20 s); Liquid Glass logo animation at the top of /features
- Orange accent applied per the rules in CLAUDE.md; contrast checked (orange CTA 6.87:1, orange text 7.11:1)
- Lead form with 10DLC consent; mobile call bar; Plausible goal attributes; README with deploy guide and fill-in list
- Lighthouse mobile: Home 100 on all categories, Pricing 100 for performance, Features performance 28 (94 on desktop)

## Decisions
- Website is included in both plans; the Answer plan was removed (user's request)
- Free 14-day trial as the offer; "Recommended" badge, because "Most popular" can't be verified
- three.js loads on first interaction or after 5 s, so Home stays at Lighthouse 100
- Liquid Glass loads on page load even though it costs mobile performance (user chose "Keep it on load")
- Orange is the only warm color: "Missed call" chips are grey, not red, so they don't compete with it
- Testimonials are hidden while `TESTIMONIALS` is empty (no invented social proof)

## Open issues
- Placeholders in `src/config.ts`: phone (555) 010-0199, email, legal name/address (domain is set: mvpconnection.co)
- GHL calendar embed, chat widget and form webhook are empty (the form shows a "not connected" message)
- `PLAUSIBLE_DOMAIN` is empty, so analytics is off
- Privacy/Terms are drafts and need a lawyer's review
- /features mobile performance is 28 (accepted for now)
- `@fontsource-variable/archivo` is installed but not used
- Not a git repo yet

## Next steps
1. Fill in real business info, domain and the GHL embeds/webhook in `src/config.ts`
2. Confirm plan contents, prices and FAQ answers with the cofounder
3. `git init`, then deploy to Cloudflare Pages/Netlify (README.md) and set the Plausible domain
4. Send the legal pages to a lawyer; send the 10DLC campaign for registration
5. Possibly lazy-load Liquid Glass on mobile if Features needs a better score

## Read first
`CLAUDE.md`, `src/config.ts`, `src/styles/global.css`, `src/layouts/Base.astro`, `src/pages/index.astro`, `README.md`
