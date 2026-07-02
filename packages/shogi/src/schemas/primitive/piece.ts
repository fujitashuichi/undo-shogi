import { z } from "zod";


// 成っていない駒
export const normalPieceKindSchema = z.enum([
  "King", "Gold", "Silver", "Knight", "Lance",
  "Bishop", "Rook",
  "Pawn"
]);
export type NormalPieceKind = z.infer<typeof normalPieceKindSchema>;



// 成れる駒・成れない駒の区別
export const noPromotablePieceKindSchema = normalPieceKindSchema.extract([
  "King", "Gold"
]);
export type NoPromotablePieceKind = z.infer<typeof noPromotablePieceKindSchema>;

export const promotablePieceKindSchema = normalPieceKindSchema.exclude([
  "King", "Gold"
]);
export type PromotablePieceKind = z.infer<typeof promotablePieceKindSchema>;


// 成った駒
export const promotedPieceKindSchema = z.enum([
  "P_Silver", "P_Knight", "P_Lance",
  "P_Bishop", "P_Rook",
  "P_Pawn"
]);
export type PromotedPieceKind = z.infer<typeof promotedPieceKindSchema>;


// 駒全種
export const pieceKindSchema = normalPieceKindSchema.or(promotedPieceKindSchema);
export type PieceKind = z.infer<typeof pieceKindSchema>;
