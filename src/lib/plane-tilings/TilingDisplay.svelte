<script lang="ts">
	import { TileVariant, vertexOffsets, type PlaneTiling } from "./tiling.svelte";

	let {
		tiling,
		svgClass,
		onclick,
		reflecting,
		hideOutlines,
		scrolling,
	}: {
		tiling: PlaneTiling;
		svgClass?: string;
		onclick?: (r: number, c: number) => void;
		reflecting?: boolean;
		hideOutlines?: boolean;
		scrolling?: boolean;
	} = $props();

	const boundingBox = $derived(tiling.boundingBox());
	let hoveredTile: { r: number; c: number } | null = $state(null);

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

	function startHover(r: number, c: number) {
		hoveredTile = { r, c };
	}

	function endHover(r: number, c: number) {
		if (hoveredTile?.r === r && hoveredTile?.c === c) {
			hoveredTile = null;
		}
	}

	function shouldShowHover(r: number, c: number) {
		if (hoveredTile === null) return false;
		if (hoveredTile.r === r && hoveredTile.c === c) {
			return true;
		}
		if (reflecting) {
			const { r: refR, c: refC } = tiling.reflected(hoveredTile.r, hoveredTile.c);
			if (r === refR && c === refC) return true;
		}
		return false;
	}
</script>

<svg
	class={[svgClass, onclick !== undefined ? "interactive" : ""]}
	style:width={scrolling ? Math.floor(boundingBox.width * 50) + "px" : "100%"}
	style:--outline-color={hideOutlines ? "transparent" : "var(--foreground-color-dd)"}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {boundingBox.width} {boundingBox.height}"
	role="grid"
>
	<g style="display: none">
		{#each [TileVariant.Forward, TileVariant.Backward, TileVariant.Vertical] as variant}
			<polygon id={variantToId(variant)} points={verticesToPoly(vertexOffsets(variant, 0.85))} />
		{/each}
	</g>
	{#each { length: tiling.height } as _, r}
		{#each { length: tiling.width } as _, c}
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
					onmouseover={() => startHover(r, c)}
					onfocus={() => startHover(r, c)}
					onmouseout={() => endHover(r, c)}
					onblur={() => endHover(r, c)}
					tabindex="0"
					role="gridcell"
					class={[tiling.get(r, c) ? "filled" : "empty", shouldShowHover(r, c) ? "hover" : ""]}
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
		&.hover {
			--polygon-fill-color: var(--foreground-color-dd);
		}
	}

	use.empty {
		--polygon-fill-color: var(--background-color);
		--polygon-stroke-color: var(--outline-color);
		&.hover {
			--polygon-fill-color: var(--background-color-ll);
		}
	}

	svg.interactive > use {
		cursor: pointer;
	}
</style>
