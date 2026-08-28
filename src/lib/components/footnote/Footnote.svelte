<script lang="ts">
	import type { Snippet } from "svelte";
	import { getFootnoteContext } from "./footnote.svelte.ts";

	let { name, children }: { name: string; children: Snippet } = $props();

	const context = getFootnoteContext();

	// I wish we could make this reactive based on name, but there's some jank involving
	// updating context's state in the derived. For now this is good enough
	// I do this ignore instead of an onMount because the latter happens too late and causes
	// a flash without footnotes, which is ugly.

	// svelte-ignore state_referenced_locally
	const index = context.addFootnote(name, children);
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
