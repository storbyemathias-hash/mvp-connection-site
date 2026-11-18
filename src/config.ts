/**
 * ONE PLACE FOR EVERYTHING YOU MUST FILL IN.
 * Search the project for "TODO(fill-in)" to find every remaining slot.
 */

export const SITE = {
  name: 'MVP Connection',
  shortName: 'MVP',
  // TODO(fill-in): real domain (also update `site` in astro.config.mjs)
  url: 'https://mvpconnection.co',
  // TODO(fill-in): real US business phone. 555-01xx numbers are reserved for fiction.
  phoneDisplay: '(555) 010-0199',
  phoneHref: '+15550100199',
  // TODO(fill-in): real contact email
  email: 'hello@example.com',
  // TODO(fill-in): legal entity name + mailing address (needed on legal pages and for 10DLC)
  legalName: '[LEGAL ENTITY NAME]',
  address: '[STREET, CITY, STATE ZIP]',
  description:
    'We build your website and set up automatic texts that win you more jobs: a text back when you miss a call, Google review requests and reminders for past customers. For plumbing and HVAC shops. Free 14-day trial.',
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
    pitch: 'A website plus an automatic text every time you miss a call.',
    features: [
      'A website for your shop, built and hosted by us',
      'Miss a call? The caller gets a text in seconds',
      'Texts written the way you talk',
      'New leads sent straight to your phone',
      'We do the setup',
    ],
  },
  {
    name: 'Growth',
    price: 297,
    pitch: 'Everything in Recovery, plus more Google reviews and more repeat jobs.',
    features: [
      'Everything in Recovery',
      'We ask every customer for a Google review',
      'Reminders that bring past customers back',
      'A chat on your website that collects job details',
      'Priority support',
    ],
    featured: true,
  },
];

/** Rows for the plan comparison table on /pricing. */
export const COMPARE: { row: string; recovery: boolean | string; growth: boolean | string }[] = [
  { row: 'Website for your shop', recovery: true, growth: true },
  { row: 'Automatic text when you miss a call', recovery: true, growth: true },
  { row: 'Texts written the way you talk', recovery: true, growth: true },
  { row: 'New leads sent to your phone', recovery: true, growth: true },
  { row: 'Google review requests', recovery: false, growth: true },
  { row: 'Repeat-customer reminders', recovery: false, growth: true },
  { row: 'Chat on your website', recovery: false, growth: true },
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
    q: 'So what am I actually paying for?',
    a: 'A website for your shop, plus automatic texts that win you more work: a text back when you miss a call, a Google review request after each job, and reminders that bring past customers back. We set it all up and keep it running for one monthly price.',
  },
  {
    q: 'When will I see it working?',
    a: 'The missed-call text works from the day we switch it on. Reviews and repeat jobs build up over the following weeks as you finish jobs.',
  },
  {
    q: 'Do I need a new phone number?',
    a: 'No. You keep the number on your truck and your ads. We set up call forwarding so missed calls trigger the text. We walk you through it on the setup call.',
  },
  {
    q: 'Do I have to learn new software?',
    a: 'No. If you can send a text, you can use this. New leads and replies show up as texts on your phone. There is an app if you want it, but you don\'t have to touch it.',
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
    a: 'No. You pay month to month and can cancel anytime. If it works for you, you\'ll stay. If it doesn\'t, you shouldn\'t have to.',
  },
  {
    q: 'Is texting customers legal?',
    a: 'Yes, when it is done right. We register your texting with the US carriers (A2P 10DLC), only text people who contacted you or agreed to it, and every message lets them reply STOP.',
  },
];
