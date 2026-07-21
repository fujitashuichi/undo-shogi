import { normalPieceKindSchema } from "@packages/shogi";
import { z } from "zod";

const positionSchema = z.object({
  file: z.number().min(1).max(9),
  rank: z.number().min(1).max(9)
});


export const shogiMessageSchema = z.union([
  z.object({
    command: z.literal("movePiece"),
    body: z.object({
      from: positionSchema,
      to: positionSchema,
      promote: z.boolean()
    })
  }),
  z.object({
    command: z.literal("dropPiece"),
    body: z.object({
      to: positionSchema,
      kind: normalPieceKindSchema
    })
  }),
  z.object({
    command: z.enum(["undo", "startGame", "stopGame"])
  })
]);
