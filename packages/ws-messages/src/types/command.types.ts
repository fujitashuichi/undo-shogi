import { z } from "zod";


export const shogiCommandSchema = z.enum(["movePiece", "dropPiece", "undo", "startMatch", "stopMatch"]);
export const systemCommandSchema = z.enum(["onConnection"]);

export const commandSchema = z.union([
  shogiCommandSchema,
  systemCommandSchema
]);
export type Command = z.infer<typeof commandSchema>;
