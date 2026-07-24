import { z } from "zod";

export const gameErrorNameSchema = z.enum([
  "ZERO_LENGTH_HISTORY",
  "INVALID_UNDO",
  "GAME_ALREADY_ENDED"
]);
type ErrorName = z.infer<typeof gameErrorNameSchema>;


const messageMap: Record<ErrorName, string> = {
  ZERO_LENGTH_HISTORY: "指し手の履歴が空です。",
  INVALID_UNDO: "待ったできない局面です。",
  GAME_ALREADY_ENDED: "終局しています。"
}


export class GameError extends Error {
  constructor (
    public readonly errorName: ErrorName
  ) {
    super();
    this.name = "GameError";
    this.message = messageMap[errorName];
  }
}
