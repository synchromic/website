<script lang="ts">
	let {
		imgSrc,
		href,
		title,
		alt
	}: {
		imgSrc: string;
		href: string;
		title: string;
		alt: string;
	} = $props();
</script>

<a {href} {title}>
	<img src={imgSrc} {alt} />
</a>

<style>
	img {
		display: block;
		width: 2em;
		height: 2em;
		color: #cd201f;
	}

	a {
		display: block;
		padding: 0.5em;

		border: 1px solid var(--foreground-color);
		background-color: var(--background-color-l);
	}

	a:hover {
		background-color: var(--background-color-ll);
	}
</style>
