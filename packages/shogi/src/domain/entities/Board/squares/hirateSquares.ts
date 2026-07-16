import type { FixedLengthArray } from "@packages/tools";
import { ShogiPiece } from "../../Piece/Piece.js";
import type { Board } from "../Board.js";


const majorPieces: FixedLengthArray<ShogiPiece["kind"], 9> = ["Lance", "Knight", "Silver", "Gold", "King", "Gold", "Silver", "Knight", "Lance"];

type Row = FixedLengthArray<ShogiPiece | undefined, 9>;


const row_1 = majorPieces.map(kind => new ShogiPiece("Gote", kind)) as Row;
const row_2 = [undefined, new ShogiPiece("Gote", "Rook"), ...new Array(5).fill(undefined), new ShogiPiece("Gote", "Bishop"), undefined] as Row;
const row_3 = new Array(9).fill(null).map(() => new ShogiPiece("Gote", "Pawn")) as Row;
const row_empty = new Array(9).fill(undefined) as Row;
const row_7 = new Array(9).fill(null).map(() => new ShogiPiece("Sente", "Pawn")) as Row;
const row_8 = [undefined, new ShogiPiece("Sente", "Bishop"), ...new Array(5).fill(undefined), new ShogiPiece("Sente", "Rook"), undefined] as Row;
const row_9 = majorPieces.map(type => new ShogiPiece("Sente", type)) as Row;


export const hirateSquares: Board["squares"] = [
  row_1,
  row_2,
  row_3,
  row_empty,
  row_empty,
  row_empty,
  row_7,
  row_8,
  row_9
];
