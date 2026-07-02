import { z } from "zod";
import { sideSchema } from "../primitive/players.js";

export const gameEndStatusSchema = z.union([
  z.object({
    ended: z.literal(false)
  }),
  z.object({
    ended: z.literal(true),
    winner: sideSchema.or(z.literal("Draw"))
  })
]);
export type GameEndStatus = z.infer<typeof gameEndStatusSchema>;
