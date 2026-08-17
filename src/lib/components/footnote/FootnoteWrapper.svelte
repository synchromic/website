<script lang="ts">
	import { setFootnoteContext, FootnoteContext } from "./footnote";

	let { children } = $props();

	let context: FootnoteContext = $state(new FootnoteContext());
	setFootnoteContext(context);
</script>

{@render children()}
