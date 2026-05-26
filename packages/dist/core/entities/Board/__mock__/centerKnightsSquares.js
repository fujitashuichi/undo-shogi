// 敵陣側に向かって、5筋に桂馬置く
import { ShogiPiece } from "../../Piece/Piece.js";
const knight = (side) => {
    return new ShogiPiece(side, "Knight");
};
const row_empty = Array(9).fill(undefined);
export const centerKnightsSquares = [
    row_empty,
    row_empty,
    [undefined, undefined, undefined, undefined, knight("Sente"), undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, knight("Sente"), undefined, undefined, undefined, undefined],
    row_empty,
    [undefined, undefined, undefined, undefined, knight("Gote"), undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, knight("Gote"), undefined, undefined, undefined, undefined],
    row_empty,
    row_empty
];
//# sourceMappingURL=centerKnightsSquares.js.map