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

export const serverSessionMessageSchema = z.union([
  z.object({
    type: z.literal("session"),
    success: z.literal(false),
    command,
    errorName: errorNameSchema
  }),
  z.object({
    type: z.literal("session"),
    success: z.literal(true),
    command,
    body: sessionDataSchema
  })
]);
export type ServerSessionMessage = z.infer<typeof serverSessionMessageSchema>;
