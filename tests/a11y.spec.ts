import { test, devices, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

let accessibilityScanner: AxeBuilder;

test.beforeEach(({ page }) => {
	accessibilityScanner = new AxeBuilder({ page }).withTags([
		'wcag2a',
		'wcag2aa',
		'wcag21a',
		'wcag21aa'
	]);
});

const viewPorts = new Map([
	['mobile', 'iPhone SE'],
	['tablet', 'iPad Mini'],
	['desktop', 'Desktop Chrome']
]);
for (const [viewportName, viewportDevice] of viewPorts) {
	//Home page
	test(`Home page a11y checks - ${viewportName}`, async ({ page }) => {
		await page.setViewportSize(devices[viewportDevice].viewport);

		await page.goto('/');

		await reportAccessibilityViolations();
	});

	// Content pages
	const routes = ['about', 'sponsorship', '2024', 'code-of-conduct', 'new-speakers-workshop'];
	for (const route of routes) {
		test(`${route} page a11y checks - ${viewportName}`, async ({ page }) => {
			await page.setViewportSize(devices[viewportDevice].viewport);

			await page.goto(route);

			await reportAccessibilityViolations();
		});
	}
}

async function reportAccessibilityViolations() {
	// Scan the page with axe to look for a11y violations
	let violations = (await accessibilityScanner.analyze()).violations;

	// Make Playwright output the key information as a (more) human readable string
	let violationDescription = '';
	if (violations.length > 0) {
		violationDescription = `Warning - ${violations.length} a11y rule violations found\n\n`;

		for (let i = 0; i < violations.length; i++) {
			let violation = violations[i];
			violationDescription += `########################################################\n`;
			violationDescription += `Rule Violation ${i + 1}\n`;
			violationDescription += `${violation.impact?.toUpperCase()} - ${violation.help}\n`;
			violationDescription += `${violation.helpUrl}\n`;

			for (let j = 0; j < violation.nodes.length; j++) {
				let instance = violation.nodes[j];

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
