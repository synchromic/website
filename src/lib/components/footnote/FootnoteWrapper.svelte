<script lang="ts">
	import { setFootnoteContext, FootnoteContext } from "./footnote";

	let { children } = $props();

	setFootnoteContext(new FootnoteContext());
</script>

{@render children()}
