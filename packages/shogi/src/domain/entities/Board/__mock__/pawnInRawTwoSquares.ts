// 敵陣二段目に歩を置く配置

import type { FixedLengthArray } from "@packages/tools";
import { ShogiPiece } from "../../Piece/Piece.js";
import type { Board } from "../Board.js";
import type { Side } from "../../../../schemas/primitive/players.js";


type Row = FixedLengthArray<ShogiPiece | undefined, 9>;

const pawn = (side: Side) => {
  return new ShogiPiece(side, "Pawn");
}


const row_empty = new Array(9).fill(undefined) as Row;


export const pawnInRowTwoSquares: Board["squares"] = [
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
