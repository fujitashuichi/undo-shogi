import type { PieceKind, Side } from "./types.js";


export class ShogiPiece {
  constructor(
    public readonly side: Side,
    public readonly kind: PieceKind,
    public readonly isPromoted: boolean = false
  ) {}
}
