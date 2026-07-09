import type { FixedLengthArray } from "@packags/tools";
import { ShogiPiece } from "../../Piece/Piece.js";
import type { Board } from "../Board.js";


const majorPieces: FixedLengthArray<ShogiPiece["kind"], 9> = ["Lance", "Knight", "Silver", "Gold", "King", "Gold", "Silver", "Knight", "Lance"];

type Row = FixedLengthArray<ShogiPiece | undefined, 9>;


const row_1 = majorPieces.map(kind => new ShogiPiece("Gote", kind)) as Row;
const row_2 = [undefined, new ShogiPiece("Gote", "Rook"), ...Array(5).fill(undefined), new ShogiPiece("Gote", "Bishop"), undefined] as Row;
const row_3 = Array(9).fill(null).map(() => new ShogiPiece("Gote", "Pawn")) as Row;
const row_empty = Array(9).fill(undefined) as Row;
const row_7 = Array(9).fill(null).map(() => new ShogiPiece("Sente", "Pawn")) as Row;
const row_9 = majorPieces.map((type, idx) => [0, 1, 2, 3, 5, 6, 7, 8].includes(idx) ? undefined : new ShogiPiece("Sente", type)) as Row;


export const tenOchiSquares: Board["squares"] = [
  row_1,
  row_2,
  row_3,
  row_empty,
  row_empty,
  row_empty,
  row_7,
  row_empty,
  row_9
];
