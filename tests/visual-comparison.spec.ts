// Tests to ensure that pages haven't visually changed
// This is useful to ensure CSS changes haven't changed unexpected things
// If a visual change is intentional then run `npm run test:update-screenshots`
import { test, devices, expect } from '@playwright/test';
import { pagesToTest } from './all-pages-to-test';
import { devicesToTest } from './all-devices-to-test';

for (const [pageName, path] of pagesToTest) {
	for (const [deviceName, deviceViewport] of devicesToTest) {
		test(`${pageName} page has no visual changes on ${deviceName}}`, async ({ page }) => {
			//Set viewport
			await page.setViewportSize(devices[deviceViewport].viewport);

			// The privacy cow arrives on a timer, so keep it out of screenshots (it has its own tests)
			await page.addInitScript(() => localStorage.setItem('privacyCowDismissed', '1'));

			// Go to page
			await page.goto(path);

			// A full-page screenshot doesn't scroll, so lazy images below the fold would never load.
			// Load them all now and wait until every image has loaded and decoded.
			await page.evaluate(async () => {
				const images = Array.from(document.images);
				for (const img of images) img.loading = 'eager';
				await Promise.all(
					images.map((img) =>
						img.complete
							? img.decode().catch(() => {})
							: new Promise((resolve) => {
									img.addEventListener('load', resolve, { once: true });
									img.addEventListener('error', resolve, { once: true });
								}).then(() => img.decode().catch(() => {}))
					)
				);
			});
			await page.waitForLoadState('networkidle');

			// Don't capture these elements because they are external to our site and we expect them to change
			const locatorsToIgnore = [page.locator('iframe')];

			// Compare screenshot to saved expectation (or save a new one if regenerating)
			await expect(page).toHaveScreenshot(`${pageName}-${deviceName}.png`, {
				fullPage: true,
				mask: locatorsToIgnore,
				// Long pages (like the speaker directory) can take more than the default 5s to capture twice
				timeout: 15_000,
				maxDiffPixelRatio: 0.01 //experimenting to find right value, increase if tests fail on neglibible rendering change
			});
		});
	}
}
