# DDD South West website

This is currently a WIP. Please feel free to raise any issues that you come across.

## Pre-reqs

- Node 24
- npm v11+

## Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npm run dev

   # or start the server and open the app in a new browser tab
   npm run dev -- --open
   ```

## Running the tests

Before running the tests for the first time (or after a Playwright version update), ensure you update the browsers with:

```bash
npx playwright install
```

You can run the Playwright tests via a command prompt with:

```bash
npm run test

# or launch the interactive Playwright test runner
npm run test:ui
```

You can also run them via the Playwright VS Code extension.

Each test run starts its own dev server on a free port, so it never reuses a dev server you already have running (for example on 5173, or one from another git worktree), and runs from several worktrees can happen at the same time. To pin the port, set `PLAYWRIGHT_PORT` (e.g. `PLAYWRIGHT_PORT=5180 npm run test`); the run fails if that port is already in use.

### Visual comparison tests

The tests generate page previews in different device sizes and test to ensure that they haven't changed. The screenshots are saved under `tests\__screenshots__`. and can be regenerated with `npm run test:update-screenshots`.

If a visual test fails, look under the attachments in the report for a visual diff.

## Contributing

Make sure to run the lint/format commands, and the Playwright tests! :)

### Structure of the app

The site is SvelteKit 3 and Svelte 5, styled with [Skeleton](https://www.skeleton.dev/) v5 on Tailwind 4, and deployed to Cloudflare.

- Pages live under `src/routes`. A page is a `+page.svelte` in a folder named after its route.
- Imports from `src/lib` use the `#lib/...` alias with the file extension, e.g. `#lib/eventDetails.ts`.
- Components live under `src/lib/components`. TypeScript types for the Sessionize sessions page live under `src/types`.
- Content lives under `src/lib/content`: the team, principles, sponsors and past events.
- Brand colours and fonts live in `src/dddsw-theme.css` (primary 500 is `#ff9930`; text on orange is charcoal for contrast). Global styles are in `src/app.css`.
- Light and dark mode are toggled with a `dark` class on `<html>`, set by the toggle in the header and remembered in the browser.

### Managing the site

[docs/managing-the-site.md](docs/managing-the-site.md) covers running the site through the year: what shows and hides at each stage, the switches that turn things on and off, previewing a state with `?preview=`, and the scripts (including importing a past year's talks and speakers).

| What                                     | Where                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| Event year, contact emails, venue, links | `src/lib/eventDetails.ts`                                                                     |
| Dates, and what has happened so far      | `src/lib/milestones.ts`                                                                       |
| Schedule, speakers and sessions          | Set `sessionizeJsonApiUrl` in `src/lib/eventDetails.ts`                                       |
| Sponsors and the attendee progress bar   | `src/lib/content/sponsors.ts`                                                                 |
| Team, past events                        | `src/lib/content/*.ts`                                                                        |
| Past years' talks and speakers           | `npm run import:past-year` (see [docs/importing-past-years.md](docs/importing-past-years.md)) |
| Which links appear in the main nav       | `src/lib/navigation.ts`                                                                       |

### Page layout

Every page except the home page and error pages gets an orange heading banner and the standard content width from `src/routes/+layout.svelte`, so a page only contains its own content. Give it a heading by returning a `title` (and optionally a `lead`) from its `load` function:

```ts
// +page.ts
export const load = () => ({ title: 'My page', lead: 'A short introduction.' });
```

Width and spacing live in `src/lib/components/Container.svelte` (one place for the whole site). A page with its own full-width design opts out by returning `bare: true` from `load`, as the home page does. Error pages are bare automatically.

### Buttons and hover colours

Keep every button, tab and toggle consistent:

- Use Skeleton presets only (`preset-filled-*`, `preset-outlined-*`, `preset-tonal`), never hand-picked colours.
- Hover is a **contrasting colour**, never a brightness change. Skeleton's built-in brightness hover is switched off globally in `src/app.css`, so each control sets its own.
- Always pair `hover:` with `focus-visible:` so keyboard users get the same change.
- Native `<button>`s, tabs and the dark-mode switch need `cursor-pointer` (Tailwind 4 uses the arrow); links already show the hand.

| Control                                                                     | Resting                          | Hover and keyboard focus                                                                                                               |
| --------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Primary action (Tickets page, Copy email, Sessionize, 404, dialogs)         | `btn preset-filled-primary-500`  | `preset-filled-surface-950-50` (navy; white in dark mode)                                                                              |
| Hero ticket button (navy)                                                   | `preset-filled-surface-950-50`   | `preset-filled-surface-50-950` (white; navy in dark mode)                                                                              |
| Header featured button (`FeaturedLink`: navy, white in dark mode, icon)     | `preset-filled-surface-950-50`   | `preset-filled-primary-500` (orange), because white would vanish on the white header                                                   |
| Outlined hero secondary button (solid navy when it is the only hero button) | `preset-outlined-surface-950-50` | `preset-filled-surface-50-950` (white; navy in dark mode), the inverse of the hero ticket button beside it so the two never look alike |
| Outlined About year buttons                                                 | `preset-outlined-primary-500`    | `preset-filled-surface-950-50`                                                                                                         |
| Tonal (Menu button, unselected year tabs, speaker buttons)                  | `btn preset-tonal`               | `preset-filled-surface-950-50`                                                                                                         |
| Selected year tab                                                           | `preset-filled-primary-500`      | no change, and the arrow cursor                                                                                                        |
| Dark-mode switch                                                            | Skeleton's track colours         | off: `preset-filled-primary-500`; on: `preset-filled-surface-500` (keeps the white thumb visible)                                      |
| Toast close button                                                          | Skeleton default                 | `preset-filled-surface-950-50`                                                                                                         |
| Header logo link                                                            | plain (cow + wordmark)           | `preset-filled-surface-950-50` pill; the wordmark swaps to `text-surface-50-950` via `group-hover:`                                    |
| Header nav links                                                            | plain                            | hover: `preset-filled-surface-950-50`; current page: `preset-filled-primary-500` (no hover change)                                     |

The idea: orange is the resting "action" colour, and hovering flips to the high-contrast navy (white in dark mode). A new button picks the row above that matches its resting style.

### Tests

When adding a new page, add the name and route to `tests\all-pages-to-test.ts` to enable automated accessibility and visual comparison tests.

If adding or changing a link in the nav, ensure it is add/changed in `tests\navigation.spec.ts`.

### Pre-commit hooks

Pre-commit hooks are managed by [Husky](https://typicode.github.io/husky/get-started.html) and will be run whenever you make a commit. They run ESLint and Prettier on the staged files, then the unit tests (`npm run test:unit`). The Playwright tests run on each pull request instead. If they fail then the commit will be aborted and you will see an error.

To run pre-commit hooks without committing, stage all your changes and then execute the `.husky/pre-commit` file.

To commit but skip pre-commit hooks, run `git commit -m "my amazing commit message" --no-verify`

### Common issues

#### It works fine locally but doesn't deploy

- Check that the `@sveltejs/adapter-cloudflare` package is up to date
- Check that the Node version matches `.node-version`

### Images

Put images in `src/lib/assets/images` (not `static/`) and show them with `<enhanced:img src={picture('folder/file.jpg')} />` (see `src/lib/images.ts`). The build turns each one into AVIF, WebP and a JPEG/PNG fallback at the widths it's needed, with `width`/`height` set. Add photos at full size and give them a `sizes` attribute. Save logos and avatars at about twice the size they're shown. The first page a fresh dev server shows takes a minute or so while it makes every image; they're cached in `node_modules/.cache/imagetools` after that.
