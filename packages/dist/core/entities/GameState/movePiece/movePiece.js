import { MovementError } from "../../../errors/movement.errors.js";
import { boardDebugger } from "../../Board/__debug__/Board.debug.js";
import { GameState } from "../GameState.js";
import { isChecked } from "../validators/checkmate/isChecked.js";
export const gameState_movePiece = (gameState, current, next, promote) => {
    const pieceInNextPos = gameState.board.squares[next.y][next.x];
    let nextHands = gameState.hands;
    if (pieceInNextPos) {
        nextHands = gameState.hands.addPiece(gameState.currentSide, pieceInNextPos.disPromote().kind);
    }
    const nextBoard = gameState.board.movePiece(current, next, promote);
    const nextSide = gameState.currentSide === "Sente" ? "Gote" : "Sente";
    // 王手放置
    if (isChecked(nextBoard, gameState.currentSide)) {
        throw new MovementError("SELF_CHECKED");
    }
    ;
    return new GameState(nextBoard, nextHands, nextSide);
};
//# sourceMappingURL=movePiece.js.map