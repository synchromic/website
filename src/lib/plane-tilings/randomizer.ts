import { PlaneTiling, Tile } from "./tiling.svelte.ts";

type Randomizer = (tiling: PlaneTiling) => void;

type RandomizerSettings = {
	columns: number;
	rows: number;
	symmetric: boolean;
} & (
	| {
			kind: "fixed";
			count: number;
	  }
	| {
			kind: "random";
			p: number;
	  }
);

export function makeRandomizer(settings: RandomizerSettings): Randomizer {
	let randomizedTiles: Tile[] = [];
	let centerTile: Tile | null = null;
	if (!settings.symmetric) {
		for (let r = 0; r < settings.rows; r++) {
			for (let c = 0; c < settings.columns; c++) {
				const tile = Tile.compute(settings.rows, settings.columns, r, c, false);
				if (tile !== null) {
					randomizedTiles.push(tile);
				}
			}
		}
	} else {
		// im lazy so stupid solution: check all tiles and see which ones havent been
		// added already

		// FIXME: this assumes symmetry works both ways, which yknow it *should*, but currently
		// my buggy ass implementation means that we can ask for symmetry in a not symmetric grid
		// which breaks things and is annoying. ill fix it later
		const seenTiles = new Set<string>();
		for (let r = 0; r < settings.rows; r++) {
			for (let c = 0; c < settings.columns; c++) {
				// good luck following this
				const tile = Tile.compute(settings.rows, settings.columns, r, c, false);
				if (tile === null || seenTiles.has(tile.r + "," + tile.c)) continue;
				seenTiles.add(tile.r + "," + tile.c);
				const symmetric = tile.symmetric(settings.rows, settings.columns);
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
		if (!settings.symmetric) {
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
					const symmetric = tile.symmetric(settings.rows, settings.columns);
					if (symmetric !== null) tiling.grid.set(symmetric, value);
				}
			};
		}
	} else {
		if (settings.symmetric && centerTile === null && settings.count % 2 === 1) {
			throw new Error("cannot get odd parity in a symmetric grid without a center tile");
		}
		return (tiling) => {
			let leftToPick = settings.symmetric ? Math.floor(settings.count / 2) : settings.count;
			if (settings.symmetric && centerTile !== null) {
				tiling.grid.set(centerTile, settings.count % 2 === 1);
			}
			for (let i = 0; i < randomizedTiles.length; i++) {
				const remaining = randomizedTiles.length - i;
				const picked = Math.random() < leftToPick / remaining;
				tiling.grid.set(randomizedTiles[i], picked);
				if (settings.symmetric) {
					const symmetric = randomizedTiles[i].symmetric(settings.rows, settings.columns);
					if (symmetric !== null) tiling.grid.set(symmetric, picked);
				}
				if (picked) leftToPick--;
			}
		};
	}
}
