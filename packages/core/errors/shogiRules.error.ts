type ErrorTypes =
  | "DOUBLE_PAWN"
;


const messages: Record<ErrorTypes, string> = {
  DOUBLE_PAWN: "2歩です"
}


export class ShogiRulesError extends Error {
  constructor (
    public readonly type:  ErrorTypes
  ) {
    super();
    this.name = "ShogiRulesError";
    this.message = messages[type]
  }
}
