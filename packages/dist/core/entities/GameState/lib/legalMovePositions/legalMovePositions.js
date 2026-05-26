import { MovementError } from "../../../../errors/movement.errors.js";
import { positionsUnderAttack } from "../../../lib/positions/positionsUnderAttack/positionsUnderAttack.js";
import { searchPiecesBySide } from "../../../lib/searchPiecesBySide.js";
import { isChecked } from "../../validators/checkmate/isChecked.js";
const byPiece = (board, piecePos) => {
    let legalPosList = [];
    const piece = board.squares[piecePos.y][piecePos.x];
    if (!piece)
        throw new MovementError("MOVE_UNDEFINED_PIECE");
    const underAttack = positionsUnderAttack.byPiece(board, piecePos);
    underAttack.forEach(pos => {
        // ここでは駒の位置だけが必要であるため、promote: boolean はどちらでもよい
        try {
            const checked = isChecked(board.movePiece(piecePos, pos, false), piece.side);
            if (!checked) {
                legalPosList.push(pos);
            }
        }
        catch { }
    });
    return legalPosList;
};
const all = (board, side) => {
    let legalPosList = [];
    const piecesPos = searchPiecesBySide.returnPositions(board, side);
    piecesPos.forEach(pos => {
        legalPosList.push(...byPiece(board, pos));
    });
    // 重複排除
    const uniqueMap = new Map(legalPosList.map(p => [`${p.x},${p.y}`, p]));
    return [...uniqueMap.values()];
};
export const legalMovePositions = {
    byPiece,
    all
};
//# sourceMappingURL=legalMovePositions.js.map