import { legalMovePositions } from "../../lib/legalMovePositions/legalMovePositions.js";
import { legalDropPositions } from "../../lib/legalDropPositions/legalDropPositions.js";
export const isCheckMated = (board, hands, side) => {
    const allLegalMoves = legalMovePositions.all(board, side);
    if (allLegalMoves.length === 0) {
        if (legalDropPositions.all(board, hands, side).length === 0) {
            return true;
        }
    }
    return false;
};
//# sourceMappingURL=isCheckMated.js.map