import type { PromotablePieceKind, PromotedPieceKind } from "@/schemas/primitive/piece.js";

const mapPromotedToNormal: Record<PromotedPieceKind, PromotablePieceKind> = {
  P_Silver: "Silver", P_Knight: "Knight", P_Lance: "Lance",
  P_Bishop: "Bishop", P_Rook: "Rook",
  P_Pawn: "Pawn"
}

export const promotedKindToNormal = (kind: PromotedPieceKind): PromotablePieceKind => {
  return mapPromotedToNormal[kind];
}