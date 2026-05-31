import { ShogiPieceNormal } from "../../../../Piece/Piece.js";
import type { Position } from "../../../../types/algebraic.types.js";
import type { Board } from "../../../Board.js";
export declare const dropValidator: {
    assertCanDrop: (board: Board, position: Position, piece: ShogiPieceNormal) => void;
    canDrop: (board: Board, position: Position, piece: ShogiPieceNormal) => boolean;
};
//# sourceMappingURL=dropValidator.d.ts.map