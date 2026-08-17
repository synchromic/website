<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";
	import Footnote from "$lib/components/footnote/Footnote.svelte";
	import FootnoteRef from "$lib/components/footnote/FootnoteRef.svelte";

	export const metadata: Metadata = {
		title: "Test post 1",
		date: new Date("2026-06-18T19:27:49.184Z"),
		hidden: true,
		description: "Test page because I needed something to put in my index.",
		thumbnail: "favicon",
	};
</script>

<p>Hello, world!<FootnoteRef id="hi" /></p>

<Footnote id="hi">This is a footnote!</Footnote>
