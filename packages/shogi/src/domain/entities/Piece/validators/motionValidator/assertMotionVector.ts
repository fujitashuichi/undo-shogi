import type { Board } from "@/domain/entities/Board/Board.js";
import { MovementError } from "@/domain/entities/errors/movementErrors.js";
import { PieceError } from "@/domain/entities/errors/pieceError.js";
import { isInBoard } from "@/domain/entities/lib/positions/isInArea/isInBoard.js";
import type { Position } from "@/schemas/primitive/algebraic.js";

export const assertMotionVector = (board: Board, current: Position, next: Position): void => {
  const piece = board.squares[current.y]![current.x];

  if (!piece) throw new MovementError("MOVE_UNDEFINED_PIECE");

  const vectors = piece.motion.vectors;

  const isValid = vectors.some(vector => {
    const dx = vector.dx;
    const dy = vector.dy;

    let x = current.x + dx;
    let y = current.y + dy;

    if (vector.infinity) {
      while (isInBoard(x, y)) {
        if (next.x === x && next.y === y) return true;
        x += dx;
        y += dy;
      }
    } else if (next.x === x && next.y === y) {
      return true;
    }
    return false;
  });

  if (!isValid) throw new PieceError("INVALID_MOTION_VECTOR");
}
