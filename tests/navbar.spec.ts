import { test, expect, devices } from '@playwright/test';
import { Header } from './page-object/header';

test.describe('Navbar', () => {
	let header: Header;

	test.beforeEach(async ({ page }) => {
		await page.goto('/about');

		//Ensure everything has loaded to prevent flakiness
		await page.waitForLoadState('networkidle');

		header = new Header(page);
	});

	test.describe('on a wide screen', () => {
		test('Shows the nav links in the header instead of a menu', async () => {
			await expect(header.mainNav).toBeVisible();
			await expect(header.menuButton).toBeHidden();
		});

		test('Marks the current page', async () => {
			await expect(header.getNavLinkTo('about')).toHaveAttribute('aria-current', 'page');
		});
	});

	test.describe('on a phone', () => {
		test.beforeEach(async ({ page }) => {
			await page.setViewportSize(devices['iPhone SE'].viewport);
		});

		test('Hides the nav links until the menu is opened', async () => {
			await expect(header.mainNav).toBeHidden();
			await header.menuButton.click();

			await expect(header.mobileNav).toBeVisible();
		});

		test('Clicking the menu button again closes the menu', async () => {
			await header.menuButton.click();
			await header.menuButton.click();

			await expect(header.mobileNav).toBeHidden();
		});

		test('Clicking a nav link closes the menu', async () => {
			await header.menuButton.click();
			await header.getNavLinkTo('sponsorship', header.mobileNav).click();

			await expect(header.mobileNav).toBeHidden();
		});

		test('Clicking logo does not open the menu', async () => {
			await header.logo.click();

			await expect(header.mobileNav).toBeHidden();
		});
	});
});
