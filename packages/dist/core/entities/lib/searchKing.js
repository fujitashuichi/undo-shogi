import { boardConfig } from "../config/boardConfig.js";
const boardSize = boardConfig.boardSize;
export const searchKingPosition = (board, side) => {
    let kingPosition = undefined;
    outerLoop: for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const square = board.squares[y][x];
            if (square &&
                square.kind === "King" &&
                square.side === side) {
                kingPosition = { x, y };
                break outerLoop;
            }
        }
    }
    return kingPosition;
};
//# sourceMappingURL=searchKing.js.map