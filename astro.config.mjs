import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://isabeltecweb.github.io',
  base: '/blog-isabel-ventura-web',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
