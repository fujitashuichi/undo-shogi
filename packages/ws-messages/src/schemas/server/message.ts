import { shogiStatusSchema } from "@packages/shogi";
import { z } from "zod";
import { shogiCommandSchema, sessionCommandSchema } from "../command.types.js";


const errorMessageSchema = z.enum([
  "BAD_REQUEST", "INTERNAL_ERROR"
]);

const shogiResultMessageSchema = z.object({
  status: shogiStatusSchema
});

const sessionMessageSchema = z.object({
  clientId: z.uuid(),
  groupId: z.uuid().or(z.literal("unGrouped"))
});


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
    command: sessionCommandSchema,
    value: sessionMessageSchema
  })
]);
export type ServerMessage = z.infer<typeof serverMessageSchema>;
