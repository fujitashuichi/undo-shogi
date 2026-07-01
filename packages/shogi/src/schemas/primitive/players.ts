import { z } from "zod";

export const sideSchema = z.enum(["Sente", "Gote"]);
export type Side = z.infer<typeof sideSchema>;
