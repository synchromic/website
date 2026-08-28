<script lang="ts">
	import { setFootnoteContext, FootnoteContext } from "./footnote.svelte.ts";
	import { onNavigate } from "$app/navigation";

	let { children } = $props();

	let context = $state(new FootnoteContext());
	setFootnoteContext(context);

	// onNavigate is correct rather than afterNavigate or beforeNavigate.
	// afterNavigate triggers after footnotes are mounted, causing all footnotes to be deleted.
	// beforeNavigate happens too early, causing a DOM update to happen for a split second.
	onNavigate(() => {
		context.reset();
	});
</script>

{@render children()}
