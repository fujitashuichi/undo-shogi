import type { UUID } from "crypto";
import { logger } from "../../../tools/index.js";
import { PromotablePieceKindSchema, PromotedPieceKindSchema, type PieceKind, type Side } from "../types/piece.types.js";
import { pieceValidator } from "./validators/pieceValidator.js";
import type { PieceMotion } from "../types/algebraic.types.js";
import { motionMap } from "./motions/motionMap.js";
import { normalKindToPromoted } from "./normalToPromoted.js";


export class ShogiPiece {
  public readonly motion: PieceMotion;
  public isPromoted: boolean;

  constructor(
    public readonly side: Side,
    public readonly kind: PieceKind,
    public readonly id: UUID = crypto.randomUUID()
  ) {
    this.isPromoted = PromotedPieceKindSchema.safeParse(kind).success;
    pieceValidator(this.isPromoted, kind);
    this.motion = motionMap[kind];
  }


  public promote = (): ShogiPiece => {
    if (this.isPromoted) {
      logger.warn(`${this.kind}は既に成っています。`);
      return this;
    }

    const parsed = PromotablePieceKindSchema.safeParse(this.kind)
    if (!parsed.success) {
      logger.warn(`${this.kind} は成ることが出来ない駒です。`);
      return this;
    }
    const nextKind = normalKindToPromoted(parsed.data);

    return new ShogiPiece(this.side, nextKind, this.id);
  }

  public changeSide = (): ShogiPiece => {
    logger.trace(`${this.side}の${this.kind}が対局相手に渡りました。`);

    const nextSide: Side = this.side === "Sente" ? "Gote" : "Sente";

    return new ShogiPiece(nextSide, this.kind, this.id);
  }
}
