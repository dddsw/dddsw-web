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
			page.setViewportSize(devices[deviceViewport].viewport);

			// Go to page
			await page.goto(path);

			// Don't capture these elements because they are external to our site and we expect them to change
			const locatorsToIgnore = [page.locator('iframe')];

			// Compare screenshot to saved expectation (or save a new one if regenerating)
			await expect(page).toHaveScreenshot(`${pageName}-${deviceName}.png`, {
				fullPage: true,
				mask: locatorsToIgnore,
				maxDiffPixelRatio: 0.01 //experimenting to find right value, increase if tests fail on neglibible rendering change
			});
		});
	}
}
