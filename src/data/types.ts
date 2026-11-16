/** Shapes of the page data in services.ts and coaches.ts. */

export interface PageMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface Service {
  path: string;
  meta: PageMeta;
  hero: {
    image: string;
    badge: string;
    title: string;
    titleAccent: string;
    /** html */
    lede: string;
    price: { prefix?: string; amount: string; unit: string };
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    summaryTitle: string;
    summary: string[];
  };
  steps: {
    id?: string;
    /** White/zinc-900 band behind the section. */
    tinted: boolean;
    heading: string;
    subheading: string;
    columns: 3 | 4;
    items: { title: string; text: string }[];
  };
  split?: {
    eyebrow: string;
    heading: string;
    intro: string;
    /** `text` is html */
    items: { icon: string; title: string; text: string }[];
    image: { src: string; alt: string };
  };
  focus?: {
    icon: string;
    heading: string;
    /** html */
    body: string;
    cards: { title: string; text: string }[];
  };
  programMap?: { heading: string; subheading: string };
  apply: {
    eyebrow: string;
    heading: string;
    text: string;
    packageName: string;
    messagePlaceholder: string;
    buttonLabel: string;
    backLabel: string;
  };
}

export interface Coach {
  path: string;
  meta: PageMeta;
  image: { src: string; alt: string };
  role: string;
  name: string;
  /** Nav button label, e.g. "Strādāt ar Annu". */
  navCtaLabel: string;
  quote: string;
  stats: { value: string; label: string }[];
  /** paragraphs are html */
  philosophy: { heading: string; paragraphs: string[] };
  timeline: {
    heading: string;
    subheading: string;
    items: { when: string; title: string; text: string }[];
  };
  certifications: { heading: string; items: string[] };
  gallery: { heading: string; items: { src: string; alt: string; label: string }[] };
  cta: { heading: string; text: string; buttonLabel: string };
}
