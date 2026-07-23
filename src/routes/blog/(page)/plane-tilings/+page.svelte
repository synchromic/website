<script module lang="ts">
	import type { Metadata } from "$lib/blogIndex";
	import { PlaneTiling } from "$lib/plane-tilings/tiling";
	import TilingDisplay from "$lib/plane-tilings/TilingDisplay.svelte";

	export const metadata: Metadata = {
		title: "Plane tilings (literally!)",
		date: new Date("2026-07-22T20:00:00.000Z"),
		description:
			"I noticed some interesting roof decorations while sleep deprived on a plane flight and looked into it a bit too much",
	};
</script>

<script lang="ts">
	const testTiling = new PlaneTiling(10, 10);
	testTiling.grid = testTiling.grid.map((a) => a.map((_) => Math.random() < 0.7));
</script>

<p>
	As someone chronically unable to sleep on airplane flights, I spent a lot of time staring up at
	this pattern on the ceiling of <!-- TODO: insert plane type here -->:
</p>

<!-- TODO: insert image of tiles here -->

<p>
	This tiling is a <!-- TODO: convert to link --> rhombille tiling, with rhomb(i|uses) as its faces. Some
	interesting things I noticed about the plane's tiling are that it is periodic (corresponding to the
	actual ceiling tiles), and that it is rotationally symmetric about the center of the period.
</p>

<TilingDisplay svgClass="portrait" tiling={testTiling} />
