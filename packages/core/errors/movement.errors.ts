type ErrorTypes =
  | "MOVE_UNDEFINED_PIECE" | "MOVE_TO_INVALID_SQUARE"
  | "DROP_TO_INVALID_SQUARE"
  | "INVALID_PROMOTION" | "FORCED_PROMOTION"
  | "SELF_CHECKED"
;


const messages: Record<ErrorTypes, string> = {
  MOVE_UNDEFINED_PIECE: "駒が存在しない位置から駒を動かそうとしています",
  MOVE_TO_INVALID_SQUARE: "そのマスには移動できません",
  DROP_TO_INVALID_SQUARE: "そこにその持ち駒を打つことはできません",
  INVALID_PROMOTION: "その成りは成立しません",
  FORCED_PROMOTION: "その動作においては、必ず成る必要があります",
  SELF_CHECKED: "自殺手です"
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
