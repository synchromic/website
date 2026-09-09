<script lang="ts">
	import type { SimulationMessage, SimulationSettings } from "./worker";

	let { settings }: { settings: Omit<SimulationSettings, "count"> } = $props();

	let message: SimulationMessage | null = $state(null);
	let sortedResults: [number, number][] | null = $derived.by(() => {
		if (message?.kind !== "result") return null;
		return [...message.result.entries()].sort(([a, _a], [b, _b]) => a - b);
	});
	let countInput: number = $state(100);

	const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
	worker.addEventListener("message", (event) => {
		message = event.data;
	});

	function runSimulation(count: number) {
		message = null;
		worker.postMessage({
			...settings,
			count,
		});
	}
</script>

<h3>Simulator</h3>

<p>
	<label for="simulationCountInput">Simulation count:</label>
	<input id="simulationCountInput" type="number" bind:value={countInput} />
</p>

<p><button onclick={() => runSimulation(countInput)}>Run simulation</button></p>

{#if message?.kind === "progress"}
	<p>Progress: {message.completed}/{message.total}</p>
{:else if message?.kind === "result"}
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
