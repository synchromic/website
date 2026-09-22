import type { FastGrid } from "./calculator.ts";
import { PlaneTiling, Tile, TilingGrid } from "./tiling.svelte.ts";

type Randomizer = (grid: TilingGrid | FastGrid, seed?: [number, number, number, number]) => void;

// config is for tiling options, settings is for randomizer-specific options
export interface RandomizerConfig {
	columns: number;
	rows: number;
	symmetric: boolean;
}

export type RandomizerSettings =
	| {
			kind: "fixed";
			count: number;
	  }
	| {
			kind: "random";
			p: number;
	  };

// from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function sfc32(a: number, b: number, c: number, d: number) {
	return function () {
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		let t = (((a + b) | 0) + d) | 0;
		d = (d + 1) | 0;
		a = b ^ (b >>> 9);
		b = (c + (c << 3)) | 0;
		c = (c << 21) | (c >>> 11);
		c = (c + t) | 0;
		return (t >>> 0) / 4294967296;
	};
}

export function seedgen(): [number, number, number, number] {
	const seedgen = () => (Math.random() * 2 ** 32) >>> 0;
	return [seedgen(), seedgen(), seedgen(), seedgen()];
}

export function makeRandomizer(config: RandomizerConfig, settings: RandomizerSettings): Randomizer {
	let randomizedTiles: Tile[] = [];
	let centerTile: Tile | null = null;
	if (!config.symmetric) {
		for (let r = 0; r < config.rows; r++) {
			for (let c = 0; c < config.columns; c++) {
				const tile = Tile.compute(config.rows, config.columns, r, c, false);
				if (tile !== null) {
					randomizedTiles.push(tile);
				}
			}
		}
	} else {
		// im lazy so stupid solution: check all tiles and see which ones havent been
		// added already
		const seenTiles = new Set<string>();
		for (let r = 0; r < config.rows; r++) {
			for (let c = 0; c < config.columns; c++) {
				// good luck following this
				const tile = Tile.compute(config.rows, config.columns, r, c, false);
				if (tile === null || seenTiles.has(tile.r + "," + tile.c)) continue;
				seenTiles.add(tile.r + "," + tile.c);
				const symmetric = tile.symmetric(config.rows, config.columns);
				// we don't want to randomize this tile if we need to fix it for parity
				if (!(symmetric !== null && settings.kind === "fixed" && tile.equalTo(symmetric))) {
					randomizedTiles.push(tile);
				}
				if (symmetric === null) continue;
				seenTiles.add(symmetric.r + "," + symmetric.c);
				if (tile.equalTo(symmetric)) {
					if (centerTile !== null) throw new Error("multiple center tiles found");
					centerTile = tile;
				}
			}
		}
	}

	if (settings.kind === "random") {
		if (!config.symmetric) {
			return (grid, seed) => {
				let rand = sfc32(...(seed ?? seedgen()));
				for (const tile of randomizedTiles) {
					grid.set(tile, rand() < settings.p);
				}
			};
		} else {
			return (grid, seed) => {
				let rand = sfc32(...(seed ?? seedgen()));
				for (const tile of randomizedTiles) {
					const value = rand() < settings.p;
					grid.set(tile, value);
					const symmetric = tile.symmetric(config.rows, config.columns);
					if (symmetric !== null) grid.set(symmetric, value);
				}
			};
		}
	} else {
		if (config.symmetric && centerTile === null && settings.count % 2 === 1) {
			throw new Error("cannot have odd filled tiles in a symmetric grid without a center tile");
		}
		return (grid, seed) => {
			let rand = sfc32(...(seed ?? seedgen()));
			let leftToPick = config.symmetric ? Math.floor(settings.count / 2) : settings.count;
			if (config.symmetric && centerTile !== null) {
				grid.set(centerTile, settings.count % 2 === 1);
			}
			for (let i = 0; i < randomizedTiles.length; i++) {
				const remaining = randomizedTiles.length - i;
				const picked = rand() < leftToPick / remaining;
				grid.set(randomizedTiles[i], picked);
				if (config.symmetric) {
					const symmetric = randomizedTiles[i].symmetric(config.rows, config.columns);
					if (symmetric !== null) grid.set(symmetric, picked);
				}
				if (picked) leftToPick--;
			}
		};
	}
}
