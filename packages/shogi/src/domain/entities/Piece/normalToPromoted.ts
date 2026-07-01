import type { PromotablePieceKind, PromotedPieceKind } from "@/schemas/primitive/piece.js";

const mapNormalToPromote: Record<PromotablePieceKind, PromotedPieceKind> = {
  Silver: "P_Silver", Knight: "P_Knight", Lance: "P_Lance",
  Bishop: "P_Bishop", Rook: "P_Rook",
  Pawn: "P_Pawn"
}

export const normalKindToPromoted = (kind: PromotablePieceKind): PromotedPieceKind => {
  return mapNormalToPromote[kind];
}