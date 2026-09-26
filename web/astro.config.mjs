// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Cambia "site" por la URL final cuando publiques en un dominio propio (ver README.md).
// "base" se activa sólo en el build de GitHub Actions, porque un GitHub Pages de proyecto
// (sin dominio propio) vive bajo /<nombre-del-repositorio>/ en vez de la raíz.
export default defineConfig({
  site: process.env.GITHUB_ACTIONS ? 'https://zelbyon-code.github.io' : 'https://binissalem-agenda.example',
  base: process.env.GITHUB_ACTIONS ? '/strutils' : '/',
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
