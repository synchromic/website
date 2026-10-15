<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";
	import BlogFigure from "$lib/components/BlogFigure.svelte";
	import TilingEditor from "$lib/plane-tilings/TilingEditor.svelte";

	export const metadata: Metadata = {
		title: "Plane tilings (literally!)",
		date: new Date("2026-07-22T20:00:00.000Z"),
		description:
			"I noticed some interesting roof decorations while sleep deprived on a plane flight and looked into it a bit too much",
		thumbnail: "blog/plane-tilings/tilings-thumbnail",
	};
</script>

<script lang="ts">
	function rhombs() {
		return Math.random() < 0.5 ? "rhombi" : "rhombuses";
	}
</script>

<p>
	Earlier this summer, I flew on a red-eye from Seattle to New York for an apartment hunting trip. As someone chronically unable to
	sleep on airplane flights, I spent a lot of time staring up at this pattern on the ceiling of this
	Airbus A320neo:
</p>

<BlogFigure src="plane-tilings/ceiling" imgClass="portrait" alt="Cool ceiling tiles on my flight" />

<p>
	If you fill in the blank spots, this is a <a
		href="https://en.wikipedia.org/wiki/Rhombille_tiling">rhombille tiling</a
	>. Some interesting things I noticed about this pattern in particular:
</p>

<ol>
	<li>it is periodic, repeating every 44 rows (corresponding to the actual tiles in the ceiling)</li>
	<li>it is rotationally symmetric about the center of each period</li>
	<li>
		the connected areas of empty {rhombs()} are small (at most size 4, ignoring the period
		boundary).
	</li>
</ol>

<p>
	That last observation was the most interesting: it seemed suspiciously small for a presumably
	randomly generated pattern. To see what the distribution of this value looks like, I wrote some
	code. Check out this tiling editor:
</p>

<TilingEditor />
