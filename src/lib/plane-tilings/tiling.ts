export class PlaneTiling {
  width: number;
  height: number;
  grid: boolean[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = [];
    for (let r = 0; r < height; r++) {
      this.grid.push([]);
      for (let c = 0; c < width; c++) {
        this.grid[r].push(false);
      }
    }
  }

  // returns null if not a valid tile
  variantOf(r: number, c: number): TileVariant | null {
    const offset = (2 * r + c) % 4;
    // special case: bottom of grid
    if (offset == 1 && r == this.height - 1) return null;
    return [TileVariant.Forward, TileVariant.Vertical, TileVariant.Backward, null][offset];
  }
}

export enum TileVariant {
  Forward, // shaped like //
  Backward, // shaped like \\
  Vertical, // the other one
}

const S3 = Math.sqrt(3);
const offsetTable = [[0, 1, 1.5, null], [0, null, 1.5, 2.5]];

// assumes rhombi have side length 1
export function vertexOffsets(variant: TileVariant): { x: number, y: number }[] {
  switch (variant) {
    case TileVariant.Forward:
      return [
        { x: 0.5, y: 0 },
        { x: 1.5, y: 0 },
        { x: 1, y: S3 / 2 },
        { x: 0, y: S3 / 2 },
      ];
    case TileVariant.Backward:
      return [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1.5, y: S3 / 2 },
        { x: 0.5, y: S3 / 2 },
      ];
    case TileVariant.Vertical:
      return [
        { x: 0.5, y: 0 },
        { x: 1, y: S3 / 2 },
        { x: 0.5, y: S3 },
        { x: 0, y: S3 / 2 },
      ];
  }
}

// assumes rhombi have side length 1
export function topLeft(r: number, c: number): { x: number, y: number } | null {
  const offsetX = offsetTable[r % 2][c % 4];
  if (offsetX === null) return null; // corresponds to invalid tile position
  // left side of shape bounding box
  return {
    x: 3 * Math.floor(c / 4) + offsetX,
    y: S3 / 2 * r,
  };
}
