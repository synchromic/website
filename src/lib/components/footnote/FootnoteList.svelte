<script lang="ts">
	import { getFootnoteContext } from "./footnote";

	const context = getFootnoteContext();
	let items = $derived(context.getFootnoteList());
</script>

<ol>
	{#each items as item}
		<li>
			{@render item.snippet()}
			<!-- important to put id on this for focusing -->
			<a id="fn:{item.name}" href="#fnref:{item.name}">&uarr;</a>
		</li>
	{/each}
</ol>

<style>
	@counter-style footnotes {
		system: extends decimal;
		prefix: "[";
		suffix: "] ";
	}

	ol {
		list-style: footnotes;
	}

	li:has(a:target) {
		background-color: var(--background-color-l);
	}
</style>
