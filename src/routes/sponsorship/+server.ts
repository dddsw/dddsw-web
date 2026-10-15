import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/** The sponsors page used to live at /sponsorship. */
export const GET: RequestHandler = () => {
	redirect(301, '/sponsors');
};
