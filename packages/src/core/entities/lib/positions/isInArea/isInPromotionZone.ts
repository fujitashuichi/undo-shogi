import { isInsideRange } from "../../../../tools/math/isInsideRange.js";
import { boardConfig } from "../../../config/boardConfig.js";
import type { Position } from "../../../types/algebraic.types.js";
import type { Side } from "../../../types/piece.types.js";


const boardSize = boardConfig.boardSize;
const promotionZone = boardConfig.promotionZone;


const promotionZoneRange = (side: Side): [number, number] => {
  if (side === "Sente") {
    return [0, promotionZone - 1];
  }
  return [boardSize - 1, boardSize - promotionZone];
}


export const isInPromotionZone = (side: Side, position: Position): boolean => {
  if (!isInsideRange(position.y, promotionZoneRange(side))) {
    return false;
  };
  return true;
}