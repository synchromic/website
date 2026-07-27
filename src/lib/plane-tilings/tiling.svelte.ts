const S3 = Math.sqrt(3);
const boundingTable = [0.5, 1.5, 2, 3];

// always represents a VALID tile
// tiles for one PlaneTiling may be invalid for another! idk how to make that typesafe tho
// TODO: figure that out lol
export class Tile {
	r: number;
	c: number;

	constructor(r: number, c: number) {
		this.r = r;
		this.c = c;
	}

	equalTo(other: any) {
		return other instanceof Tile && this.r === other.r && this.c === other.c;
	}

	variant(): TileVariant {
		const offset = (2 * this.r + this.c) % 4;
		const variant = [TileVariant.Forward, TileVariant.Vertical, TileVariant.Backward, null][offset];
		if (variant === null) throw new Error(`Invalid tile: ${this.r}, ${this.c}`);
		return variant;
	}

	centerPos(scale: number = 1): { x: number; y: number } {
		const variant = this.variant();
		const verticalOffset = variant === TileVariant.Vertical ? S3 / 2 : S3 / 4;
		return {
			x: (3 / 4) * (this.c + 1) * scale,
			y: ((S3 / 2) * this.r + verticalOffset) * scale,
		};
	}
}

class TilingGrid {
	// if the user resizes, don't delete extra cells instantly
	// wait until grid cell gets toggled first
	shrinkRows: number | null = null;
	shrinkColumns: number | null = null;
	private grid: boolean[][];

	constructor(columns: number, rows: number) {
		this.grid = $state([]);
		for (let r = 0; r < rows; r++) {
			this.grid.push([]);
			for (let c = 0; c < columns; c++) {
				this.grid[r].push(false);
			}
		}
	}

	setColumns(columns: number) {
		if (this.grid[0].length > columns) {
			this.shrinkColumns = columns;
		} else if (this.grid[0].length < columns) {
			this.shrinkColumns = null;
			for (let r = 0; r < this.grid.length; r++) {
				while (this.grid[r].length < columns) {
					this.grid[r].push(false);
				}
			}
		}
	}

	setRows(rows: number) {
		if (this.grid.length > rows) {
			this.shrinkRows = rows;
		} else if (this.grid.length < rows) {
			this.shrinkRows = null;
			const trueColumns = this.grid[0].length;
			for (let r = this.grid.length; r < rows; r++) {
				this.grid.push([]);
				for (let c = 0; c < trueColumns; c++) {
					this.grid[r].push(false);
				}
			}
		}
	}

	private shrink() {
		if (this.shrinkRows !== null) {
			this.grid = this.grid.slice(0, this.shrinkRows);
			this.shrinkRows = null;
		}
		if (this.shrinkColumns !== null) {
			const cols = this.shrinkColumns; // typescript won't let me use shrinkColumns directly?
			this.grid = this.grid.map((row) => row.slice(0, cols));
			this.shrinkColumns = null;
		}
	}

	get(tile: Tile): boolean {
		return this.grid[tile.r][tile.c];
	}

	set(tile: Tile, filled: boolean) {
		this.shrink();
		this.grid[tile.r][tile.c] = filled;
	}

	copy(): TilingGrid {
		let copy = new TilingGrid(this.grid[0]?.length ?? 0, this.grid.length);
		copy.grid = structuredClone($state.snapshot(this.grid));
		copy.shrinkColumns = this.shrinkColumns;
		copy.shrinkRows = this.shrinkRows;
		return copy;
	}
}

export class PlaneTiling {
	private _columns: number;
	private _rows: number;
	grid: TilingGrid;

	constructor(columns: number, rows: number, startCode?: string) {
		this._columns = $state(columns);
		this._rows = $state(rows);
		this.grid = new TilingGrid(columns, rows);
		if (startCode !== undefined) {
			this.setCode(startCode);
		}
	}

	get columns(): number {
		return this._columns;
	}

	get rows(): number {
		return this._rows;
	}

	set columns(columns: number) {
		this.grid.setColumns(columns);
		this._columns = columns;
	}

	set rows(rows: number) {
		this.grid.setRows(rows);
		this._rows = rows;
	}

	// if fix is true, returns the top half if (r, c) is a bottom half of vertical rhombus
	tile(r: number, c: number, fix: boolean): Tile | null {
		if (r < 0 || r >= this.rows || c < 0 || c >= this.columns) return null;
		const offset = (2 * r + c) % 4;
		// special cases: bottom/top of grid
		if (r === 0 && offset === 3) return null;
		if (r === this.rows - 1 && offset === 1) return null;
		if (offset === 3) return fix ? new Tile(r - 1, c) : null;
		return new Tile(r, c);
	}

	// checks if a tile is the bottom half of a valid tile
	bottomHalf(r: number, c: number): boolean {
		if (r <= 0 || r >= this.rows || c < 0 || c >= this.columns) return false;
		return (2 * r + c) % 4 === 3;
	}

