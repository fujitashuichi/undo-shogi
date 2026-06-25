import type { FixedLengthArray } from "../../../../../../shared/dist/index.js";
import type { Board } from "../../Board/Board.js";
import { ShogiPiece } from "../../Piece/Piece.js";


type Row = FixedLengthArray<ShogiPiece | undefined, 9>;

const row_empty = Array(9).fill(undefined) as Row;


export const pinnedRookSquares: Board["squares"] = [
  row_empty,
  row_empty,
  row_empty,
  row_empty,
  row_empty,
  row_empty,
  [undefined, undefined, new ShogiPiece("Gote", "Bishop"), undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, new ShogiPiece("Sente", "Rook"), undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, new ShogiPiece("Sente", "King"), undefined, undefined, undefined, undefined]
];
