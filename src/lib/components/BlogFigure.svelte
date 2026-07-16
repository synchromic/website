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
		caption: string;
		src: string;
	} = $props();

	let urls = $derived(getUrls(src));
</script>

<figure>
	<img class={imgClass} src={urls.webp} {alt} />
	<figcaption>{caption} · <a href={urls.png}>View original</a></figcaption>
</figure>
