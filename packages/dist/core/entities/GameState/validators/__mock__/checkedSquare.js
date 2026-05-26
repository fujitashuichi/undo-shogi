import { ShogiPiece } from "../../../Piece/Piece.js";
const pawn = (side) => {
    return new ShogiPiece(side, "Pawn");
};
const row_empty = Array(9).fill(undefined);
export const checkedSquares = [
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    [pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote")],
    [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "King"), undefined, undefined, undefined, undefined]
];
//# sourceMappingURL=checkedSquare.js.map