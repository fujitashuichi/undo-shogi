import { isInBoard } from "../isInArea/isInBoard.js";
export const byPiece_Infinity = (board, piece, x, y, dx, dy, positionsUnderAttack) => {
    let collided = false;
    if (!isInBoard(x, y))
        return;
    const firstSquare = board.squares[y][x];
    if (firstSquare) {
        collided = true;
        if (firstSquare.side !== piece.side) {
            positionsUnderAttack.push({ x, y });
        }
    }
    while (!collided && isInBoard(x, y)) {
        if (isInBoard(x, y)) {
            const square = board.squares[y][x];
            if (square) {
                collided = true;
                if (square.side !== piece.side) {
                    positionsUnderAttack.push({ x, y });
                }
            }
            ;
            if (!square) {
                positionsUnderAttack.push({ x, y });
            }
        }
        x += dx;
        y += dy;
    }
};
//# sourceMappingURL=byPiece_Infinity.js.map