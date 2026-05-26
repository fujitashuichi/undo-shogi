import { ShogiPiece } from "../../../Piece/Piece.js";
const row_empty = Array(9).fill(undefined);
export const longRangeCheckedSquares_Bishop = [
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    [new ShogiPiece("Gote", "Bishop"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    row_empty,
    row_empty,
    row_empty,
    [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "King"), undefined, undefined, undefined, undefined]
];
//# sourceMappingURL=longRangeCheckSquares_Bishop.js.map