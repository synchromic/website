<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";

	export const metadata: Metadata = {
		title: "Star Technology: LuV",
		date: new Date("2026-07-17T12:01:09-07:00"),
		parent: "star-technology",
		description:
			"A journal of my playthrough of the Minecraft modpack Star Technology through the LuV voltage tier.",
	};
</script>

<script lang="ts">
	import BlogFigure from "$lib/components/BlogFigure.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

