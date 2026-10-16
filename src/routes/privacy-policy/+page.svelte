<script lang="ts">
	import Prose from '#lib/components/Prose.svelte';
	import { event } from '#lib/eventDetails.ts';

	const contents = [
		{ id: 'contact-details', label: 'Contact details' },
		{ id: 'what-information', label: 'What information we collect, use, and why' },
		{ id: 'lawful-bases', label: 'Lawful bases and data protection rights' },
		{ id: 'personal-information-source', label: 'Where we get personal information from' },
		{ id: 'retention', label: 'How long we keep information' },
		{ id: 'complaints', label: 'How to complain' }
	];
</script>

<Prose>
	<p class="text-xl font-semibold">
		We only hold this information to support our events and for our newsletter. We do not sell or
		share your information with third parties.
	</p>
	<nav aria-label="On this page">
		<ul class="list-inside list-disc space-y-1">
			{#each contents as item (item.id)}
				<li><a href="#{item.id}">{item.label}</a></li>
			{/each}
		</ul>
	</nav>

	<h2 id="contact-details" class="h3">Contact details</h2>
	<p>Email: <a href="mailto:{event.contactEmail}">{event.contactEmail}</a></p>

	<h2 id="what-information" class="h3">What information we collect, use, and why</h2>
	<p>We collect or use the following personal information to provide updates and share news:</p>
	<ul class="list-inside list-disc space-y-1">
		<li>Names</li>
		<li>Email address</li>
	</ul>
	<p>
		We additionally collected the following information for anonymised metrics, to support and for
		reporting on our community:
	</p>
	<ul class="list-inside list-disc space-y-1">
		<li>Gender</li>
		<li>Accessibility needs</li>
		<li>Dietary needs</li>
	</ul>

	<h2 id="lawful-bases" class="h3">Lawful bases and data protection rights</h2>
	<p>
		Under UK data protection law, we must have a "lawful basis" for collecting and using your
		personal information. There is a list of possible lawful bases in the UK GDPR. You can find out
		more about lawful bases on the
		<a href="https://ico.org.uk" rel="noopener">ICO's website</a>.
	</p>
	<p>
		To make a data protection rights request, please contact us using the contact details above.
	</p>
	<h3 class="h4">Our lawful bases</h3>
	<p>
		Our lawful basis for collecting or using personal information to provide updates and share news
		is
		<strong>your consent</strong>, by signing up to a newsletter or submitting a session for
		consideration. You have the right to withdraw your consent at any time.
	</p>

	<h2 id="personal-information-source" class="h3">Where we get personal information from</h2>
	<p>
		We collect information directly from you, either through speaker submission on Sessionize or
		through newsletter signup.
	</p>

	<h2 id="retention" class="h3">How long we keep information</h2>
	<p>
		Our primary use for your personal information is for our newsletter, which is sent out for
		informational purposes. Until you unsubscribe or request deletion, we will keep your personal
		information.
	</p>

	<h2 id="complaints" class="h3">How to complain</h2>
	<p>
		If you have any concerns about our use of your personal data, or wish to make a complaint,
		please get in touch using the email address above. If you remain unhappy with how we've used
		your data after raising a complaint with us, you can also complain to the ICO.
	</p>
	<address class="space-y-1 card preset-filled-surface-100-900 p-5 not-italic">
		<strong>The ICO's address:</strong><br />
		Information Commissioner's Office<br />
		Wycliffe House<br />
		Water Lane<br />
		Wilmslow<br />
		Cheshire<br />
		SK9 5AF<br />
		Helpline number: 0303 123 1113<br />
		Website: <a href="https://www.ico.org.uk/make-a-complaint" rel="noopener">ICO complaints</a>
	</address>
	<p class="text-sm">Last updated: 29 December 2024</p>
</Prose>
