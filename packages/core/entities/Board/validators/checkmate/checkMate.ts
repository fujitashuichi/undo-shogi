import type { Hands } from "../../../Hand/Hand.js";
import { legalMovePositions } from "../../../lib/legalMovePosition.js";
import type { Side } from "../../../types/piece.types.js";
import type { Board } from "../../Board.js";
import { dropValidator } from "../../lib/dropPiece/validators/dropValidator.js";


export const isCheckMated = (board: Board, hands: Hands, side: Side): boolean => {
  const allLegalMoves = legalMovePositions.all(board, side);

  if (allLegalMoves.length === 0) {
    const canDrop = dropValidator.canAnyDrop(board, hands, side);

    if (canDrop) {
      return false;
    }

    return true;
  }

  return false;
}
