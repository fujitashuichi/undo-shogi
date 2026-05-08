import { z } from "zod";
import { PieceKindSchema } from "../types.js";

export const NoPromotablePieceSchema = PieceKindSchema.extract([
  "King", "Gold"
]);
export type NoPromotablePiece = z.infer<typeof NoPromotablePieceSchema>;
