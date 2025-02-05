<svelte:options runes />

<script lang="ts">
</script>

<div class="secondary-bg">
	<div class="section">
		<h2>Timeline</h2>
		<div class="timeline text-center">
			<span class="timeline-item">
				<span class="material-symbols-outlined"> check_circle </span>
				<p>1st January</p>
				<p>Call for speakers opens on New Years Day!</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> check_circle </span>
				<p>31st January</p>
				<p>Call for speakers closes</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> circle </span>
				<p>3rd February</p>
				<p>Session voting opens</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> circle </span>
				<p>14th February</p>
				<p>Session voting closes</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> circle </span>
				<p>31st March</p>
				<p>Schedule announced and ticket registration opens</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> circle </span>
				<p>26th April</p>
				<p>Day of the event!</p>
			</span>
		</div>
		<sub class="sub-highlight"
			>We'll try our best to keep to these dates but please be patient - DDDSW is entirely volunteer
			driven ❤️</sub>
	</div>
</div>

<style>
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.timeline p {
		font-size: 0.75rem;
		margin: 0;
		font-weight: bold;
	}

	.timeline-item p:first-of-type {
		border-bottom: #cdcdcd 2px dotted;
		margin-bottom: 5px;
		font-weight: normal;
	}

	.timeline-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 1 0;
	}

	.sub-highlight {
		font-style: italic;
	}

	@media (min-width: 576px) {
		.timeline {
			flex-direction: row;
		}
	}
</style>
