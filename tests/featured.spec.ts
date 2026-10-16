import { test, expect } from '@playwright/test';

// The featured header button and the schedule/speakers links follow the milestones in
// src/lib/milestones.ts. With none reached they are hidden, and ?preview=... shows them for testing.
test.describe('featured header button', () => {
	const featured = /Tickets|Vote on sessions|Submit a talk/;

	test('is absent while no milestone is open', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('header').getByRole('link', { name: featured })).toHaveCount(0);
	});

	for (const [id, label, href] of [
		['tickets', 'Tickets', '/tickets'],
		['voting', 'Vote on sessions', '/session-voting'],
		['cfp', 'Submit a talk', '/call-for-papers']
	] as const) {
		test(`?preview=${id} shows the ${label} button, and it persists across pages`, async ({
			page
		}) => {
			await page.goto(`/?preview=${id}`);
			const link = page
				.locator('header')
				.getByRole('link', { name: new RegExp(label) })
				.first();
			await expect(link).toBeVisible();
			await expect(link).toHaveAttribute('href', href);
			await page.goto('/venue');
			await expect(
				page
					.locator('header')
					.getByRole('link', { name: new RegExp(label) })
					.first()
			).toBeVisible();
		});
	}

	test('?preview=off goes back to the real milestones', async ({ page }) => {
		await page.goto('/?preview=tickets');
		await page.goto('/?preview=off');
		await expect(page.locator('header').getByRole('link', { name: featured })).toHaveCount(0);
	});
});

test.describe('home page ticket button', () => {
	test('is hidden until tickets are open', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('link', { name: 'Get your free ticket' })).toHaveCount(0);
	});

	test('?preview=tickets shows it', async ({ page }) => {
		await page.goto('/?preview=tickets');
		await expect(page.getByRole('link', { name: 'Get your free ticket' })).toBeVisible();
	});
});

test.describe('schedule and speakers links', () => {
	test('are hidden until announced, but the pages still load', async ({ page }) => {
		await page.goto('/');
		for (const name of ['Schedule', 'Speakers']) {
			await expect(page.locator('header').getByRole('link', { name, exact: true })).toHaveCount(0);
		}
		await page.goto('/speakers');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Speakers');
	});

	test('?preview=schedule shows them in the nav', async ({ page }) => {
		await page.goto('/?preview=schedule');
		for (const name of ['Schedule', 'Speakers']) {
			await expect(
				page.locator('header').getByRole('link', { name, exact: true }).first()
			).toBeVisible();
		}
	});
});

test('date and venue show as to be confirmed', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('To be confirmed', { exact: true })).toHaveCount(2);
});

test('the hero button goes straight to the boss email', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Convince your boss to sponsor us' }).click();
	await expect(page).toHaveURL(/\/sponsorship#convince-your-boss$/);
	await expect(page.getByRole('heading', { name: 'Convince your boss' })).toBeInViewport();
});

test('sponsor page offers the boss email', async ({ page }) => {
	await page.goto('/sponsorship');
	await expect(page.getByRole('button', { name: 'Copy email' })).toBeVisible();
});

test('the copyright line uses the current year, not the event year', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('footer')).toContainText(`© ${new Date().getFullYear()}`);
});

test.describe('meta description', () => {
	const description = (page: import('@playwright/test').Page) =>
		page.locator('meta[name="description"]').getAttribute('content');

	test("uses the page's own lead", async ({ page }) => {
		await page.goto('/venue');
		expect(await description(page)).toBe(
			'Where to find us, how to get there and what to expect when you arrive.'
		);
	});

	test('falls back to the general description on the home page', async ({ page }) => {
		await page.goto('/');
		expect(await description(page)).toContain('A friendly, community-run conference');
	});
});

test('theme toggle switches and remembers dark mode', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	await page.locator('[data-scope="switch"][data-part="control"]').click();
	await expect(page.locator('html')).toHaveClass(/dark/);
	await page.reload();
	await expect(page.locator('html')).toHaveClass(/dark/);
});

test('unknown routes show the friendly 404', async ({ page }) => {
	await page.goto('/does-not-exist');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('wandered off');
});
