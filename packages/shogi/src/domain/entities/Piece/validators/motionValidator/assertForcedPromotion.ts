import { boardConfig } from "@/config/boardConfig.js";
import type { Board } from "@/domain/entities/Board/Board.js";
import { MovementError } from "@/domain/entities/errors/movementErrors.js";
import type { Position } from "@/schemas/primitive/algebraic.js";
import { isInsideRange } from "@/tools/math/isInsideRange.js";
import { logger } from "@packages/tools";


const { boardSize } = boardConfig;

export const assertForcedPromotion = (board: Board, current: Position, next: Position, promote: boolean): void => {
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
