<div class="key-points-container">
	<div class="key-point">
		<div>
			<h1>For developers</h1>
			<p>
				Developers are at the heart of DDD South West. We love to learn and share their ideas with
				others. You'll meet likeminded peers, make new friends and connections, and feel part of our
				friendly community where everyone is welcome.
			</p>
		</div>
		<span class="material-symbols-outlined icon">code</span>
	</div>
	<div class="key-point">
		<span class="material-symbols-outlined icon">diversity_1</span>
		<div class="key-point-right">
			<h1>For speakers</h1>
			<p>
				Our events are a fantastic place to get your name out there as a speaker. Whether you're a
				professional or a first-timer, you will be made to feel welcome and supported.
			</p>
		</div>
	</div>
	<div class="key-point">
		<div>
			<h1>For sponsors</h1>
			<p>
				Our events would not be possible without the help from our generous sponsors. If you're
				interested in supporting the tech community and getting access to exactly the people you
				need for your technical roles please <a href="mailto:sponsorship@dddsouthwest.com"
					>get in touch.</a
				>
			</p>
		</div>
		<span class="material-symbols-outlined icon">storefront</span>
	</div>
</div>

<style>
	.icon {
		font-size: 125px;
	}

	@media (max-width: 350px) {
		h1 {
			font-size: 1.5rem;
		}
	}

	.key-points-container {
		width: 90%;
		margin: auto;
	}

	@media (min-width: 768px) {
		.key-points-container {
			width: 70%;
		}
	}

	@media (min-width: 1800px) {
		.key-points-container {
			width: 50%;
		}
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

	@media (min-width: 576px) {
		.key-point {
			gap: 50px;
			flex-wrap: nowrap;
			justify-content: space-between;
		}

		.key-point:nth-child(even) {
			flex-direction: row;
		}
	}

	@media (min-width: 1400px) {
		.key-point {
			padding: 30px 100px;
		}
	}

	.key-point-right {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.key-point-right p {
		text-align: left;
	}

	@media (min-width: 576px) {
		.key-point-right p {
			text-align: right;
		}

		.key-point-right {
			align-items: flex-end;
		}
	}

	@media (min-width: 1400px) {
		.key-point p {
			font-size: 1.5rem;
		}
	}
</style>
