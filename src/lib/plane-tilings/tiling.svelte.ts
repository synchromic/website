
const S3 = Math.sqrt(3);
const boundingTable = [0, 1.5, 2, 3]

export class PlaneTiling {
  width: number;
  height: number;
  grid: boolean[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = $state([]);
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

  // checks if an otherwise invalid tile is the bottom half of a valid tile
  bottomHalf(r: number, c: number): boolean {
    return this.variantOf(r, c) === null && this.variantOf(r - 1, c) === TileVariant.Vertical;
  }

  reflected(r: number, c: number): { r: number, c: number } {
    let refR = this.height - 1 - r;
    let refC = this.width - 1 - c;
    if (this.bottomHalf(refR, refC)) refR--;
    return { r: refR, c: refC };
  }

  // returns width/height of tiling if each rhombus has side length 1
  boundingBox(): { width: number, height: number } {
    const extraWidth = boundingTable[this.width % 4];
    return {
      width: 3 * Math.floor(this.width / 4) + extraWidth,
      height: S3 / 2 * this.height,
    };
  }

  // assumes rhombi have side length 1
  rhombusCenter(r: number, c: number): { x: number, y: number } | null {
    const variant = this.variantOf(r, c);
    if (variant === null) return null;
    return {
      x: 3 / 4 * (c + 1),
      y: S3 / 2 * r + (variant === TileVariant.Vertical ? S3 / 2 : S3 / 4),
    };
  }

  toggle(r: number, c: number) {
    if (this.variantOf(r, c) === null) {
      return;
    }
    this.grid[r][c] = !this.grid[r][c];
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
        if (!nextIndex()) return;
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
    if (curBit > 0) bytes.push(curByte);
    return new Uint8Array(bytes).toBase64();
  }
}

export enum TileVariant {
  Forward, // shaped like //
  Backward, // shaped like \\
  Vertical, // the other one
}

function offsetsFromCenter(variant: TileVariant): { x: number, y: number }[] {
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

export function vertexOffsets(variant: TileVariant, size: number = 1): { x: number, y: number }[] {
  return offsetsFromCenter(variant).map(({ x, y }) => {
    return {
      x: x * size,
      y: y * size,
    };
  });
}
