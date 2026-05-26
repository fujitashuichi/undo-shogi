// 5五角のみを置いておく初期配置
import { ShogiPiece } from "../../Piece/Piece.js";
const row_1 = [new ShogiPiece("Gote", "Lance"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, new ShogiPiece("Gote", "Lance")];
const row_center = [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "Bishop"), undefined, undefined, undefined, undefined];
const row_9 = [new ShogiPiece("Sente", "Lance"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "Lance")];
const row_empty = Array(9).fill(undefined);
export const centerBishop_fourLancesSquares = [
    row_1,
    row_empty,
    row_empty,
    row_empty,
    row_center,
    row_empty,
    row_empty,
    row_empty,
    row_9
];
//# sourceMappingURL=centerBishop-fourLancesSquares.js.map