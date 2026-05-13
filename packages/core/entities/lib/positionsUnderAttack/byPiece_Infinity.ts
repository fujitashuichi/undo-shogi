import type { Board } from "../../Board/Board.js";
import { positionValidator } from "../../Board/validators/positionValidator.js";
import type { ShogiPiece } from "../../Piece/Piece.js";
import type { Position } from "../../types/algebraic.types.js";



// 各移動ベクトルにおいて適用される

export const byPiece_Infinity = (
  board: Board,
  piece: ShogiPiece,
  x: number, y: number,
  dx: number, dy: number,
  positionsUnderAttack: Position[]
) => {
  let collided = false;

  if (!positionValidator.isInBoard(x, y)) return;

  const firstSquare = board.squares[y]![x];
  if (firstSquare) {
    collided = true;

    if (firstSquare.side !== piece.side) {
      positionsUnderAttack.push({ x, y });
    }
  }

  while (!collided && positionValidator.isInBoard(x, y)) {
    if (positionValidator.isInBoard(x, y)) {
      const square = board.squares[y]![x];

      if (square) {
        collided = true;
        console.log(`{ x: ${x}, y: ${y} } : collided`);

        if (square.side !== piece.side) {
          positionsUnderAttack.push({ x, y });
        }
      };

      if (!square) {
        console.log(`{ x: ${x}, y: ${y} }`)
        positionsUnderAttack.push({ x, y });
      }
    }

    x += dx;
    y += dy;
  }
}
