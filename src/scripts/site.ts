/* Site-wide behaviour loaded on every page (bundled + deduped by Astro).
   Replaces the shared parts of the legacy app.js. Scroll-reveal is rebuilt as
   <Reveal> in Phase 4; the contact form lives in ContactForm.astro. */

const root = document.documentElement;
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Theme toggle -------------------------------------------------------- */
function toggleTheme(button: HTMLElement) {
  const dark = root.classList.toggle('dark');
  try {
    localStorage.theme = dark ? 'dark' : 'light';
  } catch {
    /* storage blocked: the toggle still works for this page view */
  }
  /* Spin the button so the sun/moon swap reads as a turn, not a hard cut. */
  if (button.animate && !reduceMotion()) {
    button.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }],
      { duration: 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    );
  }
}

document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => toggleTheme(button));
});

/* ---- Pause the hero pan while scrolling ---------------------------------- */
/* Frees the GPU for smooth scrolling on high-DPI displays; resumes ~150ms after
   scrolling stops. Paired with `html.is-scrolling` in global.css. */
let scrollTimer: ReturnType<typeof setTimeout> | undefined;
addEventListener(
  'scroll',
  () => {
    root.classList.add('is-scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => root.classList.remove('is-scrolling'), 150);
  },
  { passive: true },
);
