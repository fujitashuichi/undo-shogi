import { legalDropsPositions } from "../../lib/legalDropPositions.js";
import { legalMovePositions } from "../../lib/legalMovePosition.js";
import type { Side } from "../../../types/piece.types.js";
import type { Board } from "../../../Board/Board.js";
import type { Hands } from "../../../Hand/Hands.js";


export const isCheckMated = (board: Board, hands: Hands, side: Side): boolean => {
  const allLegalMoves = legalMovePositions.all(board, side);

  if (allLegalMoves.length === 0) {
    if (legalDropsPositions(board, hands, side).length > 0) {
      return false;
    }

    return true;
  }

  return false;
}
