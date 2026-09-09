import { largestEmptyComponent, PlaneTiling } from "./tiling.svelte";

export interface SimulationSettings {
	count: number;
	columns: number;
	rows: number;
	randomizeP: number;
	symmetric: boolean;
}

interface SimulationTracker {
	completed: number;
}

async function runSimulation(settings: SimulationSettings, tracker: SimulationTracker) {
	const tiling = new PlaneTiling(settings.columns, settings.rows);
	const results = new Map<number, number>();
	tracker.completed = 0;
	// in order for the progress bar interval to work, we need to yield to the scheduler sometimes
	// MessageChannel is a better way to do this than setTimeout
	// scheduler.yield looks nice but isn't supported on safari yet
	const channel = new MessageChannel();
	return new Promise((res, _) => {
		const runOnce = () => {
			tiling.randomize(settings.randomizeP, settings.symmetric);
			const size = largestEmptyComponent(tiling);
			results.set(size, (results.get(size) ?? 0) + 1);
			tracker.completed++;
			if (tracker.completed >= settings.count) res(results);
			channel.port2.postMessage("");
		};
		channel.port1.onmessage = runOnce;
		runOnce();
	});
}

interface SimulationMessageProgress {
	kind: "progress";
	completed: number;
	total: number;
}

interface SimulationMessageResult {
	kind: "result";
	result: Map<number, number>;
}

export type SimulationMessage = SimulationMessageProgress | SimulationMessageResult;

onmessage = async (event: MessageEvent<SimulationSettings>) => {
	const tracker = { completed: 0 };
	let progressHandle = setInterval(() => {
		postMessage({
			kind: "progress",
			completed: tracker.completed,
			total: event.data.count,
		});
	}, 20);
	const result = await runSimulation(event.data, tracker);
	clearInterval(progressHandle);
	postMessage({
		kind: "result",
		result,
	});
};
