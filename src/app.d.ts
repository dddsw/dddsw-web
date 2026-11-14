// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** Heading shown in the banner by the (content) layout. */
			title?: string;
			lead?: string;
			/** Set to true to opt out of the standard page layout (banner + container) in the root layout. */
			bare?: boolean;
		}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		/** Set by GoatCounter's count.js (loaded in app.html) once it has loaded. */
		goatcounter?: { count: (vars?: { path?: string; title?: string }) => void };
	}
}

export {};
