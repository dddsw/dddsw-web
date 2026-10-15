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

The site is SvelteKit 2 and Svelte 5, styled with [Skeleton](https://www.skeleton.dev/) v5 on Tailwind 4, and deployed to Cloudflare.

- Pages live under `src/routes`. A page is a `+page.svelte` in a folder named after its route.
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

To see the hidden states before they happen, add `?preview=` to any address (it is remembered for the browser tab): `tickets`, `voting`, `cfp` (the featured button), `none`, `schedule` (the Schedule and Speakers links), or `off` to go back to the real milestones. Combine with commas, e.g. `?preview=voting,schedule`.

### Page layout

Every page except the home page and error pages gets an orange heading banner and the standard content width from `src/routes/+layout.svelte`, so a page only contains its own content. Give it a heading by returning a `title` (and optionally a `lead`) from its `load` function:

```ts
// +page.ts
export const load = () => ({ title: 'My page', lead: 'A short introduction.' });
```

A page with its own full-width design returns `bare: true` instead (the home page does).

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
