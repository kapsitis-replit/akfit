/**
 * Site-wide settings. Change values here, not in individual pages.
 */

/**
 * Where "home" links point. The landing page lives at `/` (it was at
 * `/indexreal.html` until 2026-11-16; that URL now 301-redirects here, see
 * `astro.config.mjs`).
 */
export const HOME = '/';

export const SITE_URL = 'https://akfitness.lv';

/** n8n webhook that receives every contact/application form submission. */
export const LEAD_WEBHOOK = 'https://akfitlv.zeabur.app/webhook/lead';

/** Shown in the error alert and used as the no-JS formsubmit.co fallback. */
export const CONTACT_EMAIL = 'anna@akfitness.lv';

/** Default social preview image (the hero photo). */
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop';

/** Main navigation. `id` is the section anchor on the landing page. */
export const NAV_LINKS = [
  { id: 'about', label: 'Par Mums' },
  { id: 'pricing', label: 'Pakalpojumi' },
  { id: 'results', label: 'Rezultāti' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'BUJ' },
] as const;

export type NavId = (typeof NAV_LINKS)[number]['id'];

export const SERVICE_LINKS = [
  { href: '/online-coaching.html', label: 'Online Coaching' },
  { href: '/treninu-coaching.html', label: 'Treniņu Coaching' },
  { href: '/fitnesa-konsultacija.html', label: 'Konsultācija' },
  { href: '/treninu-plani.html', label: 'Treniņu Plāni' },
] as const;

export const COACH_LINKS = [
  { href: '/treneris-anna.html', label: 'Anna' },
  { href: '/treneris-krisjanis.html', label: 'Krišjānis' },
] as const;

export const LEGAL_LINKS = {
  privacy: '/privatuma-politika.html',
  terms: '/pakalpojuma-noteikumi.html',
  withdrawal: '/pakalpojuma-noteikumi.html#atteikums',
} as const;

/**
 * Social profiles shown in the landing-page footer.
 * TODO(owner): the legacy footer used `href="#"` placeholders. Fill in real
 * URLs; an entry with an empty href is not rendered.
 */
export const SOCIAL_LINKS = [
  { icon: 'mdi:instagram', label: 'Instagram', href: '' },
  { icon: 'mdi:facebook', label: 'Facebook', href: '' },
  { icon: 'mdi:youtube', label: 'YouTube', href: '' },
] as const;
