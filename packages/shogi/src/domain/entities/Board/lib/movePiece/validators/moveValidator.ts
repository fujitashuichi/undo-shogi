import type { ShogiPiece } from "../../../../Piece/Piece.js";
import type { Position } from "../../../../types/algebraic.types.js";
import type { Board } from "../../../Board.js";
import { pieceMotionValidator } from "../../../../Piece/validators/motionValidator.js";
import { isInPromotionZone } from "../../../../lib/positions/isInArea/isInPromotionZone.js";
import { MovementError } from "../../../../errors/movement.errors.js";
import type { Side } from "../../../../types/players.types.js";
import { logger } from "@shared";


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
