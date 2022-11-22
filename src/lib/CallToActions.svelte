<script lang="ts">
	import type { KeyPoint } from '../types/KeyPoint.type';
	export let keyPoints: KeyPoint[];
</script>

<div class="key-points-container">
	<div class="key-point">
		<div>
			<h1>{keyPoints[0].title}</h1>
			<p>
				{@html keyPoints[0].paragraph}
			</p>
		</div>
		<span class="material-symbols-outlined icon">{keyPoints[0].icon}</span>
	</div>
	<div class="key-point">
		<span class="material-symbols-outlined icon">{keyPoints[1].icon}</span>
		<div class="key-point-right">
			<h1>{keyPoints[1].title}</h1>
			<p>
				{@html keyPoints[1].paragraph}
			</p>
		</div>
	</div>
	<div class="key-point">
		<div>
			<h1>{keyPoints[2].title}</h1>
			<p>
				{@html keyPoints[2].paragraph}
			</p>
		</div>
		<span class="material-symbols-outlined icon">{keyPoints[2].icon}</span>
	</div>
</div>

<style>
	.icon {
		font-size: 125px;
	}

	.key-points-container {
		width: 90%;
		margin: auto;
		padding-bottom: 50px;
	}

	.key-point {
		display: flex;
		align-items: center;
		padding: 10px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.key-point:nth-child(even) {
		flex-direction: column-reverse;
	}

	.key-point-right {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.key-point-right p {
		text-align: left;
	}

	@media (max-width: 350px) {
		h1 {
			font-size: 1.5rem;
		}
	}

	@media (min-width: 576px) {
		.key-point {
			gap: 50px;
			flex-wrap: nowrap;
			justify-content: space-between;
		}

		.key-point:nth-child(even) {
			flex-direction: row;
		}

		.key-point-right p {
			text-align: right;
		}

		.key-point-right {
			align-items: flex-end;
		}
	}

	@media (min-width: 768px) {
		.key-points-container {
			width: 70%;
		}
	}

	@media (min-width: 1400px) {
		.key-point p {
			font-size: 1.25rem;
		}
	}

	@media (min-width: 1800px) {
		.key-points-container {
			width: 50%;
		}
	}
</style>
