import type { Board } from "../../../Board/Board.js";
import type { Position } from "../../../types/algebraic.types.js";
import type { Side } from "../../../types/piece.types.js";
export declare const positionsUnderAttack: {
    byPiece: (board: Board, piecePos: Position) => Position[];
    all: (board: Board, side: Side) => Position[];
};
//# sourceMappingURL=positionsUnderAttack.d.ts.map