<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";
	import BlogFigure from "$lib/components/BlogFigure.svelte";
	import TilingEditor from "$lib/plane-tilings/TilingEditor.svelte";

	export const metadata: Metadata = {
		title: "Plane tilings (literally!)",
		date: new Date("2026-07-22T20:00:00.000Z"),
		description:
			"I noticed some interesting roof decorations while sleep deprived on a plane flight and looked into it a bit too much",
	};
</script>

<script lang="ts">
	function rhombs() {
		return Math.random() < 0.5 ? "rhombi" : "rhombuses";
	}
</script>

<p>
	This week, I flew to New York for an apartment hunting trip. As someone chronically unable to
	sleep on airplane flights, I spent a lot of time staring up at this pattern on the ceiling of this
	Delta flight's Airbus A320neo:
</p>

<BlogFigure
	src="plane-tilings/ceiling.jpg"
	imgClass="portrait"
	alt="Cool ceiling tiles on my flight"
/>

<p>
	If you fill in the blanks, this tiling is a <a
		href="https://en.wikipedia.org/wiki/Rhombille_tiling">rhombille tiling</a
	>, with {rhombs()} as its faces. Some interesting things I noticed about the plane's tiling:
</p>

<ol>
	<li>it is periodic (corresponding to the actual ceiling tiles)</li>
	<li>it is rotationally symmetric about the center of each period</li>
	<li>
		the connected areas of empty {rhombs()} are small (at most 4 {rhombs()} large, ignoring the period
		boundary).
	</li>
</ol>

<p>
	That last factoid was particularly interesting: it seemed suspiciously small for a presumably
	randomly generated pattern. To see what the distribution of this value looks like, I wrote some
	code. Check out this tiling editor:
</p>

<TilingEditor />
