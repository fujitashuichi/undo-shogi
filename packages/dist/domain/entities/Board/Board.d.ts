import type { FixedLengthArray } from "../../../tools/index.js";
import type { ShogiPiece, ShogiPieceNormal } from "../Piece/Piece.js";
import type { Position } from "../types/algebraic.types.js";
type Squares = FixedLengthArray<FixedLengthArray<ShogiPiece | undefined, 9>, 9>;
export declare class Board {
    readonly squares: Squares;
    constructor(squares: Squares);
    static init: {
        hirate: () => Board;
    };
    readonly movePiece: (current: Position, next: Position, promote: boolean) => Board;
    readonly dropPiece: (position: Position, piece: ShogiPieceNormal) => Board;
}
export {};
//# sourceMappingURL=Board.d.ts.map