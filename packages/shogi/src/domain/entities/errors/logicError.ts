import { z } from "zod";


export const logicErrorNameSchema = z.enum([
  "OUT_OF_BOARD"
]);
type ErrorName = z.infer<typeof logicErrorNameSchema>;


const messages: Record<ErrorName, string> = {
  OUT_OF_BOARD: "予期しないエラーが発生しました。"
}


export class LogicError extends Error {
  constructor (
    public readonly errorName: ErrorName
  ) {
    super();
    this.name = "LogicError";
    this.message = messages[errorName]
  }
}
