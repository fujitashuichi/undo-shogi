import { isInsideRange } from "../../../../tools/math/isInsideRange.js";
import { boardConfig } from "../../config/boardConfig.js";
import type { Position } from "../../types/algebraic.types.js";
import type { Side } from "../../types/piece.types.js";
import type { Board } from "../Board.js";

const boardSize = boardConfig.boardSize;

export const promotionZoneRange = (side: Side): [number, number] => {
  if (side === "Sente") {
    return [0, boardConfig.promotionZone - 1];
  }
  return [boardSize - 1, boardSize - boardConfig.promotionZone];
}


export const positionValidator = {
  isInBoard: (x: number, y: number) => {
    if (
      (x < 0 || y < 0) ||
      (x >= boardSize || y >= boardSize)
    ) {
      return false;
    }

    return true;
  },

  isInPromotionZone: (side: Side, position: Position): boolean => {
    return isInsideRange(position.y, promotionZoneRange(side));
  }
}
