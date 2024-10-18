<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import { pageTitle } from '../stores.js';
</script>

<header>
	<div>
		<div>
			<a href="/">
				<img src="../images/logo.png" alt="The DDD South West logo" />
			</a>
			<h1>{$pageTitle}</h1>
			<Navbar />
		</div>
	</div>
</header>
