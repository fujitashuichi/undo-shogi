type ErrorTypes =
  | "MOVE_UNDEFINED_PIECE"
  | "DROP_UNDEFINED_PIECE"
  | "INVALID_PROMOTION" | "FORCED_PROMOTION"
  | "SELF_CHECKED" | "DROP_PAWN_MATE"
;


const messages: Record<ErrorTypes, string> = {
  MOVE_UNDEFINED_PIECE: "駒が存在しない位置から駒を動かそうとしています",
  INVALID_PROMOTION: "その成りは成立しません",
  FORCED_PROMOTION: "その動作においては、必ず成る必要があります",
  SELF_CHECKED: "自殺手です",
  DROP_PAWN_MATE: "打ち歩詰めは反則です",
  DROP_UNDEFINED_PIECE: "その持ち駒は存在しないため打てません"
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
