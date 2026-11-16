import { test, expect } from '@playwright/test';

test.describe('Past events talks', () => {
	test('clicking the title of a talk with an abstract opens its details', async ({ page }) => {
		await page.goto('/past-events#2026');
		const title = page.getByRole('link', { name: 'Passkeys in ASP.NET Core 10', exact: true });
		await expect(title).toHaveAttribute('href', '#2026/passkeys-in-asp-net-core-10');

		await title.click();

		await expect(page.getByRole('dialog', { name: 'Passkeys in ASP.NET Core 10' })).toBeVisible();
		await expect(page).toHaveURL(/#2026\/passkeys-in-asp-net-core-10$/);
	});

	test('the title of a talk without an abstract is not a link', async ({ page }) => {
		// 2011's talks come from the old site's agenda, with no abstracts.
		await page.goto('/past-events#2011');
		const card = page.locator('[data-talk="2011/minimalist-software-development"]');
		await expect(card.getByText('Minimalist Software Development')).toBeVisible();
		await expect(card.getByRole('link', { name: 'Minimalist Software Development' })).toHaveCount(
			0
		);
	});
});
