type ErrorTypes =
  | "OUT_OF_BOARD"
;


const messages: Record<ErrorTypes, string> = {
  OUT_OF_BOARD: "ロジックが盤面座標の範囲外です"
}


export class LogicError extends Error {
  constructor (
    public readonly type:  ErrorTypes
  ) {
    super();
    this.name = "LogicError";
    this.message = messages[type]
  }
}
