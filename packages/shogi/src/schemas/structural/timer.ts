import { z } from "zod";
import { sideSchema } from "../primitive/players.js";

export const remainingSecondsSchema = z.record(sideSchema, z.number());
export type RemainingSeconds = z.infer<typeof remainingSecondsSchema>;
