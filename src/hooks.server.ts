import type { Handle } from '@sveltejs/kit/hooks';
import { withPageCaching } from '#lib/server/httpCache.ts';

export const handle: Handle = async ({ event, resolve }) =>
	withPageCaching(event.request, await resolve(event));
