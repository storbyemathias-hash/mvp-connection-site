/**
 * ONE PLACE FOR EVERYTHING YOU MUST FILL IN.
 * Search the project for "TODO(fill-in)" to find every remaining slot.
 */

export const SITE = {
  name: 'MVP Connection',
  shortName: 'MVP',
  // TODO(fill-in): real domain (also update `site` in astro.config.mjs)
  url: 'https://www.example.com',
  // TODO(fill-in): real US business phone. 555-01xx numbers are reserved for fiction.
  phoneDisplay: '(555) 010-0199',
  phoneHref: '+15550100199',
  // TODO(fill-in): real contact email
  email: 'hello@example.com',
  // TODO(fill-in): legal entity name + mailing address (needed on legal pages and for 10DLC)
  legalName: '[LEGAL ENTITY NAME]',
  address: '[STREET, CITY, STATE ZIP]',
  description:
    'Missed-call text-back, review requests, customer follow-up and a website for plumbing and HVAC shops. Done for you. Free 14-day trial.',
};

export const PILOT = {
  headline: 'Free 14-day trial',
  // TODO(fill-in): confirm the exact trial terms you want to promise.
  detail: 'Try either plan free for 14 days. We do the setup.',
};

/** Analytics: Plausible. Leave empty to disable (e.g. while building). */
// TODO(fill-in): your Plausible site domain, e.g. "mvpconnection.com"
export const PLAUSIBLE_DOMAIN = '';

/**
 * GoHighLevel slots. Paste the raw snippets GHL gives you between the backticks.
 * Until they are filled, the site shows clearly marked placeholders.
 */
export const GHL = {
  // TODO(fill-in): Calendar > Share > Embed code (iframe + script)
  calendarEmbed: ``,
  // TODO(fill-in): Sites > Chat widget > Get code
  chatWidget: ``,
  /**
   * TODO(fill-in): Automation > Workflows > trigger "Inbound Webhook" > copy URL.
   * Our own short form posts JSON here (name, phone, company, trade, consent flags).
   */
  formWebhookUrl: '',
};

export type Plan = {
  name: string;
  price: number;
  pitch: string;
  features: string[];
  featured?: boolean;
};

// TODO(fill-in): confirm what each plan includes. The website is included in both.
export const PLANS: Plan[] = [
  {
    name: 'Recovery',
    price: 197,
    pitch: 'Stop losing the calls you already paid for.',
    features: [
      'Missed-call text-back, sent within seconds',
      'Texts written in your voice',
      'Every lead sent to your phone',
      'A website for your shop, built and hosted',
      'Setup done for you',
    ],
  },
  {
    name: 'Growth',
    price: 297,
    pitch: 'Win the call, then win the review and the repeat job.',
    features: [
      'Everything in Recovery',
      '45-day review requests after every job',
      'Check-ins that bring past customers back',
      'Website with chat that captures leads',
      'Priority support',
    ],
    featured: true,
  },
];

/** Rows for the plan comparison table on /pricing. */
export const COMPARE: { row: string; recovery: boolean | string; growth: boolean | string }[] = [
  { row: 'Missed-call text-back', recovery: true, growth: true },
  { row: 'Texts written in your voice', recovery: true, growth: true },
  { row: 'Leads sent to your phone', recovery: true, growth: true },
  { row: 'Website for your shop', recovery: true, growth: true },
  { row: 'Website chat', recovery: false, growth: true },
  { row: '45-day review requests', recovery: false, growth: true },
  { row: 'Past-customer check-ins', recovery: false, growth: true },
  { row: 'Setup', recovery: 'Included', growth: 'Included' },
  { row: 'Support', recovery: 'Standard', growth: 'Priority' },
];

/**
 * Testimonials stay hidden until this list has real entries.
 * Never add made-up quotes. Format: { quote, name, company, city }
 */
export const TESTIMONIALS: { quote: string; name: string; company: string; city: string }[] = [];

// TODO(fill-in): review every answer so it matches how you actually work.
export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Do I need a new phone number?',
    a: 'No. You keep the number on your truck and your ads. We set up call forwarding so missed calls trigger the text. We walk you through it on the setup call.',
  },
  {
    q: 'Do I have to learn new software?',
    a: 'No. We build and run it. New leads and replies show up as texts on your phone. You can use the app if you want, but you do not have to.',
  },
  {
    q: 'Is the website really included?',
    a: 'Yes. Both plans include a fast, phone-friendly website for your shop. We build it, host it and keep it running. Growth adds a chat on the site that collects job details for you.',
  },
  {
    q: 'How does the free trial work?',
    a: 'You get 14 days on either plan at no cost. We set everything up first, so the 14 days are real use, not setup time. Keep it or cancel before the trial ends.',
  },
  {
    q: 'Is there a contract?',
    a: 'No long-term contract. You pay month to month and can cancel anytime.',
  },
  {
    q: 'Is texting customers legal?',
    a: 'Yes, when it is done right. We register your texting with the US carriers (A2P 10DLC), only text people who contacted you or agreed to it, and every message lets them reply STOP.',
  },
];
