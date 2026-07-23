import { normalPieceKindSchema } from "@packages/shogi";
import { z } from "zod";

export const shogiPositionSchema = z.object({
  file: z.number().min(1).max(9),
  rank: z.number().min(1).max(9)
});
export type ShogiPosition = z.infer<typeof shogiPositionSchema>;


export const clientShogiMessageSchema = z.union([
  z.object({
    type: z.literal("shogi"),
    command: z.literal("movePiece"),
    body: z.object({
      from: shogiPositionSchema,
      to: shogiPositionSchema,
      promote: z.boolean()
    })
  }),
  z.object({
    type: z.literal("shogi"),
    command: z.literal("dropPiece"),
    body: z.object({
      to: shogiPositionSchema,
      kind: normalPieceKindSchema
    })
  }),
  z.object({
    type: z.literal("shogi"),
    command: z.enum(["undo", "startGame", "stopGame"])
  })
]);
export type ClientShogiMessage = z.infer<typeof clientShogiMessageSchema>;
