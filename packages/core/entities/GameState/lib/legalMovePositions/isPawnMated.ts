import type { Board } from "../../../Board/Board.js";
import type { Hands } from "../../../Hand/Hands.js";
import type { NormalPieceKind, Side } from "../../../types/piece.types.js";
import { legalDropPositions_IgnorePawnMate } from "./ignorePawnMate.js";
import { legalMovePositions } from "./legalMovePositions.js";


export const isPawnMated = (nextBoard: Board, nextHands: Hands, side: Side, pieceKind: NormalPieceKind): boolean => {
  if (pieceKind === "Pawn") {
    const hasOpponentMoves = legalMovePositions.all(nextBoard, side).length > 0;
    const hasOpponentDrops = legalDropPositions_IgnorePawnMate.all(nextBoard, nextHands, side).length > 0;

    if (!hasOpponentMoves && !hasOpponentDrops) {
      return true;
    }
  }

  return false;
}
