type ErrorTypes = "MOVE_UNDEFINED_PIECE" | "MOVE_TO_INVALID_SQUARE";


const messages: Record<ErrorTypes, string> = {
  MOVE_UNDEFINED_PIECE: "駒が存在しない位置から駒を動かそうとしています",
  MOVE_TO_INVALID_SQUARE: "そのマスには移動できません"
}


export class MovementError extends Error {
  constructor (
    public readonly type:  ErrorTypes
  ) {
    super();
    this.name = "MovementError";
    this.message = messages[type]
  }
}
