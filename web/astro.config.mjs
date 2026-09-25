// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Cambia "site" por la URL final cuando publiques la web (ver README.md, sección Publicación).
export default defineConfig({
  site: 'https://binissalem-agenda.example',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ca',
        locales: { ca: 'ca', es: 'es' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
