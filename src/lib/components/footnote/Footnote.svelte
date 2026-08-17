<script lang="ts">
	import type { Snippet } from "svelte";
	import { getFootnoteContext } from "./footnote";

	let { id, children }: { id: string; children: Snippet } = $props();

	const context = getFootnoteContext();
	let index = $derived(context.getOrAddIndex(id));
	let refCount = $derived(context.getRefCount(id));
</script>

<div>
	<span>
		{#each { length: refCount } as refIndex}
			<a id="footnote{index}link{refIndex}" href="#footnote{index}ref{refIndex}">^</a>
		{/each}
	</span>
	{@render children()}
</div>
