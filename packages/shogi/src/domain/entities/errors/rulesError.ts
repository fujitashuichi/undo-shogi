import { z } from "zod";


export const rulesErrorNameSchema = z.enum([
  "DOUBLE_PAWN"
]);
type ErrorName = z.infer<typeof rulesErrorNameSchema>;


const messages: Record<ErrorName, string> = {
  DOUBLE_PAWN: "二歩です。"
}


export class RulesError extends Error {
  constructor (
    public readonly errorName: ErrorName
  ) {
    super();
    this.name = "ShogiRulesError";
    this.message = messages[errorName]
  }
}
