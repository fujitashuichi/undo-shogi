import { z } from "zod";
import { errorNameSchema } from "./errorName.js";

export const serverSystemMessageSchema = z.object({
  type: z.literal("system"),
  success: z.literal(false),
  errorName: errorNameSchema
});
export type ServerSystemMessage = z.infer<typeof serverSystemMessageSchema>;
