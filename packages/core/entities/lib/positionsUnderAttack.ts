import { Board } from "../Board/Board.js";
import { positionValidator } from "../Board/validators/positionValidator.js";
import type { ShogiPiece } from "../Piece/Piece.js";
import type { PieceVectors, Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";
import { searchPiecesBySide } from "./searchPiecesBySide.js";


// underAttack は「駒の利き」を意味しており、駒が移動可能な範囲を指す


export const byPiece = (board: Board, piecePos: Position): Position[] => {
  let positionsUnderAttack: Position[] = [];

  const piece = board.squares[piecePos.y]![piecePos.x];
  if (!piece) return [];

  const vectors: PieceVectors = piece.motion.vectors;
  const direction = piece.side === "Sente" ? -1 : 1;

  vectors.forEach(vector => {
    let x = piecePos.x;
    let y = piecePos.y;
    let collided = false;

    const dx = vector.dx * (direction * -1);
    const dy = vector.dy * direction;


    if (vector.infinity) {
      while (
        positionValidator.isInBoard(x, y) &&
        !collided
      ) {
        const square: ShogiPiece | undefined = board.squares[y]![x];

        if (square) {
          if (
            (!(x === piecePos.x && y === piecePos.y)) && // 駒は自分に効きを持たない
            (square.side !== piece.side)  // 最初にぶつかった駒が相手のものであれば、駒が利いている扱いになる
          ) {
            collided = true;
            positionsUnderAttack.push({ x, y });
          }
        } else {
          positionsUnderAttack.push({ x, y });
        }

        x += dx;
        y += dy;
      }
    }


    if (!vector.infinity) {
      x += dx;
      y += dy;

      if (positionValidator.isInBoard(x, y)) {
        const square = board.squares[y]![x];

        if (square) {
          if (
            (!(x === piecePos.x && y === piecePos.y)) &&
            (!square.side)
          ) {
            positionsUnderAttack.push({ x, y });
          }
        };

        if (!square) {
          positionsUnderAttack.push({ x, y });
        }
      }
    };
  });

  return positionsUnderAttack;
}


export const all = (board: Board, side: Side): Position[] => {
  let positionsUnderAttack: Position[] = [];

  const piecePosList = searchPiecesBySide.returnPositions(board, side);

  piecePosList.forEach(pos => {
    positionsUnderAttack.push(
      ...byPiece(board, pos)
    );
  });

  return positionsUnderAttack;
}


export const positionsUnderAttack = {
  byPiece,
  all
}
