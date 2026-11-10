<script lang="ts">
	import { page } from '$app/state';
	import { event } from '#lib/eventDetails.ts';
	import { toaster } from '#lib/toaster.ts';
	import {
		assetFile,
		assetUrl,
		previewHeight,
		previewUrl,
		previewWidth,
		mediaDownloads,
		schemes,
		socialAssets,
		type AssetKind
	} from '#lib/socialAssets.ts';

	const groups: { kind: AssetKind; title: string; blurb: string }[] = [
		{
			kind: 'avatar',
			title: 'Profile pictures',
			blurb: 'Square, with the cow well inside the circle most sites crop to.'
		},
		{
			kind: 'banner',
			title: 'Banners',
			blurb: 'Profile headers and covers. The cow sits on the right, clear of the profile picture.'
		},
		{
			kind: 'post',
			title: 'Post backgrounds',
			blurb: 'The herd along the bottom, with plenty of room above for your words.'
		}
	];

	const mediaGroups = [
		{ title: 'Logos', items: mediaDownloads.logos },
		{ title: 'Icons', items: mediaDownloads.icons }
	];

	// The public address, except when running locally, so the copied URLs can be tried out there.
	const localHosts = ['localhost', '127.0.0.1', '[::1]'];
	const origin = $derived(localHosts.includes(page.url.hostname) ? page.url.origin : event.siteUrl);

	/** Puts the full address of a file on the clipboard, for pasting into a post. */
	async function copyUrl(path: string) {
		try {
			await navigator.clipboard.writeText(`${origin}${path}`);
			toaster.success({ title: 'Copied', description: 'The image URL is on your clipboard.' });
		} catch {
			toaster.error({
				title: "Couldn't copy",
				description: 'Please right-click the image and copy its address instead.'
			});
		}
	}

	const downloadLink =
		'btn preset-outlined-primary-500 btn-sm no-underline hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50';
</script>

<section aria-labelledby="images" class="space-y-6">
	<div class="max-w-3xl space-y-3">
		<h2 id="images" class="h2">Images without words</h2>
		<p>
			Ready-made backgrounds in our colours, each in orange and dark, with no text on them. Download
			one and add your own words when you post.
		</p>
	</div>

	{#each groups as group (group.kind)}
		<div class="space-y-4">
			<div>
				<h3 class="h4">{group.title}</h3>
				<p class="max-w-3xl">{group.blurb}</p>
			</div>
			<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))] gap-6">
				{#each socialAssets.filter((a) => a.kind === group.kind) as asset (asset.id)}
					<li class="space-y-3 card preset-filled-surface-100-900 p-4">
						<h4 class="h5">{asset.label}</h4>
						<p class="text-sm">
							{asset.width} × {asset.height} px. {asset.use}
						</p>
						<ul class="grid grid-cols-2 gap-3">
							{#each schemes as scheme (scheme.id)}
								<li class="flex flex-col gap-2">
									<img
										src={previewUrl(asset, scheme.id)}
										alt="{asset.label}, {scheme.label.toLowerCase()} version, without text"
										width={previewWidth}
										height={previewHeight(asset)}
										loading={group.kind === 'avatar' ? 'eager' : 'lazy'}
										decoding="async"
										class="h-auto w-full rounded-base border border-surface-300-700" />
									<div class="flex flex-wrap gap-2">
										<a
											href={assetUrl(asset, scheme.id)}
											download={assetFile(asset, scheme.id)}
											class={downloadLink}>
											{scheme.label}
											<span class="sr-only">{asset.label}</span>
											<span aria-hidden="true">↓</span>
										</a>
										<button
											type="button"
											class={downloadLink}
											onclick={() => copyUrl(assetUrl(asset, scheme.id))}>
											Copy URL
											<span class="sr-only">for {scheme.label.toLowerCase()} {asset.label}</span>
										</button>
									</div>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</section>

{#each mediaGroups as group (group.title)}
	<section aria-labelledby={group.title.toLowerCase()} class="space-y-4">
		<h2 id={group.title.toLowerCase()} class="h2">{group.title}</h2>
		<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,14rem),1fr))] gap-6">
			{#each group.items as item (item.file)}
				<li class="flex flex-col gap-3 card preset-filled-surface-100-900 p-4">
					<div
						class={[
							'flex h-36 items-center justify-center rounded-base p-4',
							item.onDark ? 'bg-surface-950' : 'bg-surface-200-800'
						]}>
						<img
							src={item.file}
							alt=""
							width={item.width}
							height={item.height}
							loading="lazy"
							decoding="async"
							class="max-h-full max-w-full object-contain" />
					</div>
					<h3 class="h5">{item.label}</h3>
					<p class="text-sm">{item.note}</p>
					<div class="mt-auto flex flex-wrap gap-2">
						<a href={item.file} download class={downloadLink}>
							Download <span class="sr-only">{item.label}</span>
							<span aria-hidden="true">↓</span>
						</a>
						<button type="button" class={downloadLink} onclick={() => copyUrl(item.file)}>
							Copy URL <span class="sr-only">for {item.label}</span>
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</section>
{/each}
