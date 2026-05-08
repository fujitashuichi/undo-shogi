import type { PieceKind } from "../types.js";

export const pieceValidator = (isPromoted: boolean, kind: PieceKind) => {
  if (isPromoted) {
    if (kind === "King" || kind === "Gold") {
      throw new Error(`${kind} cannot be promoted.`);
    }
  }
}
