# Parked code (not built, not on the live site)

Moved here on 19 Nov 2026 to prepare the site for A2P 10DLC review. Astro only builds
routes from `src/pages/`, so nothing in this folder is published. The full state before
the change is also in git: `git checkout pre-a2p-forms` (tag).

| File | What it was | Where it was used |
|---|---|---|
| `book.astro` | The /book page: GHL calendar embed slot (with a TODO placeholder) + the "Leave your number" callback form | `src/pages/book.astro`. Linked from header "Book a call", mobile bar "Book a 15-min call", footer, hero buttons on Home/Features, "Start free trial" on Pricing, and `CtaCard` |
| `thanks.astro` | The /thanks page shown after the callback form was sent | `src/pages/thanks.astro`, opened by `LeadForm` on success (excluded from the sitemap in `astro.config.mjs`) |
| `LeadForm.astro` | Callback form (name, mobile, company, trade, two optional SMS consent boxes), posts JSON to the GHL webhook | `src/components/LeadForm.astro`, used only in `book.astro` |
| `terms.old.astro` | Our own earlier Terms & SMS terms draft (with [BRACKETED] notes) | `src/pages/terms.astro` |
| `privacy.old.astro` | Our own earlier Privacy Policy draft | `src/pages/privacy.astro` |
| `Legal.old.astro` | Legal layout with the yellow "DRAFT, not legal advice" banner and "Last updated" line | `src/layouts/Legal.astro` |

## Put the booking page and form back

1. Move the files back:
   ```bash
   git mv src/parked/book.astro src/pages/book.astro
   git mv src/parked/thanks.astro src/pages/thanks.astro
   git mv src/parked/LeadForm.astro src/components/LeadForm.astro
   ```
2. Re-add the GHL slots to `src/config.ts` (both pages import `GHL`):
   ```ts
   export const GHL = {
     // Calendar > Share > Embed code (iframe + script)
     calendarEmbed: ``,
     // Automation > Workflows > trigger "Inbound Webhook" > copy URL
     formWebhookUrl: '',
   };
   ```
3. Restore the links, e.g. `git diff pre-a2p-forms -- src/layouts/Base.astro src/pages src/components/CtaCard.astro`
   shows exactly what was removed: header "Book a call" button (`btn btn-accent cta-dup`), mobile-menu item,
   footer link, mobile bar "Book a 15-min call", hero buttons with `data-main-cta` (and `mainCta` on `<Base>`),
   Pricing "Start free trial", and the `CtaCard` button. Simplest: `git checkout pre-a2p-forms -- <file>` per file,
   then re-apply the new phone/email (they live in `src/config.ts`, so only config needs care).
4. Fill `calendarEmbed` and `formWebhookUrl`, then `npm run build`.

## Put the old legal pages back

```bash
cp src/parked/Legal.old.astro src/layouts/Legal.astro
cp src/parked/terms.old.astro src/pages/terms.astro
cp src/parked/privacy.old.astro src/pages/privacy.astro
```
They use `updated="[DATE]"` and `SITE.legalName` / `SITE.address` from `src/config.ts`.
