type ErrorTypes =
  | "INVALID_PROPERTY" | "INVALID_MOTION_VECTOR" | "LEAP_RESTRICTION"
;


const messages: Record<ErrorTypes, string> = {
  INVALID_PROPERTY: "駒の状態が不正です",
  INVALID_MOTION_VECTOR: "移動ベクトルが不正です",
  LEAP_RESTRICTION: "他の駒の追い越しはできません"
}


export class PieceError extends Error {
  constructor (
    public readonly type:  ErrorTypes
  ) {
    super();
    this.name = "PieceError";
    this.message = messages[type]
  }
}
