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

		const routes = ['about', 'sponsorship', 'code-of-conduct'];
		for (const route of routes) {
			test(`Can navigate to ${route} page via the nav bar`, async ({ page }) => {
				// Click nav drop down
				await header.navDropDownButton.click();

				// Click the nav link
				await header.getNavLinkTo(route).click();

				await expect(page).toHaveURL(`http://127.0.0.1:5173/${route}`);
			});
		}
	});

	test('Can navigate to Home from content page by clicking logo', async ({ page }) => {
		// Go to about page
		await page.goto('/about');
		//Ensure everything has loaded to prevent flakiness
		await page.waitForLoadState('networkidle');

		// Click logo
		await header.logo.click();

		await expect(page).toHaveURL('http://127.0.0.1:5173/');
	});

	test('Can navigate to Home from content page via the nav bar', async ({ page }) => {
		// Go to about page
		await page.goto('/about');
		//Ensure everything has loaded to prevent flakiness
		await page.waitForLoadState('networkidle');

		// Click nav drop down
		await header.navDropDownButton.click();
		// Click nav link to home
		await header.getNavLinkTo('').click();

		await expect(page).toHaveURL('http://127.0.0.1:5173/');
	});
});
