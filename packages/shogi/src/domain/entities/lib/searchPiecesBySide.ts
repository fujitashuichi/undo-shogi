import type { Position, Side } from "@/index.js";
import type { Board } from "../Board/Board.js";
import type { ShogiPiece } from "../Piece/Piece.js";


export const searchPiecesBySide = {
  returnInstances: (board: Board, side: Side) => {
    let pieces: ShogiPiece[] = [];

    board.squares.forEach(row => {
      row.forEach(square => {
        if (square && square.side === side) {
          pieces.push(square);
        }
      });
    });

    return pieces;
  },
  returnPositions: (board: Board, side: Side) => {
    let positions: Position[] = [];

    board.squares.forEach((row, y) => {
      row.forEach((square, x) => {
        if (square && square.side === side) {
          positions.push({ x, y });
        }
      });
    });

    return positions;
  }
}
