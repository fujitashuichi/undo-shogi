import { shogiStatusSchema } from "@packages/shogi";
import { z } from "zod";
import { errorNameSchema } from "./errorName.js";


const command = z.enum([
  "movePiece",
  "dropPiece",
  "undo",
  "startGame",
  "stopGame"
]);


export const shogiMessageSchema = z.union([
  z.object({
    type: z.literal("shogi"),
    success: z.literal(false),
    command,
    errorName: errorNameSchema
  }),
  z.object({
    type: z.literal("shogi"),
    success: z.literal(true),
    command,
    body: z.object({ status: shogiStatusSchema })
  })
]);
