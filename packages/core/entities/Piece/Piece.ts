import type { UUID } from "crypto";
import { logger } from "../../../tools/index.js";
import type { PieceKind, Side } from "../types/piece.types.js";
import { pieceValidator } from "./validators/pieceValidator.js";
import { NoPromotablePieceSchema } from "./validators/types.js";


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

    const isNonPromotable = NoPromotablePieceSchema.safeParse(this.kind).success;
    if (isNonPromotable) {
      logger.warn(`${this.kind}は成ることが出来ない駒です。`);
      return this;
    }

    return new ShogiPiece(this.side, this.kind, true, this.id);
  }

  public changeSide = (): ShogiPiece => {
    logger.trace(`${this.side}の${this.kind}が対局相手に渡りました。`);

    const nextSide: Side = this.side === "Sente" ? "Gote" : "Sente";

    return new ShogiPiece(nextSide, this.kind, false, this.id);
  }
}
