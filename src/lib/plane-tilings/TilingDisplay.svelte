<script lang="ts">
	import { TileVariant, vertexOffsets, type PlaneTiling } from "./tiling.svelte";

	let {
		tiling,
		svgClass,
		onclick,
	}: {
		tiling: PlaneTiling;
		svgClass?: string;
		onclick?: (r: number, c: number) => void;
	} = $props();

	const boundingBox = $derived(tiling.boundingBox());

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

<svg
	class={[svgClass, onclick !== undefined ? "interactive" : ""]}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {boundingBox.width} {boundingBox.height}"
	role="grid"
>
	<g style="display: none">
		{#each [TileVariant.Forward, TileVariant.Backward, TileVariant.Vertical] as variant}
			<polygon id={variantToId(variant)} points={verticesToPoly(vertexOffsets(variant, 0.9))} />
		{/each}
	</g>
	{#each tiling.grid as row, r}
		{#each row as val, c}
			{const variant = tiling.variantOf(r, c)}
			{const pos = tiling.rhombusCenter(r, c)}
			{#if variant !== null && pos !== null}
				<!-- TODO: accessibility 
             https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/grid_role#keyboard_interactions 
        -->
				<use
					onclick={() => {
						if (onclick !== undefined) onclick(r, c);
					}}
					onkeydown={(event) => {
						if (onclick !== undefined && event.key === "Enter") {
							onclick(r, c);
						}
					}}
					tabindex="0"
					role="gridcell"
					class={val ? "filled" : "empty"}
					href="#{variantToId(variant)}"
					x={pos.x}
					y={pos.y}
				/>
			{/if}
		{/each}
	{/each}
</svg>

<style>
	polygon {
		fill: var(--polygon-fill-color);
		stroke: var(--polygon-stroke-color);
		stroke-width: 0.03;
	}

	use.filled {
		--polygon-fill-color: var(--foreground-color);
		--polygon-stroke-color: var(--foreground-color);
		&:hover {
			--polygon-fill-color: var(--foreground-color-d);
		}
	}

	use.empty {
		--polygon-fill-color: var(--background-color);
		--polygon-stroke-color: var(--foreground-color-dd);
		&:hover {
			--polygon-fill-color: var(--background-color-l);
		}
	}

	svg.interactive > use {
		cursor: pointer;
	}
</style>
