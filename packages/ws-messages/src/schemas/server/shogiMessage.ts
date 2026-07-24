import { shogiErrorNameSchema, shogiStatusSchema } from "@packages/shogi";
import { z } from "zod";
import { errorNameSchema } from "./errorName.js";


const command = z.enum([
  "movePiece",
  "dropPiece",
  "undo",
  "startGame",
  "stopGame"
]);


export const serverShogiMessageSchema = z.union([
  z.object({
    type: z.literal("shogi"),
    success: z.literal(false),
    command,
    errorName: z.enum([
      ...errorNameSchema.options,
      ...shogiErrorNameSchema.options
    ])
  }),
  z.object({
    type: z.literal("shogi"),
    success: z.literal(true),
    command,
    body: z.object({ status: shogiStatusSchema })
  })
]);
export type ServerShogiMessage = z.infer<typeof serverShogiMessageSchema>;
