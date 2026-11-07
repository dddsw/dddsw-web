import type { onNavigate } from '$app/navigation';

type OnNavigate = Parameters<typeof onNavigate>[0];

/**
 * View transitions between pages, the colour mode and the past-events tabs.
 *
 * Elements only carry a `view-transition-name` while a transition is being captured: the names
 * live in view-transitions.css behind `html[data-vt=<kind>]`, and this module sets that
 * attribute for the length of the transition. So the names never change stacking or painting
 * the rest of the time, and each kind of transition only morphs the elements meant for it.
 *
 * None run when reduced motion is requested, or where the browser has no view transitions.
 */

type Kind = 'nav' | 'theme' | 'tabs';

/** Left-to-right order of the pages in the header, so content can slide the way the pill moves. */
const spatialOrder = [
	'/',
	'/schedule',
	'/speakers',
	'/sessions',
	'/become-a-speaker',
	'/venue',
	'/past-events',
	'/about',
	'/sponsorship'
];

const root = () => document.documentElement;

function transitionsEnabled(): boolean {
	if (typeof document === 'undefined' || !document.startViewTransition) return false;
	return !matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Sets how incoming content moves: -1/0/1 sideways (`dx`), 0/1 upwards (`dy`). */
function setMotion(dx: number, dy: number) {
	root().style.setProperty('--vt-dx', String(dx));
	root().style.setProperty('--vt-dy', String(dy));
}

/**
 * Runs `update` inside a view transition of the given kind, with the matching names switched on
 * for both snapshots. Errors in `update` still reach the caller (they aren't swallowed by the
 * transition), and a skipped transition is not an error.
 */
function startTransition(
	kind: Kind,
	update: () => void | Promise<void>,
	onReady?: () => void
): Promise<void> {
	const html = root();
	html.dataset.vt = kind;
	const transition = document.startViewTransition(update);
	if (onReady) transition.ready.then(onReady, () => {});
	transition.ready.catch(() => {});
	transition.finished.finally(() => {
		// A newer transition may already have taken over the attribute.
		if (html.dataset.vt === kind) delete html.dataset.vt;
		delete html.dataset.vtBannerHidden;
		delete html.dataset.vtBannerMorph;
		delete html.dataset.vtHome;
		delete html.dataset.vtPillMorph;
		for (const link of document.querySelectorAll('[data-vt-link]'))
			link.removeAttribute('data-vt-link');
	});
	return transition.updateCallbackDone;
}

/**
 * A banner scrolled out of view shouldn't fly in from far above (or off to it). If either page
 * can't see its banner, the banner isn't shared at all and simply goes with the rest of the page.
 * (Checked before the old page is captured, and again once the new page has scrolled.)
 */
function markBannerVisibility() {
	const banner = document.querySelector('.vt-banner');
	const headerHeight = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
	if (!banner || banner.getBoundingClientRect().bottom < headerHeight + 48) {
		root().dataset.vtBannerHidden = '';
		delete root().dataset.vtBannerMorph;
	}
}

/**
 * The two nav links the pill moves between get their own layers, so each one's text changes colour
 * as the pill leaves or arrives (not across the whole transition), and the clicked link's hover
 * box is left out of the snapshot, so it is never seen behind the arriving pill.
 */
function markNavLinks(from: string, to: string) {
	const link = (path: string) =>
		document.querySelector(`nav[aria-label="Main"] a[href="${CSS.escape(path)}"]`);
	const fromLink = link(from);
	const toLink = link(to);
	fromLink?.setAttribute('data-vt-link', 'from');
	toLink?.setAttribute('data-vt-link', 'to');
	// Only a pill moving between two links is drawn as a live box; one appearing or leaving
	// (a page outside the nav) keeps its snapshot so it can grow or shrink.
	if (fromLink && toLink) root().dataset.vtPillMorph = '';
}

function direction(from: string, to: string): number {
	const a = spatialOrder.indexOf(from);
	const b = spatialOrder.indexOf(to);
	if (a === -1 || b === -1 || a === b) return 0;
	return b > a ? 1 : -1;
}

/** Pass to SvelteKit's `onNavigate` in the root layout. */
export const navigationTransition: OnNavigate = (navigation) => {
	if (!transitionsEnabled()) return;
	const from = navigation.from?.url;
	const to = navigation.to?.url;
	// Same page (a hash or a `?preview=`): nothing to transition between.
	if (!from || !to || from.pathname === to.pathname) return;

	// Slide in from the side the pill moves towards; rise for pages outside the nav.
	const dir = direction(from.pathname, to.pathname);
	if (dir !== 0) setMotion(dir, 0);
	else setMotion(0, 1);

	if (from.pathname === '/' || to.pathname === '/') root().dataset.vtHome = '';
	markNavLinks(from.pathname, to.pathname);
	delete root().dataset.vtBannerHidden;
	// Assume both pages share a banner; cleared if either side has none (or can't see it).
	root().dataset.vtBannerMorph = '';
	markBannerVisibility();
	return new Promise<void>((resolve) => {
		startTransition('nav', async () => {
			resolve();
			await navigation.complete;
			markBannerVisibility();
		});
	});
};

/** Moves incoming tab content in from the side of the tab that was chosen. */
export function tabTransition(fromIndex: number, toIndex: number, update: () => void) {
	if (!transitionsEnabled() || fromIndex === toIndex) {
		update();
		return;
	}
	setMotion(toIndex > fromIndex ? 1 : -1, 0);
	startTransition('tabs', update);
}

/** Switches the colour mode as a circle growing out of the switch that was pressed. */
export function themeTransition(origin: Element | null, update: () => void) {
	if (!transitionsEnabled() || !origin) {
		update();
		return;
	}
	const rect = origin.getBoundingClientRect();
	const x = rect.left + rect.width / 2;
	const y = rect.top + rect.height / 2;
	const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
	startTransition('theme', update, () => {
		root().animate(
			{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
			{
				duration: 325,
				easing: 'cubic-bezier(0.3, 0, 0.2, 1)',
				pseudoElement: '::view-transition-new(root)'
			}
		);
	});
}
