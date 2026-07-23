import { z } from "zod";


export const kifErrorNameSchema = z.enum([
  "UNSUPPORTED_KIF"
]);
type ErrorName = z.infer<typeof kifErrorNameSchema>;


const messageMap: Record<ErrorName, string> = {
  UNSUPPORTED_KIF: "サポートされていないKIFファイルです。"
}

export class KifError extends Error {
  constructor (
    public readonly errorName: ErrorName
  ) {
    super();
    this.name = "KifError";
    this.message = messageMap[errorName];
  }
}
