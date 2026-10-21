import { test, devices, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { devicesToTest } from './all-devices-to-test';
import { pagesToTest } from './all-pages-to-test';

let accessibilityScanner: AxeBuilder;

test.beforeEach(({ page }) => {
	accessibilityScanner = new AxeBuilder({ page }).withTags([
		'wcag2a',
		'wcag2aa',
		'wcag21a',
		'wcag21aa'
	]);
});

const colourModes = ['light', 'dark'] as const;

for (const [pageName, path] of pagesToTest) {
	for (const [deviceName, deviceViewport] of devicesToTest) {
		for (const colourMode of colourModes) {
			test(`${pageName} page a11y checks on ${deviceName} in ${colourMode} mode`, async ({
				page
			}) => {
				await page.setViewportSize(devices[deviceViewport].viewport);
				await page.emulateMedia({ colorScheme: colourMode });

				await page.goto(path);

				// Make sure the page really is in the mode under test, so a dark pass can't silently run in light.
				await expect(page.locator('html')).toHaveClass(
					colourMode === 'dark' ? /dark/ : /^(?!.*dark)/
				);

				await reportAccessibilityViolations();
			});
		}
	}
}

async function reportAccessibilityViolations() {
	// Scan the page with axe to look for a11y violations
	const violations = (await accessibilityScanner.analyze()).violations;

	// Make Playwright output the key information as a (more) human readable string
	let violationDescription = '';
	if (violations.length > 0) {
		violationDescription = `Warning - ${violations.length} a11y rule violations found\n\n`;

		for (let i = 0; i < violations.length; i++) {
			const violation = violations[i];
			violationDescription += `########################################################\n`;
			violationDescription += `Rule Violation ${i + 1}\n`;
			violationDescription += `${violation.impact?.toUpperCase()} - ${violation.help}\n`;
			violationDescription += `${violation.helpUrl}\n`;

			for (let j = 0; j < violation.nodes.length; j++) {
				const instance = violation.nodes[j];

				violationDescription += `--------------------------------------------------------\n`;
				violationDescription += `Instance ${j + 1}/${violation.nodes.length}\n\n`;

				violationDescription += `element html: ${instance.html}\n`;
				violationDescription += `element selector: ${instance.target}\n\n`;

				violationDescription += `${instance.failureSummary}\n\n`;
			}
		}
	}

	// If there are violations then output a human readable failure
	expect(violations, violationDescription).toHaveLength(0);
}
