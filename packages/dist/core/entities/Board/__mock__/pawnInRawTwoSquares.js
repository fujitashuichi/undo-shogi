// 敵陣二段目に歩を置く配置
import { ShogiPiece } from "../../Piece/Piece.js";
const pawn = (side) => {
    return new ShogiPiece(side, "Pawn");
};
const row_empty = Array(9).fill(undefined);
export const pawnInRowTwoSquares = [
    row_empty,
    [pawn("Sente"), pawn("Sente"), pawn("Sente"), pawn("Sente"), pawn("Sente"), pawn("Sente"), pawn("Sente"), pawn("Sente"), pawn("Sente")],
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    [pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote"), pawn("Gote")],
    row_empty
];
//# sourceMappingURL=pawnInRawTwoSquares.js.map