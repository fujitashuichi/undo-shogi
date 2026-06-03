import { z } from "zod";

export const handicapSchema = z.enum([
  "hishaOchi",
  "kakuOchi",
  "kyoOchi",
  "two", "four", "six", "eight", "ten"
])

export type Handicap = z.infer<typeof handicapSchema>;
