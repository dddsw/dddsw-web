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

You can run the Playwright tests via a command prompt with:

```bash
npm run test
```

You can also run them via the Playwright VS Code extension.

The tests generate page previews in different device sizes. The screenshots are saved under `tests\page-previews`.

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

<!-- test -->
