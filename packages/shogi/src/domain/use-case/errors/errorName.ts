import { entityErrorNameSchema } from "@/domain/entities/errors/entityErrorNameSchema.js";
import { z } from "zod";


export const shogiErrorNameSchema = z.enum([
  ...entityErrorNameSchema.options,
  "INTERNAL_ERROR"
]);
export type ShogiErrorName = z.infer<typeof shogiErrorNameSchema>;
