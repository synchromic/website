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

async function runSimulation(
	settings: SimulationSettings,
	tracker: SimulationTracker,
): Promise<Omit<SimulationMessageResult, "kind">> {
	const tiling = new PlaneTiling(settings.columns, settings.rows);
	const results = new Map<number, number>();
	let smallest = settings.rows * settings.columns;
	let smallestCode = "";
	let largest = 0;
	let largestCode = "";
	tracker.completed = 0;
	// in order for the progress bar interval to work, we need to yield to the scheduler sometimes
	// MessageChannel is a better way to do this than setTimeout
	// scheduler.yield looks nice but isn't supported on safari yet
	const channel = new MessageChannel();
	return new Promise((res, _) => {
		let lastUpdate = new Date().getTime();
		const runBatch = () => {
			while (true) {
				tiling.randomize(settings.randomizeP, settings.symmetric);
				const size = largestEmptyComponent(tiling);
				results.set(size, (results.get(size) ?? 0) + 1);
				if (size < smallest) {
					smallest = size;
					smallestCode = tiling.getCode();
				}
				if (size > largest) {
					largest = size;
					largestCode = tiling.getCode();
				}
				tracker.completed++;
				if (tracker.completed >= settings.count) {
					res({
						counts: results,
						smallest,
						smallestCode,
						largest,
						largestCode,
					});
					return;
				} else if (new Date().getTime() - lastUpdate >= 50) {
					lastUpdate = new Date().getTime();
					channel.port2.postMessage("");
					break;
				}
			}
		};
		channel.port1.onmessage = runBatch;
		runBatch();
	});
}

interface SimulationMessageProgress {
	kind: "progress";
	completed: number;
	total: number;
}

export interface SimulationMessageResult {
	kind: "result";
	counts: Map<number, number>;
	smallest: number;
	smallestCode: string;
	largest: number;
	largestCode: string;
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
		...result,
	});
};
