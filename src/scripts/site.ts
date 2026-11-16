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

/* ---- Scroll reveal --------------------------------------------------------- */
/* Explicit opt-in: `data-reveal` on a block, or `data-reveal-children` on a grid
   (each direct child reveals, staggered min(i,5) × 50ms). One shared observer;
   each element is unobserved after it reveals. CSS lives in global.css and only
   hides elements once `html.reveal-ready` is set here, so no-JS users see all. */
if ('IntersectionObserver' in window) {
  const targets: HTMLElement[] = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  document.querySelectorAll<HTMLElement>('[data-reveal-children]').forEach((group) => {
    [...group.children].forEach((child, i) => {
      const el = child as HTMLElement;
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 50}ms`);
      targets.push(el);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-revealed');
        io.unobserve(el);
        // Hand transitions back to the element's own classes (hover colours etc.).
        el.addEventListener(
          'transitionend',
          () => {
            el.removeAttribute('data-reveal');
            el.classList.remove('is-revealed');
            el.style.removeProperty('--reveal-delay');
          },
          { once: true },
        );
      }
    },
    { rootMargin: '0px 0px 10% 0px' },
  );
  targets.forEach((el) => io.observe(el));
  root.classList.add('reveal-ready');
}

/* ---- Hero pan: run only while on screen ------------------------------------ */
/* `.animate-slow-pan` is paused by default in CSS; this adds `.is-panning` while
   the image is visible, so off-screen pans cost nothing. */
const panIO = new IntersectionObserver((entries) => {
  for (const entry of entries) entry.target.classList.toggle('is-panning', entry.isIntersecting);
});
document.querySelectorAll('.animate-slow-pan').forEach((el) => panIO.observe(el));

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
