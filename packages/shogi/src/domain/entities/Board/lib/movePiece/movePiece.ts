import type { Position } from "@/schemas/primitive/algebraic.js";
import { Board } from "../../Board.js";
import { moveValidator } from "./validators/moveValidator.js";
import { MovementError } from "@/domain/entities/errors/movement.errors.js";

export const board_movePiece = (board: Board, current: Position, next: Position, promote: boolean) => {
  moveValidator.assertCanMove(board, current, next, promote);


  let targetPiece = board.squares[current.y]![current.x];
  if (!targetPiece) throw new MovementError("MOVE_UNDEFINED_PIECE");

  if (promote) {
    targetPiece = targetPiece.promote();
  }

  const nextSquares = board.squares.map((row, yIdx) =>
    row.map((piece, xIdx) => {
      if (yIdx === next.y && xIdx === next.x) return targetPiece;
      if (yIdx === current.y && xIdx === current.x) return undefined;
      return piece;
    })
  ) as Board["squares"];

  return new Board(nextSquares);
}
