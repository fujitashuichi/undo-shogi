import { hirateSquares } from "./hirateSquares.js";
import { board_dropPiece } from "./lib/dropPiece/dropPiece.js";
import { board_movePiece } from "./lib/movePiece/movePiece.js";
export class Board {
    squares;
    constructor(squares) {
        this.squares = squares;
    }
    static init = {
        hirate: () => {
            return new Board(hirateSquares);
        }
    };
    movePiece = (current, next, promote) => {
        return board_movePiece(this, current, next, promote);
    };
    dropPiece = (position, piece) => {
        return board_dropPiece(this, position, piece);
    };
}
//# sourceMappingURL=Board.js.map