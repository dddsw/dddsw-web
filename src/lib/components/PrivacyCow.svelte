<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { backOut, cubicIn } from 'svelte/easing';
	import { page } from '$app/state';
	import { cowPath } from '#lib/cow.ts';

	/**
	 * A cow peeking in from the bottom-left corner with a "we don't track you" bubble. Closing it
	 * (or following its link) is remembered in this browser, so it's then gone for good. Left alone,
	 * it wanders off after 30 seconds and comes back 15 minutes later, round and round. Either way it
	 * says "K, Bye!" on its way out.
	 */

	const dismissedKey = 'privacyCowDismissed';
	// When the cow may next appear after wandering off; kept so a reload doesn't bring it straight back.
	const snoozedUntilKey = 'privacyCowSnoozedUntil';
	const firstDelay = 1200;
	const visibleFor = 30 * 1000;
	const snoozeFor = 15 * 60 * 1000;
	const byeFor = 1000;
	const bubbleOut = 350;

	// The front of the cow (head, neck, chest and front legs) shows; the rest is drawn too, but sits
	// off the left of the screen, so the entrance's overshoot never reveals a cut-off cow.
	const cowWidth = 1080;
	const cropX = 470;
	const cropWidth = cowWidth - cropX;
	const viewBox = `0 0 ${cowWidth} 593`;
	// The whole cow, sized so its visible front fills the button and the back hangs off to the left.
	const svgStyle = `width: ${(cowWidth / cropWidth) * 100}%; margin-left: -${(cropX / cropWidth) * 100}%;`;

	const eyeRadius = 40;
	const pupilRadius = 19;
	const reach = eyeRadius - pupilRadius - 3;

	type Eye = { cx: number; cy: number; x: number; y: number; vx: number; vy: number };
	// Two eyes on the side of the head, the far one a little higher, as cartoons do.
	const eyes = $state<Eye[]>([
		{ cx: 858, cy: 112, x: 0, y: reach, vx: 0, vy: 0 },
		{ cx: 922, cy: 96, x: 0, y: reach, vx: 0, vy: 0 }
	]);

	let shown = $state(false);
	let open = $state(false);
	// Saying goodbye: the main bubble has gone, a "K, Bye!" one is up, and the cow is about to leave.
	let leaving = $state(false);
	let bye = $state(false);
	let reducedMotion = $state(false);
	let svg: SVGSVGElement | undefined = $state();

	const onPrivacyPage = $derived(page.url.pathname === '/privacy-policy');
	// Following the bubble's link lands on the privacy policy; the cow stays to say goodbye there.
	const visible = $derived(shown && (!onPrivacyPage || leaving));
	const duration = (ms: number) => (reducedMotion ? 0 : ms);

	let pointer: { x: number; y: number } | null = null;
	let idleTimer: ReturnType<typeof setTimeout> | undefined;
	let cycleTimer: ReturnType<typeof setTimeout> | undefined;
	let speakTimer: ReturnType<typeof setTimeout> | undefined;
	let frame = 0;

	/** Where each pupil wants to be: towards the pointer, or hanging down when there isn't one. */
	function targetFor(eye: Eye): { x: number; y: number } {
		if (!pointer || !svg) return { x: 0, y: reach };
		const rect = svg.getBoundingClientRect();
		const unit = rect.width / cowWidth;
		const dx = pointer.x - (rect.left + eye.cx * unit);
		const dy = pointer.y - (rect.top + eye.cy * unit);
		const distance = Math.hypot(dx, dy) || 1;
		const pull = reach * Math.min(1, distance / 80);
		return { x: (dx / distance) * pull, y: (dy / distance) * pull };
	}

	/** Springy pupils: they overshoot and wobble, which is the whole point of googly eyes. */
	function step() {
		let moving = false;
		for (const eye of eyes) {
			const target = targetFor(eye);
			if (reducedMotion) {
				eye.x = target.x;
				eye.y = target.y;
				continue;
			}
			eye.vx = (eye.vx + (target.x - eye.x) * 0.14) * 0.82;
			eye.vy = (eye.vy + (target.y - eye.y) * 0.14) * 0.82;
			eye.x += eye.vx;
			eye.y += eye.vy;
			const distance = Math.hypot(eye.x, eye.y);
			if (distance > reach) {
				eye.x *= reach / distance;
				eye.y *= reach / distance;
			}
			if (
				Math.abs(eye.vx) + Math.abs(eye.vy) > 0.02 ||
				Math.hypot(target.x - eye.x, target.y - eye.y) > 0.1
			) {
				moving = true;
			}
		}
		frame = moving ? requestAnimationFrame(step) : 0;
	}

	function wake() {
		if (!frame) frame = requestAnimationFrame(step);
	}

	function onPointerMove(event: PointerEvent) {
		if (!shown) return;
		pointer = { x: event.clientX, y: event.clientY };
		clearTimeout(idleTimer);
		// After a while without the pointer moving, the pupils drop back down with a wobble.
		idleTimer = setTimeout(() => {
			pointer = null;
			wake();
		}, 2500);
		wake();
	}

	/** Close the bubble, say "K, Bye!" for a moment, then the cow and that bubble go together. */
	function sayBye(then: () => void) {
		clearTimeout(cycleTimer);
		clearTimeout(speakTimer);
		leaving = true;
		open = false;
		cycleTimer = setTimeout(() => {
			bye = true;
			cycleTimer = setTimeout(() => {
				shown = false;
				bye = false;
				leaving = false;
				then();
			}, byeFor);
		}, duration(bubbleOut));
	}

	function dismiss() {
		if (leaving) return;
		try {
			localStorage.setItem(dismissedKey, '1');
		} catch {
			// Storage can be unavailable (private mode); it's then only gone for this visit.
		}
		sayBye(() => {});
	}

	/** Slide in and speak, then wander off again after a while. */
	function arrive() {
		shown = true;
		// The pupils lag behind as the cow slides in from the left, then swing about as it stops.
		for (const eye of eyes) {
			eye.x = -reach;
			eye.y = 0;
		}
		wake();
		speakTimer = setTimeout(() => (open = true), duration(800));
		cycleTimer = setTimeout(leave, visibleFor);
	}

	/** Not dismissed, just bored: hide for a while, then come back. */
	function leave() {
		try {
			localStorage.setItem(snoozedUntilKey, String(Date.now() + snoozeFor));
		} catch {
			// No storage: the timer below still brings it back during this visit.
		}
		const comeBack = () => (cycleTimer = setTimeout(arrive, snoozeFor));
		if (onPrivacyPage) {
			// It isn't on screen here, so there's no one to say goodbye to.
			shown = false;
			open = false;
			comeBack();
		} else {
			sayBye(comeBack);
		}
	}

	onMount(() => {
		let delay = firstDelay;
		try {
			if (localStorage.getItem(dismissedKey)) return;
			const snoozedUntil = Number(localStorage.getItem(snoozedUntilKey));
			if (snoozedUntil) delay = Math.max(firstDelay, snoozedUntil - Date.now());
		} catch {
			// No storage: show it, it just can't be remembered as closed.
		}
		reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

		cycleTimer = setTimeout(arrive, delay);

		return () => {
			clearTimeout(cycleTimer);
			clearTimeout(speakTimer);
			clearTimeout(idleTimer);
			cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:window onpointermove={onPointerMove} />

{#if visible}
	<aside
		class="privacy-cow fixed bottom-0 left-0 z-40"
		aria-label="Privacy"
		in:fly={{ x: -160, duration: duration(800), easing: backOut }}
		out:fly={{ x: -160, duration: duration(400), easing: cubicIn }}>
		<button
			type="button"
			class="cow-button block w-24 cursor-pointer sm:w-32"
			aria-expanded={open}
			aria-controls="privacy-cow-bubble"
			aria-label="We don't track you"
			onclick={() => {
				if (!leaving) open = !open;
			}}>
			<svg
				bind:this={svg}
				{viewBox}
				class="block h-auto max-w-none overflow-visible"
				style={svgStyle}
				aria-hidden="true">
				<!-- A thin dark outline, so the cow still shows against orange (e.g. the home page hero).
					Drawn under the fill, so only its outer half (1px) shows and the cow keeps its size; the
					SVG overflows so the outline above the horn, at the very top of the drawing, isn't clipped. -->
				<path
					d={cowPath}
					class="fill-primary-500 stroke-surface-950"
					stroke-width="2"
					stroke-linejoin="round"
					paint-order="stroke"
					vector-effect="non-scaling-stroke" />
				{#each eyes as eye, i (i)}
					<circle
						cx={eye.cx}
						cy={eye.cy}
						r={eyeRadius}
						fill="white"
						stroke="#1f1f1f"
						stroke-width="5" />
					<circle cx={eye.cx + eye.x} cy={eye.cy + eye.y} r={pupilRadius} fill="#1f1f1f" />
				{/each}
			</svg>
		</button>

		{#if open}
			<div
				id="privacy-cow-bubble"
				class="bubble absolute bottom-[62%] left-[calc(100%-0.25rem)] w-max rounded-container border border-surface-950 dark:border-surface-50 preset-filled-surface-50-950 dark:bg-surface-800 p-4 pr-9 shadow-xl"
				transition:scale={{ start: 0.5, duration: duration(bubbleOut), easing: backOut }}>
				<p class="h5 leading-tight whitespace-nowrap">We don't track you!</p>
				<p class="mt-1 text-sm">
					<a href="/privacy-policy#analytics-cookies" class="anchor" onclick={dismiss}
						>Find out more here</a>
				</p>
				<button
					type="button"
					class="btn-icon btn-icon-sm absolute top-1.5 right-1.5 hover:preset-tonal"
					aria-label="Close"
					onclick={dismiss}>
					<span aria-hidden="true" class="text-lg leading-none">×</span>
				</button>
			</div>
		{/if}

		{#if bye}
			<div
				class="bubble absolute bottom-[62%] left-[calc(100%-0.25rem)] w-max rounded-container border border-surface-950 dark:border-surface-50 preset-filled-surface-50-950 dark:bg-surface-800 px-4 py-3 shadow-xl"
				role="status"
				transition:scale={{ start: 0.5, duration: duration(bubbleOut), easing: backOut }}>
				<p class="h5 leading-tight whitespace-nowrap">K, Bye!</p>
			</div>
		{/if}
	</aside>
{/if}

<style>
	.cow-button {
		transform-origin: bottom left;
	}
	.cow-button:hover {
		animation: nod 0.6s ease-in-out;
	}
	@keyframes nod {
		30% {
			transform: rotate(-3deg);
		}
		70% {
			transform: rotate(2deg);
		}
	}

	/* The bubble grows out of its tail, which points back at the cow's nose. */
	.bubble {
		transform-origin: bottom left;
	}
	.bubble::before {
		content: '';
		position: absolute;
		left: -0.45rem;
		bottom: 1rem;
		width: 0.9rem;
		height: 0.9rem;
		background: inherit;
		border-left: inherit;
		border-bottom: inherit;
		transform: rotate(45deg);
	}
</style>
