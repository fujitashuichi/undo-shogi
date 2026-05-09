import { z } from "zod";

export type Side = "Sente" | "Gote";


export const PieceKindSchema = z.enum([
  "King", "Gold", "Silver", "Knight", "Lance",
  "Bishop", "Rook",
  "Pawn"
]);
export type PieceKind = z.infer<typeof PieceKindSchema>;


export const AlgebraicNotationSchema = z.regex(
  /^(\+?[PLNSGBRK])([-*x])([1-9][a-i])(\+)?$/,
  { message: "無効な棋譜形式です" }
)
export type AlgebraicNotation = z.infer<typeof AlgebraicNotationSchema>;
