import { z } from "zod";
import { errorNameSchema } from "./errorName.js";


const command = z.enum([
  "onConnection",
  "matched"
]);

const sessionDataSchema = z.object({
  clientId: z.uuid(),
  groupId: z.union([
    z.uuid(), z.literal("unGrouped")
  ])
});

export const sessionMessageSchema = z.union([
  z.object({
    success: z.literal(false),
    command,
    errorName: errorNameSchema
  }),
  z.object({
    success: z.literal(true),
    command,
    value: sessionDataSchema
  })
]);
