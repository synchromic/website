<script lang="ts">
	import { PlaneTiling } from "./tiling.svelte";
	import { makeRandomizer, type RandomizerSettings } from "./randomizer";

	let {
		symmetric,
		tiling,
		tileCounts,
	}: {
		symmetric: boolean;
		tiling: PlaneTiling;
		tileCounts: { filled: number; empty: number; total: number };
	} = $props();

	let kind: "fixed" | "random" = $state("fixed");
	let filledCount = $state(312);
	let probability = $state(0.62);
	let error = $state("");

	$effect(() => {
		if (filledCount > tileCounts.total) {
			filledCount = tileCounts.total;
		}
	});

	export function getSettings(): RandomizerSettings {
		if (kind === "fixed") return { kind, count: filledCount };
		else return { kind, p: probability };
	}

	function randomize() {
		try {
			let randomize = makeRandomizer(
				{ columns: tiling.columns, rows: tiling.rows, symmetric },
				getSettings(),
			);
			randomize(tiling);
			error = "";
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			}
		}
	}

	function loadSettings() {
		filledCount = tileCounts.filled;
		probability = Math.round((tileCounts.filled / tileCounts.total) * 100) / 100;
	}
</script>

<h3>Randomizer</h3>

<p>
	<label for="randomizerKindSelect">Mode:</label>
	<select id="randomizerKindSelect" bind:value={kind}>
		<option value="fixed">Keep filled count constant</option>
		<option value="random">Totally randomize</option>
	</select>
</p>

{#if kind === "fixed"}
	<p>
		<label for="filledCountInput">Count:</label>
		<input
			id="filledCountInput"
			type="range"
			min={0}
			max={tileCounts.total}
			step={symmetric && !tiling.hasCenterTile() ? 2 : 1}
			bind:value={filledCount}
		/>
		{filledCount}
	</p>
{:else}
	<p>
		<label for="probabilityInput">Fill probability:</label>
		<input
			id="probabilityInput"
			type="range"
			min={0}
			max={1}
			step={0.01}
			bind:value={probability}
		/>
		{Math.floor(probability * 100)}%
	</p>
{/if}

<p>
	<button onclick={randomize}>Randomize</button>
	<button onclick={loadSettings}>Load values from grid</button>
</p>

{#if error}
	<p style="color: red">Error: {error}</p>
{/if}
