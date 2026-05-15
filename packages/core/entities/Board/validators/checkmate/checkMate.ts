import { generateLegalMoves } from "../../../lib/generateLegalMoves.js";
import type { Side } from "../../../types/piece.types.js";
import type { Board } from "../../Board.js";


export const isCheckMated = (board: Board, side: Side): boolean => {
  const allLegalMoves = generateLegalMoves.all(board, side);

  if (allLegalMoves.length === 0) {
    return true;
  }

  return false;
}
