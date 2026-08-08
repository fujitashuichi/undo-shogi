import type { Board } from "@/domain/entities/Board/Board.js";
import { MovementError } from "@/domain/entities/errors/movementErrors.js";
import { PieceError } from "@/domain/entities/errors/pieceError.js";
import { isInBoard } from "@/domain/entities/lib/positions/isInArea/isInBoard.js";
import type { Position } from "@/schemas/primitive/algebraic.js";

const checkVector = (board: Board, current: Position, next: Position, dx: number, dy: number, infinity: boolean) => {
  let x = current.x + dx;
  let y = current.y + dy;
  let collided = false;

  if (infinity) {
    while (isInBoard(x, y)) {
      // 目的の地点についたときに、過去に他の駒と衝突しているということは追い越しが行われている。
      if (next.x === x && next.y === y) {
        if (collided) throw new PieceError("LEAP_RESTRICTION");
        return;
      }

      if (board.squares[y]![x]) {
        collided = true;
      }

      x += dx;
      y += dy;
    }
  };
}


export const violatesLeapRestriction = (board: Board, current: Position, next: Position): void => {
  const piece = board.squares[current.y]![current.x];

  if (!piece) throw new MovementError("MOVE_UNDEFINED_PIECE");

  const vectors = piece.motion.vectors;

  for (const vector of vectors) {
    checkVector(
      board, current, next,
      vector.dx, vector.dy, vector.infinity
    );
  };
}
