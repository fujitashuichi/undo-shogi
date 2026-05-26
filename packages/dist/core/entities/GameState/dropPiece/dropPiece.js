import { MovementError } from "../../../errors/movement.errors.js";
import { GameState } from "../GameState.js";
import { isChecked } from "../validators/checkmate/isChecked.js";
export const gameState_dropPiece = (gameState, position, piece) => {
    const nextBoard = gameState.board.dropPiece(position, piece);
    const nextHands = gameState.hands.takePiece(gameState.currentSide, piece.kind);
    const nextSide = gameState.currentSide === "Sente" ? "Gote" : "Sente";
    // 王手放置
    if (isChecked(nextBoard, gameState.currentSide)) {
        throw new MovementError("SELF_CHECKED");
    }
    ;
    return new GameState(nextBoard, nextHands, nextSide);
};
//# sourceMappingURL=dropPiece.js.map