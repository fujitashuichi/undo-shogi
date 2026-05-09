import type { UUID } from "crypto";
import { logger } from "../../tools/index.js";
import type { PieceKind, Side } from "./types.js";
import { pieceValidator } from "./validators/PieceValidator.js";


export class ShogiPiece {
  constructor(
    public readonly side: Side,
    public readonly kind: PieceKind,
    public readonly isPromoted: boolean = false,
    public readonly id: UUID = crypto.randomUUID()
  ) {
    pieceValidator(isPromoted, kind);
  }


  public promote = (): ShogiPiece => {
    if (this.isPromoted) {
      logger.warn(`${this.kind}は既に成っています。`);
      return this;
    }

    return new ShogiPiece(this.side, this.kind, true, this.id);
  }

  public changeSide = (): ShogiPiece => {
    logger.trace(`${this.side}の${this.kind}が対局相手に渡しました。`);

    const nextSide: Side = this.side === "Sente" ? "Gote" : "Sente";

    return new ShogiPiece(nextSide, this.kind, false, this.id);
  }
}
