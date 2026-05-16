import type { Board } from "../Board/Board.js";
import { ShogiPieceNormal } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";
import { allPositionInBoard } from "./allPositionsInBoard.js";


export const legalDropsPositions = (board: Board, side: Side) => {
  const hands = board.hands;

  let positions: Position[] = [];
  const pieces = hands.allPieceKindsBySide(side);

  allPositionInBoard.forEach(pos => {
    const canDrop = pieces.some(piece => {
      try {
        board.dropPiece(pos, new ShogiPieceNormal(side, piece));
        return true;
      } catch {
        return false;
      }
    });

    if (canDrop) positions.push(pos);
  });

  return positions;
}
