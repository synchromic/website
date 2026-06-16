<script lang="ts">
	import type { Snippet } from "svelte";

	let { children, title }: { children: Snippet; title: string } = $props();
</script>

<section>
	<header>
		<h2>{title}</h2>
	</header>
	{@render children()}
</section>

<style>
	section {
		border: 1px solid var(--foreground-color);
		background-color: var(--background-color);
	}

	header {
		margin: 0;
		padding: 0.3em;
		border-bottom: 1px solid var(--foreground-color);

		background-color: var(--background-color-l);
	}

	h2 {
		margin: 0;

		font-family: "Source Code Pro", Consolas, monaco, monospace;
		font-size: 1em;
		font-weight: normal;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
</style>
