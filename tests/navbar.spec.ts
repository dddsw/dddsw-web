import { test, expect, devices } from '@playwright/test';

test('Clicking nav button displays nav links dropdown', async ({ page }) => {
	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	// Click nav drop down
	await page.locator('.main-nav-button').click();

	await expect(page.locator('.nav-link-container')).toBeVisible();
});

test('Clicking nav button closes nav links dropdown', async ({ page }) => {
	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	// Click nav drop down
	await page.locator('.main-nav-button').click();

	// Click nav drop down again
	await page.locator('.main-nav-button').click();

	await expect(page.locator('.nav-link-container')).toBeHidden();
});

test('Clicking nav link closes nav links dropdown', async ({ page }) => {
	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	// Click nav drop down
	await page.locator('.main-nav-button').click();

	// Click a nav link
	await page.locator('.nav-link-container a[href="/sponsorship"]').click();

	await expect(page.locator('.nav-link-container')).toBeHidden();
});

test('Clicking logo closes nav links dropdown', async ({ page }) => {
	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	// Click nav drop down
	await page.locator('.main-nav-button').click();

	// Click logo
	await page.locator('img[class~="logo"]').click();

	await expect(page.locator('.nav-link-container')).toBeHidden();
});

test('Clicking logo does not open nav links dropdown', async ({ page }) => {
	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	// Click logo
	await page.locator('img[class~="logo"]').click();

	await expect(page.locator('.nav-link-container')).toBeHidden();
});

test('Displays down arrow icon in unexpanded state', async ({ page }) => {
	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	await expect(page.locator('.main-nav-button span.icon')).toContainText('expand_more');
});

test('Displays up arrow icon in expanded state', async ({ page }) => {
	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	// Click nav drop down
	await page.locator('.main-nav-button').click();

	await expect(page.locator('.main-nav-button span.icon')).toContainText('expand_less');
});

test('Does not show current route in nav links drop down', async ({ page }) => {
	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	// Click nav drop down
	await page.locator('.main-nav-button').click();

	await expect(page.locator('.nav-link-container a[href="/about"]')).toBeHidden();
});

test('Does not show button text in smaller screens', async ({ page }) => {
	await page.setViewportSize(devices['iPhone SE'].viewport);

	// Go to about page (to avoid carousel weirdness)
	await page.goto('http://127.0.0.1:5173/about');

	await expect(page.locator('.nav-button-text')).toBeHidden();
});
