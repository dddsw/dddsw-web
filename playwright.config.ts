import { createServer } from 'node:net';
import { defineConfig, devices } from '@playwright/test';

// Each run starts its own dev server on its own port, so test runs from several
// worktrees (or alongside a `npm run dev` on 5173) never share a server.
// Set PLAYWRIGHT_PORT to pin the port; otherwise a free one is picked. It is stored
// in the environment so Playwright's worker processes, which reload this config,
// see the same port.
process.env.PLAYWRIGHT_PORT ??= String(await findFreePort());
const port = Number(process.env.PLAYWRIGHT_PORT);
const baseURL = `http://127.0.0.1:${port}/`;

function findFreePort(): Promise<number> {
	return new Promise((resolve, reject) => {
		const server = createServer();
		server.unref();
		server.on('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			server.close(() =>
				address && typeof address === 'object'
					? resolve(address.port)
					: reject(new Error('Could not find a free port'))
			);
		});
	});
}

export default defineConfig({
	webServer: {
		// --strictPort: fail loudly rather than drift to another port.
		command: `npm run dev -- --port ${port} --strictPort`,
		url: baseURL,
		// Never reuse a server: one already on this port could belong to another checkout.
		reuseExistingServer: false,
		// The first page of a fresh dev server encodes every image in src/lib/assets/images (about a
		// minute, longer on CI) unless node_modules/.cache/imagetools already has them.
		timeout: 300_000
	},
	use: {
		baseURL,
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
			retries: 1,
			use: {
				trace: 'on-first-retry'
			},
			testIgnore: 'visual-comparison.spec.ts'
		},
		{
			name: 'local'
		}
	]
});
