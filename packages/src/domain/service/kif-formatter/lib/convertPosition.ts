import { boardConfig } from "../../../entities/config/boardConfig.js";
import type { Position } from "../../../entities/types/algebraic.types.js";
import type { KifPosition } from "../../types/types.js";


const boardSize = boardConfig.boardSize;


export const convertPosition = {
  kifToLogicPosition: (kifPos: KifPosition): Position => {
    return {
      x: boardSize - kifPos.x,
      y: kifPos.y - 1
    }
  },

  logicToKifPosition: (logicPos: Position): KifPosition => {
    return {
      x: boardSize - logicPos.x,
      y: logicPos.y + 1
    }
  }
}
