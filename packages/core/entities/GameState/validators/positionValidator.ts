import { logger } from "../../../../tools/index.js";
import { isInsideRange } from "../../../../tools/math/isInsideRange.js";
import { MovementError } from "../../../errors/movement.errors.js";
import { boardConfig } from "../../config/boardConfig.js";
import { isInBoard } from "../../lib/positions/isInArea/isInBoard.js";
import type { Position } from "../../types/algebraic.types.js";
import type { Side } from "../../types/piece.types.js";


const boardSize = boardConfig.boardSize;


export const positionValidator = {
  assertInBoard: (x: number, y: number): void => {
    if (!isInBoard(x, y)) {
      logger.error(`{ x: ${x}, y: ${y} } は盤外です。`);
      throw new MovementError("MOVE_TO_INVALID_SQUARE");
    }
  }
}
