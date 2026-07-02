import { normalPieceKindSchema } from "@shogi";
import { z } from "zod";
import type { Command } from "../command.types.js";


const positionSchema = z.object({
  file: z.number().min(1).max(9),
  rank: z.number().min(1).max(9)
});


const onConnectionSchema = z.object({});

const movePieceSchema = z.object({
  from: positionSchema,
  to: positionSchema,
  promote: z.boolean()
});

const dropPieceSchema = z.object({
  to: positionSchema,
  kind: normalPieceKindSchema
});

const undoSchema = z.object({});

const startMatchSchema = z.object({});
const stopMatchSchema = z.object({});


export const bodySchema = z.union([
  onConnectionSchema,
  movePieceSchema,
  dropPieceSchema,
  undoSchema,
  startMatchSchema,
  stopMatchSchema
]);
export type Body = z.infer<typeof bodySchema>;


type BodySchemasType =
  | typeof onConnectionSchema
  | typeof movePieceSchema
  | typeof dropPieceSchema
  | typeof undoSchema
  | typeof startMatchSchema
  | typeof stopMatchSchema;

export const bodySchemaMap: Record<Command, BodySchemasType> = {
  onConnection: onConnectionSchema,
  movePiece: movePieceSchema,
  dropPiece: dropPieceSchema,
  undo: undoSchema,
  startMatch: startMatchSchema,
  stopMatch: stopMatchSchema
}
