import { z } from "zod";


const shogiCommandSchema = z.enum(["movePiece", "dropPiece", "undo", "startMatch", "stopMatch"]);

export const commandSchema = z.union([
  shogiCommandSchema,
  z.enum(["onConnection"])
]);
export type Command = z.infer<typeof commandSchema>;
