// Verifies that the private, pipeline-facing pages are copied into dist/
// byte-for-byte. The n8n contract/signing/intake flow depends on these exact
// files at these exact URLs. Run after `npm run build`: npm run check:private
import { readFileSync, existsSync } from 'node:fs';

const PRIVATE = [
  'anketa.html',
  'paraksts.html',
  'ligums-coaching-full.html',
  'ligums-coaching-workouts.html',
  'ligums-consultation.html',
  'robots.txt',
  'ak-logo-white.png',
  '_headers',
];

let failed = 0;
for (const f of PRIVATE) {
  const src = `public/${f}`;
  const out = `dist/${f}`;
  if (!existsSync(out)) {
    console.error(`MISSING  ${out}`);
    failed++;
    continue;
  }
  if (!readFileSync(src).equals(readFileSync(out))) {
    console.error(`CHANGED  ${out} differs from ${src}`);
    failed++;
    continue;
  }
  console.log(`ok       ${out}`);
}

if (failed) {
  console.error(`\n${failed} private file(s) failed the check.`);
  process.exit(1);
}
console.log('\nAll private files are byte-identical.');
