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

	test('wanders off after 30 seconds and comes back 15 minutes later', async ({ page }) => {
		await page.clock.install();
		await page.goto('/about');
		const cow = page.getByRole('complementary', { name: 'Privacy' });
		await page.clock.runFor(2000);
		await expect(cow).toBeVisible();

		await page.clock.runFor(30_000);
		await expect(cow).toHaveCount(0);

		// Still away after a reload partway through its break.
		await page.clock.runFor(5 * 60_000);
		await page.reload();
		await page.clock.runFor(2000);
		await expect(cow).toHaveCount(0);

		await page.clock.runFor(10 * 60_000);
		await expect(cow).toBeVisible();
		await expect(page.locator('#privacy-cow-bubble')).toContainText("We don't track you!");

		// And round again.
		await page.clock.runFor(30_000);
		await expect(cow).toHaveCount(0);
	});

	test('stays away on the privacy policy itself', async ({ page }) => {
		await page.goto('/privacy-policy');
		await page.waitForTimeout(2500);
		await expect(page.getByRole('complementary', { name: 'Privacy' })).toHaveCount(0);
	});
});
