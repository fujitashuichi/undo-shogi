import { z } from "zod";


export const pieceErrorNameSchema = z.enum([
  "INVALID_PROPERTY", "INVALID_MOTION_VECTOR", "LEAP_RESTRICTION"
]);
type ErrorName = z.infer<typeof pieceErrorNameSchema>;


const messages: Record<ErrorName, string> = {
  INVALID_PROPERTY: "予期しないエラーが発生しました。",
  INVALID_MOTION_VECTOR: "予期しないエラーが発生しました。",
  LEAP_RESTRICTION: "他の駒を追い越すことは出来ません。"
}


export class PieceError extends Error {
  constructor (
    public readonly errorName: ErrorName
  ) {
    super();
    this.name = "PieceError";
    this.message = messages[errorName]
  }
}
