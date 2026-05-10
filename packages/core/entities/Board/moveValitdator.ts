import { logger } from "../../../tools/index.js";
import { MovementError } from "../../errors/movement.errors.js";
import { boardConfig } from "../config/boardConfig.js";
import type { ShogiPiece } from "../Piece.js";
import type { Position } from "../types/algebraic.types.js";
import type { Board } from "./Board.js";


const boardSize = boardConfig.boardSize;

export const moveValidator = {
  canMove: (board: Board, current: Position, next: Position) => {
    const movingPiece: ShogiPiece | undefined = board.squares[current.y]![current.x];

    if (!movingPiece) {
      throw new MovementError("MOVE_UNDEFINED_PIECE");
    }

    if (
      (next.x < 0 || next.y < 0) ||
      (next.x > boardSize || next.y > boardSize)
    ) {
      logger.error("盤の範囲外です。");
      throw new MovementError("MOVE_TO_INVALID_SQUARE");
    }

    const pieceInTargetSquare = board.squares[next.y]![next.x];
    if (pieceInTargetSquare && (pieceInTargetSquare.side === movingPiece.side)) {
      logger.error("味方の駒がいる場所には移動できません。");
      throw new MovementError("MOVE_TO_INVALID_SQUARE");
    }
  }
}
