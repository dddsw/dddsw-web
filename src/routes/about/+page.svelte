<script>
	import Footer from '$lib/Footer.svelte';
import Navbar from '$lib/Navbar.svelte';
</script>

<div class="container">
    <div class="header primary-bg">
        <img src="../images/logo.png" alt="The DDD South West logo" class="logo"/>
    </div>

    <div class="secondary-bg section">
        <h1>What to expect</h1>
    </div>

    <div class="tertiary-bg section">
        <h2>Meet the team</h2>
        <p>DDD South West is brought to you by a small team of volunteers. Please feel free to get in touch with us if you have any questions or ideas.</p>
    </div>

    <Footer/>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

    .header {
        display: flex;
        justify-content: center;
    }

    @media (min-width: 400px){
        .header {
            justify-content: initial;
        }
    }

    .logo {
        max-width: 200px;
        padding: 20px;
    }

    .section {
        padding: 50px;
    }
</style>
