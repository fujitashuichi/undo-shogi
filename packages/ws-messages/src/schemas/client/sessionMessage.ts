import { z } from "zod";

export const sessionMessageSchema = z.union([
  z.object({
    type: z.literal("session"),
    command: z.enum(["startMatching", "stopMatching"])
  })
]);
