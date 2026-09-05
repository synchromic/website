<script lang="ts">
	import { browser } from "$app/environment";
	import { largestEmptyComponent, PlaneTiling, Tile } from "./tiling.svelte";
	import TilingDisplay from "./TilingDisplay.svelte";
	import TilingSimulator from "./TilingSimulator.svelte";

	const defaultCode =
		"Xa2cN0T1219L6v9afirsmy8vVftoenV9fH31UfGuO0f3xllx3nnXejtu21was+Wr74nx+/hvxM333VDVVp12";
	const sizeLimit = { columns: 40, rows: 80 };
	let tiling = new PlaneTiling(15, 44, defaultCode);
	let display: TilingDisplay;

	let symmetric = $state(false);
	let hideOutlines = $state(false);
	let scrolling = $state(false);
	let randomizeP = $state(0.5);
	let tileCounts = $derived(tiling.countTiles());

	let code = $derived(tiling.getCode());
	let codeError = $state(false);

	function testBase64(code: string): boolean {
		try {
			Uint8Array.fromBase64(code);
			return true;
		} catch (_) {
			return false;
		}
	}

	function onCodeInput() {
		codeError = !testBase64(code);
	}

	function onCodeChange() {
		codeError = !testBase64(code);
		if (codeError) return;
		tiling.setCode(code);
	}

	// prefer using tiling.columns/rows over these directly
	let columnsInput = $state(15);
	let rowsInput = $state(44);

	function onColumnsChange() {
		columnsInput = Math.max(1, Math.min(sizeLimit.columns, columnsInput));
		tiling.columns = columnsInput;
	}

	function onRowsChange() {
		rowsInput = Math.max(1, Math.min(sizeLimit.rows, rowsInput));
		tiling.rows = rowsInput;
	}

	function onclick(tile: Tile) {
		tiling.toggle(tile);
		if (symmetric) {
			const newTile = tiling.symmetricTile(tile);
			if (newTile !== null && !tile.equalTo(newTile)) {
				tiling.toggle(newTile);
			}
		}
	}

	let hoveredTile: Tile | null = $state(null);

	function onhoverstart(tile: Tile) {
		hoveredTile = tile;
	}

	function onhoverend() {
		hoveredTile = null;
	}

	function tileHighlighted(tile: Tile) {
		if (hoveredTile === null) return false;
		if (hoveredTile.equalTo(tile)) {
			return true;
		}
		if (symmetric) {
			const newTile = tiling.symmetricTile(hoveredTile);
			if (tile.equalTo(newTile)) return true;
		}
		return false;
	}

	let focusedCell: { r: number; c: number } | null = $state(null);

	function onfocus(tile: Tile) {
		focusedCell = { r: tile.r, c: tile.c };
		onhoverstart?.(tile);
	}

	function onblur() {
		focusedCell = null;
		onhoverend?.();
	}

	function onkeydown(tile: Tile, event: KeyboardEvent) {
		if (event.key === "Enter") {
			onclick?.(tile);
			return;
		}
		if (!event.key.startsWith("Arrow")) return;
		// use focused row/column for source of truth here
		if (focusedCell === null) return;
		event.preventDefault(); // cancel event to prevent scrolling when hitting top/bottom
		const r = focusedCell.r;
		const c = focusedCell.c;
		let [dr, dc] = {
			ArrowUp: [-1, 0],
			ArrowDown: [1, 0],
			ArrowLeft: [0, -1],
			ArrowRight: [0, 1],
		}[event.key]!;
		if (tiling.tile(r + dr, c + dc, true) === null) dc *= 2;
		if (
			tiling.tile(r, c, true)?.equalTo(tiling.tile(r + dr, c + dc, true)) &&
			tiling.tile(r + 2 * dr, c + dc, true) !== null // if at top/bottom, snaps to wall
		) {
			dr *= 2;
		}
		const newTile = tiling.tile(r + dr, c + dc, true);
		if (newTile === null) return; // out of bounds or something
		display.getPolygon(newTile).focus();
		// focusedCell must be set after polygon focus else it gets overridden
		focusedCell = { r: r + dr, c: c + dc };
	}
