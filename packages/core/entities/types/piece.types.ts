import { z } from "zod";

export type Side = "Sente" | "Gote";


export const PieceKindSchema = z.enum([
  "King", "Gold", "Silver", "Knight", "Lance",
  "Bishop", "Rook",
  "Pawn"
]);
export type PieceKind = z.infer<typeof PieceKindSchema>;
