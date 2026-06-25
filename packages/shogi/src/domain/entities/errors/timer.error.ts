type ErrorType = "INVALID_UNDO"

const messageMap: Record<ErrorType, string> = {
  INVALID_UNDO: "待ったできません"
}

export class TimerError extends Error {
  constructor (
    public readonly type: ErrorType
  ) {
    super();
    this.name = "KifError";
    this.message = messageMap[type];
  }
}
