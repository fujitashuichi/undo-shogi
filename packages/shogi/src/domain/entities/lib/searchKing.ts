import type { Side } from "@/schemas/primitive/players.js";
import type { Board } from "../Board/Board.js";
import { boardConfig } from "../config/boardConfig.js";
import type { Position } from "@/schemas/primitive/algebraic.js";


const boardSize = boardConfig.boardSize;


export const searchKingPosition = (board: Board, side: Side): Position | undefined => {
  let kingPosition = undefined;

  outerLoop:
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const square = board.squares[y]![x];

      if (
        square?.kind === "King" && square.side === side
      ) {
        kingPosition = { x, y };
        break outerLoop;
      }
    }
  }

  return kingPosition;
}
