// Renders the social media images into static/social-assets. They are saved in the repo, so the
// build doesn't render them each time. Run `npm run generate:social-assets` after changing
// `src/lib/socialAssets.ts`, the cow, or the brand colours in `src/lib/server/socialAssetImages.ts`.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderAllSocialAssets } from '../src/lib/server/socialAssetImages.ts';

const dir = fileURLToPath(new URL('../static/social-assets/', import.meta.url));
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
const files = renderAllSocialAssets();
for (const [name, png] of files) writeFileSync(`${dir}${name}`, png);
console.log(`Wrote ${files.size} files to static/social-assets`);
