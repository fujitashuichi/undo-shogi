import type { PieceKind, Side } from "./types.js";
import { pieceValidator } from "./validators/PieceValidator.js";


export class ShogiPiece {
  constructor(
    public readonly side: Side,
    public readonly kind: PieceKind,
    public readonly isPromoted: boolean = false
  ) {
    pieceValidator(isPromoted, kind);
  }
}
