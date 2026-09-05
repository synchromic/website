import { largestEmptyComponent, PlaneTiling } from "./tiling.svelte";

export interface SimulationSettings {
  count: number;
  columns: number;
  rows: number;
  randomizeP: number;
  symmetric: boolean;
}

function runSimulation(settings: SimulationSettings) {
  const tiling = new PlaneTiling(settings.columns, settings.rows);
  const results = new Map<number, number>();
  for (let i = 0; i < settings.count; i++) {
    tiling.randomize(settings.randomizeP, settings.symmetric);
    const size = largestEmptyComponent(tiling);
    results.set(size, (results.get(size) ?? 0) + 1);
  }
  return results;
}

onmessage = (event: MessageEvent<SimulationSettings>) => {
  const result = runSimulation(event.data);
  postMessage(result);
}
