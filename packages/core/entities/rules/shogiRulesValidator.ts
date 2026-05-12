import { logger } from "../../../tools/index.js";
import { ShogiRulesError } from "../../errors/shogiRules.error.js";
import type { Board } from "../Board/Board.js";
import { boardConfig } from "../config/boardConfig.js";
import type { ShogiPiece } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";


const boardSize = boardConfig.boardSize;


export const ShogiRulesValidator = {
  violateDoublePawn: (board: Board, positionDropped: Position, side: Side): void => {
    let pawnsPosList: Position[] = [];

    for (let y = 0; y < boardSize; y++) {
      const square: ShogiPiece | undefined = board.squares[y]![positionDropped.x];

      // 持ち駒を打った側の 歩 のみカウントする
      const isCountablePawn = (
        square &&
        square!.kind === "Pawn" &&
        square!.side === side
      ) || (
        y === positionDropped.y
      );

      if (isCountablePawn) {
        pawnsPosList.push({ x: positionDropped.x, y });

        if (pawnsPosList.length > 1) {
          console.log(`2歩はこの座標で起こっています: ${pawnsPosList.map(pos => JSON.stringify(pos))}`);
          throw new ShogiRulesError("DOUBLE_PAWN");
        }
      };
    }
  }
}
