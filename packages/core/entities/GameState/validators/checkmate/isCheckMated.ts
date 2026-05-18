import type { Side } from "../../../types/piece.types.js";
import type { Board } from "../../../Board/Board.js";
import type { Hands } from "../../../Hand/Hands.js";
import { legalMovePositions } from "../../lib/legalMovePositions/legalMovePositions.js";
import { legalDropPositions } from "../../lib/legalDropPositions/legalDropPositions.js";


export const isCheckMated = (board: Board, hands: Hands, side: Side): boolean => {
  const allLegalMoves = legalMovePositions.all(board, side);

  if (allLegalMoves.length === 0) {
    if (legalDropPositions.all(board, hands, side).length === 0) {
      return true;
    }
  }

  return false;
}
