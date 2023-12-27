import { test, devices, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('A11y tests', () => {
	let accessibilityScanner: AxeBuilder;

	test.beforeEach(({ page }) => {
		accessibilityScanner = new AxeBuilder({ page }).withTags([
			'wcag2a',
			'wcag2aa',
			'wcag21a',
			'wcag21aa'
		]);
	});

	const viewPorts = new Map([
		['mobile', 'iPhone SE'],
		['tablet', 'iPad Mini'],
		['desktop', 'Desktop Chrome']
	]);
	for (const [viewportName, viewportDevice] of viewPorts) {

		//Home page
		test(`Home - ${viewportName}`, async ({ page }) => {
			await page.setViewportSize(devices[viewportDevice].viewport);

			await page.goto('/');

			expect((await accessibilityScanner.analyze()).violations).toEqual([]);
		});

		// Content pages
		const routes = ['about', 'sponsorship', '2024', 'code-of-conduct'];
		for (const route of routes) {
			test(`${route} - ${viewportName}`, async ({ page }) => {
				await page.setViewportSize(devices[viewportDevice].viewport);

				await page.goto(route);

				expect((await accessibilityScanner.analyze()).violations).toEqual([]);
			});
		}
	}
});
