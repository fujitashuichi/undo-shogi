import { MovementError } from "../../../../../errors/movement.errors.js";
import { pieceMotionValidator } from "../../../../Piece/validators/motionValidator.js";
import { isInPromotionZone } from "../../../../lib/positions/isInArea/isInPromotionZone.js";
import { logger } from "../../../../../../tools/index.js";
export const moveValidator = {
    assertCanMove: (board, current, next, promote) => {
        pieceMotionValidator(board, current, next, promote);
        const movingPiece = board.squares[current.y][current.x];
        if (!movingPiece) {
            throw new MovementError("MOVE_UNDEFINED_PIECE");
        }
        const pieceInTargetSquare = board.squares[next.y][next.x];
        if (pieceInTargetSquare && (pieceInTargetSquare.side === movingPiece.side)) {
            logger.error("味方の駒がいる場所には移動できません。");
            throw new MovementError("MOVE_TO_INVALID_SQUARE");
        }
        if (promote)
            moveValidator.assertCanPromote(movingPiece.side, current, next);
    },
    canMove: (board, current, next, promote) => {
        try {
            moveValidator.assertCanMove(board, current, next, promote);
            return true;
        }
        catch {
            return false;
        }
    },
    assertCanPromote: (side, current, next) => {
        if (!isInPromotionZone(side, current) &&
            !isInPromotionZone(side, next)) {
            logger.error("相手陣地に入るか相手陣地から動かないと成りはできません。");
            throw new MovementError("INVALID_PROMOTION");
        }
    }
};
//# sourceMappingURL=moveValidator.js.map