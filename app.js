/* ==========================================================================
   AK Fitness — shared JavaScript (used by every page)
   The tiny theme-detection snippet stays inline in each page's <head> so the
   correct theme is applied before first paint (avoids a flash). Everything
   else lives here.
   ========================================================================== */

/* ---- Where contact-form submissions are emailed ----
   NOTE: change this single line to update the destination for every form on
   every page. (Previously the site had two different addresses.) */
var AK_FORM_EMAIL = 'anna@akfitness.lv';

/* Theme toggle (button in the nav calls this) */
function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
  /* Spin the toggle so the sun/moon icon swap reads as a turn, not a hard cut. */
  var tbtn = document.querySelector('button[onclick="toggleTheme()"]');
  if (tbtn && tbtn.animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tbtn.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }],
      { duration: 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
    );
  }
}

/* Scroll-driven entrance animations */
document.addEventListener('DOMContentLoaded', () => {
  // Clean up any authoring-time reveal classes to prevent conflicts
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('reveal', 'reveal-up', 'reveal-down', 'reveal-left', 'reveal-right', 'reveal-scale', 'reveal-clip', 'delay-75', 'delay-150', 'delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600', 'is-visible');
    el.style.animation = 'none';
  });

  const classOf = (el) =>
    typeof el.className === 'string' ? el.className : (el.className.baseVal || '');

  // A reveal ROOT is a content block worth animating on its own — a card, a
  // heading, a media item, a grid/flex cell — NOT every span or word inside it.
  const isRevealRoot = (el) => {
    if (el.nodeType !== 1) return false;
    if (/opacity-0(\s|$)|hidden(\s|$)|invisible(\s|$)/.test(classOf(el))) return false;
    // Sectioning containers are never a reveal root — only their inner cards are.
    if (['SECTION', 'HEADER', 'FOOTER', 'MAIN', 'ARTICLE', 'ASIDE', 'NAV'].includes(el.tagName)) return false;
    if (['H1', 'H2', 'H3'].includes(el.tagName)) return true;
    if (['IMG', 'FIGURE', 'DETAILS'].includes(el.tagName)) return true;
    const parentClass = el.parentElement ? classOf(el.parentElement) : '';
    // direct cell of a grid/flex row: cards, stats, gallery tiles, process steps
    if (/\b(grid|flex)\b/.test(parentClass)) return true;
    // a standalone bordered + padded panel
    if (/\bborder\b/.test(classOf(el)) && /\bp[xyt]?-\d/.test(classOf(el))) return true;
    return false;
  };

  document.querySelectorAll('body *').forEach(el => {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) return;
    if (el.closest('nav, footer, .form-notification')) return;   // present immediately
    if (el.classList.contains('bg-noise')) return;
    if (el.tagName.toLowerCase() !== 'svg' && el.closest('svg')) return;
    if (!isRevealRoot(el)) return;
    // skip anything already inside a tagged block — reveal the block, not its parts
    if (el.parentElement && el.parentElement.closest('.scroll-hidden')) return;
    el.classList.add('scroll-hidden', 'scroll-transition');
  });

  let batchIndex = 0;
  let batchTimeout = null;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Math.min(batchIndex, 6) * 60;
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.remove('scroll-hidden');
        observer.unobserve(entry.target);
        setTimeout(() => {
          entry.target.style.transitionDelay = '';
          entry.target.classList.remove('scroll-transition');
        }, delay + 600);
        batchIndex++;
        if (batchTimeout) clearTimeout(batchTimeout);
        batchTimeout = setTimeout(() => { batchIndex = 0; }, 100);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });
  document.querySelectorAll('.scroll-hidden').forEach(el => observer.observe(el));
});

/* Contact form submission via formsubmit.co (AJAX) */
function handleFormSubmit(e, planName, form) {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerText;
  btn.innerText = 'Sūta...';
  btn.disabled = true;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data._subject = `Jauns pieteikums: ${planName}`;
  data.Plan = planName;
  fetch('https://formsubmit.co/ajax/' + AK_FORM_EMAIL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      btn.innerText = originalText;
      btn.disabled = false;
      const notif = form.querySelector('.form-notification');
      if (notif) notif.classList.remove('opacity-0', 'pointer-events-none');
      form.reset();
      setTimeout(() => {
        if (notif) notif.classList.add('opacity-0', 'pointer-events-none');
      }, 3000);
    })
    .catch(error => {
      console.log(error);
      btn.innerText = originalText;
      btn.disabled = false;
      alert('Kļūda nosūtot ziņu. Lūdzu mēģiniet vēlāk.');
    });
}
