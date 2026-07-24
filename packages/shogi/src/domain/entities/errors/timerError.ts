import { z } from "zod";


export const timerErrorNameSchema = z.enum([
  "INVALID_UNDO"
]);
type ErrorName = z.infer<typeof timerErrorNameSchema>;


const messageMap: Record<ErrorName, string> = {
  INVALID_UNDO: "待ったできない局面です。"
}

export class TimerError extends Error {
  constructor (
    public readonly errorName: ErrorName
  ) {
    super();
    this.name = "KifError";
    this.message = messageMap[errorName];
  }
}
