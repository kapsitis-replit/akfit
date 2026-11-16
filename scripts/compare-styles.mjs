// Regression check: loads each page from production and from the local build
// in headless Chrome (dark and light mode), records computed styles of every
// element that has its own text, and prints the differences.
import puppeteer from 'puppeteer-core';

// Override with env vars, e.g. LIVE=https://<preview>.zeabur.app LOCAL=http://localhost:4321
const LIVE = process.env.LIVE ?? 'https://www.akfitness.lv';
const LOCAL = process.env.LOCAL ?? 'http://localhost:4321';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PAGES = (process.argv[2] ?? 'index,online-coaching,treninu-plani,treneris-anna,privatuma-politika').split(',');
const WIDTH = Number(process.argv[3] ?? 1280);
const PROPS = [
  'color', 'background-color', 'background-image', 'font-family', 'font-size', 'font-weight',
  'line-height', 'letter-spacing', 'text-transform', 'text-decoration-line', 'opacity',
  'border-top-width', 'border-top-color', 'border-left-width', 'border-left-color',
  'padding-top', 'padding-left', 'margin-top', 'margin-bottom', 'width', 'height', 'box-shadow',
  'border-radius', 'cursor', 'display', 'transform',
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });

async function collect(url, theme) {
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: 900 });
  await page.evaluateOnNewDocument((t) => {
    try { localStorage.theme = t; } catch {}
    // Disable motion so nothing is mid-animation when sampled.
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = '*,*::before,*::after{animation:none!important;transition:none!important}';
      document.head.append(s);
      // Legacy scroll-reveal hides elements until scrolled; reveal everything.
      setTimeout(() => document.querySelectorAll('.scroll-hidden').forEach((e) => e.classList.remove('scroll-hidden')), 50);
    });
  }, theme);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 400));
  const data = await page.evaluate((PROPS) => {
    const out = {};
    const seen = {};
    for (const el of document.body.querySelectorAll('*')) {
      if (el.closest('svg, iconify-icon, script, style, noscript')) continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
      if (!own) continue;
      const key = `${el.tagName}|${own.slice(0, 60)}`;
      seen[key] = (seen[key] ?? 0) + 1;
      const cs = getComputedStyle(el);
      const vals = {};
      for (const p of PROPS) vals[p] = cs.getPropertyValue(p);
      out[`${key}#${seen[key]}`] = vals;
    }
    return out;
  }, PROPS);
  await page.close();
  return data;
}

// Normalise colour notations so oklch()/oklab()/rgb() that render the same compare equal.
async function normaliser() {
  const page = await browser.newPage();
  return {
    async color(v) {
      if (!/oklch|oklab|color\(|lab\(/.test(v)) return v;
      return page.evaluate((v) => {
        const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        return v.replace(/(oklch|oklab|lab|color)\([^()]*\)/g, (m) => {
          c.clearRect(0, 0, 1, 1); c.fillStyle = m; c.fillRect(0, 0, 1, 1);
          const [r, g, b, a] = c.getImageData(0, 0, 1, 1).data;
          return a === 255 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${Math.round((a / 255) * 100) / 100})`;
        });
      }, v);
    },
  };
}
const norm = await normaliser();
const px = (v) => v.replace(/(\d+\.\d+)px/g, (_, n) => `${Math.round(Number(n))}px`);

for (const name of PAGES) {
  for (const theme of ['dark', 'light']) {
    const [live, local] = await Promise.all([
      collect(`${LIVE}/${name}.html`, theme),
      collect(`${LOCAL}/${name}.html`, theme),
    ]);
    const diffs = {};
    let compared = 0;
    for (const key of Object.keys(live)) {
      if (!local[key]) continue;
      compared++;
      for (const p of PROPS) {
        let a = live[key][p], b = local[key][p];
        if (a === b) continue;
        if (p === 'border-top-color' && live[key]['border-top-width'] === '0px' && local[key]['border-top-width'] === '0px') continue;
        if (p === 'border-left-color' && live[key]['border-left-width'] === '0px' && local[key]['border-left-width'] === '0px') continue;
        if (p === 'margin-top' || p === 'margin-bottom') continue; // compared via layout (height/width) instead
        a = px(await norm.color(a)); b = px(await norm.color(b));
        if (a === b) continue;
        if (p === 'font-family' && a.replace(/"Plus Jakarta Sans"/, '"Plus Jakarta Sans Variable"') === b) continue;
        if (p === 'font-family' && a.replace(/"JetBrains Mono"/, '"JetBrains Mono Variable"') === b) continue;
        const sig = `${p}: ${a}  →  ${b}`;
        (diffs[sig] ??= []).push(key.split('#')[0]);
      }
    }
    const onlyLive = Object.keys(live).filter((k) => !local[k]);
    console.log(`\n== ${name} [${theme}] compared ${compared} elements; ${Object.keys(diffs).length} distinct differences; ${onlyLive.length} live-only elements`);
    for (const [sig, keys] of Object.entries(diffs).sort((a, b) => b[1].length - a[1].length)) {
      console.log(`  (${keys.length}x) ${sig.slice(0, 400)}\n        e.g. ${[...new Set(keys)].slice(0, 2).join('  ;  ').slice(0, 160)}`);
    }
    if (onlyLive.length) console.log(`  live-only: ${onlyLive.slice(0, 6).join(' ; ').slice(0, 300)}`);
  }
}
await browser.close();
