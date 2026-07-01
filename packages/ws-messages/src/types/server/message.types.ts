import { shogiStatusSchema } from "@shogi";
import { z } from "zod";
import { shogiCommandSchema, systemCommandSchema } from "../command.types.js";


const shogiResultMessageSchema = z.object({
  status: shogiStatusSchema
});

const errorMessageSchema = z.enum([
  "BAD_REQUEST", "INTERNAL_ERROR"
]);


export const serverMessageSchema = z.union([
  z.object({
  success: z.literal(false),
  errorMessage: errorMessageSchema
  }),
  z.object({
    success: z.literal(true),
    command: shogiCommandSchema,
    value: shogiResultMessageSchema
  }),
  z.object({
    success: z.literal(true),
    command: systemCommandSchema
  })
]);
export type ServerMessage = z.infer<typeof serverMessageSchema>;
