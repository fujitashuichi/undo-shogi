import { z } from "zod";

export const errorNameSchema = z.enum([
  "BAD_REQUEST", "INTERNAL_ERROR"
]);
