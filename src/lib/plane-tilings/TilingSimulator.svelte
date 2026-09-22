<script lang="ts">
	import type { RandomizerSettings } from "./randomizer";
	import type { PlaneTiling } from "./tiling.svelte";
	import type { SimulationMessage, SimulationMessageResult } from "./worker";

	interface SimulatorProps {
		tiling: PlaneTiling;
		getRandomizerSettings: () => RandomizerSettings;
		symmetric: boolean;
	}

	let props: SimulatorProps = $props();

	let message: SimulationMessage | null = $state(null);
	let sortedResults: [number, number][] | null = $derived.by(() => {
		if (message?.kind !== "result") return null;
		return [...message.counts.entries()].sort(([a, _a], [b, _b]) => a - b);
	});
	let countInput: number = $state(1000);

	const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
	worker.addEventListener("message", (event) => {
		message = event.data;
	});

	// for type safety, do not use worker.postMessage itself
	function workerPostMessage(message: SimulationMessage) {
		worker.postMessage(message);
	}

	function runSimulation(count: number) {
		message = null;
		workerPostMessage({
			kind: "settings",
			count,
			columns: props.tiling.columns,
			rows: props.tiling.rows,
			symmetric: props.symmetric,
			randomizer: props.getRandomizerSettings(),
			tileCounts: props.tiling.countTiles(),
		});
	}

	function cancelSimulation() {
		workerPostMessage({
			kind: "cancel",
		});
	}
</script>

<h3>Simulator</h3>

<i>Simulation copies settings from above</i>

<p>
	<label for="simulationCountInput">Simulation count:</label>
	<input id="simulationCountInput" type="number" bind:value={countInput} />
</p>

<p>
	<button onclick={() => runSimulation(countInput)}>Run simulation</button>
	<button onclick={() => cancelSimulation()}>Cancel simulation</button>
</p>

{#if message?.kind === "progress"}
	<p>
		Progress: {message.completed}/{message.total}
		{#if message.speed !== undefined}
			({message.speed.toFixed(2)}/s)
		{/if}
	</p>
{:else if message?.kind === "result"}
	<p>Total: {message.total}</p>
	<p>
		<label for="smallestComponentInput">Smallest: {message.smallest}</label>
		<input id="smallestComponentInput" type="text" bind:value={message.smallestCode} />
		<button onclick={() => props.tiling.setCode((message as SimulationMessageResult).smallestCode)}
			>Load</button
		>
	</p>
	<p>
		<label for="largestComponentInput">Largest: {message.largest}</label>
		<input id="largestComponentInput" type="text" bind:value={message.largestCode} />
		<button onclick={() => props.tiling.setCode((message as SimulationMessageResult).largestCode)}
			>Load</button
		>
	</p>
	<div class="fixed-table">
		<table>
			<thead>
				<tr>
					<th>Component size</th>
					<th>Count</th>
				</tr>
			</thead>
			<tbody>
				{#each sortedResults as [size, count]}
					<tr>
						<td>{size}</td>
						<td>{count}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	.fixed-table {
		max-height: 300px;
		overflow-y: auto;
	}

	table {
		table-layout: fixed;
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border: 1px solid var(--foreground-color-d);
		padding: 0.3em;
	}
</style>
