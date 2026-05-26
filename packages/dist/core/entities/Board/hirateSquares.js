// In the context of Shogi, Hirate (平手) refers to an even game or a standard starting position where no handicap is applied.
import { ShogiPiece } from "../Piece/Piece.js";
const majorPieces = ["Lance", "Knight", "Silver", "Gold", "King", "Gold", "Silver", "Knight", "Lance"];
const row_1 = majorPieces.map(kind => new ShogiPiece("Gote", kind));
const row_2 = [undefined, new ShogiPiece("Gote", "Rook"), ...Array(5).fill(undefined), new ShogiPiece("Gote", "Bishop"), undefined];
const row_3 = Array(9).fill(null).map(() => new ShogiPiece("Gote", "Pawn"));
const row_empty = Array(9).fill(undefined);
const row_7 = Array(9).fill(null).map(() => new ShogiPiece("Sente", "Pawn"));
const row_8 = [undefined, new ShogiPiece("Sente", "Bishop"), ...Array(5).fill(undefined), new ShogiPiece("Sente", "Rook"), undefined];
const row_9 = majorPieces.map(type => new ShogiPiece("Sente", type));
export const hirateSquares = [
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
//# sourceMappingURL=hirateSquares.js.map