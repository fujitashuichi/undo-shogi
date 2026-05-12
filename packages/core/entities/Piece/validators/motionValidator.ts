import { MovementError } from "../../../errors/movement.errors.js";
import { PieceError } from "../../../errors/piece.error.js";
import type { Board } from "../../Board/Board.js";
import { positionValidator } from "../../Board/validators/positionValidator.js";
import type { Position } from "../../types/algebraic.types.js";


const assertMotionVector = (board: Board, current: Position, next: Position): void => {
  const piece = board.squares[current.y]![current.x];

  if (!piece) throw new MovementError("MOVE_UNDEFINED_PIECE");

  const vectors = piece.motion.vectors;
  const direction = piece.side === "Sente" ? -1 : 1;

  const isValid = vectors.some(vector => {
    const dx = vector.dx * (direction * -1);
    const dy = vector.dy * direction;

    let x = current.x + dx;
    let y = current.y + dy;

    if (vector.infinity) {
      while (positionValidator.isInBoard(x, y)) {
        if (next.x === x && next.y === y) return true;
        x += dx;
        y += dy;
      }
    } else {
      if (next.x === x && next.y === y) return true;
    }
    return false;
  });

  if (!isValid) throw new PieceError("INVALID_MOTION_VECTOR");
}


const violatesLeapRestriction = (board: Board, current: Position, next: Position): void => {
  const piece = board.squares[current.y]![current.x];

  if (!piece) throw new MovementError("MOVE_UNDEFINED_PIECE");

  const vectors = piece.motion.vectors;
  const direction = piece.side === "Sente" ? -1 : 1;

  for (const vector of vectors) {
    const dx = vector.dx * (direction * -1);
    const dy = vector.dy * direction;

    let x = current.x + dx;
    let y = current.y + dy;
    let collided = false;

    if (vector.infinity) {
      while (positionValidator.isInBoard(x, y)) {
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
  };
}


export const pieceMotionValidator = (board: Board, current: Position, next: Position) => {
  assertMotionVector(board, current, next);
  violatesLeapRestriction(board, current, next);
}
