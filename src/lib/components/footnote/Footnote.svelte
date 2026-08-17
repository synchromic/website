<script lang="ts">
	import type { Snippet } from "svelte";
	import { getFootnoteContext } from "./footnote";

	let { name, children }: { name: string; children: Snippet } = $props();

	const context = getFootnoteContext();
	let index = $derived(context.addFootnote(name, children));
</script>

<sup>
	<!-- important to put id on this for focusing -->
	<a id="fnref:{name}" href="#fn:{name}">{index}</a>
</sup>

<style>
	a:target {
		background-color: var(--background-color-l);
	}
</style>