	// TODO: figure out wtf to do if grid isn't symmetric :p
	symmetricTile(tile: Tile): Tile | null {
		const newR = this.rows - 1 - tile.r;
		const newC = this.columns - 1 - tile.c;
		return this.tile(newR, newC, true);
	}

	// returns width/height of tiling if each rhombus has side length 1
	boundingBox(scale: number = 1): { width: number; height: number } {
		const extraWidth = boundingTable[this.columns % 4];
		return {
			width: (3 * Math.floor(this.columns / 4) + extraWidth) * scale,
			height: (S3 / 2) * this.rows * scale,
		};
	}

	toggle(tile: Tile) {
		this.grid.set(tile, !this.grid.get(tile));
	}

	// code is a base64-encoded binary string, each byte represents 8 tile states
	// ordered top-to-bottom left-to-right, bits are little-endian within bytes
	setCode(code: string) {
		const bytes = Uint8Array.fromBase64(code);
		let curByte = 0,
			curBit = 0;
		this.setAll(false);
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.columns; c++) {
				const tile = this.tile(r, c, false);
				if (tile === null) continue;
				if (curBit >= 8) {
					curBit = 0;
					curByte++;
				}
				if (curByte >= bytes.length) return;
				this.grid.set(tile, (bytes[curByte] & (1 << curBit)) !== 0);
				curBit++;
			}
		}
	}

	getCode() {
		let bytes = [];
		let curByte = 0,
			curBit = 0;
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.columns; c++) {
				const tile = this.tile(r, c, false);
				if (tile === null) continue;
				if (this.grid.get(tile)) {
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

	setAll(value: boolean) {
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.columns; c++) {
				const tile = this.tile(r, c, false);
				if (tile !== null) this.grid.set(tile, value);
			}
		}
	}

	randomize(p: number, symmetric: boolean = false) {
		const rowLimit = symmetric ? Math.ceil((this.rows + 1) / 2) : this.rows;
		for (let r = 0; r < rowLimit; r++) {
			for (let c = 0; c < this.columns; c++) {
				const tile = this.tile(r, c, false);
				if (tile === null) continue;
				this.grid.set(tile, Math.random() < p);
				if (symmetric) {
					const otherTile = this.symmetricTile(tile);
					if (otherTile !== null) {
						this.grid.set(otherTile, this.grid.get(tile));
					}
				}
			}
		}
	}

	countTiles() {
		let count = 0;
		let total = 0;
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.columns; c++) {
				const tile = this.tile(r, c, false);
				if (tile === null) continue;
				total++;
				if (this.grid.get(tile)) count++;
			}
		}
		return {
			filled: count,
			empty: total - count,
			total,
		};
	}

	adjacentTiles(tile: Tile) {
		let drs, dcs;
		if (tile.variant() === TileVariant.Vertical) {
			drs = [0, 0, 1, 1];
			dcs = [-1, 1, -1, 1];
		} else {
			drs = [0, 1, 0, -1];
			dcs = [1, 0, -1, 0];
		}
		return drs
			.map((_, i) => this.tile(tile.r + drs[i], tile.c + dcs[i], true))
			.filter((t) => t !== null);
	}
}

export enum TileVariant {
	Forward, // shaped like //
	Backward, // shaped like \\
	Vertical, // the other one
}

function offsetsFromCenter(variant: TileVariant): { x: number; y: number }[] {
	switch (variant) {
		case TileVariant.Forward:
			return [
				{ x: -1 / 4, y: -S3 / 4 },
				{ x: 3 / 4, y: -S3 / 4 },
				{ x: 1 / 4, y: S3 / 4 },
				{ x: -3 / 4, y: S3 / 4 },
			];
		case TileVariant.Backward:
			return [
				{ x: -3 / 4, y: -S3 / 4 },
				{ x: 1 / 4, y: -S3 / 4 },
				{ x: 3 / 4, y: S3 / 4 },
				{ x: -1 / 4, y: S3 / 4 },
			];
		case TileVariant.Vertical:
			return [
				{ x: 0, y: -S3 / 2 },
				{ x: 1 / 2, y: 0 },
				{ x: 0, y: S3 / 2 },
				{ x: -1 / 2, y: 0 },
			];
	}
}

export function vertexOffsets(variant: TileVariant, size: number = 1): { x: number; y: number }[] {
	return offsetsFromCenter(variant).map(({ x, y }) => {
		return {
			x: x * size,
			y: y * size,
		};
	});
}

export function largestEmptyComponent(tiling: PlaneTiling): number {
	let grid = tiling.grid.copy();
	let size = 0,
		maxSize = 0;
	function dfs(tile: Tile) {
		if (grid.get(tile)) return;
		grid.set(tile, true);
		size++;
		for (const adjTile of tiling.adjacentTiles(tile)) {
			dfs(adjTile);
		}
	}
	for (let r = 0; r < tiling.rows; r++) {
		for (let c = 0; c < tiling.columns; c++) {
			let tile = tiling.tile(r, c, false);
			if (tile === null) continue;
			size = 0;
			dfs(tile);
			if (size > maxSize) maxSize = size;
		}
	}
	return maxSize;
}
