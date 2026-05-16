import type { Position } from "../../../types/algebraic.types.js";
import type { Side } from "../../../types/piece.types.js";
import { Board } from "../../Board.js";


export const takePiece = (board: Board, position: Position, side: Side): Board => {
  const tookPiece = board.squares[position.y]![position.x];

  if (!tookPiece) return board;

  const nextHands = board.hands.addPiece(side, tookPiece.disPromote().kind);

  return new Board(board.squares, nextHands);
}
