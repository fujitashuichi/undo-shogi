import type { Position } from "@/schemas/primitive/algebraic.js";
import type { ShogiPieceNormal } from "@/domain/entities/Piece/Piece.js";
import { Board } from "../../Board.js";
import { dropValidator } from "./validators/dropValidator.js";


export const board_dropPiece = (board: Board, position: Position, piece: ShogiPieceNormal) => {
  dropValidator.assertCanDrop(board, position, piece);

  const targetX = position.x;
  const targetY = position.y;


  const nextSquares = board.squares.map((row, yIdx) =>
    row.map((currentPiece, xIdx) => {
      if (yIdx === targetY && xIdx === targetX) return piece;
      return currentPiece;
    })
  ) as Board["squares"];

  return new Board(nextSquares);
}
