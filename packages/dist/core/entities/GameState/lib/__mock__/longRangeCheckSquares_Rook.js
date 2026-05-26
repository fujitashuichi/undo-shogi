import { ShogiPiece } from "../../../Piece/Piece.js";
const row_empty = Array(9).fill(undefined);
export const longRangeCheckedSquares_Rook = [
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    [new ShogiPiece("Gote", "Rook"), undefined, undefined, undefined, new ShogiPiece("Sente", "King"), undefined, undefined, undefined, undefined]
];
//# sourceMappingURL=longRangeCheckSquares_Rook.js.map