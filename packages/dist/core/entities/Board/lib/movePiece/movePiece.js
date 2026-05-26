import { MovementError } from "../../../../errors/movement.errors.js";
import { Board } from "../../Board.js";
import { moveValidator } from "./validators/moveValidator.js";
export const board_movePiece = (board, current, next, promote) => {
    moveValidator.assertCanMove(board, current, next, promote);
    let targetPiece = board.squares[current.y][current.x];
    if (!targetPiece)
        throw new MovementError("MOVE_UNDEFINED_PIECE");
    if (promote) {
        targetPiece = targetPiece.promote();
    }
    const nextSquares = board.squares.map((row, yIdx) => row.map((piece, xIdx) => {
        if (yIdx === next.y && xIdx === next.x)
            return targetPiece;
        if (yIdx === current.y && xIdx === current.x)
            return undefined;
        return piece;
    }));
    return new Board(nextSquares);
};
//# sourceMappingURL=movePiece.js.map