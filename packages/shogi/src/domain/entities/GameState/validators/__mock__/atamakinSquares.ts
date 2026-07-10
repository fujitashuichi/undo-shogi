import type { FixedLengthArray } from "@packages/tools";
import type { Board } from "../../../Board/Board.js";
import { ShogiPiece } from "../../../Piece/Piece.js";


type Row = FixedLengthArray<ShogiPiece | undefined, 9>;


const row_empty = Array(9).fill(undefined) as Row;


export const atamakinSquares: Board["squares"] = [
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
