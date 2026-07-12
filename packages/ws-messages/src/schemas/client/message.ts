import { z } from "zod";
import { normalPieceKindSchema } from "@packages/shogi";


const positionSchema = z.object({
  file: z.number().min(1).max(9),
  rank: z.number().min(1).max(9)
});

export const clientMessageSchema = z.union([
  z.object({
    command: z.literal("onConnection"),
    body: z.object({})
  }),
  z.object({
    command: z.literal("matching"),
    body: z.object({})
  }),
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
    command: z.literal("undo"),
    body: z.object({})
  }),
  z.object({
    command: z.literal("startMatch"),
    body: z.object({})
  }),
  z.object({
    command: z.literal("stopMatch"),
    body: z.object({})
  })
]);
export type ClientMessage = z.infer<typeof clientMessageSchema>;
