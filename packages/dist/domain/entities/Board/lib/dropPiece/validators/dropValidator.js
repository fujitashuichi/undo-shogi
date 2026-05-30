import { isInsideRange } from "../../../../../../tools/math/isInsideRange.js";
import { boardConfig } from "../../../../config/boardConfig.js";
import { MovementError } from "../../../../errors/movement.errors.js";
import { ShogiPieceNormal } from "../../../../Piece/Piece.js";
import { violateDoublePawn } from "./violateDoublePawn.js";
const boardSize = boardConfig.boardSize;
export const dropValidator = {
    assertCanDrop: (board, position, piece) => {
        const pieceInTargetSquare = board.squares[position.y][position.x];
        if (pieceInTargetSquare) {
            throw new MovementError("DROP_TO_INVALID_SQUARE");
        }
        if (piece.kind === "Knight") {
            const invalidYRange = piece.side === "Sente" ? [0, 1] : [boardSize - 1, boardSize - 2];
            if (isInsideRange(position.y, invalidYRange)) {
                throw new MovementError("DROP_TO_INVALID_SQUARE");
            }
        }
        if (piece.kind === "Lance" || piece.kind === "Pawn") {
            const invalidY = piece.side === "Sente" ? 0 : boardSize - 1;
            if (position.y === invalidY) {
                throw new MovementError("DROP_TO_INVALID_SQUARE");
            }
        }
        if (piece.kind === "Pawn") {
            violateDoublePawn(board, position, piece.side);
        }
    },
    canDrop: (board, position, piece) => {
        try {
            dropValidator.assertCanDrop(board, position, piece);
            return true;
        }
        catch {
            return false;
        }
    }
};
//# sourceMappingURL=dropValidator.js.map