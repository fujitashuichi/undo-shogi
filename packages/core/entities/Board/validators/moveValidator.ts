import { logger } from "../../../../tools/index.js";
import { MovementError } from "../../../errors/movement.errors.js";
import type { ShogiPiece } from "../../Piece/Piece.js";
import type { Position } from "../../types/algebraic.types.js";
import type { Board } from "../Board.js";
import type { Side } from "../../types/piece.types.js";
import { isInsideRange } from "../../../../tools/math/isInsideRange.js";
import { positionValidator } from "./positionValidator.js";
import { pieceMotionValidator } from "../../Piece/validators/motionValidator.js";
import { ShogiRulesValidator } from "../../rules/shogiRulesValidator.js";


export const moveValidator = {
  canMove: (board: Board, current: Position, next: Position) => {
    positionValidator.assertInBoard(current.x, current.y);
    positionValidator.assertInBoard(next.x, next.y);

    pieceMotionValidator(board, current, next);

    const movingPiece: ShogiPiece | undefined = board.squares[current.y]![current.x];

    if (!movingPiece) {
      throw new MovementError("MOVE_UNDEFINED_PIECE");
    }

    const pieceInTargetSquare = board.squares[next.y]![next.x];
    if (pieceInTargetSquare && (pieceInTargetSquare.side === movingPiece.side)) {
      logger.error("味方の駒がいる場所には移動できません。");
      throw new MovementError("MOVE_TO_INVALID_SQUARE");
    }

    return true;
  },

  canDrop: (board: Board, position: Position, piece: ShogiPiece) => {
    positionValidator.assertInBoard(position.x, position.y);
    const pieceInTargetSquare = board.squares[position.y]![position.x];

    if (pieceInTargetSquare) {
      logger.error("そのマスには駒が存在するため持ち駒を打てません。");
      throw new MovementError("DROP_TO_INVALID_SQUARE");
    }


    if (piece.kind === "Knight") {
      // 桂馬は相手陣地2段目以内に打てません（移動不能な駒となるため）
      const invalidYRange: [number, number] = piece.side === "Sente" ? [0, 1] : [8, 7];
      if (isInsideRange(position.y, invalidYRange)) {
        throw new MovementError("DROP_TO_INVALID_SQUARE");
      }
    }

    if (piece.kind === "Lance" || piece.kind === "Pawn") {
      // 前にしか動けない駒は、最下段に打てません（移動不能な駒となるため）
      const invalidY = piece.side === "Sente" ? 0 : 8;
      if (position.y === invalidY) {
        throw new MovementError("DROP_TO_INVALID_SQUARE");
      }
    }

    if (piece.kind === "Pawn") {
      ShogiRulesValidator.violateDoublePawn(board, position, piece.side);
    }

    return true;
  },

  canPromote: (side: Side, currentPos: Position, nextPos: Position) => {
    // 既に持ち駒が直接成らないように定義しているためバリデーションは不要

    if (
      !positionValidator.isInPromotionZone(side, currentPos) &&
      !positionValidator.isInPromotionZone(side, nextPos)
    ) {
      logger.error("相手陣地に入るか相手陣地から動かないと成りはできません。");
      throw new MovementError("INVALID_PROMOTION");
    }

    return true;
  }
}
