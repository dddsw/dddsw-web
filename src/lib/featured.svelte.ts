import { page } from '$app/state';
import { parsePreviewState, type PreviewState } from './featured';

const STORAGE_KEY = 'featuredPreview';

/** Testing aid state, set from `?preview=` (see featured.ts). All off means the real timeline. */
export const preview = $state<PreviewState>({ featured: null, schedule: false });

/**
 * Reads `?preview=` from the address (and remembers it for the rest of the browser tab), so hidden
 * things can be viewed while their milestones are not reached. Call once on the client.
 */
export function initPreview() {
	const raw = page.url.searchParams.get('preview');
	const fromUrl = parsePreviewState(raw);
	let saved: ReturnType<typeof parsePreviewState> = null;
	try {
		if (fromUrl === 'off') sessionStorage.removeItem(STORAGE_KEY);
		else if (fromUrl) sessionStorage.setItem(STORAGE_KEY, raw ?? '');
		else saved = parsePreviewState(sessionStorage.getItem(STORAGE_KEY));
	} catch {
		// Storage can be unavailable (private mode): the address still applies for this visit.
	}
	const next = fromUrl ?? saved;
	const active = next && next !== 'off' ? next : { featured: null, schedule: false };
	preview.featured = active.featured;
	preview.schedule = active.schedule;
}
