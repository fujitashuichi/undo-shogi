type ErrorTypes =
  | "MOVE_UNDEFINED_PIECE" | "MOVE_TO_INVALID_SQUARE"
  | "DROP_UNDEFINED_PIECE" | "DROP_TO_INVALID_SQUARE"
  | "INVALID_PROMOTION" | "FORCED_PROMOTION"
  | "SELF_CHECKED" | "CHECK_MATED" | "DROP_PAWN_MATE"
  | "MOVE_OPPONENT_SIDES_PIECE"
;


const messages: Record<ErrorTypes, string> = {
  MOVE_UNDEFINED_PIECE: "駒が存在しない位置から駒を動かそうとしています",
  MOVE_TO_INVALID_SQUARE: "そのマスには移動できません",
  DROP_TO_INVALID_SQUARE: "そこにその持ち駒を打つことはできません",
  INVALID_PROMOTION: "その成りは成立しません",
  FORCED_PROMOTION: "その動作においては、必ず成る必要があります",
  SELF_CHECKED: "自殺手です",
  CHECK_MATED: "詰んでいます",
  DROP_PAWN_MATE: "打ち歩詰めは反則です",
  DROP_UNDEFINED_PIECE: "その持ち駒は存在しないため打てません",
  MOVE_OPPONENT_SIDES_PIECE: "相手の駒を動かすことはできません"
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
