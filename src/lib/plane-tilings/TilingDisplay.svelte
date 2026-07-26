<script lang="ts">
	import { TileVariant, vertexOffsets, type PlaneTiling } from "./tiling.svelte";

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
		onclick?: (r: number, c: number) => void;
		onhoverstart?: (r: number, c: number) => void;
		onhoverend?: () => void;
		tileHighlighted?: (r: number, c: number) => boolean;
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
	function attachData<E extends Event>(event: E, fn?: (r: number, c: number, event: E) => any) {
		if (fn === undefined || !event.target) return;
		if (event.target instanceof SVGUseElement) {
			const r = event.target.dataset["r"];
			const c = event.target.dataset["c"];
			if (r === undefined || c === undefined) return;
			fn(parseInt(r), parseInt(c), event);
		}
	}

	// TODO: move focus control stuff to the editor
	let focusedCell: { r: number; c: number } | null = $state(null);

	function onfocus(r: number, c: number) {
		focusedCell = { r, c };
		onhoverstart?.(r, c);
	}

	function onblur() {
		focusedCell = null;
		onhoverend?.();
	}

	function shouldSkip(r: number, c: number) {
		return tiling.variantOf(r, c) === null && tiling.variantOf(r - 1, c) === null;
	}

	function handleInput(r: number, c: number, event: KeyboardEvent) {
		if (event.key === "Enter") {
			onclick?.(r, c);
			return;
		}
		if (!event.key.startsWith("Arrow")) return;
		// use focused row/column for source of truth here
		if (focusedCell === null) return;
		r = focusedCell.r;
		c = focusedCell.c;
		let [dr, dc] = {
			ArrowUp: [-1, 0],
			ArrowDown: [1, 0],
			ArrowLeft: [0, -1],
			ArrowRight: [0, 1],
		}[event.key]!;
		if (shouldSkip(r + dr, c + dc)) dc *= 2;
		if (tiling.variantOf(r, c, true) === TileVariant.Vertical) dr *= 2;
		let tr = tiling.bottomHalf(r + dr, c + dc) ? r + dr - 1 : r + dr;
		let tc = c + dc;
		if (tiling.variantOf(tr, tc) === null) return; // out of bounds or something
		event.preventDefault();
		polygons[tr + "," + tc].focus();
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
			{let variant = $derived(tiling.variantOf(r, c))}
			{let pos = $derived(tiling.rhombusCenter(r, c, scale))}
			{#if variant !== null && pos !== null}
				<use
					data-r={r}
					data-c={c}
					bind:this={polygons[r + "," + c]}
					tabindex={r === 0 && c === 0 ? 0 : -1}
					role="gridcell"
					class={[tiling.get(r, c) ? "filled" : "empty", tileHighlighted?.(r, c) ? "hover" : ""]}
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
