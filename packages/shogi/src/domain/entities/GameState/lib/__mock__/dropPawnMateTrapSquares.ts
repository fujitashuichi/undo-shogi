import type { FixedLengthArray } from "@packages/tools";
import type { Board } from "../../../Board/Board.js";
import { ShogiPiece } from "../../../Piece/Piece.js";

type Row = FixedLengthArray<ShogiPiece | undefined, 9>;


const row_empty = new Array(9).fill(undefined) as Row;


export const dropPawnMateTrapSquares: Board["squares"] = [
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, new ShogiPiece("Gote", "Knight"), new ShogiPiece("Gote", "King")],
  row_empty,
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "Silver"), undefined],
  row_empty,
  row_empty,
  row_empty,
  row_empty,
  row_empty,
  [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "King"), undefined, undefined, undefined, undefined]
];
