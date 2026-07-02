import { z } from "zod";
import { sideSchema } from "../primitive/players.js";
import { normalPieceKindSchema } from "../primitive/piece.js";

export const pieceRecordSchema = z.record(
  sideSchema,
  z.record(
    normalPieceKindSchema,
    z.number()
  )
);
export type PieceRecord = z.infer<typeof pieceRecordSchema>;
