import { legalDropPositions_IgnoreDropPawnMate } from "./ignoreDropPawnMate.js";
import { isPawnMateDrop } from "./isPawnMateDrop.js";
const byPiece = (board, hands, kind, side) => {
    if (!hands.allPieceKindsBySide(side).some(k => k === kind)) {
        return [];
    }
    const positions = legalDropPositions_IgnoreDropPawnMate.byPiece(board, hands, kind, side);
    return positions.filter(pos => {
        return !isPawnMateDrop(board, hands, side, pos, kind);
    });
};
const all = (board, hands, side) => {
    let legalPosList = [];
    const pieceKinds = hands.allPieceKindsBySide(side);
    pieceKinds.forEach(kind => {
        legalPosList.push(...byPiece(board, hands, kind, side));
    });
    const uniqueMap = new Map(legalPosList.map(p => [`${p.x},${p.y}`, p]));
    return [...uniqueMap.values()];
};
export const legalDropPositions = {
    byPiece,
    all
};
//# sourceMappingURL=legalDropPositions.js.map