</script>

<div class={{ container: true, scrolling }}>
	<div class={{ left: true, scrolling }}>
		<TilingDisplay
			bind:this={display}
			{tiling}
			{onclick}
			{onfocus}
			{onblur}
			{onkeydown}
			{hideOutlines}
			{scrolling}
			{onhoverstart}
			{onhoverend}
			{tileHighlighted}
		/>
	</div>
	<div class="right">
		<h2>Tiling Editor</h2>
		<noscript>
			<p style="color: red">
				Javascript is disabled, so the editor won't work, but you can still look at it!
			</p>
		</noscript>
		<p>
			<button onclick={() => tiling.setAll(false)}>Clear</button>
			<button onclick={() => tiling.setAll(true)}>Fill</button>
			<button
				onclick={() => {
					tiling.columns = columnsInput = 15;
					tiling.rows = rowsInput = 44;
					tiling.setCode(defaultCode);
				}}>Default</button
			>
		</p>
		<p>
			<button onclick={() => tiling.randomize(randomizeP, symmetric)}>Randomize</button>
			<input
				id="randomizePInput"
				type="range"
				bind:value={randomizeP}
				min={0}
				max={1}
				step={0.01}
			/>
			<label for="randomizePInput">p: {randomizeP}</label>
		</p>
		<p>
			<label for="columnsInput">Columns:</label>
			<input
				id="columnsInput"
				type="number"
				bind:value={columnsInput}
				onchange={onColumnsChange}
				min={1}
				max={sizeLimit.columns}
				autocomplete="off"
			/>
		</p>
		<p>
			<label for="rowsInput">Rows:</label>
			<input
				id="rowsInput"
				type="number"
				bind:value={rowsInput}
				onchange={onRowsChange}
				min={1}
				max={sizeLimit.rows}
				autocomplete="off"
			/>
		</p>
		<p>
			<label for="scrollingInput">Enable scrolling:</label>
			<input id="scrollingInput" type="checkbox" bind:checked={scrolling} />
		</p>
		<p>
			<label for="symmetricInput">Keep symmetry:</label>
			<input id="symmetricInput" type="checkbox" bind:checked={symmetric} />
		</p>
		<p>
			<label for="outlineInput">Hide empty outlines:</label>
			<input id="outlineInput" type="checkbox" bind:checked={hideOutlines} />
		</p>
		<p>
			<label for="codeInput">Code:</label>
			<input
				id="codeInput"
				class={{ error: codeError }}
				type="text"
				bind:value={code}
				oninput={onCodeInput}
				onchange={onCodeChange}
				autocomplete="off"
			/>
		</p>
		<h3>Stats</h3>
		<p>Filled: {tileCounts.filled} ({Math.round((tileCounts.filled / tileCounts.total) * 100)}%)</p>
		<p>Empty: {tileCounts.empty} ({Math.round((tileCounts.empty / tileCounts.total) * 100)}%)</p>
		<p>Largest empty component: {largestEmptyComponent(tiling)}</p>

		{#if browser && window.Worker}
			<TilingSimulator
				settings={{
					columns: tiling.columns,
					rows: tiling.rows,
					randomizeP,
					symmetric,
				}}
			/>
		{:else}
			<p>Could not load simulation as Web Workers are not available</p>
		{/if}
	</div>
</div>

<style>
	.container {
		align-self: center;
		width: 90%;

		display: flex;
		flex-direction: row;
		gap: 1em;
		&.scrolling {
			max-height: 600px;
		}
	}

	.left {
		min-width: 50%;
		max-width: 50%;
		&.scrolling {
			overflow: scroll;
		}
	}

	.right {
		flex-grow: 1;

		padding: 0.7em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		border: 1px solid var(--foreground-color-d);
	}

	@media (max-width: 700px) {
		.container {
			flex-direction: column-reverse;
		}

		.left {
			max-width: 90vw;
		}
	}

	input.error {
		background-color: #ffcccc;
	}
</style>
