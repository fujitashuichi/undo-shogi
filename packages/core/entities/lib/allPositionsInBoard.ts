import { boardConfig } from "../config/boardConfig.js";
import type { Position } from "../types/algebraic.types.js";


const boardSize = boardConfig.boardSize;

let positions: Position[] = [];

for (let y = 0; y < boardSize; y++) {
  for (let x = 0; x < boardSize; x++) {
    positions.push({ x, y });
  }
}


export const allPositionInBoard = positions;
