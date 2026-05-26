import { ShogiPieceNormal } from "../../../Piece/Piece.js";
import { allPositionInBoard } from "../../../lib/positions/positionsUnderAttack/allPositionsInBoard.js";
import { isChecked } from "../../validators/checkmate/isChecked.js";
const byPiece = (board, hands, kind, side) => {
    if (!hands.allPieceKindsBySide(side).some(k => k === kind)) {
        return [];
    }
    let positions = [];
    allPositionInBoard.forEach(pos => {
        try {
            const nextBoard = board.dropPiece(pos, new ShogiPieceNormal(side, kind));
            if (isChecked(nextBoard, side)) {
                return;
            }
            positions.push(pos);
        }
        catch {
            return;
        }
    });
    return positions;
};
const all = (board, hands, side) => {
    const positionsSet = new Set();
    const pieceKinds = hands.allPieceKindsBySide(side);
    pieceKinds.forEach(kind => {
        const validPositions = byPiece(board, hands, kind, side);
        validPositions.forEach(pos => {
            positionsSet.add(pos);
        });
    });
    return Array.from(positionsSet);
};
export const legalDropPositions_IgnoreDropPawnMate = {
    byPiece,
    all
};
//# sourceMappingURL=ignoreDropPawnMate.js.map