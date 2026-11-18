import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// TODO(fill-in): replace with your real domain once it is bought.
// Keep it in sync with SITE.url in src/config.ts.
export default defineConfig({
  site: 'https://mvpconnection.co',
  // React is used only for the Liquid Glass Logo island on /features.
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/thanks') })],
  vite: { plugins: [tailwindcss()] },
});
