import { NormalPieceKindSchema } from "@packages/shogi";
import { z } from "zod";


const positionSchema = z.object({
  file: z.number().min(1).max(9),
  rank: z.number().min(1).max(9)
});


const movePieceSchema = z.object({
  command: z.literal("movePiece"),
  from: positionSchema,
  to: positionSchema,
  promote: z.boolean()
});

const dropPieceSchema = z.object({
  command: z.literal("dropPiece"),
  to: positionSchema,
  kind: NormalPieceKindSchema
});

const undoSchema = z.object({
  command: z.literal("undo")
});

const startMatchSchema = z.object({
  command: z.literal("startMatch")
});

const stopMatchSchema = z.object({
  command: z.literal("stopMatch")
});


export const clientMessageSchema = z.union([
  movePieceSchema, dropPieceSchema, undoSchema, startMatchSchema, stopMatchSchema
]);

export type ClientMessage = z.infer<typeof clientMessageSchema>;
