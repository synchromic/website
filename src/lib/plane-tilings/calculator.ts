import { PlaneTiling, type Tile } from "./tiling.svelte";

export function largestEmptyComponent(tiling: PlaneTiling, canMangle: boolean): number {
	let grid = canMangle ? tiling.grid : tiling.grid.copy();
	let size = 0,
		maxSize = 0;
	let dfsQueue: Tile[] = [];
	for (let r = 0; r < tiling.rows; r++) {
		for (let c = 0; c < tiling.columns; c++) {
			let start = tiling.tile(r, c, false);
			if (start === null || grid.get(start)) continue;
			size = 0;
			dfsQueue.push(start);
			while (dfsQueue.length > 0) {
				let tile = dfsQueue.pop()!;
				if (grid.get(tile)) continue;
				grid.set(tile, true);
				size++;
				for (const adj of tiling.adjacentTiles(tile)) {
					if (grid.get(adj)) continue;
					dfsQueue.push(adj);
				}
			}
			if (size > maxSize) maxSize = size;
		}
	}
	return maxSize;
}

// assumes can mangle
export function makeLECCalculator(rows: number, columns: number): (tiling: PlaneTiling) => number {
	const tempTiling = new PlaneTiling(columns, rows);
	// precompute adjacent tiles
	if (rows >= 256) throw new Error("Precomputer requires small row count");
	const allTiles: Tile[] = [];
	const adjTileMap = new Map<number, Tile[]>();
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			let tile = tempTiling.tile(r, c, false);
			if (tile === null) continue;
			allTiles.push(tile);
			const tileId = (tile.r << 8) + tile.c;
			adjTileMap.set(tileId, tempTiling.adjacentTiles(tile));
		}
	}

	return (tiling) => {
		let grid = tiling.grid;
		let size = 0,
			maxSize = 0;
		let dfsQueue: Tile[] = [];
		for (const start of allTiles) {
			if (grid.get(start)) continue;
			size = 0;
			dfsQueue.push(start);
			while (dfsQueue.length > 0) {
				let tile = dfsQueue.pop()!;
				if (grid.get(tile)) continue;
				grid.set(tile, true);
				size++;
				const tileId = (tile.r << 8) + tile.c;
				for (const adj of adjTileMap.get(tileId)!) {
					if (grid.get(adj)) continue;
					dfsQueue.push(adj);
				}
			}
			if (size > maxSize) maxSize = size;
		}
		return maxSize;
	};
}
