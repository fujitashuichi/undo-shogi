// memo: 目的の駒自身を効きから省く → 「自分sideの駒がある場所を省く」に含まれるため不要
import { searchPiecesBySide } from "../../searchPiecesBySide.js";
import { isInBoard } from "../isInArea/isInBoard.js";
import { byPiece_Infinity } from "./byPiece_Infinity.js";
const byPiece = (board, piecePos) => {
    let positionsUnderAttack = [];
    const piece = board.squares[piecePos.y][piecePos.x];
    if (!piece)
        return [];
    const vectors = piece.motion.vectors;
    vectors.forEach(vector => {
        const dx = vector.dx;
        const dy = vector.dy;
        let x = piecePos.x + dx;
        let y = piecePos.y + dy;
        if (vector.infinity) {
            byPiece_Infinity(board, piece, x, y, dx, dy, positionsUnderAttack);
        }
        else {
            if (isInBoard(x, y)) {
                const square = board.squares[y][x];
                if (square &&
                    square.side !== piece.side) {
                    positionsUnderAttack.push({ x, y });
                }
                ;
                if (!square) {
                    positionsUnderAttack.push({ x, y });
                }
            }
            ;
        }
        ;
    });
    return positionsUnderAttack;
};
const all = (board, side) => {
    let positionsUnderAttack = [];
    const piecePosList = searchPiecesBySide.returnPositions(board, side);
    piecePosList.forEach(pos => {
        positionsUnderAttack.push(...byPiece(board, pos));
    });
    return positionsUnderAttack;
};
export const positionsUnderAttack = {
    byPiece,
    all
};
//# sourceMappingURL=positionsUnderAttack.js.map