import type { Board } from "../../../Board/Board.js";
import type { ShogiPiece } from "../../../Piece/Piece.js";
import type { Position } from "../../../types/algebraic.types.js";
import { isInBoard } from "../isInArea/isInBoard.js";


export const byPiece_Infinity = (
  board: Board,
  piece: ShogiPiece,
  x: number, y: number,
  dx: number, dy: number,
  positionsUnderAttack: Position[]
) => {
  let collided = false;

  if (!isInBoard(x, y)) return;

  const firstSquare = board.squares[y]![x];
  if (firstSquare) {
    collided = true;

    if (firstSquare.side !== piece.side) {
      positionsUnderAttack.push({ x, y });
    }
  }

  while (!collided && isInBoard(x, y)) {
    if (isInBoard(x, y)) {
      const square = board.squares[y]![x];

      if (square) {
        collided = true;

        if (square.side !== piece.side) {
          positionsUnderAttack.push({ x, y });
        }
      };

      if (!square) {
        positionsUnderAttack.push({ x, y });
      }
    }

    x += dx;
    y += dy;
  }
}
