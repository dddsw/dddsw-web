import { test, expect } from '@playwright/test';

const routes = ['about', 'sponsorship', '2023', 'code-of-conduct'];
for (const route of routes) {
	test(`Can navigate to ${route} page from Home via the nav bar`, async ({ page }) => {
		// Go to Home page
		await page.goto('/');

		// Click nav drop down
		await page.locator('.main-nav-button').click();

		// Click the nav link
		await page.locator(`.nav-link-container a[href="/${route}"]`).click();

		await expect(page).toHaveURL(`http://127.0.0.1:5173/${route}`);
	});
}

test('Can navigate to Home from content page by clicking logo', async ({ page }) => {
	// Go to about page
	await page.goto('/about');

	// Click logo
	await page.locator('img[class~="logo"]').click();

	await expect(page).toHaveURL('http://127.0.0.1:5173/');
});
