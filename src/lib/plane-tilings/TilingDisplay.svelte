<script lang="ts">
	import { Tile, TileVariant, vertexOffsets, type PlaneTiling } from "./tiling.svelte";

	let {
		tiling,
		onclick,
		onhoverstart: onhoverstart,
		onhoverend: onhoverend,
		tileHighlighted,
		hideOutlines,
		scrolling,
	}: {
		tiling: PlaneTiling;
		onclick?: (tile: Tile) => void;
		onhoverstart?: (tile: Tile) => void;
		onhoverend?: () => void;
		tileHighlighted?: (tile: Tile) => boolean;
		hideOutlines?: boolean;
		scrolling?: boolean;
	} = $props();

	const scale = 20;
	const boundingBox = $derived(tiling.boundingBox(scale));

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

	// lets us use fewer event listeners by grabbing row/column from event target dataset
	function attachData<E extends Event>(event: E, fn?: (tile: Tile, event: E) => any) {
		if (fn === undefined || !event.target) return;
		if (event.target instanceof SVGUseElement) {
			const r = event.target.dataset["r"];
			const c = event.target.dataset["c"];
			if (r === undefined || c === undefined) return;
			const tile = tiling.tile(parseInt(r), parseInt(c), false);
			if (tile === null) throw new Error(`Event tile ${r},${c} not in tiling`);
			fn(tile, event);
		}
	}

	// TODO: move focus control stuff to the editor
	let focusedCell: { r: number; c: number } | null = $state(null);

	function onfocus(tile: Tile) {
		focusedCell = { r: tile.r, c: tile.c };
		onhoverstart?.(tile);
	}

	function onblur() {
		focusedCell = null;
		onhoverend?.();
	}

	function shouldSkip(r: number, c: number) {
		return tiling.tile(r, c, true) === null;
	}

	function handleInput(tile: Tile, event: KeyboardEvent) {
		if (event.key === "Enter") {
			onclick?.(tile);
			return;
		}
		if (!event.key.startsWith("Arrow")) return;
		// use focused row/column for source of truth here
		if (focusedCell === null) return;
		const r = focusedCell.r;
		const c = focusedCell.c;
		let [dr, dc] = {
			ArrowUp: [-1, 0],
			ArrowDown: [1, 0],
			ArrowLeft: [0, -1],
			ArrowRight: [0, 1],
		}[event.key]!;
		if (shouldSkip(r + dr, c + dc)) dc *= 2;
		if (tiling.tile(r, c, true)?.variant() === TileVariant.Vertical) dr *= 2;
		const newTile = tiling.tile(r + dr, c + dc, true);
		if (newTile === null) return; // out of bounds or something
		event.preventDefault();
		polygons[newTile.r + "," + newTile.c].focus();
		// focusedCell must be set after polygon focus else it gets overridden
		focusedCell = { r: r + dr, c: c + dc };
	}
</script>

<svg
	class={[onclick !== undefined ? "interactive" : ""]}
	style:width={scrolling ? Math.floor((boundingBox.width * 40) / scale) + "px" : "100%"}
	style:--outline-color={hideOutlines ? "transparent" : "var(--foreground-color-dd)"}
	style:stroke-width={0.03 * scale}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {boundingBox.width} {boundingBox.height}"
	role="grid"
	tabindex="-1"
	onclick={(e) => attachData(e, onclick)}
	onkeydown={(e) => attachData(e, handleInput)}
	onmouseover={(e) => attachData(e, onhoverstart)}
	onmouseout={(e) => attachData(e, onhoverend)}
	// aria tells us we need an onfocus/onblur
	// but in reality everything happens on the <use></svg> elements
	onfocus={() => {}}
	onblur={() => {}}
	onfocusin={(e) => attachData(e, onfocus)}
	onfocusout={(e) => attachData(e, onblur)}
>
	<g style="display: none">
		{#each [TileVariant.Forward, TileVariant.Backward, TileVariant.Vertical] as variant}
			<polygon
				id={variantToId(variant)}
				points={verticesToPoly(vertexOffsets(variant, 0.85 * scale))}
			/>
		{/each}
	</g>
	{#each { length: tiling.rows } as _, r}
		{#each { length: tiling.columns } as _, c}
			{let tile = $derived(tiling.tile(r, c, false))}
			{#if tile !== null}
				{let variant = $derived(tile.variant())}
				{let pos = $derived(tile.centerPos(scale))}
				<use
					data-r={r}
					data-c={c}
					bind:this={polygons[r + "," + c]}
					tabindex={r === 0 && c === 0 ? 0 : -1}
					role="gridcell"
					class={[
						tiling.grid.get(tile) ? "filled" : "empty",
						tileHighlighted?.(tile) ? "hover" : "",
					]}
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
		&.hover,
		&:hover {
			--polygon-fill-color: var(--foreground-color-dd);
		}
	}

	use.empty {
		--polygon-fill-color: transparent;
		--polygon-stroke-color: var(--outline-color);
		&.hover,
		&:hover {
			--polygon-fill-color: var(--background-color-ll);
		}
	}

	svg.interactive > use {
		cursor: pointer;
	}
</style>
