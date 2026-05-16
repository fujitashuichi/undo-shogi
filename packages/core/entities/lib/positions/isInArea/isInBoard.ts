import { boardConfig } from "../../../config/boardConfig.js";


const boardSize = boardConfig.boardSize;


export const isInBoard = (x: number, y: number): boolean => {
  if (
    (x < 0 || y < 0) ||
    (x >= boardSize || y >= boardSize)
  ) {
    return false;
  }

  return true;
};
