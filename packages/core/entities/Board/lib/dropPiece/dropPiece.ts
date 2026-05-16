import { emptyHands } from "../../../Hand/__mock__/emptyHands.js";
import { Hands } from "../../../Hand/Hands.js";
import type { ShogiPiece } from "../../../Piece/Piece.js";
import type { Position } from "../../../types/algebraic.types.js";
import { Board } from "../../Board.js";
import { dropValidator } from "./validators/dropValidator.js";


export const board_dropPiece = (board: Board, hands: Hands, position: Position, piece: ShogiPiece) => {
  dropValidator.assertCanDrop(board, hands, position, piece);

  const targetX = position.x;
  const targetY = position.y;


  const nextSquares = board.squares.map((row, yIdx) =>
    row.map((currentPiece, xIdx) => {
      if (yIdx === targetY && xIdx === targetX) return piece;
      return currentPiece;
    })
  ) as Board["squares"];

  return new Board(nextSquares, emptyHands);
}
