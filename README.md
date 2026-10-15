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

### Updating the site

| What                                           | Where                                                                                                 |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Event year, contact emails, venue, ticket link | `src/lib/eventDetails.ts`                                                                             |
| Dates and what has happened so far             | `src/lib/milestones.ts`                                                                               |
| Schedule, speakers and sessions                | Set `sessionizeJsonApiUrl` in `src/lib/eventDetails.ts`; the schedule and speakers pages then fill in |
| Team, sponsors, past events                    | `src/lib/content/*.ts`                                                                                |
| Which links appear in the main nav             | `src/lib/navigation.ts`                                                                               |

### How the site follows the milestones

Everything time-sensitive is driven by `src/lib/milestones.ts`. Marking a milestone as done, or giving it a date that has passed, changes the site:

- The home page "latest update" message (`src/lib/latestUpdate.ts`) and the timeline update.
- The **Schedule** and **Speakers** links appear in the nav once the schedule is announced.
- A **featured button** appears in the header while tickets, session voting or the call for papers is open.

Date and venue show as "To be confirmed" until they are set.

#### Featured header button

One button in the header follows the current milestone, and is absent when nothing is open (`src/lib/featured.ts`, built on `src/lib/timeline.ts`):

| Button           | Page               | Open from                                          | Until                      |
| ---------------- | ------------------ | -------------------------------------------------- | -------------------------- |
| Submit a talk    | `/call-for-papers` | "Call for speakers opens" (`OpenCallForSpeakers`)  | "Call for speakers closes" |
| Vote on sessions | `/session-voting`  | "Session voting opens" (`OpenSessionVoting`)       | "Session voting closes"    |
| Tickets          | `/tickets`         | "Schedule announced and ticket registration opens" | "Day of the event!"        |

If windows overlap, the later milestone wins (tickets, then voting, then the call for papers). These three pages are not in the main nav, but they stay reachable by URL and from the footer. Set `ticketTailorUrl` and `votingUrl` in `src/lib/eventDetails.ts` when their registration and voting forms exist.

#### Hidden until announced

| Nav item | Page        | Shown from                                         |
| -------- | ----------- | -------------------------------------------------- |
| Schedule | `/schedule` | "Schedule announced and ticket registration opens" |
| Speakers | `/speakers` | the same milestone (announced together)            |

Until then they are left out of the nav and the home page, but the pages stay reachable by URL. They always show while tickets are open, since tickets open with the announcement.

#### Previewing for testing

Add one of these to the end of any address to view things that are hidden or closed. Values combine with commas, for example `?preview=voting,schedule`.

| Add to any address  | Effect                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `?preview=tickets`  | Shows the **Tickets** featured button, and the **Schedule** and **Speakers** links (tickets are never open without them) |
| `?preview=voting`   | Shows the **Vote on sessions** featured button                                                                           |
| `?preview=cfp`      | Shows the **Submit a talk** featured button                                                                              |
| `?preview=none`     | Shows no featured button (the "nothing open" state)                                                                      |
| `?preview=schedule` | Shows the **Schedule** and **Speakers** links in the nav and the home page                                               |
| `?preview=speakers` | Same as `?preview=schedule`                                                                                              |
| `?preview=off`      | Clears the preview and goes back to the real milestones                                                                  |

- A preview is remembered for the rest of the browser tab, so you can click around.
- A previewed featured button has a dashed outline, so it is never mistaken for the real thing.
- If several featured values are given, the first one wins.
- A preview only changes what is linked. To see a page's open state, change its milestone in `src/lib/milestones.ts`.

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

| Control                                                                 | Resting                          | Hover and keyboard focus                                                                                                               |
| ----------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Primary action (Tickets page, Copy email, Sessionize, 404, dialogs)     | `btn preset-filled-primary-500`  | `preset-filled-surface-950-50` (navy; white in dark mode)                                                                              |
| Hero ticket button (navy)                                               | `preset-filled-surface-950-50`   | `preset-filled-surface-50-950` (white; navy in dark mode)                                                                              |
| Header featured button (`FeaturedLink`: navy, white in dark mode, icon) | `preset-filled-surface-950-50`   | `preset-filled-primary-500` (orange), because white would vanish on the white header                                                   |
| Outlined hero secondary button                                          | `preset-outlined-surface-950-50` | `preset-filled-surface-50-950` (white; navy in dark mode), the inverse of the hero ticket button beside it so the two never look alike |
| Outlined About year buttons                                             | `preset-outlined-primary-500`    | `preset-filled-surface-950-50`                                                                                                         |
| Tonal (Menu button, unselected year tabs, speaker buttons)              | `btn preset-tonal`               | `preset-filled-surface-950-50`                                                                                                         |
| Selected year tab                                                       | `preset-filled-primary-500`      | no change, and the arrow cursor                                                                                                        |
| Dark-mode switch                                                        | Skeleton's track colours         | off: `preset-filled-primary-500`; on: `preset-filled-surface-500` (keeps the white thumb visible)                                      |
| Toast close button                                                      | Skeleton default                 | `preset-filled-surface-950-50`                                                                                                         |
| Header logo link                                                        | plain (cow + wordmark)           | `preset-filled-surface-950-50` pill; the wordmark swaps to `text-surface-50-950` via `group-hover:`                                    |
| Header nav links                                                        | plain                            | hover: `preset-filled-surface-950-50`; current page: `preset-filled-primary-500` (no hover change)                                     |

The idea: orange is the resting "action" colour, and hovering flips to the high-contrast navy (white in dark mode). A new button picks the row above that matches its resting style.

### Tests

When adding a new page, add the name and route to `tests\all-pages-to-test.ts` to enable automated accessibility and visual comparison tests.

If adding or changing a link in the nav, ensure it is add/changed in `tests\navigation.spec.ts`.

### Pre-commit hooks

> [!IMPORTANT]
> Playwright tests are run on pre-commit hooks and will fail if Playwright is not installed. See [running the tests](#running-the-tests) for info on how to set up Playwright

Pre-commit hooks are managed by [Husky](https://typicode.github.io/husky/get-started.html) and will be run whenever you make a commit. If they fail then the commit will be aborted and you will see an error.

To run pre-commit hooks without committing, stage all your changes and then execute the `.husky/pre-commit` file.

To commit but skip pre-commit hooks, run `git commit -m "my amazing commit message" --no-verify`

### Common issues

#### It works fine locally but doesn't deploy

- Check that the `@sveltejs/adapter-auto` package is up to date
- Check that the Node version is LTS
