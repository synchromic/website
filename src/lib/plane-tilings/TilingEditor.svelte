<script lang="ts">
	import { PlaneTiling } from "./tiling.svelte";
	import TilingDisplay from "./TilingDisplay.svelte";

	const defaultCode =
		"Xa2cN0T1219L6v9afirsmy8vVftoenV9fH31UfGuO0f3xllx3nnXejtu21was+Wr74nx+/hvxM333VDVVp12";
	const sizeLimit = { width: 40, height: 80 };
	let width = $state(15);
	let height = $state(44);
	let tiling = new PlaneTiling(15, 44, defaultCode);
	let reflecting = $state(true);
	let hideOutlines = $state(false);
	let scrolling = $state(false);

	let code = $derived(tiling.getCode());
	let codeInput = $state(defaultCode);

	function onCodeChange() {
		const oldCode = code;
		try {
			tiling.setCode(codeInput);
		} catch (error) {
			console.warn(error);
			tiling.setCode(oldCode);
		}
	}

	let widthInput = $state(15);
	let heightInput = $state(44);

	function onWidthChange() {
		widthInput = Math.max(1, Math.min(sizeLimit.width, widthInput));
		width = widthInput;
		tiling.width = width;
		codeInput = code;
	}

	function onHeightChange() {
		heightInput = Math.max(1, Math.min(sizeLimit.height, heightInput));
		height = heightInput;
		tiling.height = height;
		codeInput = code;
	}

	function onclick(r: number, c: number) {
		tiling.toggle(r, c);
		if (reflecting) {
			const { r: refR, c: refC } = tiling.reflected(r, c);
			if (refR !== r || refC !== c) {
				tiling.toggle(refR, refC);
			}
		}
		codeInput = code;
	}
</script>

<div class={{ container: true, scrolling }}>
	<div class={{ left: true, scrolling }}>
		<TilingDisplay {tiling} {onclick} {reflecting} {hideOutlines} {scrolling} />
	</div>
	<div class="right">
		<h2>Tiling Editor</h2>
		<p>
			<label for="widthInput">Width:</label>
			<input
				id="widthInput"
				type="number"
				bind:value={widthInput}
				onchange={onWidthChange}
				min={1}
				max={sizeLimit.width}
				autocomplete="off"
			/>
		</p>
		<p>
			<label for="heightInput">Height:</label>
			<input
				id="heightInput"
				type="number"
				bind:value={heightInput}
				onchange={onHeightChange}
				min={1}
				max={sizeLimit.height}
				autocomplete="off"
			/>
		</p>
		<p>
			<label for="scrollingInput">Enable scrolling:</label>
			<input id="scrollingInput" type="checkbox" bind:checked={scrolling} />
		</p>
		<p>
			<label for="reflectingInput">Keep symmetry:</label>
			<input id="reflectingInput" type="checkbox" bind:checked={reflecting} />
		</p>
		<p>
			<label for="outlineInput">Hide empty outlines:</label>
			<input id="outlineInput" type="checkbox" bind:checked={hideOutlines} />
		</p>
		<p>
			<label for="codeInput">Code:</label>
			<input id="codeInput" type="text" bind:value={codeInput} onchange={onCodeChange} />
		</p>
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
		min-width: 40%;
		max-width: 40%;
		&.scrolling {
			overflow: scroll;
		}
	}

	.right {
		flex-grow: 1;
		padding: 0.7em;
		min-height: 600px;

		display: flex;
		flex-direction: column;
		gap: 0.5em;

		border: 1px solid var(--foreground-color-d);
	}
</style>
