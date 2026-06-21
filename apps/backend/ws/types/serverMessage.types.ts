import { z } from "zod";

export const serverMessageSchema = z.object({
  success: z.literal(false),
  errorMessage: z.string()
}).or(z.object({
  success: z.literal(true),
  vale: z.any()
}));

export type ServerMessage = z.infer<typeof serverMessageSchema>;
