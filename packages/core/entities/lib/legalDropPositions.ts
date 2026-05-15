import type { Board } from "../Board/Board.js";
import { dropValidator } from "../Board/lib/dropPiece/validators/dropValidator.js";
import type { ShogiPiece } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import { allPositionInBoard } from "./allPositionsInBoard.js";


export const legalDropsPositions = (board: Board, piece: ShogiPiece) => {
  let positions: Position[] = [];

  allPositionInBoard.forEach(pos => {
    if (dropValidator.canDrop(board, pos, piece)) {
      positions.push(pos);
    }
  });

  return positions;
}
