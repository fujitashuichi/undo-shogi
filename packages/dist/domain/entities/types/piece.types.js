import { z } from "zod";
// 成っていない駒
export const NormalPieceKindSchema = z.enum([
    "King", "Gold", "Silver", "Knight", "Lance",
    "Bishop", "Rook",
    "Pawn"
]);
// 成れる駒・成れない駒の区別
export const NoPromotablePieceKindSchema = NormalPieceKindSchema.extract([
    "King", "Gold"
]);
export const PromotablePieceKindSchema = NormalPieceKindSchema.exclude([
    "King", "Gold"
]);
// 成った駒
export const PromotedPieceKindSchema = z.enum([
    "P_Silver", "P_Knight", "P_Lance",
    "P_Bishop", "P_Rook",
    "P_Pawn"
]);
// 駒全種
export const PieceKindSchema = NormalPieceKindSchema.or(PromotedPieceKindSchema);
//# sourceMappingURL=piece.types.js.map