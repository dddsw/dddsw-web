import type { PageLoad } from './$types';

/** The home page has its own full-width design, so it opts out of the standard page layout. */
export const load: PageLoad = () => ({ bare: true });
