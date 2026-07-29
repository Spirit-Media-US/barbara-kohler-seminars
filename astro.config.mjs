import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Each cloned site MUST set PUBLIC_SITE_URL (in .env locally and in the
// CF Pages production env). We read it from the shell env first, then from a
// local .env via loadEnv (so `npm run build` and the deploy script pick it up).
// The fallback is intentionally a fake string so a missed configuration is
// caught in QA (canonical/og:url render with example.com and grep visibly).
const SITE_URL =
  process.env.PUBLIC_SITE_URL ||
  loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '').PUBLIC_SITE_URL ||
  'https://example.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you') })],
  build: {
    // Total CSS for this site is small (~9KB), so inline it all into <head>.
    // This avoids the FOUC that 'auto' + async-css causes here: the whole
    // stylesheet gets externalized and deferred (media=print swap) with no
    // hand-rolled critical CSS, so the page paints unstyled for a beat.
    // Per SMP guidance, prefer 'always' over async-css when CSS < 50KB.
    inlineStylesheets: 'always',
  },
  vite: {
    server: { allowedHosts: ['preview.spiritmediapublishing.com'] },
    plugins: [tailwindcss()],
  },
});
