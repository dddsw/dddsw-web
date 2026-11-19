// The style guide shows which colour mode it is in, and follows the header's switch live.
import { test, expect } from '@playwright/test';

test.describe('Style guide colour mode', () => {
	test('starts in the visitor’s mode', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto('/style-guide');
		await expect(page.getByTestId('style-guide-mode')).toHaveText('dark');
	});

	test('follows the header switch', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto('/style-guide');
		// Wait for the page to hydrate, so the switch's handler is attached before it is clicked.
		await page.waitForLoadState('networkidle');
		const mode = page.getByTestId('style-guide-mode');
		await expect(mode).toHaveText('light');
		await expect(page.getByText('In light mode: surface-50', { exact: true })).toBeVisible();

		// The switch's checkbox is visually hidden, so click its visible track, as a person would.
		const toggle = page.locator('header [data-scope="switch"][data-part="control"]');
		const checkbox = page.getByRole('checkbox', { name: 'Dark mode' });
		await toggle.click();
		await expect(checkbox).toBeChecked();
		await expect(mode).toHaveText('dark');
		await expect(
			page.getByText('In dark mode: surface-950', { exact: true }).first()
		).toBeVisible();

		await toggle.click();
		await expect(mode).toHaveText('light');
	});
});
