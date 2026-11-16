// Regression check: compares the visible text of each page on production with
// the local Astro build (http://localhost:4321). Prints word-level differences.
import { parse } from 'node-html-parser';

// Override with env vars, e.g. LIVE=https://<preview>.zeabur.app LOCAL=http://localhost:4321
const LIVE = process.env.LIVE ?? 'https://www.akfitness.lv';
const LOCAL = process.env.LOCAL ?? 'http://localhost:4321';

const PAGES = [
  'index', 'online-coaching', 'treninu-coaching', 'fitnesa-konsultacija',
  'treninu-plani', 'treneris-anna', 'treneris-krisjanis', 'privatuma-politika', 'pakalpojuma-noteikumi',
];

const words = (html) => {
  // Put a space between adjacent elements so minified/unminified HTML compare equal.
  const root = parse(html.replace(/>\s*</g, '> <'));
  root.querySelectorAll('script, style, noscript, template').forEach((n) => n.remove());
  const title = root.querySelector('title')?.text ?? '';
  const body = root.querySelector('body') ?? root;
  return { title: title.trim(), words: body.text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean) };
};

// Small LCS-based diff on word arrays; returns removed/added runs.
function diff(a, b) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = [];
  let i = 0, j = 0, cur = null;
  const push = (type, w) => {
    if (!cur || cur.type !== type) out.push((cur = { type, w: [] }));
    cur.w.push(w);
  };
  while (i < n && j < m) {
    if (a[i] === b[j]) { cur = null; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) push('-', a[i++]);
    else push('+', b[j++]);
  }
  while (i < n) push('-', a[i++]);
  while (j < m) push('+', b[j++]);
  return out;
}

for (const p of PAGES) {
  const [live, local] = await Promise.all([
    fetch(`${LIVE}/${p}.html`).then((r) => r.text()),
    fetch(`${LOCAL}/${p}.html`).then((r) => r.text()),
  ]);
  const L = words(live), N = words(local);
  const d = diff(L.words, N.words);
  const titleNote = L.title === N.title ? '' : `  TITLE: "${L.title}" -> "${N.title}"`;
  console.log(`\n== ${p}: live ${L.words.length} words, new ${N.words.length}, ${d.length} change runs${titleNote}`);
  for (const run of d) console.log(`  ${run.type} ${run.w.join(' ').slice(0, 160)}`);
}
