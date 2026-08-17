<script lang="ts">
	import { getFootnoteContext } from "./footnote";

	let { id }: { id: string } = $props();

	const context = getFootnoteContext();
	let index = $derived(context.getOrAddIndex(id));
	// TODO: how do we do addRef? is onMount really the best way?
</script>

<sup><a href="#footnote{index}">[{index}]</a></sup>
