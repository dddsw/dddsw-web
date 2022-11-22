<script lang="ts">
	import { pageTitle } from '../../stores.js';
	pageTitle.set('The 2023 Event');
</script>

<div class="secondary-bg">
	<div class="section">
		<h1>Venue</h1>
		<p>
			DDD South West 2023 will be held at <a href="https://engine-shed.co.uk/" target="_blank"
				>Engine Shed</a
			>
			located at the following address: <br />
			Engine Shed <br />
			Station Approach <br />
			Temple Meads <br />
			Bristol <br />
			BS1 6QH
		</p>

		<iframe
			title="Google Maps"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.505708479013!2d-2.5857436836869034!3d51.44887092280099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718e7cb133a5e9%3A0xad45f23e4147453c!2sEngine%20Shed!5e0!3m2!1sen!2suk!4v1667485180686!5m2!1sen!2suk"
			style="border:0;"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</div>
</div>

<div class="tertiary-bg">
	<div class="section">
		<h2>Travel</h2>
		<h3>By train</h3>
		<p>
			Engine Shed is conveniently located right next to Temple Meads train station. Follow Approach
			Road to the end and Engine Shed is on the corner.
		</p>
		<h3>By car</h3>
		<p>
			The nearest car park is Bristol Temple Meads station. Other car parks can be found <a
				href="https://www.Bristol.gov.uk/parking/where-to-park-in-bristol"
				target="_blank">here.</a
			>
		</p>

		<h2>Hotels</h2>
		<p>The nearest hotels are:</p>
		<ul>
			<li>Holiday Inn Express: Bristol City Centre South End, Temple Gate, Redcliffe, BS1 6PL</li>
			<li>
				DoubleTree by Hilton Hotel: Bristol City Centre Redcliffe Way, Redcliffe, Bristol, BS1 6NJ
			</li>
			<li>Novotel Bristol Centre: Victoria St, Redcliffe, Bristol, BS1 6HY</li>
		</ul>

		<sub
			>Disclaimer: These instructions are provided for your convenience. We have tried to ensure
			that they are accurate but can take no responsibility for errors. This is not an exhaustive
			list of how to get to the venue, other routes (and hotels) are available.</sub
		>
	</div>
</div>

<div class="secondary-bg">
	<div class="section">
		<h1>Covid policy</h1>
		<p>
			We will not be operating a mask or distancing policy at DDD South West 2023, but attendees are
			welcome to wear a mask if desired. Please respect others who choose to wear masks as they may
			be vulnerable. Hand sanitiser will be available around the venue.
		</p>
	</div>
</div>

<style>
	iframe {
		width: 250px;
		height: 250px;
		padding: 10px;
	}

	@media (min-width: 576px) {
		iframe {
			width: 500px;
			height: 350px;
		}
	}

	@media (min-width: 992px) {
		iframe {
			width: 700px;
			height: 550px;
		}
	}
</style>
