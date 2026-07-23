<script lang="ts">
	import { onMount } from "svelte";
	import { PlaneTiling } from "./tiling.svelte";
	import TilingDisplay from "./TilingDisplay.svelte";

	let { startCode }: { startCode?: string } = $props();

	let tiling = new PlaneTiling(15, 44);
	let reflecting = $state(true);
	let hideOutlines = $state(false);
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

	onMount(() => {
		if (startCode !== undefined) {
			tiling.setCode(startCode);
		}
	});
</script>

<div class="container">
	<div class="left">
		<TilingDisplay svgClass="portrait" {tiling} {onclick} {reflecting} {hideOutlines} />
	</div>
	<div class="right">
		<h2>Tiling Editor</h2>
		<p>
			<label for="reflectingInput">Keep symmetry:</label>
			<input id="reflectingInput" type="checkbox" bind:checked={reflecting} />
		</p>
		<p>
			<label for="reflectingInput">Hide empty outlines:</label>
			<input id="reflectingInput" type="checkbox" bind:checked={hideOutlines} />
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
	}

	.left {
		min-width: 40%;
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
