import type { FixedLengthArray } from "../../../tools/index.js";
import type { ShogiPiece } from "../Piece.js";
import type { Position } from "../types/algebraic.types.js";


type Squares = FixedLengthArray<
  FixedLengthArray<ShogiPiece | undefined, 9>, 9
>;


export class Board {
  public readonly boardSize = 9;
  public readonly squares: Squares;

  constructor(
    squares: Squares
  ) {
    this.squares = squares;
  }


  public readonly move = (current: Position, next: Position) => {
    const currentFile = current.file;
    const currentRow = current.row;

    const nextFile = next.file;
    const nextRow = next.row;

    const movingPiece = this.squares[currentRow]![currentFile];

    const nextSquares = this.squares.map((row, rIdx) =>
      row.map((piece, cIdx) => {
        if (rIdx === nextRow && cIdx === nextFile) return movingPiece;
        if (rIdx === currentRow && cIdx === currentFile) return undefined;
        return piece;
      })
    ) as Squares;

    return new Board(nextSquares);
  }
}
