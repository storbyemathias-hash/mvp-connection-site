# Progress

## Done
- Live on Cloudflare Pages (auto-deploy on push to main); domain mvpconnection.co
- 5 pages: Home, Features, Pricing, Privacy, Terms (+ sitemap, JSON-LD, OG image)
- Graphite design, iPhone mockup hero, 3D chrome logo on Home, Liquid Glass logo on /features
- Plain contractor copy (website + automatic texts); scroll "pop-in" animations removed
- A2P prep (19 Nov 2026): real phone (804) 729-9150, contact@mvpconnection.co, legal identity
  (Storbye MVP Connection, org. no. 938 893 586); GHL chat widget on every page;
  /privacy and /terms replaced with the owner's templates
- /book, calendar slot, callback form and /thanks parked in `src/parked/` (tag `pre-a2p-forms`)

## Decisions
- Website is included in both plans; "Recommended" badge, not "Most popular"
- Contact is now the chat bubble, phone and email; no booking page for the A2P review
- Legal template wording is kept as-is; only merge fields were filled
- Liquid Glass loads on page load even though it costs mobile performance (user's choice)
- Testimonials are hidden while `TESTIMONIALS` is empty (no invented social proof)

## Open issues
- Legal templates describe web-form opt-in, appointments, payments and accounts the site doesn't have
- Governing Law says "the state in which ... operates" (business is in Norway)
- Demo mockups still show fictional (555) 010-01xx caller numbers
- `PLAUSIBLE_DOMAIN` is empty, so analytics is off
- /features mobile performance is 28 (accepted for now)

## Next steps
1. Decide how the legal templates should match the chat-widget opt-in, then get them reviewed
2. Check the GHL chat widget's SMS consent text before submitting the 10DLC campaign
3. Confirm plan contents, prices and FAQ answers with the cofounder
4. Set the Plausible domain

## Read first
`CLAUDE.md`, `src/config.ts`, `src/layouts/Base.astro`, `src/parked/README.md`, `README.md`
