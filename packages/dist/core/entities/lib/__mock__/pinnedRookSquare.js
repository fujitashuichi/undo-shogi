import { ShogiPiece } from "../../Piece/Piece.js";
const row_empty = Array(9).fill(undefined);
export const pinnedRookSquares = [
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    [undefined, undefined, new ShogiPiece("Gote", "Bishop"), undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, new ShogiPiece("Sente", "Rook"), undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "King"), undefined, undefined, undefined, undefined]
];
//# sourceMappingURL=pinnedRookSquare.js.map