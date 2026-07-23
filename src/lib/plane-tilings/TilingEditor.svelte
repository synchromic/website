<script lang="ts">
	import { onMount } from "svelte";
	import { PlaneTiling } from "./tiling.svelte";
	import TilingDisplay from "./TilingDisplay.svelte";

	let { startCode }: { startCode?: string } = $props();

	const sizeLimit = 100;
	let width = $state(15);
	let height = $state(44);
	let tiling = new PlaneTiling(15, 44);
	let reflecting = $state(true);
	let hideOutlines = $state(false);
	let scrolling = $state(false);
	let code = $derived(tiling.getCode());

	function onclick(r: number, c: number) {
		tiling.toggle(r, c);
		if (reflecting) {
			const { r: refR, c: refC } = tiling.reflected(r, c);
			if (refR !== r || refC !== c) {
				tiling.toggle(refR, refC);
			}
		}
	}

	$effect(() => {
		tiling.width = Math.max(1, Math.min(sizeLimit, width));
		tiling.height = Math.max(1, Math.min(sizeLimit, height));
	});

	onMount(() => {
		if (startCode !== undefined) {
			tiling.setCode(startCode);
		}
	});
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
				bind:value={width}
				min={1}
				max={100}
				autocomplete="off"
			/>
		</p>
		<p>
			<label for="heightInput">Height:</label>
			<input
				id="heightInput"
				type="number"
				bind:value={height}
				min={1}
				max={100}
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
		<p>Code: <code>{code}</code></p>
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
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		padding: 0.7em;

		border: 1px solid var(--foreground-color-d);
	}

	code {
		word-break: break-all;
		overflow-wrap: anywhere;
	}
</style>
