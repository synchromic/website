import { PlaneTiling, Tile } from "./tiling.svelte.ts";

type Randomizer = (tiling: PlaneTiling) => void;

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
			return (tiling) => {
				for (const tile of randomizedTiles) {
					tiling.grid.set(tile, Math.random() < settings.p);
				}
			};
		} else {
			return (tiling) => {
				for (const tile of randomizedTiles) {
					const value = Math.random() < settings.p;
					tiling.grid.set(tile, value);
					const symmetric = tile.symmetric(config.rows, config.columns);
					if (symmetric !== null) tiling.grid.set(symmetric, value);
				}
			};
		}
	} else {
		if (config.symmetric && centerTile === null && settings.count % 2 === 1) {
			throw new Error("cannot have odd filled tiles in a symmetric grid without a center tile");
		}
		return (tiling) => {
			let leftToPick = config.symmetric ? Math.floor(settings.count / 2) : settings.count;
			if (config.symmetric && centerTile !== null) {
				tiling.grid.set(centerTile, settings.count % 2 === 1);
			}
			for (let i = 0; i < randomizedTiles.length; i++) {
				const remaining = randomizedTiles.length - i;
				const picked = Math.random() < leftToPick / remaining;
				tiling.grid.set(randomizedTiles[i], picked);
				if (config.symmetric) {
					const symmetric = randomizedTiles[i].symmetric(config.rows, config.columns);
					if (symmetric !== null) tiling.grid.set(symmetric, picked);
				}
				if (picked) leftToPick--;
			}
		};
	}
}
