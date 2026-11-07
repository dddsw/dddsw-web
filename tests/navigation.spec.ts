import { test, expect } from '@playwright/test';
import { Header } from './page-object/header';

test.describe('Navigation', () => {
	let header: Header;

	test.beforeEach(async ({ page }) => {
		header = new Header(page);
	});

	test.describe('From home', () => {
		test.beforeEach(async ({ page }) => {
			// Go to Home page
			await page.goto('/');

			//Ensure everything has loaded to prevent flakiness
			await page.waitForLoadState('networkidle');
		});

		const routes = ['about', 'sponsorship'];
		for (const route of routes) {
			test(`Can navigate to ${route} page via the nav bar`, async ({ page, baseURL }) => {
				// Click the nav link
				await header.getNavLinkTo(route).click();

				await expect(page).toHaveURL(new URL(route, baseURL).href);
			});
		}
	});

	test('Can navigate to Home from content page by clicking logo', async ({ page, baseURL }) => {
		// Go to about page
		await page.goto('/about');
		//Ensure everything has loaded to prevent flakiness
		await page.waitForLoadState('networkidle');

		// Click logo
		await header.logo.click();

		await expect(page).toHaveURL(new URL('/', baseURL).href);
	});
});
