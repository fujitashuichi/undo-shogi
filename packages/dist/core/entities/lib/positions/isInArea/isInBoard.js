import { boardConfig } from "../../../config/boardConfig.js";
const boardSize = boardConfig.boardSize;
export const isInBoard = (x, y) => {
    if ((x < 0 || y < 0) ||
        (x >= boardSize || y >= boardSize)) {
        return false;
    }
    return true;
};
//# sourceMappingURL=isInBoard.js.map