import { logger } from "../../tools/index.js";
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


  public promote = (): ShogiPiece => {
    if (this.isPromoted) {
      logger.warn(`${this.kind}は既に成っています。`);
      return this;
    }

    return new ShogiPiece(this.side, this.kind, true);
  }
}
