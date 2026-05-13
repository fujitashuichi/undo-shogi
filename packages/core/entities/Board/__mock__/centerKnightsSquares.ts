// 敵陣側に向かって、5筋に桂馬置く


import type { FixedLengthArray } from "../../../../tools/index.js";
import { ShogiPiece } from "../../Piece/Piece.js";
import type { Side } from "../../types/piece.types.js";
import type { Board } from "../Board.js";


type Row = FixedLengthArray<ShogiPiece | undefined, 9>;

const knight = (side: Side) => {
  return new ShogiPiece(side, "Knight");
}


const row_empty = Array(9).fill(undefined) as Row;


export const centerKnightsSquares: Board["squares"] = [
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
