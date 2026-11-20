# DDD South West website

SvelteKit 3 + Svelte 5, Skeleton v5 on Tailwind 4, deployed to Cloudflare. The README is the main guide; read its **Contributing** section before changing pages or styles.

## Commands

- `npm run dev`: local dev server
- `npm run check`: type and Svelte checks
- `npm run lint` / `npm run lint:fix:all`: Prettier and ESLint
- `npm run test:unit`: Vitest
- `npm test`: Playwright (accessibility, visual comparison, navigation)
- `npm run test:update-screenshots`: refresh visual snapshots after an intended visual change

## Conventions

- Import from `src/lib` with the `#lib/...` alias and the file extension, e.g. `#lib/eventDetails.ts`.
- Pages give their banner heading by returning `title` and `lead` from `load`. Width and spacing come from `Container.svelte`; don't set them per page.
- Colours, fonts and radii come from `src/dddsw-theme.css`, global styles from `src/app.css`. Use Skeleton presets and theme tokens, never hand-picked colours.
- Buttons and controls: hover is a contrasting fill, never a brightness change, and every `hover:` is paired with `focus-visible:`. See the README's **Buttons and hover colours** table.

## Style guide

`/style-guide` (`src/routes/style-guide/+page.svelte`) is the reference for every UI building block: colour roles, text, links, buttons, tabs, cards, dialogs, toasts and brand pieces, with the classes to copy. A badge shows which mode it is in (light or dark) and follows the header switch, so check both.

- Build new UI from the patterns shown there rather than inventing new ones.
- When you add or change a shared pattern, update the style guide in the same change.
- It's unlisted (`unlistedRoutes` in `src/lib/seo.ts`) and returns `nofollow: true`, so it's served with `noindex, nofollow`.

## Adding a page

1. Create `src/routes/<route>/+page.svelte` and a `+page.ts` that returns `title` and `lead`.
2. List the route in `src/lib/seo.ts`, either as a listed page or in `unlistedRoutes`. `seo.test.ts` fails if it's missing.
3. Add it to `tests/all-pages-to-test.ts` for the accessibility and visual tests, then generate its screenshots.
4. If it goes in the nav, update `src/lib/navigation.ts` and `tests/navigation.spec.ts`.
