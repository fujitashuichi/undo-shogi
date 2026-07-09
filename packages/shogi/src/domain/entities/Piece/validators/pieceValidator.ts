import { logger } from "@packags/tools";
import { PieceError } from "../../errors/piece.error.js";
import { promotedPieceKindSchema, type PieceKind } from "@/schemas/primitive/piece.js";


export const pieceValidator = (isPromoted: boolean, kind: PieceKind) => {
  if (isPromoted) {
    const isPromotedKind = promotedPieceKindSchema.safeParse(kind).success;
    if (!isPromotedKind) {
      logger.fatal(`isPromoted === true ですが、${kind} は成り駒ではありません。`);
      throw new PieceError("INVALID_PROPERTY");
    }
  }
}
