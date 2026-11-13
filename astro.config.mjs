// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nathantr.com',
  output: 'static',
  // /taste is a second look at the same page: kept out of the sitemap (it is also noindex)
  integrations: [sitemap({ filter: (page) => !page.includes('/taste') })],
});
