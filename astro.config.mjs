import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Each cloned site MUST set PUBLIC_SITE_URL (in .env locally and in the
// CF Pages production env). The fallback is intentionally a fake string so a
// missed configuration is caught in QA (canonical/og:url will render with
// example.com and grep visibly) instead of shipping silently.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://example.com',
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
