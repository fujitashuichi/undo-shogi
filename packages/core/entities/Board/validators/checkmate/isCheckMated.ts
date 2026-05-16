import type { Hands } from "../../../Hand/Hands.js";
import { legalDropsPositions } from "../../../lib/legalDropPositions.js";
import { legalMovePositions } from "../../../lib/legalMovePosition.js";
import type { Side } from "../../../types/piece.types.js";
import type { Board } from "../../Board.js";


export const isCheckMated = (board: Board, side: Side): boolean => {
  const allLegalMoves = legalMovePositions.all(board, side);

  if (allLegalMoves.length === 0) {
    if (legalDropsPositions(board, side).length > 0) {
      return false;
    }

    return true;
  }

  return false;
}
