type ErrorTypes =
  | "INVALID_PROPERTY"
;


const messages: Record<ErrorTypes, string> = {
  INVALID_PROPERTY: "駒の状態が不正です"
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
