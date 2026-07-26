<script lang="ts">
	import { PlaneTiling, Tile } from "./tiling.svelte";
	import TilingDisplay from "./TilingDisplay.svelte";

	const defaultCode =
		"Xa2cN0T1219L6v9afirsmy8vVftoenV9fH31UfGuO0f3xllx3nnXejtu21was+Wr74nx+/hvxM333VDVVp12";
	const sizeLimit = { columns: 40, rows: 80 };
	let tiling = new PlaneTiling(15, 44, defaultCode);
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
			if (newTile.r !== tile.r || newTile.c !== tile.c) {
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
		if (hoveredTile.r === tile.r && hoveredTile.c === tile.c) {
			return true;
		}
		if (symmetric) {
			const newTile = tiling.symmetricTile(hoveredTile);
			if (tile.r === newTile.r && tile.c === newTile.c) return true;
		}
		return false;
	}
</script>

<div class={{ container: true, scrolling }}>
	<div class={{ left: true, scrolling }}>
		<TilingDisplay
			{tiling}
			{onclick}
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
		min-height: 600px;

		padding: 0.7em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		border: 1px solid var(--foreground-color-d);
	}

	input.error {
		background-color: #ffcccc;
	}
</style>
