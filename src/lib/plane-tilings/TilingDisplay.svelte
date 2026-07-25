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

	const scale = 20;
	const boundingBox = $derived(tiling.boundingBox(scale));
	let hoveredTile: { r: number; c: number } | null = $state(null);

	let polygons: { [key: string]: SVGElement } = $state({});

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

	let bottomHalfFocus = false;

	function handleInput(event: KeyboardEvent, r: number, c: number) {
		if (event.key === "Enter") {
			if (onclick !== undefined) onclick(r, c);
			return;
		}
		const variant = tiling.variantOf(r, c);
		if (variant === null) return;
		let nr = r,
			nc = c;
		switch (event.key) {
			case "ArrowUp":
				nr = variant === TileVariant.Vertical ? r - 2 : r - 1;
				break;
			case "ArrowDown":
				nr = variant === TileVariant.Vertical ? r + 2 : r + 1;
				break;
			case "ArrowLeft":
				// skip past empty spots on top/bottom rows
				if (tiling.variantOf(r, c - 1) === null && tiling.variantOf(r - 1, c - 1) === null) {
					nc = c - 2;
				} else {
					nc = c - 1;
					if (variant === TileVariant.Vertical && bottomHalfFocus) nr = r + 1;
				}
				break;
			case "ArrowRight":
				// skip past empty spots on top/bottom rows
				if (tiling.variantOf(r, c + 1) === null && tiling.variantOf(r - 1, c + 1) === null) {
					nc = c + 2;
				} else {
					nc = c + 1;
					if (variant === TileVariant.Vertical && bottomHalfFocus) nr = r + 1;
				}
				break;
			default:
				return;
		}
		if (tiling.bottomHalf(nr, nc)) {
			bottomHalfFocus = true;
			nr--;
		} else {
			bottomHalfFocus = false;
		}
		if (tiling.variantOf(nr, nc) === null) return;
		event.preventDefault();
		polygons[nr + "," + nc].focus();
	}
</script>

<svg
	class={[svgClass, onclick !== undefined ? "interactive" : ""]}
	style:width={scrolling ? Math.floor(boundingBox.width * 40) + "px" : "100%"}
	style:--outline-color={hideOutlines ? "transparent" : "var(--foreground-color-dd)"}
	style:stroke-width={0.03 * scale}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {boundingBox.width} {boundingBox.height}"
	role="grid"
>
	<g style="display: none">
		{#each [TileVariant.Forward, TileVariant.Backward, TileVariant.Vertical] as variant}
			<polygon
				id={variantToId(variant)}
				points={verticesToPoly(vertexOffsets(variant, 0.85 * scale))}
			/>
		{/each}
	</g>
	{#each { length: tiling.height } as _, r}
		{#each { length: tiling.width } as _, c}
			{let variant = $derived(tiling.variantOf(r, c))}
			{let pos = $derived(tiling.rhombusCenter(r, c, scale))}
			{#if variant !== null && pos !== null}
				<use
					bind:this={polygons[r + "," + c]}
					onclick={() => {
						if (onclick !== undefined) onclick(r, c);
					}}
					onkeydown={(event) => handleInput(event, r, c)}
					onmouseover={() => startHover(r, c)}
					onfocus={() => startHover(r, c)}
					onmouseout={() => endHover(r, c)}
					onblur={() => endHover(r, c)}
					tabindex={r === 0 && c === 0 ? 0 : -1}
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
	}

	use.filled {
		--polygon-fill-color: var(--foreground-color);
		&.hover {
			--polygon-fill-color: var(--foreground-color-dd);
		}
	}

	use.empty {
		--polygon-fill-color: transparent;
		--polygon-stroke-color: var(--outline-color);
		&.hover {
			--polygon-fill-color: var(--background-color-ll);
		}
	}

	svg.interactive > use {
		cursor: pointer;
	}
</style>
