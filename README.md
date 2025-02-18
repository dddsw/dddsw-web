# DDD South West website

This is currently a WIP. Please feel free to raise any issues that you come across.

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

- Pages live under `src\routes`.
- Components live under `src\lib`.
- The app uses a shared layout, found in `src\routes\+layout.svelte`. The shared layout consists of the header, footer, and a `<slot />` in the middle which projects the content from the pages.
- Pages/routes are signified by creating a file called `+page.svelte`, and the route is taken from it's folder path. For example the homepage (route '/') is the first `+page.svelte` child under the `routes` folder, the about page (route '/about') is the `+page.svelte` under the `routes\about` folder.
- Typescript types live under `src\types`.
- Any shared app state lives in the `stores.js` file.
- Static assets (global css and images) live under the `static` folder.
- The Svelte components contain the Typescript (`<script>`), CSS (`<style>`), and Markup (`<div> etc.`).
- For the content pages, the page title is set via a store. Just import the pageTitle store and call `pageTitle.set('Sponsorship');`.

### CSS classes

Global styles live under `static\global.css`. All other styles live in the Svelte component in the `<style>` tag.

There are some shared classes which can be reused across the content pages:

Background colour classes to set the sections to the predefined colours:

```html
<div class="primary-bg">...</div>
```

`.section` to provide a basic responsive section:

```html
<div class="secondary-bg">
	<div class="section">
		<!-- add content here -->
	</div>
</div>
```

### Tests

When adding a new page, add the name and route to `tests\all-pages-to-test.ts` to enable automated accessibility and visual comparison tests.

If adding or changing a link in the nav, ensure it is add/changed in `tests\navigation.spec.ts`.

### Pre-commit hooks

> [!IMPORTANT]
> Playwright tests are run on pre-commit hooks and will fail if Playwright is not installed. See [running the tests](#running-the-tests) for info on how to set up Playwright

Pre-commit hooks are managed by [Husky](https://typicode.github.io/husky/get-started.html) and will be run whenever you make a commit. If they fail then the commit will be aborted and you will see an error.

To run pre-commit hooks without committing, stage all your changes and then execute the `.husky/pre-commit` file.

To commit but skip pre-commit hooks, run `git commit -m "my amazing commit message" --no-verify`
