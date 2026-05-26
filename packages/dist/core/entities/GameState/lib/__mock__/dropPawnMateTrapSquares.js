import { ShogiPiece } from "../../../Piece/Piece.js";
const row_empty = Array(9).fill(undefined);
export const dropPawnMateTrapSquares = [
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, new ShogiPiece("Gote", "Knight"), new ShogiPiece("Gote", "King")],
    row_empty,
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "Silver"), undefined],
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "King"), undefined, undefined, undefined, undefined]
];
//# sourceMappingURL=dropPawnMateTrapSquares.js.map