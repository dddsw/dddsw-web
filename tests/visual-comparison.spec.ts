// Tests to ensure that pages haven't visually changed
// This is useful to ensure CSS changes haven't changed unexpected things
// If a visual change is intentional then run `npm run test:update-screenshots`
import { test, devices, expect } from '@playwright/test';

const pages: [pageName: string, path: string][] = [
	['Home', '/'],
	['About', 'about'],
	['Sponsorship', 'sponsorship'],
	['Venue', 'venue'],
	['Code of conduct', 'code-of-conduct'],
	['Code of conduct (internal)', 'code-of-conduct/internal'],
	['New speakers workshop', 'new-speakers-workshop']
];

const devicestoTest: [deviceName: string, deviceViewport: string][] = [
	['desktop', 'Desktop Chrome'],
	['tablet', 'iPad Mini'],
	['mobile', 'iPhone SE']
];

for (const [pageName, path] of pages) {
	for (const [deviceName, deviceViewport] of devicestoTest) {
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
