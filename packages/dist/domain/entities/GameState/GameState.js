import { Board } from "../Board/Board.js";
import { MovementError } from "../errors/movement.errors.js";
import { Hands } from "../Hand/Hands.js";
import { ShogiPieceNormal } from "../Piece/Piece.js";
import { gameState_dropPiece } from "./dropPiece/dropPiece.js";
import { gameState_movePiece } from "./movePiece/movePiece.js";
import { isChecked } from "./validators/checkmate/isChecked.js";
import { isCheckMated } from "./validators/checkmate/isCheckMated.js";
import { positionValidator } from "./validators/positionValidator.js";
export class GameState {
    board;
    hands;
    currentSide;
    checked = null;
    checkMated = null;
    constructor(board, hands, currentSide = "Sente") {
        this.board = board;
        this.hands = hands;
        this.currentSide = currentSide;
        this.checked = isChecked(board, currentSide) ? currentSide : null;
        this.checkMated = isCheckMated(board, hands, currentSide) ? currentSide : null;
    }
    static init = {
        hirate: () => {
            return new GameState(Board.init.hirate(), Hands.init.empty());
        }
    };
    movePiece = (current, next, promote) => {
        if (this.checkMated === this.currentSide)
            throw new MovementError("CHECK_MATED");
        positionValidator.assertInBoard(current.x, current.y);
        positionValidator.assertInBoard(next.x, next.y);
        const targetPiece = this.board.squares[current.y][current.x];
        if (!targetPiece)
            throw new MovementError("MOVE_UNDEFINED_PIECE");
        if (targetPiece.side !== this.currentSide)
            throw new MovementError("MOVE_OPPONENT_SIDES_PIECE");
        return gameState_movePiece(this, current, next, promote);
    };
    dropPiece = (position, kind) => {
        if (this.checkMated === this.currentSide)
            throw new MovementError("CHECK_MATED");
        positionValidator.assertInBoard(position.x, position.y);
        return gameState_dropPiece(this, position, new ShogiPieceNormal(this.currentSide, kind));
    };
}
//# sourceMappingURL=GameState.js.map