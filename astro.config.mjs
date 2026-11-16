// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.akfitness.lv',
  output: 'static',
  build: {
    // Emit `online-coaching.html` (not `online-coaching/index.html`) so every
    // existing URL, bookmark and search result keeps working.
    format: 'file',
  },
  // Keep `/indexreal.html` etc. exactly as they are today.
  trailingSlash: 'ignore',
  // OFF on purpose: Astro's HTML compression drops line breaks between text and
  // inline tags (e.g. "ir\n<strong>distances" → "ir<strong>distances"), which
  // glues words together in the legal pages and headings. Gzip on the server
  // makes the size difference negligible.
  compressHTML: false,
  integrations: [
    // React is used ONLY for islands in src/islands (Magic UI effects),
    // each hydrated with client:visible. Everything else ships zero JS.
    react(),
    // Icons are inlined as SVG at build time (replaces the Iconify runtime).
    icon({ include: { solar: ['*'], mdi: ['*'] } }),
  ],
  image: {
    // Remote images we optimise at build time (AVIF/WebP + srcset).
    domains: ['images.unsplash.com', 'hoirqrkdgbmvpwutwuwj.supabase.co'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
