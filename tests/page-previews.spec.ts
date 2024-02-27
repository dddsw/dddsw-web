// Tests to generate page previews in different screen sizes
import { test, devices, type Page } from '@playwright/test';

test('Captures Home preview - mobile', async ({ page }) => {
	await page.setViewportSize(devices['iPhone SE'].viewport);

	await savePagePreviewImage(page, '/', 'home-mobile');
});

test('Captures Home preview - tablet', async ({ page }) => {
	await page.setViewportSize(devices['iPad Mini'].viewport);

	await savePagePreviewImage(page, '/', 'home-tablet');
});

test('Captures Home preview - desktop', async ({ page }) => {
	await page.setViewportSize(devices['Desktop Chrome'].viewport);

	await savePagePreviewImage(page, '/', 'home-desktop');
});

// Content pages
const routes = ['about', 'sponsorship', '2024', 'code-of-conduct', 'new-speakers-workshop'];
for (const route of routes) {
	test(`Captures ${route} preview - mobile`, async ({ page }) => {
		await page.setViewportSize(devices['iPhone SE'].viewport);

		await savePagePreviewImage(page, route, `${route}-mobile`);
	});

	test(`Captures ${route} preview - tablet`, async ({ page }) => {
		await page.setViewportSize(devices['iPad Mini'].viewport);

		await savePagePreviewImage(page, route, `${route}-tablet`);
	});

	test(`Captures ${route} preview - desktop`, async ({ page }) => {
		await page.setViewportSize(devices['Desktop Chrome'].viewport);

		await savePagePreviewImage(page, route, `${route}-desktop`);
	});
}

async function savePagePreviewImage(page: Page, route: string, imageName: string) {
	// Go to page
	await page.goto(route);

	// Wait for everything to have definitely finished loading (like maps)
	await page.waitForLoadState('networkidle');

	// Save screenshot
	await page.screenshot({ path: `tests/page-previews/${imageName}.png`, fullPage: true });
}
