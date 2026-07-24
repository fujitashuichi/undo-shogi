import { z } from "zod";

export const clientSessionMessageSchema = z.union([
  z.object({
    type: z.literal("session"),
    command: z.enum(["startMatching", "stopMatching"])
  })
]);
export type ClientSessionMessage = z.infer<typeof clientSessionMessageSchema>;
