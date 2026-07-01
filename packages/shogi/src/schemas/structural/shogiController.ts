import { z } from "zod";
import { sideSchema } from "../primitive/players.js";
import { normalPieceKindSchema, pieceKindSchema } from "../primitive/piece.js";
import { remainingSecondsSchema } from "./timer.js";
import { gameEndStatusSchema } from "./gameEndStatus.js";
import { pieceRecordSchema } from "./pieceRecord.js";


const shogiController_boardSchema = z.array(
  z.array(
    z.object({
      side: sideSchema,
      piece: pieceKindSchema
    }).or(z.undefined())
  ).length(9)
).length(9);




const historySchema = z.array(
  z.object({
    board: shogiController_boardSchema,
    hands: pieceRecordSchema
  })
);


export const shogiStatusSchema = z.object({
  gameEndStatus: gameEndStatusSchema,
  remainingSeconds: remainingSecondsSchema,
  history: historySchema,
  currentSide: sideSchema
});
export type ShogiStatus = z.infer<typeof shogiStatusSchema>;
