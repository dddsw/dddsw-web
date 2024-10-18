import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run dev',
		url: 'http://127.0.0.1:5173',
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: 'http://127.0.0.1:5173/',
		...devices['Desktop Chrome']
	},

	forbidOnly: !!process.env.CI,
	fullyParallel: true,
	reporter: [['list'], ['html']],
	snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
	testDir: './tests',

	projects: [
		{
			name: 'ci',
			testIgnore: 'visual-comparison.spec.ts'
		},
		{
			name: 'local'
		}
	]
});
