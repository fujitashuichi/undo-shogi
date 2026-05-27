import { logger } from "../../../../tools/index.js";
import { PieceError } from "../../../errors/piece.error.js";
import { PromotedPieceKindSchema, type PieceKind } from "../../types/piece.types.js";


export const pieceValidator = (isPromoted: boolean, kind: PieceKind) => {
  if (isPromoted) {
    const isPromotedKind = PromotedPieceKindSchema.safeParse(kind).success;
    if (!isPromotedKind) {
      logger.fatal(`isPromoted === true ですが、${kind} は成り駒ではありません。`);
      throw new PieceError("INVALID_PROPERTY");
    }
  }
}
