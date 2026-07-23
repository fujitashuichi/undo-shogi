import { z } from "zod";
import { sessionMessageSchema } from "./sessionMessage.js";
import { shogiMessageSchema } from "./shogiMessage.js";
import { errorNameSchema } from "./errorName.js";


export const serverMessageSchema = z.union([
  shogiMessageSchema,
  sessionMessageSchema,
  z.object({
    type: z.literal("none"),
    success: false,
    errorName: errorNameSchema
  })
]);
export type ServerMessage = z.infer<typeof serverMessageSchema>;
