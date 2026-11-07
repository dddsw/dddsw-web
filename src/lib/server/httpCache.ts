/**
 * Caching for the pages the worker renders. Static files and the fingerprinted `/_app/immutable`
 * bundles are served by Cloudflare with their own headers; this covers everything else.
 *
 * Pages can change at any time (milestones pass, the programme updates), so browsers must check
 * back on every visit — but with an ETag, an unchanged page costs a 304 instead of the full HTML.
 */

/** Revalidate on every use. */
export const pageCacheControl = 'public, max-age=0, must-revalidate';

/** Responses worth an ETag: whole documents and SvelteKit's page data. */
function isCacheableType(contentType: string | null): boolean {
	return !!contentType && /^(text\/html|application\/json)\b/.test(contentType);
}

/** A weak ETag from a hash of the body, for responses SvelteKit didn't tag (page data). */
async function hashEtag(body: ArrayBuffer): Promise<string> {
	const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', body));
	const hex = Array.from(digest.subarray(0, 16), (b) => b.toString(16).padStart(2, '0')).join('');
	return `W/"${hex}"`;
}

function matches(ifNoneMatch: string | null, etag: string): boolean {
	if (!ifNoneMatch) return false;
	const strip = (tag: string) => tag.trim().replace(/^W\//, '');
	return ifNoneMatch.split(',').some((tag) => tag.trim() === '*' || strip(tag) === strip(etag));
}

/**
 * Adds `Cache-Control`, `Vary` and a weak ETag to a successful page or data response, and answers
 * a matching `If-None-Match` with 304 Not Modified (SvelteKit's own check only matches its strong
 * tag). Anything else is returned unchanged.
 */
export async function withPageCaching(request: Request, response: Response): Promise<Response> {
	if (request.method !== 'GET' && request.method !== 'HEAD') return response;
	if (response.status !== 200 || !isCacheableType(response.headers.get('content-type'))) {
		return response;
	}
	if (response.headers.has('cache-control')) return response;

	// SvelteKit already hashes each page into a strong ETag, but Cloudflare drops strong ETags when
	// it compresses a response, so production never sent one. A weak ETag survives compression (the
	// bytes change, the meaning doesn't). Reusing SvelteKit's tag means the body can stream through
	// untouched; only untagged responses are read, to hash them.
	const existing = response.headers.get('etag');
	let body: BodyInit | null = response.body;
	let etag: string;
	if (existing) {
		etag = existing.startsWith('W/') ? existing : `W/${existing}`;
	} else {
		const bytes = await response.arrayBuffer();
		body = bytes;
		etag = await hashEtag(bytes);
	}

	const headers = new Headers(response.headers);
	headers.set('cache-control', pageCacheControl);
	headers.set('etag', etag);
	headers.append('vary', 'Accept-Encoding');

	if (matches(request.headers.get('if-none-match'), etag)) {
		if (body === response.body) await response.body?.cancel();
		headers.delete('content-length');
		headers.delete('content-type');
		return new Response(null, { status: 304, headers });
	}
	return new Response(request.method === 'HEAD' ? null : body, { status: 200, headers });
}
