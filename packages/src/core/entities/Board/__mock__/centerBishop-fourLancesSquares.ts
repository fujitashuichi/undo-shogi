// 5五角のみを置いておく初期配置

import type { FixedLengthArray } from "../../../../tools/index.js";
import { ShogiPiece } from "../../Piece/Piece.js";
import type { Board } from "../Board.js";


type Row = FixedLengthArray<ShogiPiece | undefined, 9>;


const row_1: Row = [new ShogiPiece("Gote", "Lance"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, new ShogiPiece("Gote", "Lance")];
const row_center: Row = [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "Bishop"), undefined, undefined, undefined, undefined];
const row_9: Row = [new ShogiPiece("Sente", "Lance"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "Lance")];
const row_empty = Array(9).fill(undefined) as Row;


export const centerBishop_fourLancesSquares: Board["squares"] = [
  row_1,
  row_empty,
  row_empty,
  row_empty,
  row_center,
  row_empty,
  row_empty,
  row_empty,
  row_9
]
