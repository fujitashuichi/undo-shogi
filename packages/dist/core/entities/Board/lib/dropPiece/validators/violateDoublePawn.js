import { ShogiRulesError } from "../../../../../errors/shogiRules.error.js";
import { boardConfig } from "../../../../config/boardConfig.js";
const boardSize = boardConfig.boardSize;
export const violateDoublePawn = (board, positionDropped, side) => {
    let pawnsPosList = [];
    for (let y = 0; y < boardSize; y++) {
        const square = board.squares[y][positionDropped.x];
        // 持ち駒を打った側の 歩 のみカウントする
        const isCountablePawn = (square &&
            square.kind === "Pawn" &&
            square.side === side) || (y === positionDropped.y);
        if (isCountablePawn) {
            pawnsPosList.push({ x: positionDropped.x, y });
            if (pawnsPosList.length > 1) {
                throw new ShogiRulesError("DOUBLE_PAWN");
            }
        }
        ;
    }
};
//# sourceMappingURL=violateDoublePawn.js.map