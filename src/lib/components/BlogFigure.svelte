<script lang="ts">
	import { getUrls } from "$lib/images";

	let {
		src,
		imgClass,
		alt,
		caption,
	}: {
		imgClass: string;
		alt: string;
		caption?: string;
		src: string;
	} = $props();

	let urls = $derived(getUrls(src));
</script>

<figure>
	<img class={imgClass} src={urls.webp} {alt} />
	{#if caption === undefined}
		<figcaption><a href={urls.original}>View original</a></figcaption>
	{:else}
		<figcaption>{caption} · <a href={urls.original}>View original</a></figcaption>
	{/if}
</figure>
