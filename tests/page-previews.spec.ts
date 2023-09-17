// Tests to generate page previews in different screen sizes
import { test, devices } from '@playwright/test';

test('Captures Home preview - mobile', async ({ page }) => {
	await page.setViewportSize(devices['iPhone SE'].viewport);

	// Go to Home page
	await page.goto('/');

	await page.screenshot({ path: 'tests/page-previews/home-mobile.png', fullPage: true });
});

test('Captures Home preview - tablet', async ({ page }) => {
	await page.setViewportSize(devices['iPad Mini'].viewport);

	// Go to Home page
	await page.goto('/');

	await page.screenshot({ path: 'tests/page-previews/home-tablet.png', fullPage: true });
});

test('Captures Home preview - desktop', async ({ page }) => {
	await page.setViewportSize(devices['Desktop Chrome'].viewport);

	// Go to Home page
	await page.goto('/');

	await page.screenshot({ path: 'tests/page-previews/home-desktop.png', fullPage: true });
});

// Content pages
const routes = ['about', 'sponsorship', '2023', 'code-of-conduct'];
for (const route of routes) {
	test(`Captures ${route} preview - mobile`, async ({ page }) => {
		await page.setViewportSize(devices['iPhone SE'].viewport);

		// Go to page
		await page.goto(`http://127.0.0.1:5173/${route}`);

		await page.screenshot({ path: `tests/page-previews/${route}-mobile.png`, fullPage: true });
	});

	test(`Captures ${route} preview - tablet`, async ({ page }) => {
		await page.setViewportSize(devices['iPad Mini'].viewport);

		// Go to page
		await page.goto(`http://127.0.0.1:5173/${route}`);

		await page.screenshot({ path: `tests/page-previews/${route}-tablet.png`, fullPage: true });
	});

	test(`Captures ${route} preview - desktop`, async ({ page }) => {
		await page.setViewportSize(devices['Desktop Chrome'].viewport);

		// Go to page
		await page.goto(`http://127.0.0.1:5173/${route}`);

		await page.screenshot({ path: `tests/page-previews/${route}-desktop.png`, fullPage: true });
	});
}
