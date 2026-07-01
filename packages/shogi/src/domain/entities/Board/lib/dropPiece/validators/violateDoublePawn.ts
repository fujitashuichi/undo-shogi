import type { Board } from "../../../Board.js";
import { boardConfig } from "../../../../config/boardConfig.js";
import type { ShogiPiece } from "../../../../Piece/Piece.js";
import { ShogiRulesError } from "../../../../errors/shogiRules.error.js";
import type { Position } from "@/schemas/primitive/algebraic.js";
import type { Side } from "@/schemas/primitive/players.js";


const boardSize = boardConfig.boardSize;


export const violateDoublePawn = (board: Board, positionDropped: Position, side: Side): void => {
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
        throw new ShogiRulesError("DOUBLE_PAWN");
      }
    };
  }
}
