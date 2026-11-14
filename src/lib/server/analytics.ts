/**
 * GoatCounter analytics (no cookies or browser storage). The script is only sent from the public
 * address, so local runs, PR previews and the `*.pages.dev` hosts never count as visits.
 *
 * To test it elsewhere (e.g. locally), run with `VITE_GOATCOUNTER_ANY_HOST=1`: every host then gets the
 * script, with `allow_local` so count.js doesn't ignore localhost. Those visits land in the real
 * dashboard alongside production traffic.
 *
 * `app.html` has an `%analytics%` placeholder that `hooks.server.ts` fills with this.
 * Later in-app navigations are counted from the root layout (see `afterNavigate` there).
 */
export const analyticsPlaceholder = '%analytics%';

const countUrl = 'https://dddsouthwest.goatcounter.com/count';

export const goatCounterScript = `<script data-goatcounter="${countUrl}" async src="//gc.zgo.at/count.js"></script>`;

/** The test variant: counts from any host, including localhost. */
export const goatCounterTestScript = `<script data-goatcounter="${countUrl}" data-goatcounter-settings='{"allow_local": true}' async src="//gc.zgo.at/count.js"></script>`;

/** The analytics markup for a page served from `hostname`: the script on the public host only. */
export function analyticsFor(hostname: string, publicHost: string, anyHost = false): string {
	if (hostname === publicHost) return goatCounterScript;
	return anyHost ? goatCounterTestScript : '';
}
