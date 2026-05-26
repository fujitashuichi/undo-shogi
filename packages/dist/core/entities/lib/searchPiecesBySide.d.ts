import type { Board } from "../Board/Board.js";
import type { ShogiPiece } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
import type { Side } from "../types/piece.types.js";
export declare const searchPiecesBySide: {
    returnInstances: (board: Board, side: Side) => ShogiPiece[];
    returnPositions: (board: Board, side: Side) => Position[];
};
//# sourceMappingURL=searchPiecesBySide.d.ts.map