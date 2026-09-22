import { PlaneTiling, Tile } from "./tiling.svelte";

export class FastGrid {
	grid: boolean[][];

	// i give up following columns,rows convention its a stupid mistake
	constructor(rows: number, columns: number) {
		this.grid = [];
		for (let r = 0; r < rows; r++) {
			this.grid.push([]);
			for (let c = 0; c < columns; c++) {
				this.grid[r].push(false);
			}
		}
	}

	get(tile: Tile) {
		return this.grid[tile.r][tile.c];
	}

	set(tile: Tile, value: boolean) {
		this.grid[tile.r][tile.c] = value;
	}

	// screw DRY
	getCode() {
		let bytes = [];
		let curByte = 0,
			curBit = 0;
		let rows = this.grid.length,
			columns = this.grid[0].length;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < columns; c++) {
				const tile = Tile.compute(rows, columns, r, c, false);
				if (tile === null) continue;
				if (this.get(tile)) {
					curByte += 1 << curBit;
				}
				curBit++;
				if (curBit >= 8) {
					bytes.push(curByte);
					curByte = curBit = 0;
				}
			}
		}
		if (curBit > 0) bytes.push(curByte);
		// strip trailing zeros
		const lastNonzero = bytes.findLastIndex((b) => b > 0);
		bytes = bytes.slice(0, lastNonzero + 1);
		return new Uint8Array(bytes).toBase64();
	}
}

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
export function makeLECCalculator(
	rows: number,
	columns: number,
	symmetric: boolean,
): (grid: FastGrid) => number {
	const tempTiling = new PlaneTiling(columns, rows);
	// precompute adjacent tiles
	if (rows >= 256) throw new Error("Precomputer requires small row count");
	const searchedTiles: Tile[] = [];
	const adjTileMap = new Map<number, Tile[]>();
	const rowLimit = symmetric ? rows / 2 : rows;
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			let tile = tempTiling.tile(r, c, false);
			if (tile === null) continue;
			if (r < rowLimit) searchedTiles.push(tile);
			const tileId = (tile.r << 8) + tile.c;
			adjTileMap.set(tileId, tempTiling.adjacentTiles(tile));
		}
	}

	return (grid) => {
		let size = 0,
			maxSize = 0;
		let dfsQueue: Tile[] = [];
		for (const start of searchedTiles) {
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
