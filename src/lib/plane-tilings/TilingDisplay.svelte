<script lang="ts">
	import { TileVariant, topLeft, vertexOffsets, type PlaneTiling } from "./tiling";

	let { tiling }: { tiling: PlaneTiling } = $props();

	let svgWidth = $derived(tiling.width);
	let svgHeight = $derived((tiling.height * Math.sqrt(3)) / 2);

	function verticesToPoly(vertices: { x: number; y: number }[]): string {
		const out = [];
		for (const vertex of vertices) {
			out.push(`${vertex.x},${vertex.y}`);
		}
		return out.join(" ");
	}

	function variantToId(variant: TileVariant): string {
		switch (variant) {
			case TileVariant.Forward:
				return "forward";
			case TileVariant.Backward:
				return "backward";
			case TileVariant.Vertical:
				return "vertical";
		}
	}
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svgWidth} {svgHeight}">
	<g style="display: none">
		{#each [TileVariant.Forward, TileVariant.Backward, TileVariant.Vertical] as variant}
			<polygon id={variantToId(variant)} points={verticesToPoly(vertexOffsets(variant))} />
		{/each}
	</g>
	{#each tiling.grid as row, r}
		{#each row as val, c}
			{const variant = tiling.variantOf(r, c)}
			{const pos = topLeft(r, c)}
			{#if val && variant !== null && pos !== null}
				<use href="#{variantToId(variant)}" x={pos.x} y={pos.y} />
			{/if}
		{/each}
	{/each}
</svg>

<style>
	polygon {
		fill: var(--foreground-color);
		stroke: var(--background-color);
		stroke-width: 0.1;
	}
</style>
