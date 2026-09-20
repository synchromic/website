import { makeRandomizer } from "./randomizer";
import { largestEmptyComponent, PlaneTiling, Tile } from "./tiling.svelte";

interface SimulationTracker {
	completed: number;
	cancelled: false | "reset" | "cancelled";
	// typescript doesn't like just using number here
	progressHandle?: ReturnType<typeof setInterval>;
	startTime: number | null;
}

async function runSimulation(
	settings: SimulationMessageSettings,
	tracker: SimulationTracker,
): Promise<Omit<SimulationMessageResult, "kind">> {
	const tiling = new PlaneTiling(settings.columns, settings.rows);
	const randomizer = makeRandomizer({
		columns: settings.columns,
		rows: settings.rows,
		symmetric: settings.symmetric,
		...(settings.useFilled
			? { kind: "fixed", count: settings.tileCounts.filled }
			: { kind: "random", p: settings.randomizeP }),
	});
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
	return new Promise((res, rej) => {
		let lastUpdate = new Date().getTime();
		const runBatch = () => {
			while (true) {
				randomizer(tiling);
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
				if (tracker.cancelled || tracker.completed >= settings.count) {
					res({
						total: tracker.completed,
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
		tracker.startTime = new Date().getTime();
		runBatch();
	});
}

export interface SimulationMessageSettings {
	kind: "settings";
	count: number;
	columns: number;
	rows: number;
	randomizeP: number;
	symmetric: boolean;
	useFilled: boolean;
	tileCounts: { filled: number; empty: number; total: number };
}

export interface SimulationMessageCancel {
	kind: "cancel";
}

interface SimulationMessageProgress {
	kind: "progress";
	completed: number;
	total: number;
	speed?: number;
}

export interface SimulationMessageResult {
	kind: "result";
	total: number;
	counts: Map<number, number>;
	smallest: number;
	smallestCode: string;
	largest: number;
	largestCode: string;
}

export type SimulationMessage =
	| SimulationMessageSettings
	| SimulationMessageCancel
	| SimulationMessageProgress
	| SimulationMessageResult;

let currentSimulation: SimulationTracker | null = null;

function cancelSimulation(reset: boolean) {
	if (currentSimulation !== null) {
		currentSimulation.cancelled = reset ? "reset" : "cancelled";
		clearInterval(currentSimulation.progressHandle);
	}
}

onmessage = async (event: MessageEvent<SimulationMessage>) => {
	if (event.data.kind === "cancel") {
		cancelSimulation(false);
	} else if (event.data.kind === "settings") {
		cancelSimulation(true);
		const tracker: SimulationTracker = { completed: 0, cancelled: false, startTime: null };
		tracker.progressHandle = setInterval(() => {
			let speed;
			if (tracker.startTime !== null) {
				const curTime = new Date().getTime();
				speed = (tracker.completed / (curTime - tracker.startTime)) * 1000;
			}
			postMessage({
				kind: "progress",
				completed: tracker.completed,
				total: (event.data as SimulationMessageSettings).count,
				speed,
			});
		}, 20);
		currentSimulation = tracker;
		let result = await runSimulation(event.data, tracker);
		if (!tracker.cancelled || tracker.cancelled === "cancelled") {
			if (!tracker.cancelled) {
				clearInterval(tracker.progressHandle);
				currentSimulation = null;
			}
			postMessage({
				kind: "result",
				...result,
			});
		}
	}
};
