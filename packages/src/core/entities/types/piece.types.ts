import { z } from "zod";

export type Side = "Sente" | "Gote";


// 成っていない駒
export const NormalPieceKindSchema = z.enum([
  "King", "Gold", "Silver", "Knight", "Lance",
  "Bishop", "Rook",
  "Pawn"
]);
export type NormalPieceKind = z.infer<typeof NormalPieceKindSchema>;



// 成れる駒・成れない駒の区別
export const NoPromotablePieceKindSchema = NormalPieceKindSchema.extract([
  "King", "Gold"
]);
export type NoPromotablePieceKind = z.infer<typeof NoPromotablePieceKindSchema>;

export const PromotablePieceKindSchema = NormalPieceKindSchema.exclude([
  "King", "Gold"
]);
export type PromotablePieceKind = z.infer<typeof PromotablePieceKindSchema>;


// 成った駒
export const PromotedPieceKindSchema = z.enum([
  "P_Silver", "P_Knight", "P_Lance",
  "P_Bishop", "P_Rook",
  "P_Pawn"
]);
export type PromotedPieceKind = z.infer<typeof PromotedPieceKindSchema>;


// 駒全種
export const PieceKindSchema = NormalPieceKindSchema.or(PromotedPieceKindSchema);
export type PieceKind = z.infer<typeof PieceKindSchema>;
