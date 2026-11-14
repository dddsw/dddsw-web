import { test, expect } from '@playwright/test';

test.describe('Privacy cow', () => {
	test('peeks in and says we do not track you, linking to the privacy policy', async ({ page }) => {
		await page.goto('/about');
		const cow = page.getByRole('complementary', { name: 'Privacy' });
		await expect(cow).toBeVisible();

		const bubble = page.locator('#privacy-cow-bubble');
		await expect(bubble).toContainText("We don't track you!");
		await expect(bubble.getByRole('link', { name: 'Find out more here' })).toHaveAttribute(
			'href',
			'/privacy-policy#analytics-cookies'
		);
	});

	test('the cow toggles its bubble', async ({ page }) => {
		await page.goto('/about');
		const button = page.getByRole('button', { name: "We don't track you" });
		await expect(button).toHaveAttribute('aria-expanded', 'true');
		await button.click();
		await expect(button).toHaveAttribute('aria-expanded', 'false');
		await expect(page.locator('#privacy-cow-bubble')).toHaveCount(0);
	});

	test('closing it sends the cow away for good', async ({ page }) => {
		await page.goto('/about');
		await page.locator('#privacy-cow-bubble').getByRole('button', { name: 'Close' }).click();
		const cow = page.getByRole('complementary', { name: 'Privacy' });
		await expect(cow).toHaveCount(0);

		await page.reload();
		// Longer than the cow takes to arrive.
		await page.waitForTimeout(2500);
		await expect(cow).toHaveCount(0);
	});

	test('stays away on the privacy policy itself', async ({ page }) => {
		await page.goto('/privacy-policy');
		await page.waitForTimeout(2500);
		await expect(page.getByRole('complementary', { name: 'Privacy' })).toHaveCount(0);
	});
});
