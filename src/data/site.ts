/**
 * Site-wide settings. Change values here, not in individual pages.
 */

/**
 * Where "home" links point. While `/` is the coming-soon page, the real landing
 * page is `/indexreal.html`. At launch (Phase 6 step 4), set this to `/`.
 *
 * NOTE: the legacy service pages linked to `index.html#…`, which sent visitors
 * to the coming-soon page. Routing every home link through HOME fixes that.
 */
export const HOME = '/indexreal.html';

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
