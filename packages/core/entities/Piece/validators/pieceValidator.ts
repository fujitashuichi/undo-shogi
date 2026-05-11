import type { PieceKind } from "../../types/piece.types.js";
import { NoPromotablePieceSchema } from "./types.js";

export const pieceValidator = (isPromoted: boolean, kind: PieceKind) => {
  if (isPromoted) {
    const isNoPromotable = NoPromotablePieceSchema.safeParse(kind).success;

    if (isNoPromotable) {
      throw new Error(`${kind} cannot be promoted.`);
    }
  }
}
