<script lang="ts">
	import { onMount } from 'svelte';

	// const eventDateMills = Date.UTC(2025, 4, 26, 8, 30, 0, 0);
	const eventDateMills = Date.UTC(2024, 9, 24, 14, 30); //remember that javascript months are 0 indexed so you need to remove 1
	const eventDate = new Date(eventDateMills);
	let today = new Date();

	let months =
		eventDate.getUTCMonth() -
		today.getUTCMonth() +
		(eventDate.getUTCFullYear() - today.getUTCFullYear()) * 12;

	let days = eventDate.getUTCDate() - today.getUTCDate();
	if (days < 0) {
		let daysInMonth = 0;
		switch (today.getUTCMonth()) {
			case 1: // february
				daysInMonth = 28;
				break;
			case 8: // september
			case 3: // april
			case 5: // june
			case 10: // november
				daysInMonth = 30;
				break;
			default:
				daysInMonth = 31;
				break;
		}
		days += daysInMonth;
	}

	let hours = 23;
	let minutes = 60;
	let seconds = 60;

	function count() {
		today = new Date();
		seconds -= 10;

		hours = eventDate.getUTCHours() - today.getUTCHours();
		if (hours < 0) {
			hours += 24;
			days -= 1;
		}

		minutes = eventDate.getUTCMinutes() - today.getUTCMinutes();
		if (minutes < 0) {
			minutes += 60;
			hours -= 1;
		}

		seconds = eventDate.getUTCSeconds() - today.getUTCSeconds();
		if (seconds < 0) {
			seconds += 60;
			minutes -= 1;
		}

		setTimeout(count, 10000);
	}

	onMount(() => {
		count();
	});
</script>

<h2>months remaing: {months}</h2>
<h2>days remaing: {days}</h2>
<h2>hours remaing: {hours}</h2>
<h2>minutes remaing: {minutes}</h2>
<h2>seconds remaing: {seconds}</h2>

<div class="grid auto-cols-max grid-flow-col gap-5 text-center">
	<div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{months};"></span>
		</span>
		months
	</div>
	<div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{days};"></span>
		</span>
		days
	</div>
	<div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{hours};"></span>
		</span>
		hours
	</div>
	<div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{minutes};"></span>
		</span>
		min
	</div>
</div>
