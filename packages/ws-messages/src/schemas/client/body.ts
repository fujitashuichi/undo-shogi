import { normalPieceKindSchema } from "@packages/shogi";
import { z } from "zod";
import type { Command } from "../command.schemas.js";


const positionSchema = z.object({
  file: z.number().min(1).max(9),
  rank: z.number().min(1).max(9)
});


const onConnectionSchema = z.object({});

const matchingSchema = z.object({
  groupId: z.enum(["matching", "unGrouped"])
});

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
  | typeof matchingSchema
  | typeof movePieceSchema
  | typeof dropPieceSchema
  | typeof undoSchema
  | typeof startMatchSchema
  | typeof stopMatchSchema;

export const bodySchemaMap: Record<Command, BodySchemasType> = {
  onConnection: onConnectionSchema,
  matching: matchingSchema,
  movePiece: movePieceSchema,
  dropPiece: dropPieceSchema,
  undo: undoSchema,
  startMatch: startMatchSchema,
  stopMatch: stopMatchSchema
}
