<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";
	import Footnote from "$lib/components/footnote/Footnote.svelte";

	export const metadata: Metadata = {
		title: "Test post 1",
		date: new Date("2026-06-18T19:27:49.184Z"),
		hidden: true,
		description: "Test page because I needed something to put in my index.",
		thumbnail: "favicon",
	};

	let counter = $state(0);
</script>

<p>Hello, world!<Footnote name="hi">This is a footnote!</Footnote></p>

<p>Goodbye, world!<Footnote name="bye">This is another footnote!</Footnote></p>

<p>
	<button onclick={() => (counter += 1)}>Increment</button><Footnote name="counter"
		>Counter: {counter}</Footnote
	>
</p>

<!--
	<p>
		Nested footnotes:
		<Footnote name="nested1">
			Hello!
			<Footnote name="nested2">Hi!</Footnote>
		</Footnote>
	</p>
-->

<p>Here's a big spacer:</p>

<div style="height: 120vh"></div>
