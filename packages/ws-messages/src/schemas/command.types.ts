import { z } from "zod";


export const shogiCommandSchema = z.enum(["movePiece", "dropPiece", "undo", "startMatch", "stopMatch"]);
export const sessionCommandSchema = z.enum(["onConnection"]);

export const commandSchema = z.union([
  shogiCommandSchema,
  sessionCommandSchema
]);
export type Command = z.infer<typeof commandSchema>;
