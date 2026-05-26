import { ShogiPiece } from "../../../Piece/Piece.js";
const pawn = (side) => {
    return new ShogiPiece(side, "Pawn");
};
const row_empty = Array(9).fill(undefined);
export const atamakinSquares = [
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    [new ShogiPiece("Gote", "Rook"), undefined, undefined, undefined, new ShogiPiece("Gote", "Gold"), undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "King"), undefined, undefined, undefined, undefined]
];
//# sourceMappingURL=atamakinSquares.js.map