import { isInsideRange } from "../../../../tools/math/isInsideRange.js";
import { MovementError } from "../../../errors/movement.errors.js";
import { boardConfig } from "../../config/boardConfig.js";
import type { Position } from "../../types/algebraic.types.js";
import type { Side } from "../../types/piece.types.js";


const boardSize = boardConfig.boardSize;

export const promotionZoneRange = (side: Side): [number, number] => {
  if (side === "Sente") {
    return [0, boardConfig.promotionZone - 1];
  }
  return [boardSize - 1, boardSize - boardConfig.promotionZone];
}


export const positionValidator = {
  assertInBoard: (x: number, y: number) => {
    if (
      (x < 0 || y < 0) ||
      (x >= boardSize || y >= boardSize)
    ) {
      throw new MovementError("MOVE_TO_INVALID_SQUARE");
    }

    return true;
  },

  isInPromotionZone: (side: Side, position: Position): boolean => {
    if (!isInsideRange(position.y, promotionZoneRange(side))) {
      return false;
    };
    return true;
  }
}
