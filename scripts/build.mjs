import { mkdir, copyFile, readFile, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
await rm(dist, { recursive: true, force: true });
for (const target of ['firefox', 'chromium']) {
  const out = join(dist, target);
  await mkdir(out, { recursive: true });
  const manifest = JSON.parse(await readFile(join(root, 'manifests', `${target}.json`), 'utf8'));
  await writeFile(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  for (const f of ['logic.js','main.js']) await copyFile(join(root, 'src', f), join(out, f));
  for (const f of ['icon16.png','icon48.png','icon128.png']) await copyFile(join(root, 'icons', f), join(out, f));
  console.log(`Build concluído: dist/${target}`);
}
