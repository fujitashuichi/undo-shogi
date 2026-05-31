import { positionsUnderAttack } from "../../../lib/positions/positionsUnderAttack/positionsUnderAttack.js";
import { searchKingPosition } from "../../../lib/searchKing.js";
export const isChecked = (board, side) => {
    const kingPos = searchKingPosition(board, side);
    if (!kingPos)
        return false;
    const underAttack = positionsUnderAttack.all(board, side === "Sente" ? "Gote" : "Sente");
    return underAttack.some(pos => pos.x === kingPos.x && pos.y === kingPos.y);
};
//# sourceMappingURL=isChecked.js.map