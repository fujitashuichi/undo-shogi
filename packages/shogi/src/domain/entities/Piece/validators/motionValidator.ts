import { logger } from "@packags/tools";
import { isInsideRange } from "../../../../tools/math/isInsideRange.js";
import type { Board } from "../../Board/Board.js";
import { boardConfig } from "../../config/boardConfig.js";
import { MovementError } from "../../errors/movement.errors.js";
import { PieceError } from "../../errors/piece.error.js";
import { isInBoard } from "../../lib/positions/isInArea/isInBoard.js";
import type { Position } from "@/schemas/primitive/algebraic.js";


const boardSize = boardConfig.boardSize;


const assertMotionVector = (board: Board, current: Position, next: Position): void => {
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

  for (const vector of vectors) {
    const dx = vector.dx;
    const dy = vector.dy;

    let x = current.x + dx;
    let y = current.y + dy;
    let collided = false;

    if (vector.infinity) {
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
  };
}

const assertForcedPromotion = (board: Board, current: Position, next: Position, promote: boolean): void => {
  if (promote) return;

  const piece = board.squares[current.y]![current.x];

  if (!piece) throw new MovementError("MOVE_UNDEFINED_PIECE");

  const side = piece.side;

  const endOfBoardY = side === "Sente" ? 0 : boardSize - 1;
  if (
    (piece.kind === "Pawn" || piece.kind === "Lance") &&
    next.y === endOfBoardY
  ) {
    logger.warn("歩・香は、敵陣一段目では成らなければなりません。");
    throw new MovementError("FORCED_PROMOTION");
  }

  const endOfBoardYRangeTwo: [number, number] = side === "Sente" ? [0, 1] : [boardSize - 1, boardSize - 2];
  if (
    piece.kind === "Knight" &&
    isInsideRange(next.y, endOfBoardYRangeTwo)
  ) {
    logger.warn("桂は、敵陣二段目以内では成らなければなりません。");
    throw new MovementError("FORCED_PROMOTION")
  }
}


export const pieceMotionValidator = (board: Board, current: Position, next: Position, promote: boolean) => {
  assertMotionVector(board, current, next);
  violatesLeapRestriction(board, current, next);
  assertForcedPromotion(board, current, next, promote);
}
