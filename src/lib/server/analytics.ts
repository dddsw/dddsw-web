/**
 * GoatCounter analytics (no cookies or browser storage). The script is only sent from the public
 * address, so local runs, PR previews and the `*.pages.dev` hosts never count as visits.
 *
 * `app.html` has an `%analytics%` placeholder that `hooks.server.ts` fills with this.
 * Later in-app navigations are counted from the root layout (see `afterNavigate` there).
 */
export const analyticsPlaceholder = '%analytics%';

export const goatCounterScript =
	'<script data-goatcounter="https://dddsouthwest.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>';

/** The analytics markup for a page served from `hostname`: the script on the public host only. */
export function analyticsFor(hostname: string, publicHost: string): string {
	return hostname === publicHost ? goatCounterScript : '';
}
