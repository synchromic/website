
const S3 = Math.sqrt(3);
const boundingTable = [0, 1.5, 2, 3]

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

  // returns width/height of tiling if each rhombus has side length 1
  boundingBox(): { width: number, height: number } {
    const extraWidth = boundingTable[this.width % 4];
    return {
      width: 3 * Math.floor(this.width / 4) + extraWidth,
      height: S3 / 2 * this.height,
    };
  }

  // code is a base64-encoded binary string, each byte represents 8 tile states
  // ordered top-to-bottom left-to-right, bits are little-endian within bytes
  setCode(code: string) {
    const bytes = Uint8Array.fromBase64(code);
    let r = 0, c = 0;
    // returns false if out of indices
    let nextIndex = () => {
      c++;
      if (c >= this.width) {
        r++;
        c = 0;
      }
      return r < this.height;
    }
    for (const byte of bytes) {
      for (let bit = 0; bit < 8; bit++) {
        // find next non-null cell
        while (this.variantOf(r, c) === null) {
          if (!nextIndex()) return;
        }
        this.grid[r][c] = (byte & (1 << bit)) !== 0;
      }
    }
    // fill in remainder with 0
    while (nextIndex()) this.grid[r][c] = false;
  }

  getCode() {
    let bytes = [];
    let curByte = 0, curBit = 0;
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        if (this.variantOf(r, c) !== null) {
          if (this.grid[r][c]) {
            curByte += 1 << curBit;
          }
          curBit++;
          if (curBit >= 8) {
            bytes.push(curByte);
            curByte = curBit = 0;
          }
        }
      }
    }
    return new Uint8Array(bytes).toBase64();
  }
}

export enum TileVariant {
  Forward, // shaped like //
  Backward, // shaped like \\
  Vertical, // the other one
}

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

const offsetTable = [[0, 1, 1.5, null], [0, null, 1.5, 2.5]];

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
