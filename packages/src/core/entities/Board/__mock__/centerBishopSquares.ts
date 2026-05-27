// 5五角のみを置いておく初期配置

import type { FixedLengthArray } from "../../../../tools/index.js";
import { ShogiPiece } from "../../Piece/Piece.js";
import type { Board } from "../Board.js";


type Row = FixedLengthArray<ShogiPiece | undefined, 9>;


const row_center: Row = [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "Bishop"), undefined, undefined, undefined, undefined] as unknown as Row;
const row_empty = Array(9).fill(undefined) as Row;


export const centerBishopSquares: Board["squares"] = [
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
