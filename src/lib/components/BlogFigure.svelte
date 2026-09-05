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

	let urls = $derived(getUrls("blog/" + src));
	let original = $derived(urls.png ?? urls.jpg);
</script>

<figure>
	<img class={imgClass} src={urls.webp} {alt} />
	{#if caption !== undefined && original !== undefined}
		<figcaption>{caption} · <a href={original}>View original</a></figcaption>
	{:else if caption !== undefined}
		<figcaption>{caption}</figcaption>
	{:else if original !== undefined}
		<figcaption><a href={original}>View original</a></figcaption>
		<!-- else no caption -->
	{/if}
</figure>
