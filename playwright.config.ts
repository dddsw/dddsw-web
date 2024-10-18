import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run dev',
		url: 'http://127.0.0.1:5173',
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: 'http://127.0.0.1:5173/'
	},
	fullyParallel: true,
	reporter: [['list'], ['html']],
	testDir: './tests',
	snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}'
});
