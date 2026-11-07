import { describe, expect, it } from 'vitest';
import { pageCacheControl, withPageCaching } from './httpCache.ts';

const page = (body = '<p>Hi</p>', headers: HeadersInit = {}) =>
	new Response(body, { headers: { 'content-type': 'text/html', ...headers } });

const get = (headers: HeadersInit = {}) => new Request('https://example.com/', { headers });

describe('withPageCaching', () => {
	it('gives a page a revalidating cache policy, an ETag and Vary', async () => {
		const res = await withPageCaching(get(), page());
		expect(res.status).toBe(200);
		expect(res.headers.get('cache-control')).toBe(pageCacheControl);
		expect(res.headers.get('etag')).toMatch(/^W\/"[0-9a-f]{32}"$/);
		expect(res.headers.get('vary')).toBe('Accept-Encoding');
		expect(await res.text()).toBe('<p>Hi</p>');
	});

	it('gives the same page the same ETag, and a different page a different one', async () => {
		const a = (await withPageCaching(get(), page('a'))).headers.get('etag');
		const a2 = (await withPageCaching(get(), page('a'))).headers.get('etag');
		const b = (await withPageCaching(get(), page('b'))).headers.get('etag');
		expect(a).toBe(a2);
		expect(a).not.toBe(b);
	});

	it("reuses SvelteKit's ETag, made weak so it survives Cloudflare's compression", async () => {
		const res = await withPageCaching(get(), page('x', { etag: '"1bwgfrk"' }));
		expect(res.headers.get('etag')).toBe('W/"1bwgfrk"');
		const again = await withPageCaching(
			get({ 'if-none-match': 'W/"1bwgfrk"' }),
			page('x', { etag: '"1bwgfrk"' })
		);
		expect(again.status).toBe(304);
	});

	it("streams a page SvelteKit tagged through without reading it, and doesn't read it for a 304", async () => {
		const stream = () => new Blob(['<p>Hi</p>']).stream();
		const tagged = new Response(stream(), {
			headers: { 'content-type': 'text/html', etag: '"abc"' }
		});
		const res = await withPageCaching(get(), tagged);
		expect(res.body).toBe(tagged.body);
		expect(await res.text()).toBe('<p>Hi</p>');

		const unchanged = new Response(stream(), {
			headers: { 'content-type': 'text/html', etag: '"abc"' }
		});
		const notModified = await withPageCaching(get({ 'if-none-match': 'W/"abc"' }), unchanged);
		expect(notModified.status).toBe(304);
	});

	it('answers a matching If-None-Match with an empty 304', async () => {
		const etag = (await withPageCaching(get(), page())).headers.get('etag')!;
		// Cloudflare may hand the tag back in either form, so both must match.
		for (const tag of [etag, etag.replace(/^W\//, ''), `"other", ${etag}`]) {
			const res = await withPageCaching(get({ 'if-none-match': tag }), page());
			expect(res.status).toBe(304);
			expect(res.headers.get('etag')).toBe(etag);
			expect(await res.text()).toBe('');
		}
	});

	it('sends the full page when the ETag does not match', async () => {
		const res = await withPageCaching(get({ 'if-none-match': 'W/"stale"' }), page());
		expect(res.status).toBe(200);
		expect(await res.text()).toBe('<p>Hi</p>');
	});

	it('leaves errors, other content types and responses with their own policy alone', async () => {
		const notFound = new Response('x', { status: 404, headers: { 'content-type': 'text/html' } });
		const calendar = new Response('x', { headers: { 'content-type': 'text/calendar' } });
		const ownPolicy = page('x', { 'cache-control': 'no-store' });
		for (const res of [notFound, calendar, ownPolicy]) {
			expect(await withPageCaching(get(), res)).toBe(res);
		}
	});

	it('leaves non-GET requests alone', async () => {
		const res = page();
		expect(
			await withPageCaching(new Request('https://example.com/', { method: 'POST' }), res)
		).toBe(res);
	});
});
