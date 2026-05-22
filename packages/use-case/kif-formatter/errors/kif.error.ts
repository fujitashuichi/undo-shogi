type ErrorType = "UNSUPPORTED_KIF"

const messageMap: Record<ErrorType, string> = {
  UNSUPPORTED_KIF: "このKIF形式はサポートされていません。"
}

export class KifError extends Error {
  constructor (
    public readonly type: ErrorType
  ) {
    super();
    this.name = "KifError";
    this.message = messageMap[type];
  }
}
