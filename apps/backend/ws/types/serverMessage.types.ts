import { z } from "zod";


const errorMessageSchema = z.enum([
  "BAD_REQUEST", "INTERNAL_ERROR"
]);


export const serverMessageSchema = z.object({
  success: z.literal(false),
  errorMessage: errorMessageSchema
}).or(z.object({
  success: z.literal(true),
  value: z.any()
}));

export type ServerMessage = z.infer<typeof serverMessageSchema>;
