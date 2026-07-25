<script lang="ts">
	import { PlaneTiling } from "./tiling.svelte";
	import TilingDisplay from "./TilingDisplay.svelte";

	const defaultCode =
		"Xa2cN0T1219L6v9afirsmy8vVftoenV9fH31UfGuO0f3xllx3nnXejtu21was+Wr74nx+/hvxM333VDVVp12";
	const sizeLimit = { width: 40, height: 80 };
	let tiling = new PlaneTiling(15, 44, defaultCode);
	let reflecting = $state(false);
	let hideOutlines = $state(false);
	let scrolling = $state(false);

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

	let widthInput = $state(15);
	let heightInput = $state(44);

	function onWidthChange() {
		widthInput = Math.max(1, Math.min(sizeLimit.width, widthInput));
		tiling.width = widthInput;
	}

	function onHeightChange() {
		heightInput = Math.max(1, Math.min(sizeLimit.height, heightInput));
		tiling.height = heightInput;
	}

	function onclick(r: number, c: number) {
		tiling.toggle(r, c);
		if (reflecting) {
			const { r: refR, c: refC } = tiling.reflected(r, c);
			if (refR !== r || refC !== c) {
				tiling.toggle(refR, refC);
			}
		}
	}
</script>

<div class={{ container: true, scrolling }}>
	<div class={{ left: true, scrolling }}>
		<TilingDisplay {tiling} {onclick} {reflecting} {hideOutlines} {scrolling} />
	</div>
	<div class="right">
		<h2>Tiling Editor</h2>
		<p>
			<button onclick={() => tiling.setAll(false)}>Clear</button>
			<button onclick={() => tiling.setAll(true)}>Fill</button>
			<button
				onclick={() => {
					tiling.width = widthInput = 15;
					tiling.height = heightInput = 44;
					tiling.setCode(defaultCode);
				}}>Default</button
			>
		</p>
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
		<noscript>
			<p style="color: red">
				Javascript is disabled, so the editor won't work, but you can still look at it!
			</p>
		</noscript>
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
		border: 1px solid red;
	}
</style>
