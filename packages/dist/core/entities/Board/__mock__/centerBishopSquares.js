// 5五角のみを置いておく初期配置
import { ShogiPiece } from "../../Piece/Piece.js";
const row_center = [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "Bishop"), undefined, undefined, undefined, undefined];
const row_empty = Array(9).fill(undefined);
export const centerBishopSquares = [
    row_empty,
    row_empty,
    row_empty,
    row_empty,
    row_center,
    row_empty,
    row_empty,
    row_empty,
    row_empty
];
//# sourceMappingURL=centerBishopSquares.js.map