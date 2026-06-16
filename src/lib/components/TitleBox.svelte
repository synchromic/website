<script lang="ts">
	import type { Snippet } from "svelte";

	let { children, title }: { children: Snippet; title: string } = $props();
</script>

<section class="container">
	<h2 class="title">{title}</h2>
	{@render children()}
</section>

<style>
	.container {
		width: 500px;
		border: 1px solid var(--foreground-color);
	}

	.title {
		display: block;
		margin: 0;
		padding: 0.2em;
		border-bottom: 1px solid var(--foreground-color);

		background-color: var(--background-color-l);

		font-family: "Roboto Mono", Consolas, monaco, monospace;
		font-size: 1em;
		text-transform: uppercase;
	}
</style>
