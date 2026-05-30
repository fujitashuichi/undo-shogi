
type ErrorTypes =
  | "ZERO_LENGTH_HISTORY"
  | "INVALID_UNDO"
  | "GAME_ALREADY_ENDED"


const messageMap: Record<ErrorTypes, string> = {
  ZERO_LENGTH_HISTORY: "指し手の履歴が空です。",
  INVALID_UNDO: "そのundo操作は不可能です。",
  GAME_ALREADY_ENDED: "既に終局しています。"
}


export class PlayError extends Error {
  constructor (
    public readonly type: ErrorTypes
  ) {
    super();
    this.name = "PlayError";
    this.message = messageMap[type];
  }
}
