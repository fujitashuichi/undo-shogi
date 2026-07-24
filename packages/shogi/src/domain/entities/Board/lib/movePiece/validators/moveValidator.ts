import { logger } from "@packages/tools";
import type { Board } from "../../../Board.js";
import type { ShogiPiece } from "@/domain/entities/Piece/Piece.js";
import type { Position } from "@/schemas/primitive/algebraic.js";
import type { Side } from "@/schemas/primitive/players.js";
import { pieceMotionValidator } from "@/domain/entities/Piece/validators/motionValidator.js";
import { MovementError } from "@/domain/entities/errors/movementErrors.js";
import { isInPromotionZone } from "@/domain/entities/lib/positions/isInArea/isInPromotionZone.js";


export const moveValidator = {
  assertCanMove: (board: Board, current: Position, next: Position, promote: boolean): void => {
    pieceMotionValidator(board, current, next, promote);

    const movingPiece: ShogiPiece | undefined = board.squares[current.y]![current.x];

    if (!movingPiece) {
      throw new MovementError("MOVE_UNDEFINED_PIECE");
    }

    const pieceInTargetSquare = board.squares[next.y]![next.x];
    if (pieceInTargetSquare && (pieceInTargetSquare.side === movingPiece.side)) {
      logger.error("味方の駒がいる場所には移動できません。");
      throw new MovementError("MOVE_TO_INVALID_SQUARE");
    }

    if (promote) moveValidator.assertCanPromote(movingPiece.side, current, next);
  },

  canMove: (board: Board, current: Position, next: Position, promote: boolean): boolean => {
    try {
      moveValidator.assertCanMove(board, current, next, promote);
      return true;
    } catch {
      return false;
    }
  },

  assertCanPromote: (side: Side, current: Position, next: Position): void => {
    if (
      !isInPromotionZone(side, current) &&
      !isInPromotionZone(side, next)
    ) {
      logger.error("相手陣地に入るか相手陣地から動かないと成りはできません。");
      throw new MovementError("INVALID_PROMOTION");
    }
  }
}
