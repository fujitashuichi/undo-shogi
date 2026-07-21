import { z } from "zod";

export const sessionMessageSchema = z.union([
  z.object({
    command: z.enum(["startMatching", "stopMatching"])
  })
]);
