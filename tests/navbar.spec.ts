import { test, expect, devices } from '@playwright/test';
import { Header } from './page-object/header';

test.describe('Navbar', () => {
	let header: Header;

	test.beforeEach(async ({ page }) => {
		// Go to about page (to avoid carousel weirdness)
		await page.goto('/about');

		//Ensure everything has loaded to prevent flakiness
		await page.waitForLoadState('networkidle');

		header = new Header(page);
	});

	test('Clicking nav button displays nav links dropdown', async () => {
		// Click nav drop down
		await header.navDropDownButton.click();

		await expect(header.navDropDown).toBeVisible();
	});

	test('Clicking nav button closes nav links dropdown', async () => {
		// Click nav drop down
		await header.navDropDownButton.click();

		// Click nav drop down again
		await header.navDropDownButton.click();

		await expect(header.navDropDown).toBeHidden();
	});

	test('Clicking nav link closes nav links dropdown', async () => {
		// Click nav drop down
		await header.navDropDownButton.click();

		// Click a nav link
		await header.getNavLinkTo('sponsorship').click();

		await expect(header.navDropDown).toBeHidden();
	});

	test('Clicking logo closes nav links dropdown', async () => {
		// Click nav drop down
		await header.navDropDownButton.click();

		// Click logo
		await header.logo.click();

		await expect(header.navDropDown).toBeHidden();
	});

	test('Clicking logo does not open nav links dropdown', async () => {
		// Click logo
		await header.logo.click();

		await expect(header.navDropDown).toBeHidden();
	});

	test('Displays down arrow icon in unexpanded state', async () => {
		await expect(header.navDropDownButton).toContainText('expand_more');
	});

	test('Displays up arrow icon in expanded state', async () => {
		// Click nav drop down
		await header.navDropDownButton.click();

		await expect(header.navDropDownButton).toContainText('expand_less');
	});

	test('Does not show button text in smaller screens', async ({ page }) => {
		// Set to mobile view
		await page.setViewportSize(devices['iPhone SE'].viewport);

		await expect(page.locator('.nav-button-text')).toBeHidden();
	});
});
